import { randomBytes } from "node:crypto";
import { z } from "zod";
import type { ContactFormKey } from "./contact-forms";

export type ContactSubmission = {
  type: ContactFormKey;
  sourceRoute: string;
  values: Record<string, string | boolean>;
  attachment?: { name: string; type: string; size: number };
};

export type DeliveryCode = "provider_not_configured" | "provider_not_supported" | "provider_unavailable" | "delivery_failed" | "attachment_unsupported";
export type ContactSubmissionResult =
  | { ok: true; reference: string; message: string; provider: "brevo" | "mock"; providerRequestId?: string; usedFallback?: boolean }
  | { ok: false; code: DeliveryCode; message: string; fallbackMessage?: string; fallbackUrl?: string };

export type ProviderReadiness = {
  ready: boolean;
  contactProvider: string;
  emergencyProvider: string;
  checks: Record<string, boolean>;
  routingGroups: Record<ContactFormKey, boolean>;
  attachmentMode: "disabled";
  rateLimiter: "process-local";
};

type Recipient = { email: string };
type EmailMessage = {
  sender: { email: string; name: string };
  to: Recipient[];
  cc?: Recipient[];
  replyTo?: Recipient;
  subject: string;
  textContent: string;
  htmlContent: string;
};
type ProviderResponse = { ok: true; requestId?: string } | { ok: false; category: "timeout" | "rejected" | "malformed" | "unavailable" };

export interface ContactSubmissionProvider {
  readonly name: "brevo" | "mock";
  deliver(message: EmailMessage): Promise<ProviderResponse>;
}

export interface EmergencyEscalationProvider {
  readonly name: "email" | "mock";
  deliverPrimary(message: EmailMessage): Promise<ProviderResponse>;
  deliverFallback(message: EmailMessage): Promise<ProviderResponse>;
}

const emailSchema = z.string().trim().max(254).email();

export function parseRecipientList(raw: string | undefined): { recipients: Recipient[]; valid: boolean } {
  if (!raw?.trim()) return { recipients: [], valid: false };
  const values = raw.split(/[;,]/).map((value) => value.trim()).filter(Boolean);
  const parsed = values.map((email) => emailSchema.safeParse(email));
  return { recipients: parsed.flatMap((item) => item.success ? [{ email: item.data.toLowerCase() }] : []), valid: values.length > 0 && parsed.every((item) => item.success) };
}

function env(name: string) { return process.env[name]?.trim() || ""; }
function enabled(name: string, defaultValue = false) { const value = env(name).toLowerCase(); return value ? value === "true" : defaultValue; }
function stagingMarker() { return env("APP_ENVIRONMENT").toLowerCase() === "staging" ? "[STAGING TEST — NO ACTION REQUIRED] " : ""; }

export function safePublicFallbackUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  if (!candidate || /[\r\n]/.test(candidate)) return undefined;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === "https:") return parsed.toString();
    if (parsed.protocol === "mailto:") {
      const recipient = decodeURIComponent(parsed.pathname);
      const queryKeys = [...parsed.searchParams.keys()];
      const subject = parsed.searchParams.get("subject");
      const queryIsSafe = queryKeys.every((key) => key === "subject")
        && (!subject || !/[\r\n]/.test(subject));
      if (emailSchema.safeParse(recipient).success && queryIsSafe) return candidate;
    }
  } catch { return undefined; }
  return undefined;
}

const recipientEnvironment: Record<ContactFormKey, string> = {
  project: "CONTACT_PROJECT_RECIPIENTS",
  publishing: "CONTACT_PUBLISHING_RECIPIENTS",
  book: "CONTACT_BOOKING_RECIPIENTS",
  general: "CONTACT_GENERAL_RECIPIENTS",
  support: "CONTACT_SUPPORT_RECIPIENTS",
  emergency: "EMERGENCY_RECIPIENTS",
};

