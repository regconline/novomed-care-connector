import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect so older or shared links keep working.
export const Route = createFileRoute("/locations/")({
  beforeLoad: () => {
    throw redirect({ to: "/practices", statusCode: 301 });
  },
});
