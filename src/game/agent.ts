/** Read-only view and legal-action list for an external assistant. Rules stay in the engine. */
import { actingPlayerId, asBoard, tradePending } from "./match";
import { tryAction } from "./game";
import { movableShips, shipSpots, shipTargets, type SeaState } from "./archipelago";

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
  ship?: { player: number } | null;
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
  shipsLeft?: number;
  islands?: number[];
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
  tradeOffer: { from: number; to: number; pending?: number[]; give: Bag; want: Bag } | null;
  winnerId: number | null;
  turnNumber: number;
  log: { id: number; text: string }[];
  pendingFreeRoads: number;
  pro?: boolean;
  mode?: string;
  pirateHexId?: string | null;
  goldQueue?: { player: number; n: number }[];
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
const SEA_COSTS = { ...COSTS, ship: { wood: 1, wool: 1 } };

function costsFor(state: LiveState) {
  return state.mode === "sea" ? SEA_COSTS : COSTS;
}

function goldNeedOf(state: LiveState): number {
  const head = state.goldQueue?.[0];
  return head ? Math.min(head.n, total(state.bank)) : 0;
}

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
  points += (player.islands?.length ?? 0) * 2;
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
      ...(player.shipsLeft != null ? { shipsLeft: player.shipsLeft } : {}),
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
  if (tradePending(board).includes(viewerId)) return true;
  return actingPlayerId(board) === viewerId;
}

function keep(state: LiveState, action: AgentAction, into: AgentAction[]) {
  if (apply(state, action).ok) into.push(action);
}

function addShips(state: LiveState, viewerId: number, into: AgentAction[]) {
  if (state.mode !== "sea") return;
  for (const edgeId of shipSpots(state as unknown as SeaState, viewerId)) {
    const edge = state.board.edges.find((item) => item.id === edgeId);
    keep(state, { type: "placeShip", edgeId, a: edge?.a, b: edge?.b }, into);
  }
}

