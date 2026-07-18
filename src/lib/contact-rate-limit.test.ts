import { beforeEach, describe, expect, it } from "vitest";
import { checkContactRateLimit, clientAddress, requestFingerprint, resetContactRateLimits } from "./contact-rate-limit";

beforeEach(() => { resetContactRateLimits(); process.env.CONTACT_RATE_LIMIT_MAX = "2"; process.env.EMERGENCY_RATE_LIMIT_MAX = "1"; });

describe("contact rate limiting", () => {
  it("uses a privacy-preserving stable fingerprint", () => {
    expect(requestFingerprint("192.0.2.1", "Person@Example.com")).toMatch(/^[a-f0-9]{64}$/);
    expect(requestFingerprint("192.0.2.1", "Person@Example.com")).toBe(requestFingerprint("192.0.2.1", "person@example.com"));
  });
  it("prefers the trusted Cloudflare address header", () => {
    expect(clientAddress(new Headers({ "cf-connecting-ip": "192.0.2.1", "x-forwarded-for": "198.51.100.2" }))).toBe("192.0.2.1");
  });
  it("limits ordinary submissions deterministically", () => {
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", now: 0 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", now: 1 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", now: 2 })).toMatchObject({ allowed: false, limit: 2 });
  });
  it("cannot be bypassed by varying email at one IP or IP for one email", () => {
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", now: 0 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "b@example.com", now: 1 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "c@example.com", now: 2 }).allowed).toBe(false);
    resetContactRateLimits();
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", now: 0 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "198.51.100.2", email: "a@example.com", now: 1 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "203.0.113.3", email: "a@example.com", now: 2 }).allowed).toBe(false);
  });
  it("uses a stricter emergency bucket", () => {
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", type: "emergency", now: 0 }).allowed).toBe(true);
    expect(checkContactRateLimit({ ip: "192.0.2.1", email: "a@example.com", type: "emergency", now: 1 }).allowed).toBe(false);
  });
});
