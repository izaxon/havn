import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";

const FLAGS = ["--enable-features=WebMCP,WebMCPTesting", "--enable-blink-features=WebMCP"];
const HOME = "http://127.0.0.1:8080/";

async function callTool(page, name, input = {}) {
  return page.evaluate(
    async ({ name, input }) => {
      const mc = document.modelContext;
      if (!mc) throw new Error("document.modelContext is missing");
      const tool = (await mc.getTools()).find((item) => item.name === name);
      if (!tool) throw new Error(`tool ${name} is not registered`);
      let raw;
      try {
        raw = await mc.executeTool(tool, JSON.stringify(input));
      } catch {
        raw = await mc.executeTool(tool, input);
      }
      return JSON.parse(raw);
    },
    { name, input },
  );
}

test("WebMCP tools play a legal move and reject an illegal one", async () => {
  const browser = await chromium.launch({ args: FLAGS });
  const page = await browser.newPage();
  try {
    await page.goto(HOME, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-testid=havn-webmcp][data-status=ready]", {
      state: "attached",
      timeout: 15000,
    });
    const report = await page.evaluate(async () => {
      const { useGame } = await import("/src/game/store-api.ts");
      const { seatMayPlay } = await import("/src/game/match.ts");
      useGame.getState().toMenu();
      useGame.getState().start({
        seats: [
          { name: "Du", colorIndex: 0, isAi: false },
          { name: "Sigrid", colorIndex: 1, isAi: false },
        ],
      });
      const mc = document.modelContext;
      const names = (await mc.getTools()).map((tool) => tool.name);
      const call = async (name, input) => {
        const tool = (await mc.getTools()).find((item) => item.name === name);
        const raw = await mc.executeTool(tool, JSON.stringify(input ?? {}));
        return JSON.parse(raw);
      };
      const before = await call("get_game_state", {});
      const legal = await call("get_legal_actions", {});
      const place = legal.actions.find((action) => action.type === "placeSettlement");
      const played = place ? await call("play_action", { action: place }) : null;
      const after = await call("get_game_state", {});
      const illegal = await call("play_action", { action: { type: "roll" } });
      const road = (await call("get_legal_actions", {})).actions.find((action) => action.type === "placeRoad");
      const playedRoad = road ? await call("play_action", { action: road }) : null;
      const otherTurn = await call("play_action", { action: { type: "placeSettlement", vertexId: "0:0" } });
      const events = await call("get_game_events", {});
      const st = structuredClone(useGame.getState().state);
      st.players[1].resources = { wood: 3, brick: 1, wool: 0, grain: 0, ore: 0 };
      st.players[1].hand = ["knight"];
      st.players[1].vpCards = 1;
      useGame.setState({ state: st });
      const hidden = await call("get_game_state", {});
      const opponent = hidden.players.find((player) => player.id === 1);
      const live = useGame.getState().state;
      return {
        names,
        playerCount: before.players?.length ?? 0,
        yourSeat: before.session?.yourSeat,
        phase: before.phase,
        placeCount: legal.actions.filter((action) => action.type === "placeSettlement").length,
        played,
        setupNeed: after.setupNeed,
        buildings: after.vertices?.filter((vertex) => vertex.building).length ?? 0,
        revisionUp: (after.revision ?? 0) > (before.revision ?? 0),
        illegal,
        playedRoad,
        otherTurn,
        eventCount: events.events?.length ?? 0,
        opponent,
        seedLeaked: JSON.stringify(hidden).includes(`"seed"`),
        seatGate:
          seatMayPlay(live, 0, { type: "placeSettlement" }) === false &&
          seatMayPlay(live, 1, { type: "placeSettlement" }) === true,
      };
    });
    assert.deepEqual(
      [...new Set(report.names.filter((name) => name.startsWith("get_") || name === "play_action"))].sort(),
      ["get_game_events", "get_game_state", "get_legal_actions", "play_action"],
    );
    assert.equal(report.playerCount, 2);
    assert.equal(report.yourSeat, 0);
    assert.equal(report.phase, "setup");
    assert.ok(report.placeCount > 0, "expected settlement choices");
    assert.equal(report.played.ok, true);
    assert.equal(report.setupNeed, "road");
    assert.equal(report.buildings, 1);
    assert.equal(report.revisionUp, true);
    assert.equal(report.illegal.ok, false);
    assert.match(report.illegal.error, /.+/);
    assert.equal(report.playedRoad.ok, true);
    assert.equal(report.otherTurn.ok, false);
    assert.ok(report.eventCount > 0);
    assert.equal(report.opponent.resources.hidden, true);
    assert.equal(report.opponent.resources.total, 4);
    assert.equal(report.opponent.resources.wood, undefined);
    assert.equal(report.opponent.developmentCards.hidden, true);
    assert.equal(report.opponent.developmentCards.count, 1);
    assert.equal(report.opponent.hiddenVictoryPoints, null);
    assert.equal(report.seedLeaked, false);
    assert.equal(report.seatGate, true);
  } finally {
    await browser.close();
  }
});

