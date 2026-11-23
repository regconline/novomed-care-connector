/**
 * Verified NOVOMED practice and doctor facts. Every page reads from here so contact
 * details, registration numbers and addresses stay consistent across the site.
 * Do not add opening hours, coordinates, reviews or credentials that the practice has not confirmed.
 */

export const practiceName = "NOVOMED General Practitioners";
export const practiceNumber = "1202553";

/** Production URL for canonical links, sitemap and structured data. Set VITE_SITE_URL in Vercel. */
export const siteUrl = (
  (import.meta.env["VITE_SITE_URL"] as string | undefined) ||
  "https://novomed-care-connector.lovable.app"
).replace(/\/$/, "");

export const practices = [
  {
    slug: "elsies-river",
    name: "Elsies River Practice",
    area: "Elsies River",
    street: "Feymon Centre, 286 Halt Road",
    shortAddress: "Feymon Centre, 286 Halt Road",
    locality: "Elsies River",
    postalCode: "7490",
    address: ["Feymon Centre, 286 Halt Road", "Elsies River, 7490"],
    phones: ["021 928 8966", "060 662 7947"],
    email: "elsiesriver@novomed.co.za",
    mapQuery: "Feymon Centre, 286 Halt Road, Elsies River, 7490",
    intro:
      "Our Elsies River practice is located in the Feymon Centre on Halt Road, serving individuals and families in Elsies River and the surrounding northern suburbs of Cape Town.",
    directions:
      "The practice is in the Feymon Centre at 286 Halt Road. Use the map link for turn-by-turn directions, and call the practice if you need help finding the entrance.",
  },
  {
    slug: "hout-bay",
    name: "Hout Bay Practice",
    area: "Hout Bay",
    street: "9 Victoria Avenue",
    shortAddress: "9 Victoria Avenue",
    locality: "Hout Bay",
    postalCode: "7806",
    address: ["9 Victoria Avenue", "Hout Bay, 7806"],
    phones: ["021 790 2340", "083 270 0776"],
    email: "houtbay@novomed.co.za",
    mapQuery: "9 Victoria Avenue, Hout Bay, 7806",
    intro:
      "Our Hout Bay practice on Victoria Avenue provides general medical consultations for residents of Hout Bay and the surrounding Atlantic seaboard communities.",
    directions:
      "The practice is at 9 Victoria Avenue, Hout Bay. Use the map link for turn-by-turn directions, and call the practice if you need help on arrival.",
  },
] as const;

export type Practice = (typeof practices)[number];
export type PracticeSlug = Practice["slug"];
export const getPractice = (slug: string) => practices.find((p) => p.slug === slug);

/** Opening hours have not been confirmed by the practice. Leave null until they are. */
export const openingHours: Record<PracticeSlug, null | { days: string; hours: string }[]> = {
  "elsies-river": null,
  "hout-bay": null,
};

export const doctors = [
  {
    slug: "dr-z-a-essop",
    name: "Dr Z.A. Essop",
    shortName: "Dr Essop",
    qualifications: "MBChB (Stell)",
    qualificationList: [
      "MBChB — Bachelor of Medicine and Bachelor of Surgery, Stellenbosch University",
    ],
    registration: "MP0948578",
    role: "General Practitioner",
    bio: [
      "Dr Z.A. Essop is a general practitioner at NOVOMED General Practitioners. Dr Essop qualified in medicine (MBChB) at Stellenbosch University and is registered with the Health Professions Council of South Africa.",
      "As a general practitioner, Dr Essop consults on a broad range of everyday health concerns, from recent illnesses to ongoing health questions, and can advise when further tests or a referral to another healthcare provider may be appropriate.",
    ],
  },
  {
    slug: "dr-m-y-samsodien",
    name: "Dr M.Y. Samsodien",
    shortName: "Dr Samsodien",
    qualifications: "MBChB (Stell), Dip (HIVMan)",
    qualificationList: [
      "MBChB — Bachelor of Medicine and Bachelor of Surgery, Stellenbosch University",
      "Dip (HIVMan) — Diploma in HIV Management",
    ],
    registration: "MP0949990",
    role: "General Practitioner",
    bio: [
      "Dr M.Y. Samsodien is a general practitioner at NOVOMED General Practitioners. Dr Samsodien qualified in medicine (MBChB) at Stellenbosch University, holds a Diploma in HIV Management and is registered with the Health Professions Council of South Africa.",
      "Dr Samsodien consults on general medical concerns for adults and families. The additional diploma in HIV management supports confidential consultations for patients with HIV-related healthcare needs.",
    ],
  },
] as const;

export type Doctor = (typeof doctors)[number];
export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);

export const telHref = (phone: string) => `tel:+27${phone.replace(/\D/g, "").replace(/^0/, "")}`;
export const intlPhone = (phone: string) => `+27 ${phone.replace(/^0/, "")}`;
export const mapsHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const mapEmbed = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const emergencyNote =
  "In a medical emergency, do not use this website. Call 10177 or 112, or go to your nearest emergency unit.";
