import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { practices, telHref } from "@/lib/site";

type AppointmentRequest = Database["public"]["Tables"]["appointment_requests"]["Row"];
type StaffState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "no-access"; email: string }
  | { status: "ready"; email: string; requests: AppointmentRequest[] }
  | { status: "error"; message: string };

async function loadStaffState(): Promise<StaffState> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) return { status: "error", message: "We could not verify this account. Please try signing in again." };
  const user = userData.user;
  if (!user) return { status: "signed-out" };

  const { data: role, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "practice_admin")
    .maybeSingle();
  if (roleError) return { status: "error", message: "Staff access could not be checked. Please try again." };
  if (!role) return { status: "no-access", email: user.email ?? "Signed-in account" };

  const { data: requests, error: requestError } = await supabase
    .from("appointment_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (requestError) return { status: "error", message: "Appointment enquiries could not be loaded." };
  return { status: "ready", email: user.email ?? "Staff account", requests: requests ?? [] };
}

export function StaffPortal() {
  const [state, setState] = useState<StaffState>({ status: "loading" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void loadStaffState().then((result) => { if (active) setState(result); });
    return () => { active = false; };
  }, []);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError("Sign-in was unsuccessful. Check your details or contact the practice administrator.");
      setBusy(false);
      return;
    }
    setState(await loadStaffState());
    setPassword("");
    setBusy(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ status: "signed-out" });
  };

  if (state.status === "loading") return <p className="text-sm text-muted-foreground" role="status">Checking staff access…</p>;

  if (state.status === "signed-out") {
    return (
      <form onSubmit={(event) => void signIn(event)} className="grid max-w-lg gap-5 border-y py-8">
        <div><p className="eyebrow">Staff access</p><h2 className="mt-3 text-2xl font-bold">Sign in to appointment enquiries.</h2></div>
        <div className="grid gap-2"><Label htmlFor="staff-email">Email address</Label><Input id="staff-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
        <div className="grid gap-2"><Label htmlFor="staff-password">Password</Label><Input id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
        {loginError && <p className="text-sm text-destructive" role="alert">{loginError}</p>}
        <Button type="submit" disabled={busy} className="w-fit">{busy ? "Signing in…" : "Sign in"}</Button>
      </form>
    );
  }

  if (state.status === "no-access") {
    return <div className="max-w-xl border-l-2 border-primary bg-clinical p-6"><p className="eyebrow">No staff access</p><h2 className="mt-3 text-2xl font-bold">This account is not enabled.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{state.email} is signed in, but no appointment administrator role is assigned to this account.</p><Button type="button" variant="outline" className="mt-5" onClick={() => void signOut()}><LogOut /> Sign out</Button></div>;
  }

  if (state.status === "error") return <div className="border-l-2 border-destructive p-6"><p className="text-sm text-destructive" role="alert">{state.message}</p><Button type="button" variant="outline" className="mt-4" onClick={() => { setState({ status: "loading" }); void loadStaffState().then(setState); }}>Try again</Button></div>;

  return (
    <section>
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Appointment enquiries</p><h2 className="mt-3 text-2xl font-bold">Requests for follow-up</h2><p className="mt-2 text-sm text-muted-foreground">Signed in as {state.email}. Requests are not confirmed appointments.</p></div><Button type="button" variant="outline" onClick={() => void signOut()}><LogOut /> Sign out</Button></div>
      {state.requests.length === 0 ? <p className="py-10 text-muted-foreground">There are no appointment requests to display.</p> : <div className="divide-y">{state.requests.map((request) => {
        const practice = practices.find((item) => item.slug === request.practice);
        return <article key={request.id} className="grid gap-4 py-6 md:grid-cols-[1fr_1fr_1fr]"><div><h3 className="font-semibold">{request.first_name} {request.surname}</h3><p className="mt-1 text-sm text-muted-foreground">{practice?.name ?? "NOVOMED practice"} · {request.preferred_date}</p><p className="mt-1 text-xs text-muted-foreground">Reference: NOV-{request.id.replace(/-/g, "").slice(0, 8).toUpperCase()}</p></div><div><p className="text-sm">{request.category}</p><p className="mt-1 text-sm text-muted-foreground">Preferred time: {request.preferred_time}</p><p className="mt-1 text-sm text-muted-foreground">Contact by: {request.contact_method}</p><p className="mt-1 text-xs text-muted-foreground">Status: {request.status}</p></div><div className="grid content-start gap-2 text-sm"><a className="flex items-center gap-2 font-medium text-primary" href={telHref(request.phone)}>{request.phone}<ArrowUpRight className="size-4" /></a>{request.email && <a className="break-all text-primary hover:underline" href={`mailto:${request.email}`}>{request.email}</a>}</div></article>;
      })}</div>}
    </section>
  );
}