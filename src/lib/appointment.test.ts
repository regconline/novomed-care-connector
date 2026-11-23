import { describe, expect, it } from "vitest";
import { appointmentReference, appointmentSchema, todayInSA } from "./appointment";

const inDays = (n: number) => {
  const d = new Date(`${todayInSA()}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const valid = {
  firstName: "Thandi",
  surname: "Mokoena",
  phone: "021 928 8966",
  email: "",
  practice: "hout-bay",
  preferredDate: inDays(5),
  preferredTime: "morning",
  category: "General consultation",
  contactMethod: "phone",
  privacyConsent: true,
  website: "",
};

describe("appointment requests", () => {
  it("accepts a request without email", () =>
    expect(appointmentSchema.safeParse(valid).success).toBe(true));
  it("requires privacy consent", () =>
    expect(appointmentSchema.safeParse({ ...valid, privacyConsent: false }).success).toBe(false));
  it("requires email when email contact is chosen", () =>
    expect(appointmentSchema.safeParse({ ...valid, contactMethod: "email" }).success).toBe(false));
  it("only accepts the two practices", () =>
    expect(appointmentSchema.safeParse({ ...valid, practice: "claremont" }).success).toBe(false));
  it("rejects impossible calendar dates", () =>
    expect(appointmentSchema.safeParse({ ...valid, preferredDate: "2099-02-30" }).success).toBe(
      false,
    ));
  it("rejects past dates", () =>
    expect(appointmentSchema.safeParse({ ...valid, preferredDate: inDays(-1) }).success).toBe(
      false,
    ));
  it("rejects dates beyond the booking window", () =>
    expect(appointmentSchema.safeParse({ ...valid, preferredDate: inDays(120) }).success).toBe(
      false,
    ));
  it("accepts a client request id for idempotent retries", () =>
    expect(
      appointmentSchema.safeParse({ ...valid, requestId: "12345678-abcd-4321-aaaa-123456789abc" })
        .success,
    ).toBe(true));
  it("allows the honeypot to be checked by the server without rejecting the form", () =>
    expect(appointmentSchema.safeParse({ ...valid, website: "bot-filled" }).success).toBe(true));
  it("creates a short, stable request reference", () =>
    expect(appointmentReference("12345678-abcd-4321-aaaa-123456789abc")).toBe("NOV-12345678"));
});
