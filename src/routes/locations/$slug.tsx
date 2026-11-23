import { createFileRoute, redirect } from "@tanstack/react-router";

// /locations/:slug is an alias for /practices/:slug.
export const Route = createFileRoute("/locations/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/practices/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
