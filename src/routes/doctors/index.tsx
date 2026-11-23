import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, SiteShell } from "@/components/site/SiteShell";
import { DoctorPortrait } from "@/components/site/DoctorPortrait";
import { doctors } from "@/lib/site";
import { pageHead, physicianLd } from "@/lib/seo";

export const Route = createFileRoute("/doctors/")({
  head: () =>
    pageHead({
      title: "Our Doctors | Dr Z.A. Essop & Dr M.Y. Samsodien | NOVOMED",
      description:
        "Meet the general practitioners at NOVOMED: Dr Z.A. Essop (MBChB Stell) and Dr M.Y. Samsodien (MBChB Stell, Dip HIVMan), consulting in Elsies River and Hout Bay.",
      path: "/doctors",
      jsonLd: doctors.map(physicianLd),
      breadcrumbs: [{ name: "Our Doctors", path: "/doctors" }],
    }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our doctors"
        title="Meet our general practitioners."
        crumbs={[{ label: "Our Doctors" }]}
      >
        NOVOMED's doctors are qualified medical practitioners registered with the Health Professions
        Council of South Africa (HPCSA).
      </PageHero>
      <section className="container-page section-pad grid gap-20">
        {doctors.map((d, i) => (
          <article
            key={d.slug}
            className={`grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-center lg:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="mx-auto w-full max-w-sm md:max-w-none">
              <DoctorPortrait doctor={d} />
            </div>
            <div>
              <p className="eyebrow">{d.role}</p>
              <h2 className="display-lg mt-4">{d.name}</h2>
              <p className="mt-4 font-display text-lg font-semibold text-charcoal">
                {d.qualifications}
              </p>
              <p className="mt-6 max-w-xl leading-8 text-muted-foreground">{d.bio[0]}</p>
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-y hairline py-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    HPCSA registration
                  </dt>
                  <dd className="mt-1 font-display font-bold tabular-nums text-brand">
                    {d.registration}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Registered
                  </dt>
                  <dd className="mt-1 inline-flex items-center gap-1.5 font-display font-bold text-brand">
                    <BadgeCheck className="size-4 text-teal" />
                    Medical practitioner
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/doctors/$slug" params={{ slug: d.slug }}>
                    View full profile <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/appointment">Request an appointment</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="container-narrow pb-16 text-center text-sm leading-6 text-muted-foreground">
        You can verify a practitioner's registration on the HPCSA's online register at{" "}
        <a
          href="https://www.hpcsa.co.za"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline underline-offset-4"
        >
          hpcsa.co.za
        </a>
        .
      </section>
      <CtaBand />
    </SiteShell>
  );
}
