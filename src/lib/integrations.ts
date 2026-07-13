import type { ProjectBrief } from "./selector";
import { recommendBrief } from "./selector";

export type IntegrationResult = { ok: boolean; mode: "mock" | "live"; reference?: string; message?: string };

export interface LeadAdapter { submit(brief: ProjectBrief, source: string): Promise<IntegrationResult>; }
export interface BookingAdapter { createHandoff(reference: string): Promise<IntegrationResult>; }
export interface ChatAdapter { route(audience: "prospect" | "client" | "emergency"): Promise<IntegrationResult>; }

export class MockTwentyAdapter implements LeadAdapter {
  async submit(brief: ProjectBrief, source: string) {
    const recommendation = recommendBrief(brief);
    return { ok: true, mode: "mock" as const, reference: `AIRIX-${Date.now().toString(36).toUpperCase()}`, message: `Mock opportunity prepared for ${recommendation.practice} from ${source}.` };
  }
}

export const leadAdapter: LeadAdapter = new MockTwentyAdapter();

export const crmPayloadFor = (brief: ProjectBrief, source: string) => ({
  person: null,
  organisation: { type: brief.organisationType },
  opportunity: { name: `${brief.projectType}: ${brief.requestedService}`, stage: "new_enquiry" },
  serviceInterest: brief.requestedService,
  region: brief.billingCountry,
  budget: brief.budget,
  timeline: brief.launchWindow,
  urgency: brief.urgency,
  sourcePage: source,
  existingWebsite: brief.websiteUrl || null,
  recommendedService: recommendBrief(brief).practice,
  consent: { submitted: brief.consent, capturedAt: new Date().toISOString() },
});

