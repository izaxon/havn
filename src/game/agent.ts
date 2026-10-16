/** Read-only view and legal-action list for an external assistant. Rules stay in the engine. */
import { actingPlayerId, asBoard } from "./match";
import { tryAction } from "./game";

const RESOURCES = ["wood", "brick", "wool", "grain", "ore"] as const;
type Resource = (typeof RESOURCES)[number];
type Bag = Record<Resource, number>;

export type AgentAction = { type: string; [key: string]: unknown };

type TryResult = { ok: true; state: unknown } | { ok: false; error: string };

interface Building {
  player: number;
  type: string;
}
interface Vertex {
  id: string;
  hexIds?: string[];
  building?: Building | null;
  port?: { kind: string } | null;
}
interface Edge {
  id: string;
  a: string;
  b: string;
  road?: { player: number } | null;
  port?: { kind: string } | null;
}
interface Hex {
  id: string;
  q: number;
  r: number;
  terrain: string;
  number: number | null;
}
interface Player {
  id: number;
  name: string;
  isAi: boolean;
  colorIndex: number;
  resources: Bag;
  hand: string[];
  newHand: string[];
  vpCards: number;
  roadsLeft: number;
  settlementsLeft: number;
  citiesLeft: number;
  knightsPlayed: number;
  hasLongestRoad: boolean;
  hasLargestArmy: boolean;
}
export interface LiveState {
  revision: number;
  phase: string;
  currentPlayer: number;
  players: Player[];
  board: { hexes: Hex[]; vertices: Vertex[]; edges: Edge[] };
  robberHexId: string;
  bank: Bag;
  deck: unknown[];
  discardQueue: number[];
  setupNeed: string;
  lastRoll: { d1: number; d2: number; total: number } | null;
  tradeOffer: { from: number; to: number; give: Bag; want: Bag } | null;
  winnerId: number | null;
  turnNumber: number;
  log: { id: number; text: string }[];
  pendingFreeRoads: number;
}

export interface SessionInfo {
  role: string;
  status: string;
  room: string | null;
  yourSeat: number;
}

const COSTS = {
  road: { wood: 1, brick: 1 },
  settlement: { wood: 1, brick: 1, wool: 1, grain: 1 },
  city: { grain: 2, ore: 3 },
  development: { wool: 1, grain: 1, ore: 1 },
};

function apply(state: unknown, action: AgentAction): TryResult {
  return tryAction(state, action) as TryResult;
}

export function asLive(state: unknown): LiveState | null {
  if (!asBoard(state)) return null;
  const s = state as LiveState;
  if (!s.board?.hexes || !s.board.vertices || !s.board.edges) return null;
  return s;
}

function total(bag: Partial<Bag> | undefined): number {
  return RESOURCES.reduce((n, key) => n + (bag?.[key] ?? 0), 0);
}

function canPay(have: Partial<Bag> | undefined, cost: Partial<Bag>): boolean {
  return RESOURCES.every((key) => (have?.[key] ?? 0) >= (cost[key] ?? 0));
}

function emptyBag(): Bag {
  return { wood: 0, brick: 0, wool: 0, grain: 0, ore: 0 };
}

function publicPoints(state: LiveState, player: Player): number {
  let points = 0;
  for (const vertex of state.board.vertices) {
    if (vertex.building?.player !== player.id) continue;
    points += vertex.building.type === "city" ? 2 : 1;
  }
  if (player.hasLongestRoad) points += 2;
  if (player.hasLargestArmy) points += 2;
  return points;
}

function projectPlayer(state: LiveState, player: Player, viewerId: number) {
  const mine = player.id === viewerId;
  const shown = publicPoints(state, player);
  return {
    id: player.id,
    name: player.name,
    isYou: mine,
    isComputer: player.isAi,
    victoryPoints: mine ? shown + (player.vpCards ?? 0) : shown,
    hiddenVictoryPoints: mine ? (player.vpCards ?? 0) : null,
    resources: mine
      ? { ...emptyBag(), ...player.resources }
      : { hidden: true, total: total(player.resources) },
    developmentCards: mine
      ? {
          playable: [...(player.hand ?? [])],
          boughtThisTurn: [...(player.newHand ?? [])],
        }
      : {
          hidden: true,
          count: (player.hand?.length ?? 0) + (player.newHand?.length ?? 0),
        },
    pieces: {
      roadsLeft: player.roadsLeft,
      settlementsLeft: player.settlementsLeft,
      citiesLeft: player.citiesLeft,
    },
    knightsPlayed: player.knightsPlayed,
    longestRoad: player.hasLongestRoad,
    largestArmy: player.hasLargestArmy,
  };
}

