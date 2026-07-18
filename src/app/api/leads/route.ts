import { NextResponse } from "next/server";
import { isContactFormKey, validateContactForm } from "@/lib/contact-forms";
import { submitContactEnquiry } from "@/lib/contact-submission";

const booleanFields = new Set(["privacyAcknowledgement", "chargeableAcknowledgement"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ ok: false, error: "Origin validation failed." }, { status: 403 });

  let formData: FormData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ ok: false, error: "Use multipart form data." }, { status: 415 }); }

  const selectedForm = String(formData.get("selectedForm") ?? "");
  if (!isContactFormKey(selectedForm)) return NextResponse.json({ ok: false, error: "Select a valid enquiry type." }, { status: 422 });
  if (String(formData.get("website") ?? "").trim()) return NextResponse.json({ ok: false, error: "Spam validation failed." }, { status: 400 });

  const values: Record<string, string | boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "attachment" || key === "selectedForm" || key === "website" || value instanceof File) continue;
    values[key] = booleanFields.has(key) ? value === "true" || value === "on" : String(value);
  }
  for (const key of booleanFields) if (!(key in values)) values[key] = false;

  const validation = validateContactForm(selectedForm, values);
  if (!validation.success) return NextResponse.json({ ok: false, error: "Review the highlighted fields.", fields: validation.error.flatten().fieldErrors }, { status: 422 });

  const upload = formData.get("attachment");
  let attachment: { name: string; type: string; size: number } | undefined;
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > 10 * 1024 * 1024) return NextResponse.json({ ok: false, error: "Files must be 10 MB or smaller." }, { status: 413 });
    const allowed = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain"]);
    if (!allowed.has(upload.type)) return NextResponse.json({ ok: false, error: "Use PDF, PNG, JPEG, WebP or plain text files." }, { status: 415 });
    attachment = { name: upload.name, type: upload.type, size: upload.size };
  }

  const result = await submitContactEnquiry({ type: selectedForm, sourceRoute: String(values.sourceRoute || "/contact"), values, attachment });
  if (!result.ok) return NextResponse.json({ ok: false, error: result.message, code: result.code }, { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "86400" } });
  return NextResponse.json({ ok: true, reference: result.reference }, { headers: { "Cache-Control": "no-store" } });
}
