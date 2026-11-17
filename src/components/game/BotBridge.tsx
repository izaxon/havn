import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bot, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asLive } from "@/game/agent";
import { useT } from "@/game/i18n";
import { makeRoomCode } from "@/game/match";
import { hostKeyFor, pullRelay, pushSnapshot } from "@/game/relay";
import { useGame } from "@/game/store-api";

function tokenFor(room: string, seat: number): string {
  const key = `havn-seat-token:${room}:${seat}`;
  try {
    const existing = localStorage.getItem(key);
    if (existing && /^s[a-f0-9]{32}$/.test(existing)) return existing;
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const token = `s${[...bytes].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
    localStorage.setItem(key, token);
    return token;
  } catch {
    return `s${"ab".repeat(16)}`;
  }
}

export function BotBridge() {
  const i = useT();
  const state = useGame((s) => s.state);
  const matchRoom = useGame((s) => s.matchRoom);
  const matchRole = useGame((s) => s.matchRole);
  const viewerId = useGame((s) => s.viewerId);
  const setMatch = useGame((s) => s.setMatch);
  const adoptRemote = useGame((s) => s.adoptRemote);
  const live = asLive(state);
  const seed = live ? (live as { seed?: number }).seed : undefined;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "taken">("idle");
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (matchRole !== "solo" || !seed || matchRoom) return;
    const key = `havn-bot-room:${seed}`;
    let room = "";
    try {
      room = localStorage.getItem(key) ?? "";
    } catch {
      room = "";
    }
    if (!/^[a-z0-9]{4,16}$/.test(room)) {
      room = makeRoomCode();
      try {
        localStorage.setItem(key, room);
      } catch {
        /* the room still works for this tab */
      }
    }
    setMatch({ matchRoom: room });
  }, [matchRole, seed, matchRoom, setMatch]);

  const room = matchRoom;
  const owned =
    live == null
      ? []
      : (matchRole === "guest" ? live.players.filter((player) => player.id === viewerId) : live.players.filter((player) => !player.isAi));
  const seats =
    room == null
      ? []
      : owned
          .filter((player) => player.id >= 0)
          .map((player) => ({
            id: player.id,
            name: player.name,
            token: tokenFor(room, player.id),
            pending:
              live?.tradeOffer?.to === player.id ||
              (Array.isArray(live?.tradeOffer?.pending) && live.tradeOffer.pending.includes(player.id)),
          }));

  useEffect(() => {
    if (!room || seats.length === 0) return;
    let stopped = false;
    const run = async () => {
      let taken = false;
      let ok = false;
      for (const item of seats) {
        const res = await fetch("/api/seat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ room, seat: item.id, token: item.token }),
        });
        if (res.ok) ok = true;
        if (res.status === 409) taken = true;
      }
      if (stopped) return;
      setStatus(taken && !ok ? "taken" : ok ? "ok" : "idle");
    };
    void run();
    return () => {
      stopped = true;
    };
  }, [room, seats.map((item) => `${item.id}:${item.token}`).join("|")]);

  useEffect(() => {
    if (matchRole !== "solo" || !room) return;
    let stopped = false;
    const hostKey = hostKeyFor(room);
    const tick = async () => {
      const local = useGame.getState().state as { revision?: number } | null;
      const pulled = await pullRelay(room, "p-table", 0, "Du");
      if (stopped) return;
      if (pulled.snapshot && (pulled.snapshot.revision ?? 0) > (local?.revision ?? -1)) {
        adoptRemote(pulled.snapshot.state);
        return;
      }
      const current = useGame.getState().state as { revision?: number } | null;
      if (!current) return;
      await pushSnapshot(room, "p-table", hostKey, {
        revision: current.revision ?? 0,
        state: current,
        seats: {},
        full: [],
      });
    };
    void tick();
    const timer = window.setInterval(() => void tick(), 800);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [matchRole, room, adoptRemote]);

  useEffect(() => {
    const el = document.getElementById("havn-ai-slot");
    setSlot((current) => (current === el ? current : el));
  });

  if (!live || live.phase === "menu" || !slot) return null;

  return createPortal(
    <div className="relative">
      {open ? (
        <div className="absolute right-0 top-full z-40 mt-2 w-[min(22rem,calc(100vw-1.5rem))] rounded-[24px] border border-border bg-surface p-4 shadow-panel">
          <p className="font-display text-lg">{i("ai.title")}</p>
          <p className="mt-1 text-sm text-muted">{i("ai.body")}</p>
          {room ? <p className="mt-2 text-xs text-muted">{i("ai.room", { code: room })}</p> : null}
          <p className="mt-1 text-xs text-muted">{i("ai.resume")}</p>
          {seats.length === 0 ? (
            <p className="mt-3 text-sm">{i("ai.waiting")}</p>
          ) : status === "taken" && seats.length === 1 ? (
            <p className="mt-3 text-sm">{i("ai.taken")}</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {seats.map((item) => (
                <li key={item.id}>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {item.name}
                    {item.pending ? ` · ${i("ai.pending")}` : ""}
                  </p>
                  <p className="mt-1 break-all font-mono text-xs" data-testid="ai-token">
                    {item.token}
                  </p>
                  <Button
                    className="mt-2 w-full"
                    onClick={() => {
                      const text = `${i("ai.resume")}\n${i("ai.room", { code: room ?? "" })}\n${item.name}\n${item.token}`;
                      void navigator.clipboard?.writeText(text).then(() => {
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1500);
                      });
                    }}
                  >
                    <Copy className="size-4" />
                    {copied ? i("ai.copied") : i("ai.copy")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <a className="mt-3 inline-block text-sm underline" href="/api/docs">
            {i("ai.docs")}
          </a>
        </div>
      ) : null}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        data-testid="ai-mode"
        aria-label={i("ai.title")}
        onClick={() => setOpen((value) => !value)}
      >
        <Bot className="size-4" />
      </Button>
    </div>,
    slot,
  );
}
