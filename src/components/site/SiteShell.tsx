import * as Dialog from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronRight, Mail, Phone } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { emergencyNote, practiceNumber, practices, telHref } from "@/lib/site";

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/doctors", label: "Our Doctors" },
  { to: "/services", label: "Medical Services" },
  { to: "/practices", label: "Our Practices" },
  { to: "/patient-information", label: "Patient Information" },
  { to: "/health-library", label: "Health Library" },
  { to: "/contact", label: "Contact Us" },
] as const;

const legal = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/popia-notice", label: "POPIA Notice" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/medical-disclaimer", label: "Medical Disclaimer" },
  { to: "/cookie-policy", label: "Cookie Policy" },
] as const;

/** Two-stroke menu icon that morphs into a close (×) when open. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-6">
      <span
        className={`absolute left-0 h-[2px] w-6 rounded-full bg-brand transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
      />
      <span
        className={`absolute left-0 h-[2px] rounded-full bg-brand transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${open ? "top-1/2 w-6 -translate-y-1/2 -rotate-45" : "bottom-0 w-4"}`}
      />
    </span>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="relative z-[60] grid size-11 place-items-center rounded-lg transition-colors hover:bg-surface xl:hidden"
        >
          <MenuGlyph open={open} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 xl:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto bg-[#f7fbf9] shadow-lift data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300 xl:hidden">
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Pages, appointment requests and practice contact details.
          </Dialog.Description>
          <div className="flex h-20 items-center justify-between border-b hairline px-6">
            <Logo className="h-11 w-auto" />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-lg hover:bg-mint"
              >
                <MenuGlyph open />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile navigation" className="px-6 pt-4">
            <ul>
              {nav.map((item, i) => (
                <li
                  key={item.to}
                  className="border-b hairline"
                  style={{ animationDelay: `${60 + i * 35}ms` }}
                >
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="group flex min-h-14 items-center justify-between font-display text-lg font-semibold text-brand [&.active]:text-primary"
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-brand/40 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-6 pt-6">
            <Button asChild size="lg" className="w-full">
              <Link to="/appointment">
                Request an appointment <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-auto grid gap-3 px-6 pb-8 pt-8">
            <p className="eyebrow">Call a practice</p>
            {practices.map((p) => (
              <a
                key={p.slug}
                href={telHref(p.phones[0])}
                className="flex items-center justify-between rounded-xl border hairline bg-white px-4 py-3.5 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block font-display text-sm font-bold text-brand">{p.area}</span>
                  <span className="text-sm text-muted-foreground">{p.phones[0]}</span>
                </span>
                <Phone className="size-4 text-primary" />
              </a>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-background focus:p-3 focus:shadow-lift"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b hairline bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link to="/" className="shrink-0" aria-label="NOVOMED General Practitioners — home">
            <Logo className="h-12 w-auto md:h-[3.25rem]" />
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {nav.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-md px-2.5 py-2 text-[0.84rem] font-medium text-charcoal/80 transition-colors hover:text-brand after:absolute after:inset-x-2.5 after:-bottom-[1px] after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-teal after:transition-transform hover:after:scale-x-100 [&.active]:text-brand [&.active]:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/appointment">Request an appointment</Link>
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="relative bg-brand text-brand-foreground">
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-xl bg-white px-4 py-3">
            <Logo className="h-12 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
            General medical practice serving patients in Elsies River and Hout Bay, Cape Town.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
            Practice no. {practiceNumber}
          </p>
          <Button asChild variant="inverse" className="mt-7">
            <Link to="/appointment">
              Request an appointment <ArrowRight />
            </Link>
          </Button>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Explore
          </h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/80 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {practices.map((p) => (
          <div key={p.slug}>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              {p.name}
            </h2>
            <address className="mt-5 grid gap-2.5 text-sm not-italic text-white/80">
              <span className="leading-6">{p.address.join(", ")}</span>
              {p.phones.map((ph) => (
                <a
                  key={ph}
                  href={telHref(ph)}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="size-3.5 text-[#6fd3bd]" />
                  {ph}
                </a>
              ))}
              <a
                href={`mailto:${p.email}`}
                className="inline-flex items-center gap-2 break-all hover:text-white"
              >
                <Mail className="size-3.5 shrink-0 text-[#6fd3bd]" />
                {p.email}
              </a>
              <Link
                to="/practices/$slug"
                params={{ slug: p.slug }}
                className="mt-1 inline-flex items-center gap-1 font-semibold text-white hover:underline"
              >
                Practice details <ArrowUpRight className="size-3.5" />
              </Link>
            </address>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-5 py-7 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl leading-5">
            <strong className="text-white">Medical emergency?</strong>{" "}
            {emergencyNote.replace("In a medical emergency, do", "Do")}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <span>© {new Date().getFullYear()} NOVOMED General Practitioners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 text-brand/30" aria-hidden="true" />
            {item.to ? (
              <Link to={item.to} params={item.params as never} className="hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  crumbs,
  tone = "clinical",
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  crumbs?: { label: string; to?: string; params?: Record<string, string> }[];
  tone?: "clinical" | "mint" | "white";
  aside?: ReactNode;
}) {
  const bg = tone === "mint" ? "bg-mint/60" : tone === "white" ? "bg-white" : "bg-clinical/70";
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      <div
        className="grain pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div className="container-page relative grid gap-10 pb-16 pt-10 md:pb-20 md:pt-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <p className="eyebrow rise mt-10">{eyebrow}</p>
          <h1 className="display-lg rise delay-1 mt-5 max-w-4xl">{title}</h1>
          {children && <div className="lede rise delay-2 mt-6 max-w-2xl">{children}</div>}
        </div>
        {aside && <div className="rise delay-3">{aside}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to see a doctor?",
  text = "Send an appointment request to your preferred practice. Our team will contact you to confirm availability.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-brand px-7 py-12 text-white md:px-14 md:py-16">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 size-52 rounded-full border border-white/10"
        />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6fd3bd]">
              Appointments
            </p>
            <h2 className="display-md mt-4 max-w-xl text-white">{title}</h2>
            <p className="mt-4 max-w-lg leading-7 text-white/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button asChild variant="inverse" size="lg">
              <Link to="/appointment">
                Request an appointment <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/25 bg-transparent shadow-none hover:bg-white/10"
            >
              <Link to="/contact">Contact a practice</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewNote({
  children = "General information only. This content is awaiting review by a NOVOMED practitioner and does not replace a consultation.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="inline-flex items-start gap-2 rounded-lg border border-dashed border-primary/30 bg-mint/30 px-3.5 py-2.5 text-xs leading-5 text-brand/80">
      <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-teal" />
      {children}
    </p>
  );
}
