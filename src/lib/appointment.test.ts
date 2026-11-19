import { describe, expect, it } from "vitest";
import { appointmentSchema } from "./appointment";
const valid = { firstName: "Thandi", surname: "Mokoena", phone: "021 928 8966", email: "", practice: "hout-bay", preferredDate: "2099-01-05", preferredTime: "morning", category: "General consultation", contactMethod: "phone", privacyConsent: true, website: "" };
describe("appointment requests", () => {
  it("accepts a request without email", () => expect(appointmentSchema.safeParse(valid).success).toBe(true));
  it("requires privacy consent", () => expect(appointmentSchema.safeParse({ ...valid, privacyConsent: false }).success).toBe(false));
  it("requires email when email contact is chosen", () => expect(appointmentSchema.safeParse({ ...valid, contactMethod: "email" }).success).toBe(false));
  it("only accepts the two practices", () => expect(appointmentSchema.safeParse({ ...valid, practice: "claremont" }).success).toBe(false));
});
