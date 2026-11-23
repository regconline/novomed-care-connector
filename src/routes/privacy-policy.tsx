import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | NOVOMED General Practitioners",
      description:
        "How NOVOMED General Practitioners collects, uses and protects personal information submitted through this website.",
      path: "/privacy-policy",
      breadcrumbs: [{ name: "Privacy Policy", path: "/privacy-policy" }],
    }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      intro="How we collect, use and protect personal information submitted through this website."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by NOVOMED General Practitioners, a general medical practice with
        practices in Elsies River and Hout Bay, Cape Town. We are the responsible party for personal
        information collected through this website.
      </p>
      <h2>2. Information we collect</h2>
      <p>We collect only the information needed to respond to you:</p>
      <ul>
        <li>
          <strong>Appointment requests:</strong> first name, surname, contact number, email address
          (optional unless you choose email contact), preferred practice, appointment category,
          preferred date and time, preferred contact method and an optional short administrative
          message.
        </li>
        <li>
          <strong>Technical information:</strong> basic technical data processed by our hosting
          provider to deliver and secure the website, such as IP address and browser type.
        </li>
      </ul>
      <p>
        The appointment request form does not ask for medical history or symptoms, and we ask you
        not to submit health information through the website.
      </p>
      <h2>3. How we use your information</h2>
      <ul>
        <li>
          To review your appointment request and contact you to confirm, reschedule or decline it.
        </li>
        <li>
          To maintain the security of the website and prevent misuse, such as spam submissions.
        </li>
        <li>To comply with our legal and professional obligations.</li>
      </ul>
      <p>We do not sell your personal information or use it for unrelated marketing.</p>
      <h2>4. Legal basis</h2>
      <p>
        We process personal information with your consent, which you give when submitting a request,
        and where processing is necessary to take steps at your request before providing a
        healthcare service, in accordance with the Protection of Personal Information Act 4 of 2013
        (POPIA).
      </p>
      <h2>5. Sharing</h2>
      <p>
        Your request is visible only to authorised NOVOMED staff. We use trusted service providers
        (operators) for website hosting and secure data storage, who process information on our
        behalf under appropriate safeguards. We disclose information to others only where the law
        requires it.
      </p>
      <h2>6. Security and retention</h2>
      <p>
        Requests are stored in a secured database with access limited to authorised staff accounts.
        We keep appointment request records only for as long as needed for the purpose for which
        they were collected, or as required by law.
      </p>
      <h2>7. Your rights</h2>
      <p>
        You may ask to access, correct or delete your personal information, or object to its
        processing. See our <Link to="/popia-notice">POPIA Privacy Notice</Link> for details and how
        to lodge a complaint with the Information Regulator.
      </p>
      <h2>8. Changes</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it was last
        revised.
      </p>
    </LegalPage>
  ),
});
