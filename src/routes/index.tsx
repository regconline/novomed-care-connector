import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  FileText,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, SiteShell } from "@/components/site/SiteShell";
import { DetailImage, HeroImage, WideImage } from "@/components/site/Media";
import { DoctorPortrait } from "@/components/site/DoctorPortrait";
import { doctors, practiceNumber, practices, telHref } from "@/lib/site";
import { services } from "@/lib/services";
import { articles, categoryName } from "@/lib/library";
import { clinicLd, organizationLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "NOVOMED General Practitioners | GP in Elsies River & Hout Bay, Cape Town",
      description:
        "NOVOMED General Practitioners offers professional, patient-centred general medical care at our Elsies River and Hout Bay practices in Cape Town. Request an appointment online.",
      path: "/",
      jsonLd: [organizationLd(), ...practices.map(clinicLd)],
    }),
  component: HomePage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-[linear-gradient(180deg,#eaf3f8_0%,#d9f0e9_100%)] lg:block"
      />
      <div
        aria-hidden="true"
        className="grain absolute inset-y-0 right-0 hidden w-[38%] opacity-60 lg:block"
      />
      <div className="container-page relative grid gap-12 pb-16 pt-10 md:pt-14 lg:min-h-[calc(100vh-5rem)] lg:max-h-[880px] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:py-16">
        <div className="relative z-10">
          <p className="rise flex items-center gap-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.24em] text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-teal" />
            Elsies River <span className="text-brand/25">|</span> Hout Bay
          </p>
          <h1 className="display-xl rise delay-1 mt-7 max-w-[11ch]">
            Healthcare That Puts You First<span className="text-teal">.</span>
          </h1>
          <p className="lede rise delay-2 mt-7 max-w-[34rem]">
            Professional, accessible and patient-centred general medical care, serving our
            communities through our Elsies River and Hout Bay practices.
          </p>
          <div className="rise delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="uppercase tracking-[0.08em] text-[0.8rem]">
              <Link to="/appointment">
                Request an appointment <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="uppercase tracking-[0.08em] text-[0.8rem]"
            >
              <Link to="/about">Explore our practice</Link>
            </Button>
          </div>
          <dl className="rise delay-4 mt-12 grid max-w-lg grid-cols-[0.9fr_1.2fr_0.9fr] divide-x divide-brand/10 border-y hairline py-5">
            <div className="pr-4">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Locations
              </dt>
              <dd className="mt-1.5 font-display text-[0.95rem] font-bold leading-snug text-brand sm:text-lg">
                Two practices
              </dd>
            </div>
            <div className="px-4">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Care
              </dt>
              <dd className="mt-1.5 font-display text-[0.95rem] font-bold leading-snug text-brand sm:text-lg">
                General Practitioners
              </dd>
            </div>
            <div className="pl-4">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Practice no.
              </dt>
              <dd className="mt-1.5 font-display text-[0.95rem] font-bold tabular-nums leading-snug text-brand sm:text-lg">
                {practiceNumber}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:mr-0 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -left-6 top-10 hidden h-[72%] w-px bg-brand/10 lg:block"
          />
          <div className="relative ml-auto w-[86%] overflow-hidden rounded-[1.5rem] shadow-lift lg:w-[82%]">
            <HeroImage className="aspect-[4/5] w-full object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(18_60_53/0.35))]"
            />
            <div aria-hidden="true" className="curtain absolute inset-0 bg-mint" />
          </div>
          <div className="fade-in delay-5 absolute -bottom-6 left-0 w-[52%] max-w-[15rem] overflow-hidden rounded-[1.1rem] border-[6px] border-white shadow-lift sm:-bottom-8">
            <DetailImage className="aspect-square w-full object-cover" />
          </div>
          <div className="rise delay-5 absolute right-[-0.5rem] top-8 hidden rounded-2xl bg-white/95 p-5 shadow-lift backdrop-blur sm:block lg:right-auto lg:left-[-2rem] lg:top-14">
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
              Our practices
            </p>
            <ul className="mt-3 grid gap-2.5">
              {practices.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/practices/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center gap-3"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-mint text-brand">
                      <MapPin className="size-3.5" />
                    </span>
                    <span>
                      <span className="block font-display text-sm font-bold text-brand group-hover:text-primary">
                        {p.area}
                      </span>
                      <span className="text-xs text-muted-foreground">{p.shortAddress}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickContact() {
  return (
    <section aria-label="Practice contact numbers" className="border-y hairline bg-surface">
      <div className="container-page grid divide-y divide-brand/10 md:grid-cols-[auto_1fr_1fr] md:divide-x md:divide-y-0">
        <p className="flex items-center gap-2 py-5 font-display text-sm font-bold text-brand md:pr-8">
          <Phone className="size-4 text-primary" />
          Call your practice
        </p>
        {practices.map((p) => (
          <div
            key={p.slug}
            className="flex flex-wrap items-center justify-between gap-3 py-5 md:px-8"
          >
            <span className="text-sm font-semibold text-charcoal">{p.area}</span>
            <span className="flex gap-4 text-sm">
              {p.phones.map((ph) => (
                <a
                  key={ph}
                  href={telHref(ph)}
                  className="font-medium tabular-nums text-primary hover:underline"
                >
                  {ph}
                </a>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="container-page section-pad">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-[1.5rem]">
            <WideImage className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-brand px-6 py-5 text-white shadow-lift">
            <p className="font-display text-3xl font-extrabold">2</p>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">Cape Town practices</p>
          </div>
        </div>
        <div className="lg:pl-6">
          <p className="eyebrow">About NOVOMED</p>
          <h2 className="display-lg mt-5">Professional care, close to home.</h2>
          <p className="lede mt-6">
            NOVOMED General Practitioners is a general medical practice with practices in Elsies
            River and Hout Bay. Our doctors provide consultations for individuals and families, from
            everyday illnesses to ongoing health concerns.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            We are committed to professional medical practice, patient confidentiality and clear,
            respectful communication at every visit.
          </p>
          <Button asChild variant="link" className="mt-6 h-auto px-0 text-base">
            <Link to="/about">
              Learn more about NOVOMED <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServicesIndex() {
  return (
    <section className="bg-brand text-white">
      <div className="container-page section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6fd3bd]">
              Medical services
            </p>
            <h2 className="display-lg mt-5 text-white">
              General practice, for every stage of life.
            </h2>
          </div>
          <p className="max-w-lg leading-7 text-white/70 lg:justify-self-end">
            Our general practitioners consult on a broad range of health concerns. If you are unsure
            which service you need, simply request a general consultation.
          </p>
        </div>
        <ol className="mt-14 grid border-t border-white/15 md:grid-cols-2 md:gap-x-12">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-white/15">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6"
              >
                <span className="font-display text-xs font-bold tabular-nums text-[#6fd3bd]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-white transition-colors group-hover:text-[#9fe5d4]">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white/60">{s.summary}</span>
                </span>
                <ArrowUpRight className="size-5 self-center text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            </li>
          ))}
        </ol>
        <Button asChild variant="inverse" className="mt-12">
          <Link to="/services">
            View all medical services <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section className="container-page section-pad">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Meet our doctors</p>
          <h2 className="display-lg mt-5 max-w-xl">Qualified, registered general practitioners.</h2>
        </div>
        <Button asChild variant="outline">
          <Link to="/doctors">
            Meet the doctors <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-16">
        {doctors.map((d, i) => (
          <article
            key={d.slug}
            className={`grid gap-6 sm:grid-cols-[0.8fr_1fr] sm:items-end ${i === 1 ? "md:mt-20" : ""}`}
          >
            <DoctorPortrait doctor={d} />
            <div>
              <p className="eyebrow">{d.role}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{d.name}</h3>
              <p className="mt-2 text-sm font-medium text-charcoal">{d.qualifications}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                HPCSA registration {d.registration}
              </p>
              <Link
                to="/doctors/$slug"
                params={{ slug: d.slug }}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                View profile <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="bg-clinical/60">
      <div className="container-page section-pad">
        <div className="max-w-2xl">
          <p className="eyebrow">Practice locations</p>
          <h2 className="display-lg mt-5">Care in your community.</h2>
          <p className="lede mt-5">
            Visit the NOVOMED practice closest to you. Each practice can be contacted directly by
            phone or email.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {practices.map((p, i) => (
            <article
              key={p.slug}
              className="group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-8 shadow-soft transition-shadow hover:shadow-lift md:p-10"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-4 font-display text-[6rem] font-extrabold leading-none text-mint"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative eyebrow">Cape Town</p>
              <h3 className="relative mt-3 font-display text-3xl font-bold">{p.area}</h3>
              <address className="relative mt-5 grid gap-1 text-sm not-italic leading-6 text-muted-foreground">
                {p.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <div className="relative mt-6 grid gap-2 text-sm">
                {p.phones.map((ph) => (
                  <a
                    key={ph}
                    href={telHref(ph)}
                    className="inline-flex items-center gap-2 font-medium text-brand hover:text-primary"
                  >
                    <Phone className="size-4 text-primary" />
                    {ph}
                  </a>
                ))}
                <p className="inline-flex items-center gap-2 text-muted-foreground">
                  <Clock3 className="size-4 text-primary" />
                  Call to confirm opening hours
                </p>
              </div>
              <div className="relative mt-8 flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <Link to="/practices/$slug" params={{ slug: p.slug }}>
                    Practice details
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/appointment" search={{ practice: p.slug }}>
                    Request a visit
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const points = [
    {
      icon: HeartHandshake,
      title: "Patient-centred care",
      text: "Every consultation starts with listening to your concerns and explaining your options clearly.",
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality",
      text: "Your personal and medical information is handled with care, in line with POPIA and professional standards.",
    },
    {
      icon: Stethoscope,
      title: "Registered practitioners",
      text: "Consultations are provided by general practitioners registered with the HPCSA.",
    },
    {
      icon: Users,
      title: "Two community practices",
      text: "Choose the practice in Elsies River or Hout Bay that is most convenient for you.",
    },
  ];
  return (
    <section className="container-page section-pad">
      <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why choose NOVOMED</p>
          <h2 className="display-lg mt-5">Thoughtful general practice.</h2>
          <p className="lede mt-5">
            Good primary care is built on trust, clear communication and continuity.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[1.25rem] border hairline bg-brand/10 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-mint text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PatientInfo() {
  const links = [
    { href: "#preparing", label: "Preparing for your consultation" },
    { href: "#what-to-bring", label: "What to bring" },
    { href: "#medical-aid", label: "Medical aid and payment" },
    { href: "#prescriptions", label: "Prescription enquiries" },
    { href: "#referrals", label: "Referral information" },
    { href: "#faq", label: "Frequently asked questions" },
  ];
  return (
    <section className="bg-surface">
      <div className="container-page section-pad grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Patient information</p>
          <h2 className="display-lg mt-5">Before your visit.</h2>
          <p className="lede mt-5">
            Practical guidance on preparing for your consultation, what to bring and how we protect
            your information.
          </p>
          <Button asChild className="mt-8">
            <Link to="/patient-information">
              Read patient information <ArrowRight />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                to="/patient-information"
                hash={l.href.slice(1)}
                className="group flex items-center justify-between rounded-xl border hairline bg-white px-5 py-4 transition-all hover:border-primary/40 hover:shadow-soft"
              >
                <span className="flex items-center gap-3 font-medium text-charcoal">
                  <FileText className="size-4 text-primary" />
                  {l.label}
                </span>
                <ArrowRight className="size-4 text-brand/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Library() {
  const featured = articles.slice(0, 3);
  return (
    <section className="container-page section-pad">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Health education</p>
          <h2 className="display-lg mt-5 max-w-xl">From our health library.</h2>
        </div>
        <Button asChild variant="outline">
          <Link to="/health-library">
            Browse the health library <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featured.map((a) => (
          <Link
            key={a.slug}
            to="/health-library/$slug"
            params={{ slug: a.slug }}
            className="group flex flex-col rounded-[1.25rem] border hairline p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
          >
            <p className="eyebrow">{categoryName(a.category)}</p>
            <h3 className="mt-4 font-display text-xl font-bold leading-snug group-hover:text-primary">
              {a.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{a.description}</p>
            <p className="mt-6 text-xs font-medium text-muted-foreground">
              {a.readMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <QuickContact />
      <Intro />
      <ServicesIndex />
      <Doctors />
      <Locations />
      <WhyChoose />
      <PatientInfo />
      <Library />
      <CtaBand title="Your health, our priority." />
    </SiteShell>
  );
}
