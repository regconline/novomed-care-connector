import { format, parseISO } from "date-fns";
import { CalendarClock, LogOut, Mail, Phone, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  appointmentReference,
  bookingStatuses,
  statusLabel,
  timePreferences,
  todayInSA,
  type BookingStatus,
} from "@/lib/appointment";
import { practices, telHref } from "@/lib/site";

type AppointmentRequest = Database["public"]["Tables"]["appointment_requests"]["Row"];
type StaffState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "no-access"; email: string }
  | { status: "ready"; email: string; requests: AppointmentRequest[] }
  | { status: "error"; message: string };

const statusTone: Record<string, string> = {
  new: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  rescheduled: "bg-sky-100 text-sky-900",
  cancelled: "bg-rose-100 text-rose-900",
  completed: "bg-slate-200 text-slate-800",
};

async function loadStaffState(): Promise<StaffState> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError && userError.name !== "AuthSessionMissingError") return { status: "signed-out" };
  const user = userData?.user;
  if (!user) return { status: "signed-out" };

  const { data: role, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "practice_admin")
    .maybeSingle();
  if (roleError)
    return { status: "error", message: "Staff access could not be checked. Please try again." };
  if (!role) return { status: "no-access", email: user.email ?? "Signed-in account" };

  const { data: requests, error } = await supabase
    .from("appointment_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) return { status: "error", message: "Appointment requests could not be loaded." };
  return { status: "ready", email: user.email ?? "Staff account", requests: requests ?? [] };
}

