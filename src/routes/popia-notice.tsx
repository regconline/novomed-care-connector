import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/popia-notice")({
  head: () =>
    pageHead({
      title: "POPIA Privacy Notice | NOVOMED General Practitioners",
      description:
        "NOVOMED's notice under the Protection of Personal Information Act (POPIA): your rights as a data subject and how to exercise them.",
      path: "/popia-notice",
      breadcrumbs: [{ name: "POPIA Privacy Notice", path: "/popia-notice" }],
    }),
  component: () => (
    <LegalPage
      title="POPIA Privacy Notice"
      intro="Information provided in terms of section 18 of the Protection of Personal Information Act 4 of 2013 (POPIA)."
    >
      <h2>Responsible party</h2>
      <p>
        NOVOMED General Practitioners is the responsible party for personal information collected
        through this website and at our practices. Requests relating to personal information can be
        directed to the practice using the contact details below.
      </p>
      <h2>Purpose of collection</h2>
      <p>
        Personal information submitted through this website is collected to respond to appointment
        requests and enquiries. Information collected during consultations is used to provide
        healthcare and to meet legal and professional record-keeping obligations.
      </p>
      <h2>Is providing information voluntary?</h2>
      <p>
        Yes. However, we cannot respond to an appointment request without your name and a way to
        contact you.
      </p>
      <h2>Special personal information</h2>
      <p>
        Health information is special personal information under POPIA. We process it only as
        permitted by POPIA and the ethical rules of the Health Professions Council of South Africa,
        and we do not request it through this website.
      </p>
      <h2>Your rights as a data subject</h2>
      <ul>
        <li>
          To be told whether we hold personal information about you, and to request access to it.
        </li>
        <li>
          To request correction or deletion of information that is inaccurate, irrelevant,
          excessive, out of date, incomplete, misleading or unlawfully obtained.
        </li>
        <li>To object to the processing of your personal information on reasonable grounds.</li>
        <li>To withdraw consent, where processing is based on consent.</li>
        <li>To lodge a complaint with the Information Regulator.</li>
      </ul>
      <h2>Cross-border transfers</h2>
      <p>
        Our website hosting and database providers may store or process information on servers
        outside South Africa. Where this happens, we rely on providers that are subject to laws or
        binding agreements that provide an adequate level of protection, as required by section 72
        of POPIA.
      </p>
      <h2>The Information Regulator</h2>
      <p>
        If you believe your personal information has been handled unlawfully, you may lodge a
        complaint with the Information Regulator (South Africa). Contact details are available at{" "}
        <a href="https://inforegulator.org.za" target="_blank" rel="noreferrer">
          inforegulator.org.za
        </a>
        . We encourage you to contact us first so that we can try to resolve your concern.
      </p>
    </LegalPage>
  ),
});
