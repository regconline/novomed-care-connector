import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { Logo } from "@/components/site/Logo";
import { emergencyNote, practices, telHref } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/appointment/")({
  validateSearch: z.object({
    practice: z.enum(["elsies-river", "hout-bay"]).optional().catch(undefined),
  }),
  head: () =>
    pageHead({
      title: "Request an Appointment | NOVOMED General Practitioners",
      description:
        "Request a GP appointment at NOVOMED in Elsies River or Hout Bay. Choose your practice, preferred date and time — the practice will contact you to confirm.",
      path: "/appointment",
      breadcrumbs: [{ name: "Request an Appointment", path: "/appointment" }],
    }),
  component: AppointmentPage,
});

// Distraction-free layout: no full site navigation, just the logo and a way back.
function AppointmentPage() {
  const { practice } = Route.useSearch();
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7f8_0%,#ffffff_40%)]">
      <header className="border-b hairline bg-white">
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" aria-label="NOVOMED General Practitioners — home">
            <Logo className="h-14 w-auto" />
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-brand">
            Exit to website
          </Link>
        </div>
      </header>
      <main
        id="main"
        className="container-page grid gap-10 py-10 md:py-16 lg:grid-cols-[1fr_20rem]"
      >
        <div>
          <p className="eyebrow">Appointment request</p>
          <h1 className="display-lg mt-4">Request an appointment.</h1>
          <p className="lede mt-4 max-w-2xl">
            Tell us where and when you'd prefer to be seen. It takes about two minutes, and the
            practice will contact you to confirm.
          </p>
          <div className="mt-10">
            <AppointmentForm initialPractice={practice} />
          </div>
        </div>
        <aside className="grid content-start gap-4 lg:pt-36">
          <div className="rounded-2xl border hairline bg-white p-6">
            <p className="flex items-center gap-2 font-display text-sm font-bold text-brand">
              <Phone className="size-4 text-teal" />
              Prefer to call?
            </p>
            <ul className="mt-4 grid gap-3 text-sm">
              {practices.map((p) => (
                <li key={p.slug}>
                  <span className="block font-semibold text-charcoal">{p.area}</span>
                  <a href={telHref(p.phones[0])} className="text-primary hover:underline">
                    {p.phones[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-mint/50 p-6 text-sm leading-6 text-charcoal">
            <p className="flex items-center gap-2 font-display font-bold text-brand">
              <ShieldCheck className="size-4 text-teal" />
              Your privacy
            </p>
            <p className="mt-2">
              We only ask for contact details — no medical information. Your request is visible only
              to authorised practice staff.
            </p>
          </div>
          <p className="rounded-2xl border-l-4 border-destructive bg-white p-5 text-xs leading-5 text-charcoal">
            <strong>Emergency?</strong>{" "}
            {emergencyNote.replace("In a medical emergency, do not use this website. ", "")}
          </p>
        </aside>
      </main>
    </div>
  );
}
