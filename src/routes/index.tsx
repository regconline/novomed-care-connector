import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, HeartHandshake, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { doctors, mapEmbed, mapsHref, practices, telHref, practiceNumber } from "@/lib/site";
import { pageMeta } from "@/lib/site";
import consultationRoom from "@/assets/consultation-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMeta("NOVOMED General Practitioners | Cape Town", "Professional general medical care at NOVOMED's Elsies River and Hout Bay practices in Cape Town.") }),
  component: HomePage,
});

function HomePage() {
  return <SiteShell>
    <section className="container-page grid min-h-[680px] items-center gap-12 py-12 md:grid-cols-[0.88fr_1.12fr] md:py-20">
      <div className="order-2 max-w-xl md:order-1">
        <p className="eyebrow">General practitioners · Cape Town</p>
        <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] sm:text-6xl">NOVOMED <span className="block">General Practitioners</span></h1>
        <p className="mt-6 text-2xl font-semibold text-foreground">Your Health. Our Priority.</p>
        <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">Professional, accessible general medical care for individuals and families in Elsies River and Hout Bay.</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-brand"><MapPin className="size-4 shrink-0" /> Serving patients across two Cape Town practices</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link to="/appointment">Request an appointment <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><Link to="/services">Explore medical services</Link></Button></div>
      </div>
      <div className="relative order-1 min-h-[370px] overflow-hidden rounded-md md:order-2 md:min-h-[540px]"><img src={consultationRoom} alt="A calm, modern consultation room in a Cape Town general practice" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-4 left-4 right-4 bg-background/95 p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"><p className="text-sm font-semibold text-brand">Two neighbourhood practices</p><p className="mt-1 text-sm text-muted-foreground">Elsies River · Hout Bay</p></div></div>
    </section>

    <section className="border-y bg-mint/50"><div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:items-center md:py-24"><div><p className="eyebrow">Welcome to NOVOMED</p><h2 className="mt-4 max-w-xl text-3xl font-bold md:text-4xl">Professional care, close to home.</h2></div><div><p className="leading-7 text-muted-foreground">NOVOMED General Practitioners is a general medical practice with locations in Elsies River and Hout Bay. Patients can contact their preferred practice to discuss a consultation.</p><p className="mt-4 leading-7 text-muted-foreground">Our practitioners are committed to professional medical practice, patient confidentiality and clear communication.</p><Button asChild variant="link" className="mt-3 h-auto px-0"><Link to="/about">About NOVOMED <ArrowRight /></Link></Button></div></div></section>

    <section className="container-page section-pad"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Our practices</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Care in your community.</h2></div><Button asChild variant="outline"><Link to="/practices">View both locations <ArrowRight /></Link></Button></div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{practices.map((p) => <article key={p.slug} className="grid overflow-hidden border bg-background md:grid-cols-[0.9fr_1.1fr]"><div className="flex flex-col justify-between p-7"><div><p className="eyebrow">Cape Town</p><h3 className="mt-3 text-2xl font-bold">{p.area}</h3><address className="mt-4 text-sm not-italic leading-6 text-muted-foreground">{p.address.map((line) => <span key={line} className="block">{line}</span>)}</address></div><div className="mt-6 flex flex-wrap gap-3"><Button asChild size="sm"><Link to="/appointment">Request a visit</Link></Button><Button asChild variant="ghost" size="sm"><a href={mapsHref(p.mapQuery)} target="_blank" rel="noreferrer">Directions <ArrowUpRight /></a></Button></div></div><iframe title={`Map showing ${p.name}`} src={mapEmbed(p.mapQuery)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0 md:h-full md:min-h-72" /></article>)}</div>
    </section>

    <section className="bg-clinical"><div className="container-page section-pad"><p className="eyebrow">Meet our doctors</p><div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><h2 className="max-w-xl text-3xl font-bold md:text-4xl">Experienced general practitioners.</h2><Button asChild variant="outline"><Link to="/doctors">Meet the doctors <ArrowRight /></Link></Button></div><div className="mt-9 grid gap-4 sm:grid-cols-2">{doctors.map((d) => <Link key={d.slug} to="/doctors" className="group border-l-2 border-primary bg-background p-6 transition-colors hover:bg-mint/50"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-bold">{d.name}</h3><p className="mt-2 text-sm text-muted-foreground">{d.qualifications}</p><p className="mt-1 text-xs text-muted-foreground">HPCSA registration: {d.registration}</p></div><ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" /></div></Link>)}</div></div></section>

    <section className="container-page section-pad"><div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start"><div><p className="eyebrow">Our approach</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Thoughtful, professional general care.</h2><p className="mt-5 leading-7 text-muted-foreground">Every consultation begins with listening. Contact the practice to discuss your needs and find out whether a GP consultation is suitable.</p><Button asChild variant="link" className="mt-4 h-auto px-0"><Link to="/patient-information">Patient information <ArrowRight /></Link></Button></div><div className="grid gap-0 divide-y border-y">{[[<HeartHandshake key="a" />,"Patient-centred consultations"],[<ShieldCheck key="b" />,"Respect for patient confidentiality"],[<BadgeCheck key="c" />,"Professional medical practice"],[<MapPin key="d" />,"Two Cape Town locations"]].map(([icon, label]) => <div key={String(label)} className="flex items-center gap-4 py-5"><span className="text-primary">{icon}</span><p className="font-semibold">{label}</p></div>)}</div></div></section>

    <section className="bg-brand text-brand-foreground"><div className="container-page grid gap-6 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16"><div><p className="text-xs font-bold uppercase text-brand-foreground/75">Get in touch</p><h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">Your health matters.</h2><p className="mt-3 max-w-xl text-brand-foreground/80">Contact your nearest NOVOMED practice to enquire about a consultation. A request is not a confirmed appointment.</p></div><Button asChild size="lg" variant="secondary"><Link to="/appointment"><CalendarDays /> Request an appointment</Link></Button></div></section>

    <section className="container-page py-12"><div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Practice no: {practiceNumber}</span><span><Stethoscope className="mr-2 inline size-4" />Medical services are discussed during consultation</span><a href={mapsHref(practices[1].mapQuery)} target="_blank" rel="noreferrer" className="text-primary hover:underline">Find a practice <ArrowUpRight className="ml-1 inline size-4" /></a></div></section>
  </SiteShell>;
}
