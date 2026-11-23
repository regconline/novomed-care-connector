import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appointmentCategories, appointmentSchema, type AppointmentInput } from "@/lib/appointment";
import { submitAppointmentRequest } from "@/lib/appointment.functions";
import { practices } from "@/lib/site";

const initialForm: AppointmentInput = {
  firstName: "",
  surname: "",
  phone: "",
  email: "",
  practice: "elsies-river",
  preferredDate: "",
  preferredTime: "morning",
  category: "General consultation",
  contactMethod: "phone",
  privacyConsent: false,
  website: "",
};

export function AppointmentForm() {
  const submit = useServerFn(submitAppointmentRequest);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const parsed = appointmentSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues.map((issue) => issue.message).join(" "));
      return;
    }

    setSubmitting(true);
    try {
      const result = await submit({ data: parsed.data });
      setReference(result.reference);
    } catch {
      setError("We could not send your request. Please call your chosen practice.");
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <section className="border-l-2 border-primary bg-mint/50 p-6 sm:p-8" role="status" aria-live="polite">
        <p className="eyebrow">Request received</p>
        <h2 className="mt-3 text-2xl font-bold">Thank you, {form.firstName}.</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Your request has been sent to the {practices.find((practice) => practice.slug === form.practice)?.name}. The practice will contact you using your selected method. This is a request only, not a confirmed appointment.</p>
        <p className="mt-4 font-semibold text-brand">Reference: {reference}</p>
      </section>
    );
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="grid gap-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2"><Label htmlFor="firstName">First name</Label><Input id="firstName" name="firstName" autoComplete="given-name" required maxLength={80} value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} /></div>
        <div className="grid gap-2"><Label htmlFor="surname">Surname</Label><Input id="surname" name="surname" autoComplete="family-name" required maxLength={80} value={form.surname} onChange={(event) => setForm((current) => ({ ...current, surname: event.target.value }))} /></div>
        <div className="grid gap-2"><Label htmlFor="phone">Contact number</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={25} value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} /></div>
        <div className="grid gap-2"><Label htmlFor="email">Email address <span className="font-normal text-muted-foreground">(optional)</span></Label><Input id="email" name="email" type="email" autoComplete="email" maxLength={255} required={form.contactMethod === "email"} value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} /></div>
        <div className="grid gap-2"><Label htmlFor="practice">Preferred practice</Label><select id="practice" name="practice" required value={form.practice} onChange={(event) => setForm((current) => ({ ...current, practice: event.target.value as AppointmentInput["practice"] }))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">{practices.map((practice) => <option key={practice.slug} value={practice.slug}>{practice.name}</option>)}</select></div>
        <div className="grid gap-2"><Label htmlFor="preferredDate">Preferred date</Label><Input id="preferredDate" name="preferredDate" type="date" required value={form.preferredDate} onChange={(event) => setForm((current) => ({ ...current, preferredDate: event.target.value }))} /></div>
        <div className="grid gap-2"><Label htmlFor="preferredTime">Preferred time</Label><select id="preferredTime" name="preferredTime" required value={form.preferredTime} onChange={(event) => setForm((current) => ({ ...current, preferredTime: event.target.value as AppointmentInput["preferredTime"] }))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="morning">Morning</option><option value="midday">Midday</option><option value="afternoon">Afternoon</option></select></div>
        <div className="grid gap-2"><Label htmlFor="category">Appointment category</Label><select id="category" name="category" required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as AppointmentInput["category"] }))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">{appointmentCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
        <div className="grid gap-2 sm:col-span-2"><Label htmlFor="contactMethod">Preferred contact method</Label><select id="contactMethod" name="contactMethod" required value={form.contactMethod} onChange={(event) => setForm((current) => ({ ...current, contactMethod: event.target.value as AppointmentInput["contactMethod"] }))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="phone">Phone</option><option value="sms">SMS</option><option value="email">Email</option></select></div>
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><Label htmlFor="website">Leave this field blank</Label><Input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} /></div>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" required checked={form.privacyConsent} onChange={(event) => setForm((current) => ({ ...current, privacyConsent: event.target.checked }))} className="mt-1 size-4 shrink-0 accent-primary" /><span>I agree that NOVOMED may use these details to respond to my appointment request. Read the <a className="font-medium text-primary underline underline-offset-4" href="/privacy">Privacy Policy</a>.</span></label>
      <p className="text-sm leading-6 text-muted-foreground">Please do not include medical histories or urgent health concerns. An appointment is not confirmed until the practice contacts you.</p>
      {error && <p id="appointment-error" className="text-sm font-medium text-destructive" role="alert">{error}</p>}
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-fit">{submitting ? "Sending request…" : "Send appointment request"}</Button>
    </form>
  );
}