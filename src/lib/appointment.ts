import { z } from "zod";
export const appointmentCategories = ["General consultation", "Acute illness", "Chronic condition follow-up", "Preventive health", "Child consultation", "Other general enquiry"] as const;
const today = () => new Date().toISOString().slice(0, 10);
export const appointmentSchema = z.object({
  firstName: z.string().trim().min(1, "Enter a first name").max(80),
  surname: z.string().trim().min(1, "Enter a surname").max(80),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,25}$/, "Enter a valid contact number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
  practice: z.enum(["elsies-river", "hout-bay"], { message: "Choose a practice" }),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date").refine((v) => v >= today(), "Choose today or a future date"),
  preferredTime: z.enum(["morning", "midday", "afternoon"], { message: "Choose a time" }),
  category: z.enum(appointmentCategories, { message: "Choose a category" }),
  contactMethod: z.enum(["phone", "email", "sms"], { message: "Choose a contact method" }),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  website: z.string().max(0).optional(),
}).refine((v) => v.contactMethod !== "email" || v.email !== "", { path: ["email"], message: "Add an email to be contacted by email" });
export type AppointmentInput = z.infer<typeof appointmentSchema>;
