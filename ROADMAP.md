# Havn improvement plan

Written 2026-10-26 from a read of the code and the QA screenshots. Nothing here is
started; each phase is sized so one session can deliver something playable.

## Where the game stands

Complete and polished for a first release:

- Full Catan-style rule set: snake setup, dice and payout, robber and discard,
  all five development cards, bank trade with 3:1 and 2:1 harbors, player
  trades, longest road, largest army, ten points to win.
- Hot-seat play with AI opponents, five UI languages, save and continue in
  localStorage, sound toggle, a good-looking SVG board on desktop and mobile.
- Online play over WebRTC with invite links and host-owned seats.
- WebMCP tools so an external assistant (ChatGPT) can sit at the table.

What holds it back:

1. **The engine is unreadable.** `src/game/game.tsx` is 3,800 lines recovered
   from a minified bundle: functions are named `yr`, `vr`, `Qt`, the file is
   `@ts-nocheck`, and there is not a single test of the rules. Any rules or AI
   change is a blind edit.
2. **The AI is a one-step greedy heuristic** (see `yr`/`vr`): no planning across
   turns, never proposes trades, accepts trades on a card-count rule only, and
   has one difficulty.
3. **Online play is fragile by design**: host-authoritative state over a client
   mesh, no reconnect to a running match, and the host leaving ends it.
4. **The experience is static**: no animations, no game log view, no end-of-game
   summary, no undo before confirming a placement, and no guided first game.

## Phases, in recommended order

### Phase 0. Make the engine safe to change (do first)

Goal: a typed, tested rules engine with the UI untouched.

- Extract pure rules out of `game.tsx` into `src/game/engine/` one reducer at a
  time (`tryAction` is already the single entry point, and `agent.ts` already
  has typed state views to build on). Keep `game.tsx` importing the extracted
  pieces so the UI never breaks mid-way.
- Add an AI-vs-AI simulation test: play 200 seeded games to completion and
  assert invariants (resource totals, no illegal builds, a winner at ten
  points). This catches most rule regressions for free.
- Unit tests for the rules that are easy to get wrong: longest road with
  branches and cuts, largest army handoff, harbor rates, discard on seven.
- Remove `@ts-nocheck` from the extracted modules; leave the UI file as is.

Why first: every later phase edits rules or AI. Without this, each one is a
gamble.

### Phase 1. Feel and feedback

- Dice roll and resource-gain animations, settlement and city placement
  transitions, robber movement.
- A game log panel (the engine already records events via `pushLog`).
- End-of-game screen: final points breakdown, longest road and army history,
  resources collected per player, play again with the same island.
- Undo before confirm for setup placements and road building.
- **Make the robber and the card hand legible** (reported by players as the
  main point of confusion):
  - Robber: today it is a small dark silhouette (`ri` in `game.tsx`) with no
    label, no highlight and no mention in the side panel. Give it a halo and a
    contrasting outline, dim the hex it blocks and strike through that hex's
    number, animate its move, and add a side-panel line such as "Rövaren står
    på 6 (Berg): ger inga råvaror". Pulse it when the player must move it.
  - Development cards: today they are text-only buttons in a wrapping row,
    new cards are dashed outlines with no explanation, a disabled card gives no
    reason, and the section disappears entirely when the hand is empty, so
    players never learn that cards exist. Replace with a titled "Dina kort"
    section that is always present (empty state: "Köp kort: ull + säd +
    malm"), card tiles with icon, name and the one-line effect that already
    exists in the `devHint` catalog, a "ny, spelbar nästa tur" badge for cards
    bought this turn, the disabled reason on hover and tap ("ett kort per
    tur", "spela efter tärningen"), the owner's hidden victory-point cards
    counted, and knights played toward largest army (for example "2 av 3").
  - Tie the two together: hovering or tapping the knight card highlights the
    robber and explains that playing it moves the robber and steals a card,
    which also separates "Riddare" (the card) from "Rövaren" (the piece).
- First-game guidance: highlight legal spots and explain the first three
  decisions in place, instead of the rules dialog only.

### Phase 2. A worthy opponent

- Placement scoring on pip probability, resource diversity and harbor access.
- Turn planning: aim for a build target and trade toward it.
- AI-initiated trade offers and smarter acceptance (value by own need, not
  card count).
- Three difficulty levels and small personalities (builder, trader, raider),
  reusing the existing Swedish AI names.
- Measure with the Phase 0 simulator: new AI must beat the old one in a
  majority of seeded games before it ships.

### Phase 3. Online play that survives real life

- Reconnect to a live match from the invite link after a page reload or
  dropped connection, resuming from the host's state.
- Host hand-off when the host disconnects, or at minimum a clear "match
  paused" state instead of a dead table.
- Lobby that supports three and four human players, with the mix of human and
  AI seats visible before starting.
- Turn timer option for online games.

### Phase 4. Reasons to come back

- Daily island: one shared seed per day, compare results with friends.
- Map variants: larger island for five to six players, random harbor layout.
- Accounts, match history and a leaderboard. This is the first item that needs
  auth ON (`.grok/app-env.json` and the auth template); keep everything before
  it account-free.
- WebMCP polish for the ChatGPT voice-play use case: richer state projection,
  trade negotiation tools, and a visible "assistant seat" indicator.

## Decisions to make before starting

- **Where does development happen?** The repo is a Grok App Builder export.
  Phase 0 restructures the engine, which will conflict with further Grok
  exports. Pick one primary editor for the engine (this repo is the better
  choice once Phase 0 lands) and treat the other as read-only.
- **How much rules fidelity?** The current game follows the classic rules
  closely. Decide now whether house rules or variants are in scope, because
  the engine extraction is the cheapest moment to make rules configurable.
