import type { GameAction } from "./match";

export type RelaySnapshot = {
  revision: number;
  state: unknown;
  seats: Record<string, number>;
  full: string[];
  names?: Record<string, string>;
};

export type RelayAction = {
  id: number;
  from: string;
  clientId: string;
  action: GameAction;
};

export function hostKeyFor(room: string): string {
  const storageKey = `havn-host-key:${room}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) return existing;
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    let out = "";
    for (const b of bytes) out += "abcdefghjkmnpqrstuvwxyz23456789"[b % 31]!;
    localStorage.setItem(storageKey, out);
    return out;
  } catch {
    return `host${room}`.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || "havnhostkey";
  }
}

export async function pushSnapshot(
  room: string,
  peer: string,
  hostKey: string,
  snap: RelaySnapshot,
): Promise<void> {
  try {
    await fetch("/api/rtc", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        op: "snapshot",
        room,
        peer,
        hostKey,
        revision: snap.revision,
        state: snap.state,
        seats: snap.seats,
        full: snap.full,
      }),
    });
  } catch {
    /* next tick retries */
  }
}

export async function pushAction(
  room: string,
  peer: string,
  clientId: string,
  action: GameAction,
): Promise<void> {
  try {
    await fetch("/api/rtc", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "action", room, peer, clientId, action }),
    });
  } catch {
    /* the data channel may still deliver it */
  }
}

export function savedSeatToken(room: string): string {
  try {
    for (let seat = 1; seat <= 3; seat++) {
      const value = localStorage.getItem(`havn-seat-token:${room}:${seat}`);
      if (value && /^s[a-f0-9]{32}$/.test(value)) return value;
    }
  } catch {
    /* this tab can still join without a saved token */
  }
  return "";
}

export async function pullRelay(
  room: string,
  peer: string,
  sinceAction: number,
  name = "",
  seatToken = "",
): Promise<{ snapshot: RelaySnapshot | null; actions: RelayAction[]; error?: string }> {
  try {
    const params = new URLSearchParams({
      relay: "1",
      room,
      peer,
      name,
      sinceAction: String(sinceAction),
    });
    if (seatToken) params.set("seatToken", seatToken);
    const res = await fetch(`/api/rtc?${params}`);
    if (!res.ok) {
      let detail = "";
      try {
        detail = String(((await res.json()) as { detail?: unknown }).detail ?? "");
      } catch {
        /* ignore */
      }
      return { snapshot: null, actions: [], error: detail || `http ${res.status}` };
    }
    const body = (await res.json()) as {
      snapshot?: RelaySnapshot | null;
      actions?: RelayAction[];
    };
    return { snapshot: body.snapshot ?? null, actions: body.actions ?? [] };
  } catch (error) {
    return {
      snapshot: null,
      actions: [],
      error: error instanceof Error ? error.message : "offline",
    };
  }
}
