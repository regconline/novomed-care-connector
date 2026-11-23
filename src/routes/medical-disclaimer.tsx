import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/medical-disclaimer")({
  head: () =>
    pageHead({
      title: "Medical Disclaimer | NOVOMED General Practitioners",
      description:
        "Health information on the NOVOMED website is general and educational. It does not replace a consultation with a doctor.",
      path: "/medical-disclaimer",
      breadcrumbs: [{ name: "Medical Disclaimer", path: "/medical-disclaimer" }],
    }),
  component: () => (
    <LegalPage
      title="Medical Disclaimer"
      intro="Health information on this website is general and educational. It is not a substitute for professional medical advice."
    >
      <h2>General information only</h2>
      <p>
        The content on this website, including service descriptions and health library articles, is
        provided for general educational purposes. It is not intended to diagnose, treat or prevent
        any condition, and it does not replace a consultation with a qualified healthcare
        professional.
      </p>
      <h2>No doctor–patient relationship</h2>
      <p>
        Reading this website, or submitting an appointment request, does not create a doctor–patient
        relationship. That relationship begins when you consult one of our practitioners.
      </p>
      <h2>Always seek professional advice</h2>
      <p>
        Do not ignore professional medical advice or delay seeking it because of something you have
        read on this website. Do not start, stop or change any medicine without speaking to your
        doctor or pharmacist.
      </p>
      <h2>Emergencies</h2>
      <p>
        <strong>In a medical emergency, do not use this website.</strong> Call 10177 or 112, or go
        to your nearest emergency unit.
      </p>
      <h2>Review of content</h2>
      <p>
        Health content on this website is subject to review by NOVOMED's practitioners. Articles
        awaiting review are labelled accordingly. Medical knowledge changes over time and content
        may not reflect the latest guidance.
      </p>
    </LegalPage>
  ),
});
