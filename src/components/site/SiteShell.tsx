import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/novomed-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { practices, practiceNumber, telHref } from "@/lib/site";

const nav = [
  ["/", "Home"], ["/about", "About Us"], ["/doctors", "Our Doctors"], ["/services", "Medical Services"],
  ["/practices", "Our Practices"], ["/patient-information", "Patient Information"], ["/health-library", "Health Library"], ["/contact", "Contact Us"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3">Skip to content</a>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Link to="/" className="shrink-0" aria-label="NOVOMED General Practitioners home"><img src={logo.url} alt="NOVOMED General Practitioners" className="h-14 w-auto" /></Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {nav.map(([to, label]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="text-sm font-medium text-foreground transition-colors hover:text-primary [&.active]:text-primary">{label}</Link>)}
          </nav>
          <Button asChild className="hidden h-11 px-5 font-semibold sm:inline-flex"><Link to="/appointment">Request an appointment</Link></Button>
          <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
        {open && <nav className="border-t bg-background xl:hidden" aria-label="Mobile navigation"><div className="container-page grid py-4">
          {nav.map(([to, label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b py-3 font-medium last:border-0">{label}</Link>)}
          <Button asChild className="mt-4 h-12"><Link to="/appointment" onClick={() => setOpen(false)}>Request an appointment</Link></Button>
        </div></nav>}
      </header>
      <main id="main">{children}</main>
      <footer className="bg-brand text-brand-foreground">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div><div className="inline-block rounded-lg bg-background p-3"><img src={logo.url} alt="NOVOMED" className="h-14 w-auto" /></div><p className="mt-5 max-w-sm text-sm leading-6 text-brand-foreground/75">General medical practice serving patients in Elsies River and Hout Bay, Cape Town. Practice no: {practiceNumber}.</p></div>
          <div><h2 className="text-sm font-bold text-brand-foreground">Explore</h2><div className="mt-4 grid gap-2 text-sm text-brand-foreground/75">{nav.slice(1).map(([to, label]) => <Link key={to} to={to} className="hover:text-brand-foreground">{label}</Link>)}</div></div>
          {practices.map((p) => <div key={p.slug}><h2 className="text-sm font-bold text-brand-foreground">{p.name}</h2><address className="mt-4 text-sm not-italic leading-6 text-brand-foreground/75">{p.address.join(", ")}<br />{p.phones.map((ph) => <a key={ph} href={telHref(ph)} className="block hover:text-brand-foreground">{ph}</a>)}<a href={`mailto:${p.email}`} className="break-all hover:text-brand-foreground">{p.email}</a></address></div>)}
        </div>
        <div className="border-t border-brand-foreground/15"><div className="container-page flex flex-col gap-4 py-6 text-xs text-brand-foreground/65 md:flex-row md:justify-between"><p><strong className="text-brand-foreground">Medical emergency?</strong> Do not use this website. Call 10177 or 112, or go to your nearest emergency unit.</p><div className="flex flex-wrap gap-4"><Link to="/privacy">Privacy Policy</Link><Link to="/popia">POPIA Information</Link><Link to="/terms">Website Terms</Link><span>© {new Date().getFullYear()} NOVOMED</span></div></div></div>
      </footer>
      <a href={telHref(practices[0].phones[0])} className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft sm:hidden" aria-label="Call Elsies River Practice"><Phone /></a>
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="bg-clinical py-16 md:py-24"><div className="container-page max-w-4xl"><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{title}</h1>{children && <div className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>}</div></section>;
}
