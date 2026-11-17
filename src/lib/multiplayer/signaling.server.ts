/**
 * WebRTC signaling over the app database (Neon deployed, PGLite in preview).
 * Only rendezvous traffic passes through here — roster + SDP/ICE relay while a
 * mesh forms; game data then flows peer-to-peer. DB-backed so any serverless
 * instance can serve any poll. Mount at /api/rtc (see the multiplayer-p2p
 * skill); the client side lives in `@/lib/multiplayer`.
 *
 * The GET poll is the whole peer lifecycle: the first poll (since=0) IS the
 * join — it registers the peer, returns the roster, and prunes stale rows.
 * Peer ids are random per mount, so a fresh inbox never has old signals to
 * skip and no join/cursor handshake is needed.
 */
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import type { PeerRow, RtcPollResponse, SignalRow } from "./p2p";

const ID = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);
const signalSchema = z.object({
  op: z.literal("signal"),
  room: ID,
  from: ID,
  to: ID,
  kind: z.enum(["offer", "answer", "ice"]),
  payload: z.unknown().refine((v) => v !== undefined && JSON.stringify(v).length <= 32_768, {
    message: "payload too large",
  }),
});
const leaveSchema = z.object({ op: z.literal("leave"), room: ID, peer: ID });
const actionSchema = z.object({
  op: z.literal("action"),
  room: ID,
  peer: ID,
  clientId: ID,
  action: z.unknown().refine(
    (v) => {
      if (!v || typeof v !== "object") return false;
      const type = (v as { type?: unknown }).type;
      return typeof type === "string" && type.length > 0 && type.length < 64 && jsonSize(v) <= 8_000;
    },
    { message: "bad action" },
  ),
});
const snapshotSchema = z.object({
  op: z.literal("snapshot"),
  room: ID,
  peer: ID,
  hostKey: ID,
  revision: z.number().int().nonnegative(),
  state: z.unknown().refine((v) => jsonSize(v) <= 500_000, { message: "state too large" }),
  seats: z.record(z.string(), z.number().int().nonnegative()),
  full: z.array(ID).max(8).default([]),
});
const postSchema = z.discriminatedUnion("op", [signalSchema, leaveSchema, actionSchema, snapshotSchema]);

const PEER_TTL_SECONDS = 30;
const SIGNAL_TTL_SECONDS = 60;
const ACTION_TTL_SECONDS = 180;
const ROOM_TTL_SECONDS = 8 * 60 * 60;

