# Grok Build prompt: make the robber and the card hand legible

Paste everything below the line into Grok Build.

---

Improve Havn so players can always see where the robber is and understand the
development cards they hold. Players report that the robber ("Rövaren") is hard
to find on the board, and that the knight card ("Riddare") and the other cards
are unclear: where they are, what they do, and why they sometimes cannot be
played. This is a presentation-only change: do not touch the rules engine or
`tryAction`.

All work is in `src/game/game.tsx`. Keep the existing visual language
(dark table, warm palette, rounded panels) and add every new string to all
five languages in `src/game/catalogs.ts` (sv, en, de, es, fr). Reuse the
strings that already exist: `dev.*` for card names, `devHint.*` for card
effects ("Flytta rövaren och stjäl ett kort." etc.), `ui.youHave` ("Dina
kort"), `phase.robber`.

## 1. Robber on the board

The robber is drawn by the `ri` component (an SVG `g` with a dark path) and
placed by the board component `ii` on the hex whose id equals
`state.robberHexId`.

- Give the robber a soft light halo and a contrasting outline so it reads on
  every terrain, including the dark forest and mountain hexes. Make it about
  40% larger.
- Dim the hex it stands on and draw the hex's number token struck through, so
  it is obvious that this hex pays nothing.
- Animate the robber when `robberHexId` changes (a short arc or slide, about
  300 ms, with `prefers-reduced-motion` respected).
- When `state.phase === "robber"` and it is the viewer's turn, pulse the
  robber and highlight every hex the viewer may move it to.
- In the side panel, under the turn hint, show one line with the robber's
  location, for example "Rövaren står på 6 (Berg): ger inga råvaror", using the
  hex's number and terrain name from `terrain.*`. Clicking that line briefly
  flashes the robber on the board.

## 2. Development cards in the player panel

The hand is rendered inside the player panel component `Qr`: a `flex-wrap`
row of small text buttons for `player.hand`, and dashed `span`s for
`player.newHand`. It is hidden when both are empty.

Replace that row with a titled section that is always present for the viewer:

- Title: `ui.youHave` ("Dina kort"). Empty state text: "Inga kort. Köp ett
  för ull + säd + malm." with the three resource icons inline.
- Each card is a tile with the card icon, its name from `dev.*`, and its
  effect from `devHint.*` in one small line. Tiles stay one-tap playable
  where the current buttons are.
- Cards in `player.newHand` show a badge "ny, spelbar nästa tur" and are
  visually muted.
- A card that is disabled shows the reason on hover and on tap instead of
  only fading: "ett kort per tur" when `state.playedDevThisTurn`, "spela efter
  tärningen" when the phase is not `main` (the knight may also be played in
  the `roll` phase; keep that rule), "inte din tur" otherwise.
- Show the viewer's hidden victory-point cards: `player.vpCards` as a tile
  "Segerpoäng × n" that cannot be played, with the `devHint.vp` text.
- Show knights played toward largest army: "Riddare spelade: 2 av 3" using
  `player.knightsPlayed`, turning into "Största armén" with the trophy icon
  once the player holds it.
- Never reveal another player's cards. For other players keep only the count
  shown today.

## 3. Connect the knight card to the robber

Hovering or tapping the knight tile highlights the robber on the board and
shows the `devHint.knight` text, so players learn that "Riddare" (the card)
moves "Rövaren" (the piece). Keep the two words distinct everywhere; never
use "Riddare" for the piece.

## Verify before finishing

- Play a solo game against two computers until the robber has moved at least
  twice, with the browser QA script, and confirm on desktop and mobile
  (390 px wide) that the robber is visible on a forest hex, the struck-through
  number renders, the card section shows the empty state, a bought card shows
  the badge, and a disabled card shows its reason on tap.
- No console errors, `npm run build` and `npm run typecheck` pass, all five
  languages have every new string.
