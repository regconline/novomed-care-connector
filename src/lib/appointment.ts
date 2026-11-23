import { z } from "zod";

/** Appointment categories confirmed for online requests. Keep in step with the practice's service list. */
export const appointmentCategories = [
  "General consultation",
  "Acute illness",
  "Chronic condition follow-up",
  "Preventive health",
  "Child consultation",
  "Other general enquiry",
] as const;

export const categoryDescriptions: Record<(typeof appointmentCategories)[number], string> = {
  "General consultation": "Everyday health concerns, questions or a check-up.",
  "Acute illness": "Recent symptoms such as fever, cough or stomach upset.",
  "Chronic condition follow-up": "Review of a long-term condition or chronic medicine.",
  "Preventive health": "Screening conversations and staying well.",
  "Child consultation": "A consultation for a child, with a parent or guardian.",
  "Other general enquiry": "Not sure? The practice will help you choose.",
};

/** Time ranges only — there is no live scheduling system, so no specific slots are offered. */
export const timePreferences = [
  { value: "morning", label: "Morning", hint: "Earlier in the day" },
  { value: "midday", label: "Midday", hint: "Around lunchtime" },
  { value: "afternoon", label: "Afternoon", hint: "Later in the day" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
] as const;

export const BOOKING_WINDOW_DAYS = 90;
export const MIN_FILL_MS = 4000;

/** Today's date in Cape Town as YYYY-MM-DD. */
export const todayInSA = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

const isCalendarDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const maxDate = () => {
  const d = new Date(`${todayInSA()}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + BOOKING_WINDOW_DAYS);
  return d.toISOString().slice(0, 10);
};

export const appointmentSchema = z
  .object({
    requestId: z.string().uuid().optional(),
    firstName: z.string().trim().min(1, "Enter a first name").max(80),
    surname: z.string().trim().min(1, "Enter a surname").max(80),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9 ()-]{7,25}$/, "Enter a valid contact number"),
    email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
    practice: z.enum(["elsies-river", "hout-bay"], { message: "Choose a practice" }),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
      .refine(isCalendarDate, "Choose a valid date")
      .refine((v) => v >= todayInSA(), "Choose today or a future date")
      .refine((v) => v <= maxDate(), `Choose a date within the next ${BOOKING_WINDOW_DAYS} days`),
    preferredTime: z.enum(["morning", "midday", "afternoon"], { message: "Choose a time" }),
    category: z.enum(appointmentCategories, { message: "Choose a category" }),
    contactMethod: z.enum(["phone", "email", "sms"], { message: "Choose a contact method" }),
    privacyConsent: z.literal(true, {
      errorMap: () => ({ message: "Please accept the privacy notice" }),
    }),
    website: z.string().max(200).optional(),
    startedAt: z.number().int().positive().optional(),
  })
  .refine((v) => v.contactMethod !== "email" || v.email !== "", {
    path: ["email"],
    message: "Add an email address to be contacted by email",
  });

export const appointmentReference = (id: string) =>
  `NOV-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
export const referencePattern = /^NOV-[0-9A-F]{8}$/;
export type AppointmentInput = z.infer<typeof appointmentSchema>;

/** Staff-facing statuses. The database default "new" is shown as Pending. */
export const bookingStatuses = [
  { value: "new", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
] as const;
export type BookingStatus = (typeof bookingStatuses)[number]["value"];
export const statusLabel = (s: string) => bookingStatuses.find((b) => b.value === s)?.label ?? s;
