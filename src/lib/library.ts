/**
 * Starter health library. General educational information only — every article is marked
 * as awaiting practitioner review and must be approved by a NOVOMED doctor before it is relied on.
 */
export const categories = [
  { slug: "general-health", name: "General health" },
  { slug: "hiv-sexual-health", name: "HIV and sexual health" },
  { slug: "mens-health", name: "Men's health" },
  { slug: "womens-health", name: "Women's health" },
  { slug: "childrens-health", name: "Children's health" },
  { slug: "chronic-conditions", name: "Chronic conditions" },
  { slug: "preventive-healthcare", name: "Preventive healthcare" },
  { slug: "healthy-living", name: "Healthy living" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
export type Article = {
  slug: string;
  category: CategorySlug;
  title: string;
  description: string;
  readMinutes: number;
  sections: { heading: string; body: string[]; list?: string[] }[];
  seeDoctor: string[];
};

export const articles: Article[] = [
  {
    slug: "when-to-see-a-gp",
    category: "general-health",
    title: "When should you see a GP?",
    description:
      "How to decide whether a symptom can be managed at home, needs a GP consultation or is an emergency.",
    readMinutes: 4,
    sections: [
      {
        heading: "Your GP as a first point of contact",
        body: [
          "A general practitioner (GP) is trained to assess most everyday health problems in adults and children. For many concerns, a GP is the right first step — they can treat the problem, arrange tests, or refer you to a specialist when needed.",
        ],
      },
      {
        heading: "Usually manageable at home",
        body: [
          "Many minor illnesses improve on their own with rest, fluids and over-the-counter medicine recommended by a pharmacist, for example:",
        ],
        list: [
          "A mild cold without a high fever",
          "A minor cut or bruise",
          "Mild indigestion that settles quickly",
        ],
      },
      {
        heading: "A good time to see a GP",
        body: [
          "Book a consultation if symptoms are not improving, are getting worse, or are worrying you. Examples include:",
        ],
        list: [
          "A fever lasting more than two to three days",
          "A cough lasting more than three weeks",
          "Unexplained weight loss or ongoing tiredness",
          "A new lump, or a mole that has changed",
          "Questions about long-term medicines or conditions",
        ],
      },
    ],
    seeDoctor: [
      "Chest pain, severe difficulty breathing, sudden weakness on one side of the body, or loss of consciousness are emergencies. Call 10177 or 112, or go to your nearest emergency unit.",
    ],
  },
  {
    slug: "hiv-testing-and-prevention",
    category: "hiv-sexual-health",
    title: "HIV testing and prevention: what you should know",
    description:
      "Why regular HIV testing matters, what prevention options exist, and how treatment changes outcomes.",
    readMinutes: 5,
    sections: [
      {
        heading: "Why testing matters",
        body: [
          "Knowing your HIV status is the first step to staying healthy. Many people with HIV feel well for years, so testing is the only way to know. Early diagnosis means treatment can start sooner, protecting your immune system.",
        ],
      },
      {
        heading: "Ways to reduce your risk",
        body: ["Several effective prevention methods exist and can be combined:"],
        list: [
          "Using condoms consistently and correctly",
          "Pre-exposure prophylaxis (PrEP) — medicine taken by HIV-negative people at higher risk",
          "Post-exposure prophylaxis (PEP) — medicine started as soon as possible, and within 72 hours, after a possible exposure",
          "Regular testing for you and your partner(s)",
        ],
      },
      {
        heading: "Treatment works",
        body: [
          "Antiretroviral treatment (ART) allows people living with HIV to live long, healthy lives. When treatment keeps the virus at undetectable levels, HIV is not transmitted sexually — often described as 'undetectable equals untransmittable' (U=U).",
        ],
      },
    ],
    seeDoctor: [
      "If you think you may have been exposed to HIV, seek care immediately — PEP is most effective the sooner it is started.",
      "Consultations at NOVOMED are confidential.",
    ],
  },
  {
    slug: "mens-health-checks",
    category: "mens-health",
    title: "Men's health: checks worth discussing with your doctor",
    description:
      "Common health risks for men and the routine checks that can help detect problems early.",
    readMinutes: 4,
    sections: [
      {
        heading: "Why men's health deserves attention",
        body: [
          "Men are often less likely to visit a doctor until a problem is advanced. Conditions such as high blood pressure, diabetes and high cholesterol can develop without symptoms, so regular checks matter.",
        ],
      },
      {
        heading: "Checks to discuss",
        body: [
          "Your GP can advise which checks suit your age, family history and lifestyle. Common topics include:",
        ],
        list: [
          "Blood pressure",
          "Blood sugar and cholesterol",
          "Weight and waist measurement",
          "Prostate health, particularly from middle age or with a family history",
          "Mental health and stress",
        ],
      },
      {
        heading: "Mental wellbeing",
        body: [
          "Low mood, irritability, poor sleep or increased alcohol use can be signs of depression or stress. Talking to a doctor is a practical first step — support and treatment are available.",
        ],
      },
    ],
    seeDoctor: [
      "See a doctor about difficulty passing urine, blood in the urine, a lump in the testicles, or persistent low mood.",
    ],
  },
  {
    slug: "womens-health-screening",
    category: "womens-health",
    title: "Women's health: understanding routine screening",
    description:
      "An overview of screening that women may discuss with their GP at different stages of life.",
    readMinutes: 4,
    sections: [
      {
        heading: "Screening can save lives",
        body: [
          "Screening looks for early signs of disease before symptoms appear. For women, some of the most important screening relates to cervical and breast health, as well as general checks like blood pressure.",
        ],
      },
      {
        heading: "Topics to raise with your GP",
        body: [
          "Which screening is right for you depends on your age, history and risk factors. Ask your doctor about:",
        ],
        list: [
          "Cervical screening (Pap smear or HPV testing)",
          "Breast awareness and when breast imaging may be appropriate",
          "Blood pressure, blood sugar and cholesterol checks",
          "Contraception and family planning",
          "Bone health, particularly after menopause",
        ],
      },
      {
        heading: "Know what is normal for you",
        body: [
          "Being familiar with how your body usually looks and feels helps you notice changes early — such as a breast lump, unusual bleeding or pelvic pain — and seek advice promptly.",
        ],
      },
    ],
    seeDoctor: [
      "See a doctor about a new breast lump, bleeding between periods or after menopause, or persistent pelvic pain.",
    ],
  },
  {
    slug: "fever-in-children",
    category: "childrens-health",
    title: "Fever in children: when to worry",
    description:
      "How to care for a child with a fever at home and the warning signs that need urgent medical attention.",
    readMinutes: 4,
    sections: [
      {
        heading: "What a fever means",
        body: [
          "A fever is usually a sign that the body is fighting an infection, often a virus. Most fevers in children settle within a few days. How your child is behaving is often more important than the exact temperature.",
        ],
      },
      {
        heading: "Caring for your child at home",
        body: [],
        list: [
          "Offer fluids often to prevent dehydration",
          "Dress your child in light clothing",
          "Use paracetamol or ibuprofen only as directed on the package or by a pharmacist or doctor",
          "Let your child rest, and check on them regularly, including at night",
        ],
      },
      {
        heading: "Warning signs",
        body: ["Seek urgent medical care if your child:"],
        list: [
          "Is under three months old with a temperature of 38°C or higher",
          "Has difficulty breathing, or is unusually drowsy or hard to wake",
          "Has a rash that does not fade when pressed with a glass",
          "Has a seizure (fit)",
          "Shows signs of dehydration, such as very few wet nappies",
        ],
      },
    ],
    seeDoctor: [
      "See a GP if a fever lasts more than two to three days or you are worried. For any of the warning signs above, go to your nearest emergency unit or call 10177 or 112.",
    ],
  },
  {
    slug: "living-with-high-blood-pressure",
    category: "chronic-conditions",
    title: "Living with high blood pressure",
    description:
      "What high blood pressure is, why it matters and how it is usually managed over the long term.",
    readMinutes: 5,
    sections: [
      {
        heading: "A silent condition",
        body: [
          "High blood pressure (hypertension) usually causes no symptoms, yet over time it increases the risk of heart attack, stroke and kidney disease. It is common in South Africa, which is why regular checks are important.",
        ],
      },
      {
        heading: "How it is managed",
        body: [
          "Management is tailored to each person and often combines lifestyle changes with medicine:",
        ],
        list: [
          "Reducing salt intake",
          "Being physically active most days",
          "Maintaining a healthy weight",
          "Limiting alcohol and stopping smoking",
          "Taking prescribed medicine every day, even when you feel well",
        ],
      },
      {
        heading: "Regular reviews",
        body: [
          "Your doctor will check your blood pressure at follow-up visits and may adjust treatment. If you have a home monitor, keep a record of your readings and bring it to your appointments.",
        ],
      },
    ],
    seeDoctor: [
      "Do not stop blood pressure medicine without speaking to your doctor.",
      "A sudden severe headache, chest pain, confusion or weakness can be an emergency — call 10177 or 112.",
    ],
  },
  {
    slug: "adult-health-screening",
    category: "preventive-healthcare",
    title: "A guide to adult health screening",
    description:
      "Why preventive check-ups matter and which common screening tests adults may discuss with their GP.",
    readMinutes: 4,
    sections: [
      {
        heading: "Prevention is better than cure",
        body: [
          "Preventive healthcare aims to find health risks early, when they are easier to manage. A check-up with your GP can identify problems before they cause symptoms.",
        ],
      },
      {
        heading: "Common screening topics",
        body: [
          "Your doctor will recommend screening based on your age, sex, family history and lifestyle. Common examples include:",
        ],
        list: [
          "Blood pressure",
          "Blood sugar (for diabetes)",
          "Cholesterol",
          "HIV testing",
          "Cervical screening for women",
          "Weight and body mass index",
        ],
      },
      {
        heading: "Family history matters",
        body: [
          "Some conditions run in families. Before your check-up, find out whether close relatives have had heart disease, diabetes, stroke or cancer, and share this with your doctor.",
        ],
      },
    ],
    seeDoctor: [
      "Ask your GP how often you should be screened — the right interval differs from person to person.",
    ],
  },
  {
    slug: "everyday-healthy-habits",
    category: "healthy-living",
    title: "Small daily habits that support long-term health",
    description:
      "Practical, realistic habits around activity, eating, sleep and stress that support your health.",
    readMinutes: 4,
    sections: [
      {
        heading: "Move more",
        body: [
          "Regular physical activity supports heart health, mood and weight. Aim for about 150 minutes of moderate activity per week — a brisk 30-minute walk on five days is a good start.",
        ],
      },
      {
        heading: "Eat with balance",
        body: [],
        list: [
          "Fill half your plate with vegetables and fruit",
          "Choose whole grains over refined starches",
          "Cut down on salt, sugary drinks and processed foods",
          "Drink water regularly through the day",
        ],
      },
      {
        heading: "Rest and recover",
        body: [
          "Most adults need seven to nine hours of sleep. Regular sleep and wake times, less screen time before bed and limiting caffeine later in the day can help.",
        ],
      },
      {
        heading: "Look after your mind",
        body: [
          "Stress affects physical health too. Staying connected with others, spending time outdoors and talking openly about how you feel can make a real difference.",
        ],
      },
    ],
    seeDoctor: [
      "If you have a health condition, speak to your doctor before starting a new exercise programme or making major diet changes.",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? "";
