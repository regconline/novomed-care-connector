import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, SiteShell } from "@/components/site/SiteShell";
import { mapsHref, practices, telHref } from "@/lib/site";
import { clinicLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/practices/")({
  head: () =>
    pageHead({
      title: "Our Practices | Elsies River & Hout Bay | NOVOMED General Practitioners",
      description:
        "Find NOVOMED General Practitioners at the Feymon Centre, 286 Halt Road, Elsies River, and at 9 Victoria Avenue, Hout Bay. Addresses, phone numbers, email and directions.",
      path: "/practices",
      jsonLd: practices.map(clinicLd),
      breadcrumbs: [{ name: "Our Practices", path: "/practices" }],
    }),
  component: PracticesPage,
});

function PracticesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our practices"
        title="Two practices across Cape Town."
        crumbs={[{ label: "Our Practices" }]}
      >
        Visit NOVOMED in Elsies River or Hout Bay. Contact the practice directly to confirm opening
        hours and appointment availability.
      </PageHero>
      <section className="container-page section-pad grid gap-8 lg:grid-cols-2">
        {practices.map((p, i) => (
          <article
            key={p.slug}
            className="relative flex flex-col overflow-hidden rounded-[1.5rem] border hairline bg-white"
          >
            <div className="relative bg-brand px-8 pb-10 pt-8 text-white md:px-10">
              <span
                aria-hidden="true"
                className="absolute right-6 top-2 font-display text-[7rem] font-extrabold leading-none text-white/[0.06]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6fd3bd]">
                NOVOMED · Cape Town
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold text-white">{p.area}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">{p.intro}</p>
            </div>
            <div className="grid flex-1 gap-6 p-8 md:p-10">
              <address className="flex gap-3 not-italic leading-7 text-charcoal">
                <MapPin className="mt-1.5 size-4 shrink-0 text-primary" />
                <span>
                  {p.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </address>
              <div className="grid gap-2.5">
                {p.phones.map((ph) => (
                  <a
                    key={ph}
                    href={telHref(ph)}
                    className="inline-flex items-center gap-3 font-medium text-brand hover:text-primary"
                  >
                    <Phone className="size-4 text-primary" />
                    {ph}
                  </a>
                ))}
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-3 break-all font-medium text-brand hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  {p.email}
                </a>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-4">
                <Button asChild>
                  <Link to="/practices/$slug" params={{ slug: p.slug }}>
                    View practice <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={mapsHref(p.mapQuery)} target="_blank" rel="noreferrer">
                    Directions <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <CtaBand />
    </SiteShell>
  );
}
