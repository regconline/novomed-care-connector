import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { StaffPortal } from "@/components/site/StaffPortal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/staff")({
  head: () =>
    pageHead({
      title: "Staff Portal | NOVOMED",
      description: "Restricted area for authorised NOVOMED staff.",
      path: "/staff",
      noindex: true,
    }),
  component: StaffPage,
});

function StaffPage() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b hairline bg-white">
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" aria-label="NOVOMED home">
            <Logo className="h-11 w-auto" />
          </Link>
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Staff portal
          </span>
        </div>
      </header>
      <main id="main" className="container-page py-10 md:py-14">
        <StaffPortal />
      </main>
    </div>
  );
}