export function yourTurn(state: LiveState, viewerId: number): boolean {
  if (viewerId < 0) return false;
  const board = asBoard(state);
  if (!board) return false;
  return actingPlayerId(board) === viewerId;
}

function keep(state: LiveState, action: AgentAction, into: AgentAction[]) {
  if (apply(state, action).ok) into.push(action);
}

function discards(have: Bag, need: number): Bag[] {
  const out: Bag[] = [];
  const walk = (index: number, left: number, acc: Bag) => {
    if (out.length >= 24) return;
    if (index === RESOURCES.length) {
      if (left === 0) out.push({ ...acc });
      return;
    }
    const key = RESOURCES[index]!;
    const max = Math.min(have[key] ?? 0, left);
    for (let n = 0; n <= max; n++) {
      acc[key] = n;
      walk(index + 1, left - n, acc);
    }
  };
  walk(0, need, emptyBag());
  return out;
}

export function legalActions(state: LiveState, viewerId: number): AgentAction[] {
  if (viewerId < 0) return [];
  const offer = state.tradeOffer;
  if (offer) {
    if (offer.from === viewerId && offer.to !== viewerId) return [{ type: "cancelTrade" }];
    if (offer.to !== viewerId) return [];
    const actions: AgentAction[] = [{ type: "respondTrade", accept: false }];
    const giver = state.players[offer.from];
    const taker = state.players[offer.to];
    if (giver && taker && canPay(giver.resources, offer.give) && canPay(taker.resources, offer.want))
      actions.unshift({ type: "respondTrade", accept: true });
    return actions.filter((action) => apply(state, action).ok);
  }
  if (!yourTurn(state, viewerId)) return [];
  const actions: AgentAction[] = [];
  const phase = state.phase;
  if (phase === "setup") {
    if (state.setupNeed === "settlement") {
      for (const vertex of state.board.vertices)
        keep(state, { type: "placeSettlement", vertexId: vertex.id, hexes: vertex.hexIds ?? [] }, actions);
    } else {
      for (const edge of state.board.edges)
        keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
    }
    return actions;
  }
  if (phase === "roll") {
    keep(state, { type: "roll" }, actions);
    keep(state, { type: "playKnight" }, actions);
    return actions;
  }
  if (phase === "discard") {
    const me = state.players[viewerId];
    if (!me) return [];
    const need = Math.floor(total(me.resources) / 2);
    for (const resources of discards(me.resources, need))
      keep(state, { type: "discard", resources, count: need }, actions);
    return actions;
  }
  if (phase === "robber") {
    for (const hex of state.board.hexes) {
      if (hex.id === state.robberHexId) continue;
      keep(state, { type: "moveRobber", hexId: hex.id, terrain: hex.terrain, number: hex.number, stealFrom: null }, actions);
      for (const player of state.players) {
        if (player.id === viewerId) continue;
        keep(
          state,
          { type: "moveRobber", hexId: hex.id, terrain: hex.terrain, number: hex.number, stealFrom: player.id },
          actions,
        );
      }
    }
    return actions;
  }
  if (phase === "roadBuilding") {
    for (const edge of state.board.edges)
      keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
    keep(state, { type: "skipFreeRoad" }, actions);
    return actions;
  }
  if (phase !== "main") return actions;
  for (const edge of state.board.edges)
    keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
  for (const vertex of state.board.vertices) {
    keep(state, { type: "placeSettlement", vertexId: vertex.id, hexes: vertex.hexIds ?? [] }, actions);
    keep(state, { type: "placeCity", vertexId: vertex.id }, actions);
  }
  keep(state, { type: "buyDev" }, actions);
  keep(state, { type: "playKnight" }, actions);
  keep(state, { type: "playRoads" }, actions);
  for (const resource of RESOURCES) keep(state, { type: "playMonopoly", resource }, actions);
  for (const a of RESOURCES)
    for (const b of RESOURCES) keep(state, { type: "playPlenty", a, b }, actions);
  for (const give of RESOURCES)
    for (const get of RESOURCES) {
      if (give === get) continue;
      keep(state, { type: "bankTrade", give, get }, actions);
    }
  for (const other of state.players) {
    if (other.id === viewerId) continue;
    for (const give of RESOURCES)
      for (const want of RESOURCES) {
        if (give === want) continue;
        const giveBag = emptyBag();
        const wantBag = emptyBag();
        giveBag[give] = 1;
        wantBag[want] = 1;
        keep(state, { type: "offerTrade", to: other.id, give: giveBag, want: wantBag }, actions);
      }
  }
  keep(state, { type: "endTurn" }, actions);
  return actions;
}

