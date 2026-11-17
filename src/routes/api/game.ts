import { createFileRoute } from "@tanstack/react-router";
import { handleOptions, readGame } from "@/game/bot-api.server";

export const Route = createFileRoute("/api/game")({
  server: {
    handlers: {
      GET: ({ request }) => readGame(request),
      OPTIONS: () => handleOptions(),
    },
  },
});
