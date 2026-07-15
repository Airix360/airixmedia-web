import { z } from "zod";
import type { EvidenceState } from "./content";

export const pricingSchema = z.object({
  slug: z.string(),
  name: z.string(),
  audience: z.string(),
  amount: z.number().positive(),
  currency: z.literal("NGN"),
  billingPeriod: z.enum(["one_time", "annual"]),
  included: z.array(z.string()),
  addOns: z.array(z.string()),
  estimatedTimeline: z.string(),
  depositRequirement: z.string(),
  supportPeriod: z.string(),
  renewal: z.string(),
  region: z.literal("NG"),
  responseCommitment: z.string().nullable(),
  evidence: z.enum(["verified", "owner_confirmed", "inferred_needs_review", "placeholder", "do_not_publish"]),
});

export type PricingPackage = z.infer<typeof pricingSchema>;

export const pricingPackages: PricingPackage[] = [
  { slug: "setup", name: "OJS setup", audience: "New journal platforms", amount: 150000, currency: "NGN", billingPeriod: "one_time", included: ["Scoped OJS setup"], addOns: [], estimatedTimeline: "Defined in the proposal", depositRequirement: "Defined in the proposal", supportPeriod: "Defined in the proposal", renewal: "Not applicable", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "migration", name: "OJS migration", audience: "Existing journal platforms", amount: 200000, currency: "NGN", billingPeriod: "one_time", included: ["Scoped platform migration"], addOns: [], estimatedTimeline: "Defined after audit", depositRequirement: "Defined in the proposal", supportPeriod: "Defined in the proposal", renewal: "Not applicable", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "theme-branding", name: "Theme and branding", audience: "Journals needing a distinct interface", amount: 150000, currency: "NGN", billingPeriod: "one_time", included: ["Scoped theme and brand implementation"], addOns: [], estimatedTimeline: "Defined in the proposal", depositRequirement: "Defined in the proposal", supportPeriod: "Defined in the proposal", renewal: "Not applicable", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "managed-hosting", name: "Managed hosting, domain, SSL and Cloudflare", audience: "Journals needing managed infrastructure", amount: 300000, currency: "NGN", billingPeriod: "annual", included: ["Managed hosting", "Domain", "SSL", "Cloudflare"], addOns: [], estimatedTimeline: "After technical review", depositRequirement: "Annual billing in advance", supportPeriod: "Active annual term", renewal: "Annual", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "support-maintenance", name: "Support and maintenance", audience: "Existing OJS platforms", amount: 150000, currency: "NGN", billingPeriod: "annual", included: ["Scoped support and maintenance"], addOns: [], estimatedTimeline: "After technical review", depositRequirement: "Annual billing in advance", supportPeriod: "Active annual term", renewal: "Annual", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "training", name: "Training up to 10 participants", audience: "Publishing teams", amount: 100000, currency: "NGN", billingPeriod: "one_time", included: ["One training session for up to 10 participants"], addOns: [], estimatedTimeline: "Scheduled by agreement", depositRequirement: "Defined in the proposal", supportPeriod: "Session only", renewal: "Not applicable", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "custom-plugins", name: "Custom plugins", audience: "Platforms with specific workflow needs", amount: 250000, currency: "NGN", billingPeriod: "one_time", included: ["Scoped custom plugin engineering"], addOns: [], estimatedTimeline: "Defined after compatibility review", depositRequirement: "Defined in the proposal", supportPeriod: "Defined in the proposal", renewal: "Not applicable", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
];

export const visiblePricing = (production = process.env.NODE_ENV === "production") =>
  pricingPackages.filter((item) => !production || (["verified", "owner_confirmed"] as EvidenceState[]).includes(item.evidence));

const africa = new Set(["NG", "GH", "KE", "UG", "ZA", "RW", "TZ", "SN", "CI"]);
const europe = new Set(["AT", "BE", "DE", "ES", "FR", "IE", "IT", "NL", "PT", "FI", "GR", "LU"]);

export function regionForCountry(country?: string | null) {
  const code = country?.toUpperCase();
  if (code === "NG") return "nigeria" as const;
  if (code && africa.has(code)) return "africa" as const;
  if (code && europe.has(code)) return "europe" as const;
  return "global" as const;
}

export function formatBasePrice(item: PricingPackage, locale = "en-NG") {
  return new Intl.NumberFormat(locale, { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.amount);
}
