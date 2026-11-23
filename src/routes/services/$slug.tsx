import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, ReviewNote, SiteShell } from "@/components/site/SiteShell";
import { getService, services } from "@/lib/services";
import { absoluteUrl, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    return pageHead({
      title: `${s.name} | NOVOMED General Practitioners, Cape Town`,
      description: `${s.summary} Available at NOVOMED's Elsies River and Hout Bay practices. Request an appointment online.`,
      path: `/services/${s.slug}`,
      breadcrumbs: [
        { name: "Medical Services", path: "/services" },
        { name: s.name, path: `/services/${s.slug}` },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: s.name,
          description: s.summary,
          url: absoluteUrl(`/services/${s.slug}`),
          about: { "@type": "MedicalProcedure", name: s.name },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)).filter(Boolean);
  return (
    <SiteShell>
      <PageHero
        eyebrow="Medical services"
        title={s.name}
        crumbs={[{ label: "Medical Services", to: "/services" }, { label: s.name }]}
        tone="mint"
        aside={
          <Button asChild size="lg" className="w-full lg:w-auto">
            <Link to="/appointment">
              Request an appointment <ArrowRight />
            </Link>
          </Button>
        }
      >
        {s.intro}
      </PageHero>

      <section className="container-page section-pad grid gap-14 lg:grid-cols-[0.65fr_0.35fr]">
        <div>
          <h2 className="display-md">About this service</h2>
          <div className="mt-6 grid gap-5 text-[1.05rem] leading-8 text-muted-foreground">
            {s.explanation.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.25rem] bg-clinical/70 p-8">
              <h2 className="font-display text-lg font-bold">Who this may be relevant to</h2>
              <ul className="mt-5 grid gap-3">
                {s.relevantTo.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-6 text-charcoal">
                    <Check className="mt-1 size-4 shrink-0 text-teal" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.25rem] border hairline p-8">
              <h2 className="font-display text-lg font-bold">What a consultation involves</h2>
              <ol className="mt-5 grid gap-3">
                {s.consultation.map((c, i) => (
                  <li
                    key={c}
                    className="grid grid-cols-[1.75rem_1fr] text-sm leading-6 text-charcoal"
                  >
                    <span className="font-display text-xs font-bold text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="display-md">Patient information</h2>
            <ul className="mt-6 grid gap-3">
              {s.patientInfo.map((p) => (
                <li
                  key={p}
                  className="flex gap-4 border-b hairline pb-3 leading-7 text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 size-1.5 shrink-0 rounded-full bg-teal"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <h2 className="display-md">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-6 border-t hairline">
              {s.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`} className="border-b hairline">
                  <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-brand hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[0.95rem] leading-7 text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-10">
            <ReviewNote />
          </div>
        </div>

        <aside className="grid gap-5 self-start lg:sticky lg:top-28">
          <div className="rounded-[1.25rem] bg-brand p-8 text-white">
            <h2 className="font-display text-xl font-bold text-white">Request an appointment</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Choose your practice and preferred time. The practice will contact you to confirm.
            </p>
            <Button asChild variant="inverse" className="mt-6 w-full">
              <Link to="/appointment">
                Start a request <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="rounded-[1.25rem] border hairline p-8">
            <h2 className="font-display text-base font-bold">Related services</h2>
            <ul className="mt-4 grid gap-1">
              {related.map(
                (r) =>
                  r && (
                    <li key={r.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: r.slug }}
                        className="group flex items-center justify-between py-2 text-sm font-medium text-charcoal hover:text-primary"
                      >
                        {r.name}
                        <ArrowRight className="size-4 text-brand/30 group-hover:text-primary" />
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </aside>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