const selectClass =
  "h-11 w-full rounded-xl border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function RequestRow({
  request,
  onChange,
}: {
  request: AppointmentRequest;
  onChange: (r: AppointmentRequest) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [rescheduling, setRescheduling] = useState(false);
  const [date, setDate] = useState(request.preferred_date);
  const [time, setTime] = useState(request.preferred_time);
  const practice = practices.find((p) => p.slug === request.practice);

  const update = async (patch: Partial<AppointmentRequest>) => {
    setBusy(true);
    setNote("");
    const { data, error } = await supabase
      .from("appointment_requests")
      .update(patch)
      .eq("id", request.id)
      .select()
      .maybeSingle();
    setBusy(false);
    if (error || !data) {
      setNote(
        "This change could not be saved. Status updates need staff update permission on the database — see the setup notes.",
      );
      return;
    }
    onChange(data);
    setRescheduling(false);
    setNote("Saved.");
  };

  return (
    <article className="grid gap-5 rounded-2xl border hairline bg-white p-5 md:grid-cols-[1.1fr_1fr_1fr_auto] md:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-bold">
            {request.first_name} {request.surname}
          </h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${statusTone[request.status] ?? "bg-muted"}`}
          >
            {statusLabel(request.status)}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {appointmentReference(request.id)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Received {format(parseISO(request.created_at), "d MMM yyyy, HH:mm")}
        </p>
      </div>
      <div className="text-sm">
        <p className="font-semibold text-charcoal">{practice?.area ?? request.practice}</p>
        <p className="mt-1 text-muted-foreground">{request.category}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-muted-foreground">
          <CalendarClock className="size-3.5" />
          {format(parseISO(request.preferred_date), "EEE d MMM yyyy")} ·{" "}
          {timePreferences.find((t) => t.value === request.preferred_time)?.label ??
            request.preferred_time}
        </p>
      </div>
      <div className="grid content-start gap-1.5 text-sm">
        <a
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          href={telHref(request.phone)}
        >
          <Phone className="size-3.5" />
          {request.phone}
        </a>
        {request.email && (
          <a
            className="inline-flex items-center gap-1.5 break-all text-primary hover:underline"
            href={`mailto:${request.email}`}
          >
            <Mail className="size-3.5 shrink-0" />
            {request.email}
          </a>
        )}
        <p className="text-xs text-muted-foreground">Prefers: {request.contact_method}</p>
      </div>
      <div className="grid gap-2 md:w-48">
        <label className="sr-only" htmlFor={`status-${request.id}`}>
          Status
        </label>
        <select
          id={`status-${request.id}`}
          disabled={busy}
          value={request.status}
          onChange={(e) =>
            e.target.value === "rescheduled"
              ? setRescheduling(true)
              : void update({ status: e.target.value })
          }
          className={selectClass}
        >
          {bookingStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => setRescheduling((v) => !v)}
        >
          Reschedule
        </Button>
      </div>
      {rescheduling && (
        <div className="grid gap-3 rounded-xl bg-surface p-4 md:col-span-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div className="grid gap-1.5">
            <Label htmlFor={`d-${request.id}`}>New date</Label>
            <Input
              id={`d-${request.id}`}
              type="date"
              min={todayInSA()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 rounded-xl bg-white"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`t-${request.id}`}>New time</Label>
            <select
              id={`t-${request.id}`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={selectClass}
            >
              {timePreferences.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="button"
            disabled={busy || !date}
            onClick={() =>
              void update({ status: "rescheduled", preferred_date: date, preferred_time: time })
            }
          >
            Save reschedule
          </Button>
        </div>
      )}
      {note && (
        <p role="status" className="text-xs text-muted-foreground md:col-span-4">
          {note}
        </p>
      )}
    </article>
  );
}

function Dashboard({
  email,
  requests: initial,
  onSignOut,
  onRefresh,
}: {
  email: string;
  requests: AppointmentRequest[];
  onSignOut: () => void;
  onRefresh: () => void;
}) {
  const [requests, setRequests] = useState(initial);
  const [branch, setBranch] = useState("all");
  const [status, setStatus] = useState<"all" | BookingStatus>("all");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => setRequests(initial), [initial]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter(
      (r) =>
        (branch === "all" || r.practice === branch) &&
        (status === "all" || r.status === status) &&
        (!date || r.preferred_date === date) &&
        (!q ||
          appointmentReference(r.id).toLowerCase().includes(q) ||
          `${r.first_name} ${r.surname}`.toLowerCase().includes(q) ||
          r.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "") || "~")),
    );
  }, [requests, branch, status, date, query]);

  const counts = bookingStatuses.map((s) => ({
    ...s,
    n: requests.filter((r) => r.status === s.value && (branch === "all" || r.practice === branch))
      .length,
  }));

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Appointment requests</p>
          <h1 className="display-md mt-3">Booking dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onRefresh}>
            <RefreshCw /> Refresh
          </Button>
          <Button type="button" variant="ghost" onClick={onSignOut}>
            <LogOut /> Sign out
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {counts.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setStatus(status === c.value ? "all" : c.value)}
            className={`rounded-2xl border p-4 text-left transition-colors ${status === c.value ? "border-primary bg-mint/40" : "hairline bg-white hover:border-brand/30"}`}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {c.label}
            </span>
            <span className="mt-1 block font-display text-2xl font-extrabold text-brand tabular-nums">
              {c.n}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border hairline bg-white p-4 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search by reference, name or phone"
            placeholder="Search reference (NOV-…), name or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-xl pl-9"
          />
        </div>
        <select
          aria-label="Filter by branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={selectClass}
        >
          <option value="all">All branches</option>
          {practices.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.area}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className={selectClass}
        >
          <option value="all">All statuses</option>
          {bookingStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <Input
          aria-label="Filter by preferred date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} of {requests.length} requests
      </p>
      {filtered.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No requests match these filters.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {filtered.map((r) => (
            <RequestRow
              key={r.id}
              request={r}
              onChange={(u) => setRequests((list) => list.map((x) => (x.id === u.id ? u : x)))}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function StaffPortal() {
  const [state, setState] = useState<StaffState>({ status: "loading" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    setState({ status: "loading" });
    void loadStaffState().then(setState);
  };
  useEffect(() => {
    let active = true;
    void loadStaffState().then((r) => {
      if (active) setState(r);
    });
    return () => {
      active = false;
    };
  }, []);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error)
      return setLoginError(
        "Sign-in was unsuccessful. Check your details or contact the practice administrator.",
      );
    setPassword("");
    refresh();
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ status: "signed-out" });
  };

  if (state.status === "loading")
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Checking staff access…
      </p>
    );

  if (state.status === "signed-out") {
    return (
      <form
        onSubmit={(e) => void signIn(e)}
        className="mx-auto grid max-w-md gap-5 rounded-[1.5rem] bg-white p-8 shadow-soft sm:p-10"
      >
        <div>
          <p className="eyebrow">Staff access</p>
          <h1 className="mt-3 font-display text-2xl font-bold">
            Sign in to the booking dashboard.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">For authorised NOVOMED staff only.</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="staff-email">Email address</Label>
          <Input
            id="staff-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="staff-password">Password</Label>
          <Input
            id="staff-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>
        {loginError && (
          <p className="text-sm text-destructive" role="alert">
            {loginError}
          </p>
        )}
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    );
  }

  if (state.status === "no-access") {
    return (
      <div className="mx-auto max-w-md rounded-[1.5rem] bg-white p-8 shadow-soft">
        <p className="eyebrow">No staff access</p>
        <h1 className="mt-3 font-display text-2xl font-bold">This account is not enabled.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {state.email} is signed in, but no practice administrator role is assigned to this
          account.
        </p>
        <Button type="button" variant="outline" className="mt-5" onClick={() => void signOut()}>
          <LogOut /> Sign out
        </Button>
      </div>
    );
  }

  if (state.status === "error")
    return (
      <div className="mx-auto max-w-md rounded-[1.5rem] bg-white p-8 shadow-soft">
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
        <Button type="button" variant="outline" className="mt-4" onClick={refresh}>
          Try again
        </Button>
      </div>
    );

  return (
    <Dashboard
      email={state.email}
      requests={state.requests}
      onSignOut={() => void signOut()}
      onRefresh={refresh}
    />
  );
}
