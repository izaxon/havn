import { createFileRoute } from "@tanstack/react-router";
import { GameApp } from "@/components/game/GameApp";
import { isRoomCode } from "@/game/match";

type Search = {
  join?: string;
  match?: string;
  name?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    join: typeof raw.join === "string" && isRoomCode(raw.join) ? raw.join : undefined,
    match: typeof raw.match === "string" && isRoomCode(raw.match) ? raw.match : undefined,
    name:
      typeof raw.name === "string" && raw.name.trim()
        ? raw.name.trim().slice(0, 24)
        : undefined,
  }),
  component: Home,
});

function Home() {
  const { join, match, name } = Route.useSearch();
  return <GameApp join={join} match={match} name={name} />;
}