export function getContactProviderReadiness(): ProviderReadiness {
  const contactProvider = env("CONTACT_SUBMISSION_PROVIDER") || "unconfigured";
  const emergencyProvider = env("EMERGENCY_ESCALATION_PROVIDER") || "unconfigured";
  const routingGroups = Object.fromEntries(Object.entries(recipientEnvironment).map(([type, name]) => [type, parseRecipientList(process.env[name]).valid])) as Record<ContactFormKey, boolean>;
  const senderName = env("CONTACT_FROM_NAME");
  const sender = emailSchema.safeParse(env("CONTACT_FROM_EMAIL")).success && Boolean(senderName) && senderName === safeHeaderValue(senderName);
  const emergencyCc = parseRecipientList(process.env.EMERGENCY_CC_RECIPIENTS);
  const emergencyFallback = parseRecipientList(process.env.EMERGENCY_FALLBACK_RECIPIENTS);
  const ccValid = !env("EMERGENCY_CC_RECIPIENTS") || emergencyCc.valid;
  const fallbackRecipientsValid = !env("EMERGENCY_FALLBACK_RECIPIENTS") || emergencyFallback.valid;
  const fallbackUrl = env("EMERGENCY_PUBLIC_FALLBACK_URL");
  const publicFallbackValid = Boolean(env("EMERGENCY_PUBLIC_FALLBACK_MESSAGE")) && (!fallbackUrl || Boolean(safePublicFallbackUrl(fallbackUrl)));
  const checks = {
    apiKeyConfigured: Boolean(env("BREVO_API_KEY")),
    senderConfigured: sender,
    replyToModeValid: !env("CONTACT_REPLY_TO_MODE") || ["requester", "none"].includes(env("CONTACT_REPLY_TO_MODE")),
    contactProviderConfigured: contactProvider === "brevo" || (contactProvider === "mock" && process.env.NODE_ENV !== "production"),
    generalRecipientsConfigured: routingGroups.general,
    projectRecipientsConfigured: routingGroups.project,
    publishingRecipientsConfigured: routingGroups.publishing,
    bookingRecipientsConfigured: routingGroups.book,
    supportRecipientsConfigured: routingGroups.support,
    emergencyProviderConfigured: emergencyProvider === "email" || (emergencyProvider === "mock" && process.env.NODE_ENV !== "production"),
    emergencyRecipientsConfigured: routingGroups.emergency,
    emergencyCcConfigurationValid: ccValid,
    emergencyFallbackRecipientsValid: fallbackRecipientsValid,
    emergencyFallbackConfigured: publicFallbackValid,
    attachmentAdapterConfigured: false,
    rateLimiterConfigured: true,
  };
  const providerCredentials = contactProvider === "mock" ? process.env.NODE_ENV !== "production" : checks.apiKeyConfigured && checks.senderConfigured;
  return { ready: providerCredentials && checks.contactProviderConfigured && checks.emergencyProviderConfigured && checks.replyToModeValid && Object.values(routingGroups).every(Boolean) && ccValid && fallbackRecipientsValid && publicFallbackValid, contactProvider, emergencyProvider, checks, routingGroups, attachmentMode: "disabled", rateLimiter: "process-local" };
}

export function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

export function safeHeaderValue(value: unknown): string {
  return String(value || "").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 180);
}

const prefixes: Record<ContactFormKey, string> = { project: "PROJ", publishing: "PUB", book: "BOOK", general: "GEN", support: "SUP", emergency: "EMG" };
export function generateSubmissionReference(type: ContactFormKey): string {
  return `AM-${prefixes[type]}-${randomBytes(9).toString("base64url").toUpperCase()}`;
}

const fieldLabels: Record<string, string> = {
  fullName: "Requester name", email: "Requester email", organisation: "Organisation", sourceRoute: "Source route", serviceNeeded: "Service", existingSystem: "Existing system", projectSummary: "Project summary", mainProblem: "Main problem", desiredOutcome: "Desired outcome", estimatedTimeline: "Estimated timeline", budgetRange: "Budget range", relevantLinks: "Relevant links", preferredContactMethod: "Preferred contact method", journalName: "Journal or platform", journalUrl: "Journal URL", ojsVersion: "OJS version", journalCount: "Journal count", serviceRequired: "Service", hostingArrangement: "Hosting arrangement", migrationRequired: "Migration required", desiredLaunchDate: "Desired launch date", objective: "Objective", consultationType: "Consultation type", existingPlatform: "Existing platform", preferredDate: "Preferred date", preferredTimeWindow: "Preferred time window", timeZone: "Time zone", reviewMaterial: "Review material", enquiryType: "Enquiry type", message: "Message", affectedSystem: "Affected system", issueCategory: "Issue category", severity: "Severity", issueBegan: "Issue began", description: "Description", unavailable: "Service unavailable", errorDetails: "Error details", urgentPhone: "Urgent contact number", affectedService: "Affected service", outageStatus: "Outage status", securityIncident: "Security incident", publicationBlocking: "Publication blocking", incidentBegan: "Incident began", incidentSummary: "Incident summary", chargeableAcknowledgement: "Chargeable work acknowledged", privacyAcknowledgement: "Privacy notice acknowledged",
};

