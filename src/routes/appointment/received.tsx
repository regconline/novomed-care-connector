import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { referencePattern } from "@/lib/appointment";
import { getPractice, telHref } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/appointment/received")({
  validateSearch: z.object({
    ref: z.string().regex(referencePattern).optional().catch(undefined),
    practice: z.enum(["elsies-river", "hout-bay"]).optional().catch(undefined),
  }),
  head: () =>
    pageHead({
      title: "Appointment Request Received | NOVOMED",
      description: "Your appointment request has been received by NOVOMED General Practitioners.",
      path: "/appointment/received",
      noindex: true,
    }),
  component: ReceivedPage,
});

function ReceivedPage() {
  const { ref, practice: slug } = Route.useSearch();
  const practice = slug ? getPractice(slug) : undefined;
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d9f0e9_0%,#ffffff_55%)]">
      <header className="container-page flex h-20 items-center">
        <Link to="/" aria-label="NOVOMED General Practitioners — home">
          <Logo className="h-12 w-auto" />
        </Link>
      </header>
      <main id="main" className="container-narrow py-12 md:py-20">
        <div
          className="rounded-[1.75rem] bg-white p-8 text-center shadow-lift sm:p-14"
          role="status"
          aria-live="polite"
        >
          <span className="rise mx-auto grid size-16 place-items-center rounded-full bg-mint text-primary">
            <CheckCircle2 className="size-8" />
          </span>
          <h1 className="display-md rise delay-1 mt-7">
            Your Appointment Request Has Been Received.
          </h1>
          <p className="lede rise delay-2 mx-auto mt-5 max-w-xl">
            Thank you for contacting NOVOMED General Practitioners. Our team will review your
            request and contact you to confirm appointment availability.
          </p>
          {ref && (
            <div className="rise delay-3 mx-auto mt-9 max-w-sm rounded-2xl border-2 border-dashed border-primary/30 bg-surface px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Your booking reference
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-wider text-brand tabular-nums">
                {ref}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Please quote this reference if you contact the practice.
              </p>
            </div>
          )}
          <p className="rise delay-4 mx-auto mt-9 max-w-xl rounded-xl bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
            <strong>Please note:</strong> your appointment is not confirmed until the practice
            contacts you.
          </p>
          {practice && (
            <p className="mt-6 text-sm text-muted-foreground">
              Need to reach the {practice.name} sooner? Call{" "}
              <a
                href={telHref(practice.phones[0])}
                className="inline-flex items-center gap-1 font-semibold text-primary"
              >
                <Phone className="size-3.5" />
                {practice.phones[0]}
              </a>
            </p>
          )}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/">Return to the homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/patient-information">Preparing for your visit</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
