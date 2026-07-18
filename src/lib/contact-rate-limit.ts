import { createHmac, randomBytes } from "node:crypto";
import type { ContactFormKey } from "./contact-forms";

type Entry = { count: number; resetAt: number };
type RateLimitResult = { allowed: boolean; retryAfter: number; limit: number };
const buckets = new Map<string, Entry>();
const fingerprintKey = randomBytes(32);

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function requestFingerprint(ip: string, email = "") {
  return createHmac("sha256", fingerprintKey).update(`${ip.trim().toLowerCase()}|${email.trim().toLowerCase()}`).digest("hex");
}

export function clientAddress(headers: Headers) {
  return headers.get("cf-connecting-ip")?.trim() || headers.get("x-real-ip")?.trim() || headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function checkContactRateLimit(input: { ip: string; email?: string; type?: ContactFormKey; now?: number }): RateLimitResult {
  const emergency = input.type === "emergency";
  const limit = positiveInteger(emergency ? process.env.EMERGENCY_RATE_LIMIT_MAX : process.env.CONTACT_RATE_LIMIT_MAX, emergency ? 3 : 8);
  const windowSeconds = positiveInteger(emergency ? process.env.EMERGENCY_RATE_LIMIT_WINDOW_SECONDS : process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS, emergency ? 900 : 600);
  const now = input.now ?? Date.now();
  const scope = emergency ? "emergency" : "contact";
  const keys = [`${scope}:ip:${requestFingerprint(input.ip)}`];
  if (input.email?.trim()) keys.push(`${scope}:email:${requestFingerprint("", input.email)}`);
  const maximumBuckets = Math.max(100, positiveInteger(process.env.CONTACT_RATE_LIMIT_MAX_BUCKETS, 10_000));
  if (buckets.size >= maximumBuckets) {
    for (const [key, entry] of buckets) if (entry.resetAt <= now) buckets.delete(key);
    while (buckets.size > Math.max(0, maximumBuckets - keys.length)) buckets.delete(buckets.keys().next().value as string);
  }
  const active = keys.map((key) => [key, buckets.get(key)] as const);
  const blocked = active.find(([, entry]) => entry && entry.resetAt > now && entry.count >= limit)?.[1];
  if (blocked) return { allowed: false, retryAfter: Math.max(1, Math.ceil((blocked.resetAt - now) / 1000)), limit };
  let retryAfter = windowSeconds;
  for (const [key, entry] of active) {
    if (!entry || entry.resetAt <= now) buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    else { entry.count += 1; retryAfter = Math.min(retryAfter, Math.max(1, Math.ceil((entry.resetAt - now) / 1000))); }
  }
  return { allowed: true, retryAfter, limit };
}

export function resetContactRateLimits() { buckets.clear(); }
