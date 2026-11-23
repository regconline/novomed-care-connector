import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, CtaBand, SiteShell } from "@/components/site/SiteShell";
import {
  doctors,
  emergencyNote,
  getPractice,
  mapEmbed,
  mapsHref,
  openingHours,
  practices,
  telHref,
} from "@/lib/site";
import { clinicLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/practices/$slug")({
  loader: ({ params }) => {
    const practice = getPractice(params.slug);
    if (!practice) throw notFound();
    return { practice };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.practice;
    if (!p) return {};
    return pageHead({
      title: `General Practitioner ${p.area}, Cape Town | NOVOMED ${p.area} Practice`,
      description: `NOVOMED General Practitioners in ${p.area}: ${p.address.join(", ")}. Call ${p.phones[0]} or request an appointment with a GP at our ${p.area} medical practice.`,
      path: `/practices/${p.slug}`,
      jsonLd: [clinicLd(p)],
      breadcrumbs: [
        { name: "Our Practices", path: "/practices" },
        { name: p.name, path: `/practices/${p.slug}` },
      ],
    });
  },
  component: PracticePage,
});

function PracticePage() {
  const { practice: p } = Route.useLoaderData();
  const hours = openingHours[p.slug];
  const other = practices.find((x) => x.slug !== p.slug)!;
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 size-[34rem] rounded-full border border-white/[0.07]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 size-[22rem] rounded-full border border-white/[0.07]"
        />
        <div className="container-page relative pb-16 pt-10 md:pb-24">
          <div className="[&_a]:text-white/60 [&_a:hover]:text-white [&_span]:text-white/85 [&_svg]:text-white/30">
            <Breadcrumbs
              items={[{ label: "Our Practices", to: "/practices" }, { label: p.name }]}
            />
          </div>
          <p className="rise mt-10 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#6fd3bd]">
            NOVOMED General Practitioners
          </p>
          <h1 className="display-xl rise delay-1 mt-5 text-white">
            {p.area}
            <span className="text-teal">.</span>
          </h1>
          <p className="rise delay-2 mt-6 max-w-2xl text-lg leading-8 text-white/75">{p.intro}</p>
          <div className="rise delay-3 mt-9 flex flex-wrap gap-3">
            <Button asChild variant="inverse" size="lg">
              <Link to="/appointment" search={{ practice: p.slug }}>
                Request an appointment <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/25 bg-transparent shadow-none hover:bg-white/10"
            >
              <a href={telHref(p.phones[0])}>
                <Phone /> Call {p.phones[0]}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page -mt-px grid gap-6 pt-12 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="grid gap-5 self-start">
          <div className="rounded-[1.25rem] border hairline p-8">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <MapPin className="size-5 text-teal" />
              Address
            </h2>
            <address className="mt-4 not-italic leading-7 text-charcoal">
              {p.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="rounded-[1.25rem] border hairline p-8">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <Phone className="size-5 text-teal" />
              Contact details
            </h2>
            <div className="mt-4 grid gap-3">
              {p.phones.map((ph) => (
                <a
                  key={ph}
                  href={telHref(ph)}
                  className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 font-medium tabular-nums text-brand hover:bg-mint"
                >
                  {ph}
                  <Phone className="size-4 text-primary" />
                </a>
              ))}
              <a
                href={`mailto:${p.email}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-surface px-4 py-3 font-medium text-brand hover:bg-mint"
              >
                <span className="break-all">{p.email}</span>
                <Mail className="size-4 shrink-0 text-primary" />
              </a>
            </div>
          </div>
          <div className="rounded-[1.25rem] bg-mint/50 p-8">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <Clock3 className="size-5 text-teal" />
              Opening hours
            </h2>
            {hours ? (
              <dl className="mt-4 grid gap-2 text-sm">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between">
                    <dt>{h.days}</dt>
                    <dd className="font-medium">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-sm leading-6 text-charcoal">
                Opening hours are being confirmed. Please call the practice on{" "}
                <a href={telHref(p.phones[0])} className="font-semibold text-primary">
                  {p.phones[0]}
                </a>{" "}
                before your visit.
              </p>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.25rem] border hairline">
          <iframe
            title={`Map showing the location of NOVOMED ${p.name}`}
            src={mapEmbed(p.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full border-0 lg:h-full lg:min-h-[34rem]"
          />
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Directions</p>
          <h2 className="display-md mt-4">Getting to the practice.</h2>
          <p className="mt-5 leading-8 text-muted-foreground">{p.directions}</p>
          <Button asChild variant="outline" className="mt-7">
            <a href={mapsHref(p.mapQuery)} target="_blank" rel="noreferrer">
              <Navigation /> Open in Google Maps <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div>
          <p className="eyebrow">Patient information</p>
          <h2 className="display-md mt-4">Before you visit.</h2>
          <ul className="mt-5 grid gap-3 text-[0.95rem] leading-7 text-muted-foreground">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
              Call ahead to confirm your appointment time and the doctor's availability.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
              Bring your ID, medical aid card (if applicable) and a list of your current medicines.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
              Ask the practice about medical aid and payment when you confirm your appointment.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
              {emergencyNote}
            </li>
          </ul>
          <Link
            to="/patient-information"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            All patient information <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.25rem] bg-clinical/70 p-8">
            <p className="eyebrow">Our doctors</p>
            <ul className="mt-4 grid gap-2">
              {doctors.map((d) => (
                <li key={d.slug}>
                  <Link
                    to="/doctors/$slug"
                    params={{ slug: d.slug }}
                    className="font-display font-bold text-brand hover:text-primary"
                  >
                    {d.name}
                  </Link>{" "}
                  <span className="text-sm text-muted-foreground">· {d.qualifications}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Call the practice to confirm which doctor is consulting on your preferred day.
            </p>
          </div>
          <Link
            to="/practices/$slug"
            params={{ slug: other.slug }}
            className="group flex items-center justify-between rounded-[1.25rem] border hairline p-8 transition-all hover:border-primary/40 hover:shadow-soft"
          >
            <span>
              <span className="eyebrow">Also NOVOMED</span>
              <span className="mt-2 block font-display text-2xl font-bold text-brand group-hover:text-primary">
                {other.name}
              </span>
              <span className="text-sm text-muted-foreground">{other.address.join(", ")}</span>
            </span>
            <ArrowRight className="size-5 text-brand/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
