import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    pageHead({
      title: "Cookie Policy | NOVOMED General Practitioners",
      description: "How the NOVOMED website uses cookies and similar technologies.",
      path: "/cookie-policy",
      breadcrumbs: [{ name: "Cookie Policy", path: "/cookie-policy" }],
    }),
  component: () => (
    <LegalPage
      title="Cookie Policy"
      intro="How this website uses cookies and similar browser storage."
    >
      <h2>Our approach</h2>
      <p>
        This website does not use advertising cookies, and it does not use analytics or tracking
        cookies to profile visitors.
      </p>
      <h2>Strictly necessary storage</h2>
      <p>
        Authorised staff who sign in to the staff area are kept signed in using secure browser
        storage. This is necessary for the staff area to work and is not used for any other purpose.
        Public visitors who do not sign in are not affected.
      </p>
      <h2>Third-party content</h2>
      <p>
        Practice pages include embedded Google Maps. When a map loads, Google may set its own
        cookies or collect technical information under its own privacy policy. You can avoid this by
        using the "Directions" links instead, or by blocking third-party cookies in your browser.
      </p>
      <h2>Managing cookies</h2>
      <p>
        You can clear or block cookies and site data in your browser settings. Blocking strictly
        necessary storage may prevent the staff sign-in from working.
      </p>
      <h2>Changes</h2>
      <p>
        If we introduce analytics or other non-essential cookies in future, we will update this
        policy and, where required, ask for your consent first.
      </p>
    </LegalPage>
  ),
});
