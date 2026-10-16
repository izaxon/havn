export type MatchRole = "solo" | "host" | "guest";

export const HOST_SEAT = 0;
export const GUEST_SEAT = 1;
export const ROOM_RE = /^[a-zA-Z0-9_-]{1,64}$/;

export type GameAction = { type: string; [key: string]: unknown };

export type NetMsg =
  | { t: "sync"; revision: number; state: unknown }
  | { t: "action"; action: GameAction }
  | { t: "hello"; name: string }
  | { t: "seat"; seat: number }
  | { t: "full" }
  | { t: "error"; message: string };

export type SeatPlayer = {
  id: number;
  name: string;
  isAi: boolean;
};

export type MatchBoard = {
  revision: number;
  currentPlayer: number;
  phase: string;
  players: SeatPlayer[];
  discardQueue?: number[];
  tradeOffer?: { from?: number; to: number } | null;
};

const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function makeRoomCode(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length]!;
  return out;
}

export function isRoomCode(value: string | undefined): value is string {
  return !!value && ROOM_RE.test(value);
}

export function inviteUrl(code: string): string {
  if (typeof window === "undefined") return `/?join=${code}`;
  const url = new URL(window.location.href);
  url.search = `join=${encodeURIComponent(code)}`;
  url.hash = "";
  return url.toString();
}

export function isNetMsg(value: unknown): value is NetMsg {
  if (!value || typeof value !== "object") return false;
  const t = (value as { t?: unknown }).t;
  return (
    t === "sync" ||
    t === "action" ||
    t === "hello" ||
    t === "seat" ||
    t === "full" ||
    t === "error"
  );
}

export function asBoard(value: unknown): MatchBoard | null {
  if (!value || typeof value !== "object") return null;
  const s = value as MatchBoard;
  if (!Array.isArray(s.players) || typeof s.currentPlayer !== "number") return null;
  return s;
}

export function friendSeatIds(players: SeatPlayer[]): number[] {
  return players.filter((p) => !p.isAi && p.id !== HOST_SEAT).map((p) => p.id);
}

export function actingPlayerId(state: MatchBoard): number {
  if (state.phase === "discard") return state.discardQueue?.[0] ?? state.currentPlayer;
  if (state.tradeOffer) return state.tradeOffer.to;
  return state.currentPlayer;
}

/** A remote peer may only submit the action that belongs to its own seat. */
export function seatMayPlay(state: MatchBoard, seat: number, action: GameAction): boolean {
  if (seat < 0) return false;
  if (action.type === "cancelTrade") return state.tradeOffer?.from === seat;
  if (action.type === "respondTrade") return state.tradeOffer?.to === seat;
  return actingPlayerId(state) === seat;
}
