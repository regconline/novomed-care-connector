import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    pageHead({
      title: "Terms and Conditions | NOVOMED General Practitioners",
      description:
        "Terms governing the use of the NOVOMED General Practitioners website and online appointment requests.",
      path: "/terms-and-conditions",
      breadcrumbs: [{ name: "Terms and Conditions", path: "/terms-and-conditions" }],
    }),
  component: () => (
    <LegalPage
      title="Terms and Conditions"
      intro="Terms governing your use of this website and the online appointment request service."
    >
      <h2>1. Acceptance</h2>
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the
        website.
      </p>
      <h2>2. Website information</h2>
      <p>
        Information on this website is provided for general purposes. While we take care to keep it
        accurate and current, we do not warrant that it is complete or error-free. Health
        information on this website is subject to our{" "}
        <Link to="/medical-disclaimer">Medical Disclaimer</Link>.
      </p>
      <h2>3. Appointment requests</h2>
      <ul>
        <li>
          Submitting an online request does not create a confirmed appointment. An appointment is
          confirmed only when the practice contacts you.
        </li>
        <li>
          Requests are reviewed during practice hours. The online service is not suitable for urgent
          or emergency care.
        </li>
        <li>
          You must provide accurate contact details and may submit a request only for yourself or
          for a person you are authorised to act for, such as your child.
        </li>
        <li>We may decline requests that appear fraudulent, abusive or automated.</li>
      </ul>
      <h2>4. Acceptable use</h2>
      <p>
        You may not use this website to submit false information, attempt to gain unauthorised
        access to any system, introduce malicious code or interfere with the website's operation.
        Staff areas are restricted to authorised NOVOMED personnel.
      </p>
      <h2>5. Intellectual property</h2>
      <p>
        The NOVOMED name, logo and website content belong to NOVOMED General Practitioners or its
        licensors and may not be reproduced without permission.
      </p>
      <h2>6. Third-party links</h2>
      <p>
        This website links to third-party services such as Google Maps. We are not responsible for
        the content or privacy practices of those services.
      </p>
      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, including the Consumer Protection Act 68 of 2008, NOVOMED is
        not liable for loss arising from the use of, or inability to use, this website or reliance
        on general information published on it.
      </p>
      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa.</p>
    </LegalPage>
  ),
});
