import { NextResponse } from "next/server";
import { isContactFormKey, validateContactForm } from "@/lib/contact-forms";
import { submitContactEnquiry } from "@/lib/contact-submission";
import { checkContactRateLimit, clientAddress } from "@/lib/contact-rate-limit";

const booleanFields = new Set(["privacyAcknowledgement", "chargeableAcknowledgement"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  try {
    if (origin && host && new URL(origin).host !== host) return NextResponse.json({ ok: false, error: "Origin validation failed.", code: "origin_rejected" }, { status: 403 });
  } catch { return NextResponse.json({ ok: false, error: "Origin validation failed.", code: "origin_rejected" }, { status: 403 }); }

  let formData: FormData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ ok: false, error: "Use multipart form data." }, { status: 415 }); }

  const selectedForm = String(formData.get("selectedForm") ?? "");
  if (!isContactFormKey(selectedForm)) return NextResponse.json({ ok: false, error: "Select a valid enquiry type." }, { status: 422 });
  if (String(formData.get("website") ?? "").trim()) return NextResponse.json({ ok: false, error: "The request could not be accepted.", code: "spam_rejected" }, { status: 400 });

  const values: Record<string, string | boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "attachment" || key === "selectedForm" || key === "website" || value instanceof File) continue;
    values[key] = booleanFields.has(key) ? value === "true" || value === "on" : String(value);
  }
  if (!("privacyAcknowledgement" in values)) values.privacyAcknowledgement = false;
  if (selectedForm === "emergency" && !("chargeableAcknowledgement" in values)) values.chargeableAcknowledgement = false;

  const validation = validateContactForm(selectedForm, values);
  if (!validation.success) return NextResponse.json({ ok: false, error: "Review the highlighted fields.", fields: validation.error.flatten().fieldErrors }, { status: 422 });

  const cleanValues = validation.data as Record<string, string | boolean>;
  const rateLimit = checkContactRateLimit({ ip: clientAddress(request.headers), email: String(cleanValues.email || ""), type: selectedForm });
  if (!rateLimit.allowed) return NextResponse.json({ ok: false, error: "Too many requests were received. Your enquiry has not been sent. Wait before trying again.", code: "rate_limited" }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(rateLimit.retryAfter) } });

  const uploads = formData.getAll("attachment").filter((item) => item instanceof File && item.size > 0);
  if (uploads.length > 1) return NextResponse.json({ ok: false, error: "Only one file may be selected.", code: "attachment_rejected" }, { status: 415 });
  const upload = uploads[0];
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > 5 * 1024 * 1024) return NextResponse.json({ ok: false, error: "Files must be 5 MB or smaller.", code: "attachment_too_large" }, { status: 413 });
    const allowed = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain"]);
    const extension = upload.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] || "";
    const permittedExtensions = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp", ".txt"]);
    if (!allowed.has(upload.type) || !permittedExtensions.has(extension)) return NextResponse.json({ ok: false, error: "Use PDF, PNG, JPEG, WebP or plain text files.", code: "attachment_rejected" }, { status: 415 });
    return NextResponse.json({ ok: false, error: "File upload is unavailable until private storage and malware scanning are approved. Remove the file and try again.", code: "attachment_unsupported" }, { status: 415, headers: { "Cache-Control": "no-store" } });
  }

  const result = await submitContactEnquiry({ type: selectedForm, sourceRoute: String(cleanValues.sourceRoute || "/contact"), values: cleanValues });
  if (!result.ok) return NextResponse.json({ ok: false, error: result.message, code: result.code, fallbackMessage: result.fallbackMessage, fallbackUrl: result.fallbackUrl }, { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": result.code === "provider_not_configured" ? "86400" : "300" } });
  return NextResponse.json({ ok: true, reference: result.reference, message: result.message }, { headers: { "Cache-Control": "no-store" } });
}
