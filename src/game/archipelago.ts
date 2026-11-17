/**
 * "Skärgård" (archipelago) extended game: sea and lake hexes, outlying islands, ships,
 * a pirate, gold rivers and an island bonus. Pure rules over the plain game state used
 * by game.tsx. The base game never sets `mode: "sea"`, so none of this runs there.
 */

export const SEA_MODE = "sea";
export const SEA_WIN_TARGET = 13;
export const ISLAND_BONUS = 2;
export const SHIPS_PER_PLAYER = 15;
export const SHIP_COST = { wood: 1, wool: 1 } as const;
export const HOME_ISLAND = 0;

const RESOURCES = ["wood", "brick", "wool", "grain", "ore"] as const;
type Resource = (typeof RESOURCES)[number];
export type Bag = Record<Resource, number>;

export interface Hex {
  id: string;
  q: number;
  r: number;
  terrain: string;
  number: number | null;
  island?: number | null;
}
export interface Piece {
  player: number;
}
export interface Building extends Piece {
  type: string;
}
export interface Port {
  kind: string;
}
export interface Vertex {
  id: string;
  x: number;
  y: number;
  hexIds: string[];
  port: Port | null;
  building: Building | null;
  land?: boolean;
  island?: number | null;
}
export interface Edge {
  id: string;
  a: string;
  b: string;
  hexIds: string[];
  midX: number;
  midY: number;
  ox: number;
  oy: number;
  road: Piece | null;
  ship?: Piece | null;
  port: Port | null;
  land?: boolean;
  water?: boolean;
}
export interface Board {
  hexes: Hex[];
  vertices: Vertex[];
  edges: Edge[];
}
export interface SeaPlayer {
  id: number;
  resources: Bag;
  shipsLeft?: number;
  islands?: number[];
}
export interface GoldDebt {
  player: number;
  n: number;
}
export interface SeaState {
  mode?: string;
  phase: string;
  board: Board;
  players: SeaPlayer[];
  currentPlayer: number;
  robberHexId: string | null;
  pirateHexId?: string | null;
  lastSettlementId: string | null;
  movedShipThisTurn?: boolean;
  shipsBuiltThisTurn?: string[];
  goldQueue?: GoldDebt[];
  bank: Bag;
}

export function isSea(state: { mode?: string } | null | undefined): boolean {
  return state?.mode === SEA_MODE;
}

export function isWaterTerrain(terrain: string | undefined): boolean {
  return terrain === "sea" || terrain === "lake";
}

/* ---------- Board generation ---------- */

const SQ3 = Math.sqrt(3);
const DIRS = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