function subjectFor(submission: ContactSubmission): string {
  const v = submission.values;
  const identity = safeHeaderValue(v.organisation || v.fullName) || "Requester";
  const subject = submission.type === "project" ? `[Project enquiry] ${identity} · ${safeHeaderValue(v.serviceNeeded)}`
    : submission.type === "publishing" ? `[Publishing enquiry] ${safeHeaderValue(v.journalName || v.organisation) || identity} · ${safeHeaderValue(v.serviceRequired)}`
      : submission.type === "book" ? `[Consultation request] ${identity}`
        : submission.type === "support" ? `[Technical support] ${identity} · ${safeHeaderValue(v.severity)}`
          : submission.type === "emergency" ? `[Emergency request] ${identity} · ${safeHeaderValue(v.outageStatus)}`
            : `[General enquiry] ${identity} · ${safeHeaderValue(v.enquiryType)}`;
  return safeHeaderValue(`${stagingMarker()}${subject}`);
}

function buildMessage(submission: ContactSubmission, reference: string, recipients: Recipient[], cc: Recipient[] = []): EmailMessage {
  const timestamp = new Date().toISOString();
  const privacyTimestamp = submission.values.privacyAcknowledgement ? timestamp : "not acknowledged";
  const rows: Array<[string, string]> = [
    ["Form type", submission.type], ["Submission reference", reference], ["Submitted at", timestamp], ["Source route", submission.sourceRoute],
    ...Object.entries(submission.values).filter(([key]) => key !== "sourceRoute").map(([key, value]) => [fieldLabels[key] || key, typeof value === "boolean" ? (value ? "Yes" : "No") : value] as [string, string]),
    ["Attachment status", submission.attachment ? "Rejected: attachment delivery is unavailable" : "No attachment supplied"], ["Environment", env("APP_ENVIRONMENT") || process.env.NODE_ENV || "unknown"], ["Privacy acknowledgement timestamp", privacyTimestamp],
  ];
  const textContent = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlContent = `<!doctype html><html lang="en"><body><main><h1>${escapeHtml(subjectFor(submission))}</h1><table><tbody>${rows.map(([label, value]) => `<tr><th scope="row" style="text-align:left;vertical-align:top;padding:8px">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</tbody></table></main></body></html>`;
  const replyTo = env("CONTACT_REPLY_TO_MODE") === "requester" && emailSchema.safeParse(submission.values.email).success ? { email: String(submission.values.email).toLowerCase() } : undefined;
  return { sender: { email: env("CONTACT_FROM_EMAIL"), name: safeHeaderValue(env("CONTACT_FROM_NAME")) }, to: recipients, ...(cc.length ? { cc } : {}), ...(replyTo ? { replyTo } : {}), subject: subjectFor(submission), textContent, htmlContent };
}

export class BrevoContactSubmissionProvider implements ContactSubmissionProvider {
  readonly name = "brevo" as const;
  constructor(private readonly apiKey: string, private readonly request: typeof fetch = fetch) {}
  async deliver(message: EmailMessage): Promise<ProviderResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Number(env("CONTACT_PROVIDER_TIMEOUT_MS")) || 10_000);
    try {
      const response = await this.request("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { accept: "application/json", "api-key": this.apiKey, "content-type": "application/json" }, body: JSON.stringify(message), signal: controller.signal });
      if (!response.ok) return { ok: false, category: response.status >= 500 ? "unavailable" : "rejected" };
      const body: unknown = await response.json().catch(() => null);
      if (!body || typeof body !== "object" || !("messageId" in body) || typeof body.messageId !== "string") return { ok: false, category: "malformed" };
      return { ok: true, requestId: body.messageId.slice(0, 200) };
    } catch (error) { return { ok: false, category: error instanceof Error && error.name === "AbortError" ? "timeout" : "unavailable" }; }
    finally { clearTimeout(timer); }
  }
}

export class MockContactSubmissionProvider implements ContactSubmissionProvider {
  readonly name = "mock" as const;
  async deliver(message: EmailMessage): Promise<ProviderResponse> {
    const address = message.replyTo?.email || "";
    if (address.includes("provider-timeout")) return { ok: false, category: "timeout" };
    if (address.includes("provider-fail")) return { ok: false, category: "rejected" };
    return { ok: true, requestId: "mock-request" };
  }
}

export class EmailEmergencyEscalationProvider implements EmergencyEscalationProvider {
  readonly name = "email" as const;
  constructor(private readonly provider: ContactSubmissionProvider) {}
  deliverPrimary(message: EmailMessage) { return this.provider.deliver(message); }
  deliverFallback(message: EmailMessage) { return this.provider.deliver(message); }
}

function createContactProvider(): ContactSubmissionProvider | null {
  const selected = env("CONTACT_SUBMISSION_PROVIDER");
  if (selected === "brevo" && env("BREVO_API_KEY")) return new BrevoContactSubmissionProvider(env("BREVO_API_KEY"));
  if (selected === "mock" && process.env.NODE_ENV !== "production") return new MockContactSubmissionProvider();
  return null;
}

function logDelivery(event: { reference: string; formType: ContactFormKey; status: string; provider: string; failureCategory?: string; providerRequestId?: string }) {
  console.info(JSON.stringify({ event: "contact_delivery", timestamp: new Date().toISOString(), environment: env("APP_ENVIRONMENT") || process.env.NODE_ENV || "unknown", ...event }));
}

function successMessage(type: ContactFormKey, reference: string, usedFallback = false) {
  if (type === "book") return `Your consultation request was delivered. Reference: ${reference}. This is not a confirmed appointment. Airix Media will review your preferred date and contact you to confirm availability.`;
  if (type === "support") return `Your support request was delivered. Reference: ${reference}. This confirms delivery only and does not mean a support ticket has been created or assigned.`;
  if (type === "emergency") return `Your emergency request was delivered${usedFallback ? " through the fallback route" : ""}. Reference: ${reference}. Delivery does not mean that the incident has been accepted, assigned or seen by a technician. Emergency work may be chargeable. Airix Media monitors emergency requests daily from 08:00 to 22:00 West Africa Time. Requests outside those hours are handled on a best-effort basis.`;
  return `Enquiry delivered. Reference ${reference}.`;
}

export async function submitContactEnquiry(submission: ContactSubmission, providerOverride?: ContactSubmissionProvider): Promise<ContactSubmissionResult> {
  if (submission.attachment) return { ok: false, code: "attachment_unsupported", message: "File upload is unavailable. Remove the attachment and try again." };
  const reference = generateSubmissionReference(submission.type);
  const readiness = getContactProviderReadiness();
  const recipients = parseRecipientList(process.env[recipientEnvironment[submission.type]]);
  const selectedProvider = env("CONTACT_SUBMISSION_PROVIDER");
  if (!providerOverride && selectedProvider && selectedProvider !== "brevo" && !(selectedProvider === "mock" && process.env.NODE_ENV !== "production")) return { ok: false, code: "provider_not_supported", message: "The configured submission provider does not have an approved adapter. Your enquiry has not been sent." };
  if (!providerOverride && selectedProvider === "brevo" && (!env("BREVO_API_KEY") || !emailSchema.safeParse(env("CONTACT_FROM_EMAIL")).success || !env("CONTACT_FROM_NAME") || env("CONTACT_FROM_NAME") !== safeHeaderValue(env("CONTACT_FROM_NAME")))) return { ok: false, code: "provider_not_configured", message: "Online submission is not configured. Your enquiry has not been sent." };
  const provider = providerOverride || createContactProvider();
  if (!provider || !recipients.valid) {
    const fallbackMessage = submission.type === "emergency" ? env("EMERGENCY_PUBLIC_FALLBACK_MESSAGE") || undefined : undefined;
    const fallbackUrl = submission.type === "emergency" ? safePublicFallbackUrl(env("EMERGENCY_PUBLIC_FALLBACK_URL")) : undefined;
    logDelivery({ reference, formType: submission.type, status: "not_configured", provider: readiness.contactProvider });
    return { ok: false, code: "provider_not_configured", message: submission.type === "emergency" ? "Emergency delivery is not configured. Your request has not been sent." : "Online submission is not configured. Your enquiry has not been sent.", fallbackMessage, fallbackUrl };
  }
  if (submission.type === "emergency") {
    const selectedEmergency = env("EMERGENCY_ESCALATION_PROVIDER");
    if (!(selectedEmergency === "email" || (selectedEmergency === "mock" && process.env.NODE_ENV !== "production"))) return { ok: false, code: "provider_not_configured", message: "Emergency delivery is not configured. Your request has not been sent.", fallbackMessage: env("EMERGENCY_PUBLIC_FALLBACK_MESSAGE") || undefined };
    const escalation = new EmailEmergencyEscalationProvider(provider);
    const cc = parseRecipientList(process.env.EMERGENCY_CC_RECIPIENTS);
    const primary = await escalation.deliverPrimary(buildMessage(submission, reference, recipients.recipients, cc.valid ? cc.recipients : []));
    let delivered = primary; let usedFallback = false;
    if (!primary.ok) {
      const fallback = parseRecipientList(process.env.EMERGENCY_FALLBACK_RECIPIENTS);
      if (fallback.valid) { delivered = await escalation.deliverFallback(buildMessage(submission, reference, fallback.recipients)); usedFallback = delivered.ok; }
    }
    if (!delivered.ok) {
      logDelivery({ reference, formType: submission.type, status: "failed", provider: provider.name, failureCategory: delivered.category });
      return { ok: false, code: delivered.category === "timeout" ? "provider_unavailable" : "delivery_failed", message: "Emergency delivery failed. Your request has not been sent.", fallbackMessage: env("EMERGENCY_PUBLIC_FALLBACK_MESSAGE") || undefined, fallbackUrl: safePublicFallbackUrl(env("EMERGENCY_PUBLIC_FALLBACK_URL")) };
    }
    logDelivery({ reference, formType: submission.type, status: usedFallback ? "delivered_fallback" : "delivered", provider: provider.name, providerRequestId: delivered.requestId });
    if (enabled("EMERGENCY_ACKNOWLEDGEMENT_ENABLED", true) && emailSchema.safeParse(submission.values.email).success) {
      const acknowledgement = buildMessage(submission, reference, [{ email: String(submission.values.email).toLowerCase() }]);
      const acknowledgementMessage = successMessage("emergency", reference, usedFallback);
      acknowledgement.subject = safeHeaderValue(`${stagingMarker()}Airix Media emergency request delivered · ${reference}`);
      acknowledgement.textContent = `${stagingMarker()}${acknowledgementMessage}`;
      acknowledgement.htmlContent = `<p>${escapeHtml(stagingMarker())}${escapeHtml(acknowledgementMessage)}</p>`;
      const acknowledgementResult = await provider.deliver(acknowledgement);
      logDelivery({ reference, formType: "emergency", status: acknowledgementResult.ok ? "acknowledgement_delivered" : "acknowledgement_failed", provider: provider.name, ...(!acknowledgementResult.ok ? { failureCategory: acknowledgementResult.category } : {}) });
    }
    return { ok: true, reference, provider: provider.name, providerRequestId: delivered.requestId, usedFallback, message: successMessage("emergency", reference, usedFallback) };
  }
  const delivered = await provider.deliver(buildMessage(submission, reference, recipients.recipients));
  if (!delivered.ok) {
    logDelivery({ reference, formType: submission.type, status: "failed", provider: provider.name, failureCategory: delivered.category });
    return { ok: false, code: delivered.category === "timeout" ? "provider_unavailable" : "delivery_failed", message: "Delivery failed. Your enquiry has not been sent. Please try again or use the published direct contact channel." };
  }
  logDelivery({ reference, formType: submission.type, status: "delivered", provider: provider.name, providerRequestId: delivered.requestId });
  return { ok: true, reference, provider: provider.name, providerRequestId: delivered.requestId, message: successMessage(submission.type, reference) };
}