function discards(have: Bag, need: number): Bag[] {
  const out: Bag[] = [];
  const walk = (index: number, left: number, acc: Bag) => {
    if (out.length >= 80) return;
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
    const pending =
      Array.isArray(offer.pending) && offer.pending.length
        ? offer.pending
        : offer.to >= 0
          ? [offer.to]
          : [];
    if (offer.from === viewerId) return [{ type: "cancelTrade" }];
    if (!pending.includes(viewerId)) return [];
    const actions: AgentAction[] = [{ type: "respondTrade", accept: false, playerId: viewerId }];
    const giver = state.players[offer.from];
    const taker = state.players[viewerId];
    if (giver && taker && canPay(giver.resources, offer.give) && canPay(taker.resources, offer.want))
      actions.unshift({ type: "respondTrade", accept: true, playerId: viewerId });
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
      for (const edge of state.board.edges) {
        keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
      }
      addShips(state, viewerId, actions);
    }
    return actions;
  }
  if (phase === "gold") {
    const need = goldNeedOf(state);
    for (const resources of discards(state.bank, need))
      keep(state, { type: "pickGold", resources, count: need }, actions);
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
    for (const edge of state.board.edges) {
      keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
    }
    addShips(state, viewerId, actions);
    keep(state, { type: "skipFreeRoad" }, actions);
    return actions;
  }
  if (phase !== "main") return actions;
  for (const edge of state.board.edges) {
    keep(state, { type: "placeRoad", edgeId: edge.id, a: edge.a, b: edge.b }, actions);
  }
  addShips(state, viewerId, actions);
  if (state.mode === "sea") {
    const sea = state as unknown as SeaState;
    for (const from of movableShips(sea, viewerId))
      for (const to of shipTargets(sea, viewerId, from)) keep(state, { type: "moveShip", from, to }, actions);
  }
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
  if (state.players.filter((player) => player.id !== viewerId).length > 1) {
    for (const give of RESOURCES)
      for (const want of RESOURCES) {
        if (give === want) continue;
        const giveBag = emptyBag();
        const wantBag = emptyBag();
        giveBag[give] = 1;
        wantBag[want] = 1;
        keep(state, { type: "offerTrade", to: -1, give: giveBag, want: wantBag }, actions);
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
    rules:
      state.mode === "sea"
        ? "Catan rules with the archipelago extension. First to 13 victory points wins. Ships (wood + wool) sail on sea edges and link to roads only at your own settlement or city; once per turn you may move one ship at the open end of a route. A seven or knight moves either the robber (land) or the pirate (sea; it robs players with ships next to it and blocks ships there). Gold rivers pay any resource you choose (pickGold). Your first settlement on each outlying island earns 2 victory points. Roads and ships together count toward the longest route."
        : "Catan rules. First to 10 victory points wins. A knight may be played before the roll. Cards bought this turn cannot be played yet.",
    costs: costsFor(state),
    mode: state.mode ?? "classic",
    session: {
      ...session,
      yourName: you?.name ?? null,
      yourTurn: yourTurn(state, viewerId),
    },
    phase: state.phase,
    pro: !!state.pro,
    setupNeed: state.phase === "setup" ? state.setupNeed : null,
    turnNumber: state.turnNumber,
    revision: state.revision,
    currentPlayer: state.currentPlayer,
    winnerId: state.winnerId,
    robberHexId: state.robberHexId,
    pirateHexId: state.pirateHexId ?? null,
    goldToPick: state.phase === "gold" ? goldNeedOf(state) : 0,
    lastRoll: state.lastRoll,
    pendingFreeRoads: state.phase === "roadBuilding" ? state.pendingFreeRoads : 0,
    bank: { ...emptyBag(), ...state.bank },
    developmentCardsLeft: state.deck?.length ?? 0,
    tradeOffer: state.tradeOffer
      ? {
          from: state.tradeOffer.from,
          to: state.tradeOffer.to,
          pending: tradePending(asBoard(state)!),
          youGive: tradePending(asBoard(state)!).includes(viewerId)
            ? state.tradeOffer.want
            : state.tradeOffer.give,
          youGet: tradePending(asBoard(state)!).includes(viewerId)
            ? state.tradeOffer.give
            : state.tradeOffer.want,
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
      pirate: hex.id === state.pirateHexId,
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
    ships: state.board.edges
      .filter((edge) => edge.ship)
      .map((edge) => ({ edgeId: edge.id, playerId: edge.ship!.player, a: edge.a, b: edge.b })),
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

export function stepComputers(state: LiveState): LiveState {
  let current = state;
  for (let n = 0; n < 24; n++) {
    if (current.phase === "gameOver" || current.winnerId != null) break;
    const board = asBoard(current);
    if (!board) break;
    const actor = actingPlayerId(board);
    const player = current.players[actor];
    if (!player?.isAi) break;
    const actions = legalActions(current, actor);
    const pick =
      actions.find((action) => action.type === "respondTrade" && action.accept === false) ??
      actions.find((action) => action.type === "cancelTrade") ??
      actions.find((action) => action.type === "roll") ??
      actions.find((action) => action.type === "placeSettlement") ??
      actions.find((action) => action.type === "placeRoad") ??
      actions.find((action) => action.type === "discard") ??
      actions.find((action) => action.type === "pickGold") ??
      actions.find((action) => action.type === "moveRobber") ??
      actions.find((action) => action.type === "skipFreeRoad") ??
      actions.find((action) => action.type === "endTurn") ??
      actions[0];
    if (!pick) break;
    const result = apply(current, pick);
    if (!result.ok) break;
    const next = asLive(result.state);
    if (!next || next.revision === current.revision) break;
    current = next;
  }
  return current;
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

const TERRAIN_SV: Record<string, string> = {
  wood: "skog",
  brick: "lera",
  wool: "ull",
  grain: "vete",
  ore: "malm",
  desert: "öken",
  sea: "hav",
  lake: "sjö",
  gold: "guldflod",
};

const PLAYER_COLORS = ["#b42318", "#2b5f8a", "#e8dcc4", "#1f6b56"];
const PLAYER_COLOR_NAMES = ["karmosin", "havsblå", "linne", "furugrön"];

export interface BoardRefs {
  hex: Map<string, string>;
  hexBack: Map<string, string>;
  junction: Map<string, string>;
  junctionBack: Map<string, string>;
  edge: Map<string, string>;
  edgeBack: Map<string, string>;
}

function shortIds(ids: string[], prefix: string): Map<string, string> {
  const map = new Map<string, string>();
  [...ids].sort().forEach((id, index) => map.set(id, `${prefix}${index + 1}`));
  return map;
}

export function boardRefs(state: LiveState): BoardRefs {
  const hex = shortIds(state.board.hexes.map((item) => item.id), "h");
  const junction = shortIds(state.board.vertices.map((item) => item.id), "j");
  const edge = shortIds(state.board.edges.map((item) => item.id), "e");
  const flip = (map: Map<string, string>) => new Map([...map].map(([k, v]) => [v, k]));
  return { hex, hexBack: flip(hex), junction, junctionBack: flip(junction), edge, edgeBack: flip(edge) };
}

export function publicPhase(state: LiveState): string {
  if (state.phase === "gameOver") return "ended";
  if (state.tradeOffer) return "trade";
  if (state.phase === "setup" || state.phase === "roll" || state.phase === "main") return state.phase;
  if (state.phase === "discard" || state.phase === "robber" || state.phase === "gold") return state.phase;
  if (state.phase === "roadBuilding") return "main";
  return state.phase;
}

function tradeRate(state: LiveState, seat: number, resource: string): number {
  let generic = false;
  let specific = false;
  for (const vertex of state.board.vertices) {
    if (vertex.building?.player !== seat || !vertex.port) continue;
    if (vertex.port.kind === resource) specific = true;
    if (vertex.port.kind === "generic") generic = true;
  }
  return specific ? 2 : generic ? 3 : 4;
}

function annotate(state: LiveState, refs: BoardRefs, action: AgentAction): AgentAction {
  const next: AgentAction = { ...action };
  if (typeof next.vertexId === "string") next.junction = refs.junction.get(next.vertexId) ?? next.vertexId;
  if (typeof next.edgeId === "string") next.edge = refs.edge.get(next.edgeId) ?? next.edgeId;
  if (typeof next.hexId === "string") next.hex = refs.hex.get(next.hexId) ?? next.hexId;
  if (next.type === "bankTrade" && typeof next.give === "string") {
    next.ratio = tradeRate(state, state.currentPlayer, next.give);
  }
  if (next.type === "respondTrade" || next.type === "cancelTrade") next.offerId = state.revision;
  return next;
}

export function resolveAction(state: LiveState, action: AgentAction): AgentAction {
  const refs = boardRefs(state);
  const type = action.type === "buildRoad" ? "placeRoad" : action.type;
  const next: AgentAction = { ...action, type };
  if (typeof next.junction === "string" && typeof next.vertexId !== "string") {
    next.vertexId = refs.junctionBack.get(next.junction) ?? next.junction;
  }
  if (typeof next.edge === "string" && typeof next.edgeId !== "string") {
    next.edgeId = refs.edgeBack.get(next.edge) ?? next.edge;
  }
  if (typeof next.hex === "string" && typeof next.hexId !== "string") {
    next.hexId = refs.hexBack.get(next.hex) ?? next.hex;
  }
  return next;
}

export function describeAttention(state: LiveState, seat: number) {
  const yours = yourTurn(state, seat);
  const offer = state.tradeOffer;
  const from = offer ? state.players[offer.from] : undefined;
  const pending = offer ? tradePending(asBoard(state)!) : [];
  const toName = pending
    .map((id) => state.players[id]?.name)
    .filter(Boolean)
    .join(", ");
  if (state.phase === "gameOver" || state.winnerId != null) {
    const winner = state.players[state.winnerId ?? 0];
    return { reason: "game_over", yourTurn: false, notice: `${winner?.name ?? ""} vann` };
  }
  if (offer && pending.includes(seat)) {
    return { reason: "trade_offer", yourTurn: true, notice: `${from?.name ?? ""} erbjuder ett byte` };
  }
  if (offer) {
    return {
      reason: "trade_waiting",
      yourTurn: false,
      notice: `${from?.name ?? ""} väntar på svar från ${toName}`,
    };
  }
  const actor = state.players[actingPlayerId(asBoard(state)!)];
  if (!yours) return { reason: "waiting", yourTurn: false, notice: `Väntar på ${actor?.name ?? ""}` };
  if (state.phase === "discard") return { reason: "discard", yourTurn: true, notice: "Släng kort" };
  if (state.phase === "robber") return { reason: "robber", yourTurn: true, notice: "Flytta rövaren" };
  if (state.phase === "gold") return { reason: "gold", yourTurn: true, notice: "Välj råvaror ur guldfloden" };
  if (state.phase === "roll") return { reason: "your_turn", yourTurn: true, notice: "Din tur: slå tärning" };
  if (state.phase === "setup") return { reason: "your_turn", yourTurn: true, notice: "Din tur: grundlägg" };
  return { reason: "your_turn", yourTurn: true, notice: "Din tur" };
}

function hexBlurb(state: LiveState, hexId: string): string {
  const hex = state.board.hexes.find((item) => item.id === hexId);
  if (!hex) return hexId;
  const name = TERRAIN_SV[hex.terrain] ?? hex.terrain;
  if (hex.terrain === "desert" || hex.number == null) return name;
  return `${hex.number} ${name}`;
}

export function apiView(state: LiveState, seat: number) {
  const refs = boardRefs(state);
  const you = state.players[seat];
  const phase = publicPhase(state);
  const junctions = state.board.vertices.map((vertex) => {
    const id = refs.junction.get(vertex.id) ?? vertex.id;
    const text = (vertex.hexIds ?? []).map((hexId) => hexBlurb(state, hexId)).join(" / ");
    return {
      id,
      ref: vertex.id,
      hexes: (vertex.hexIds ?? []).map((hexId) => refs.hex.get(hexId) ?? hexId),
      owner: vertex.building ? vertex.building.player : null,
      building: vertex.building?.type ?? null,
      port: vertex.port?.kind ?? null,
      text: `${id}: ${text || "hav"}`,
    };
  });
  const edges = state.board.edges.map((edge) => ({
    id: refs.edge.get(edge.id) ?? edge.id,
    ref: edge.id,
    from: refs.junction.get(edge.a) ?? edge.a,
    to: refs.junction.get(edge.b) ?? edge.b,
    owner: edge.road ? edge.road.player : edge.ship ? edge.ship.player : null,
    piece: edge.road ? "road" : edge.ship ? "ship" : null,
  }));
  const ports = state.board.edges
    .filter((edge) => edge.port)
    .map((edge, index) => ({
      id: `p${index + 1}`,
      type: edge.port!.kind,
      rate: edge.port!.kind === "generic" ? "3:1" : "2:1",
      junctions: [refs.junction.get(edge.a) ?? edge.a, refs.junction.get(edge.b) ?? edge.b],
    }));
  const attention = describeAttention(state, seat);
  return {
    ok: true as const,
    game: "Havn",
    roomSeat: seat,
    you: seat,
    yourTurn: attention.yourTurn,
    attention,
    needsResponse:
      attention.reason === "trade_offer" ||
      attention.reason === "discard" ||
      attention.reason === "robber" ||
      attention.reason === "gold",
    costs: costsFor(state),
    mode: state.mode ?? "classic",
    goldToPick: state.phase === "gold" ? goldNeedOf(state) : 0,
    portRates: Object.fromEntries(RESOURCES.map((resource) => [resource, tradeRate(state, seat, resource)])),
    phase,
    pro: !!state.pro,
    enginePhase: state.phase,
    setupNeed: state.phase === "setup" ? state.setupNeed : null,
    pendingFreeRoads: state.phase === "roadBuilding" ? state.pendingFreeRoads : 0,
    currentPlayer: actingPlayerId(asBoard(state)!) ,
    round: state.turnNumber,
    revision: state.revision,
    lastRoll: state.lastRoll,
    winnerId: state.winnerId,
    pendingTrade: state.tradeOffer
      ? {
          offerId: state.revision,
          from: state.tradeOffer.from,
          fromName: state.players[state.tradeOffer.from]?.name ?? null,
          to: state.tradeOffer.to,
          toName:
            (state.tradeOffer.pending?.length ?? 0) > 1
              ? state.tradeOffer.pending!.map((id) => state.players[id]?.name).filter(Boolean).join(", ")
              : (state.players[state.tradeOffer.to]?.name ?? null),
          pending: state.tradeOffer.pending ?? (state.tradeOffer.to >= 0 ? [state.tradeOffer.to] : []),
          give: state.tradeOffer.give,
          want: state.tradeOffer.want,
        }
      : null,
    log: (state.log ?? []).slice(-20).map((line) => ({ id: line.id, text: line.text })),
    players: state.players.map((player) => {
      const mine = player.id === seat;
      const shown = publicPoints(state, player);
      return {
        id: player.id,
        name: player.name,
        color: PLAYER_COLORS[player.colorIndex] ?? PLAYER_COLORS[0],
        colorName: PLAYER_COLOR_NAMES[player.colorIndex] ?? PLAYER_COLOR_NAMES[0],
        isYou: mine,
        isComputer: player.isAi,
        points: mine ? shown + (player.vpCards ?? 0) : shown,
        hiddenPoints: mine ? (player.vpCards ?? 0) : null,
        cardCount: total(player.resources) + (player.hand?.length ?? 0) + (player.newHand?.length ?? 0),
        resources: mine ? { ...emptyBag(), ...player.resources } : { hidden: true, total: total(player.resources) },
        developmentCards: mine
          ? { playable: [...(player.hand ?? [])], boughtThisTurn: [...(player.newHand ?? [])] }
          : { hidden: true, count: (player.hand?.length ?? 0) + (player.newHand?.length ?? 0) },
        longestRoad: player.hasLongestRoad,
        largestArmy: player.hasLargestArmy,
        knightsPlayed: player.knightsPlayed,
      };
    }),
    board: {
      robber: state.robberHexId ? (refs.hex.get(state.robberHexId) ?? state.robberHexId) : null,
      pirate: state.pirateHexId ? (refs.hex.get(state.pirateHexId) ?? state.pirateHexId) : null,
      hexes: state.board.hexes.map((hex) => ({
        id: refs.hex.get(hex.id) ?? hex.id,
        ref: hex.id,
        resource: hex.terrain,
        number: hex.number,
        robber: hex.id === state.robberHexId,
        pirate: hex.id === state.pirateHexId,
        q: hex.q,
        r: hex.r,
      })),
      junctions,
      edges,
      ports,
      text: junctions.map((item) => item.text),
    },
    bank: { ...emptyBag(), ...state.bank },
    yourName: you?.name ?? null,
    legalActions: legalActions(state, seat).map((action) => annotate(state, refs, action)),
  };
}

