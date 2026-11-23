/**
 * Service catalogue already listed in the project. Descriptions are general patient information
 * and are marked for practitioner review: they do not promise specific tests, treatments or equipment.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  explanation: string[];
  relevantTo: string[];
  consultation: string[];
  patientInfo: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const commonBring =
  "Bring your ID document, medical aid card if you have one, and a list of any medicines you currently use.";

export const services: Service[] = [
  {
    slug: "general-consultations",
    name: "General consultations",
    summary: "Consultations for everyday health concerns, questions and general check-ups.",
    intro:
      "A general consultation is your first point of contact with a doctor for most health concerns — a time to explain what you are experiencing and to be assessed by a general practitioner.",
    explanation: [
      "General practitioners are trained to assess a wide range of health problems in adults and children. During a general consultation the doctor listens to your concern, asks about your health history and examines you where appropriate.",
      "Depending on what is found, the doctor may give advice, prescribe medicine, suggest tests, or recommend a follow-up visit or referral to another healthcare provider.",
    ],
    relevantTo: [
      "New symptoms or health concerns you would like assessed",
      "Questions about your general health or medicines",
      "A routine check-up with a GP",
      "Follow-up after a previous consultation",
    ],
    consultation: [
      "A conversation about your symptoms, history and current medicines",
      "A physical examination where appropriate",
      "Discussion of findings and possible next steps",
      "Advice, prescription, tests or referral where clinically appropriate",
    ],
    patientInfo: [
      commonBring,
      "Write down your questions beforehand so nothing is forgotten during the consultation.",
    ],
    faqs: [
      {
        q: "Do I need a referral to see a GP?",
        a: "No. You can contact either NOVOMED practice directly to request a general consultation.",
      },
      {
        q: "Can I bring a family member?",
        a: "Yes, you are welcome to bring a family member or support person to your consultation.",
      },
    ],
    related: ["acute-illness", "preventive-healthcare", "medical-referrals"],
  },
  {
    slug: "acute-illness",
    name: "Acute illness consultations",
    summary: "Assessment of recent symptoms and short-term illnesses.",
    intro:
      "Acute illness consultations are for health problems that have started recently — such as a fever, sore throat, cough, stomach upset or a minor injury — and that need a doctor's assessment.",
    explanation: [
      "Acute illnesses come on over hours or days. Many are short-lived, but some need treatment or closer monitoring. A GP can assess how unwell you are, look for signs of a more serious problem and advise on treatment and recovery.",
      "If the doctor believes you need urgent hospital care, they will advise you on where to go. Severe symptoms such as chest pain, difficulty breathing or sudden weakness are emergencies and should not wait for a GP appointment.",
    ],
    relevantTo: [
      "Fever, flu-like or cold symptoms",
      "Sore throat, earache or sinus symptoms",
      "Stomach upsets, vomiting or diarrhoea",
      "Recent minor injuries or skin complaints",
    ],
    consultation: [
      "Questions about when symptoms started and how they have changed",
      "An examination focused on your symptoms",
      "Advice on treatment, rest and when to seek further care",
      "A sick note where clinically appropriate",
    ],
    patientInfo: [
      commonBring,
      "If you have had a fever, note your temperature readings and when you took any medicine.",
    ],
    faqs: [
      {
        q: "Can I be seen on the same day?",
        a: "Call your preferred practice directly to ask about availability. An online request is not suitable for urgent concerns.",
      },
      {
        q: "What if my symptoms are severe?",
        a: "For a medical emergency, call 10177 or 112, or go to your nearest emergency unit.",
      },
    ],
    related: ["general-consultations", "childrens-healthcare", "medical-referrals"],
  },
  {
    slug: "chronic-disease-management",
    name: "Chronic disease management",
    summary: "Ongoing consultations for patients living with long-term conditions.",
    intro:
      "Chronic disease management supports people living with long-term conditions through regular review by a general practitioner, with the aim of keeping the condition well controlled.",
    explanation: [
      "Long-term conditions such as high blood pressure, diabetes, asthma or high cholesterol usually need ongoing care rather than a single visit. Regular reviews allow the doctor to check how the condition is responding to treatment and adjust care where needed.",
      "Your GP can also help coordinate care with other healthcare providers and discuss lifestyle changes that may support your health.",
    ],
    relevantTo: [
      "Patients with an existing long-term condition",
      "Patients needing regular review of chronic medicines",
      "Patients newly diagnosed and wanting guidance on next steps",
    ],
    consultation: [
      "Review of your condition, symptoms and current medicines",
      "Relevant measurements or examinations",
      "Discussion of test results and any changes to your care plan",
      "Planning the timing of your next review",
    ],
    patientInfo: [
      commonBring,
      "Bring any recent test results, clinic cards or readings you have recorded at home.",
    ],
    faqs: [
      {
        q: "How often should I be reviewed?",
        a: "This depends on your condition and how stable it is. Your doctor will recommend a suitable interval.",
      },
      {
        q: "Can my chronic medicine be renewed?",
        a: "Prescriptions are issued at the doctor's clinical discretion, usually after a consultation. See Patient Information for prescription enquiries.",
      },
    ],
    related: ["preventive-healthcare", "general-consultations", "medical-assessments"],
  },
  {
    slug: "hiv-healthcare",
    name: "HIV-related healthcare",
    summary: "Confidential consultations and support for HIV-related healthcare needs.",
    intro:
      "NOVOMED offers confidential consultations for HIV-related healthcare needs, including questions about testing, prevention and ongoing care.",
    explanation: [
      "HIV is a manageable long-term condition. With effective treatment, people living with HIV can lead long and healthy lives, and treatment that keeps the virus undetectable also prevents sexual transmission.",
      "A consultation is a confidential space to discuss testing, prevention options, starting or continuing treatment and general health. Dr M.Y. Samsodien holds a Diploma in HIV Management.",
    ],
    relevantTo: [
      "Anyone wanting to discuss HIV testing",
      "People asking about HIV prevention options",
      "People living with HIV who need general medical care or treatment review",
    ],
    consultation: [
      "A private discussion of your questions and health history",
      "Information about testing and what results mean",
      "Discussion of prevention or treatment options where appropriate",
      "Planning follow-up and support",
    ],
    patientInfo: [
      commonBring,
      "All consultations are confidential. You do not need to give details when requesting an appointment online — choose a general category if you prefer.",
    ],
    faqs: [
      {
        q: "Is my information kept private?",
        a: "Yes. Patient confidentiality is a professional and legal obligation. See our POPIA Privacy Notice for how information is protected.",
      },
      {
        q: "Do I have to say why I am booking?",
        a: "No. The appointment request form does not ask for medical details.",
      },
    ],
    related: ["preventive-healthcare", "chronic-disease-management", "general-consultations"],
  },
  {
    slug: "preventive-healthcare",
    name: "Preventive healthcare",
    summary: "Health screening conversations and guidance aimed at staying well.",
    intro:
      "Preventive healthcare focuses on staying well — identifying risks early and discussing screening and healthy habits with your GP before problems develop.",
    explanation: [
      "Many health conditions can be detected early, sometimes before symptoms appear. Your GP can discuss which screening checks may be appropriate for your age, sex, family history and lifestyle.",
      "A preventive consultation is also an opportunity to talk about weight, activity, smoking, alcohol and other factors that affect long-term health.",
    ],
    relevantTo: [
      "Adults wanting a general health check",
      "People with a family history of conditions such as heart disease or diabetes",
      "Anyone wanting advice on healthier habits",
    ],
    consultation: [
      "Discussion of your health history, family history and lifestyle",
      "Relevant measurements such as blood pressure",
      "Advice on screening that may be appropriate for you",
      "Agreed next steps",
    ],
    patientInfo: [
      commonBring,
      "Find out what you can about your family's medical history before the visit.",
    ],
    faqs: [
      {
        q: "Which screening tests do I need?",
        a: "This depends on your individual risk factors. Your doctor will discuss what is appropriate for you.",
      },
      {
        q: "Is a check-up worthwhile if I feel well?",
        a: "Some conditions, such as high blood pressure, often cause no symptoms. A check-up can help identify them early.",
      },
    ],
    related: ["general-consultations", "chronic-disease-management", "mens-health"],
  },
  {
    slug: "mens-health",
    name: "Men's health",
    summary: "General medical consultations for men's health concerns.",
    intro:
      "Men's health consultations provide a straightforward, confidential setting to discuss health concerns that affect men, from general wellbeing to more personal questions.",
    explanation: [
      "Men are often less likely to visit a doctor until a problem becomes serious. A GP consultation can address concerns early and cover general health, sexual and urinary health, and mental wellbeing.",
      "Your doctor can also discuss age-appropriate screening and refer you to a specialist where needed.",
    ],
    relevantTo: [
      "Men with a specific health concern",
      "Men wanting a general health review",
      "Men with questions about sexual, urinary or mental health",
    ],
    consultation: [
      "A private discussion of your concerns",
      "Examination where appropriate",
      "Advice on tests, treatment or screening",
      "Referral if specialist input is needed",
    ],
    patientInfo: [commonBring],
    faqs: [
      {
        q: "Will I see a male doctor?",
        a: "Please ask the practice about practitioner availability when you call to confirm your appointment.",
      },
    ],
    related: ["preventive-healthcare", "general-consultations", "hiv-healthcare"],
  },
  {
    slug: "womens-health",
    name: "Women's health",
    summary: "General medical consultations for women's health concerns.",
    intro:
      "Women's health consultations offer general medical care for concerns that affect women at different stages of life, in a respectful and confidential setting.",
    explanation: [
      "A GP can assess and advise on a wide range of women's health concerns and general wellbeing, and can discuss screening that may be appropriate for your age and history.",
      "Where specialist care is needed, your doctor can discuss referral options with you.",
    ],
    relevantTo: [
      "Women with a specific health concern",
      "Women wanting a general health review",
      "Questions about screening appropriate to your age",
    ],
    consultation: [
      "A private discussion of your concerns and history",
      "Examination where appropriate, with your consent",
      "Advice on tests, treatment or screening",
      "Referral if specialist input is needed",
    ],
    patientInfo: [commonBring, "You are welcome to ask for a chaperone during any examination."],
    faqs: [
      {
        q: "Can I bring someone with me?",
        a: "Yes, you are welcome to bring a support person to your consultation.",
      },
    ],
    related: ["preventive-healthcare", "general-consultations", "childrens-healthcare"],
  },
  {
    slug: "childrens-healthcare",
    name: "Children's healthcare",
    summary: "General medical consultations for children, with a parent or guardian.",
    intro:
      "Children's healthcare consultations provide general medical assessment for babies, children and teenagers, with a parent or guardian present.",
    explanation: [
      "Children often become unwell quickly and can recover just as quickly. A GP can assess common childhood illnesses, advise on care at home and identify warning signs that need urgent attention.",
      "Your doctor can also answer questions about general health and development and refer to a paediatrician where needed.",
    ],
    relevantTo: [
      "Children with a recent illness such as fever, cough or rash",
      "General health questions about your child",
      "Follow-up after a previous childhood illness",
    ],
    consultation: [
      "Discussion with the parent or guardian, and the child where appropriate",
      "Examination suited to the child's age",
      "Advice on treatment and care at home",
      "Guidance on warning signs and when to return",
    ],
    patientInfo: [
      "Bring your child's Road to Health booklet if you have it, your medical aid card if applicable, and a list of any medicines your child takes.",
      "A parent or legal guardian should accompany children to consultations.",
    ],
    faqs: [
      {
        q: "My child has a very high fever or is struggling to breathe — what should I do?",
        a: "Treat this as an emergency. Call 10177 or 112, or go to your nearest emergency unit.",
      },
    ],
    related: ["acute-illness", "general-consultations", "preventive-healthcare"],
  },
  {
    slug: "medical-assessments",
    name: "General medical assessments",
    summary: "General assessments where a practitioner evaluation is required.",
    intro:
      "General medical assessments are consultations in which a doctor evaluates your health for a specific purpose and records the findings.",
    explanation: [
      "Some situations call for a doctor's assessment of your general health. The doctor will take a history, examine you and record findings relevant to the purpose of the assessment.",
      "Please contact the practice before booking to confirm whether the specific assessment or form you need can be completed at NOVOMED.",
    ],
    relevantTo: [
      "Patients who need a general health evaluation",
      "Patients asked to have a form completed by a doctor (please confirm with the practice first)",
    ],
    consultation: [
      "A health history and examination",
      "Recording of relevant findings",
      "Discussion of any concerns identified",
    ],
    patientInfo: [
      commonBring,
      "Bring any forms that need to be completed, and confirm with the practice beforehand that they can be done.",
    ],
    faqs: [
      {
        q: "Can any form be completed?",
        a: "Please call the practice first to confirm whether your specific assessment can be done at NOVOMED.",
      },
    ],
    related: ["general-consultations", "preventive-healthcare", "medical-referrals"],
  },
  {
    slug: "medical-referrals",
    name: "Medical referrals",
    summary: "Discussion of when another healthcare provider may be appropriate.",
    intro:
      "Your GP can advise when care from another healthcare provider — such as a specialist, hospital or allied health professional — may be appropriate, and arrange a referral.",
    explanation: [
      "Part of a general practitioner's role is to recognise when a health problem needs specialist assessment or further investigation. Your doctor will explain why a referral is recommended and what to expect.",
      "Some medical aid plans require a GP referral before you see a specialist. Check your plan's rules with your medical aid.",
    ],
    relevantTo: [
      "Patients whose condition needs specialist assessment",
      "Patients whose medical aid requires a GP referral",
      "Patients returning after specialist or hospital care",
    ],
    consultation: [
      "Assessment of your condition by the GP",
      "Discussion of whether a referral is appropriate",
      "A referral letter where clinically indicated",
      "Follow-up after specialist care",
    ],
    patientInfo: [
      commonBring,
      "Bring any letters or reports from previous specialist or hospital visits.",
    ],
    faqs: [
      {
        q: "Can I get a referral without a consultation?",
        a: "Referrals are issued after the doctor has assessed you, so a consultation is normally required.",
      },
    ],
    related: ["general-consultations", "chronic-disease-management", "medical-assessments"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
