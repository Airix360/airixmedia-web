import type { ContactFormKey } from "./contact-forms";

export type ContactSubmission = {
  type: ContactFormKey;
  sourceRoute: string;
  values: Record<string, string | boolean>;
  attachment?: { name: string; type: string; size: number };
};

export type ContactSubmissionResult =
  | { ok: true; reference: string }
  | { ok: false; code: "provider_not_configured" | "provider_not_supported"; message: string };

export async function submitContactEnquiry(submission: ContactSubmission): Promise<ContactSubmissionResult> {
  void submission;
  const provider = process.env.CONTACT_SUBMISSION_PROVIDER?.trim();
  if (!provider) return { ok: false, code: "provider_not_configured", message: "Online submission is not configured. Your enquiry has not been sent." };
  return { ok: false, code: "provider_not_supported", message: `The configured submission provider “${provider}” does not have an approved adapter. Your enquiry has not been sent.` };
}
