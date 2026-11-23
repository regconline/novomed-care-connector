import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs, CtaBand, ReviewNote, SiteShell } from "@/components/site/SiteShell";
import { articles, categoryName, getArticle } from "@/lib/library";
import { articleLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/health-library/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return pageHead({
      title: `${a.title} | NOVOMED Health Library`,
      description: a.description,
      path: `/health-library/${a.slug}`,
      type: "article",
      jsonLd: [articleLd(a)],
      breadcrumbs: [
        { name: "Health Library", path: "/health-library" },
        { name: a.title, path: `/health-library/${a.slug}` },
      ],
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <SiteShell>
      <article>
        <header className="container-narrow pb-10 pt-10">
          <Breadcrumbs
            items={[
              { label: "Health Library", to: "/health-library" },
              { label: categoryName(a.category) },
            ]}
          />
          <p className="eyebrow rise mt-12">{categoryName(a.category)}</p>
          <h1 className="display-lg rise delay-1 mt-5">{a.title}</h1>
          <p className="lede rise delay-2 mt-6">{a.description}</p>
          <div className="rise delay-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y hairline py-4 text-xs text-muted-foreground">
            <span>{a.readMinutes} min read</span>
            <span>NOVOMED General Practitioners</span>
            <span className="inline-flex items-center gap-1.5 text-brand">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Awaiting practitioner review
            </span>
          </div>
        </header>
        <div className="container-narrow prose-novomed pb-12 text-[1.06rem]">
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <aside className="mt-12 rounded-[1.25rem] border-l-4 border-teal bg-mint/40 p-7 not-prose">
            <p className="flex items-center gap-2 font-display font-bold text-brand">
              <AlertCircle className="size-5 text-teal" />
              When to see a doctor
            </p>
            {a.seeDoctor.map((p) => (
              <p key={p} className="!mt-3 text-[0.95rem] leading-7 !text-charcoal">
                {p}
              </p>
            ))}
          </aside>
          <div className="mt-10">
            <ReviewNote>
              This article is general health information, awaiting review by a NOVOMED practitioner.
              It is not a diagnosis and does not replace a consultation.
            </ReviewNote>
          </div>
          <p className="mt-10">
            <Link to="/health-library" className="inline-flex items-center gap-2 no-underline">
              <ArrowLeft className="size-4" /> Back to the health library
            </Link>
          </p>
        </div>
      </article>
      <section className="bg-surface">
        <div className="container-page py-16">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <Link
                key={m.slug}
                to="/health-library/$slug"
                params={{ slug: m.slug }}
                className="group rounded-[1.25rem] bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <p className="eyebrow">{categoryName(m.category)}</p>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-primary">
                  {m.title}
                </h2>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
