import { createFileRoute } from "@tanstack/react-router";
import { apiDocs } from "@/game/bot-api.server";

export const Route = createFileRoute("/api/docs")({
  server: {
    handlers: {
      GET: () => apiDocs(),
    },
  },
});
