/** WebMCP / ChatGPT site tools bound to the live Havn session in this tab. */
import { tryAction } from "./game";
import { useGame } from "./store-api";
import {
  asLive,
  legalActions,
  normalizeAction,
  projectState,
  recentEvents,
  type SessionInfo,
} from "./agent";

interface ModelTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: unknown) => Promise<unknown> | unknown;
}

interface ModelContextLike {
  registerTool: (tool: ModelTool, options?: { signal?: AbortSignal }) => Promise<unknown>;
}

const EMPTY = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

const ACTION = {
  type: "object",
  properties: {
    action: {
      type: "object",
      description:
        "One action from get_legal_actions. Larger offerTrade and discard piles are also accepted when the rules allow them.",
      properties: {
        type: { type: "string" },
      },
      required: ["type"],
      additionalProperties: true,
    },
  },
  required: ["action"],
  additionalProperties: false,
};

function modelContext(): ModelContextLike | null {
  if (typeof document === "undefined") return null;
  const mc = (document as Document & { modelContext?: ModelContextLike }).modelContext;
  if (!mc || typeof mc.registerTool !== "function") return null;
  return mc;
}

export function webmcpAvailable(): boolean {
  return modelContext() != null;
}

function session(): SessionInfo {
  const store = useGame.getState();
  return {
    role: store.matchRole,
    status: store.matchStatus,
    room: store.matchRoom,
    yourSeat: store.viewerId,
  };
}

function noGame(sessionInfo: SessionInfo) {
  return {
    ok: false,
    error: "No game is running in this tab.",
    session: { ...sessionInfo, yourName: null, yourTurn: false },
  };
}

function readState() {
  const info = session();
  const live = asLive(useGame.getState().state);
  return { info, live };
}

const tools: ModelTool[] = [
  {
    name: "get_game_state",
    description:
      "Read the live Havn board in this browser tab. Returns players, phase, hexes, buildings, roads, ports, your private cards, public information about everyone else, and the legal actions for your seat. Never includes another player's resource cards, development cards, or hidden victory points, and never includes the dice seed.",
    inputSchema: EMPTY,
    annotations: { readOnlyHint: true },
    execute: () => {
      const { info, live } = readState();
      if (!live) return noGame(info);
      return projectState(live, info);
    },
  },
  {
    name: "get_legal_actions",
    description:
      "List the actions your seat can take right now. Pass any returned object as play_action's action field. You may also offer a larger trade with {type:'offerTrade', to, give:{wood,brick,wool,grain,ore}, want:{...}} or discard an exact half with {type:'discard', resources:{...}} when it is your decision.",
    inputSchema: EMPTY,
    annotations: { readOnlyHint: true },
    execute: () => {
      const { info, live } = readState();
      if (!live) return { ...noGame(info), actions: [] };
      return {
        ok: true,
        yourSeat: info.yourSeat,
        yourTurn: projectState(live, info).session.yourTurn,
        actions: legalActions(live, info.yourSeat),
      };
    },
  },
  {
    name: "play_action",
    description:
      "Play one legal action for your own seat in the live game. Refuses another player's turn, a missing seat, and any move the game rules reject. On a joined table the action is sent to the host; call get_game_state again until revision changes.",
    inputSchema: ACTION,
    execute: (input) => {
      const action = normalizeAction(input);
      if (!action) return { ok: false, error: "Missing action. Pass { action: { type } } from get_legal_actions." };
      const store = useGame.getState();
      const info = session();
      const live = asLive(store.state);
      if (!live) return noGame(info);
      if (info.yourSeat < 0) return { ok: false, error: "You do not have a seat in this game yet." };
      if (info.role === "guest" && info.status !== "live")
        return { ok: false, error: "Not connected to the host yet." };
      const preview = tryAction(live, action) as { ok: true } | { ok: false; error: string };
      if (!preview.ok) return { ok: false, error: preview.error };
      const before = live.revision;
      store.dispatch(action);
      if (store.matchRole === "guest") {
        return {
          ok: true,
          sent: true,
          revision: before,
          note: "Action sent to the host. Call get_game_state until revision increases.",
        };
      }
      const next = asLive(useGame.getState().state);
      const failure = useGame.getState().error;
      if (!next || next.revision === before)
        return { ok: false, error: failure || "The action was not applied." };
      const last = next.log?.[next.log.length - 1];
      return { ok: true, revision: next.revision, phase: next.phase, event: last?.text ?? null };
    },
  },
  {
    name: "get_game_events",
    description:
      "Recent public events from the live game, including the last dice roll, so you can explain what just happened. Does not reveal hidden cards.",
    inputSchema: EMPTY,
    annotations: { readOnlyHint: true },
    execute: () => {
      const { info, live } = readState();
      if (!live) return noGame(info);
      return recentEvents(live, info);
    },
  },
];

let mounted: Promise<"ready" | "unavailable"> | null = null;

async function registerOnce(): Promise<"ready" | "unavailable"> {
  const mc = modelContext();
  if (!mc) return "unavailable";
  for (const tool of tools) {
    try {
      await mc.registerTool(tool);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!/duplicate/i.test(message)) throw err;
    }
  }
  return "ready";
}

/** Feature-detects document.modelContext and registers the four Havn tools. */
export function mountHavnSiteTools(): Promise<"ready" | "unavailable"> {
  if (!mounted) mounted = registerOnce();
  return mounted;
}
