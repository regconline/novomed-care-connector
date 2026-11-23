import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { format, parseISO } from "date-fns";
import { ArrowLeft, ArrowRight, Check, Loader2, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BOOKING_WINDOW_DAYS,
  appointmentCategories,
  appointmentSchema,
  categoryDescriptions,
  contactMethods,
  timePreferences,
  todayInSA,
  type AppointmentInput,
} from "@/lib/appointment";
import { submitAppointmentRequest } from "@/lib/appointment.functions";
import { practices, type PracticeSlug } from "@/lib/site";

const steps = ["Practice", "Category", "Date", "Time", "Your details", "Review"] as const;

type Form = Omit<AppointmentInput, "privacyConsent" | "practice" | "category" | "preferredTime"> & {
  practice: PracticeSlug | "";
  category: AppointmentInput["category"] | "";
  preferredTime: AppointmentInput["preferredTime"] | "";
  privacyConsent: boolean;
};

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : undefined;

function Choice({
  selected,
  onSelect,
  children,
  className = "",
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected ? "border-primary bg-mint/40 shadow-soft" : "border-border bg-white hover:border-brand/30"} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute right-4 top-4 grid size-6 place-items-center rounded-full border-2 transition-colors ${selected ? "border-primary bg-primary text-white" : "border-border"}`}
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      {children}
    </button>
  );
}

function Progress({ current }: { current: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>
          Step {current + 1} of {steps.length}
        </span>
        <span className="font-display font-semibold text-brand">{steps[current]}</span>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1.5" aria-hidden="true">
        {steps.map((s, i) => (
          <span
            key={s}
            className={`h-1 rounded-full transition-colors duration-500 ${i <= current ? "bg-teal" : "bg-border"}`}
          />
        ))}
      </div>
      <ol className="sr-only">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === current ? "step" : undefined}>
            {s}
            {i < current ? " (completed)" : ""}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AppointmentForm({
  initialPractice,
}: {
  initialPractice?: PracticeSlug | undefined;
}) {
  const submit = useServerFn(submitAppointmentRequest);
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(Date.now());
  const [step, setStep] = useState(initialPractice ? 1 : 0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Form>({
    requestId: undefined,
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    practice: initialPractice ?? "",
    preferredDate: "",
    preferredTime: "",
    category: "",
    contactMethod: "phone",
    privacyConsent: false,
    website: "",
  });

  // One request ID per form session — used server-side to make retries idempotent.
  useEffect(() => setForm((f) => ({ ...f, requestId: f.requestId ?? uuid() })), []);
  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const today = todayInSA();
  const fromDate = useMemo(() => parseISO(today), [today]);
  const toDate = useMemo(() => {
    const d = parseISO(today);
    d.setDate(d.getDate() + BOOKING_WINDOW_DAYS);
    return d;
  }, [today]);
  const practice = practices.find((p) => p.slug === form.practice);

  const stepValid = [
    !!form.practice,
    !!form.category,
    !!form.preferredDate,
    !!form.preferredTime,
    form.firstName.trim() &&
      form.surname.trim() &&
      /^[+0-9 ()-]{7,25}$/.test(form.phone.trim()) &&
      (form.contactMethod !== "email" || /\S+@\S+\.\S+/.test(form.email)) &&
      (!form.email || /\S+@\S+\.\S+/.test(form.email)),
    form.privacyConsent,
  ];

  const go = (next: number) => {
    setError("");
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    if (!stepValid[step]) {
      setError(
        step === 4
          ? "Please complete your name and a valid contact number (and email, if you chose email contact)."
          : "Please make a selection to continue.",
      );
      return;
    }
    go(step + 1);
  };

  const handleSubmit = async () => {
    setError("");
    const parsed = appointmentSchema.safeParse({ ...form, startedAt: started.current });
    if (!parsed.success) {
      setError(parsed.error.issues.map((i) => i.message).join(". "));
      return;
    }
    setSubmitting(true);
    try {
      const result = await submit({ data: parsed.data });
      await navigate({
        to: "/appointment/received",
        search: { ref: result.reference, practice: parsed.data.practice },
      });
    } catch {
      setError(
        "We could not send your request. Please try again, or call your chosen practice directly.",
      );
      setSubmitting(false);
    }
  };

  const titles = [
    "Which practice would you like to visit?",
    "What is the appointment for?",
    "Choose a preferred date",
    "Choose a preferred time",
    "Your contact details",
    "Review your request",
  ];

  return (
    <div className="rounded-[1.5rem] border hairline bg-white p-6 shadow-soft sm:p-10">
      <Progress current={step} />
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-8 font-display text-2xl font-bold outline-none sm:text-[1.75rem]"
      >
        {titles[step]}
      </h2>

      <div className="mt-7">
        {step === 0 && (
          <div role="radiogroup" aria-label="Practice" className="grid gap-4 sm:grid-cols-2">
            {practices.map((p) => (
              <Choice
                key={p.slug}
                selected={form.practice === p.slug}
                onSelect={() => set("practice", p.slug)}
                className="min-h-40"
              >
                <span className="grid size-10 place-items-center rounded-full bg-mint text-brand">
                  <MapPin className="size-4" />
                </span>
                <span className="mt-5 block font-display text-lg font-extrabold uppercase tracking-[0.06em] text-brand">
                  {p.area}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{p.shortAddress}</span>
              </Choice>
            ))}
          </div>
        )}

        {step === 1 && (
          <div
            role="radiogroup"
            aria-label="Appointment category"
            className="grid gap-3 sm:grid-cols-2"
          >
            {appointmentCategories.map((c) => (
              <Choice key={c} selected={form.category === c} onSelect={() => set("category", c)}>
                <span className="block pr-8 font-display font-bold text-brand">{c}</span>
                <span className="mt-1 block pr-6 text-sm leading-5 text-muted-foreground">
                  {categoryDescriptions[c]}
                </span>
              </Choice>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex justify-center rounded-2xl border hairline p-1 sm:p-2">
              <Calendar
                mode="single"
                selected={form.preferredDate ? parseISO(form.preferredDate) : undefined}
                onSelect={(d) => d && set("preferredDate", format(d, "yyyy-MM-dd"))}
                disabled={[{ before: fromDate }, { after: toDate }]}
                startMonth={fromDate}
                endMonth={toDate}
                weekStartsOn={1}
                className="mx-auto p-1 [--cell-size:2.2rem] sm:p-3 sm:[--cell-size:2.6rem]"
              />
            </div>
            <div className="rounded-2xl bg-surface p-6 text-sm leading-6 text-muted-foreground">
              <p className="font-display font-bold text-brand">
                {form.preferredDate
                  ? format(parseISO(form.preferredDate), "EEEE, d MMMM yyyy")
                  : "No date selected"}
              </p>
              <p className="mt-2">
                This is your <strong className="text-charcoal">preferred</strong> date. The practice
                will confirm availability or suggest an alternative when they contact you.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div
              role="radiogroup"
              aria-label="Preferred time"
              className="grid gap-3 sm:grid-cols-3"
            >
              {timePreferences.map((t) => (
                <Choice
                  key={t.value}
                  selected={form.preferredTime === t.value}
                  onSelect={() => set("preferredTime", t.value)}
                >
                  <span className="block font-display text-lg font-bold text-brand">{t.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{t.hint}</span>
                </Choice>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              We don't show specific time slots online. Choose the part of the day that suits you
              best, and the practice will offer an available time.
            </p>
          </>
        )}

        {step === 4 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                autoComplete="given-name"
                maxLength={80}
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                autoComplete="family-name"
                maxLength={80}
                value={form.surname}
                onChange={(e) => set("surname", e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Contact number</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={25}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email address{" "}
                {form.contactMethod !== "email" && (
                  <span className="font-normal text-muted-foreground">(optional)</span>
                )}
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">Preferred contact method</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {contactMethods.map((m) => (
                  <label
                    key={m.value}
                    className={`cursor-pointer rounded-xl border-2 px-3 py-3 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${form.contactMethod === m.value ? "border-primary bg-mint/40 text-brand" : "border-border text-charcoal hover:border-brand/30"}`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m.value}
                      checked={form.contactMethod === m.value}
                      onChange={() => set("contactMethod", m.value)}
                      className="sr-only"
                    />
                    {m.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field blank</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
            <p className="text-sm leading-6 text-muted-foreground sm:col-span-2">
              Please don't include medical details. If you are booking for a child, enter the parent
              or guardian's details.
            </p>
          </div>
        )}

        {step === 5 && (
          <div>
            <dl className="divide-y divide-border rounded-2xl border hairline">
              {[
                ["Practice", practice ? `${practice.name} — ${practice.shortAddress}` : "", 0],
                ["Appointment category", form.category, 1],
                [
                  "Preferred date",
                  form.preferredDate
                    ? format(parseISO(form.preferredDate), "EEEE, d MMMM yyyy")
                    : "",
                  2,
                ],
                [
                  "Preferred time",
                  timePreferences.find((t) => t.value === form.preferredTime)?.label ?? "",
                  3,
                ],
                ["Name", `${form.firstName} ${form.surname}`, 4],
                [
                  "Contact",
                  [form.phone, form.email].filter(Boolean).join(" · ") +
                    ` (by ${contactMethods.find((m) => m.value === form.contactMethod)?.label.toLowerCase()})`,
                  4,
                ],
              ].map(([label, value, target]) => (
                <div
                  key={label as string}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="font-medium text-charcoal">{value}</dd>
                  <button
                    type="button"
                    onClick={() => go(target as number)}
                    className="justify-self-start text-sm font-semibold text-primary hover:underline sm:justify-self-end"
                  >
                    Edit<span className="sr-only"> {label}</span>
                  </button>
                </div>
              ))}
            </dl>
            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-5 text-sm leading-6 text-charcoal">
              <input
                type="checkbox"
                checked={form.privacyConsent}
                onChange={(e) => set("privacyConsent", e.target.checked)}
                className="mt-1 size-4 shrink-0 accent-[#12806c]"
              />
              <span>
                I consent to NOVOMED General Practitioners using these details to respond to my
                appointment request, as described in the{" "}
                <a
                  className="font-semibold text-primary underline underline-offset-4"
                  href="/popia-notice"
                  target="_blank"
                  rel="noreferrer"
                >
                  POPIA Privacy Notice
                </a>{" "}
                and{" "}
                <a
                  className="font-semibold text-primary underline underline-offset-4"
                  href="/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              <strong className="text-charcoal">
                This is a request, not a confirmed appointment.
              </strong>{" "}
              The practice will contact you to confirm availability.
            </p>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}

      <div className="mt-9 flex flex-col-reverse gap-3 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => go(step - 1)} disabled={submitting}>
            <ArrowLeft /> Back
          </Button>
        ) : (
          <span />
        )}
        {step < 5 ? (
          <Button type="button" size="lg" onClick={next}>
            Continue <ArrowRight />
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            onClick={() => void handleSubmit()}
            disabled={submitting || !form.privacyConsent}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" /> Sending request…
              </>
            ) : (
              <>
                Submit request <ArrowRight />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
