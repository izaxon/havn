import { createFileRoute } from "@tanstack/react-router";
import { handleOptions, readEvents } from "@/game/bot-api.server";

export const Route = createFileRoute("/api/events")({
  server: {
    handlers: {
      GET: ({ request }) => readEvents(request),
      OPTIONS: () => handleOptions(),
    },
  },
});
