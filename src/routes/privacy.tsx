import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect so older or shared links keep working.
export const Route = createFileRoute("/privacy")({
  beforeLoad: () => {
    throw redirect({ to: "/privacy-policy", statusCode: 301 });
  },
});
