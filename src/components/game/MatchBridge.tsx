import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HOST_SEAT,
  actingPlayerId,
  asBoard,
  friendSeatIds,
  inviteUrl,
  isNetMsg,
  seatMayPlay,
  type GameAction,
  type NetMsg,
} from "@/game/match";
import { onGuestAction, onPublish, useGame } from "@/game/store-api";
import { useT } from "@/game/i18n";
import { useP2PRoom, type PeerInfo } from "@/lib/multiplayer";

export function MatchBridge({ room, name }: { room: string; name: string }) {
  return <MatchBridgeInner key={room} room={room} name={name} />;
}

function MatchBridgeInner({ room, name }: { room: string; name: string }) {
  const p2p = useP2PRoom({ room, name });
  const i = useT();
  const role = useGame((s) => s.matchRole);
  const inviteOpen = useGame((s) => s.inviteOpen);
  const matchStatus = useGame((s) => s.matchStatus);
  const viewerId = useGame((s) => s.viewerId);
  const setMatch = useGame((s) => s.setMatch);
  const adoptRemote = useGame((s) => s.adoptRemote);
  const dispatch = useGame((s) => s.dispatch);
  const claimSeat = useGame((s) => s.claimSeat);
  const releaseSeat = useGame((s) => s.releaseSeat);
  const fillEmptySeats = useGame((s) => s.fillEmptySeats);
  const board = useGame((s) => asBoard(s.state));
  const seatMap = useRef(new Map<string, number>());
  const [claimedTick, bump] = useState(0);
  const lastSent = useRef(-1);
  const link = useMemo(() => inviteUrl(room), [room]);
  const live = useMemo(
    () => p2p.peers.filter((p) => p.connectionState === "connected"),
    [p2p.peers],
  );
  const claimed = useMemo(() => new Set(seatMap.current.values()), [claimedTick]);

  useEffect(() => {
    setMatch({ matchStatus: "connecting" });
  }, [setMatch]);

  useEffect(() => {
    const liveNow = p2p.peers.filter((p) => p.connectionState === "connected");
    const failed = p2p.peers.some((p) => p.connectionState === "failed") && liveNow.length === 0;
    const cur = useGame.getState();
    if (failed) {
      if (cur.matchStatus !== "failed") setMatch({ matchStatus: "failed" });
      return;
    }
    if (role === "host") {
      const names = liveNow.map((p) => p.name).filter(Boolean);
      const status = liveNow.length > 0 ? "live" : p2p.joined ? "waiting" : "connecting";
      const peerName = names[0] ?? null;
      const openHuman = board ? friendSeatIds(board.players).filter((id) => !claimed.has(id)) : [];
      // Keep the invite up while a human chair is still empty so 3–4 player
      // tables can keep handing the same link around.
      const hideInvite = liveNow.length > 0 && cur.inviteOpen && openHuman.length === 0 && claimed.size > 0;
      if (cur.matchStatus === status && cur.matchPeerName === peerName && !hideInvite) return;
      setMatch({
        matchStatus: status,
        matchPeerName: peerName,
        ...(hideInvite ? { inviteOpen: false } : {}),
      });
    } else if (liveNow.length > 0) {
      const peerName = liveNow[0]?.name ?? "Host";
      if (cur.matchPeerName === peerName && cur.matchStatus === "live") return;
      setMatch({ matchPeerName: peerName });
    }
  }, [p2p.joined, p2p.peers, role, setMatch, board, claimed]);

  useEffect(() => {
    return p2p.onMessage((from, data, channel) => {
      if (channel !== "reliable") return;
      if (!isNetMsg(data)) return;
      handleMsg(from, data);
    });

    function handleMsg(from: string, msg: NetMsg) {
      if (msg.t === "full") {
        setMatch({ matchStatus: "full" });
        return;
      }
      if (msg.t === "seat") {
        setMatch({ viewerId: msg.seat, matchStatus: "live", inviteOpen: false });
        return;
      }
      if (msg.t === "hello") {
        if (role === "host") {
          const seat = seatMap.current.get(from);
          if (seat != null && msg.name) claimSeat(seat, msg.name);
        } else {
          setMatch({ matchPeerName: msg.name });
        }
        return;
      }
      if (msg.t === "action") {
        if (role !== "host") return;
        const seat = seatMap.current.get(from);
        const liveBoard = asBoard(useGame.getState().state);
        if (seat == null || !liveBoard || !seatMayPlay(liveBoard, seat, msg.action)) {
          p2p.send(
            { t: "error", message: "Only the player whose turn it is can play from that seat." },
            from,
          );
          return;
        }
        dispatch(msg.action);
        return;
      }
      if (msg.t === "error") {
        useGame.setState({ error: msg.message });
        return;
      }
      if (msg.t === "sync") {
        const ok = adoptRemote(msg.state);
        if (ok && role === "guest") {
          const seated = useGame.getState().viewerId >= 0;
          setMatch({ matchStatus: seated ? "live" : "connecting", inviteOpen: false });
        }
      }
    }
  }, [p2p, role, setMatch, adoptRemote, dispatch, claimSeat]);

  useEffect(() => {
    return onPublish((state: unknown) => {
      const revision = (state as { revision?: number }).revision ?? 0;
      if (revision === lastSent.current) return;
      lastSent.current = revision;
      const payload: NetMsg = { t: "sync", revision, state };
      if (role === "host") p2p.send(payload);
    });
  }, [p2p, role]);

  useEffect(() => {
    if (role !== "guest") return;
    return onGuestAction((action: unknown) => {
      p2p.send({ t: "action", action: action as GameAction } satisfies NetMsg);
    });
  }, [p2p, role]);

  const greeted = useRef(new Set<string>());
  useEffect(() => {
    if (role !== "host" || !board) return;
    const liveIds = new Set(live.map((p) => p.id));
    let changed = false;
    let pending = false;
    for (const [id, seat] of [...seatMap.current]) {
      if (liveIds.has(id)) continue;
      seatMap.current.delete(id);
      greeted.current.delete(id);
      releaseSeat(seat);
      changed = true;
    }
    const taken = new Set(seatMap.current.values());
    const open = friendSeatIds(board.players).filter((id) => !taken.has(id));
    for (const peer of live) {
      if (!seatMap.current.has(peer.id)) {
        const seat = open.shift();
        if (seat == null) {
          if (!p2p.send({ t: "full" } satisfies NetMsg, peer.id)) pending = true;
          else greeted.current.add(peer.id);
          continue;
        }
        seatMap.current.set(peer.id, seat);
        taken.add(seat);
        claimSeat(seat, peer.name || i("mp.friend"));
        changed = true;
      }
      if (greeted.current.has(peer.id)) continue;
      const seat = seatMap.current.get(peer.id)!;
      const g = useGame.getState().state;
      const revision = g ? ((g as { revision?: number }).revision ?? 0) : 0;
      const helloOk = p2p.send({ t: "hello", name } satisfies NetMsg, peer.id);
      const seatOk = p2p.send({ t: "seat", seat } satisfies NetMsg, peer.id);
      const syncOk = g
        ? p2p.send({ t: "sync", revision, state: g } satisfies NetMsg, peer.id)
        : true;
      if (helloOk && seatOk && syncOk) {
        greeted.current.add(peer.id);
        lastSent.current = revision;
      } else {
        pending = true;
      }
    }
    if (changed) bump((n) => n + 1);
    if (!pending) return;
    const timer = window.setTimeout(() => bump((n) => n + 1), 250);
    return () => window.clearTimeout(timer);
  }, [p2p, live, board, role, name, claimSeat, releaseSeat, i, claimedTick]);

  useEffect(() => {
    if (role !== "guest") return;
    let pending = false;
    for (const peer of live) {
      if (greeted.current.has(peer.id)) continue;
      if (p2p.send({ t: "hello", name } satisfies NetMsg, peer.id)) {
        greeted.current.add(peer.id);
      } else {
        pending = true;
      }
    }
    if (!pending) return;
    const timer = window.setTimeout(() => bump((n) => n + 1), 250);
    return () => window.clearTimeout(timer);
  }, [p2p, live, role, name, claimedTick]);

  const acting = board ? actingPlayerId(board) : HOST_SEAT;
  const waitingSeat =
    role === "host" &&
    board &&
    acting !== HOST_SEAT &&
    board.players[acting] &&
    !board.players[acting]!.isAi &&
    !claimed.has(acting)
      ? acting
      : null;

  if (matchStatus === "full") {
    return (
      <Overlay testId="havn-full">
        <h2 className="font-display text-2xl">{i("mp.full")}</h2>
        <p className="mt-2 text-sm text-muted">{i("mp.fullBody")}</p>
      </Overlay>
    );
  }

  if (role === "guest" && (matchStatus !== "live" || viewerId < 0)) {
    return (
      <Overlay testId="havn-joining">
        <h2 className="font-display text-2xl">{i("mp.joining")}</h2>
        <p className="mt-2 text-sm text-muted">
          {matchStatus === "failed" ? i("mp.failed") : i("mp.waitingHost")}
        </p>
      </Overlay>
    );
  }

  if (role === "host" && inviteOpen) {
    return (
      <InviteCard
        link={link}
        room={room}
        connecting={matchStatus === "connecting"}
        failed={matchStatus === "failed"}
        peers={p2p.peers}
        board={board}
        claimed={claimed}
        onDismiss={() => setMatch({ inviteOpen: false })}
        onFillEmpty={() => {
          const open = board ? friendSeatIds(board.players).filter((id) => !claimed.has(id)) : [];
          if (open.length) fillEmptySeats(open);
          setMatch({ inviteOpen: false });
        }}
      />
    );
  }

  if (matchStatus === "failed") {
    return (
      <Overlay testId="havn-dropped">
        <h2 className="font-display text-2xl">{i("mp.dropped")}</h2>
        <p className="mt-2 text-sm text-muted">{i("mp.droppedBody")}</p>
        <Button className="mt-5" onClick={() => setMatch({ inviteOpen: true })}>
          {i("mp.showInvite")}
        </Button>
      </Overlay>
    );
  }

  if (waitingSeat != null && board) {
    const waiter = board.players[waitingSeat]!;
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-4">
        <div
          data-testid="havn-waiting-seat"
          className="pointer-events-auto w-full max-w-md rounded-[24px] border border-border bg-surface p-5 shadow-panel"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-muted">{i("mp.inviteKicker")}</p>
          <h2 className="mt-1 font-display text-xl">{i("mp.waitingSeat", { name: waiter.name })}</h2>
          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={() => setMatch({ inviteOpen: true })}>{i("mp.showInvite")}</Button>
            <Button variant="secondary" onClick={() => fillEmptySeats([waitingSeat])}>
              {i("mp.computerEmpty")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <div data-testid="havn-match-live" hidden />;
}

function Overlay({ children, testId }: { children: ReactNode; testId?: string }) {
  return (
    <div
      data-testid={testId}
      className="absolute inset-0 z-20 flex items-end justify-center bg-bg/70 p-4 md:items-center"
    >
      <div className="w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-panel">
        {children}
      </div>
    </div>
  );
}

function InviteCard({
  link,
  room,
  connecting,
  failed,
  peers,
  board,
  claimed,
  onDismiss,
  onFillEmpty,
}: {
  link: string;
  room: string;
  connecting: boolean;
  failed: boolean;
  peers: PeerInfo[];
  board: ReturnType<typeof asBoard>;
  claimed: Set<number>;
  onDismiss: () => void;
  onFillEmpty: () => void;
}) {
  const i = useT();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const input = document.getElementById("havn-invite") as HTMLInputElement | null;
      input?.select();
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: i("mp.shareTitle"), text: i("mp.shareText"), url: link });
        return;
      } catch {
        /* fall through */
      }
    }
    await copy();
  };

  const seats = board?.players ?? [];

  return (
    <Overlay testId="havn-invite-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted">{i("mp.inviteKicker")}</p>
          <h2 className="mt-1 font-display text-2xl">{i("mp.inviteTitle")}</h2>
        </div>
        <Link2 className="size-5 text-muted" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {failed ? i("mp.droppedBody") : connecting ? i("mp.connecting") : i("mp.waitingGuest")}
      </p>
      {seats.length > 0 ? (
        <ul className="mt-4 space-y-2" data-testid="havn-invite-roster">
          {seats.map((p) => {
            const filled = p.id === HOST_SEAT || claimed.has(p.id) || p.isAi;
            const status = p.id === HOST_SEAT
              ? i("mp.hostSeat")
              : p.isAi
                ? i("start.computer")
                : filled
                  ? i("mp.connectedAs")
                  : i("mp.openSeat");
            return (
              <li
                key={p.id}
                data-seat={p.id}
                data-status={p.id === HOST_SEAT ? "host" : p.isAi ? "ai" : filled ? "seated" : "open"}
                className="flex items-center justify-between rounded-[12px] bg-surface-2 px-3 py-2 text-sm"
              >
                <span className="text-fg">{p.name}</span>
                <span className="text-xs text-muted">{status}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
      <label className="mt-4 block">
        <span className="text-xs uppercase tracking-wide text-muted">{i("mp.linkLabel")}</span>
        <input
          id="havn-invite"
          data-testid="havn-invite"
          readOnly
          value={link}
          className="mt-2 h-11 w-full rounded-[12px] border border-border bg-bg px-3 text-sm text-fg"
          onFocus={(e) => e.currentTarget.select()}
        />
      </label>
      <p className="mt-2 text-xs text-subtle">{i("mp.code", { code: room.toUpperCase() })}</p>
      <div className="mt-5 flex flex-col gap-2">
        <Button onClick={() => void share()}>
          <Copy className="size-4" />
          {copied ? i("mp.copied") : i("mp.copyInvite")}
        </Button>
        <Button variant="secondary" onClick={onDismiss}>
          {i("mp.keepPlaying")}
        </Button>
        <Button variant="secondary" onClick={onFillEmpty}>
          {i("mp.computerEmpty")}
        </Button>
      </div>
      {peers.some((p) => p.connectionState === "connecting") ? (
        <p className="mt-3 text-xs text-muted">{i("mp.peerConnecting")}</p>
      ) : null}
    </Overlay>
  );
}
