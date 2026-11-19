export const practices = [
  {
    slug: "elsies-river",
    name: "Elsies River Practice",
    area: "Elsies River",
    address: ["Feymon Centre, 286 Halt Road", "Elsies River, 7490"],
    phones: ["021 928 8966", "060 662 7947"],
    email: "elsiesriver@novomed.co.za",
    mapQuery: "Feymon Centre, 286 Halt Road, Elsies River, 7490",
  },
  {
    slug: "hout-bay",
    name: "Hout Bay Practice",
    area: "Hout Bay",
    address: ["9 Victoria Avenue", "Hout Bay, 7806"],
    phones: ["021 790 2340", "083 270 0776"],
    email: "houtbay@novomed.co.za",
    mapQuery: "9 Victoria Avenue, Hout Bay, 7806",
  },
] as const;

export type PracticeSlug = (typeof practices)[number]["slug"];

export const doctors = [
  { slug: "dr-z-a-essop", name: "Dr Z.A. Essop", qualifications: "MBChB (Stell)", registration: "MP0948578" },
  { slug: "dr-m-y-samsodien", name: "Dr M.Y. Samsodien", qualifications: "MBChB (Stell), Dip (HIVMan)", registration: "MP0949990" },
] as const;

export const services = [
  ["general-consultations", "General consultations", "Consultations for everyday health concerns, questions and general check-ups."],
  ["acute-illness", "Acute illness consultations", "Assessment of recent symptoms and short-term illnesses."],
  ["chronic-disease-management", "Chronic disease management", "Ongoing consultations for patients living with long-term conditions."],
  ["hiv-healthcare", "HIV-related healthcare", "Confidential consultations and support for HIV-related healthcare needs."],
  ["preventive-healthcare", "Preventive healthcare", "Health screening conversations and guidance aimed at staying well."],
  ["mens-health", "Men's health", "General medical consultations for men's health concerns."],
  ["womens-health", "Women's health", "General medical consultations for women's health concerns."],
  ["childrens-healthcare", "Children's healthcare", "General medical consultations for children, with a parent or guardian."],
  ["medical-assessments", "General medical assessments", "General assessments where a practitioner evaluation is required."],
  ["medical-referrals", "Medical referrals", "Discussion of when another healthcare provider may be appropriate."],
] as const;

export const practiceNumber = "1202553";
export const telHref = (phone: string) => `tel:+27${phone.replace(/\s/g, "").slice(1)}`;
export const mapsHref = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const mapEmbed = (query: string) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
export const pageMeta = (title: string, description: string) => [
  { title }, { name: "description", content: description }, { property: "og:title", content: title },
  { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
];
