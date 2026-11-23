import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { CtaBand, ReviewNote, SiteShell, Breadcrumbs } from "@/components/site/SiteShell";
import { articles, categories, categoryName, type CategorySlug } from "@/lib/library";
import { pageHead } from "@/lib/seo";

const searchSchema = z.object({
  category: z
    .enum(categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]])
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute("/health-library/")({
  validateSearch: searchSchema,
  head: () =>
    pageHead({
      title: "Health Library | Patient Health Information | NOVOMED",
      description:
        "Reliable, plain-language health information from NOVOMED General Practitioners: general health, HIV and sexual health, men's, women's and children's health, chronic conditions and healthy living.",
      path: "/health-library",
      breadcrumbs: [{ name: "Health Library", path: "/health-library" }],
    }),
  component: LibraryPage,
});

function LibraryPage() {
  const { category } = Route.useSearch();
  const list = category ? articles.filter((a) => a.category === category) : articles;
  const [lead, ...rest] = list;
  return (
    <SiteShell>
      <section className="container-page pb-10 pt-10">
        <Breadcrumbs items={[{ label: "Health Library" }]} />
        <div className="mt-10 grid gap-8 border-b-2 border-brand pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow rise">NOVOMED Health Library</p>
            <h1 className="rise delay-1 mt-5 font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em]">
              Health,
              <br />
              explained.
            </h1>
          </div>
          <p className="lede rise delay-2 max-w-sm">
            Plain-language articles to help you understand common health topics and know when to see
            a doctor.
          </p>
        </div>
        <nav aria-label="Health library categories" className="mt-6 -mx-5 overflow-x-auto px-5">
          <ul className="flex gap-2 whitespace-nowrap pb-2 lg:flex-wrap">
            <li>
              <Link
                to="/health-library"
                search={{}}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors ${!category ? "border-brand bg-brand text-white" : "hairline text-charcoal hover:border-brand/40"}`}
              >
                All topics
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/health-library"
                  search={{ category: c.slug }}
                  className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === c.slug ? "border-brand bg-brand text-white" : "hairline text-charcoal hover:border-brand/40"}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="container-page pb-20">
        {!lead ? (
          <p className="py-16 text-muted-foreground">
            No articles in this category yet.{" "}
            <Link to="/health-library" search={{}} className="font-semibold text-primary">
              View all topics
            </Link>
            .
          </p>
        ) : (
          <>
            <Link
              to="/health-library/$slug"
              params={{ slug: lead.slug }}
              className="group grid gap-8 rounded-[1.5rem] bg-mint/50 p-8 transition-colors hover:bg-mint/80 md:grid-cols-[1.2fr_0.8fr] md:p-12"
            >
              <div>
                <p className="eyebrow">{categoryName(lead.category)} · Featured</p>
                <h2 className="display-lg mt-5 group-hover:text-primary">{lead.title}</h2>
              </div>
              <div className="flex flex-col justify-end">
                <p className="leading-7 text-muted-foreground">{lead.description}</p>
                <p className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand">
                  Read article · {lead.readMinutes} min{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
            <div className="mt-6 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  to="/health-library/$slug"
                  params={{ slug: a.slug }}
                  className="group border-t hairline py-8"
                >
                  <p className="eyebrow">{categoryName(a.category)}</p>
                  <h2 className="mt-4 font-display text-[1.35rem] font-bold leading-snug group-hover:text-primary">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.description}</p>
                  <p className="mt-5 text-xs font-medium text-muted-foreground">
                    {a.readMinutes} min read
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
        <div className="mt-12">
          <ReviewNote>
            Health library articles are general information and are awaiting review by a NOVOMED
            practitioner. They do not replace a consultation with a doctor.
          </ReviewNote>
        </div>
      </section>
      <CtaBand
        title="Have a health question?"
        text="Our general practitioners can assess your concern and advise on the right next step."
      />
    </SiteShell>
  );
}
