// Headless computer-vs-computer games through the real engine, to catch rule regressions.
// Usage: node scripts/sim-archipelago.mjs [games=40] [mode=sea|classic]
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const games = Number(process.argv[2] ?? 40);
const mode = process.argv[3] === "classic" ? undefined : "sea";

const server = await createServer({
  root,
  configFile: false,
  logLevel: "error",
  resolve: { alias: { "@": path.join(root, "src") } },
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
const engine = await server.ssrLoadModule("/src/game/game.tsx");
const RES = ["wood", "brick", "wool", "grain", "ore"];

const totals = { wins: 0, stuck: 0, errors: 0, turns: 0, ships: 0, moves: 0, islands: 0, gold: 0, pirate: 0 };
const problems = [];

for (let g = 0; g < games; g++) {
  const seats = Array.from({ length: 3 + (g % 2) }, (_, i) => ({ name: `AI ${i + 1}`, isAi: true, colorIndex: i }));
  let state = engine.newGame({ seats, seed: 1000 + g, mode, pro: g % 3 === 0 });
  let steps = 0;
  for (; steps < 6000 && state.phase !== "gameOver"; steps++) {
    const action = engine.computerAction(state);
    if (!action) {
      problems.push(`game ${g}: no computer action in phase ${state.phase}`);
      totals.stuck++;
      break;
    }
    const res = engine.tryAction(state, action);
    if (!res.ok) {
      problems.push(`game ${g}: ${action.type} rejected in ${state.phase}: ${res.error}`);
      totals.errors++;
      break;
    }
    if (action.type === "placeShip") totals.ships++;
    if (action.type === "moveShip") totals.moves++;
    if (action.type === "pickGold") totals.gold++;
    if (action.type === "moveRobber" && res.state.pirateHexId !== state.pirateHexId) totals.pirate++;
    state = res.state;
    for (const r of RES) {
      const held = state.players.reduce((n, p) => n + p.resources[r], 0);
      if (held + state.bank[r] !== 19 || state.bank[r] < 0 || state.players.some((p) => p.resources[r] < 0))
        throw new Error(`game ${g} step ${steps}: ${r} not conserved (bank ${state.bank[r]}, held ${held})`);
    }
    for (const p of state.players) {
      const built = state.board.edges.filter((e) => e.ship?.player === p.id).length;
      if (mode && built + p.shipsLeft !== 15) throw new Error(`game ${g}: ship count off for ${p.name}`);
    }
  }
  if (state.phase === "gameOver") {
    totals.wins++;
    totals.turns += state.turnNumber;
    totals.islands += state.players.reduce((n, p) => n + (p.islands?.length ?? 0), 0);
  } else if (steps >= 6000) {
    problems.push(`game ${g}: no winner after ${steps} steps (round ${state.turnNumber})`);
    totals.stuck++;
  }
}

await server.close();
console.log(JSON.stringify({ mode: mode ?? "classic", games, ...totals, avgRounds: +(totals.turns / Math.max(1, totals.wins)).toFixed(1) }, null, 2));
for (const p of problems.slice(0, 20)) console.log(p);
process.exit(problems.length ? 1 : 0);
