import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, SiteShell } from "@/components/site/SiteShell";
import { WideImage } from "@/components/site/Media";
import { doctors, practiceNumber, practices } from "@/lib/site";
import { organizationLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Us | NOVOMED General Practitioners, Cape Town",
      description:
        "NOVOMED General Practitioners is a general medical practice in Elsies River and Hout Bay, Cape Town, committed to accessible, professional and patient-centred care.",
      path: "/about",
      jsonLd: [organizationLd()],
      breadcrumbs: [{ name: "About Us", path: "/about" }],
    }),
  component: AboutPage,
});

const principles = [
  {
    n: "01",
    title: "Listening first",
    text: "We take time to understand your concerns, your history and what matters to you before recommending next steps.",
  },
  {
    n: "02",
    title: "Clear communication",
    text: "We explain findings and options in plain language, so you can make informed decisions about your care.",
  },
  {
    n: "03",
    title: "Responsible practice",
    text: "Our doctors practise within their scope as general practitioners and refer to other providers when that is in your best interest.",
  },
  {
    n: "04",
    title: "Respect and dignity",
    text: "Every patient is treated with courtesy and respect, regardless of background or circumstance.",
  },
];

const standards = [
  "Consultations by medical practitioners registered with the Health Professions Council of South Africa (HPCSA).",
  "Patient information handled confidentially and in line with the Protection of Personal Information Act (POPIA).",
  "Informed consent before examinations and procedures.",
  "Referral to specialists or other healthcare providers when clinically appropriate.",
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About NOVOMED"
        title="General practice built on trust and clear communication."
        crumbs={[{ label: "About Us" }]}
        tone="white"
      >
        NOVOMED General Practitioners provides general medical care to individuals and families
        through our practices in Elsies River and Hout Bay, Cape Town.
      </PageHero>

      <section className="container-page pb-6">
        <div className="overflow-hidden rounded-[1.5rem]">
          <WideImage className="aspect-[21/9] w-full object-cover" sizes="100vw" />
        </div>
      </section>

      <section className="container-page section-pad grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <p className="eyebrow">Practice overview</p>
          <h2 className="display-md mt-5">Two practices. One standard of care.</h2>
        </div>
        <div className="grid gap-5 text-[1.05rem] leading-8 text-muted-foreground">
          <p>
            NOVOMED General Practitioners is a general medical practice (practice number{" "}
            {practiceNumber}) with two locations in Cape Town: the Feymon Centre in Elsies River and
            Victoria Avenue in Hout Bay.
          </p>
          <p>
            Our general practitioners consult on a broad range of health concerns — from recent
            illnesses and general check-ups to the ongoing management of long-term conditions — for
            adults and children.
          </p>
          <p>
            As your first point of contact with the health system, we aim to assess your concern
            carefully, treat what can be treated in general practice, and guide you to the right
            specialist or service when further care is needed.
          </p>
        </div>
      </section>

      <section className="bg-mint/50">
        <div className="container-page section-pad grid gap-12 lg:grid-cols-2">
          <div className="rounded-[1.25rem] bg-white p-9 shadow-soft md:p-12">
            <p className="eyebrow">Our mission</p>
            <p className="mt-6 font-display text-2xl font-semibold leading-snug text-brand md:text-[1.7rem]">
              To provide accessible, professional and patient-centred primary healthcare through
              responsible medical practice, clear communication and a commitment to the wellbeing of
              every patient.
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-brand p-9 text-white md:p-12">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6fd3bd]">
              Our vision
            </p>
            <p className="mt-6 font-display text-2xl font-semibold leading-snug md:text-[1.7rem]">
              To be a trusted general practice in the communities we serve — where patients feel
              heard, respected and confident in the care they receive.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="max-w-2xl">
          <p className="eyebrow">Medical philosophy</p>
          <h2 className="display-md mt-5">A patient-centred approach to general practice.</h2>
        </div>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.n} className="grid grid-cols-[3rem_1fr] gap-4 border-t hairline py-8">
              <span className="font-display text-sm font-bold text-teal">{p.n}</span>
              <div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page section-pad grid gap-12 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="eyebrow">Professional standards</p>
            <h2 className="display-md mt-5">What you can expect from us.</h2>
            <p className="lede mt-5">These standards guide every consultation at NOVOMED.</p>
          </div>
          <ul className="grid gap-3">
            {standards.map((s) => (
              <li
                key={s}
                className="flex gap-4 rounded-xl bg-white p-5 leading-7 text-charcoal shadow-soft"
              >
                <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-teal" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Our team</p>
            <h2 className="display-md mt-5">Our general practitioners.</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/doctors">
              Meet our doctors <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {doctors.map((d) => (
            <Link
              key={d.slug}
              to="/doctors/$slug"
              params={{ slug: d.slug }}
              className="group flex items-center justify-between rounded-[1.25rem] border hairline p-7 transition-all hover:border-primary/40 hover:shadow-soft"
            >
              <div>
                <h3 className="font-display text-xl font-bold group-hover:text-primary">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {d.qualifications} · HPCSA {d.registration}
                </p>
              </div>
              <ArrowRight className="size-5 text-brand/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <p className="eyebrow">Practice locations</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {practices.map((p) => (
            <Link
              key={p.slug}
              to="/practices/$slug"
              params={{ slug: p.slug }}
              className="group flex items-start gap-4 rounded-[1.25rem] bg-clinical/70 p-7 transition-colors hover:bg-mint/60"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary">
                <MapPin className="size-4" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.address.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
