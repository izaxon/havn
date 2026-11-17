import { createFileRoute } from "@tanstack/react-router";
import { handleOptions, playAction } from "@/game/bot-api.server";

export const Route = createFileRoute("/api/action")({
  server: {
    handlers: {
      POST: ({ request }) => playAction(request),
      OPTIONS: () => handleOptions(),
    },
  },
});
