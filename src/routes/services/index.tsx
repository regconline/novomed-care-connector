import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero, ReviewNote, SiteShell } from "@/components/site/SiteShell";
import { services } from "@/lib/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Medical Services | General Practitioner Services | NOVOMED Cape Town",
      description:
        "General medical services at NOVOMED in Elsies River and Hout Bay: general and acute consultations, chronic disease management, HIV-related care, preventive, men's, women's and children's health.",
      path: "/services",
      breadcrumbs: [{ name: "Medical Services", path: "/services" }],
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const first = services[0]!;
  const rest = services.slice(1);
  return (
    <SiteShell>
      <PageHero
        eyebrow="Medical services"
        title="General medical care for individuals and families."
        crumbs={[{ label: "Medical Services" }]}
        aside={
          <ReviewNote>
            Services are confirmed by the practice at the time of booking. Descriptions are general
            and awaiting practitioner review.
          </ReviewNote>
        }
      >
        Our general practitioners consult on a broad range of health concerns. Not sure which
        service you need? Request a general consultation and the doctor will guide you.
      </PageHero>

      <section className="container-page section-pad">
        <Link
          to="/services/$slug"
          params={{ slug: first.slug }}
          className="group grid gap-6 rounded-[1.5rem] bg-brand p-9 text-white transition-shadow hover:shadow-lift md:grid-cols-[1fr_auto] md:items-end md:p-12"
        >
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6fd3bd]">
              Most patients start here
            </p>
            <h2 className="display-md mt-4 text-white">{first.name}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">{first.intro}</p>
          </div>
          <span className="inline-flex items-center gap-2 font-display text-sm font-semibold">
            Read more{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border hairline bg-brand/10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex min-h-56 flex-col bg-white p-8 transition-colors hover:bg-surface"
            >
              <span className="font-display text-xs font-bold tabular-nums text-teal">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h2 className="mt-5 font-display text-xl font-bold group-hover:text-primary">
                {s.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{s.summary}</p>
              <ArrowUpRight className="mt-6 size-5 text-brand/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted-foreground">
          Service availability, practitioner availability and any required referrals are confirmed
          by the practice. For a medical emergency, call 10177 or 112, or go to your nearest
          emergency unit.
        </p>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