export function projectState(state: LiveState, session: SessionInfo) {
  const viewerId = session.yourSeat;
  const you = state.players[viewerId];
  return {
    ok: true as const,
    game: "Havn",
    rules: "Catan rules. First to 10 victory points wins. A knight may be played before the roll. Cards bought this turn cannot be played yet.",
    costs: COSTS,
    session: {
      ...session,
      yourName: you?.name ?? null,
      yourTurn: yourTurn(state, viewerId),
    },
    phase: state.phase,
    setupNeed: state.phase === "setup" ? state.setupNeed : null,
    turnNumber: state.turnNumber,
    revision: state.revision,
    currentPlayer: state.currentPlayer,
    winnerId: state.winnerId,
    robberHexId: state.robberHexId,
    lastRoll: state.lastRoll,
    pendingFreeRoads: state.phase === "roadBuilding" ? state.pendingFreeRoads : 0,
    bank: { ...emptyBag(), ...state.bank },
    developmentCardsLeft: state.deck?.length ?? 0,
    tradeOffer: state.tradeOffer
      ? {
          from: state.tradeOffer.from,
          to: state.tradeOffer.to,
          youGive: viewerId === state.tradeOffer.to ? state.tradeOffer.want : state.tradeOffer.give,
          youGet: viewerId === state.tradeOffer.to ? state.tradeOffer.give : state.tradeOffer.want,
        }
      : null,
    discardQueue: state.discardQueue ?? [],
    players: state.players.map((player) => projectPlayer(state, player, viewerId)),
    hexes: state.board.hexes.map((hex) => ({
      id: hex.id,
      q: hex.q,
      r: hex.r,
      terrain: hex.terrain,
      number: hex.number,
      robber: hex.id === state.robberHexId,
    })),
    vertices: state.board.vertices.map((vertex) => ({
      id: vertex.id,
      hexes: vertex.hexIds ?? [],
      building: vertex.building ? { playerId: vertex.building.player, type: vertex.building.type } : null,
      port: vertex.port?.kind ?? null,
    })),
    roads: state.board.edges
      .filter((edge) => edge.road)
      .map((edge) => ({ edgeId: edge.id, playerId: edge.road!.player, a: edge.a, b: edge.b })),
    ports: state.board.edges
      .filter((edge) => edge.port)
      .map((edge) => ({
        edgeId: edge.id,
        kind: edge.port!.kind,
        rate: edge.port!.kind === "generic" ? "3:1" : "2:1",
      })),
    legalActions: legalActions(state, viewerId),
  };
}

export function recentEvents(state: LiveState, session: SessionInfo) {
  return {
    ok: true as const,
    revision: state.revision,
    phase: state.phase,
    yourTurn: yourTurn(state, session.yourSeat),
    lastRoll: state.lastRoll,
    events: (state.log ?? []).slice(-20).map((line) => ({ id: line.id, text: line.text })),
  };
}

export function normalizeAction(input: unknown): AgentAction | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as { action?: unknown; type?: unknown };
  const action = raw.action && typeof raw.action === "object" ? raw.action : raw;
  const type = (action as { type?: unknown }).type;
  if (typeof type !== "string" || !type) return null;
  return action as AgentAction;
}
