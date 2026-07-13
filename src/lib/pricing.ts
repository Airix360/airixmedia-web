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
  { slug: "starter", name: "Starter", audience: "New journals needing a reliable baseline", amount: 250000, currency: "NGN", billingPeriod: "one_time", included: ["OJS installation and journal setup", "Basic configuration", "Hosting, domain, and payment setup"], addOns: ["Indexing submission support", "Additional training"], estimatedTimeline: "Owner verification required", depositRequirement: "Defined in the proposal", supportPeriod: "Minor launch support", renewal: "Hosting renews separately", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "standard", name: "Standard", audience: "Institutions building a complete journal workflow", amount: 300000, currency: "NGN", billingPeriod: "one_time", included: ["Everything in Starter", "Editorial workflow configuration", "Email templates", "Indexing readiness", "Training"], addOns: ["Advanced theme work", "Additional training"], estimatedTimeline: "Owner verification required", depositRequirement: "Defined in the proposal", supportPeriod: "Agreed launch support", renewal: "Hosting renews separately", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "premium", name: "Premium", audience: "Journals preparing for professional long-term operations", amount: 450000, currency: "NGN", billingPeriod: "one_time", included: ["Everything in Standard", "Advanced payment integration", "Professional theme configuration", "Workflow optimisation", "Policy and indexing readiness"], addOns: ["Custom plugins", "Publishing operations"], estimatedTimeline: "Owner verification required", depositRequirement: "Defined in the proposal", supportPeriod: "Agreed priority support", renewal: "Hosting renews separately", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "hosting-domain", name: "Managed OJS hosting", audience: "Journals needing managed infrastructure", amount: 100000, currency: "NGN", billingPeriod: "annual", included: ["Managed hosting", "Domain handling", "Renewal tracking", "Basic monitoring"], addOns: ["Maintenance", "Security review"], estimatedTimeline: "Provisioning after technical review", depositRequirement: "Annual billing in advance", supportPeriod: "For the active term", renewal: "Annual", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
  { slug: "maintenance", name: "Maintenance and support", audience: "Existing OJS platforms", amount: 36000, currency: "NGN", billingPeriod: "annual", included: ["Core and plugin updates", "Minor fixes", "Technical support", "Issue tracking"], addOns: ["Emergency recovery", "Major upgrades"], estimatedTimeline: "Starts after audit", depositRequirement: "Annual billing in advance", supportPeriod: "For the active term", renewal: "Annual", region: "NG", responseCommitment: null, evidence: "owner_confirmed" },
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

