import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect so older or shared links keep working.
export const Route = createFileRoute("/book-appointment")({
  beforeLoad: () => {
    throw redirect({ to: "/appointment", statusCode: 301 });
  },
});
