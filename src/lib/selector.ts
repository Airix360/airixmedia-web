import { z } from "zod";

export const projectBriefSchema = z.object({
  organisationType: z.string().min(1),
  challenge: z.string().min(12),
  requestedService: z.string().min(1),
  existingPlatform: z.string().optional(),
  websiteUrl: z.union([z.literal(""), z.string().url()]).optional(),
  projectType: z.enum(["new", "rebuild", "migration", "rescue"]),
  urgency: z.enum(["planned", "soon", "urgent", "emergency"]),
  launchWindow: z.string().min(1),
  budget: z.string().min(1),
  billingCountry: z.string().min(2),
  ongoingSupport: z.boolean(),
  consent: z.literal(true),
});

export type ProjectBrief = z.infer<typeof projectBriefSchema>;

export function recommendBrief(input: Pick<ProjectBrief, "requestedService" | "projectType" | "urgency" | "ongoingSupport">) {
  const rescue = input.projectType === "rescue" || input.urgency === "emergency";
  const publishing = input.requestedService === "publishing";
  const infrastructure = input.requestedService === "infrastructure";
  const practice = rescue ? "Support and Recovery" : publishing ? "Publishing Technology" : infrastructure ? "Managed Infrastructure" : input.requestedService === "systems" ? "Business Systems" : "Digital Experiences";
  return {
    practice,
    engagement: rescue ? "Diagnostic and recovery engagement" : publishing ? "Publishing platform assessment" : "Discovery and scoped build",
    timeline: rescue ? "Diagnostic timing depends on access and availability" : "Indicative timing follows technical discovery",
    nextStep: "Airix reviews the brief and confirms scope before a proposal or booking.",
    assumptions: ["This is a preliminary recommendation, not a binding quote.", "Access, content, integrations, and billing country may change the final scope."],
    supportingServices: input.ongoingSupport ? ["Managed hosting", "Monitoring", "Ongoing improvement"] : ["Technical audit", "Launch support"],
  };
}

