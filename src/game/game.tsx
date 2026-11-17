/* Recovered Havn game module (from deployed bundle) + multiplayer hooks. */
//@ts-nocheck
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Component,
  type ReactNode,
  type CSSProperties,
} from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { create } from "zustand";
import {
  BookOpen,
  Bot,
  Castle,
  CircleDot,
  CreditCard,
  Handshake,
  House,
  LogOut,
  Map as MapIcon,
  Plus,
  Route as RouteIcon,
  SkipForward,
  Trash2,
  User,
  Volume2,
  VolumeX,
  Music,
  X as XIcon,
  Link2,
  Sailboat,
  MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { t as i, useT, useLocaleStore, aiNames, youNames, friendNames, allAiNames, LocaleSwitch } from "@/game/i18n";
import { makeRoomCode } from "@/game/match";
import {
  SEA_MODE,
  SEA_WIN_TARGET,
  SHIPS_PER_PLAYER,
  SHIP_COST,
  HOME_ISLAND,
  isSea,
  isWaterTerrain,
  hexIsWater,
  edgeIsLand,
  vertexIsLand,
  makeSeaBoard,
  canPlaceShip,
  shipSpots,
  movableShips,
  shipTargets,
  pirateVictims,
  islandBonusAt,
  islandPoints,
  routeLength,
  goldDebts,
  goldNeed,
  chooseGold,
  planShip,
} from "@/game/archipelago";
import { SeaPatterns, ShipPiece, PiratePiece } from "@/game/sea-ui";


const p = BookOpen;
const m = Bot;
const h = Castle;
const g = CircleDot;
const _ = CreditCard;
const v = Handshake;
const y = House;
const b = LogOut;
const ee = MapIcon;
const te = Plus;
const ne = RouteIcon;
const x = SkipForward;
const S = Trash2;
const C = User;
const re = Volume2;
const ie = VolumeX;
const ae = XIcon;
const R = cn;
const B = Button;

var V = [`wood`, `brick`, `wool`, `grain`, `ore`],
  Jt = class extends Error {
    constructor(e) {
      (super(e), (this.name = `GameError`));
    }
  },
  H = [
    { fill: `#b42318`, stroke: `#3a0d0a`, label: `Karmosin` },
    { fill: `#2b5f8a`, stroke: `#0c2233`, label: `Havsblå` },
    { fill: `#e8dcc4`, stroke: `#4a4030`, label: `Linne` },
    { fill: `#1f6b56`, stroke: `#08221b`, label: `Furugrön` },
  ],
  U = {
    road: { wood: 1, brick: 1 },
    settlement: { wood: 1, brick: 1, wool: 1, grain: 1 },
    city: { grain: 2, ore: 3 },
    dev: { wool: 1, grain: 1, ore: 1 },
    ship: SHIP_COST,
  },
  Yt = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 },
  Xt = Math.sqrt(3),
  Zt = [
    { q: 1, r: 0 },
    { q: 1, r: -1 },
    { q: 0, r: -1 },
    { q: -1, r: 0 },
    { q: -1, r: 1 },
    { q: 0, r: 1 },
  ];
