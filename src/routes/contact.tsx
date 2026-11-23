import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import {
  emergencyNote,
  mapEmbed,
  mapsHref,
  practices,
  telHref,
  type PracticeSlug,
} from "@/lib/site";
import { clinicLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Us | NOVOMED General Practitioners Elsies River & Hout Bay",
      description:
        "Contact NOVOMED General Practitioners. Elsies River: 021 928 8966, elsiesriver@novomed.co.za. Hout Bay: 021 790 2340, houtbay@novomed.co.za. Maps, directions and appointment requests.",
      path: "/contact",
      jsonLd: practices.map(clinicLd),
      breadcrumbs: [{ name: "Contact Us", path: "/contact" }],
    }),
  component: ContactPage,
});

function EnquiryForm() {
  const [practice, setPractice] = useState<PracticeSlug>("elsies-river");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim())
      return setError("Please enter your name and a short message.");
    setError("");
    const p = practices.find((x) => x.slug === practice)!;
    const body = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:${p.email}?subject=${encodeURIComponent(subject.trim() || "Website enquiry")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <fieldset>
        <legend className="text-sm font-medium text-charcoal">Send to</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {practices.map((p) => (
            <label
              key={p.slug}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${practice === p.slug ? "border-primary bg-mint/50 text-brand" : "hairline text-charcoal hover:border-brand/30"}`}
            >
              <input
                type="radio"
                name="practice"
                value={p.slug}
                checked={practice === p.slug}
                onChange={() => setPractice(p.slug)}
                className="sr-only"
              />
              {p.area}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-2">
        <Label htmlFor="c-name">Your name</Label>
        <Input
          id="c-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-subject">Subject</Label>
        <Input
          id="c-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Opening hours"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-message">Message</Label>
        <Textarea
          id="c-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl"
        />
      </div>
      <p className="text-xs leading-5 text-muted-foreground">
        This opens your email app with the message addressed to the practice. Please do not include
        medical details. To request an appointment, use the{" "}
        <Link to="/appointment" className="font-medium text-primary underline underline-offset-2">
          appointment request
        </Link>{" "}
        form.
      </p>
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full sm:w-fit">
        <Send /> Compose email
      </Button>
    </form>
  );
}

function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch with your practice."
        crumbs={[{ label: "Contact Us" }]}
      >
        Call, email or visit either NOVOMED practice. To request an appointment online, use our
        appointment request form.
      </PageHero>
      <section className="container-page section-pad grid gap-8 lg:grid-cols-2">
        {practices.map((p) => (
          <article key={p.slug} className="overflow-hidden rounded-[1.5rem] border hairline">
            <iframe
              title={`Map showing NOVOMED ${p.name}`}
              src={mapEmbed(p.mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
            />
            <div className="grid gap-5 p-8">
              <div>
                <p className="eyebrow">NOVOMED</p>
                <h2 className="mt-2 font-display text-2xl font-bold">{p.name}</h2>
              </div>
              <address className="flex gap-3 not-italic leading-7 text-charcoal">
                <MapPin className="mt-1.5 size-4 shrink-0 text-primary" />
                {p.address.join(", ")}
              </address>
              <div className="grid gap-2 sm:grid-cols-2">
                {p.phones.map((ph) => (
                  <a
                    key={ph}
                    href={telHref(ph)}
                    className="flex items-center gap-2 rounded-lg bg-surface px-4 py-3 font-medium tabular-nums text-brand hover:bg-mint"
                  >
                    <Phone className="size-4 text-primary" />
                    {ph}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-2 break-all rounded-lg bg-surface px-4 py-3 font-medium text-brand hover:bg-mint"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                {p.email}
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <Link to="/appointment" search={{ practice: p.slug }}>
                    Request an appointment
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={mapsHref(p.mapQuery)} target="_blank" rel="noreferrer">
                    Directions <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-clinical/60">
        <div className="container-page section-pad grid gap-12 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="eyebrow">General enquiries</p>
            <h2 className="display-md mt-4">Send us a message.</h2>
            <p className="lede mt-5">
              For general questions such as opening hours or directions. For appointments, the
              online request form is quicker.
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/appointment">
                Request an appointment <ArrowRight />
              </Link>
            </Button>
            <p className="mt-10 rounded-xl border-l-4 border-destructive bg-white p-5 text-sm leading-6 text-charcoal">
              <strong>Medical emergency?</strong>{" "}
              {emergencyNote.replace("In a medical emergency, do", "Do")}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-7 shadow-soft md:p-10">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
