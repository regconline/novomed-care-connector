import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { appointmentReference, appointmentSchema } from "./appointment";

export const submitAppointmentRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, reference: null };
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Appointment requests are temporarily unavailable.");
    const requestId = crypto.randomUUID();
    const db = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => { const h = new Headers(init?.headers); if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization"); h.set("apikey", key); return fetch(input, { ...init, headers: h }); } },
    });
    const { error } = await db.from("appointment_requests").insert({
      id: requestId,
      first_name: data.firstName, surname: data.surname, phone: data.phone, email: data.email || null,
      practice: data.practice, preferred_date: data.preferredDate, preferred_time: data.preferredTime,
      category: data.category, contact_method: data.contactMethod, privacy_consent: true,
    });
    if (error) { console.error("Appointment request insert failed", error.code); throw new Error("We could not send your request. Please call the practice."); }
    return { ok: true, reference: appointmentReference(requestId) };
  });