function jsonSize(value: unknown): number {
  try {
    return JSON.stringify(value).length;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

function asJson<T>(value: unknown): T | null {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return value as T;
}

const globalRef = globalThis as typeof globalThis & {
  __rtcSchemaPromiseV3__?: Promise<void>;
};

function ensureSchema(sql: Sql): Promise<void> {
  globalRef.__rtcSchemaPromiseV3__ ??= (async () => {
    await sql.query(
      `CREATE TABLE IF NOT EXISTS webrtc_peers (
         room TEXT NOT NULL,
         peer_id TEXT NOT NULL,
         name TEXT NOT NULL DEFAULT '',
         last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
         joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         PRIMARY KEY (room, peer_id)
       )`,
    );
    await sql.query(
      `ALTER TABLE webrtc_peers ADD COLUMN IF NOT EXISTS joined_at TIMESTAMPTZ NOT NULL DEFAULT now()`,
    );
    await sql.query(
      `CREATE TABLE IF NOT EXISTS webrtc_signals (
         id BIGSERIAL PRIMARY KEY,
         room TEXT NOT NULL,
         to_peer TEXT NOT NULL,
         from_peer TEXT NOT NULL,
         kind TEXT NOT NULL,
         payload JSONB NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
    );
    await sql.query(
      `CREATE INDEX IF NOT EXISTS webrtc_signals_inbox
         ON webrtc_signals (room, to_peer, id)`,
    );
    try {
      await sql.query(
        `CREATE TABLE IF NOT EXISTS webrtc_room (
           room TEXT PRIMARY KEY,
           host_key TEXT NOT NULL,
           host_peer TEXT NOT NULL DEFAULT '',
           revision INT NOT NULL,
           state JSONB NOT NULL,
           seats JSONB NOT NULL,
           full_peers JSONB NOT NULL DEFAULT '[]'::jsonb,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      );
      await sql.query(
        `ALTER TABLE webrtc_room ADD COLUMN IF NOT EXISTS host_peer TEXT NOT NULL DEFAULT ''`,
      );
      await sql.query(
        `CREATE TABLE IF NOT EXISTS webrtc_actions (
           id BIGSERIAL PRIMARY KEY,
           room TEXT NOT NULL,
           from_peer TEXT NOT NULL,
           client_id TEXT NOT NULL,
           action JSONB NOT NULL,
           created_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      );
      await sql.query(
        `CREATE UNIQUE INDEX IF NOT EXISTS webrtc_actions_client
           ON webrtc_actions (room, client_id)`,
      );
    } catch (error) {
      console.error("[rtc] relay schema skipped:", error);
    }
  })().catch((err) => {
    globalRef.__rtcSchemaPromiseV3__ = undefined;
    throw err;
  });
  return globalRef.__rtcSchemaPromiseV3__;
}

async function roster(sql: Sql, room: string): Promise<PeerRow[]> {
  const rows = await sql.query<{ peer_id: string; name: string }>(
    `SELECT peer_id, name FROM webrtc_peers
     WHERE room = $1 AND last_seen > now() - make_interval(secs => $2)
     ORDER BY peer_id LIMIT 32`,
    [room, PEER_TTL_SECONDS],
  );
  return rows.map((r) => ({ id: r.peer_id, name: r.name }));
}

async function touchPeer(sql: Sql, room: string, peer: string, name: string) {
  await sql.query(
    `INSERT INTO webrtc_peers (room, peer_id, name, last_seen, joined_at)
     VALUES ($1, $2, $3, now(), now())
     ON CONFLICT (room, peer_id)
     DO UPDATE SET last_seen = now(),
       name = CASE WHEN EXCLUDED.name = '' THEN webrtc_peers.name ELSE EXCLUDED.name END`,
    [room, peer, name],
  );
}

async function prune(sql: Sql) {
  await Promise.all([
    sql.query(`DELETE FROM webrtc_signals WHERE created_at < now() - make_interval(secs => $1)`, [
      SIGNAL_TTL_SECONDS,
    ]),
    sql.query(`DELETE FROM webrtc_peers WHERE last_seen < now() - make_interval(secs => $1)`, [
      PEER_TTL_SECONDS,
    ]),
  ]);
  await Promise.all([
    sql
      .query(`DELETE FROM webrtc_actions WHERE created_at < now() - make_interval(secs => $1)`, [
        ACTION_TTL_SECONDS,
      ])
      .catch(() => []),
    sql
      .query(`DELETE FROM webrtc_room WHERE updated_at < now() - make_interval(secs => $1)`, [
        ROOM_TTL_SECONDS,
      ])
      .catch(() => []),
  ]);
}

function humanGuestSeats(state: unknown): number[] {
  if (!state || typeof state !== "object") return [];
  const players = (state as { players?: unknown }).players;
  if (!Array.isArray(players)) return [];
  const seats: number[] = [];
  players.forEach((player, index) => {
    if (!player || typeof player !== "object") return;
    const row = player as { id?: unknown; isAi?: unknown };
    if (row.isAi === true) return;
    const id = typeof row.id === "number" ? row.id : index;
    if (id === 0) return;
    seats.push(id);
  });
  return seats;
}

async function seatForToken(sql: Sql, room: string, token: string): Promise<number | null> {
  if (!/^s[a-f0-9]{32}$/.test(token)) return null;
  try {
    const rows = await sql.query<{ seat: number }>(
      `SELECT seat FROM havn_seat WHERE room = $1 AND token = $2`,
      [room, token],
    );
    const seat = rows[0] ? Number(rows[0].seat) : null;
    return seat != null && seat > 0 ? seat : null;
  } catch {
    return null;
  }
}

async function readRelay(sql: Sql, room: string, sinceAction: number, peer = "", seatToken = "") {
  const snaps = await sql.query<{
    revision: number;
    state: unknown;
    seats: unknown;
    full_peers: unknown;
    host_peer: string | null;
  }>(
    `SELECT revision, state, seats, full_peers, host_peer FROM webrtc_room WHERE room = $1`,
    [room],
  );
  const snap = snaps[0];
  const actions = await sql.query<{
    id: number;
    from_peer: string;
    client_id: string;
    action: unknown;
  }>(
    `SELECT id, from_peer, client_id, action FROM webrtc_actions
     WHERE room = $1 AND id > $2
     ORDER BY id LIMIT 50`,
    [room, sinceAction],
  );
  const state = snap ? asJson(snap.state) : null;
  const hostPeer = snap?.host_peer ?? "";
  let seats = asJson<Record<string, number>>(snap?.seats) ?? {};
  let full = asJson<string[]>(snap?.full_peers) ?? [];
  const names: Record<string, string> = {};
  if (snap && hostPeer) {
    const roster = await sql.query<{ peer_id: string; name: string }>(
      `SELECT peer_id, name FROM webrtc_peers
       WHERE room = $1 AND last_seen > now() - make_interval(secs => $2)
       ORDER BY joined_at, peer_id
       LIMIT 32`,
      [room, PEER_TTL_SECONDS],
    );
    const open = humanGuestSeats(state);
    const pinned = peer ? await seatForToken(sql, room, seatToken) : null;
    seats = {};
    full = [];
    if (pinned != null && open.includes(pinned) && roster.some((row) => row.peer_id === peer)) {
      seats[peer] = pinned;
      open.splice(open.indexOf(pinned), 1);
    }
    for (const row of roster) {
      if (row.peer_id === hostPeer) continue;
      if (row.name) names[row.peer_id] = row.name;
      if (seats[row.peer_id] != null) continue;
      const seat = open.shift();
      if (seat == null) full.push(row.peer_id);
      else seats[row.peer_id] = seat;
    }
  }
  return {
    snapshot: snap
      ? {
          revision: Number(snap.revision),
          state,
          seats: seats && typeof seats === "object" ? seats : {},
          full: Array.isArray(full) ? full : [],
          names,
        }
      : null,
    actions: actions.map((row) => ({
      id: Number(row.id),
      from: row.from_peer,
      clientId: row.client_id,
      action: asJson(row.action),
    })),
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

async function handleGet(url: URL): Promise<Response> {
  const parsed = z
    .object({
      room: ID,
      peer: ID,
      name: z.string().max(64).default(""),
      since: z.coerce.number().int().min(0).default(0),
    })
    .safeParse({
      room: url.searchParams.get("room"),
      peer: url.searchParams.get("peer"),
      name: url.searchParams.get("name") ?? "",
      since: url.searchParams.get("since") ?? 0,
    });
  if (!parsed.success) return json({ error: "invalid query" }, 400);
  const { room, peer, name, since } = parsed.data;
  const relay = url.searchParams.get("relay") === "1";

  const sql = await getSql();
  await ensureSchema(sql);
  if (since === 0 || relay || Math.random() < 0.02) await prune(sql);
  await touchPeer(sql, room, peer, name);
  if (relay) {
    const sinceAction = Number(url.searchParams.get("sinceAction") ?? 0);
    const seatToken = url.searchParams.get("seatToken") ?? "";
    return json(
      await readRelay(sql, room, Number.isFinite(sinceAction) ? sinceAction : 0, peer, seatToken),
    );
  }
  const rows = await sql.query<{
    id: number;
    from_peer: string;
    kind: SignalRow["kind"];
    payload: unknown;
  }>(
    `SELECT id, from_peer, kind, payload FROM webrtc_signals
     WHERE room = $1 AND to_peer = $2 AND id > $3
     ORDER BY id LIMIT 200`,
    [room, peer, since],
  );
  const body: RtcPollResponse = {
    peers: await roster(sql, room),
    signals: rows.map((r) => ({
      id: r.id,
      from: r.from_peer,
      kind: r.kind,
      payload: r.payload,
    })),
  };
  return json(body);
}

async function handlePost(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return json({ error: "invalid request" }, 400);
  const msg = parsed.data;
  const sql = await getSql();
  await ensureSchema(sql);

  if (msg.op === "signal") {
    await sql.query(
      `INSERT INTO webrtc_signals (room, to_peer, from_peer, kind, payload)
       VALUES ($1, $2, $3, $4, $5)`,
      [msg.room, msg.to, msg.from, msg.kind, JSON.stringify(msg.payload)],
    );
  } else if (msg.op === "snapshot") {
    const existing = await sql.query<{ host_key: string; revision: number }>(
      `SELECT host_key, revision FROM webrtc_room WHERE room = $1`,
      [msg.room],
    );
    const row = existing[0];
    if (row && row.host_key !== msg.hostKey) return json({ error: "not host" }, 403);
    if (row && msg.revision <= Number(row.revision)) return json({ ok: true, ignored: true });
    await sql.query(
      `INSERT INTO webrtc_room (room, host_key, host_peer, revision, state, seats, full_peers, updated_at)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::jsonb, now())
       ON CONFLICT (room) DO UPDATE SET
         host_peer = EXCLUDED.host_peer,
         revision = EXCLUDED.revision,
         state = EXCLUDED.state,
         seats = EXCLUDED.seats,
         full_peers = EXCLUDED.full_peers,
         updated_at = now()`,
      [
        msg.room,
        msg.hostKey,
        msg.peer,
        msg.revision,
        JSON.stringify(msg.state),
        JSON.stringify(msg.seats),
        JSON.stringify(msg.full),
      ],
    );
  } else if (msg.op === "action") {
    await sql.query(
      `INSERT INTO webrtc_actions (room, from_peer, client_id, action)
       VALUES ($1, $2, $3, $4::jsonb)
       ON CONFLICT (room, client_id) DO NOTHING`,
      [msg.room, msg.peer, msg.clientId, JSON.stringify(msg.action)],
    );
  } else {
    await sql.query(`DELETE FROM webrtc_peers WHERE room = $1 AND peer_id = $2`, [
      msg.room,
      msg.peer,
    ]);
  }
  return json({ ok: true });
}

export async function handleSignaling(request: Request): Promise<Response> {
  try {
    if (request.method === "GET") return await handleGet(new URL(request.url));
    if (request.method === "POST") return await handlePost(request);
    return json({ error: "method not allowed" }, 405);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[rtc] signaling error:", error);
    return json(
      {
        error: "signaling failed",
        detail: message.replace(/postgres(?:ql)?:\/\/\S+/gi, "postgres://…").slice(0, 240),
      },
      500,
    );
  }
}
