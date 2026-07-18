import { z } from "zod";

export const contactFormKeys = ["project", "publishing", "book", "general", "support", "emergency"] as const;
export type ContactFormKey = (typeof contactFormKeys)[number];

export type ContactField = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "tel" | "date" | "select" | "textarea" | "checkbox" | "file";
  required?: boolean;
  options?: string[];
  hint?: string;
  wide?: boolean;
};

export type ContactFormDefinition = {
  key: ContactFormKey;
  title: string;
  description: string;
  fields: ContactField[];
};

const requiredText = (label: string, minimum = 1) => z.string().trim().min(minimum, `${label} is required.`);
const optionalText = z.string().trim().optional().default("");
const optionalUrl = z.string().trim().refine((value) => !value || /^https?:\/\//i.test(value), "Use a complete http:// or https:// URL.").optional().default("");
const privacy = z.boolean().refine(Boolean, "Acknowledge the privacy notice to continue.");
const common = { fullName: requiredText("Full name", 2), email: z.string().trim().email("Enter a valid email address."), privacyAcknowledgement: privacy, sourceRoute: optionalText };

export const projectEnquirySchema = z.object({ ...common, organisation: requiredText("Organisation"), serviceNeeded: requiredText("Service needed"), existingSystem: requiredText("Existing website or system"), projectSummary: requiredText("Project summary", 20), mainProblem: requiredText("Main problem", 20), desiredOutcome: requiredText("Desired outcome", 10), estimatedTimeline: requiredText("Estimated timeline"), budgetRange: requiredText("Budget range"), relevantLinks: optionalUrl, preferredContactMethod: requiredText("Preferred contact method") });
export const publishingEnquirySchema = z.object({ ...common, organisation: requiredText("Organisation or institution"), journalName: requiredText("Journal or platform name"), journalUrl: requiredText("Journal URL"), ojsVersion: requiredText("OJS version"), journalCount: requiredText("Number of journals"), serviceRequired: requiredText("Service required"), hostingArrangement: requiredText("Current hosting arrangement"), migrationRequired: requiredText("Migration requirement"), desiredLaunchDate: requiredText("Desired launch date"), objective: requiredText("Main issue or objective", 20) });
export const consultationBookingSchema = z.object({ ...common, organisation: requiredText("Organisation"), consultationType: requiredText("Consultation type"), projectSummary: requiredText("Short project summary", 20), existingPlatform: requiredText("Existing website or platform"), preferredDate: requiredText("Preferred date"), preferredTimeWindow: requiredText("Preferred time window"), timeZone: requiredText("Time zone"), relevantLinks: optionalUrl, reviewMaterial: requiredText("Material to review") });
export const generalEnquirySchema = z.object({ ...common, organisation: requiredText("Organisation"), enquiryType: requiredText("Enquiry type"), message: requiredText("Message", 20) });
export const technicalSupportSchema = z.object({ ...common, organisation: requiredText("Organisation or client name"), affectedSystem: requiredText("Affected website or system"), issueCategory: requiredText("Issue category"), severity: requiredText("Severity"), issueBegan: requiredText("When the issue began"), description: requiredText("Detailed description", 20), unavailable: requiredText("Availability status"), errorDetails: requiredText("Error details"), preferredContactMethod: requiredText("Preferred contact method") });
export const emergencySupportSchema = z.object({ ...common, organisation: requiredText("Organisation"), urgentPhone: requiredText("Urgent contact number"), affectedService: requiredText("Affected service"), outageStatus: requiredText("Outage status"), securityIncident: requiredText("Security-incident status"), publicationBlocking: requiredText("Publication-blocking status"), incidentBegan: requiredText("When the incident began"), incidentSummary: requiredText("Incident summary", 20), chargeableAcknowledgement: z.boolean().refine(Boolean, "Acknowledge that emergency work may be chargeable.") });

export const contactFormSchemas: Record<ContactFormKey, z.ZodType> = {
  project: projectEnquirySchema,
  publishing: publishingEnquirySchema,
  book: consultationBookingSchema,
  general: generalEnquirySchema,
  support: technicalSupportSchema,
  emergency: emergencySupportSchema,
};

const serviceOptions = ["Digital Experiences", "Business Systems", "Managed Infrastructure", "Support & Recovery", "Publishing", "Custom Development", "Not Sure Yet"];
const publishingOptions = ["OJS setup", "OJS migration", "OJS upgrade", "Managed hosting", "Technical support", "Theme development", "Plugin development", "Editorial or production support", "Training", "Multi-journal platform", "Not Sure Yet"];
const contactOptions = ["Email", "Phone", "WhatsApp"];

export const contactFormDefinitions: Record<ContactFormKey, ContactFormDefinition> = {
  project: { key: "project", title: "Discuss a Project", description: "Describe the organisation, operating problem and outcome before choosing a solution.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation", type: "text", required: true }, { name: "serviceNeeded", label: "Service needed", type: "select", options: serviceOptions, required: true }, { name: "existingSystem", label: "Existing website or system", type: "text", required: true }, { name: "projectSummary", label: "Project summary", type: "textarea", required: true, wide: true }, { name: "mainProblem", label: "Main problem", type: "textarea", required: true, wide: true }, { name: "desiredOutcome", label: "Desired outcome", type: "textarea", required: true, wide: true }, { name: "estimatedTimeline", label: "Estimated timeline", type: "text", required: true }, { name: "budgetRange", label: "Budget range", type: "select", options: ["Under ₦500,000", "₦500,000–₦1,500,000", "₦1,500,000–₦5,000,000", "Above ₦5,000,000", "Needs scoping"], required: true }, { name: "relevantLinks", label: "Relevant links", type: "url" }, { name: "preferredContactMethod", label: "Preferred contact method", type: "select", options: contactOptions, required: true }, { name: "attachment", label: "Optional file", type: "file", hint: "Upload integration is prepared; a live provider is not configured." },
  ] },
  publishing: { key: "publishing", title: "Publishing Enquiry", description: "Share the platform, journal programme and publishing objective that need attention.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation or institution", type: "text", required: true }, { name: "journalName", label: "Journal or platform name", type: "text", required: true }, { name: "journalUrl", label: "Journal URL", type: "text", required: true }, { name: "ojsVersion", label: "OJS version", type: "text", required: true }, { name: "journalCount", label: "Number of journals", type: "text", required: true }, { name: "serviceRequired", label: "Service required", type: "select", options: publishingOptions, required: true }, { name: "hostingArrangement", label: "Current hosting arrangement", type: "text", required: true }, { name: "migrationRequired", label: "Is migration required?", type: "select", options: ["Yes", "No", "Not sure"], required: true }, { name: "desiredLaunchDate", label: "Desired launch date", type: "text", required: true }, { name: "objective", label: "Main issue or objective", type: "textarea", required: true, wide: true }, { name: "attachment", label: "Optional file", type: "file" },
  ] },
  book: { key: "book", title: "Book a Consultation", description: "Prepare the context for a useful conversation. A request is not a confirmed appointment.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation", type: "text", required: true }, { name: "consultationType", label: "Consultation type", type: "select", options: ["Project discovery", "Publishing technology", "Infrastructure review", "Recovery planning", "Technical advisory"], required: true }, { name: "projectSummary", label: "Short project summary", type: "textarea", required: true, wide: true }, { name: "existingPlatform", label: "Existing website or platform", type: "text", required: true }, { name: "preferredDate", label: "Preferred date", type: "date", required: true }, { name: "preferredTimeWindow", label: "Preferred time window", type: "text", required: true }, { name: "timeZone", label: "Time zone", type: "text", required: true }, { name: "relevantLinks", label: "Relevant links", type: "url" }, { name: "reviewMaterial", label: "Material Airix should review beforehand", type: "textarea", required: true, wide: true },
  ] },
  general: { key: "general", title: "General Enquiry", description: "For partnerships, institutional questions, media, vendors and other non-project messages.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation", type: "text", required: true }, { name: "enquiryType", label: "Enquiry type", type: "select", options: ["Partnership", "Institutional enquiry", "Media", "Vendor", "Open-source", "General question", "Other"], required: true }, { name: "message", label: "Message", type: "textarea", required: true, wide: true },
  ] },
  support: { key: "support", title: "Technical Support", description: "Record the affected system, impact and evidence needed for initial triage.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation or client name", type: "text", required: true }, { name: "affectedSystem", label: "Affected website or system", type: "text", required: true }, { name: "issueCategory", label: "Issue category", type: "select", options: ["Access", "Publishing or OJS", "Hosting", "Email", "Performance", "Security concern", "Failed update", "Integration", "Other"], required: true }, { name: "severity", label: "Severity", type: "select", options: ["Normal", "Important", "Urgent", "Critical outage"], required: true }, { name: "issueBegan", label: "When the issue began", type: "text", required: true }, { name: "description", label: "Detailed description", type: "textarea", required: true, wide: true }, { name: "unavailable", label: "Is the service unavailable?", type: "select", options: ["Yes", "No", "Intermittently", "Not sure"], required: true }, { name: "errorDetails", label: "Error details", type: "textarea", required: true, wide: true }, { name: "attachment", label: "Optional screenshot or file", type: "file" }, { name: "preferredContactMethod", label: "Preferred contact method", type: "select", options: contactOptions, required: true },
  ] },
  emergency: { key: "emergency", title: "Emergency Support", description: "For unavailable, compromised, corrupted or publication-blocking production systems.", fields: [
    { name: "fullName", label: "Full name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "organisation", label: "Organisation", type: "text", required: true }, { name: "urgentPhone", label: "Urgent contact number", type: "tel", required: true }, { name: "affectedService", label: "Affected service", type: "text", required: true }, { name: "outageStatus", label: "Outage status", type: "select", options: ["Fully unavailable", "Partially unavailable", "Severely impaired", "Unknown"], required: true }, { name: "securityIncident", label: "Security incident?", type: "select", options: ["Yes", "No", "Suspected", "Unknown"], required: true }, { name: "publicationBlocking", label: "Publication blocking?", type: "select", options: ["Yes", "No", "Not applicable", "Unknown"], required: true }, { name: "incidentBegan", label: "When the incident began", type: "text", required: true }, { name: "incidentSummary", label: "Concise incident summary", type: "textarea", required: true, wide: true }, { name: "attachment", label: "Optional evidence upload", type: "file" }, { name: "chargeableAcknowledgement", label: "I understand emergency work may be chargeable.", type: "checkbox", required: true, wide: true },
  ] },
};

for (const definition of Object.values(contactFormDefinitions)) {
  definition.fields.push({ name: "privacyAcknowledgement", label: "I have read and acknowledge the Privacy notice.", type: "checkbox", required: true, wide: true });
}

export function isContactFormKey(value: string | null): value is ContactFormKey {
  return Boolean(value && contactFormKeys.includes(value as ContactFormKey));
}

export function validateContactForm(type: ContactFormKey, values: unknown) {
  return contactFormSchemas[type].safeParse(values);
}