function hexId(q: number, r: number) {
  return `${q},${r}`;
}
function center(q: number, r: number) {
  return { x: 100 * SQ3 * (q + r / 2), y: 150 * r };
}
function corners(q: number, r: number) {
  const c = center(q, r);
  return [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return { x: c.x + 100 * Math.cos(a), y: c.y + 100 * Math.sin(a) };
  });
}
function vertexKey(x: number, y: number) {
  return `${Math.round(x)}:${Math.round(y)}`;
}
function edgeKey(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}
function ring(radius: number) {
  const out: { q: number; r: number }[] = [];
  let q = -radius;
  let r = radius;
  for (let side = 0; side < 6; side++)
    for (let step = 0; step < radius; step++) {
      out.push({ q, r });
      q += DIRS[side]!.q;
      r += DIRS[side]!.r;
    }
  return out;
}
function shuffle<T>(list: readonly T[], rng: () => number): T[] {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

const MAIN_TERRAIN = [
  ...Array(4).fill("wood"),
  ...Array(4).fill("wool"),
  ...Array(4).fill("grain"),
  ...Array(3).fill("brick"),
  ...Array(3).fill("ore"),
] as string[];
const MAIN_NUMBERS = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
const ISLAND_TERRAIN = ["gold", "gold", "wood", "wood", "brick", "brick", "wool", "wool", "grain", "grain", "ore", "ore"];
const ISLAND_NUMBERS = [2, 3, 4, 4, 5, 6, 8, 9, 10, 10, 11, 12];
/** Outer ring (radius 4) repeats this every 8 hexes: a three-hex island and a one-hex islet. */
const OUTER_PATTERN = [false, true, true, true, false, false, true, false];
const PORTS = ["generic", "generic", "generic", "generic", "wood", "brick", "wool", "grain", "ore"];

function hot(n: number | null) {
  return n === 6 || n === 8;
}

/** Builds the archipelago board: a main island around a lake, a sea ring, and six islands. */
export function makeSeaBoard(rng: () => number): {
  board: Board;
  robberHexId: null;
  pirateHexId: string;
} {
  const offset = Math.floor(rng() * 8);
  const outer = ring(4);
  const islandCells = outer.filter((_, i) => OUTER_PATTERN[(i + offset) % 8]);
  const mainCells = [...ring(1), ...ring(2)];
  const mainTerrain = shuffle(MAIN_TERRAIN, rng);
  const islandTerrain = shuffle(ISLAND_TERRAIN, rng);

  const hexes: Hex[] = [];
  hexes.push({ id: hexId(0, 0), q: 0, r: 0, terrain: "lake", number: null });
  mainCells.forEach((c, i) => hexes.push({ id: hexId(c.q, c.r), q: c.q, r: c.r, terrain: mainTerrain[i]!, number: null }));
  for (const c of ring(3)) hexes.push({ id: hexId(c.q, c.r), q: c.q, r: c.r, terrain: "sea", number: null });
  outer.forEach((c) => {
    const k = islandCells.indexOf(c);
    hexes.push({
      id: hexId(c.q, c.r),
      q: c.q,
      r: c.r,
      terrain: k >= 0 ? islandTerrain[k]! : "sea",
      number: null,
    });
  });
  const byId = new Map(hexes.map((h) => [h.id, h]));

  // Numbers: no adjacent 6/8, and gold rivers never on 6 or 8.
  const landHexes = (list: Hex[]) => list.filter((h) => !isWaterTerrain(h.terrain));
  const mainLand = hexes.filter((h) => mainCells.some((c) => hexId(c.q, c.r) === h.id));
  const islandLand = landHexes(hexes.filter((h) => islandCells.some((c) => hexId(c.q, c.r) === h.id)));
  const clash = () =>
    hexes.some(
      (h) =>
        (h.terrain === "gold" && hot(h.number)) ||
        (hot(h.number) &&
          DIRS.some((d) => hot(byId.get(hexId(h.q + d.q, h.r + d.r))?.number ?? null))),
    );
  for (let attempt = 0; attempt < 200; attempt++) {
    const a = shuffle(MAIN_NUMBERS, rng);
    const b = shuffle(ISLAND_NUMBERS, rng);
    mainLand.forEach((h, i) => (h.number = a[i]!));
    islandLand.forEach((h, i) => (h.number = b[i]!));
    if (!clash()) break;
  }

  // Islands: connected land components. The main island is always 0.
  let next = 1;
  for (const h of hexes) h.island = isWaterTerrain(h.terrain) ? null : undefined;
  const fill = (start: Hex, id: number) => {
    const stack = [start];
    start.island = id;
    while (stack.length) {
      const h = stack.pop()!;
      for (const d of DIRS) {
        const n = byId.get(hexId(h.q + d.q, h.r + d.r));
        if (n && n.island === undefined) {
          n.island = id;
          stack.push(n);
        }
      }
    }
  };
  fill(byId.get(hexId(1, 0))!, HOME_ISLAND);
  for (const h of hexes) if (h.island === undefined) fill(h, next++);

  // Geometry, matching the base board's ids and coordinates.
  const vertices = new Map<string, Vertex>();
  const edges = new Map<string, Edge>();
  for (const h of hexes) {
    const ids = corners(h.q, h.r).map((p) => {
      const key = vertexKey(p.x, p.y);
      const v = vertices.get(key);
      if (v) {
        if (!v.hexIds.includes(h.id)) v.hexIds.push(h.id);
      }
      else vertices.set(key, { id: key, x: p.x, y: p.y, hexIds: [h.id], port: null, building: null });
      return key;
    });
    for (let i = 0; i < 6; i++) {
      const a = ids[i]!;
      const b = ids[(i + 1) % 6]!;
      const key = edgeKey(a, b);
      const e = edges.get(key);
      if (e) {
        if (!e.hexIds.includes(h.id)) e.hexIds.push(h.id);
        continue;
      }
      const va = vertices.get(a)!;
      const vb = vertices.get(b)!;
      const midX = (va.x + vb.x) / 2;
      const midY = (va.y + vb.y) / 2;
      const c = center(h.q, h.r);
      const len = Math.hypot(midX - c.x, midY - c.y) || 1;
      edges.set(key, {
        id: key,
        a,
        b,
        hexIds: [h.id],
        midX,
        midY,
        ox: (midX - c.x) / len,
        oy: (midY - c.y) / len,
        road: null,
        ship: null,
        port: null,
      });
    }
  }
  for (const v of vertices.values()) {
    const land = v.hexIds.map((id) => byId.get(id)!).filter((h) => !isWaterTerrain(h.terrain));
    v.land = land.length > 0;
    v.island = land[0]?.island ?? null;
  }
  for (const e of edges.values()) {
    const hs = e.hexIds.map((id) => byId.get(id)!);
    e.land = hs.some((h) => !isWaterTerrain(h.terrain));
    e.water = hs.some((h) => isWaterTerrain(h.terrain));
  }

  // Harbors on the main island's sea coast, spread evenly.
  const coast = [...edges.values()].filter((e) => {
    const hs = e.hexIds.map((id) => byId.get(id)!);
    return hs.some((h) => h.island === HOME_ISLAND) && hs.some((h) => h.terrain === "sea");
  });
  coast.sort((a, b) => Math.atan2(a.midY, a.midX) - Math.atan2(b.midY, b.midX));
  const kinds = shuffle(PORTS, rng);
  const start = Math.floor(rng() * 3);
  kinds.forEach((kind, i) => {
    const e = coast[(start + i * 3) % coast.length]!;
    const port = { kind };
    e.port = port;
    const landHex = e.hexIds.map((id) => byId.get(id)!).find((h) => h.island === HOME_ISLAND)!;
    const c = center(landHex.q, landHex.r);
    const len = Math.hypot(e.midX - c.x, e.midY - c.y) || 1;
    e.ox = (e.midX - c.x) / len;
    e.oy = (e.midY - c.y) / len;
    for (const id of [e.a, e.b]) {
      const v = vertices.get(id)!;
      if (!v.port) v.port = port;
    }
  });

  const seaRing = hexes.filter((h) => h.terrain === "sea" && Math.max(Math.abs(h.q), Math.abs(h.r), Math.abs(h.q + h.r)) === 3);
  const pirate = seaRing[Math.floor(rng() * seaRing.length)]!;
  return { board: { hexes, vertices: [...vertices.values()], edges: [...edges.values()] }, robberHexId: null, pirateHexId: pirate.id };
}

/* ---------- Lookups ---------- */

function vertexMap(state: SeaState) {
  return new Map(state.board.vertices.map((v) => [v.id, v]));
}
function edgesAt(state: SeaState, vertexId: string, skip?: string) {
  return state.board.edges.filter((e) => e.id !== skip && (e.a === vertexId || e.b === vertexId));
}
export function hexIsWater(state: SeaState, hexId: string | null | undefined): boolean {
  if (!hexId) return false;
  return isWaterTerrain(state.board.hexes.find((h) => h.id === hexId)?.terrain);
}
/** Roads need land on at least one side. Base-game edges carry no flag and are all land. */
export function edgeIsLand(edge: Edge): boolean {
  return edge.land !== false;
}
export function edgeIsWater(edge: Edge): boolean {
  return edge.water === true;
}
export function vertexIsLand(vertex: Vertex): boolean {
  return vertex.land !== false;
}
function nearPirate(state: SeaState, edge: Edge) {
  return !!state.pirateHexId && edge.hexIds.includes(state.pirateHexId);
}

/* ---------- Ships ---------- */

/** Can `player` put a ship on `edgeId` now (phase checks are the caller's job)? */
export function canPlaceShip(state: SeaState, player: number, edgeId: string, ignore?: string): boolean {
  const edge = state.board.edges.find((e) => e.id === edgeId);
  if (!edge || edge.id === ignore || !edgeIsWater(edge) || edge.road || edge.ship) return false;
  if (nearPirate(state, edge)) return false;
  if (state.phase === "setup") return state.lastSettlementId === edge.a || state.lastSettlementId === edge.b;
  const verts = vertexMap(state);
  for (const id of [edge.a, edge.b]) {
    const v = verts.get(id);
    if (!v) continue;
    if (v.building?.player === player) return true;
    if (v.building) continue;
    if (edgesAt(state, id, edge.id).some((e) => e.id !== ignore && e.ship?.player === player)) return true;
  }
  return false;
}

export function shipSpots(state: SeaState, player: number): string[] {
  if (!isSea(state)) return [];
  const p = state.players[player];
  if (!p || (p.shipsLeft ?? 0) <= 0) return [];
  return state.board.edges.filter((e) => canPlaceShip(state, player, e.id)).map((e) => e.id);
}

/** Ships at the open end of a route that were not built this turn. One move per turn. */
export function movableShips(state: SeaState, player: number): string[] {
  if (!isSea(state) || state.movedShipThisTurn) return [];
  const built = new Set(state.shipsBuiltThisTurn ?? []);
  const verts = vertexMap(state);
  return state.board.edges
    .filter((e) => {
      if (e.ship?.player !== player || built.has(e.id) || nearPirate(state, e)) return false;
      return [e.a, e.b].some((id) => {
        const v = verts.get(id);
        if (v?.building?.player === player) return false;
        return !edgesAt(state, id, e.id).some((o) => o.ship?.player === player);
      });
    })
    .filter((e) => shipTargets(state, player, e.id).length > 0)
    .map((e) => e.id);
}

export function shipTargets(state: SeaState, player: number, fromId: string): string[] {
  const from = state.board.edges.find((e) => e.id === fromId);
  if (!from || from.ship?.player !== player) return [];
  const saved = from.ship;
  from.ship = null;
  try {
    return state.board.edges
      .filter((e) => e.id !== fromId && canPlaceShip(state, player, e.id, fromId))
      .map((e) => e.id);
  } finally {
    from.ship = saved;
  }
}

/* ---------- Pirate ---------- */

export function pirateVictims(state: SeaState, hexId: string, player: number): number[] {
  const out = new Set<number>();
  for (const e of state.board.edges) {
    if (!e.ship || e.ship.player === player || !e.hexIds.includes(hexId)) continue;
    const victim = state.players[e.ship.player];
    if (victim && RESOURCES.some((r) => victim.resources[r] > 0)) out.add(e.ship.player);
  }
  return [...out];
}

/* ---------- Islands and scoring ---------- */

/** The island a new settlement earns a bonus for, or null. */
export function islandBonusAt(state: SeaState, player: number, vertexId: string): number | null {
  if (!isSea(state)) return null;
  const v = state.board.vertices.find((x) => x.id === vertexId);
  const island = v?.island;
  if (island == null || island === HOME_ISLAND) return null;
  return state.players[player]?.islands?.includes(island) ? null : island;
}

export function islandPoints(player: SeaPlayer | undefined): number {
  return (player?.islands?.length ?? 0) * ISLAND_BONUS;
}

/**
 * Longest trade route: roads and ships, where a road and a ship join only at the
 * player's own settlement or city. Opposing buildings cut the route.
 */
export function routeLength(state: SeaState, player: number): number {
  const mine = state.board.edges.filter((e) => e.road?.player === player || e.ship?.player === player);
  if (mine.length === 0) return 0;
  const verts = vertexMap(state);
  const links: Record<string, string[]> = {};
  for (const e of mine) links[e.id] = [];
  for (let i = 0; i < mine.length; i++)
    for (let j = i + 1; j < mine.length; j++) {
      const a = mine[i]!;
      const b = mine[j]!;
      const shared = a.a === b.a || a.a === b.b ? a.a : a.b === b.a || a.b === b.b ? a.b : null;
      if (!shared) continue;
      const owner = verts.get(shared)?.building?.player;
      if (owner != null && owner !== player) continue;
      const sameKind = !!a.road === !!b.road;
      if (!sameKind && owner !== player) continue;
      links[a.id]!.push(b.id);
      links[b.id]!.push(a.id);
    }
  let best = 1;
  const walk = (id: string, seen: Set<string>, len: number) => {
    if (len > best) best = len;
    for (const n of links[id]!)
      if (!seen.has(n)) {
        seen.add(n);
        walk(n, seen, len + 1);
        seen.delete(n);
      }
  };
  for (const e of mine) walk(e.id, new Set([e.id]), 1);
  return best;
}

/* ---------- Gold rivers ---------- */

/** How many free picks each player earns from gold rivers on this roll, in turn order. */
export function goldDebts(state: SeaState, roll: number): GoldDebt[] {
  const owed = state.players.map(() => 0);
  for (const h of state.board.hexes) {
    if (h.terrain !== "gold" || h.number !== roll || h.id === state.robberHexId) continue;
    for (const v of state.board.vertices)
      if (v.building && v.hexIds.includes(h.id)) owed[v.building.player]! += v.building.type === "city" ? 2 : 1;
  }
  const out: GoldDebt[] = [];
  const count = state.players.length;
  for (let k = 0; k < count; k++) {
    const id = (state.currentPlayer + k) % count;
    if (owed[id]! > 0) out.push({ player: id, n: owed[id]! });
  }
  return out;
}

function bankTotal(bank: Bag) {
  return RESOURCES.reduce((n, r) => n + (bank[r] ?? 0), 0);
}

/** Picks owed by the head of the gold queue, capped by what the bank still holds. */
export function goldNeed(state: SeaState): number {
  const head = state.goldQueue?.[0];
  return head ? Math.min(head.n, bankTotal(state.bank)) : 0;
}

/** Computer choice for gold: fill the first goal it is short of, else its scarcest resource. */
export function chooseGold(have: Bag, bank: Bag, n: number, goals: Partial<Bag>[]): Bag {
  const pick: Bag = { wood: 0, brick: 0, wool: 0, grain: 0, ore: 0 };
  const sim = { ...have };
  const left = { ...bank };
  for (let k = 0; k < n; k++) {
    let choice: Resource | null = null;
    for (const goal of goals) {
      choice = RESOURCES.find((r) => (goal[r] ?? 0) > sim[r] && left[r] > 0) ?? null;
      if (choice) break;
    }
    if (!choice) {
      const open = RESOURCES.filter((r) => left[r] > 0);
      if (!open.length) break;
      choice = open.sort((a, b) => sim[a] - sim[b])[0]!;
    }
    pick[choice] += 1;
    sim[choice] += 1;
    left[choice] -= 1;
  }
  return pick;
}

/* ---------- Computer planning ---------- */

/**
 * Next ship toward the best free spot on an island the player has not settled.
 * `score` rates a vertex as a settlement site. Returns null when nothing is in reach.
 */
export function planShip(
  state: SeaState,
  player: number,
  score: (vertexId: string) => number,
  maxDist = 6,
): { edgeId: string; dist: number; target: string; value: number } | null {
  if (!isSea(state) || (state.players[player]?.shipsLeft ?? 0) <= 0) return null;
  const verts = vertexMap(state);
  const dist = new Map<string, number>();
  const firstEdge = new Map<string, string>();
  const queue: string[] = [];
  for (const v of state.board.vertices) {
    const own = v.building?.player === player;
    const shipEnd = !v.building && edgesAt(state, v.id).some((e) => e.ship?.player === player);
    if (own || shipEnd) {
      dist.set(v.id, 0);
      queue.push(v.id);
    }
  }
  while (queue.length) {
    const id = queue.shift()!;
    const d = dist.get(id)!;
    if (d >= maxDist) continue;
    const here = verts.get(id);
    if (d > 0 && here?.building) continue;
    for (const e of edgesAt(state, id)) {
      if (!edgeIsWater(e) || e.road || e.ship || nearPirate(state, e)) continue;
      const other = e.a === id ? e.b : e.a;
      if (dist.has(other)) continue;
      dist.set(other, d + 1);
      firstEdge.set(other, d === 0 ? e.id : firstEdge.get(id)!);
      queue.push(other);
    }
  }
  const p = state.players[player];
  let best: { edgeId: string; dist: number; target: string; value: number } | null = null;
  for (const [id, d] of dist) {
    if (d === 0) continue;
    const v = verts.get(id);
    if (!v || !vertexIsLand(v) || v.building || v.island == null || v.island === HOME_ISLAND) continue;
    const crowded = edgesAt(state, id).some((e) => verts.get(e.a === id ? e.b : e.a)?.building);
    if (crowded) continue;
    const bonus = p?.islands?.includes(v.island) ? 0 : 7;
    const value = score(id) + bonus - 2.2 * d;
    if (!best || value > best.value) best = { edgeId: firstEdge.get(id)!, dist: d, target: id, value };
  }
  return best;
}
