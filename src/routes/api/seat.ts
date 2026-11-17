import { createFileRoute } from "@tanstack/react-router";
import { handleOptions, registerSeat } from "@/game/bot-api.server";

export const Route = createFileRoute("/api/seat")({
  server: {
    handlers: {
      POST: ({ request }) => registerSeat(request),
      OPTIONS: () => handleOptions(),
    },
  },
});
