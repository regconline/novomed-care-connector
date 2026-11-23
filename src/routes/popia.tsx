import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect so older or shared links keep working.
export const Route = createFileRoute("/popia")({
  beforeLoad: () => {
    throw redirect({ to: "/popia-notice", statusCode: 301 });
  },
});
