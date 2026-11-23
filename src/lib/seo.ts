import {
  doctors,
  practiceName,
  practiceNumber,
  practices,
  siteUrl,
  type Doctor,
  type Practice,
} from "./site";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  jsonLd?: object[];
  breadcrumbs?: { name: string; path: string }[];
};

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "/" : path}`;
const defaultImage = "/og/novomed-og.jpg";

/** Builds the full head for a page: title, description, canonical, Open Graph, Twitter and JSON-LD. */
export function pageHead({
  title,
  description,
  path,
  image = defaultImage,
  type = "website",
  noindex,
  jsonLd = [],
  breadcrumbs,
}: HeadInput) {
  const url = absoluteUrl(path);
  const img = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const graph = [...jsonLd];
  if (breadcrumbs?.length) graph.push(breadcrumbLd([{ name: "Home", path: "/" }, ...breadcrumbs]));
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
      },
      { property: "og:site_name", content: practiceName },
      { property: "og:locale", content: "en_ZA" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "NOVOMED General Practitioners — Elsies River and Hout Bay, Cape Town",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: graph.map((item) => ({ type: "application/ld+json", children: JSON.stringify(item) })),
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const phoneE164 = (p: string) => `+27${p.replace(/\D/g, "").replace(/^0/, "")}`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "Organization"],
  "@id": `${siteUrl}/#organization`,
  name: practiceName,
  alternateName: "NOVOMED",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/novomed-logo.png`,
  identifier: { "@type": "PropertyValue", name: "Practice number", value: practiceNumber },
  medicalSpecialty: "PrimaryCare",
  department: practices.map((p) => ({ "@id": `${siteUrl}/practices/${p.slug}#clinic` })),
  member: doctors.map((d) => ({ "@id": `${siteUrl}/doctors/${d.slug}#physician` })),
});

export const clinicLd = (practice: Practice) => ({
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": `${siteUrl}/practices/${practice.slug}#clinic`,
  name: `NOVOMED General Practitioners — ${practice.area}`,
  url: `${siteUrl}/practices/${practice.slug}`,
  image: `${siteUrl}/og/novomed-og.jpg`,
  telephone: practice.phones.map(phoneE164),
  email: practice.email,
  medicalSpecialty: "PrimaryCare",
  parentOrganization: { "@id": `${siteUrl}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: practice.street,
    addressLocality: practice.locality,
    addressRegion: "Western Cape",
    postalCode: practice.postalCode,
    addressCountry: "ZA",
  },
  areaServed: { "@type": "City", name: "Cape Town" },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practice.mapQuery)}`,
});

export const physicianLd = (doctor: Doctor) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${siteUrl}/doctors/${doctor.slug}#physician`,
  name: doctor.name,
  url: `${siteUrl}/doctors/${doctor.slug}`,
  medicalSpecialty: "PrimaryCare",
  hasCredential: doctor.qualificationList.map((q) => ({
    "@type": "EducationalOccupationalCredential",
    name: q,
  })),
  identifier: { "@type": "PropertyValue", name: "HPCSA registration", value: doctor.registration },
  memberOf: { "@id": `${siteUrl}/#organization` },
});

export const articleLd = (a: { title: string; description: string; slug: string }) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  headline: a.title,
  description: a.description,
  url: `${siteUrl}/health-library/${a.slug}`,
  inLanguage: "en-ZA",
  publisher: { "@id": `${siteUrl}/#organization` },
  audience: { "@type": "PeopleAudience", audienceType: "Patient" },
});
