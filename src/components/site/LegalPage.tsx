import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { practiceName, practiceNumber, practices } from "@/lib/site";

const docs = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/popia-notice", label: "POPIA Privacy Notice" },
  { to: "/terms-and-conditions", label: "Terms and Conditions" },
  { to: "/medical-disclaimer", label: "Medical Disclaimer" },
  { to: "/cookie-policy", label: "Cookie Policy" },
] as const;

export const LAST_UPDATED = "23 November 2026";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: title }]} tone="white">
        {intro}
      </PageHero>
      <div className="container-page grid gap-14 pb-24 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Legal documents" className="self-start lg:sticky lg:top-28">
          <ul className="grid gap-1 border-l hairline">
            {docs.map((d) => (
              <li key={d.to}>
                <Link
                  to={d.to}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground hover:text-brand [&.active]:border-teal [&.active]:font-semibold [&.active]:text-brand"
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="prose-novomed max-w-3xl">
          <p className="!mt-0 text-xs uppercase tracking-[0.14em]">Last updated: {LAST_UPDATED}</p>
          {children}
          <h2>Contact</h2>
          <p>
            {practiceName} (practice number {practiceNumber}).
          </p>
          <ul>
            {practices.map((p) => (
              <li key={p.slug}>
                {p.name}: {p.address.join(", ")} · {p.phones[0]} ·{" "}
                <a href={`mailto:${p.email}`}>{p.email}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SiteShell>
  );
}
