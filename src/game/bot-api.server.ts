/** Seat-token API so an agent can play a Havn match without the board UI. */
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { t } from "@/game/i18n";
import {
  apiView,
  asLive,
  describeAttention,
  normalizeAction,
  resolveAction,
  stepComputers,
  yourTurn,
  type LiveState,
} from "@/game/agent";
import { tryAction } from "@/game/game";

const ROOM = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);
const TOKEN = z.string().regex(/^s[a-f0-9]{32}$/);
const SEAT = z.number().int().min(0).max(3);
const LIMIT = 90;

const globalRef = globalThis as typeof globalThis & { __havnBotSchema2__?: Promise<void> };

function ensureSchema(sql: Sql): Promise<void> {
  globalRef.__havnBotSchema2__ ??= (async () => {
    await sql.query(
      `CREATE TABLE IF NOT EXISTS havn_seat (
         room TEXT NOT NULL,
         seat INTEGER NOT NULL,
         token TEXT NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         PRIMARY KEY (room, seat),
         UNIQUE (token)
       )`,
    );
    await sql.query(
      `CREATE TABLE IF NOT EXISTS havn_rate (
         token TEXT NOT NULL,
         bucket BIGINT NOT NULL,
         hits INTEGER NOT NULL,
         PRIMARY KEY (token, bucket)
       )`,
    );
    await sql.query(
      `CREATE TABLE IF NOT EXISTS havn_action (
         token TEXT NOT NULL,
         client_id TEXT NOT NULL,
         room TEXT NOT NULL,
         revision INTEGER NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         PRIMARY KEY (token, client_id)
       )`,
    );
  })().catch((err) => {
    globalRef.__havnBotSchema2__ = undefined;
    throw err;
  });
  return globalRef.__havnBotSchema2__;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

function asObject(value: unknown): unknown {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

async function gate(token: string): Promise<Response | null> {
  const sql = await getSql();
  await ensureSchema(sql);
  const bucket = Math.floor(Date.now() / 60_000);
  const rows = await sql.query<{ hits: number }>(
    `INSERT INTO havn_rate (token, bucket, hits) VALUES ($1, $2, 1)
     ON CONFLICT (token, bucket) DO UPDATE SET hits = havn_rate.hits + 1
     RETURNING hits`,
    [token, bucket],
  );
  if ((rows[0]?.hits ?? 0) > LIMIT) return json({ error: "rate_limited" }, 429);
  if (Math.random() < 0.02) {
    await sql.query(`DELETE FROM havn_rate WHERE bucket < $1`, [bucket - 2]);
  }
  return null;
}

async function seatFor(room: string, token: string): Promise<number | null> {
  const sql = await getSql();
  await ensureSchema(sql);
  const rows = await sql.query<{ seat: number }>(
    `SELECT seat FROM havn_seat WHERE room = $1 AND token = $2`,
    [room, token],
  );
  return rows[0] ? Number(rows[0].seat) : null;
}

async function loadGame(room: string): Promise<LiveState | null> {
  const sql = await getSql();
  const rows = await sql.query<{ state: unknown }>(
    `SELECT state FROM webrtc_room WHERE room = $1`,
    [room],
  );
  return asLive(asObject(rows[0]?.state));
}

function turnError(message: string): boolean {
  return message === t("engine.notYourTurn");
}

export function handleOptions(): Response {
  return json({ ok: true });
}

export async function registerSeat(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const parsed = z.object({ room: ROOM, seat: SEAT, token: TOKEN }).safeParse(body);
  if (!parsed.success) return json({ error: "invalid_request" }, 400);
  const { room, seat, token } = parsed.data;
  const limited = await gate(token);
  if (limited) return limited;
  const sql = await getSql();
  const byToken = await sql.query<{ room: string; seat: number }>(
    `SELECT room, seat FROM havn_seat WHERE token = $1`,
    [token],
  );
  const owned = byToken[0];
  if (owned && (owned.room !== room || Number(owned.seat) !== seat)) {
    return json({ error: "seat_taken", seat: Number(owned.seat), room: owned.room }, 409);
  }
  const bySeat = await sql.query<{ token: string }>(
    `SELECT token FROM havn_seat WHERE room = $1 AND seat = $2`,
    [room, seat],
  );
  const existing = bySeat[0]?.token;
  if (existing && existing !== token) return json({ error: "seat_taken" }, 409);
  if (!existing) {
    await sql.query(
      `INSERT INTO havn_seat (room, seat, token) VALUES ($1, $2, $3)
       ON CONFLICT (room, seat) DO NOTHING`,
      [room, seat, token],
    );
    const again = await sql.query<{ token: string }>(
      `SELECT token FROM havn_seat WHERE room = $1 AND seat = $2`,
      [room, seat],
    );
    if (again[0]?.token !== token) return json({ error: "seat_taken" }, 409);
  }
  return json({ ok: true, room, seat });
}

async function saveIfAdvanced(room: string, before: LiveState, after: LiveState): Promise<LiveState> {
  if (after.revision === before.revision) return before;
  const sql = await getSql();
  const updated = await sql.query<{ revision: number }>(
    `UPDATE webrtc_room
     SET revision = $1, state = $2::jsonb, updated_at = now()
     WHERE room = $3 AND revision = $4
     RETURNING revision`,
    [after.revision, JSON.stringify(after), room, before.revision],
  );
  if (updated[0]) return after;
  return (await loadGame(room)) ?? after;
}

export async function readGame(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = z.object({ room: ROOM, seat: TOKEN }).safeParse({
    room: url.searchParams.get("room"),
    seat: url.searchParams.get("seat"),
  });
  if (!parsed.success) return json({ error: "invalid_query" }, 400);
  const limited = await gate(parsed.data.seat);
  if (limited) return limited;
  const seat = await seatFor(parsed.data.room, parsed.data.seat);
  if (seat == null) return json({ error: "bad_token" }, 401);
  const state = await loadGame(parsed.data.room);
  if (!state) return json({ error: "no_game" }, 404);
  const stepped = await saveIfAdvanced(parsed.data.room, state, stepComputers(state));
  const view = apiView(stepped, seat);
  return json({ ...view, room: parsed.data.room, seat });
}

const CLIENT_ID = z.string().regex(/^[A-Za-z0-9_.:-]{8,80}$/);

async function claimAction(token: string, clientId: string, room: string): Promise<"claimed" | "replay"> {
  const sql = await getSql();
  await ensureSchema(sql);
  const inserted = await sql.query<{ client_id: string }>(
    `INSERT INTO havn_action (token, client_id, room, revision)
     VALUES ($1, $2, $3, -1)
     ON CONFLICT (token, client_id) DO NOTHING
     RETURNING client_id`,
    [token, clientId, room],
  );
  if (inserted[0]) return "claimed";
  for (let i = 0; i < 20; i++) {
    const rows = await sql.query<{ revision: number; created_at: string | Date }>(
      `SELECT revision, created_at FROM havn_action WHERE token = $1 AND client_id = $2`,
      [token, clientId],
    );
    const row = rows[0];
    if (!row) return "claimed";
    if (Number(row.revision) >= 0) return "replay";
    const age = Date.now() - new Date(row.created_at).getTime();
    if (age > 15_000) {
      const stolen = await sql.query<{ client_id: string }>(
        `UPDATE havn_action SET revision = -1, created_at = now()
         WHERE token = $1 AND client_id = $2 AND revision = -1
         RETURNING client_id`,
        [token, clientId],
      );
      if (stolen[0]) return "claimed";
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  return "replay";
}

async function finishClaim(token: string, clientId: string, revision: number) {
  const sql = await getSql();
  await sql.query(`UPDATE havn_action SET revision = $3 WHERE token = $1 AND client_id = $2`, [
    token,
    clientId,
    revision,
  ]);
}

async function dropClaim(token: string, clientId: string) {
  const sql = await getSql();
  await sql.query(`DELETE FROM havn_action WHERE token = $1 AND client_id = $2 AND revision = -1`, [
    token,
    clientId,
  ]);
}

export async function playAction(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const parsed = z
    .object({
      room: ROOM,
      seat: TOKEN,
      action: z.unknown(),
      clientId: CLIENT_ID.optional(),
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "invalid_request" }, 400);
  const limited = await gate(parsed.data.seat);
  if (limited) return limited;
  const seat = await seatFor(parsed.data.room, parsed.data.seat);
  if (seat == null) return json({ error: "bad_token" }, 401);
  const clientId = parsed.data.clientId;
  if (clientId) {
    const claim = await claimAction(parsed.data.seat, clientId, parsed.data.room);
    if (claim === "replay") {
      const state = await loadGame(parsed.data.room);
      if (!state) return json({ error: "no_game" }, 404);
      const stepped = await saveIfAdvanced(parsed.data.room, state, stepComputers(state));
      return json({ ...apiView(stepped, seat), room: parsed.data.room, seat, replayed: true });
    }
  }
  const action = normalizeAction(parsed.data.action);
  if (!action) {
    if (clientId) await dropClaim(parsed.data.seat, clientId);
    return json({ error: "illegal_action" }, 400);
  }
  const sql = await getSql();
  for (let attempt = 0; attempt < 2; attempt++) {
    const rows = await sql.query<{ revision: number; state: unknown }>(
      `SELECT revision, state FROM webrtc_room WHERE room = $1`,
      [parsed.data.room],
    );
    const row = rows[0];
    const state = asLive(asObject(row?.state));
    if (!state || !row) {
      if (clientId) await dropClaim(parsed.data.seat, clientId);
      return json({ error: "no_game" }, 404);
    }
    const engineAction = resolveAction(state, action);
    if (engineAction.type === "respondTrade") {
      if (typeof engineAction.playerId === "number" && engineAction.playerId !== seat) {
        if (clientId) await dropClaim(parsed.data.seat, clientId);
        return json({ error: "illegal_action" }, 409);
      }
      engineAction.playerId = seat;
    }
    const responding = engineAction.type === "respondTrade" || engineAction.type === "cancelTrade";
    if (!yourTurn(state, seat) && !responding) {
      if (clientId) await dropClaim(parsed.data.seat, clientId);
      return json({ error: "not_your_turn" }, 409);
    }
    const result = tryAction(state, engineAction) as { ok: boolean; state?: unknown; error?: string };
    if (!result.ok || !result.state) {
      if (clientId) await dropClaim(parsed.data.seat, clientId);
      const message = result.error ?? "";
      return json({ error: turnError(message) ? "not_your_turn" : "illegal_action", message }, 409);
    }
    const played = asLive(result.state);
    if (!played) {
      if (clientId) await dropClaim(parsed.data.seat, clientId);
      return json({ error: "illegal_action" }, 409);
    }
    const stepped = stepComputers(played);
    const updated = await sql.query<{ revision: number }>(
      `UPDATE webrtc_room
       SET revision = $1, state = $2::jsonb, updated_at = now()
       WHERE room = $3 AND revision = $4
       RETURNING revision`,
      [stepped.revision, JSON.stringify(stepped), parsed.data.room, Number(row.revision)],
    );
    if (!updated[0]) continue;
    if (clientId) await finishClaim(parsed.data.seat, clientId, stepped.revision);
    return json({ ...apiView(stepped, seat), room: parsed.data.room, seat, replayed: false });
  }
  if (clientId) await dropClaim(parsed.data.seat, clientId);
  return json({ error: "conflict" }, 409);
}

export async function readEvents(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = z
    .object({
      room: ROOM,
      seat: TOKEN,
      since: z.coerce.number().int().min(0).default(0),
    })
    .safeParse({
      room: url.searchParams.get("room"),
      seat: url.searchParams.get("seat"),
      since: url.searchParams.get("since") ?? 0,
    });
  if (!parsed.success) return json({ error: "invalid_query" }, 400);
  const limited = await gate(parsed.data.seat);
  if (limited) return limited;
  const seat = await seatFor(parsed.data.room, parsed.data.seat);
  if (seat == null) return json({ error: "bad_token" }, 401);
  const sql = await getSql();
  const started = Date.now();
  let revision = 0;
  let phase = "setup";
  let attention = { reason: "waiting", yourTurn: false, notice: "" };
  let pendingTrade: {
    from: number;
    fromName: string | null;
    to: number;
    toName: string | null;
    give: unknown;
    want: unknown;
  } | null = null;
  const wait = url.searchParams.has("since");
  for (;;) {
    const rows = await sql.query<{ revision: number; state: unknown }>(
      `SELECT revision, state FROM webrtc_room WHERE room = $1`,
      [parsed.data.room],
    );
    const state = asLive(asObject(rows[0]?.state));
    revision = state?.revision ?? (rows[0] ? Number(rows[0].revision) : 0);
    if (state) {
      phase = state.tradeOffer ? "trade" : state.phase === "gameOver" ? "ended" : state.phase;
      attention = describeAttention(state, seat);
      pendingTrade = state.tradeOffer
        ? {
            from: state.tradeOffer.from,
            fromName: state.players[state.tradeOffer.from]?.name ?? null,
            to: state.tradeOffer.to,
            toName: state.players[state.tradeOffer.to]?.name ?? null,
            give: state.tradeOffer.give,
            want: state.tradeOffer.want,
          }
        : null;
    }
    if (!rows[0]) return json({ error: "no_game" }, 404);
    if (!wait || revision > parsed.data.since || Date.now() - started > 12_000) break;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  return json({
    ok: true,
    room: parsed.data.room,
    seat,
    revision,
    changed: revision > parsed.data.since,
    phase,
    yourTurn: attention.yourTurn,
    reason: attention.reason,
    notice: attention.notice,
    needsResponse: attention.reason === "trade_offer" || attention.reason === "discard" || attention.reason === "robber",
    pendingTrade,
  });
}

export function apiDocs(): Response {
  const body = `Havn bot-API
=============

En agent spelar en plats med en hemlig token. Ingen inloggning. Högst 90 anrop per token och minut.

Token
-----
Öppna partiet och välj AI-läge. Kopiera token (s + 32 hextecken). Samma token ger alltid samma plats. En ny token kan inte ta en upptagen plats.

Läs
---
GET /api/game?room=KOD&seat=TOKEN

Svarar med phase, currentPlayer, round, lastRoll, costs, portRates (din kurs per råvara), board, players, legalActions, pendingTrade, attention och log (20 senaste).

attention.reason är your_turn, trade_offer, trade_waiting, discard, robber, game_over eller waiting.
Bara din egen hand och dina utvecklingskort visas i detalj. Andras kort är ett antal.
costs är vad ett bygge kostar. portRates är 4, 3 eller 2 beroende på dina hamnar. En väg fram till en hamn öppnar den inte. Det krävs en by eller stad på hamnens korsning.

Länkar
------
Värden stannar på ?match=KOD. Gästen öppnar ?join=KOD. Samma rumskod används i API:t. Token hör till en plats, inte till länken, och ligger kvar i webbläsaren efter omladdning.

Brädet
------
Hexar h1, h2, …  Korsningar j1, j2, …  Kanter e1, e2, …
board.text är en rad per korsning, t.ex. "j23: 8 lera / 10 vete / 2 skog".
Id:n är stabila för samma bräde.

Spela
-----
POST /api/action
{"room":"KOD","seat":"TOKEN","clientId":"turn-3-roll","action": <ett objekt ur legalActions>}

clientId är valfritt, 8–80 tecken. Samma clientId spelas bara en gång. Ett omskick ger senaste läget med replayed:true, även om sidan laddats om.

Fel: not_your_turn, illegal_action, bad_token, no_game, rate_limited.

Vänta
-----
GET /api/events?room=KOD&seat=TOKEN&since=REVISION
Lång-poll i upp till 12 sekunder. changed=true när revision ökat.
reason och notice säger om det är din tur, ett bud, ett svar som väntas, rövaren eller att kort ska slängas.

Exempel, en hel tur efter grundläggningen
------------------------------------------
1. GET /api/events?...&since=REVISION tills reason är "your_turn" och phase är "roll".
2. POST /api/action  {"room":"abc","seat":"s…","clientId":"r1-roll","action":{"type":"roll"}}
3. Om reason blir "discard": välj ett discard-drag ur legalActions och posta det med ny clientId.
4. Om reason blir "robber": posta ett moveRobber-drag (hex + stealFrom).
5. I "main": bygg, byt eller avsluta. Banken, kursen står i portRates och på draget:
   {"type":"bankTrade","give":"wood","get":"ore","ratio":4}
   Ett erbjudande (reason "trade_offer"):
   {"type":"respondTrade","offerId":12,"accept":false}
6. Avsluta med clientId "r1-end" och action {"type":"endTurn"}.
7. Lyssna igen tills reason blir "your_turn".

Placering använder id från legalActions, t.ex.
{"type":"placeSettlement","junction":"j23","vertexId":"…"}
{"type":"placeRoad","edge":"e41","edgeId":"…"}
buildRoad accepteras som alias för placeRoad.

Datorplatser spelar själva när du läser /api/game eller skickar ett drag, tills det är en människas tur igen.

`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });
}
