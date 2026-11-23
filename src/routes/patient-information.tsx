import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand, PageHero, SiteShell } from "@/components/site/SiteShell";
import { emergencyNote, practices, telHref } from "@/lib/site";
import { pageHead } from "@/lib/seo";

const faqs = [
  {
    q: "How do I make an appointment?",
    a: "Call your preferred practice directly, or send an appointment request online. An online request is not a confirmed appointment — the practice will contact you to confirm a date and time.",
  },
  {
    q: "Can I request an appointment for my child?",
    a: "Yes. Enter the parent or guardian's details on the request form. A parent or legal guardian should accompany children to consultations.",
  },
  {
    q: "Do you accept medical aid?",
    a: "Please ask your preferred practice about medical aid and payment options when you confirm your appointment.",
  },
  {
    q: "How will the practice contact me?",
    a: "Using the contact method you choose on the request form — phone, SMS or email.",
  },
  {
    q: "Can I use the online form for urgent problems?",
    a: "No. Online requests are reviewed during practice hours. For urgent concerns, call the practice. For emergencies, call 10177 or 112, or go to your nearest emergency unit.",
  },
  {
    q: "How do I cancel or change an appointment?",
    a: "Please call the practice as early as possible so the time can be offered to another patient.",
  },
];

const sections = [
  { id: "preparing", title: "Preparing for your consultation" },
  { id: "what-to-bring", title: "What to bring" },
  { id: "medical-aid", title: "Medical aid and payment" },
  { id: "patient-rights", title: "Patient rights" },
  { id: "confidentiality", title: "Patient confidentiality" },
  { id: "prescriptions", title: "Prescription enquiries" },
  { id: "referrals", title: "Referral information" },
  { id: "faq", title: "Frequently asked questions" },
];

export const Route = createFileRoute("/patient-information")({
  head: () =>
    pageHead({
      title: "Patient Information | Preparing for Your Visit | NOVOMED",
      description:
        "Preparing for your GP consultation at NOVOMED: what to bring, medical aid and payment, patient rights, confidentiality, prescriptions, referrals and FAQs.",
      path: "/patient-information",
      breadcrumbs: [{ name: "Patient Information", path: "/patient-information" }],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
  component: PatientInfoPage,
});

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t hairline py-12 first:border-t-0 first:pt-0">
      <h2 className="display-md">{title}</h2>
      <div className="prose-novomed mt-2">{children}</div>
    </section>
  );
}

function PatientInfoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Patient information"
        title="Everything you need before your visit."
        crumbs={[{ label: "Patient Information" }]}
      >
        Practical guidance to help you prepare for your consultation and understand how NOVOMED
        cares for your information.
      </PageHero>
      <div className="container-page section-pad grid gap-14 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="On this page" className="self-start lg:sticky lg:top-28">
          <p className="eyebrow">On this page</p>
          <ul className="mt-4 grid gap-1 border-l hairline">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-teal hover:text-brand"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-3xl">
          <Block id="preparing" title="Preparing for your consultation">
            <p>A little preparation helps you make the most of your time with the doctor.</p>
            <ul>
              <li>
                Write down your symptoms, when they started and anything that makes them better or
                worse.
              </li>
              <li>List the questions you would like to ask.</li>
              <li>
                Note any allergies and any medicines, supplements or traditional remedies you use.
              </li>
              <li>
                Arrive a few minutes early, especially for a first visit, so that your details can
                be captured.
              </li>
              <li>You are welcome to bring a family member or support person.</li>
            </ul>
          </Block>
          <Block id="what-to-bring" title="What to bring">
            <ul>
              <li>Your South African ID, passport or other identity document.</li>
              <li>Your medical aid card, if you belong to a medical aid.</li>
              <li>Your current medicines, or a list of them.</li>
              <li>Recent test results, letters or reports from other healthcare providers.</li>
              <li>For children: the child's Road to Health booklet, if available.</li>
            </ul>
          </Block>
          <Block id="medical-aid" title="Medical aid and payment">
            <p>
              Medical aid arrangements and payment options are confirmed directly by each practice.
              Please ask your preferred practice about medical aid, fees and accepted payment
              methods when you confirm your appointment.
            </p>
            <p>
              If you belong to a medical aid, we recommend checking your plan's benefits and any
              pre-authorisation or referral requirements with your scheme beforehand.
            </p>
          </Block>
          <Block id="patient-rights" title="Patient rights">
            <p>
              In line with South Africa's National Patients' Rights Charter, every patient has the
              right to:
            </p>
            <ul>
              <li>Be treated with dignity and respect.</li>
              <li>
                Receive information about their health and treatment options in a way they
                understand.
              </li>
              <li>Give or refuse informed consent to examinations and treatment.</li>
              <li>Confidentiality and privacy.</li>
              <li>A second opinion and referral, where appropriate.</li>
              <li>Raise a complaint about the care received.</li>
            </ul>
            <p>
              Patients also have responsibilities, including providing accurate information about
              their health and treating staff with respect.
            </p>
          </Block>
          <Block id="confidentiality" title="Patient confidentiality">
            <p>
              Your medical information is confidential. Our practitioners are bound by the ethical
              rules of the HPCSA and by the Protection of Personal Information Act (POPIA).
              Information is shared only with your consent, where the law requires it, or where it
              is necessary for your care.
            </p>
            <p>
              The online appointment request form deliberately does not ask for medical details.
              Please do not send medical histories by email or through the website. Read our{" "}
              <Link to="/popia-notice">POPIA Privacy Notice</Link> and{" "}
              <Link to="/privacy-policy">Privacy Policy</Link> for more.
            </p>
          </Block>
          <Block id="prescriptions" title="Prescription enquiries">
            <p>
              Prescriptions are issued at the doctor's clinical discretion. For a new prescription
              or a repeat of chronic medicine, the doctor will usually need to see you to review
              your condition.
            </p>
            <p>For questions about an existing prescription, call the practice that issued it.</p>
          </Block>
          <Block id="referrals" title="Referral information">
            <p>
              When your condition needs specialist assessment, further tests or care from another
              provider, your GP can discuss a referral with you and provide a referral letter where
              clinically indicated. Some medical aid plans require a GP referral before a specialist
              visit — check your plan's rules with your scheme.
            </p>
            <p>
              Bring any letters or reports from specialist or hospital visits to your follow-up
              consultation.
            </p>
          </Block>
          <section id="faq" className="scroll-mt-28 border-t hairline py-12">
            <h2 className="display-md">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-6 border-t hairline">
              {faqs.map((f, i) => (
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
          </section>
          <div className="rounded-[1.25rem] bg-mint/50 p-8">
            <p className="font-display font-bold text-brand">Questions? Contact your practice.</p>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {practices.map((p) => (
                <a
                  key={p.slug}
                  href={telHref(p.phones[0])}
                  className="font-medium text-primary hover:underline"
                >
                  {p.area}: {p.phones[0]}
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">{emergencyNote}</p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              All contact details <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
      <CtaBand />
    </SiteShell>
  );
}
