import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MatchBridge } from "@/components/game/MatchBridge";
import { HavnTable, useGame } from "@/game/store-api";
import { t } from "@/game/i18n";
import { HOST_SEAT, isRoomCode } from "@/game/match";
import { mountHavnSiteTools } from "@/game/webmcp";

export function GameApp({
  join,
  match,
  name,
}: {
  join?: string;
  match?: string;
  name?: string;
}) {
  const navigate = useNavigate({ from: "/" });
  const matchRoom = useGame((s) => s.matchRoom);
  const matchRole = useGame((s) => s.matchRole);
  const setMatch = useGame((s) => s.setMatch);
  const continueSave = useGame((s) => s.continueSave);
  const state = useGame((s) => s.state);
  const toMenu = useGame((s) => s.toMenu);
  const [webmcp, setWebmcp] = useState<"unknown" | "ready" | "unavailable">("unknown");

  useEffect(() => {
    let alive = true;
    void mountHavnSiteTools().then((status) => {
      if (alive) setWebmcp(status);
    });
    return () => {
      alive = false;
    };
  }, []);

  useLayoutEffect(() => {
    const cur = useGame.getState();
    if (isRoomCode(join)) {
      if (cur.matchRole === "guest" && cur.matchRoom === join) return;
      setMatch({
        matchRole: "guest",
        matchRoom: join,
        matchStatus: "connecting",
        inviteOpen: false,
        viewerId: -1,
      });
      return;
    }
    if (isRoomCode(match)) {
      if (cur.matchRole === "host" && cur.matchRoom === match && cur.state) {
        if (!cur.inviteOpen && cur.matchStatus !== "live") setMatch({ inviteOpen: true });
        return;
      }
      setMatch({
        matchRole: "host",
        matchRoom: match,
        matchStatus: "waiting",
        viewerId: HOST_SEAT,
      });
      if (!useGame.getState().state) continueSave();
      const running = useGame.getState().state;
      setMatch({ inviteOpen: !!running });
    }
  }, [join, match, setMatch, continueSave]);

  const leaveToTitle = () => {
    toMenu();
    void navigate({ search: {} });
  };

  const players = (state as { players?: { name?: string }[] } | null)?.players;
  const hostName = players?.[0]?.name || t("start.you");
  const guestName = name || t("mp.friend");

  if (isRoomCode(join) && matchRole !== "guest") {
    return (
      <div className="relative min-h-dvh bg-bg">
        <div
          data-testid="havn-joining"
          className="absolute inset-0 z-20 flex items-end justify-center bg-bg/70 p-4 md:items-center"
        >
          <div data-testid="havn-webmcp" data-status={webmcp} hidden />
          <div className="w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-panel">
            <h2 className="font-display text-2xl">{t("mp.joining")}</h2>
            <p className="mt-2 text-sm text-muted">{t("mp.waitingHost")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-bg">
      <div data-testid="havn-webmcp" data-status={webmcp} hidden />
      <HavnTable onLeaveMatch={leaveToTitle} />
      {matchRoom && matchRole !== "solo" ? (
        <MatchBridge room={matchRoom} name={matchRole === "host" ? hostName : guestName} />
      ) : null}
    </div>
  );
}