function Qt(e, t) {
  let n = -e - t;
  return (Math.abs(e) + Math.abs(t) + Math.abs(n)) / 2;
}
function $t(e, t) {
  return `${e},${t}`;
}
function en(e, t) {
  return { x: 100 * Xt * (e + t / 2), y: 150 * t };
}
function tn(e, t) {
  let n = en(e, t);
  return [0, 1, 2, 3, 4, 5].map((e) => {
    let t = (Math.PI / 180) * (60 * e - 30);
    return { x: n.x + 100 * Math.cos(t), y: n.y + 100 * Math.sin(t) };
  });
}
function nn(e, t) {
  return `${Math.round(e)}:${Math.round(t)}`;
}
function rn(e = 2) {
  let t = [];
  for (let n = -e; n <= e; n++) for (let r = -e; r <= e; r++) Qt(n, r) <= e && t.push({ q: n, r });
  return t;
}
function an(e, t) {
  return tn(e, t)
    .map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`)
    .join(` `);
}
function on(e, t) {
  return Zt.map((n) => ({ q: e + n.q, r: t + n.r }));
}
function sn(e) {
  let t = e >>> 0;
  return () => {
    ((t |= 0), (t = (t + 1831565813) | 0));
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function shuffleArr(e, t) {
  let n = e.slice();
  for (let e = n.length - 1; e > 0; e--) {
    let r = Math.floor(t() * (e + 1)),
      i = n[e];
    ((n[e] = n[r]), (n[r] = i));
  }
  return n;
}
function ln(e, t, n) {
  return t + Math.floor(e() * (n - t + 1));
}
var un = [
    `wood`,
    `wood`,
    `wood`,
    `wood`,
    `wool`,
    `wool`,
    `wool`,
    `wool`,
    `grain`,
    `grain`,
    `grain`,
    `grain`,
    `brick`,
    `brick`,
    `brick`,
    `ore`,
    `ore`,
    `ore`,
    `desert`,
  ],
  dn = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12],
  fn = [
    { kind: `generic` },
    { kind: `generic` },
    { kind: `generic` },
    { kind: `generic` },
    { kind: `wood` },
    { kind: `brick` },
    { kind: `wool` },
    { kind: `grain` },
    { kind: `ore` },
  ];
function pn(e, t) {
  return e < t ? `${e}|${t}` : `${t}|${e}`;
}
function mn(e) {
  let t = rn(2),
    n = shuffleArr(un, e),
    r = shuffleArr(dn, e),
    i = t.map((e, t) => ({ id: $t(e.q, e.r), q: e.q, r: e.r, terrain: n[t], number: null })),
    a = i.find((e) => e.terrain === `desert`),
    o = (e) => {
      let t = new Map(e.map((e) => [e.id, e]));
      for (let n of e)
        if (n.number === 6 || n.number === 8)
          for (let e of on(n.q, n.r)) {
            let n = t.get($t(e.q, e.r));
            if (n && (n.number === 6 || n.number === 8)) return !0;
          }
      return !1;
    };
  for (let t = 0; t < 80; t++) {
    let n = shuffleArr(dn, e),
      a = 0,
      s = i.map((e) => ({ ...e, number: e.terrain === `desert` ? null : n[a++] }));
    if (!o(s)) {
      ((i = s), (r = n));
      break;
    }
    if (t === 79) {
      let e = 0;
      i = i.map((t) => ({ ...t, number: t.terrain === `desert` ? null : r[e++] }));
    }
  }
  let s = new Map(),
    c = new Map();
  for (let e of i) {
    let t = tn(e.q, e.r).map((t) => {
      let n = nn(t.x, t.y),
        r = s.get(n);
      return (
        r
          ? r.hexIds.includes(e.id) || r.hexIds.push(e.id)
          : s.set(n, { id: n, x: t.x, y: t.y, hexIds: [e.id], port: null, building: null }),
        n
      );
    });
    for (let n = 0; n < 6; n++) {
      let r = t[n],
        i = t[(n + 1) % 6],
        a = pn(r, i),
        o = s.get(r),
        l = s.get(i),
        u = c.get(a);
      if (u) u.hexIds.includes(e.id) || u.hexIds.push(e.id);
      else {
        let t = (o.x + l.x) / 2,
          n = (o.y + l.y) / 2,
          s = en(e.q, e.r),
          u = t - s.x,
          d = n - s.y,
          f = Math.hypot(u, d) || 1;
        ((u /= f),
          (d /= f),
          c.set(a, {
            id: a,
            a: r,
            b: i,
            hexIds: [e.id],
            midX: t,
            midY: n,
            ox: u,
            oy: d,
            road: null,
            port: null,
          }));
      }
    }
  }
  let l = [...c.values()].filter((e) => e.hexIds.length === 1);
  l.sort((e, t) => Math.atan2(e.midY, e.midX) - Math.atan2(t.midY, t.midX));
  let u = shuffleArr(fn, e),
    d = 0;
  for (let e = 0; e < l.length && d < u.length; e += 2) {
    let t = l[e],
      n = u[d++];
    t.port = n;
    let r = s.get(t.a),
      i = s.get(t.b);
    (r && !r.port && (r.port = n), i && !i.port && (i.port = n));
  }
  return {
    board: { hexes: i, vertices: [...s.values()], edges: [...c.values()] },
    robberHexId: a.id,
  };
}
function hn(e) {
  return V.includes(e);
}
function W() {
  return { wood: 0, brick: 0, wool: 0, grain: 0, ore: 0 };
}
function gn() {
  return { wood: 19, brick: 19, wool: 19, grain: 19, ore: 19 };
}
function G(e) {
  return V.reduce((t, n) => t + e[n], 0);
}
function K(e, t) {
  return V.every((n) => e[n] >= (t[n] ?? 0));
}
function _n(e, t, n) {
  for (let r of V) {
    let i = n[r] ?? 0;
    ((e[r] -= i), (t[r] += i));
  }
}
function vn(e) {
  let t = Array.from({ length: e }, (e, t) => t);
  return [...t, ...t.slice().reverse()];
}
function yn(e) {
  if (e.phase === `discard`) return e.discardQueue[0] ?? e.currentPlayer;
  if (e.phase === `gold`) return e.goldQueue?.[0]?.player ?? e.currentPlayer;
  if (e.tradeOffer) {
    let t = offerPending(e),
      n = t.find((t) => e.players[t]?.isAi);
    return n ?? t[0] ?? e.currentPlayer;
  }
  return e.currentPlayer;
}
function q(e, t) {
  return e.board.vertices.find((e) => e.id === t);
}
function bn(e, t) {
  return e.board.edges.find((e) => e.id === t);
}
function xn(e, t) {
  return e.board.hexes.find((e) => e.id === t);
}
function Sn(e, t) {
  let n = [];
  for (let r of e.board.edges) r.a === t ? n.push(r.b) : r.b === t && n.push(r.a);
  return n;
}
function Cn(e, t) {
  return e.board.edges.filter((e) => e.a === t || e.b === t);
}
function wn(e, t) {
  let n = q(e, t);
  return !n || n.building || !vertexIsLand(n) ? !1 : Sn(e, t).every((t) => !q(e, t)?.building);
}
function Tn(e, t, n) {
  return Cn(e, n).some((e) => e.road?.player === t || e.ship?.player === t);
}
function En(e, t, n) {
  let r = bn(e, n);
  if (!r || !edgeIsLand(r)) return !1;
  for (let n of [r.a, r.b]) {
    let i = q(e, n);
    if (
      i?.building?.player === t ||
      (!(i?.building && i.building.player !== t) &&
        Cn(e, n).some((e) => e.id !== r.id && e.road?.player === t))
    )
      return !0;
  }
  return !1;
}
function Dn(e, t) {
  let n = e.phase === `setup`;
  return e.board.vertices
    .filter(
      (r) =>
        !(
          r.building ||
          !wn(e, r.id) ||
          (!n && !Tn(e, t, r.id)) ||
          (n && isSea(e) && r.island !== HOME_ISLAND)
        ),
    )
    .map((e) => e.id);
}
function On(e, t) {
  let n = e.players[t];
  if (!n || n.roadsLeft <= 0) return [];
  if (e.phase === `setup`) {
    let t = e.lastSettlementId;
    return t
      ? Cn(e, t)
          .filter((e) => !e.road && !e.ship && edgeIsLand(e))
          .map((e) => e.id)
      : [];
  }
  return e.board.edges.filter((n) => !n.road && !n.ship && En(e, t, n.id)).map((e) => e.id);
}
function kn(e, t) {
  return e.board.vertices
    .filter((e) => e.building?.player === t && e.building.type === `settlement`)
    .map((e) => e.id);
}
function An(e, t, n) {
  let r = !1,
    i = !1;
  for (let a of e.board.vertices)
    a.building?.player !== t ||
      !a.port ||
      (a.port.kind === n && (i = !0), a.port.kind === `generic` && (r = !0));
  return i ? 2 : r ? 3 : 4;
}
function jn(e, t) {
  let n = e.players[t];
  if (!n) return 0;
  let r = 0;
  for (let n of e.board.vertices)
    n.building?.player === t && (r += n.building.type === `city` ? 2 : 1);
  return (n.hasLongestRoad && (r += 2), n.hasLargestArmy && (r += 2), r + islandPoints(n));
}
function Mn(e, t) {
  return jn(e, t) + (e.players[t]?.vpCards ?? 0);
}
function Nn(e, t) {
  return routeLength(e, t);
}
function Pn(e) {
  return e == null ? 0 : (Yt[e] ?? 0);
}
function Fn(e, t, n) {
  let r = q(e, t);
  if (!r) return -1 / 0;
  let i = 0,
    a = new Set();
  for (let t of r.hexIds) {
    let r = xn(e, t);
    r &&
      r.id !== e.robberHexId &&
      ((i += Pn(r.number)),
      hn(r.terrain) && (a.add(r.terrain), n && !n.includes(r.terrain) && (i += 1.4)));
  }
  return ((i += a.size * 1.8), r.port && (r.port.kind === `generic` ? (i += 1.2) : (i += 1.6)), i);
}
function ownedNumbers(e, t) {
  let n = new Set();
  for (let r of e.board.vertices) {
    if (r.building?.player !== t) continue;
    for (let i of r.hexIds) {
      let r = xn(e, i);
      r?.number != null && n.add(r.number);
    }
  }
  return n;
}
function proSpot(e, t, n) {
  let r = Fn(e, t, or(e, n)),
    i = q(e, t);
  if (!i) return r;
  let a = new Set(or(e, n)),
    o = ownedNumbers(e, n);
  for (let t of i.hexIds) {
    let n = xn(e, t);
    !n ||
      n.id === e.robberHexId ||
      !hn(n.terrain) ||
      ((n.terrain === `ore` || n.terrain === `grain`) && !a.has(n.terrain) && (r += 2.4),
      n.number != null && o.has(n.number) && (r -= Pn(n.number) * 0.85),
      (n.number === 6 || n.number === 8) && !o.has(n.number) && (r += 1.2));
  }
  return (i.port && (r += i.port.kind === `generic` ? 0.8 : 1.6), r);
}
function spotScore(e, t, n) {
  return e.pro ? proSpot(e, t, n) : Fn(e, t, or(e, n));
}
function knightTakesArmy(e, t) {
  let n = (e.players[t]?.knightsPlayed ?? 0) + 1;
  if (n < 3) return !1;
  let r = 0;
  for (let i of e.players) i.id !== t && (r = Math.max(r, i.knightsPlayed));
  return n > r;
}
function missingCards(e, t) {
  let n = 0;
  for (let r of V) n += Math.max(0, (t[r] ?? 0) - (e[r] ?? 0));
  return n;
}
function oneCardFrom(e, t) {
  return !K(e, t) && missingCards(e, t) === 1;
}
function handsCity(e, t, n, r) {
  let i = e.players[t];
  if (!i || i.citiesLeft <= 0) return !1;
  let a = W();
  for (let e of V) a[e] = (i.resources[e] ?? 0) - (n[e] ?? 0) + (r[e] ?? 0);
  return !K(i.resources, U.city) && K(a, U.city);
}
function In(e, t, n) {
  if (hexIsWater(e, t)) return pirateVictims(e, t, n);
  let r = new Set();
  for (let i of e.board.vertices)
    !i.hexIds.includes(t) ||
      !i.building ||
      (i.building.player !== n &&
        (G(e.players[i.building.player].resources) <= 0 || r.add(i.building.player)));
  return [...r];
}
function J(e) {
  return U[e];
}
function Ln(e, t) {
  let n = [];
  for (let t of V) for (let r = 0; r < e[t]; r++) n.push(t);
  return n.length === 0 ? null : n[t(n.length)];
}
var Y = {
    get wood() {
      return i(`resource.wood`);
    },
    get brick() {
      return i(`resource.brick`);
    },
    get wool() {
      return i(`resource.wool`);
    },
    get grain() {
      return i(`resource.grain`);
    },
    get ore() {
      return i(`resource.ore`);
    },
  },
  Rn = {
    get wood() {
      return i(`terrain.wood`);
    },
    get brick() {
      return i(`terrain.brick`);
    },
    get wool() {
      return i(`terrain.wool`);
    },
    get grain() {
      return i(`terrain.grain`);
    },
    get ore() {
      return i(`terrain.ore`);
    },
    get desert() {
      return i(`terrain.desert`);
    },
    get sea() {
      return i(`terrain.sea`);
    },
    get lake() {
      return i(`terrain.lake`);
    },
    get gold() {
      return i(`terrain.gold`);
    },
  },
  zn = {
    get knight() {
      return i(`dev.knight`);
    },
    get vp() {
      return i(`dev.vp`);
    },
    get roads() {
      return i(`dev.roads`);
    },
    get plenty() {
      return i(`dev.plenty`);
    },
    get monopoly() {
      return i(`dev.monopoly`);
    },
  };
function Bn(e, t, viewerId) {
  let n = e.players[yn(e)],
    isViewer = viewerId == null || n?.id === viewerId,
    r = n?.name ?? ``;
  if (e.tradeOffer) {
    let offer = e.tradeOffer,
      from = e.players[offer.from],
      pending = offerPending(e);
    if (pending.includes(viewerId)) return i(`hint.wantsTrade`, { name: from?.name ?? `` });
    return i(`hint.waitFor`, {
      name: pending
        .map((t) => e.players[t]?.name)
        .filter(Boolean)
        .join(`, `),
    });
  }
  if (!isViewer && n && !n.isAi) return i(`hint.waitFor`, { name: n.name });
  switch (e.phase) {
    case `setup`:
      return e.setupNeed === `settlement`
        ? i(`hint.setupSettle`, { you: r })
        : i(`hint.setupRoad`, { you: r });
    case `roll`:
      return i(`hint.roll`, { you: r });
    case `discard`:
      return i(`hint.discard`, { you: r, n: Math.floor(G(n?.resources ?? W()) / 2) });
    case `robber`:
      return i(isSea(e) ? `hint.robberSea` : `hint.robber`, { you: r });
    case `gold`:
      return i(`hint.gold`, { you: r, n: goldNeed(e) });
    case `roadBuilding`: {
      let t = e.pendingFreeRoads;
      return i(
        isSea(e) ? (t === 1 ? `hint.freeRoute` : `hint.freeRoutes`) : t === 1 ? `hint.freeRoad` : `hint.freeRoads`,
        { you: r, n: t },
      );
    }
    case `main`:
      return t === `settlement`
        ? i(`hint.pickSettle`)
        : t === `city`
          ? i(`hint.pickCity`)
          : t === `road`
            ? i(`hint.pickRoad`)
            : t === `ship`
              ? i(`hint.pickShip`)
              : t === `moveShip`
                ? i(`hint.pickMoveShip`)
                : typeof t === `string` && t.startsWith(`moveShip:`)
                  ? i(`hint.pickShipTarget`)
                  : i(`hint.main`, { you: r });
    case `gameOver`: {
      let t = e.players[e.winnerId ?? 0];
      return i(`hint.win`, { name: t?.name ?? `—`, n: Mn(e, t?.id ?? 0) });
    }
    default:
      return ``;
  }
}
function Vn(e) {
  return V.filter((t) => (e[t] ?? 0) > 0)
    .map((t) => `${e[t]} ${Y[t].toLowerCase()}`)
    .join(`, `);
}
var Hn = 10;
function winTarget(e) {
  return isSea(e) ? SEA_WIN_TARGET : Hn;
}
function pushLog(e, t) {
  ((e.logSeq += 1),
    e.log.push({ id: e.logSeq, text: t }),
    e.log.length > 80 && e.log.splice(0, e.log.length - 80));
}
function Z(e, t) {
  if (!e) throw new Jt(t);
}
function Q(e, t) {
  let n = e.players[t];
  return (Z(n, i(`engine.badPlayer`)), n);
}
function offerPending(e) {
  let t = e.tradeOffer;
  if (!t) return [];
  if (Array.isArray(t.pending) && t.pending.length) return t.pending.filter((n) => e.players[n]);
  return typeof t.to === `number` && t.to >= 0 && e.players[t.to] ? [t.to] : [];
}
function Un(e, t, n) {
  let r = e.hand.indexOf(t);
  if (r >= 0) {
    e.hand.splice(r, 1);
    return;
  }
  if (n) {
    let n = e.newHand.indexOf(t);
    if (n >= 0) {
      e.newHand.splice(n, 1);
      return;
    }
  }
  throw new Jt(i(`engine.noCard`));
}
function Wn(e) {
  let t = e.players.map((t) => Nn(e, t.id)),
    n = Math.max(0, ...t),
    r = e.players.find((e) => e.hasLongestRoad) ?? null;
  if (n < 5) {
    for (let t of e.players) t.hasLongestRoad = !1;
    return;
  }
  let a = e.players.filter((e) => t[e.id] === n);
  if (!(r && t[r.id] === n)) {
    if (a.length === 1) {
      for (let t of e.players) t.hasLongestRoad = t.id === a[0].id;
      pushLog(e, i(`engine.longest`, { name: a[0].name }));
    } else for (let t of e.players) t.hasLongestRoad = !1;
  }
}
function Gn(e) {
  let t = e.players.find((e) => e.hasLargestArmy) ?? null,
    n = Math.max(...e.players.map((e) => e.knightsPlayed));
  if (n < 3) return;
  let r = e.players.filter((e) => e.knightsPlayed === n);
  if (!(t && t.knightsPlayed === n) && r.length === 1) {
    for (let t of e.players) t.hasLargestArmy = t.id === r[0].id;
    pushLog(e, i(`engine.army`, { name: r[0].name }));
  }
}
function Kn(e, t) {
  Mn(e, t) >= winTarget(e) &&
    ((e.phase = `gameOver`),
    (e.winnerId = t),
    (e.tradeOffer = null),
    pushLog(e, i(`engine.wins`, { name: Q(e, t).name, n: Mn(e, t) })));
}
function qn(e, t) {
  let n = e.players.map(() => W());
  for (let r of e.board.hexes)
    if (!(r.number !== t || r.id === e.robberHexId || !hn(r.terrain)))
      for (let t of e.board.vertices)
        !t.hexIds.includes(r.id) ||
          !t.building ||
          (n[t.building.player][r.terrain] += t.building.type === `city` ? 2 : 1);
  for (let t of V) {
    let r = n.reduce((e, n) => e + n[t], 0);
    if (r !== 0) {
      if (r > e.bank[t]) {
        pushLog(e, i(`engine.bankShort`, { resource: Y[t].toLowerCase() }));
        continue;
      }
      for (let r of e.players) {
        let i = n[r.id][t];
        i <= 0 || ((r.resources[t] += i), (e.bank[t] -= i));
      }
    }
  }
  for (let t of e.players) {
    let r = n[t.id];
    G(r) > 0 && pushLog(e, i(`engine.gains`, { name: t.name, list: Vn(r) }));
  }
  isSea(e) && (e.goldQueue = goldDebts(e, t));
}
function Jn(e, t, n) {
  let r = q(e, t);
  if (!r) return;
  let a = W();
  for (let t of r.hexIds) {
    let r = xn(e, t);
    !r ||
      !hn(r.terrain) ||
      e.bank[r.terrain] <= 0 ||
      (Yn(e.players[n].resources, r.terrain, 1), --e.bank[r.terrain], (a[r.terrain] += 1));
  }
  G(a) > 0 && pushLog(e, i(`engine.harvest`, { name: Q(e, n).name, list: Vn(a) }));
}
function Yn(e, t, n) {
  e[t] += n;
}
function Xn(e, t) {
  ((e.currentPlayer = t),
    (e.phase = `roll`),
    (e.rolledThisTurn = !1),
    (e.playedDevThisTurn = !1),
    (e.pendingFreeRoads = 0),
    (e.tradeOffer = null),
    (e.offeredTradeThisTurn = !1),
    (e.lastSettlementId = null),
    (e.movedShipThisTurn = !1),
    (e.shipsBuiltThisTurn = []),
    (e.goldQueue = []));
}
function Zn(e) {
  let t = vn(e.players.length);
  if (
    ((e.setupIndex += 1),
    (e.setupNeed = `settlement`),
    (e.lastSettlementId = null),
    e.setupIndex >= t.length)
  ) {
    (pushLog(e, i(`engine.settled`)), (e.turnNumber = 1), Xn(e, 0));
    return;
  }
  e.currentPlayer = t[e.setupIndex];
}
function Qn(e) {
  let t = e.players.length,
    n = [];
  for (let r = 0; r < t; r++) {
    let i = (e.currentPlayer + r) % t;
    G(e.players[i].resources) > 7 && n.push(i);
  }
  if (n.length > 0) {
    ((e.phase = `discard`), (e.discardQueue = n));
    let t = Q(e, n[0]);
    pushLog(e, i(`engine.mustDiscard`, { name: t.name }));
  } else e.phase = `robber`;
}
function $n(e) {
  return shuffleArr(
    [
      ...Array(14).fill(`knight`),
      ...[, , , , ,].fill(`vp`),
      ...[, ,].fill(`roads`),
      ...[, ,].fill(`plenty`),
      ...[, ,].fill(`monopoly`),
    ],
    e,
  );
}
function er(e) {
  let t = e.seed ?? Math.floor(Math.random() * 1e9),
    n = sn(t),
    sea = e.mode === SEA_MODE,
    { board: r, robberHexId: a, pirateHexId: pirate = null } = sea ? makeSeaBoard(n) : mn(n),
    o = e.seats.slice(0, 4);
  Z(o.length >= 2 && o.length <= 4, i(`engine.pickSeats`));
  let s = {
    revision: 1,
    phase: `setup`,
    board: r,
    players: o.map((e, t) => ({
      id: t,
      name: e.name.trim() || i(`engine.playerN`, { n: t + 1 }),
      colorIndex: e.colorIndex,
      isAi: e.isAi,
      resources: W(),
      hand: [],
      newHand: [],
      vpCards: 0,
      settlementsLeft: 5,
      citiesLeft: 4,
      roadsLeft: 15,
      knightsPlayed: 0,
      hasLongestRoad: !1,
      hasLargestArmy: !1,
      ...(sea ? { shipsLeft: SHIPS_PER_PLAYER, islands: [] } : {}),
    })),
    currentPlayer: 0,
    robberHexId: a,
    ...(sea
      ? { mode: SEA_MODE, pirateHexId: pirate, movedShipThisTurn: !1, shipsBuiltThisTurn: [], goldQueue: [] }
      : {}),
    bank: gn(),
    deck: $n(n),
    discardQueue: [],
    setupIndex: 0,
    setupNeed: `settlement`,
    lastSettlementId: null,
    rolledThisTurn: !1,
    playedDevThisTurn: !1,
    pendingFreeRoads: 0,
    tradeOffer: null,
    offeredTradeThisTurn: !1,
    lastRoll: null,
    winnerId: null,
    turnNumber: 0,
    log: [],
    logSeq: 0,
    seed: t,
    pro: !!e.pro,
  };
  return (pushLog(s, i(`engine.setupLog`)), s);
}
function tr(e, t) {
  if (e.phase === `gameOver` || e.phase === `menu`) throw new Jt(i(`engine.notRunning`));
  if (e.tradeOffer && t.type !== `respondTrade` && t.type !== `cancelTrade`)
    throw new Jt(i(`engine.waitTrade`));
  if (t.type !== `undoBank`) e.undoBank = null;
  let n = yn(e);
  switch (t.type) {
    case `placeSettlement`: {
      Z(e.phase === `setup` || e.phase === `main`, i(`engine.noSettleNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id, i(`engine.notYourTurn`)),
        Z(e.phase !== `setup` || e.setupNeed === `settlement`, i(`engine.placeRoadFirst`)),
        Z(Dn(e, r.id).includes(t.vertexId), i(`engine.badVertex`)));
      let a = q(e, t.vertexId);
      (e.phase === `main`
        ? (Z(r.settlementsLeft > 0, i(`engine.noSettlements`)),
          Z(K(r.resources, J(`settlement`)), i(`engine.cantAffordSettle`)),
          _n(r.resources, e.bank, J(`settlement`)))
        : Z(r.settlementsLeft > 0, i(`engine.noSettlements`)),
        (a.building = { player: r.id, type: `settlement` }),
        --r.settlementsLeft,
        e.phase === `setup`
          ? ((e.lastSettlementId = a.id),
            (e.setupNeed = `road`),
            e.setupIndex >= e.players.length && Jn(e, a.id, r.id),
            pushLog(e, i(`engine.foundsSettle`, { name: r.name })))
          : (pushLog(e, i(`engine.buildsSettle`, { name: r.name })), awardIsland(e, r, a.id), Wn(e), Kn(e, r.id)));
      return;
    }
    case `placeRoad`: {
      let r = e.phase === `setup` || e.phase === `roadBuilding`;
      Z(
        e.phase === `setup` || e.phase === `main` || e.phase === `roadBuilding`,
        i(`engine.noRoadNow`),
      );
      let a = Q(e, e.currentPlayer);
      (Z(n === a.id, i(`engine.notYourTurn`)),
        e.phase === `setup` && Z(e.setupNeed === `road`, i(`engine.placeSettleFirst`)),
        Z(On(e, a.id).includes(t.edgeId), i(`engine.badRoad`)));
      let o = bn(e, t.edgeId);
      (r ||
        (Z(K(a.resources, J(`road`)), i(`engine.cantAffordRoad`)),
        _n(a.resources, e.bank, J(`road`))),
        (o.road = { player: a.id }),
        --a.roadsLeft,
        e.phase === `setup`
          ? (pushLog(e, i(`engine.drawsRoad`, { name: a.name })), Zn(e))
          : e.phase === `roadBuilding`
            ? (--e.pendingFreeRoads,
              pushLog(e, i(`engine.freeRoad`, { name: a.name })),
              Wn(e),
              Kn(e, a.id),
              (e.pendingFreeRoads <= 0 || (On(e, a.id).length === 0 && shipSpots(e, a.id).length === 0)) &&
                ((e.pendingFreeRoads = 0), (e.phase = `main`)))
            : (pushLog(e, i(`engine.buildsRoad`, { name: a.name })), Wn(e), Kn(e, a.id)));
      return;
    }
    case `placeCity`: {
      Z(e.phase === `main`, i(`engine.noCityNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id, i(`engine.notYourTurn`)),
        Z(kn(e, r.id).includes(t.vertexId), i(`engine.badCity`)),
        Z(r.citiesLeft > 0, i(`engine.noCities`)),
        Z(K(r.resources, J(`city`)), i(`engine.cantAffordCity`)),
        _n(r.resources, e.bank, J(`city`)));
      let a = q(e, t.vertexId);
      ((a.building = { player: r.id, type: `city` }),
        --r.citiesLeft,
        (r.settlementsLeft += 1),
        pushLog(e, i(`engine.buildsCity`, { name: r.name })),
        Kn(e, r.id));
      return;
    }
    case `roll`: {
      Z(e.phase === `roll`, i(`engine.alreadyRolled`));
      let t = Q(e, e.currentPlayer);
      Z(n === t.id, i(`engine.notYourTurn`));
      let r = sn(e.seed + e.revision * 9973 + e.turnNumber * 13),
        a = ln(r, 1, 6),
        o = ln(r, 1, 6),
        s = a + o;
      ((e.lastRoll = { d1: a, d2: o, total: s, revision: e.revision }),
        (e.rolledThisTurn = !0),
        pushLog(e, i(`engine.rolled`, { name: t.name, d1: a, d2: o, total: s })),
        s === 7 ? Qn(e) : (qn(e, s), (e.phase = e.goldQueue?.length ? `gold` : `main`)));
      return;
    }
    case `discard`: {
      Z(e.phase === `discard`, i(`engine.noDiscard`));
      let n = e.discardQueue[0];
      Z(n !== void 0, i(`engine.emptyQueue`));
      let r = Q(e, n),
        a = G(r.resources),
        o = Math.floor(a / 2),
        s = 0;
      for (let e of V) {
        let n = t.resources[e] ?? 0;
        (Z(n >= 0 && n <= r.resources[e], i(`engine.badDiscard`)), (s += n));
      }
      Z(s === o, i(`engine.mustDiscardN`, { n: o }));
      for (let n of V) {
        let i = t.resources[n] ?? 0;
        ((r.resources[n] -= i), (e.bank[n] += i));
      }
      (pushLog(e, i(`engine.discarded`, { name: r.name, n: o })),
        e.discardQueue.shift(),
        e.discardQueue.length === 0 && (e.phase = `robber`));
      return;
    }
    case `moveRobber`: {
      Z(e.phase === `robber`, i(`engine.noRobberNow`));
      let r = Q(e, e.currentPlayer);
      Z(n === r.id, i(`engine.notYourTurn`));
      let a = xn(e, t.hexId);
      Z(a, i(`engine.badHex`));
      let water = isWaterTerrain(a.terrain);
      water
        ? (Z(isSea(e), i(`engine.badHex`)), Z(a.id !== e.pirateHexId, i(`engine.movePirateElse`)))
        : Z(a.id !== e.robberHexId, i(`engine.moveRobberElse`));
      let o = In(e, a.id, r.id);
      if (
        (t.stealFrom == null
          ? Z(o.length === 0, i(`engine.pickVictim`))
          : Z(o.includes(t.stealFrom), i(`engine.cantSteal`)),
        water ? (e.pirateHexId = a.id) : (e.robberHexId = a.id),
        t.stealFrom != null)
      ) {
        let n = Q(e, t.stealFrom),
          a = sn(e.seed + e.revision * 17 + 3),
          o = Ln(n.resources, (e) => Math.floor(a() * e));
        o &&
          (--n.resources[o],
          (r.resources[o] += 1),
          pushLog(e, i(`engine.stole`, { name: r.name, resource: Y[o].toLowerCase(), other: n.name })));
      } else pushLog(e, i(water ? `engine.movedPirate` : `engine.movedRobber`, { name: r.name }));
      e.phase = e.rolledThisTurn ? `main` : `roll`;
      return;
    }
    case `buyDev`: {
      Z(e.phase === `main`, i(`engine.noBuyNow`));
      let t = Q(e, e.currentPlayer);
      (Z(n === t.id, i(`engine.notYourTurn`)),
        Z(e.deck.length > 0, i(`engine.noDevLeft`)),
        Z(K(t.resources, J(`dev`)), i(`engine.cantAffordDev`)),
        _n(t.resources, e.bank, J(`dev`)));
      let r = e.deck.shift();
      r === `vp`
        ? ((t.vpCards += 1), pushLog(e, i(`engine.boughtDev`, { name: t.name })), Kn(e, t.id))
        : (t.newHand.push(r), pushLog(e, i(`engine.boughtDev`, { name: t.name })));
      return;
    }
    case `playKnight`: {
      let t = Q(e, e.currentPlayer);
      (Z(n === t.id, i(`engine.notYourTurn`)),
        Z(e.phase === `roll` || e.phase === `main`, i(`engine.notNow`)),
        Z(!e.playedDevThisTurn, i(`engine.oneDev`)),
        Un(t, `knight`, !1),
        (t.knightsPlayed += 1),
        (e.playedDevThisTurn = !0),
        (e.phase = `robber`),
        pushLog(e, i(`engine.playsKnight`, { name: t.name })),
        Gn(e),
        Kn(e, t.id));
      return;
    }
    case `playRoads`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let t = Q(e, e.currentPlayer);
      if (
        (Z(n === t.id, i(`engine.notYourTurn`)),
        Z(!e.playedDevThisTurn, i(`engine.oneDev`)),
        Un(t, `roads`, !1),
        (e.playedDevThisTurn = !0),
        (On(e, t.id).length === 0 || t.roadsLeft <= 0) && shipSpots(e, t.id).length === 0)
      ) {
        pushLog(e, i(`engine.roadsNoBuild`, { name: t.name }));
        return;
      }
      ((e.phase = `roadBuilding`),
        (e.pendingFreeRoads = Math.min(2, t.roadsLeft + (t.shipsLeft ?? 0))),
        pushLog(e, i(`engine.playsRoads`, { name: t.name })));
      return;
    }
    case `skipFreeRoad`:
      (Z(e.phase === `roadBuilding`, i(`engine.noFreeRoads`)),
        (e.pendingFreeRoads = 0),
        (e.phase = `main`));
      return;
    case `playPlenty`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id, i(`engine.notYourTurn`)),
        Z(!e.playedDevThisTurn, i(`engine.oneDev`)),
        Un(r, `plenty`, !1),
        (e.playedDevThisTurn = !0));
      for (let n of [t.a, t.b]) e.bank[n] > 0 && (--e.bank[n], (r.resources[n] += 1));
      pushLog(e, i(`engine.plenty`, { name: r.name, a: Y[t.a].toLowerCase(), b: Y[t.b].toLowerCase() }));
      return;
    }
    case `playMonopoly`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id, i(`engine.notYourTurn`)),
        Z(!e.playedDevThisTurn, i(`engine.oneDev`)),
        Un(r, `monopoly`, !1),
        (e.playedDevThisTurn = !0));
      let a = 0;
      for (let n of e.players)
        n.id !== r.id && ((a += n.resources[t.resource]), (n.resources[t.resource] = 0));
      ((r.resources[t.resource] += a),
        pushLog(e, i(`engine.monopoly`, { name: r.name, resource: Y[t.resource].toLowerCase(), n: a })));
      return;
    }
    case `bankTrade`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id, i(`engine.notYourTurn`)), Z(t.give !== t.get, i(`engine.differentRes`)));
      let a = An(e, r.id, t.give);
      (Z(
        r.resources[t.give] >= a,
        i(`engine.needRate`, { n: a, resource: Y[t.give].toLowerCase() }),
      ),
        Z(e.bank[t.get] > 0, i(`engine.bankEmpty`)),
        (r.resources[t.give] -= a),
        (e.bank[t.give] += a),
        --e.bank[t.get],
        (r.resources[t.get] += 1),
        (e.undoBank = { player: r.id, give: t.give, get: t.get, rate: a }),
        pushLog(
          e,
          i(`engine.bankSwap`, {
            name: r.name,
            n: a,
            give: Y[t.give].toLowerCase(),
            get: Y[t.get].toLowerCase(),
          }),
        ));
      return;
    }
    case `undoBank`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let u = e.undoBank;
      Z(u, i(`engine.notNow`));
      let r = Q(e, e.currentPlayer);
      (Z(n === r.id && r.id === u.player, i(`engine.notYourTurn`)),
        Z(r.resources[u.get] >= 1, i(`engine.noThoseCards`)),
        Z(e.bank[u.give] >= u.rate, i(`engine.bankEmpty`)),
        (r.resources[u.get] -= 1),
        (e.bank[u.get] += 1),
        (e.bank[u.give] -= u.rate),
        (r.resources[u.give] += u.rate),
        (e.undoBank = null),
        pushLog(e, i(`engine.undoBank`, { name: r.name })));
      return;
    }
    case `offerTrade`: {
      Z(e.phase === `main`, i(`engine.notNow`));
      let r = Q(e, e.currentPlayer);
      Z(n === r.id, i(`engine.notYourTurn`));
      let targets =
        t.to === -1
          ? e.players.filter((e) => e.id !== r.id).map((e) => e.id)
          : [Q(e, t.to).id];
      Z(targets.length > 0 && targets.every((e) => e !== r.id), i(`engine.selfTrade`));
      let o = G(t.give),
        s = G(t.want);
      Z(o > 0 && s > 0, i(`engine.bothWays`));
      for (let e of V) Z(r.resources[e] >= t.give[e], i(`engine.noThoseCards`));
      let other = targets.map((t) => e.players[t]?.name).filter(Boolean).join(`, `);
      ((e.tradeOffer = {
        from: r.id,
        to: targets.length === 1 ? targets[0] : -1,
        pending: targets,
        give: { ...t.give },
        want: { ...t.want },
      }),
        (e.offeredTradeThisTurn = !0),
        pushLog(e, i(`engine.offers`, { name: r.name, other })));
      return;
    }
    case `respondTrade`: {
      let offer = e.tradeOffer;
      Z(offer, i(`engine.noOffer`));
      let pending = offerPending(e),
        who =
          typeof t.playerId === `number` && pending.includes(t.playerId)
            ? t.playerId
            : pending.length === 1
              ? pending[0]
              : null;
      Z(who != null, i(`engine.noOffer`));
      let r = Q(e, offer.from),
        a = Q(e, who);
      if (!(t.accept && K(r.resources, offer.give) && K(a.resources, offer.want))) {
        let rest = pending.filter((e) => e !== who);
        pushLog(e, i(`engine.declines`, { name: a.name }));
        e.tradeOffer =
          rest.length === 0
            ? null
            : {
                ...offer,
                pending: rest,
                to: rest.length === 1 ? rest[0] : -1,
              };
        return;
      }
      for (let e of V)
        ((r.resources[e] -= offer.give[e]),
          (a.resources[e] += offer.give[e]),
          (a.resources[e] -= offer.want[e]),
          (r.resources[e] += offer.want[e]));
      (pushLog(e, i(`engine.accepts`, { name: a.name, other: r.name })), (e.tradeOffer = null));
      return;
    }
    case `cancelTrade`: {
      let t = e.tradeOffer;
      (Z(t, i(`engine.noOffer`)),
        Z(t.from === e.currentPlayer, i(`engine.onlyOfferer`)),
        (e.tradeOffer = null),
        pushLog(e, i(`engine.retracts`, { name: Q(e, t.from).name })));
      return;
    }
    case `placeShip`: {
      Z(isSea(e), i(`engine.noShipNow`));
      let free = e.phase === `roadBuilding`;
      Z(
        (e.phase === `setup` && e.setupNeed === `road`) || e.phase === `main` || free,
        i(`engine.noShipNow`),
      );
      let a = Q(e, e.currentPlayer);
      (Z(n === a.id, i(`engine.notYourTurn`)),
        Z((a.shipsLeft ?? 0) > 0, i(`engine.noShips`)),
        Z(canPlaceShip(e, a.id, t.edgeId), i(`engine.badShip`)));
      e.phase === `main` &&
        (Z(K(a.resources, J(`ship`)), i(`engine.cantAffordShip`)), _n(a.resources, e.bank, J(`ship`)));
      let o = bn(e, t.edgeId);
      ((o.ship = { player: a.id }), --a.shipsLeft, (e.shipsBuiltThisTurn ??= []).push(o.id));
      if (e.phase === `setup`) {
        (pushLog(e, i(`engine.launchesShip`, { name: a.name })), Zn(e));
        return;
      }
      if (free) {
        (--e.pendingFreeRoads,
          pushLog(e, i(`engine.freeShip`, { name: a.name })),
          Wn(e),
          Kn(e, a.id),
          (e.pendingFreeRoads <= 0 || (On(e, a.id).length === 0 && shipSpots(e, a.id).length === 0)) &&
            ((e.pendingFreeRoads = 0), e.phase === `roadBuilding` && (e.phase = `main`)));
        return;
      }
      (pushLog(e, i(`engine.buildsShip`, { name: a.name })), Wn(e), Kn(e, a.id));
      return;
    }
    case `moveShip`: {
      Z(isSea(e) && e.phase === `main`, i(`engine.notNow`));
      let a = Q(e, e.currentPlayer);
      (Z(n === a.id, i(`engine.notYourTurn`)),
        Z(!e.movedShipThisTurn, i(`engine.shipMoved`)),
        Z(movableShips(e, a.id).includes(t.from), i(`engine.badMove`)),
        Z(shipTargets(e, a.id, t.from).includes(t.to), i(`engine.badMove`)));
      ((bn(e, t.from).ship = null),
        (bn(e, t.to).ship = { player: a.id }),
        (e.movedShipThisTurn = !0),
        pushLog(e, i(`engine.movesShip`, { name: a.name })),
        Wn(e),
        Kn(e, a.id));
      return;
    }
    case `pickGold`: {
      Z(e.phase === `gold`, i(`engine.noGold`));
      let head = e.goldQueue?.[0];
      Z(head, i(`engine.noGold`));
      let a = Q(e, head.player),
        need = goldNeed(e),
        got = 0;
      for (let r of V) {
        let k = t.resources?.[r] ?? 0;
        (Z(Number.isInteger(k) && k >= 0 && k <= e.bank[r], i(`engine.badGold`, { n: need })), (got += k));
      }
      Z(got === need, i(`engine.badGold`, { n: need }));
      for (let r of V) {
        let k = t.resources?.[r] ?? 0;
        ((e.bank[r] -= k), (a.resources[r] += k));
      }
      (need > 0 && pushLog(e, i(`engine.goldPick`, { name: a.name, list: Vn(t.resources) })),
        e.goldQueue.shift(),
        e.goldQueue.length === 0 && (e.phase = `main`));
      return;
    }
    case `endTurn`: {
      Z(e.phase === `main`, i(`engine.dontEnd`));
      let t = Q(e, e.currentPlayer);
      (Z(n === t.id, i(`engine.notYourTurn`)), t.hand.push(...t.newHand), (t.newHand = []));
      let r = (e.currentPlayer + 1) % e.players.length;
      (r === 0 && (e.turnNumber += 1), pushLog(e, i(`engine.endsTurn`, { name: t.name })), Xn(e, r));
      return;
    }
    default:
      throw new Jt(i(`engine.unknown`));
  }
}
function awardIsland(e, player, vertexId) {
  let island = islandBonusAt(e, player.id, vertexId);
  island != null &&
    ((player.islands ??= []).push(island), pushLog(e, i(`engine.islandBonus`, { name: player.name })));
}
function nr(e, t) {
  try {
    let n = structuredClone(e);
    return (tr(n, t), (n.revision += 1), { ok: !0, state: n });
  } catch (e) {
    if (e instanceof Jt) return { ok: !1, error: e.message };
    throw e;
  }
}
/** Engine entry points for headless simulation (scripts/sim-archipelago.mjs). */
export function newGame(opts) {
  return er(opts);
}
export function computerAction(state) {
  return yr(state);
}
export function tryAction(state, action) {
  if (!state) return { ok: !1, error: `No game is running.` };
  return nr(state, action);
}
function rr(e, t) {
  return K(e, t);
}
function ir(e, t) {
  let n = {};
  for (let r of V) {
    let i = (t[r] ?? 0) - e[r];
    i > 0 && (n[r] = i);
  }
  return n;
}
function ar(e, t) {
  let n = W();
  for (let r of V) n[r] = Math.max(0, e[r] - (t[r] ?? 0));
  return n;
}
function or(e, t) {
  let n = new Set();
  for (let r of e.board.vertices)
    if (r.building?.player === t)
      for (let t of r.hexIds) {
        let r = xn(e, t);
        r && hn(r.terrain) && n.add(r.terrain);
      }
  return [...n];
}
function sr(e, t, n) {
  if (t.length === 0) return null;
  let i = t[0],
    a = -1 / 0;
  for (let r of t) {
    let t = spotScore(e, r, n);
    t > a && ((a = t), (i = r));
  }
  return i;
}
function cr(e, t) {
  let n = e.players[t],
    r = W();
  if (!n) return r;
  let i = Math.floor(G(n.resources) / 2),
    a = [],
    o = [`ore`, `grain`, `brick`, `wood`, `wool`],
    s = [...V].sort((e, t) => {
      let r = o.indexOf(e),
        i = o.indexOf(t);
      return n.resources[e] === n.resources[t] ? i - r : n.resources[t] - n.resources[e];
    });
  for (let e of s) for (let t = 0; t < n.resources[e]; t++) a.push(e);
  for (let e = 0; e < i && e < a.length; e++) r[a[e]] += 1;
  return r;
}
function lr(e, t) {
  let n = [],
    leader = -1,
    lead = -1;
  if (e.pro)
    for (let r of e.players)
      if (r.id !== t) {
        let n = Mn(e, r.id);
        n > lead && ((lead = n), (leader = r.id));
      }
  for (let r of e.board.hexes) {
    if (r.id === e.robberHexId) continue;
    let water = isWaterTerrain(r.terrain);
    if (water && (!isSea(e) || r.id === e.pirateHexId)) continue;
    let i = In(e, r.id, t),
      a = water ? -2 : 0;
    (hn(r.terrain) || r.terrain === `gold`) && (a += Pn(r.number) * 2);
    let o = null,
      s = -1;
    for (let t of i) {
      let n = jn(e, t),
        r = G(e.players[t].resources),
        i = n * 3 + r;
      (i > s && ((s = i), (o = t)), (a += i));
    }
    !water &&
      e.pro &&
      leader >= 0 &&
      e.board.vertices.some(
        (n) => n.hexIds.includes(r.id) && n.building?.player === leader,
      ) &&
      (a += Pn(r.number) * 3 + 4);
    (!water && e.board.vertices.some((e) => e.hexIds.includes(r.id) && e.building?.player === t) && (a -= 8),
      n.push({ hexId: r.id, score: a, stealFrom: o }));
  }
  n.sort((e, t) => t.score - e.score);
  let r = n[0] ?? {
    hexId: e.board.hexes.find((t) => t.id !== e.robberHexId && !isWaterTerrain(t.terrain)).id,
    stealFrom: null,
  };
  return { type: `moveRobber`, hexId: r.hexId, stealFrom: r.stealFrom };
}
function ur(e, t, n) {
  let r = e.players[t],
    i = ir(r.resources, n),
    a = ar(r.resources, n),
    o = V.filter((e) => (i[e] ?? 0) > 0);
  if (o.length === 0) return null;
  let s = o.sort((e, t) => (i[t] ?? 0) - (i[e] ?? 0))[0];
  if (e.bank[s] <= 0) return null;
  let c = V.filter((e) => e !== s)
    .map((n) => ({ r: n, n: a[n], rate: An(e, t, n) }))
    .filter((e) => e.n >= e.rate)
    .sort((e, t) => t.n - e.n)[0];
  return c ? { type: `bankTrade`, give: c.r, get: s } : null;
}
function dr(e, t, n) {
  if (e.offeredTradeThisTurn) return null;
  let r = e.players[t],
    i = V.filter((e) => e !== n && r.resources[e] >= 1).sort(
      (e, t) => r.resources[t] - r.resources[e] || e.localeCompare(t),
    )[0];
  if (!i) return null;
  let a = e.players
    .filter((e) => e.id !== t && e.resources[n] > 0)
    .sort(
      (e, t) => Number(e.isAi) - Number(t.isAi) || t.resources[n] - e.resources[n] || e.id - t.id,
    )[0];
  if (!a) return null;
  let o = W(),
    s = W(),
    qty = e.pro && r.resources[i] >= 4 ? 2 : 1;
  return ((o[i] = qty), (s[n] = 1), { type: `offerTrade`, to: a.id, give: o, want: s });
}
function fr(e, t, n) {
  let r = e.players[t],
    i = ir(r.resources, n),
    a = V.filter((e) => (i[e] ?? 0) > 0).sort((e, t) => (i[t] ?? 0) - (i[e] ?? 0));
  for (let n of a) {
    let r = dr(e, t, n);
    if (r) return r;
  }
  return null;
}
function pr(e, t) {
  let n = e.players[t],
    r = V.filter((e) => n.resources[e] <= 1).sort(
      (e, t) => n.resources[e] - n.resources[t] || e.localeCompare(t),
    );
  for (let n of r) {
    let r = dr(e, t, n);
    if (r) return r;
  }
  return null;
}
function mr(e, t) {
  let n = xn(e, e.robberHexId);
  return !n || !hn(n.terrain) || Pn(n.number) < 3
    ? !1
    : e.board.vertices.some((e) => e.hexIds.includes(n.id) && e.building?.player === t);
}
function hr(e, t) {
  let n = e.players[t];
  if (e.playedDevThisTurn) return null;
  if (n.hand.includes(`knight`) && (mr(e, t) || n.knightsPlayed === 2 || (e.pro && knightTakesArmy(e, t))))
    return { type: `playKnight` };
  if (e.phase !== `main`) return null;
  if (n.hand.includes(`monopoly`)) {
    let n = `grain`,
      r = -1;
    for (let i of V) {
      let a = e.players.reduce((e, n) => (n.id === t ? e : e + n.resources[i]), 0);
      a > r && ((r = a), (n = i));
    }
    if (r >= 3) return { type: `playMonopoly`, resource: n };
  }
  if (n.hand.includes(`plenty`)) {
    let e = U.city,
      t = ir(n.resources, e),
      r = V.filter((e) => (t[e] ?? 0) > 0);
    if (r.length > 0) {
      let e = r[0];
      return { type: `playPlenty`, a: e, b: r[1] ?? e };
    }
  }
  return n.hand.includes(`roads`) &&
    On(e, t).length > 0 &&
    n.roadsLeft >= 2 &&
    Dn(e, t).length === 0
    ? { type: `playRoads` }
    : n.hand.includes(`knight`) && jn(e, t) >= 6
      ? { type: `playKnight` }
      : null;
}
function gr(e, t) {
  let n = On(e, t);
  if (n.length === 0) return null;
  let r = e.board.vertices
      .filter((t) => !t.building && _r(e, t.id))
      .sort((a, b) => spotScore(e, b.id, t) - spotScore(e, a.id, t))
      .slice(0, 4),
    i = n[0],
    a = -1;
  for (let t of n) {
    let n = e.board.edges.find((e) => e.id === t),
      o = 0;
    for (let t of r) (t.id === n.a || t.id === n.b) && (o += 12 + Fn(e, t.id));
    ((o += Math.random()), o > a && ((a = o), (i = t)));
  }
  return i;
}
function _r(e, t) {
  let n = q(e, t);
  return !n || n.building || !vertexIsLand(n)
    ? !1
    : e.board.edges
        .filter((e) => e.a === t || e.b === t)
        .every((n) => !q(e, n.a === t ? n.b : n.a)?.building);
}
function roadLengthIf(e, edgeId, playerId) {
  let edge = e.board.edges.find((n) => n.id === edgeId);
  if (!edge || edge.road) return Nn(e, playerId);
  let prev = edge.road;
  edge.road = { player: playerId };
  try {
    return Nn(e, playerId);
  } finally {
    edge.road = prev;
  }
}
function proRoadAction(e, t) {
  if (!e.pro) return null;
  let n = e.players[t];
  if (!n || n.roadsLeft <= 0 || !K(n.resources, U.road)) return null;
  if (Dn(e, t).length && n.settlementsLeft > 0 && K(n.resources, U.settlement)) return null;
  let edges = On(e, t);
  if (!edges.length) return null;
  let mine = Nn(e, t),
    bestOther = 0;
  for (let r of e.players) r.id !== t && (bestOther = Math.max(bestOther, Nn(e, r.id)));
  let best = null,
    score = -1;
  for (let id of edges) {
    let edge = e.board.edges.find((n) => n.id === id);
    if (!edge) continue;
    let len = roadLengthIf(e, id, t),
      dest = 0;
    for (let vid of [edge.a, edge.b]) {
      let v = q(e, vid);
      v && !v.building && (dest = Math.max(dest, proSpot(e, vid, t)));
    }
    let s = (len - mine) * 8 + dest * 0.5;
    len >= 5 && len > bestOther && (s += 24);
    s > score && ((score = s), (best = id));
  }
  return best != null && score >= 8 ? { type: `placeRoad`, edgeId: best } : null;
}
function vr(e, t) {
  let n = e.players[t],
    r = Mn(e, t),
    goal = winTarget(e);
  if (r >= goal) return { type: `endTurn` };
  let i = kn(e, t),
    a = Dn(e, t),
    o = On(e, t);
  if (r >= goal - 2 && i.length && rr(n.resources, U.city) && n.citiesLeft > 0)
    return { type: `placeCity`, vertexId: e.pro ? sr(e, i, t) : i[0] };
  if (r >= goal - 1 && a.length && rr(n.resources, U.settlement) && n.settlementsLeft > 0)
    return { type: `placeSettlement`, vertexId: sr(e, a, t) };
  let s = hr(e, t);
  if (s) return s;
  if (i.length && n.citiesLeft > 0) {
    if (rr(n.resources, U.city)) return { type: `placeCity`, vertexId: e.pro ? sr(e, i, t) : i[0] };
    let r = fr(e, t, U.city);
    if (r) return r;
    let a = ur(e, t, U.city);
    if (a) return a;
  }
  if (a.length && n.settlementsLeft > 0) {
    if (rr(n.resources, U.settlement)) return { type: `placeSettlement`, vertexId: sr(e, a, t) };
    let r = fr(e, t, U.settlement);
    if (r) return r;
    let i = ur(e, t, U.settlement);
    if (i) return i;
  }
  if (isSea(e) && n.settlementsLeft > 0) {
    let plan = planShip(e, t, (v) => spotScore(e, v, t));
    if (plan && (a.length === 0 || plan.value > 8)) {
      if (rr(n.resources, U.ship)) return { type: `placeShip`, edgeId: plan.edgeId };
      let r = fr(e, t, U.ship);
      if (r) return r;
      let i = ur(e, t, U.ship);
      if (i) return i;
    }
  }
  if (a.length === 0 && o.length && n.roadsLeft > 0) {
    if (e.pro) {
      let road = proRoadAction(e, t);
      if (road) return road;
    } else if (rr(n.resources, U.road)) {
      let n = gr(e, t);
      if (n) return { type: `placeRoad`, edgeId: n };
    } else {
      let n = fr(e, t, U.road);
      if (n) return n;
      let r = ur(e, t, U.road);
      if (r) return r;
    }
  }
  if (e.pro) {
    let road = proRoadAction(e, t);
    if (road) return road;
  }
  let saveForCity = e.pro && n.citiesLeft > 0 && i.length > 0 && oneCardFrom(n.resources, U.city);
  if (!saveForCity && e.deck.length > 0 && rr(n.resources, U.dev)) return { type: `buyDev` };
  if (!saveForCity && e.deck.length > 0) {
    let n = fr(e, t, U.dev);
    if (n) return n;
  }
  if (saveForCity) return { type: `endTurn` };
  let c = ur(e, t, U.dev);
  return c && e.deck.length > 0 ? c : pr(e, t) || { type: `endTurn` };
}
function yr(e) {
  if (e.phase === `gameOver` || e.phase === `menu`) return null;
  if (e.tradeOffer) {
    let t = e.tradeOffer,
      pending = offerPending(e),
      ai = pending.find((t) => e.players[t]?.isAi);
    if (ai == null) return null;
    let n = e.players[ai];
    if (!K(n.resources, t.want)) return { type: `respondTrade`, accept: !1, playerId: ai };
    if (e.pro && handsCity(e, t.from, t.give, t.want))
      return { type: `respondTrade`, accept: !1, playerId: ai };
    let r = G(t.give),
      i = G(t.want),
      a = V.some((e) => t.give[e] > 0 && n.resources[e] <= 1),
      o = V.some((e) => t.want[e] > 0 && n.resources[e] - t.want[e] <= 0);
    return {
      type: `respondTrade`,
      accept: (r >= i && !o) || (a && r + 1 >= i),
      playerId: ai,
    };
  }
  let t = yn(e),
    n = e.players[t];
  if (!n?.isAi) return null;
  switch (e.phase) {
    case `discard`:
      return { type: `discard`, resources: cr(e, t) };
    case `gold`:
      return {
        type: `pickGold`,
        resources: chooseGold(n.resources, e.bank, goldNeed(e), [U.city, U.settlement, U.ship, U.dev]),
      };
    case `setup`:
      if (e.setupNeed === `settlement`) {
        let n = sr(e, Dn(e, t), t);
        return n ? { type: `placeSettlement`, vertexId: n } : null;
      }
      {
        let n = On(e, t);
        if (n.length === 0) return null;
        let r = e.lastSettlementId,
          i = n[0],
          a = -1 / 0;
        for (let edgeId of n) {
          let edge = e.board.edges.find((e) => e.id === edgeId);
          if (!edge) continue;
          let far = edge.a === r ? edge.b : edge.a,
            o = spotScore(e, far, t);
          o > a && ((a = o), (i = edgeId));
        }
        return { type: `placeRoad`, edgeId: i };
      }
    case `roll`:
      return !e.playedDevThisTurn &&
        n.hand.includes(`knight`) &&
        (mr(e, t) || (e.pro && knightTakesArmy(e, t)))
        ? { type: `playKnight` }
        : { type: `roll` };
    case `robber`:
      return lr(e, t);
    case `roadBuilding`: {
      let plan = isSea(e) ? planShip(e, t, (v) => spotScore(e, v, t)) : null;
      if (plan && canPlaceShip(e, t, plan.edgeId)) return { type: `placeShip`, edgeId: plan.edgeId };
      let n = gr(e, t);
      return n ? { type: `placeRoad`, edgeId: n } : { type: `skipFreeRoad` };
    }
    case `main`:
      return vr(e, t);
    default:
      return null;
  }
}
var br = `havn-save-v1`,
  xr = `havn-mute`;
function Sr(e) {
  try {
    localStorage.setItem(br, JSON.stringify(e));
  } catch {}
}
function Cr() {
  try {
    let e = localStorage.getItem(br);
    if (!e) return null;
    let t = JSON.parse(e);
    return !t ||
      !t.board ||
      !Array.isArray(t.players) ||
      t.players.length < 2 ||
      (Array.isArray(t.discardQueue) || (t.discardQueue = []),
      Array.isArray(t.log) || (t.log = []),
      t.tradeOffer === void 0 && (t.tradeOffer = null),
      (t.offeredTradeThisTurn ??= !1),
      !t.phase)
      ? null
      : t;
  } catch {
    return null;
  }
}
function wr() {
  try {
    return localStorage.getItem(xr) === `1`;
  } catch {
    return !1;
  }
}
function Tr(e) {
  try {
    localStorage.setItem(xr, e ? `1` : `0`);
  } catch {}
}
var Er = null;
function Dr() {
  if (typeof window > `u`) return null;
  if (!Er) {
    let e = window.AudioContext || window.webkitAudioContext;
    if (!e) return null;
    Er = new e();
  }
  return (Er.state === `suspended` && Er.resume(), Er);
}
function Or() {
  Dr();
}
function kr(e, t, n, r, i = 0.06) {
  try {
    let a = Dr();
    if (!a) return;
    let o = a.createOscillator(),
      s = a.createGain();
    ((o.type = r), (o.frequency.value = e));
    let c = a.currentTime + Math.max(0, t);
    (s.gain.setValueAtTime(Math.max(1e-4, i), c),
      s.gain.exponentialRampToValueAtTime(1e-4, c + Math.max(0.02, n)),
      o.connect(s),
      s.connect(a.destination),
      o.start(c),
      o.stop(c + n + 0.02));
  } catch {}
}
function Ar() {
  (kr(220, 0, 0.08, `triangle`, 0.05), kr(330, 0.04, 0.07, `triangle`, 0.03));
}
function jr() {
  (kr(140, 0, 0.05, `square`, 0.04),
    kr(180, 0.06, 0.05, `square`, 0.035),
    kr(120, 0.12, 0.08, `square`, 0.03));
}
function Mr() {
  (kr(392, 0, 0.18, `sine`, 0.06),
    kr(494, 0.12, 0.2, `sine`, 0.06),
    kr(587, 0.24, 0.28, `sine`, 0.07));
}
function Nr() {
  kr(110, 0, 0.16, `sawtooth`, 0.04);
}
function Pr(e, t, n) {
  if (!e)
    try {
      (t.type === `roll`
        ? jr()
        : t.type === `placeRoad` || t.type === `placeSettlement` || t.type === `placeCity`
          ? Ar()
          : t.type === `moveRobber` && Nr(),
        n.phase === `gameOver` && Mr());
    } catch {}
}
const statePublishers = new Set();
const actionPublishers = new Set();
export function onPublish(fn) {
  statePublishers.add(fn);
  return () => {
    statePublishers.delete(fn);
  };
}
export function onGuestAction(fn) {
  actionPublishers.add(fn);
  return () => {
    actionPublishers.delete(fn);
  };
}
function forceFriendSeats(seats) {
  let src = Array.isArray(seats) ? seats.slice(0, 4) : [];
  let next = src.map((s, idx) => ({
    name: s.name,
    isAi: idx === 0 ? !1 : !!s.isAi,
    colorIndex: s.colorIndex ?? idx,
  }));
  if (next.length < 2)
    next.push({ name: i(`mp.friend`), isAi: !1, colorIndex: 1 });
  next[0] = { ...next[0], isAi: !1 };
  if (!next.some((s, idx) => idx > 0 && !s.isAi)) {
    next[1] = { ...next[1], isAi: !1, name: i(`mp.friend`) };
  }
  return next;
}
function publishState(state) {
  for (let fn of statePublishers) fn(state);
}
const matchDefaults = {
  matchRole: `solo`,
  matchRoom: null,
  matchStatus: `idle`,
  matchPeerName: null,
  inviteOpen: !1,
  viewerId: 0,
};
export const useGame = create((e, t) => ({
  state: null,
  buildMode: null,
  muted: !1,
  hydrated: !0,
  error: null,
  ...matchDefaults,
  hydrate: () => {
    let joining =
      t().matchRole === `guest` ||
      (typeof window !== `undefined` &&
        new URLSearchParams(window.location.search).has(`join`));
    if (joining) {
      e({ muted: wr(), hydrated: !0 });
      return;
    }
    let n = Cr(),
      r = n && n.phase !== `gameOver` ? n : null;
    e({ muted: wr(), hydrated: !0, ...(t().state ? {} : { state: r }) });
  },
  start: (opts) => {
    Or();
    let n = er(opts);
    (Sr(n), e({ state: n, buildMode: null, error: null, ...matchDefaults }));
  },
  startInvite: (seats, pro, sea) => {
    try {
      Or();
      let room = t().matchRoom || makeRoomCode();
      let n = er({ seats: forceFriendSeats(seats), pro: !!pro, mode: sea ? SEA_MODE : void 0 });
      (Sr(n),
        e({
          state: n,
          buildMode: null,
          error: null,
          matchRole: `host`,
          matchRoom: room,
          matchStatus: `waiting`,
          inviteOpen: !0,
          viewerId: 0,
          matchPeerName: null,
        }));
      publishState(n);
      return room;
    } catch (err) {
      e({ error: String(err && err.message ? err.message : err) });
      return ``;
    }
  },
  continueSave: () => {
    let saved = Cr();
    saved && saved.phase !== `gameOver` && e({ state: saved, buildMode: null, error: null });
  },
  toMenu: () => {
    e({ state: null, buildMode: null, error: null, ...matchDefaults });
  },
  dispatch: (n) => {
    let g = t();
    if (!g.state) return;
    if (g.matchRole === `guest`) {
      for (let fn of actionPublishers) fn(n);
      return;
    }
    let a = nr(g.state, n);
    if (!a.ok) {
      e({ error: a.error });
      return;
    }
    (Pr(g.muted, n, a.state),
      Sr(a.state),
      e({
        state: a.state,
        error: null,
        buildMode: null,
      }));
    if (g.matchRole === `host`) publishState(a.state);
  },
  adoptRemote: (remote) => {
    if (!remote) return !1;
    let cur = t().state;
    if (cur && (remote.revision ?? 0) < (cur.revision ?? 0)) return !1;
    e({ state: remote, error: null, buildMode: null });
    return !0;
  },
  setMatch: (patch) => e(patch),
  resetMatch: () => e({ ...matchDefaults }),
  claimSeat: (seat, name) => {
    let g = t();
    if (!g.state || g.matchRole === `guest`) return !1;
    if (!g.state.players[seat] || seat === 0) return !1;
    let next = structuredClone(g.state);
    let label = String(name || ``).trim() || i(`mp.friend`);
    if (next.players.some((p, idx) => idx !== seat && p.name === label))
      label = `${label} ${seat + 1}`;
    next.players[seat].isAi = !1;
    next.players[seat].name = label;
    next.revision += 1;
    (Sr(next), e({ state: next, error: null }));
    publishState(next);
    return !0;
  },
  releaseSeat: (seat) => {
    let g = t();
    if (!g.state || g.matchRole === `guest`) return;
    if (!g.state.players[seat] || seat === 0) return;
    let next = structuredClone(g.state);
    next.players[seat].isAi = !1;
    next.players[seat].name = i(`mp.friend`);
    next.revision += 1;
    (Sr(next), e({ state: next }));
    publishState(next);
  },
  fillEmptySeats: (seats) => {
    let g = t();
    if (!g.state || g.matchRole === `guest`) return;
    let next = structuredClone(g.state);
    let names = aiNames();
    let used = new Set(next.players.map((p) => p.name));
    let ni = 0;
    for (let seat of seats) {
      if (!next.players[seat] || seat === 0) continue;
      let name = names[ni] ?? i(`start.computer`);
      while (used.has(name)) {
        ni += 1;
        name = names[ni] ?? `${i(`start.computer`)} ${ni + 1}`;
      }
      ni += 1;
      used.add(name);
      next.players[seat].isAi = !0;
      next.players[seat].name = name;
    }
    next.revision += 1;
    (Sr(next), e({ state: next }));
    publishState(next);
  },
  setBuildMode: (mode) => e({ buildMode: mode }),
  toggleMute: () => {
    let n = !t().muted;
    (Tr(n), n || Or(), e({ muted: n }));
  },
  tickAi: () => {
    if (t().matchRole === `guest`) return;
    let { state: cur } = t();
    if (cur)
      try {
        let n = yr(cur);
        if (n) {
          t().dispatch(n);
          let r = t().state;
          r && r.revision === cur.revision && Fr(r);
          return;
        }
        Fr(cur);
      } catch {
        Fr(t().state ?? cur);
      }
  },
}));
function Fr(e) {
  let t = yn(e),
    n = e.players[t];
  if (!n?.isAi) return;
  let r = (e) => useGame.getState().dispatch(e);
  if (e.tradeOffer) {
    r({ type: `respondTrade`, accept: !1 });
    return;
  }
  if (e.phase === `discard`) {
    let e = Math.floor(G(n.resources) / 2),
      t = W(),
      i = e;
    for (let e of V) {
      let r = Math.min(n.resources[e], i);
      if (((t[e] = r), (i -= r), i <= 0)) break;
    }
    r({ type: `discard`, resources: t });
    return;
  }
  if (e.phase === `gold`) {
    r({ type: `pickGold`, resources: chooseGold(n.resources, e.bank, goldNeed(e), []) });
    return;
  }
  if (e.phase === `robber`) {
    let t = e.board.hexes.find((t) => t.id !== e.robberHexId && !isWaterTerrain(t.terrain));
    if (!t) return;
    let n = In(e, t.id, e.currentPlayer);
    r({ type: `moveRobber`, hexId: t.id, stealFrom: n[0] ?? null });
    return;
  }
  if (e.phase === `roll`) {
    r({ type: `roll` });
    return;
  }
  e.phase === `main`
    ? r({ type: `endTurn` })
    : e.phase === `roadBuilding` && r({ type: `skipFreeRoad` });
}
function Ir() {
  let e = Cr();
  return !!(e && e.phase !== `gameOver`);
}
var Lr = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
};
function Rr({ n: e, compact: t }) {
  let n = Lr[e] ?? Lr[1];
  return jsx(`div`, {
    className: R(
      `grid grid-cols-3 grid-rows-3 rounded-[var(--radius-sm)] bg-fg text-bg shadow-panel`,
      t ? `size-8 gap-px p-1` : `size-11 gap-0.5 p-1.5`,
    ),
    children: Array.from({ length: 9 }, (e, t) => {
      let r = t % 3,
        i = Math.floor(t / 3),
        a = n.some((e) => e[0] === r && e[1] === i);
      return jsx(
        `span`,
        { className: R(`size-full rounded-full`, a ? `bg-bg` : `bg-transparent`) },
        t,
      );
    }),
  });
}
function zr({ d1: e, d2: t, compact: n }) {
  let r = useT();
  return jsxs(`div`, {
    className: R(`flex items-center`, n ? `gap-1.5` : `gap-2`),
    "aria-label": `${r(`ui.roll`)} ${e} ${t}`,
    children: [jsx(Rr, { n: e, compact: n }), jsx(Rr, { n: t, compact: n })],
  });
}
var Br = {
    wood: `#2a5c3e`,
    brick: `#b4533a`,
    wool: `#6fa35a`,
    grain: `#d4a017`,
    ore: `#6d7380`,
    desert: `#d2bf8a`,
    water: `#1a3a4a`,
  },
  Vr = { wood: `#1f4a32`, brick: `#6b2a22`, wool: `#355c32`, grain: `#7a5610`, ore: `#3a3e48` };
function Hr() {
  return jsx(`g`, {
    fill: `#d5c4a1`,
    children: jsx(`polygon`, {
      points: `16,3 7,14 12,14 6,22 13,22 5,29 27,29 19,22 26,22 20,14 25,14`,
    }),
  });
}
function Ur() {
  return jsxs(`g`, {
    fill: `#e8b4a4`,
    children: [
      jsx(`rect`, { x: `4`, y: `7`, width: `11`, height: `7`, rx: `1` }),
      jsx(`rect`, { x: `17`, y: `7`, width: `11`, height: `7`, rx: `1` }),
      jsx(`rect`, { x: `10`, y: `17`, width: `12`, height: `8`, rx: `1` }),
    ],
  });
}
function Wr() {
  return jsxs(`g`, {
    fill: `#f3efe6`,
    children: [
      jsx(`circle`, { cx: `12`, cy: `17`, r: `6.2` }),
      jsx(`circle`, { cx: `20`, cy: `16`, r: `7` }),
      jsx(`circle`, { cx: `16`, cy: `12`, r: `5.5` }),
    ],
  });
}
function Gr() {
  return jsxs(`g`, {
    fill: `none`,
    stroke: `#f3e2a0`,
    strokeWidth: `2.2`,
    strokeLinecap: `round`,
    children: [
      jsx(`path`, { d: `M16 28 V8` }),
      jsx(`path`, { d: `M16 10 q-7 -3 -8 4` }),
      jsx(`path`, { d: `M16 10 q7 -3 8 4` }),
      jsx(`path`, { d: `M16 16 q-8 -2 -9 5` }),
      jsx(`path`, { d: `M16 16 q8 -2 9 5` }),
      jsx(`path`, { d: `M16 22 q-8 -1 -8 5` }),
      jsx(`path`, { d: `M16 22 q8 -1 8 5` }),
    ],
  });
}
function Kr() {
  return jsxs(`g`, {
    children: [
      jsx(`polygon`, { points: `16,4 26,20 16,28 6,20`, fill: `#c5ccd4` }),
      jsx(`polygon`, { points: `16,4 16,28 6,20`, fill: `#9aa3ae` }),
      jsx(`polygon`, { points: `16,8 21,18 16,22`, fill: `#eef1f4`, opacity: `0.7` }),
    ],
  });
}
var qr = { wood: Hr, brick: Ur, wool: Wr, grain: Gr, ore: Kr };
function Jr({ resource: e, className: t }) {
  let n = qr[e];
  return n
    ? jsxs(`svg`, {
        viewBox: `0 0 32 32`,
        className: t,
        "aria-hidden": !0,
        children: [
          jsx(`rect`, { width: `32`, height: `32`, rx: `7`, fill: Vr[e] ?? `#3a3e48` }),
          jsx(n, {}),
        ],
      })
    : null;
}
function Yr({ resource: e, x: t, y: n, size: r }) {
  let i = qr[e];
  return i
    ? jsxs(`svg`, {
        x: t - r / 2,
        y: n - r / 2,
        width: r,
        height: r,
        viewBox: `0 0 32 32`,
        children: [
          jsx(`rect`, { width: `32`, height: `32`, rx: `16`, fill: Vr[e] ?? `#3a3e48` }),
          jsx(i, {}),
        ],
      })
    : null;
}
function Xr() {
  return jsxs(Fragment, {
    children: [
      jsxs(`pattern`, {
        id: `terrain-wood`,
        width: `88`,
        height: `76`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `88`, height: `76`, fill: Br.wood }),
          jsx(`polygon`, {
            points: `24,70 24,58 12,58 24,28 36,58 24,58 24,70`,
            fill: `#163224`,
          }),
          jsx(`polygon`, {
            points: `62,64 62,54 52,54 62,30 72,54 62,54 62,64`,
            fill: `#1c3e2c`,
          }),
          jsx(`polygon`, {
            points: `44,72 44,66 36,66 44,48 52,66 44,66 44,72`,
            fill: `#214a34`,
          }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-brick`,
        width: `90`,
        height: `70`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `90`, height: `70`, fill: Br.brick }),
          jsx(`ellipse`, { cx: `28`, cy: `58`, rx: `34`, ry: `16`, fill: `#8c3828` }),
          jsx(`ellipse`, { cx: `70`, cy: `50`, rx: `30`, ry: `14`, fill: `#9a4030` }),
          jsx(`path`, {
            d: `M0 28 Q22 16 44 28 T90 24`,
            fill: `none`,
            stroke: `#d47858`,
            strokeWidth: `3`,
          }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-wool`,
        width: `80`,
        height: `70`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `80`, height: `70`, fill: Br.wool }),
          jsx(`path`, {
            d: `M0 18 h80 M0 38 h80 M0 58 h80`,
            stroke: `#8bc46a`,
            strokeWidth: `3`,
            opacity: `0.45`,
          }),
          jsx(`ellipse`, { cx: `24`, cy: `32`, rx: `9`, ry: `7`, fill: `#f3efe6` }),
          jsx(`ellipse`, { cx: `58`, cy: `50`, rx: `8`, ry: `6`, fill: `#efe6d2` }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-grain`,
        width: `56`,
        height: `56`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `56`, height: `56`, fill: Br.grain }),
          jsx(`path`, {
            d: `M0 10 L56 0 M0 24 L56 14 M0 38 L56 28 M0 52 L56 42`,
            stroke: `#b88614`,
            strokeWidth: `4`,
          }),
          jsx(`path`, {
            d: `M8 56 L20 8`,
            stroke: `#f0d078`,
            strokeWidth: `2`,
            opacity: `0.7`,
          }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-ore`,
        width: `90`,
        height: `80`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `90`, height: `80`, fill: Br.ore }),
          jsx(`polygon`, { points: `28,70 8,70 28,22 48,70`, fill: `#4e555e` }),
          jsx(`polygon`, { points: `28,22 38,70 48,70`, fill: `#636b75` }),
          jsx(`polygon`, { points: `62,70 44,70 62,18 80,70`, fill: `#545b64` }),
          jsx(`polygon`, { points: `28,22 34,40 22,40`, fill: `#e8ecef` }),
          jsx(`polygon`, { points: `62,18 68,34 56,34`, fill: `#e8ecef` }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-desert`,
        width: `90`,
        height: `60`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `90`, height: `60`, fill: Br.desert }),
          jsx(`path`, {
            d: `M-4 24 Q20 8 44 24 T92 18`,
            fill: `none`,
            stroke: `#c4b078`,
            strokeWidth: `6`,
          }),
          jsx(`path`, {
            d: `M-8 44 Q18 32 46 46 T96 40`,
            fill: `none`,
            stroke: `#e0d0a4`,
            strokeWidth: `5`,
          }),
        ],
      }),
      jsxs(`pattern`, {
        id: `terrain-water`,
        width: `48`,
        height: `24`,
        patternUnits: `userSpaceOnUse`,
        children: [
          jsx(`rect`, { width: `48`, height: `24`, fill: Br.water }),
          jsx(`path`, {
            d: `M0 8 Q12 2 24 8 T48 8`,
            fill: `none`,
            stroke: `#2a5a68`,
            strokeWidth: `2`,
          }),
          jsx(`path`, {
            d: `M0 18 Q12 12 24 18 T48 18`,
            fill: `none`,
            stroke: `#163848`,
            strokeWidth: `2`,
          }),
        ],
      }),
    ],
  });
}
function Zr({ resource: e, size: t = `md` }) {
  return jsx(`span`, {
    className: R(t === `sm` ? `size-7` : t === `lg` ? `size-12` : `size-9`, `inline-flex`),
    title: Y[e],
    children: jsx(Jr, {
      resource: e,
      className: `size-full rounded-[var(--radius-xs)] ring-1 ring-border`,
    }),
  });
}
function Qr({
  state: e,
  player: t,
  human: n,
  buildMode: r,
  onBuildMode: i,
  onRoll: a,
  onEnd: o,
  onBuyDev: s,
  onPlayDev: c,
  onTrade: l,
  onSkipRoad: d,
}) {
  let f = useT(),
    p = e.phase === `main` && n,
    m = p && t.roadsLeft > 0 && On(e, t.id).length > 0,
    b = p && t.settlementsLeft > 0 && Dn(e, t.id).length > 0,
    ee = p && t.citiesLeft > 0 && kn(e, t.id).length > 0;
  return jsxs(`aside`, {
    className: `flex shrink-0 flex-col gap-2 border-t border-border bg-surface/95 px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] lg:h-full lg:w-80 lg:gap-3 lg:border-t-0 lg:border-l lg:p-3`,
    children: [
      jsx(`p`, {
        className: `text-xs leading-snug text-muted lg:text-sm`,
        children: Bn(e, r, t.id),
      }),
      e.lastRoll &&
        jsxs(`div`, {
          className: `hidden items-center justify-between rounded-[var(--radius-md)] bg-surface-2 px-3 py-2 lg:flex`,
          children: [
            jsx(zr, { d1: e.lastRoll.d1, d2: e.lastRoll.d2 }),
            jsx(`span`, {
              className: `font-display text-2xl tabular-nums`,
              children: e.lastRoll.total,
            }),
          ],
        }),
      jsx(`div`, {
        className: `grid grid-cols-5 gap-1`,
        children: V.map((e) =>
          jsxs(
            `div`,
            {
              className: `flex flex-col items-center gap-0.5 rounded-[var(--radius-sm)] bg-surface-2 py-1.5 lg:gap-1 lg:py-2`,
              title: Y[e],
              children: [
                jsx(Zr, { resource: e, size: `sm` }),
                jsx(`span`, {
                  className: `text-sm font-medium tabular-nums`,
                  children: t.isAi ? `·` : t.resources[e],
                }),
              ],
            },
            e,
          ),
        ),
      }),
      !t.isAi &&
        (t.hand.length > 0 || t.newHand.length > 0) &&
        jsxs(`div`, {
          className: `flex flex-wrap gap-1`,
          children: [
            t.hand.map((t, r) =>
              jsx(
                `button`,
                {
                  type: `button`,
                  className: `h-9 rounded-[var(--radius-sm)] border border-border px-2 text-xs hover:border-border-strong disabled:opacity-40`,
                  disabled:
                    !n ||
                    e.playedDevThisTurn ||
                    (e.phase !== `main` && (e.phase !== `roll` || t !== `knight`)),
                  onClick: () => c(t),
                  children: zn[t],
                },
                `h-${t}-${r}`,
              ),
            ),
            t.newHand.map((e, t) =>
              jsx(
                `span`,
                {
                  className: `inline-flex h-9 items-center rounded-[var(--radius-sm)] border border-dashed border-border px-2 text-xs text-muted`,
                  children: zn[e],
                },
                `n-${e}-${t}`,
              ),
            ),
          ],
        }),
      jsxs(`div`, {
        className: `grid grid-cols-3 gap-1.5 lg:grid-cols-2 lg:gap-2`,
        children: [
          e.phase === `roll` &&
            n &&
            jsxs(B, {
              type: `button`,
              className: `col-span-3 lg:col-span-2`,
              onClick: a,
              children: [jsx(g, { className: `size-4` }), f(`ui.rollHint`)],
            }),
          e.phase === `roadBuilding` &&
            n &&
            isSea(e) &&
            jsxs(B, {
              type: `button`,
              variant: r === `ship` ? `default` : `secondary`,
              className: `col-span-3 lg:col-span-2`,
              "aria-pressed": r === `ship`,
              disabled: shipSpots(e, t.id).length === 0,
              onClick: () => i(r === `ship` ? null : `ship`),
              children: [jsx(Sailboat, { className: `size-4` }), f(`ui.preferShip`)],
            }),
          e.phase === `roadBuilding` &&
            n &&
            jsx(B, {
              type: `button`,
              variant: `secondary`,
              className: `col-span-3 lg:col-span-2`,
              onClick: d,
              children: f(`ui.skipRoads`),
            }),
          p &&
            jsxs(Fragment, {
              children: [
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  variant: r === `road` ? `default` : `secondary`,
                  disabled: !m || !K(t.resources, J(`road`)),
                  onClick: () => i(r === `road` ? null : `road`),
                  children: [jsx(ne, { className: `size-4` }), f(`ui.road`)],
                }),
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  variant: r === `settlement` ? `default` : `secondary`,
                  disabled: !b || !K(t.resources, J(`settlement`)),
                  onClick: () => i(r === `settlement` ? null : `settlement`),
                  children: [jsx(y, { className: `size-4` }), f(`ui.settle`)],
                }),
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  variant: r === `city` ? `default` : `secondary`,
                  disabled: !ee || !K(t.resources, J(`city`)),
                  onClick: () => i(r === `city` ? null : `city`),
                  children: [jsx(h, { className: `size-4` }), f(`ui.city`)],
                }),
                isSea(e) &&
                  jsxs(B, {
                    type: `button`,
                    size: `sm`,
                    className: `lg:h-11 lg:px-4 lg:text-sm`,
                    variant: r === `ship` ? `default` : `secondary`,
                    disabled: shipSpots(e, t.id).length === 0 || !K(t.resources, J(`ship`)),
                    onClick: () => i(r === `ship` ? null : `ship`),
                    children: [jsx(Sailboat, { className: `size-4` }), f(`ui.ship`)],
                  }),
                isSea(e) &&
                  jsxs(B, {
                    type: `button`,
                    size: `sm`,
                    className: `lg:h-11 lg:px-4 lg:text-sm`,
                    variant: typeof r === `string` && r.startsWith(`moveShip`) ? `default` : `secondary`,
                    disabled: movableShips(e, t.id).length === 0,
                    onClick: () => i(typeof r === `string` && r.startsWith(`moveShip`) ? null : `moveShip`),
                    children: [jsx(MoveRight, { className: `size-4` }), f(`ui.moveShip`)],
                  }),
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  variant: `secondary`,
                  disabled: !K(t.resources, J(`dev`)) || e.deck.length === 0,
                  onClick: s,
                  children: [jsx(_, { className: `size-4` }), f(`ui.card`)],
                }),
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  variant: `secondary`,
                  onClick: l,
                  children: [jsx(v, { className: `size-4` }), f(`ui.trade`)],
                }),
                jsxs(B, {
                  type: `button`,
                  size: `sm`,
                  className: `lg:h-11 lg:px-4 lg:text-sm`,
                  onClick: o,
                  children: [jsx(x, { className: `size-4` }), f(`ui.endTurn`)],
                }),
              ],
            }),
        ],
      }),
      jsx(`div`, {
        className: `hidden max-h-32 flex-col-reverse gap-0.5 overflow-auto text-xs text-muted lg:flex`,
        children: e.log
          .slice(-12)
          .reverse()
          .map((e) => jsx(`p`, { children: e.text }, e.id)),
      }),
    ],
  });
}
function $r({ state: e, viewer: t }) {
  let n = useT();
  return jsx(`ul`, {
    className: `flex gap-1.5 overflow-x-auto px-3 py-1.5 lg:gap-2 lg:py-2`,
    children: e.players.map((r) => {
      let i = r.id === e.currentPlayer;
      return jsxs(
        `li`,
        {
          className: R(
            `flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] border px-2 py-1.5 lg:min-w-[140px] lg:px-3 lg:py-2`,
            i ? `border-accent bg-surface` : `border-border bg-surface/70`,
          ),
          children: [
            jsx(`span`, {
              className: `size-3 shrink-0 rounded-full`,
              style: { background: (H[r.colorIndex] ?? H[0]).fill },
            }),
            jsxs(`div`, {
              className: `min-w-0 flex-1`,
              children: [
                jsx(`p`, { className: `truncate text-sm font-medium`, children: r.name }),
                jsx(`p`, {
                  className: `text-xs tabular-nums text-muted`,
                  children:
                    r.id === t
                      ? jsxs(Fragment, {
                          children: [
                            Mn(e, r.id),
                            ` `,
                            n(`ui.vp`),
                            r.vpCards > 0 ? ` · ${n(`ui.hidden`, { n: r.vpCards })}` : ``,
                          ],
                        })
                      : jsxs(Fragment, {
                          children: [
                            jn(e, r.id),
                            ` `,
                            n(`ui.vp`),
                            ` · `,
                            n(`ui.cards`, { n: G(r.resources) }),
                          ],
                        }),
                }),
              ],
            }),
            jsxs(`div`, {
              className: `flex flex-col items-end text-xs uppercase tracking-wide text-subtle`,
              children: [
                r.hasLongestRoad && jsx(`span`, { children: n(`ui.longest`) }),
                r.hasLargestArmy && jsx(`span`, { children: n(`ui.army`) }),
                i && jsx(`span`, { className: `text-accent`, children: n(`ui.turn`) }),
              ],
            }),
          ],
        },
        r.id,
      );
    }),
  });
}
function ei(e) {
  return [0, 1, 2, 3, 4, 5]
    .map((t) => {
      let n = (Math.PI / 180) * (60 * t - 30);
      return `${(e * Math.cos(n)).toFixed(1)},${(e * Math.sin(n)).toFixed(1)}`;
    })
    .join(` `);
}
function ti(e) {
  let t =
      e === 6 || e === 8
        ? 5
        : e === 5 || e === 9
          ? 4
          : e === 4 || e === 10
            ? 3
            : e === 3 || e === 11
              ? 2
              : 1,
    n = -((t - 1) * 5) / 2;
  return Array.from({ length: t }, (e, t) => ({ x: n + t * 5, y: 16 }));
}
function ni({ x: e, y: t, fill: n, stroke: r, city: i }) {
  let a = i ? 18 : 14;
  return jsxs(`g`, {
    transform: `translate(${e} ${t})`,
    children: [
      jsx(`ellipse`, {
        cx: 0,
        cy: a - 1,
        rx: a + 2,
        ry: 3.5,
        fill: `#0b0907`,
        opacity: 0.35,
      }),
      i
        ? jsxs(Fragment, {
            children: [
              jsx(`rect`, {
                x: -a,
                y: -4,
                width: a * 2,
                height: a + 4,
                fill: n,
                stroke: r,
                strokeWidth: 2.5,
              }),
              jsx(`rect`, {
                x: -a - 2,
                y: -a - 4,
                width: 12,
                height: a + 6,
                fill: n,
                stroke: r,
                strokeWidth: 2.5,
              }),
              jsx(`polygon`, {
                points: `${-a - 2},${-a - 4} ${-a + 4},${-a - 14} ${-a + 10},${-a - 4}`,
                fill: n,
                stroke: r,
                strokeWidth: 2.5,
                strokeLinejoin: `round`,
              }),
              jsx(`polygon`, {
                points: `${-a},-4 0,${-a - 2} ${a},-4`,
                fill: n,
                stroke: r,
                strokeWidth: 2.5,
                strokeLinejoin: `round`,
              }),
            ],
          })
        : jsx(`polygon`, {
            points: `0,${-a - 2} ${a},-2 ${a},${a} ${-a},${a} ${-a},-2`,
            fill: n,
            stroke: r,
            strokeWidth: 2.6,
            strokeLinejoin: `round`,
          }),
    ],
  });
}
function ri({ x: e, y: t }) {
  return jsxs(`g`, {
    transform: `translate(${e} ${t + 4})`,
    children: [
      jsx(`ellipse`, { cx: 0, cy: 16, rx: 10, ry: 4, fill: `#0b0907`, opacity: 0.4 }),
      jsx(`path`, {
        d: `M0,-16 C8,-16 12,-8 11,-2 C14,4 10,14 6,16 L-6,16 C-10,14 -14,4 -11,-2 C-12,-8 -8,-16 0,-16 Z`,
        fill: `#1a1512`,
        stroke: `#0b0907`,
        strokeWidth: `2`,
      }),
      jsx(`path`, {
        d: `M-5,-4 C-2,0 2,0 5,-4`,
        fill: `none`,
        stroke: `#c8c2b6`,
        strokeWidth: `1.4`,
        opacity: 0.7,
      }),
    ],
  });
}
function ii({ state: e, buildMode: t, disabled: n, onVertex: r, onEdge: i, onHex: a }) {
  let buildMode = t;
  let o = (0, useMemo)(() => {
      let n = e.currentPlayer;
      return (e.phase === `setup` && e.setupNeed === `settlement`) ||
        (e.phase === `main` && t === `settlement`)
        ? new Set(Dn(e, n))
        : e.phase === `main` && t === `city`
          ? new Set(kn(e, n))
          : new Set();
    }, [e, t]),
    s = (0, useMemo)(() => {
      let n = e.currentPlayer;
      return (e.phase === `setup` && e.setupNeed === `road`) ||
        e.phase === `roadBuilding` ||
        (e.phase === `main` && t === `road`)
        ? new Set(On(e, n))
        : new Set();
    }, [e, t]),
    shipLegal = (0, useMemo)(() => {
      if (!isSea(e)) return new Set();
      let n = e.currentPlayer;
      if (typeof t === `string` && t.startsWith(`moveShip:`)) return new Set(shipTargets(e, n, t.slice(9)));
      if (t === `moveShip`) return e.phase === `main` ? new Set(movableShips(e, n)) : new Set();
      return (e.phase === `setup` && e.setupNeed === `road`) ||
        e.phase === `roadBuilding` ||
        (e.phase === `main` && t === `ship`)
        ? new Set(shipSpots(e, n))
        : new Set();
    }, [e, t]),
    sea = isSea(e),
    c = e.phase === `robber` && !n,
    l = e.lastRoll && e.lastRoll.total !== 7 ? e.lastRoll.total : null,
    u = (0, useMemo)(() => new Map(e.board.vertices.map((e) => [e.id, e])), [e.board.vertices]),
    hexOrder = (0, useMemo)(
      () =>
        sea
          ? [...e.board.hexes].sort(
              (a, b) => Number(!isWaterTerrain(a.terrain)) - Number(!isWaterTerrain(b.terrain)),
            )
          : e.board.hexes,
      [e.board.hexes, sea],
    ),
    viewBox = (0, useMemo)(() => {
      if (!sea) return `-500 -460 1000 930`;
      let xs = e.board.vertices.map((v) => v.x),
        ys = e.board.vertices.map((v) => v.y),
        x0 = Math.min(...xs) - 40,
        y0 = Math.min(...ys) - 40;
      return `${x0} ${y0} ${Math.max(...xs) + 40 - x0} ${Math.max(...ys) + 40 - y0}`;
    }, [e.board.vertices, sea]);
  return jsx(`div`, {
    className: `h-full w-full p-1`,
    children: jsxs(`svg`, {
      viewBox,
      preserveAspectRatio: `xMidYMid meet`,
      width: `100%`,
      height: `100%`,
      className: `block h-full w-full select-none`,
      role: `img`,
      "aria-label": `Spelbräde`,
      children: [
        jsxs(`defs`, {
          children: [
            jsx(`filter`, {
              id: `hex-shadow`,
              x: `-20%`,
              y: `-20%`,
              width: `140%`,
              height: `140%`,
              children: jsx(`feDropShadow`, {
                dx: `0`,
                dy: `2`,
                stdDeviation: `3`,
                floodColor: `#000`,
                floodOpacity: `0.45`,
              }),
            }),
            jsx(Xr, {}),
            sea && jsx(SeaPatterns, {}),
          ],
        }),
        !sea && jsx(`polygon`, { points: ei(440), fill: `url(#terrain-water)` }),
        !sea &&
          jsx(`polygon`, {
            points: ei(440),
            fill: `none`,
            stroke: `#0c1c24`,
            strokeWidth: `18`,
            opacity: 0.35,
          }),
        hexOrder.map((t) => {
          let n = en(t.q, t.r),
            water = isWaterTerrain(t.terrain),
            r = l != null && t.number === l && t.id !== e.robberHexId,
            i = c && (water ? sea && t.id !== e.pirateHexId : t.id !== e.robberHexId);
          return jsxs(
            `g`,
            {
              children: [
                jsx(`polygon`, {
                  points: an(t.q, t.r),
                  fill: `url(#terrain-${t.terrain})`,
                  stroke: water ? `#1d4554` : r ? `#f3efe6` : `#1a1510`,
                  strokeWidth: water ? 1.5 : r ? 5 : 3,
                  filter: water ? void 0 : `url(#hex-shadow)`,
                  className: i ? `cursor-pointer` : void 0,
                  onClick: i ? () => a(t.id) : void 0,
                }),
                i &&
                  jsx(`polygon`, {
                    points: an(t.q, t.r),
                    fill: `rgba(243,239,230,0.08)`,
                    stroke: `#c8c2b6`,
                    strokeWidth: `2`,
                    strokeDasharray: `6 5`,
                    className: `cursor-pointer`,
                    onClick: () => a(t.id),
                  }),
                t.number != null &&
                  t.id !== e.robberHexId &&
                  jsxs(`g`, {
                    transform: `translate(${n.x} ${n.y})`,
                    pointerEvents: `none`,
                    children: [
                      jsx(`circle`, {
                        r: `27`,
                        fill: `#efe6d2`,
                        stroke: `#4a3f32`,
                        strokeWidth: `2.2`,
                      }),
                      jsx(`text`, {
                        textAnchor: `middle`,
                        y: `7`,
                        fontFamily: `Fraunces, Georgia, serif`,
                        fontSize: `22`,
                        fontWeight: `650`,
                        fill: t.number === 6 || t.number === 8 ? `#c4544a` : `#2a2218`,
                        children: t.number,
                      }),
                      ti(t.number).map((e, n) =>
                        jsx(
                          `circle`,
                          {
                            cx: e.x,
                            cy: e.y,
                            r: `1.6`,
                            fill: t.number === 6 || t.number === 8 ? `#c4544a` : `#2a2218`,
                          },
                          n,
                        ),
                      ),
                    ],
                  }),
                jsxs(`title`, {
                  children: [Rn[t.terrain], t.number ? ` · ${t.number}` : ``],
                }),
              ],
            },
            t.id,
          );
        }),
        e.board.edges
          .filter((e) => e.port)
          .map((e) => {
            let t = e.midX + e.ox * 36,
              n = e.midY + e.oy * 36,
              r = e.port;
            return jsxs(
              `g`,
              {
                children: [
                  jsx(`line`, {
                    x1: e.midX,
                    y1: e.midY,
                    x2: t,
                    y2: n,
                    stroke: `#c8c2b6`,
                    strokeWidth: `8`,
                    strokeLinecap: `round`,
                    opacity: 0.85,
                  }),
                  jsx(`circle`, {
                    cx: t,
                    cy: n,
                    r: `28`,
                    fill: `#efe6d2`,
                    stroke: `#3d3428`,
                    strokeWidth: `2.6`,
                  }),
                  r.kind === `generic`
                    ? jsx(`text`, {
                        x: t,
                        y: n + 6,
                        textAnchor: `middle`,
                        fontSize: `16`,
                        fontWeight: `700`,
                        fill: `#2a2218`,
                        fontFamily: `Figtree, sans-serif`,
                        children: `3:1`,
                      })
                    : jsx(Yr, { resource: r.kind, x: t, y: n, size: 40 }),
                ],
              },
              `port-${e.id}`,
            );
          }),
        e.board.edges
          .filter((e) => e.road)
          .map((t) => {
            let n = u.get(t.a),
              r = u.get(t.b);
            if (!n || !r) return null;
            let i = H[e.players[t.road.player]?.colorIndex ?? 0] ?? H[0];
            return jsxs(
              `g`,
              {
                children: [
                  jsx(`line`, {
                    x1: n.x,
                    y1: n.y,
                    x2: r.x,
                    y2: r.y,
                    stroke: i.stroke,
                    strokeWidth: `16`,
                    strokeLinecap: `round`,
                  }),
                  jsx(`line`, {
                    x1: n.x,
                    y1: n.y,
                    x2: r.x,
                    y2: r.y,
                    stroke: i.fill,
                    strokeWidth: `10`,
                    strokeLinecap: `round`,
                  }),
                ],
              },
              `road-${t.id}`,
            );
          }),
        sea &&
          e.board.edges
            .filter((t) => t.ship)
            .map((t) => {
              let n = u.get(t.a),
                r = u.get(t.b);
              if (!n || !r) return null;
              let c = H[e.players[t.ship.player]?.colorIndex ?? 0] ?? H[0];
              return jsx(
                ShipPiece,
                {
                  x1: n.x,
                  y1: n.y,
                  x2: r.x,
                  y2: r.y,
                  fill: c.fill,
                  stroke: c.stroke,
                  selected: buildMode === `moveShip:${t.id}`,
                },
                `ship-${t.id}`,
              );
            }),
        !n &&
          [...s].map((t) => {
            let n = e.board.edges.find((e) => e.id === t);
            if (!n) return null;
            let r = u.get(n.a),
              a = u.get(n.b);
            return !r || !a
              ? null
              : jsx(
                  `line`,
                  {
                    x1: r.x,
                    y1: r.y,
                    x2: a.x,
                    y2: a.y,
                    stroke: `#f3efe6`,
                    strokeWidth: `12`,
                    strokeLinecap: `round`,
                    opacity: 0.42,
                    className: `cursor-pointer`,
                    onClick: () => i(t),
                  },
                  `legal-${t}`,
                );
          }),
        !n &&
          [...shipLegal]
            .filter((t) => !s.has(t))
            .map((t) => {
              let n = e.board.edges.find((e) => e.id === t);
              if (!n) return null;
              let r = u.get(n.a),
                a = u.get(n.b);
              return !r || !a
                ? null
                : jsx(
                    `line`,
                    {
                      x1: r.x,
                      y1: r.y,
                      x2: a.x,
                      y2: a.y,
                      stroke: `#9ed2dc`,
                      strokeWidth: `14`,
                      strokeLinecap: `round`,
                      strokeDasharray: `10 9`,
                      opacity: 0.8,
                      className: `cursor-pointer`,
                      onClick: () => i(t),
                    },
                    `legal-ship-${t}`,
                  );
            }),
        e.board.hexes
          .filter((t) => t.id === e.robberHexId)
          .map((e) => {
            let t = en(e.q, e.r);
            return jsx(ri, { x: t.x, y: t.y }, `robber`);
          }),
        sea &&
          e.board.hexes
            .filter((t) => t.id === e.pirateHexId)
            .map((t) => {
              let n = en(t.q, t.r);
              return jsx(PiratePiece, { x: n.x, y: n.y, pulse: c }, `pirate`);
            }),
        e.board.vertices.map((t) => {
          let i = o.has(t.id);
          if (t.building) {
            let a = H[e.players[t.building.player]?.colorIndex ?? 0] ?? H[0];
            return jsx(
              `g`,
              {
                className: i ? `cursor-pointer` : void 0,
                onClick: () => i && !n && r(t.id),
                children: jsx(ni, {
                  x: t.x,
                  y: t.y,
                  fill: a.fill,
                  stroke: a.stroke,
                  city: t.building.type === `city`,
                }),
              },
              t.id,
            );
          }
          return !i || n
            ? null
            : jsxs(
                `g`,
                {
                  className: `cursor-pointer`,
                  onClick: () => r(t.id),
                  children: [
                    jsx(`circle`, {
                      cx: t.x,
                      cy: t.y,
                      r: `16`,
                      fill: `#f3efe6`,
                      opacity: 0.2,
                    }),
                    jsx(`circle`, {
                      cx: t.x,
                      cy: t.y,
                      r: `9`,
                      fill: `#f3efe6`,
                      stroke: `#14110e`,
                      strokeWidth: `2.5`,
                      className: `origin-center`,
                      children: jsx(`animate`, {
                        attributeName: `opacity`,
                        values: `0.7;1;0.7`,
                        dur: `1.6s`,
                        repeatCount: `indefinite`,
                      }),
                    }),
                  ],
                },
                t.id,
              );
        }),
        e.board.vertices
          .filter((t) => t.port)
          .map((t) =>
            jsx(
              `circle`,
              {
                cx: t.x,
                cy: t.y,
                r: `11`,
                fill: `none`,
                stroke: `#e6c27a`,
                strokeWidth: `2`,
                pointerEvents: `none`,
                children: jsx(`title`, {
                  children: `${i(`ui.portNote`)} ${t.port.kind === `generic` ? `3:1` : `2:1`}`,
                }),
              },
              `port-node-${t.id}`,
            ),
          ),
      ],
    }),
  });
}
function ai({ compact: e = !1 }) {
  return jsx(LocaleSwitch, { compact: e });
}
function oi({ title: e, children: t, onClose: n, dock: dock }) {
  let r = useT(),
    panel = jsxs(`div`, {
      className: dock
        ? `pointer-events-auto max-h-[48dvh] w-full overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-surface/95 p-4 shadow-panel sm:max-h-[calc(100dvh-5rem)] sm:w-[22rem]`
        : `relative max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-[var(--radius-xl)] border border-border bg-surface p-5 shadow-panel sm:rounded-[var(--radius-xl)]`,
      children: [
        jsxs(`div`, {
          className: `mb-3 flex items-start justify-between gap-3`,
          children: [
            jsx(`h2`, {
              className: `font-display text-xl font-semibold tracking-tight`,
              children: e,
            }),
            n &&
              jsx(`button`, {
                type: `button`,
                className: `grid size-10 place-items-center rounded-[var(--radius-sm)] text-muted hover:text-fg`,
                onClick: n,
                "aria-label": r(`ui.close`),
                children: jsx(ae, { className: `size-5` }),
              }),
          ],
        }),
        t,
      ],
    });
  if (dock)
    return jsx(`div`, {
      className: `pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:inset-y-0 sm:left-auto sm:flex sm:items-start sm:p-4 sm:pt-16 lg:right-80`,
      children: panel,
    });
  return jsxs(`div`, {
    className: `fixed inset-0 z-50 flex items-end justify-center sm:items-center`,
    children: [
      jsx(`button`, {
        type: `button`,
        className: `absolute inset-0 bg-bg/70`,
        "aria-label": r(`ui.close`),
        onClick: n,
      }),
      panel,
    ],
  });
}
function si({ onClose: e, sea }) {
  let t = useT();
  return jsxs(oi, {
    title: t(`rules.title`),
    onClose: e,
    children: [
      jsxs(`div`, {
        className: `max-h-[60dvh] space-y-3 overflow-auto text-sm leading-relaxed text-muted`,
        children: [
          jsxs(`div`, {
            className: `rounded-[var(--radius-md)] bg-surface-2 px-3 py-2 text-sm`,
            children: [
              jsx(`p`, {
                className: `text-xs font-medium tracking-[0.14em] text-fg uppercase`,
                children: t(`ui.costs`),
              }),
              jsx(`ul`, {
                className: `mt-2 space-y-1`,
                children: [
                  [`road`, `ui.road`],
                  [`settlement`, `ui.settle`],
                  [`city`, `ui.city`],
                  [`dev`, `ui.card`],
                  ...(sea ? [[`ship`, `ui.ship`]] : []),
                ].map(([key, label]) =>
                  jsxs(
                    `li`,
                    {
                      className: `flex justify-between gap-3`,
                      children: [
                        jsx(`span`, { className: `text-fg`, children: t(label) }),
                        jsx(`span`, {
                          children: V.filter((r) => U[key]?.[r])
                            .map((r) => `${U[key][r]} ${Y[r].toLowerCase()}`)
                            .join(`, `),
                        }),
                      ],
                    },
                    key,
                  ),
                ),
              }),
              jsx(`p`, { className: `mt-2`, children: t(`ui.odds`) }),
              jsx(`p`, { children: t(`ui.portNote`) }),
            ],
          }),
          jsx(`p`, { children: t(`rules.p1`) }),
          jsx(`p`, { children: t(`rules.p2`) }),
          jsx(`p`, { children: t(`rules.p3`) }),
          jsx(`p`, { children: t(`rules.p4`) }),
          jsx(`p`, { children: t(`rules.p5`) }),
          jsxs(`div`, {
            className: `space-y-2 rounded-[var(--radius-md)] border border-border px-3 py-2`,
            children: [
              jsx(`p`, {
                className: `text-xs font-medium tracking-[0.14em] text-fg uppercase`,
                children: t(`rules.seaTitle`),
              }),
              jsx(`p`, { children: t(`rules.sea1`) }),
              jsx(`p`, { children: t(`rules.sea2`) }),
              jsx(`p`, { children: t(`rules.sea3`) }),
              jsx(`p`, { children: t(`rules.sea4`) }),
            ],
          }),
          jsxs(`p`, {
            children: [
              t(`rules.api`),
              " ",
              jsx(`a`, {
                href: `/api/docs`,
                className: `underline`,
                children: `/api/docs`,
              }),
            ],
          }),
        ],
      }),
      jsxs(`div`, {
        className: `mt-4 flex items-center justify-between gap-3 border-t border-border pt-3`,
        children: [
          jsx(`span`, { className: `text-xs text-muted`, children: t(`start.language`) }),
          jsx(ai, { compact: !0 }),
        ],
      }),
    ],
  });
}
function ci({ state: e, playerId: t, onConfirm: n }) {
  let r = useT(),
    i = e.players[t],
    a = Math.floor(G(i.resources) / 2),
    [o, s] = (0, useState)(W),
    c = G(o);
  return jsxs(oi, {
    title: r(`ui.discardTitle`, { name: i.name, n: a }),
    children: [
      jsx(`p`, {
        className: `mb-4 text-sm text-muted`,
        children: r(`ui.discardHint`, { n: a }),
      }),
      jsx(`div`, {
        className: `space-y-2`,
        children: V.map((e) =>
          jsxs(
            `div`,
            {
              className: `flex items-center gap-3`,
              children: [
                jsx(Zr, { resource: e }),
                jsx(`span`, { className: `flex-1 text-sm`, children: Y[e] }),
                jsx(`span`, {
                  className: `w-8 text-right text-sm tabular-nums text-muted`,
                  children: i.resources[e],
                }),
                jsxs(`div`, {
                  className: `flex items-center gap-1`,
                  children: [
                    jsx(B, {
                      type: `button`,
                      size: `icon`,
                      variant: `secondary`,
                      className: `size-10`,
                      disabled: o[e] <= 0,
                      onClick: () => s((t) => ({ ...t, [e]: t[e] - 1 })),
                      children: `−`,
                    }),
                    jsx(`span`, {
                      className: `w-6 text-center text-sm tabular-nums`,
                      children: o[e],
                    }),
                    jsx(B, {
                      type: `button`,
                      size: `icon`,
                      variant: `secondary`,
                      className: `size-10`,
                      disabled: o[e] >= i.resources[e] || c >= a,
                      onClick: () => s((t) => ({ ...t, [e]: t[e] + 1 })),
                      children: `+`,
                    }),
                  ],
                }),
              ],
            },
            e,
          ),
        ),
      }),
      jsx(B, {
        type: `button`,
        className: `mt-5 w-full`,
        disabled: c !== a,
        onClick: () => n(o),
        children: r(`ui.discardBtn`, { chosen: c, need: a }),
      }),
    ],
  });
}
function goldDialog({ state: e, playerId: t, onConfirm: n }) {
  let r = useT(),
    p = e.players[t],
    need = goldNeed(e),
    [o, s] = (0, useState)(W),
    c = G(o);
  return jsxs(oi, {
    title: r(`ui.goldTitle`, { name: p.name, n: need }),
    children: [
      jsx(`p`, { className: `mb-4 text-sm text-muted`, children: r(`ui.goldHint`, { n: need }) }),
      jsx(`div`, {
        className: `space-y-2`,
        children: V.map((k) =>
          jsxs(
            `div`,
            {
              className: `flex items-center gap-3`,
              children: [
                jsx(Zr, { resource: k }),
                jsx(`span`, { className: `flex-1 text-sm`, children: Y[k] }),
                jsx(`span`, {
                  className: `w-8 text-right text-sm tabular-nums text-muted`,
                  children: p.resources[k],
                }),
                jsxs(`div`, {
                  className: `flex items-center gap-1`,
                  children: [
                    jsx(B, {
                      type: `button`,
                      size: `icon`,
                      variant: `secondary`,
                      className: `size-10`,
                      disabled: o[k] <= 0,
                      onClick: () => s((v) => ({ ...v, [k]: v[k] - 1 })),
                      children: `−`,
                    }),
                    jsx(`span`, { className: `w-6 text-center text-sm tabular-nums`, children: o[k] }),
                    jsx(B, {
                      type: `button`,
                      size: `icon`,
                      variant: `secondary`,
                      className: `size-10`,
                      disabled: o[k] >= e.bank[k] || c >= need,
                      onClick: () => s((v) => ({ ...v, [k]: v[k] + 1 })),
                      children: `+`,
                    }),
                  ],
                }),
              ],
            },
            k,
          ),
        ),
      }),
      jsx(B, {
        type: `button`,
        className: `mt-5 w-full`,
        disabled: c !== need,
        onClick: () => n(o),
        children: r(`ui.goldBtn`, { chosen: c, need }),
      }),
    ],
  });
}
function wi({ label: e, resources: t, next: n, total: r }) {
  let a = useT();
  return jsxs(`div`, {
    children: [
      jsxs(`div`, {
        className: `mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1`,
        children: [
          jsx(`p`, {
            className: `text-xs font-medium tracking-wide text-muted uppercase`,
            children: e,
          }),
          jsx(`p`, {
            className: `text-xs tabular-nums text-muted`,
            children: n
              ? jsxs(Fragment, {
                  children: [
                    jsx(`span`, {
                      className: `mr-2 tracking-wide uppercase`,
                      children: a(`ui.nowThen`),
                    }),
                    r,
                  ],
                })
              : r,
          }),
        ],
      }),
      jsx(`div`, {
        className: `grid grid-cols-5 gap-1`,
        children: V.map((e) => {
          let i = t[e] ?? 0,
            o = n ? (n[e] ?? 0) : i,
            s = !!n && o !== i;
          return jsxs(
            `div`,
            {
              className: `flex flex-col items-center gap-0.5 rounded-[var(--radius-sm)] bg-surface-2 py-1.5`,
              title: Y[e],
              children: [
                jsx(Zr, { resource: e, size: `sm` }),
                jsx(`span`, {
                  className: R(
                    `font-medium tabular-nums`,
                    s ? `text-xs` : `text-sm`,
                    s && o < 0 && `text-danger`,
                  ),
                  children: s ? `${i}→${o}` : `${i}`,
                }),
              ],
            },
            e,
          );
        }),
      }),
    ],
  });
}
function li({ state: e, playerId: t, onBank: n, onOffer: r, onClose: i }) {
  let a = useT(),
    o = e.players[t],
    [s, c] = (0, useState)(`bank`),
    [l, d] = (0, useState)(`wood`),
    [f, p] = (0, useState)(`brick`),
    [m, h] = (0, useState)(
      e.players.filter((e) => e.id !== t).length > 1
        ? -1
        : (e.players.find((e) => e.id !== t)?.id ?? 0),
    ),
    [g, _] = (0, useState)(W),
    [v, y] = (0, useState)(W),
    b = An(e, t, l);
  return jsxs(oi, {
    title: a(`ui.tradeTitle`),
    onClose: i,
    dock: !0,
    children: [
      jsx(wi, {
        label: a(`ui.youHave`),
        resources: o.resources,
        total: String(G(o.resources)),
      }),
      jsx(`div`, {
        className: `mt-4 mb-4 grid grid-cols-2 gap-1 rounded-[var(--radius-md)] bg-surface-2 p-1`,
        children: [`bank`, `player`].map((e) =>
          jsx(
            `button`,
            {
              type: `button`,
              className: R(
                `h-10 rounded-[var(--radius-sm)] text-sm font-medium`,
                s === e ? `bg-surface text-fg` : `text-muted`,
              ),
              onClick: () => c(e),
              children: a(e === `bank` ? `ui.bank` : `ui.players`),
            },
            e,
          ),
        ),
      }),
      s === `bank`
        ? jsxs(`div`, {
            className: `space-y-4`,
            children: [
              jsx(`p`, {
                className: `text-sm text-muted`,
                children: a(`ui.rate`, { resource: Y[l].toLowerCase(), rate: b }),
              }),
              jsx(ui, { label: a(`ui.give`), value: l, onChange: d }),
              jsx(ui, { label: a(`ui.get`), value: f, onChange: p }),
              jsx(B, {
                type: `button`,
                className: `w-full`,
                disabled: l === f || o.resources[l] < b,
                onClick: () => n(l, f),
                children: a(`ui.swap`, {
                  rate: b,
                  give: Y[l].toLowerCase(),
                  get: Y[f].toLowerCase(),
                }),
              }),
            ],
          })
        : jsxs(`div`, {
            className: `space-y-3`,
            children: [
              jsxs(`label`, {
                className: `block text-sm text-muted`,
                children: [
                  a(`ui.to`),
                  jsx(`select`, {
                    className: `mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 text-fg`,
                    value: String(m),
                    onChange: (e) => h(Number(e.target.value)),
                    children: [
                      e.players.filter((e) => e.id !== t).length > 1 &&
                        jsx(`option`, { value: `-1`, children: a(`ui.toAll`) }, `all`),
                      ...e.players
                        .filter((e) => e.id !== t)
                        .map((e) => jsx(`option`, { value: String(e.id), children: e.name }, e.id)),
                    ],
                  }),
                ],
              }),
              jsx(`p`, { className: `text-xs text-muted`, children: a(`ui.youGive`) }),
              jsx(di, { bank: g, max: o.resources, onChange: _ }),
              jsx(`p`, { className: `text-xs text-muted`, children: a(`ui.youWant`) }),
              jsx(di, { bank: v, onChange: y }),
              jsx(B, {
                type: `button`,
                className: `w-full`,
                disabled: G(g) === 0 || G(v) === 0,
                onClick: () => r(m, g, v),
                children: a(`ui.send`),
              }),
            ],
          }),
    ],
  });
}
function ui({ label: e, value: t, onChange: n }) {
  return jsxs(`div`, {
    children: [
      jsx(`p`, { className: `mb-2 text-xs text-muted`, children: e }),
      jsx(`div`, {
        className: `grid grid-cols-5 gap-1`,
        children: V.map((e) =>
          jsx(
            `button`,
            {
              type: `button`,
              onClick: () => n(e),
              className: R(
                `grid place-items-center rounded-[var(--radius-sm)] p-1 ring-1`,
                t === e ? `ring-accent` : `ring-border`,
              ),
              "aria-label": Y[e],
              children: jsx(Zr, { resource: e, size: `sm` }),
            },
            e,
          ),
        ),
      }),
    ],
  });
}
function di({ bank: e, max: t, onChange: n }) {
  return jsx(`div`, {
    className: `space-y-1`,
    children: V.map((r) =>
      jsxs(
        `div`,
        {
          className: `flex items-center gap-2`,
          children: [
            jsx(Zr, { resource: r, size: `sm` }),
            jsx(`span`, {
              className: `flex-1 text-xs`,
              children: t ? `${Y[r]} (${t[r]})` : Y[r],
            }),
            jsx(B, {
              type: `button`,
              size: `icon`,
              variant: `secondary`,
              className: `size-9`,
              disabled: e[r] <= 0,
              onClick: () => n({ ...e, [r]: e[r] - 1 }),
              children: `−`,
            }),
            jsx(`span`, {
              className: `w-5 text-center text-sm tabular-nums`,
              children: e[r],
            }),
            jsx(B, {
              type: `button`,
              size: `icon`,
              variant: `secondary`,
              className: `size-9`,
              disabled: t ? e[r] >= t[r] : !1,
              onClick: () => n({ ...e, [r]: e[r] + 1 }),
              children: `+`,
            }),
          ],
        },
        r,
      ),
    ),
  });
}
function tradeBanner({ state: e, viewerId: viewer, onRespond: respond, onCancel: cancel }) {
  let t = useT(),
    offer = e.tradeOffer;
  if (!offer) return null;
  let pending = offerPending(e),
    from = e.players[offer.from],
    names = pending
      .map((id) => e.players[id]?.name)
      .filter(Boolean)
      .join(`, `),
    give = V.filter((r) => offer.give[r] > 0)
      .map((r) => `${offer.give[r]} ${Y[r].toLowerCase()}`)
      .join(`, `),
    want = V.filter((r) => offer.want[r] > 0)
      .map((r) => `${offer.want[r]} ${Y[r].toLowerCase()}`)
      .join(`, `),
    open = pending.length > 1;
  return jsxs(`div`, {
    className: `mx-3 mt-1 rounded-[var(--radius-md)] border border-accent/50 bg-surface px-3 py-2 text-sm shadow-panel`,
    "data-testid": `trade-banner`,
    children: [
      jsx(`p`, {
        children: t(
          open ? `ui.tradeBannerAll` : `ui.tradeBanner`,
          {
            from: from?.name ?? ``,
            to: names,
            give: give || `—`,
            want: want || `—`,
          },
        ),
      }),
      viewer === offer.from &&
        jsx(`p`, {
          className: `mt-1 text-xs text-muted`,
          children: t(`ui.tradeWaiting`, { name: names }),
        }),
      pending.includes(viewer) &&
        jsxs(`div`, {
          className: `mt-2 flex gap-2`,
          children: [
            jsx(B, {
              type: `button`,
              size: `sm`,
              variant: `secondary`,
              onClick: () => respond(!1),
              children: t(`ui.decline`),
            }),
            jsx(B, {
              type: `button`,
              size: `sm`,
              onClick: () => respond(!0),
              children: t(`ui.accept`),
            }),
          ],
        }),
      viewer === offer.from &&
        jsx(B, {
          type: `button`,
          size: `sm`,
          variant: `secondary`,
          className: `mt-2`,
          onClick: cancel,
          children: t(`ui.retract`),
        }),
    ],
  });
}
function fi({ state: e, viewerId: viewer, onRespond: t }) {
  let n = useT(),
    r = e.tradeOffer,
    i = e.players[r.from],
    a = e.players[viewer],
    have = a?.resources ?? W(),
    next = W();
  for (let res of V) next[res] = (have[res] ?? 0) - (r.want[res] ?? 0) + (r.give[res] ?? 0);
  let o = a ? K(a.resources, r.want) : !1,
    beforeN = G(have),
    afterN = G(next);
  return jsxs(oi, {
    title: n(`ui.wantsTrade`, { name: i.name }),
    dock: !0,
    children: [
      jsxs(`p`, {
        className: `mb-3 flex items-center gap-2 text-sm text-muted`,
        children: [
          jsx(`span`, {
            className: `size-3 shrink-0 rounded-full`,
            style: { background: (H[i.colorIndex] ?? H[0]).fill },
          }),
          n(`ui.theirCards`, { name: i.name, n: G(i.resources) }),
        ],
      }),
      jsx(wi, {
        label: n(`ui.youHave`),
        resources: have,
        next,
        total: beforeN === afterN ? String(beforeN) : `${beforeN} → ${afterN}`,
      }),
      jsx(`p`, {
        className: `mt-3 mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
        children: n(`ui.youGet`),
      }),
      jsx(pi, { bank: r.give }),
      jsx(`p`, {
        className: `mt-3 mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
        children: n(`ui.youGive`),
      }),
      jsx(pi, { bank: r.want, have }),
      !o && jsx(`p`, { className: `mt-3 text-sm text-muted`, children: n(`ui.cantAfford`) }),
      jsxs(`div`, {
        className: `mt-5 grid grid-cols-2 gap-2`,
        children: [
          jsx(B, {
            type: `button`,
            variant: `secondary`,
            onClick: () => t(!1),
            children: n(`ui.decline`),
          }),
          jsx(B, {
            type: `button`,
            disabled: !o,
            onClick: () => t(!0),
            children: n(`ui.accept`),
          }),
        ],
      }),
    ],
  });
}
function pi({ bank: e, have: r }) {
  let t = useT(),
    n = V.filter((t) => e[t] > 0);
  return n.length === 0
    ? jsx(`p`, { className: `text-sm text-muted`, children: t(`ui.nothing`) })
    : jsx(`ul`, {
        className: `flex flex-wrap gap-2`,
        children: n.map((n) => {
          let a = r ? (r[n] ?? 0) : null,
            o = a != null && a < e[n];
          return jsxs(
            `li`,
            {
              className: R(
                `inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-surface-2 px-2 py-1.5`,
                o && `ring-1 ring-danger`,
              ),
              children: [
                jsx(Zr, { resource: n, size: `sm` }),
                jsxs(`span`, {
                  className: `text-sm`,
                  children: [
                    e[n],
                    ` `,
                    Y[n].toLowerCase(),
                    a != null &&
                      jsx(`span`, {
                        className: R(`ml-1.5 text-xs`, o ? `text-danger` : `text-muted`),
                        children: t(`ui.youHold`, { n: a }),
                      }),
                  ],
                }),
              ],
            },
            n,
          );
        }),
      });
}
function mi({ state: e, onCancel: t }) {
  let n = useT(),
    r = e.tradeOffer,
    i = e.players[r.to];
  return jsxs(oi, {
    title: n(`ui.tradeTo`, { name: i.name }),
    children: [
      jsx(`p`, {
        className: `mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
        children: n(`ui.youGive`),
      }),
      jsx(pi, { bank: r.give }),
      jsx(`p`, {
        className: `mt-3 mb-2 text-xs font-medium tracking-wide text-muted uppercase`,
        children: n(`ui.youWant`),
      }),
      jsx(pi, { bank: r.want }),
      jsx(`p`, {
        className: `mt-4 mb-5 text-sm text-muted`,
        children: n(`ui.thinking`, { name: i.name }),
      }),
      jsx(B, {
        type: `button`,
        variant: `secondary`,
        className: `w-full`,
        onClick: t,
        children: n(`ui.retract`),
      }),
    ],
  });
}
function hi({ title: e, count: t, onPick: n, onClose: r }) {
  let i = useT(),
    [a, o] = (0, useState)([]);
  return jsxs(oi, {
    title: e,
    onClose: r,
    children: [
      jsx(`p`, {
        className: `mb-3 text-sm text-muted`,
        children: t === 2 ? i(`ui.pickTwo`, { n: a.length }) : i(`ui.pickOne`),
      }),
      jsx(`div`, {
        className: `grid grid-cols-5 gap-2`,
        children: V.map((e) =>
          jsxs(
            `button`,
            {
              type: `button`,
              className: R(
                `grid place-items-center rounded-[var(--radius-md)] p-2 ring-1 ring-border hover:ring-accent`,
              ),
              onClick: () => {
                let r = [...a, e];
                r.length >= t ? n(r[0], r[t - 1] ?? r[0]) : o(r);
              },
              children: [
                jsx(Zr, { resource: e }),
                jsx(`span`, { className: `mt-1 text-xs text-muted`, children: Y[e] }),
              ],
            },
            e,
          ),
        ),
      }),
    ],
  });
}
function gi({ state: e, victims: t, onPick: n }) {
  let r = useT();
  return jsx(oi, {
    title: r(`ui.stealTitle`),
    children: jsx(`div`, {
      className: `space-y-2`,
      children: t.map((t) => {
        let i = e.players[t];
        return i
          ? jsxs(
              B,
              {
                type: `button`,
                variant: `secondary`,
                className: `w-full justify-start`,
                onClick: () => n(t),
                children: [
                  jsx(`span`, {
                    className: `size-3 rounded-full`,
                    style: { background: (H[i.colorIndex] ?? H[0]).fill },
                  }),
                  i.name,
                  jsx(`span`, {
                    className: `ml-auto text-muted`,
                    children: r(`ui.stealCards`, { n: G(i.resources) }),
                  }),
                ],
              },
              t,
            )
          : null;
      }),
    }),
  });
}
function _i({ state: e, onMenu: t }) {
  let n = useT(),
    r = e.players[e.winnerId ?? 0] ?? e.players[0],
    i = (0, useMemo)(() => e.players.slice().sort((t, n) => Mn(e, n.id) - Mn(e, t.id)), [e]);
  return r
    ? jsxs(oi, {
        title: n(`ui.winTitle`, { name: r.name }),
        children: [
          jsx(`p`, {
            className: `mb-4 text-sm text-muted`,
            children: n(`ui.winBody`, { name: r.name, n: Mn(e, r.id) }),
          }),
          jsx(`ol`, {
            className: `mb-5 space-y-2`,
            children: i.map((t) =>
              jsxs(
                `li`,
                {
                  className: `flex items-center gap-3 text-sm`,
                  children: [
                    jsx(`span`, {
                      className: `size-3 rounded-full`,
                      style: { background: (H[t.colorIndex] ?? H[0]).fill },
                    }),
                    jsx(`span`, { className: `flex-1`, children: t.name }),
                    jsxs(`span`, {
                      className: `tabular-nums text-muted`,
                      children: [Mn(e, t.id), ` `, n(`ui.vp`)],
                    }),
                  ],
                },
                t.id,
              ),
            ),
          }),
          jsx(B, {
            type: `button`,
            className: `w-full`,
            onClick: t,
            children: n(`ui.backMenu`),
          }),
        ],
      })
    : null;
}
function vi({ onCancel: e, onConfirm: t }) {
  let n = useT();
  return jsxs(oi, {
    title: n(`exit.title`),
    onClose: e,
    children: [
      jsx(`p`, { className: `mb-5 text-sm text-muted`, children: n(`exit.body`) }),
      jsxs(`div`, {
        className: `grid grid-cols-2 gap-2`,
        children: [
          jsx(B, {
            type: `button`,
            variant: `secondary`,
            onClick: e,
            children: n(`exit.cancel`),
          }),
          jsx(B, { type: `button`, onClick: t, children: n(`exit.confirm`) }),
        ],
      }),
    ],
  });
}
function yi({ onStart: t, onContinue: n, onRules: r, onInvite: onInvite, musicOff, onMusic }) {
  let i = useT(),
    a = useLocaleStore((e) => e.locale),
    [s, c] = (0, useState)(() => {
      let e = aiNames();
      return [
        { name: ``, isAi: !1, colorIndex: 0 },
        { name: e[0], isAi: !0, colorIndex: 1 },
        { name: e[1], isAi: !0, colorIndex: 2 },
      ];
    }),
    [f, p] = (0, useState)(!1),
    [pro, setPro] = (0, useState)(!1),
    [sea, setSea] = (0, useState)(!1);
  ((0, useEffect)(() => {
    p(Ir());
  }, []),
    (0, useEffect)(() => {
      let t = aiNames(a),
        n = youNames(),
        friends = friendNames(),
        r = allAiNames();
      c((list) => {
        let o = 0;
        return list.map((seat, index) => {
          if (!seat.isAi && (seat.name === `` || n.has(seat.name) || friends.has(seat.name)))
            return { ...seat, name: i(`start.playerN`, { n: index + 1 }) };
          if (seat.isAi && (r.has(seat.name) || seat.name === ``)) {
            let e = t[o] ?? i(`start.computer`);
            return ((o += 1), { ...seat, name: e });
          }
          return (seat.isAi && (o += 1), seat);
        });
      });
    }, [a, i]));
  let h = new Set(s.map((e) => e.colorIndex));
  function g(e, t) {
    c((n) => n.map((n, r) => (r === e ? { ...n, ...t } : n)));
  }
  return jsxs(`div`, {
    className: `relative flex min-h-dvh flex-col overflow-hidden bg-bg text-fg`,
    children: [
      jsx(`img`, {
        src: `/assets/hero-island.jpg`,
        alt: ``,
        className: `absolute inset-0 h-full w-full object-cover`,
      }),
      jsx(`div`, {
        className: `absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg`,
      }),
      jsxs(`div`, {
        className: `relative mx-auto flex w-full max-w-lg flex-1 flex-col justify-end gap-6 px-5 py-8 sm:justify-center`,
        children: [
          jsxs(`header`, {
            className: `space-y-2`,
            children: [
              jsxs(`div`, {
                className: `flex items-center justify-between gap-3`,
                children: [
                  jsx(`p`, {
                    className: `text-xs font-medium tracking-[0.22em] text-accent uppercase`,
                    children: i(`start.kicker`),
                  }),
                  jsxs(`div`, {
                    className: `flex items-center gap-1`,
                    children: [
                      jsx(MusicButton, {
                        off: musicOff,
                        onClick: onMusic,
                        label: i(musicOff ? `ui.musicOn` : `ui.musicOff`),
                      }),
                      jsx(ai, { compact: !0 }),
                    ],
                  }),
                ],
              }),
              jsx(`h1`, {
                className: `font-display text-5xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl`,
                children: `Havn`,
              }),
              jsx(`p`, {
                className: `max-w-sm text-base leading-relaxed text-muted`,
                children: i(`start.blurb`),
              }),
            ],
          }),
          jsxs(`section`, {
            className: `rounded-[var(--radius-xl)] border border-border bg-surface/90 p-4 shadow-panel`,
            children: [
              jsxs(`div`, {
                className: `mb-3 flex items-center justify-between`,
                children: [
                  jsx(`h2`, {
                    className: `text-sm font-medium text-muted`,
                    children: i(`start.players`),
                  }),
                  jsx(`div`, {
                    className: `flex gap-2`,
                    children: jsxs(B, {
                      type: `button`,
                      size: `sm`,
                      variant: `secondary`,
                      disabled: s.length >= 4,
                      onClick: () => {
                        let e = H.findIndex((e, t) => !h.has(t)),
                          t = aiNames(a);
                        c((n) => [
                          ...n,
                          {
                            name:
                              t[n.filter((e) => e.isAi).length] ??
                              i(`start.playerN`, { n: n.length + 1 }),
                            isAi: !0,
                            colorIndex: e < 0 ? n.length : e,
                          },
                        ]);
                      },
                      children: [jsx(te, { className: `size-3.5` }), i(`start.add`)],
                    }),
                  }),
                ],
              }),
              jsx(`ul`, {
                className: `space-y-2`,
                children: s.map((e, t) =>
                  jsxs(
                    `li`,
                    {
                      className: `flex items-center gap-2 rounded-[var(--radius-md)] bg-surface-2 p-2`,
                      children: [
                        jsx(`span`, {
                          className: `size-7 shrink-0 rounded-full ring-2 ring-bg`,
                          style: { background: H[e.colorIndex].fill },
                          "aria-hidden": !0,
                        }),
                        jsx(`input`, {
                          value: e.name,
                          onChange: (e) => g(t, { name: e.target.value }),
                          className: `h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/40`,
                          "aria-label": i(`start.nameAria`, { n: t + 1 }),
                        }),
                        jsxs(`button`, {
                          type: `button`,
                          className: R(
                            `inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 text-xs font-medium`,
                            e.isAi
                              ? `border-border text-muted`
                              : `border-border-strong bg-surface text-fg`,
                          ),
                          onClick: () => {
                            let n = !e.isAi,
                              r = aiNames(a),
                              o = s.filter((e) => e.isAi).length;
                            g(t, {
                              isAi: n,
                              name: n
                                ? (r[o] ?? i(`start.computer`))
                                : i(`start.playerN`, { n: t + 1 }),
                            });
                          },
                          children: [
                            e.isAi
                              ? jsx(m, { className: `size-3.5` })
                              : jsx(C, { className: `size-3.5` }),
                            e.isAi
                              ? i(`start.computer`)
                              : t === 0
                                ? i(`start.you`)
                                : i(`mp.friend`),
                          ],
                        }),
                        s.length > 2 &&
                          jsx(`button`, {
                            type: `button`,
                            className: `grid size-10 place-items-center text-muted hover:text-fg`,
                            onClick: () => c((e) => e.filter((e, n) => n !== t)),
                            "aria-label": i(`start.removeAria`),
                            children: jsx(S, { className: `size-4` }),
                          }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
          jsxs(`div`, {
            className: `flex flex-col gap-2`,
            children: [
              jsxs(`button`, {
                type: `button`,
                onClick: () => setPro((v) => !v),
                "aria-pressed": pro,
                className: R(
                  `flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3 py-2 text-left`,
                  pro ? `border-accent bg-surface` : `border-border bg-surface/80`,
                ),
                children: [
                  jsxs(`span`, {
                    children: [
                      jsx(`span`, {
                        className: `block text-sm font-medium text-fg`,
                        children: i(`start.pro`),
                      }),
                      jsx(`span`, {
                        className: `block text-xs text-muted`,
                        children: i(`start.proHint`),
                      }),
                    ],
                  }),
                  jsx(`span`, {
                    className: `shrink-0 text-xs font-medium`,
                    children: pro ? i(`start.proOn`) : i(`start.proOff`),
                  }),
                ],
              }),
              jsxs(`button`, {
                type: `button`,
                onClick: () => setSea((v) => !v),
                "aria-pressed": sea,
                "data-testid": `sea-mode`,
                className: R(
                  `flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3 py-2 text-left`,
                  sea ? `border-accent bg-surface` : `border-border bg-surface/80`,
                ),
                children: [
                  jsxs(`span`, {
                    children: [
                      jsx(`span`, {
                        className: `block text-sm font-medium text-fg`,
                        children: i(`start.sea`),
                      }),
                      jsx(`span`, {
                        className: `block text-xs text-muted`,
                        children: i(`start.seaHint`),
                      }),
                    ],
                  }),
                  jsx(`span`, {
                    className: `shrink-0 text-xs font-medium`,
                    children: sea ? i(`start.proOn`) : i(`start.proOff`),
                  }),
                ],
              }),
              jsx(B, {
                type: `button`,
                size: `lg`,
                className: `w-full`,
                "data-testid": `start-game`,
                onClick: () => t(s, pro, sea),
                children: i(`start.startGame`),
              }),
              onInvite &&
                jsxs(Fragment, {
                  children: [
                    jsx(B, {
                      type: `button`,
                      size: `lg`,
                      variant: `secondary`,
                      className: `w-full`,
                      "data-testid": `invite-friend`,
                      onClick: () => onInvite(s, pro, sea),
                      children: i(`mp.invite`),
                    }),
                    jsx(`p`, {
                      className: `px-1 text-center text-xs leading-relaxed text-muted`,
                      children: i(`mp.inviteHint`),
                    }),
                  ],
                }),
              f &&
                jsx(B, {
                  type: `button`,
                  size: `lg`,
                  variant: `secondary`,
                  className: `w-full`,
                  onClick: n,
                  children: i(`start.continueGame`),
                }),
              jsxs(B, {
                type: `button`,
                variant: `ghost`,
                className: `w-full`,
                onClick: r,
                children: [jsx(ee, { className: `size-4` }), i(`start.how`)],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var bi = class extends Component {
  state = { err: null };
  static getDerivedStateFromError(e) {
    return { err: e };
  }
  render() {
    return this.state.err
      ? jsxs(`div`, {
          className: `flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg`,
          children: [
            jsx(`h1`, {
              className: `font-display text-2xl font-semibold`,
              children: i(`ui.crashedTitle`),
            }),
            jsx(`p`, {
              className: `max-w-sm text-sm text-muted`,
              children: i(`ui.crashedBody`),
            }),
            jsx(B, {
              type: `button`,
              onClick: () => {
                (this.setState({ err: null }), this.props.onReset());
              },
              children: i(`ui.continueBtn`),
            }),
          ],
        })
      : this.props.children;
  }
};
function musicStoredOff() {
  try {
    return localStorage.getItem(`havn-music`) === `0`;
  } catch {
    return !1;
  }
}
function rememberMusic(off) {
  try {
    localStorage.setItem(`havn-music`, off ? `0` : `1`);
  } catch {}
}
function useThemeMusic() {
  let audioRef = (0, useRef)(null),
    [off, setOff] = (0, useState)(musicStoredOff);
  (0, useEffect)(() => {
    let audio = new Audio(`/assets/havn-theme.mp3`);
    audio.loop = !0;
    audio.volume = 0.24;
    audioRef.current = audio;
    let kick = () => {
      window.removeEventListener(`pointerdown`, kick);
      window.removeEventListener(`keydown`, kick);
      if (!musicStoredOff()) audio.play().catch(() => {});
    };
    if (!musicStoredOff()) audio.play().catch(() => {
      window.addEventListener(`pointerdown`, kick);
      window.addEventListener(`keydown`, kick);
    });
    return () => {
      window.removeEventListener(`pointerdown`, kick);
      window.removeEventListener(`keydown`, kick);
      audio.pause();
      audioRef.current = null;
    };
  }, []);
  let toggle = (0, useCallback)(() => {
    setOff((prev) => {
      let next = !prev;
      rememberMusic(next);
      let audio = audioRef.current;
      if (audio) next ? audio.pause() : audio.play().catch(() => {});
      return next;
    });
  }, []);
  return [off, toggle];
}
function MusicButton({ off, onClick, label }) {
  return jsx(B, {
    type: `button`,
    size: `icon`,
    variant: `ghost`,
    onClick,
    "aria-label": label,
    "aria-pressed": !off,
    children: jsxs(`span`, {
      className: `relative grid place-items-center`,
      children: [
        jsx(Music, { className: off ? `opacity-40` : undefined }),
        off &&
          jsx(`span`, {
            className: `pointer-events-none absolute h-px w-4 rotate-45 bg-current`,
          }),
      ],
    }),
  });
}
function xi({ onLeaveMatch } = {}) {
  let e = useGame((e) => e.state),
    t = useGame((e) => e.hydrate),
    n = useGame((e) => e.start),
    r = useGame((e) => e.continueSave),
    i = useGame((e) => e.toMenu),
    a = useGame((e) => e.dispatch),
    o = useGame((e) => e.buildMode),
    c = useGame((e) => e.setBuildMode),
    l = useGame((e) => e.muted),
    d = useGame((e) => e.toggleMute),
    f = useGame((e) => e.tickAi),
    m = useGame((e) => e.error),
    matchRole = useGame((e) => e.matchRole),
    viewerId = useGame((e) => e.viewerId),
    startInvite = useGame((e) => e.startInvite),
    setMatch = useGame((e) => e.setMatch),
    resetMatch = useGame((e) => e.resetMatch),
    nav = useNavigate({ from: `/` }),
    h = useLocaleStore((e) => e.hydrateLocale),
    g = useLocaleStore((e) => e.ready),
    _ = useT(),
    [v, y] = (0, useState)(null),
    [ee, te] = (0, useState)(!1),
    [notice, setNotice] = (0, useState)(null),
    rollSeen = (0, useRef)({ key: ``, until: 0 }),
    [musicOff, toggleMusic] = useThemeMusic();
  if (
    ((0, useEffect)(() => {
      (h(), t());
    }, [t, h]),
    (0, useEffect)(() => {
      if (!e || e.phase === `gameOver` || !e.players[yn(e)]?.isAi) return;
      let delay = e.tradeOffer ? 800 : e.phase === `setup` ? 450 : e.phase === `roll` ? 1400 : 700;
      if (e.lastRoll && e.phase !== `roll`) {
        let key = `${e.currentPlayer}:${e.turnNumber}:${e.lastRoll.d1}:${e.lastRoll.d2}`;
        if (rollSeen.current.key !== key) {
          rollSeen.current = { key, until: Date.now() + 1800 };
        }
        delay = Math.max(delay, rollSeen.current.until - Date.now());
      }
      let n = window.setTimeout(() => f(), Math.max(200, delay));
      return () => window.clearTimeout(n);
    }, [
      e?.revision,
      e?.phase,
      e?.currentPlayer,
      e?.discardQueue?.join(`,`),
      e?.tradeOffer?.to,
      f,
      e,
    ]),
    (0, useEffect)(() => {
      if (!m) return;
      let e = window.setTimeout(() => useGame.setState({ error: null }), 2400);
      return () => window.clearTimeout(e);
    }, [m]),
    (0, useEffect)(() => {
      function onKey(ev) {
        let tag = ev.target?.tagName;
        if (tag === `INPUT` || tag === `TEXTAREA` || tag === `SELECT`) return;
        if (ev.key === ` ` || ev.key === `Spacebar`) {
          let t = useGame.getState().state;
          if (!t || t.phase !== `roll`) return;
          let actor = t.players[t.currentPlayer];
          if (!actor || actor.isAi || actor.id !== useGame.getState().viewerId) return;
          ev.preventDefault();
          a({ type: `roll` });
          return;
        }
        if (ev.key !== `Escape`) return;
        (c(null), y(null));
        let t = useGame.getState().state;
        t?.tradeOffer &&
          t.tradeOffer.from === t.currentPlayer &&
          !t.players[t.currentPlayer]?.isAi &&
          a({ type: `cancelTrade` });
      }
      return (
        window.addEventListener(`keydown`, onKey),
        () => window.removeEventListener(`keydown`, onKey)
      );
    }, [c, a]),
    (0, useEffect)(() => {
      let line = e?.log?.[e.log.length - 1];
      if (!line) return;
      setNotice(line);
      let id = line.id;
      let timer = window.setTimeout(
        () => setNotice((cur) => (cur?.id === id ? null : cur)),
        2600,
      );
      return () => window.clearTimeout(timer);
    }, [e?.logSeq]),
    !g)
  )
    return jsx(`div`, { className: `min-h-dvh bg-bg` });
  let leave = () => {
    if (onLeaveMatch) onLeaveMatch();
    else {
      i();
      nav({ search: {} });
    }
  };
  if (!e) {
    if (matchRole === `guest`) return jsx(`div`, { className: `relative min-h-dvh bg-bg` });
    return jsxs(Fragment, {
      children: [
        jsx(yi, {
          onStart: (seats, pro, sea) => {
            (resetMatch(), n({ seats, pro, mode: sea ? SEA_MODE : void 0 }), nav({ search: {} }));
          },
          onContinue: () => {
            (resetMatch(), r(), nav({ search: {} }));
          },
          onRules: () => te(!0),
          onInvite: (seats, pro, sea) => {
            let room = startInvite(seats, pro, sea);
            if (room) nav({ search: { match: room } });
          },
          musicOff,
          onMusic: toggleMusic,
        }),
        m &&
          jsx(`div`, {
            className: `pointer-events-none absolute top-16 left-1/2 z-40 -translate-x-1/2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm shadow-panel`,
            children: m,
          }),
        ee && jsx(si, { onClose: () => te(!1) }),
      ],
    });
  }
  let ne = yn(e),
    x = e.players[ne] ?? e.players[e.currentPlayer];
  if (!x)
    return jsx(yi, {
      onStart: (seats, pro, sea) => {
        (resetMatch(), n({ seats, pro, mode: sea ? SEA_MODE : void 0 }), nav({ search: {} }));
      },
      onContinue: () => {
        (resetMatch(), r(), nav({ search: {} }));
      },
      onRules: () => te(!0),
      onInvite: (seats, pro, sea) => {
        let room = startInvite(seats, pro, sea);
        if (room) nav({ search: { match: room } });
      },
      musicOff,
      onMusic: toggleMusic,
    });
  let S,
    C,
    hudPlayer,
    T;
  if (matchRole === `solo`) {
    S = x.isAi ? (e.players.find((p) => !p.isAi)?.id ?? x.id) : ne;
    C = !x.isAi;
  } else {
    S = viewerId;
    C = ne === viewerId && !x.isAi;
  }
  hudPlayer = e.players[S] ?? x;
  T = e;
  function E(e) {
    if (C) {
      if (T.phase === `setup` && T.setupNeed === `settlement`) {
        a({ type: `placeSettlement`, vertexId: e });
        return;
      }
      (T.phase === `main` && o === `settlement` && a({ type: `placeSettlement`, vertexId: e }),
        T.phase === `main` && o === `city` && a({ type: `placeCity`, vertexId: e }));
    }
  }
  function D(e) {
    if (!C) return;
    if (typeof o === `string` && o.startsWith(`moveShip`)) {
      if (T.phase !== `main`) return;
      if (o === `moveShip`) {
        movableShips(T, T.currentPlayer).includes(e) && c(`moveShip:${e}`);
        return;
      }
      let from = o.slice(9);
      e === from ? c(`moveShip`) : a({ type: `moveShip`, from, to: e });
      return;
    }
    let free = (T.phase === `setup` && T.setupNeed === `road`) || T.phase === `roadBuilding`,
      roadOk = (free || (T.phase === `main` && o === `road`)) && On(T, T.currentPlayer).includes(e),
      shipOk =
        isSea(T) && (free || (T.phase === `main` && o === `ship`)) && shipSpots(T, T.currentPlayer).includes(e);
    shipOk && (!roadOk || o === `ship`)
      ? a({ type: `placeShip`, edgeId: e })
      : roadOk && a({ type: `placeRoad`, edgeId: e });
  }
  function oe(e) {
    if (!C || T.phase !== `robber`) return;
    let t = In(T, e, T.currentPlayer);
    if (t.length > 1) {
      y({ kind: `steal`, hexId: e, victims: t });
      return;
    }
    a({ type: `moveRobber`, hexId: e, stealFrom: t[0] ?? null });
  }
  function se(e) {
    e === `knight`
      ? a({ type: `playKnight` })
      : e === `roads`
        ? a({ type: `playRoads` })
        : e === `plenty`
          ? y({ kind: `plenty` })
          : e === `monopoly` && y({ kind: `monopoly` });
  }
  return jsx(bi, {
    onReset: r,
    children: jsxs(`div`, {
      className: `relative flex h-dvh flex-col overflow-hidden bg-bg text-fg`,
      children: [
        jsx(`div`, { className: `pointer-events-none absolute inset-0 havn-felt` }),
        jsxs(`div`, {
          className: `relative flex min-h-0 flex-1 flex-col`,
          children: [
            jsxs(`header`, {
              className: `flex items-center gap-1 px-3 pt-[max(8px,env(safe-area-inset-top))] lg:gap-2 lg:pt-3`,
              children: [
                jsxs(`div`, {
                  className: `min-w-0 flex-1`,
                  children: [
                    jsx(`p`, {
                      className: `font-display text-base font-semibold leading-none lg:text-lg`,
                      children: `Havn`,
                    }),
                    jsx(`p`, {
                      className: `text-[11px] text-muted lg:text-xs`,
                      children:
                        (e.turnNumber > 0 ? _(`ui.round`, { n: e.turnNumber }) : _(`ui.setup`)) +
                        (e.pro ? ` · Pro` : ``) +
                        (isSea(e) ? ` · ${_(`start.sea`)}` : ``),
                    }),
                  ],
                }),
                jsx(`span`, { id: `havn-ai-slot`, className: `contents` }),
                jsx(MusicButton, {
                  off: musicOff,
                  onClick: toggleMusic,
                  label: _(musicOff ? `ui.musicOn` : `ui.musicOff`),
                }),
                jsx(B, {
                  type: `button`,
                  size: `icon`,
                  variant: `ghost`,
                  onClick: d,
                  "aria-label": _(`ui.sound`),
                  children: l ? jsx(ie, {}) : jsx(re, {}),
                }),
                jsx(B, {
                  type: `button`,
                  size: `icon`,
                  variant: `ghost`,
                  onClick: () => y({ kind: `rules` }),
                  "aria-label": _(`ui.rules`),
                  children: jsx(p, {}),
                }),
                jsx(B, {
                  type: `button`,
                  size: `icon`,
                  variant: `ghost`,
                  onClick: () => y({ kind: `exit` }),
                  "aria-label": _(`ui.quit`),
                  children: jsx(b, {}),
                }),
                matchRole === `host` &&
                  jsx(B, {
                    type: `button`,
                    size: `icon`,
                    variant: `ghost`,
                    onClick: () => setMatch({ inviteOpen: !0 }),
                    "aria-label": _(`mp.invite`),
                    children: jsx(Link2, {}),
                  }),
              ],
            }),
            jsx($r, { state: e, viewer: S }),
            e.undoBank?.player === S &&
              jsxs(`div`, {
                className: `mx-3 mt-1 flex items-center justify-between gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm`,
                children: [
                  jsx(`span`, { children: _(`ui.undoHint`) }),
                  jsx(B, {
                    type: `button`,
                    size: `sm`,
                    variant: `secondary`,
                    onClick: () => a({ type: `undoBank` }),
                    children: _(`ui.undo`),
                  }),
                ],
              }),
            e.tradeOffer &&
              jsx(tradeBanner, {
                state: e,
                viewerId: S,
                onRespond: (accept) => a({ type: `respondTrade`, accept, playerId: S }),
                onCancel: () => a({ type: `cancelTrade` }),
              }),
            jsxs(`div`, {
              className: `flex min-h-0 flex-1 flex-col lg:flex-row`,
              children: [
                jsxs(`div`, {
                  className: `relative min-h-0 min-w-0 flex-1`,
                  children: [
                    jsx(ii, {
                      state: e,
                      buildMode: o,
                      disabled: !C,
                      onVertex: E,
                      onEdge: D,
                      onHex: oe,
                    }),
                    notice &&
                      jsx(`div`, {
                        className: `pointer-events-none absolute top-2 left-1/2 z-10 max-w-[min(24rem,calc(100%-1rem))] -translate-x-1/2 rounded-[var(--radius-md)] border border-border bg-surface/95 px-3 py-1.5 text-center text-sm shadow-panel`,
                        children: notice.text,
                      }),
                    e.lastRoll &&
                      jsxs(`div`, {
                        className: `pointer-events-none absolute top-1 right-2 z-10 flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface/90 px-2 py-1 shadow-panel lg:hidden`,
                        children: [
                          jsx(zr, { d1: e.lastRoll.d1, d2: e.lastRoll.d2, compact: !0 }),
                          jsx(`span`, {
                            className: `font-display text-xl tabular-nums`,
                            children: e.lastRoll.total,
                          }),
                        ],
                      }),
                  ],
                }),
                jsx(Qr, {
                  state: e,
                  player: hudPlayer,
                  human: C,
                  buildMode: o,
                  onBuildMode: c,
                  onRoll: () => a({ type: `roll` }),
                  onEnd: () => a({ type: `endTurn` }),
                  onBuyDev: () => a({ type: `buyDev` }),
                  onPlayDev: se,
                  onTrade: () => y({ kind: `trade` }),
                  onSkipRoad: () => a({ type: `skipFreeRoad` }),
                }),
              ],
            }),
          ],
        }),
        m &&
          jsx(`div`, {
            className: `pointer-events-none absolute top-16 left-1/2 z-40 -translate-x-1/2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-2 text-sm shadow-panel`,
            children: m,
          }),
        e.phase === `gold` &&
          C &&
          jsx(
            goldDialog,
            { state: e, playerId: ne, onConfirm: (r) => a({ type: `pickGold`, resources: r }) },
            `gold-${e.revision}`,
          ),
        e.phase === `discard` &&
          C &&
          jsx(
            ci,
            { state: e, playerId: ne, onConfirm: (e) => a({ type: `discard`, resources: e }) },
            ne,
          ),
        e.tradeOffer &&
          offerPending(e).includes(S) &&
          !e.players[S]?.isAi &&
          jsx(fi, {
            state: e,
            viewerId: S,
            onRespond: (accept) => a({ type: `respondTrade`, accept, playerId: S }),
          }),
        e.phase === `gameOver` && jsx(_i, { state: e, onMenu: leave }),
        v?.kind === `rules` && jsx(si, { onClose: () => y(null), sea: isSea(e) }),
        v?.kind === `exit` &&
          jsx(vi, {
            onCancel: () => y(null),
            onConfirm: () => {
              (y(null), leave());
            },
          }),
        v?.kind === `trade` &&
          C &&
          jsx(li, {
            state: e,
            playerId: ne,
            onBank: (e, t) => {
              (a({ type: `bankTrade`, give: e, get: t }), y(null));
            },
            onOffer: (e, t, n) => {
              (a({ type: `offerTrade`, to: e, give: t, want: n }), y(null));
            },
            onClose: () => y(null),
          }),
        v?.kind === `plenty` &&
          jsx(hi, {
            title: _(`ui.plentyTitle`),
            count: 2,
            onPick: (e, t) => {
              (a({ type: `playPlenty`, a: e, b: t }), y(null));
            },
            onClose: () => y(null),
          }),
        v?.kind === `monopoly` &&
          jsx(hi, {
            title: _(`ui.monopolyTitle`),
            count: 1,
            onPick: (e) => {
              (a({ type: `playMonopoly`, resource: e }), y(null));
            },
            onClose: () => y(null),
          }),
        v?.kind === `steal` &&
          jsx(gi, {
            state: e,
            victims: v.victims,
            onPick: (e) => {
              (a({ type: `moveRobber`, hexId: v.hexId, stealFrom: e }), y(null));
            },
          }),
      ],
    }),
  });
}
export function HavnTable({ onLeaveMatch } = {}) {
  return jsx(xi, { onLeaveMatch });
}
