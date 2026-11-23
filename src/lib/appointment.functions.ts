import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { MIN_FILL_MS, appointmentReference, appointmentSchema } from "./appointment";

// On Lovable hosting SUPABASE_* are injected at runtime. On Vercel they may not be set, so fall back
// to the public (publishable) values that Vite inlines at build time. Neither value is a secret.
const supabaseUrl = () => process.env["SUPABASE_URL"] || import.meta.env["VITE_SUPABASE_URL"];
const supabaseKey = () =>
  process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

export const submitAppointmentRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    const requestId = data.requestId ?? crypto.randomUUID();
    const reference = appointmentReference(requestId);

    // Spam protection: a filled honeypot or an implausibly fast submission is quietly accepted
    // without being stored, so bots get no signal to adapt to.
    if (data.website) return { ok: true, reference };
    if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) return { ok: true, reference };

    const url = supabaseUrl();
    const key = supabaseKey();
    if (!url || !key)
      throw new Error(
        "Appointment requests are temporarily unavailable. Please call the practice.",
      );

    const db = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await db.from("appointment_requests").insert({
      id: requestId,
      first_name: data.firstName,
      surname: data.surname,
      phone: data.phone,
      email: data.email || null,
      practice: data.practice,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      category: data.category,
      contact_method: data.contactMethod,
      privacy_consent: true,
    });

    // Duplicate submission protection: the request ID is generated once per form, so a double
    // click or retry hits the primary key and is treated as the same, already-received request.
    if (error && error.code !== "23505") {
      console.error("Appointment request insert failed", error.code);
      throw new Error("We could not send your request. Please call the practice.");
    }
    return { ok: true, reference };
  });