test("without WebMCP the page reports the limitation instead of pretending", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto(HOME, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-testid=havn-webmcp][data-status=unavailable]", {
      state: "attached",
      timeout: 15000,
    });
    const present = await page.evaluate(() => "modelContext" in document && !!document.modelContext?.registerTool);
    assert.equal(present, false);
  } finally {
    await browser.close();
  }
});

test("a joined seat can read the live table and cannot play the host's turn", async () => {
  const browser = await chromium.launch({ args: FLAGS });
  const host = await browser.newPage();
  const guest = await browser.newPage();
  try {
    await host.goto(HOME, { waitUntil: "domcontentloaded" });
    await host.waitForSelector("[data-status=ready]", { state: "attached", timeout: 15000 });
    const code = await host.evaluate(async () => {
      const { useGame } = await import("/src/game/store-api.ts");
      useGame.getState().toMenu();
      return useGame.getState().startInvite([
        { name: "Du", colorIndex: 0, isAi: false },
        { name: "Vän", colorIndex: 1, isAi: false },
      ]);
    });
    assert.match(code, /^[a-z0-9]+$/i);
    await guest.goto(`${HOME}?join=${code}&name=ChatGPT`, { waitUntil: "domcontentloaded" });
    await guest.waitForSelector("[data-status=ready]", { state: "attached", timeout: 15000 });
    let seated = null;
    for (let i = 0; i < 40 && !seated; i++) {
      const view = await callTool(guest, "get_game_state", {});
      if (view.ok && view.session?.yourSeat >= 0 && view.session?.yourName === "ChatGPT") seated = view;
      else await guest.waitForTimeout(250);
    }
    assert.ok(seated?.ok, "guest never received the live board");
    assert.equal(seated.session.yourName, "ChatGPT");
    assert.equal(seated.session.yourTurn, false);
    const refused = await callTool(guest, "play_action", {
      action: { type: "placeSettlement", vertexId: seated.legalActions[0]?.vertexId ?? "0:0" },
    });
    assert.equal(refused.ok, false);
    const hostView = await callTool(host, "get_game_state", {});
    assert.equal(hostView.session.yourSeat, 0);
    assert.equal(hostView.session.yourTurn, true);
    const move = hostView.legalActions.find((action) => action.type === "placeSettlement");
    const played = await callTool(host, "play_action", { action: move });
    assert.equal(played.ok, true);
    let seen = false;
    for (let i = 0; i < 20; i++) {
      const view = await callTool(guest, "get_game_state", {});
      if ((view.revision ?? 0) > seated.revision) {
        seen = true;
        break;
      }
      await guest.waitForTimeout(200);
    }
    assert.equal(seen, true);
  } finally {
    await browser.close();
  }
});
