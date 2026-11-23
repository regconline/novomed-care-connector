import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const paths = [
  "/",
  "/about",
  "/doctors",
  "/doctors/dr-z-a-essop",
  "/doctors/dr-m-y-samsodien",
  "/services",
  "/services/general-consultations",
  "/practices",
  "/practices/elsies-river",
  "/practices/hout-bay",
  "/patient-information",
  "/health-library",
  "/health-library/when-to-see-a-gp",
  "/contact",
  "/appointment",
  "/appointment/received",
  "/staff",
  "/privacy-policy",
  "/popia-notice",
  "/terms-and-conditions",
  "/medical-disclaimer",
  "/cookie-policy",
];

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  it.each(paths)("matches a page for %s instead of falling back to not found", (path) => {
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
