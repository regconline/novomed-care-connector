import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, GraduationCap, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, CtaBand, SiteShell } from "@/components/site/SiteShell";
import { DoctorPortrait } from "@/components/site/DoctorPortrait";
import { doctors, getDoctor, practices, telHref } from "@/lib/site";
import { pageHead, physicianLd } from "@/lib/seo";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const doctor = getDoctor(params.slug);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.doctor;
    if (!d) return {};
    return pageHead({
      title: `${d.name} | General Practitioner | NOVOMED Cape Town`,
      description: `${d.name} (${d.qualifications}, HPCSA ${d.registration}) is a general practitioner at NOVOMED General Practitioners in Cape Town. Request an appointment online.`,
      path: `/doctors/${d.slug}`,
      type: "profile",
      jsonLd: [physicianLd(d)],
      breadcrumbs: [
        { name: "Our Doctors", path: "/doctors" },
        { name: d.name, path: `/doctors/${d.slug}` },
      ],
    });
  },
  component: DoctorPage,
});

function DoctorPage() {
  const { doctor: d } = Route.useLoaderData();
  const other = doctors.find((x) => x.slug !== d.slug)!;
  return (
    <SiteShell>
      <section className="relative bg-clinical/60">
        <div className="container-page grid gap-12 pb-16 pt-10 md:grid-cols-[0.4fr_0.6fr] md:items-end md:pb-20 lg:gap-20">
          <div className="order-2 md:order-1">
            <DoctorPortrait doctor={d} />
          </div>
          <div className="order-1 md:order-2 md:pb-6">
            <Breadcrumbs items={[{ label: "Our Doctors", to: "/doctors" }, { label: d.name }]} />
            <p className="eyebrow rise mt-10">{d.role}</p>
            <h1 className="display-xl rise delay-1 mt-5">{d.name}</h1>
            <p className="rise delay-2 mt-5 font-display text-xl font-semibold text-charcoal">
              {d.qualifications}
            </p>
            <p className="rise delay-2 mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="size-4 text-teal" />
              HPCSA registration {d.registration}
            </p>
            <div className="rise delay-3 mt-8">
              <Button asChild size="lg">
                <Link to="/appointment">
                  Request an appointment <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section-pad grid gap-14 lg:grid-cols-[0.62fr_0.38fr]">
        <div>
          <h2 className="display-md">Professional biography</h2>
          <div className="mt-6 grid gap-5 text-[1.05rem] leading-8 text-muted-foreground">
            {d.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="grid gap-5 self-start">
          <div className="rounded-[1.25rem] border hairline p-7">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <GraduationCap className="size-5 text-teal" />
              Qualifications
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
              {d.qualificationList.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border hairline p-7">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <BadgeCheck className="size-5 text-teal" />
              Registration
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Registered with the Health Professions Council of South Africa as a medical
              practitioner. Registration number{" "}
              <strong className="text-charcoal">{d.registration}</strong>.
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-mint/50 p-7">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <MapPin className="size-5 text-teal" />
              Practice locations
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {d.shortName} consults at NOVOMED General Practitioners. Please call your preferred
              practice to confirm which days {d.shortName} is available there.
            </p>
            <ul className="mt-4 grid gap-3">
              {practices.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-sm"
                >
                  <Link
                    to="/practices/$slug"
                    params={{ slug: p.slug }}
                    className="font-semibold text-brand hover:text-primary"
                  >
                    {p.area}
                  </Link>
                  <a
                    href={telHref(p.phones[0])}
                    className="inline-flex items-center gap-1.5 text-primary"
                  >
                    <Phone className="size-3.5" />
                    {p.phones[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="container-page pb-16">
        <Link
          to="/doctors/$slug"
          params={{ slug: other.slug }}
          className="group flex items-center justify-between rounded-[1.25rem] border hairline p-7 transition-all hover:border-primary/40 hover:shadow-soft"
        >
          <span>
            <span className="eyebrow">Also at NOVOMED</span>
            <span className="mt-2 block font-display text-xl font-bold text-brand group-hover:text-primary">
              {other.name}
            </span>
            <span className="text-sm text-muted-foreground">{other.qualifications}</span>
          </span>
          <ArrowRight className="size-5 text-brand/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
