import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect so older or shared links keep working.
export const Route = createFileRoute("/terms")({
  beforeLoad: () => {
    throw redirect({ to: "/terms-and-conditions", statusCode: 301 });
  },
});
