import { NextResponse } from "next/server";
import { leadAdapter } from "@/lib/integrations";
import { projectBriefSchema } from "@/lib/selector";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (body?.companyWebsite) return NextResponse.json({ ok: true });
  const parsed = projectBriefSchema.safeParse(body?.brief);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please review the highlighted project details.", issues: parsed.error.flatten() }, { status: 400 });
  const result = await leadAdapter.submit(parsed.data, body?.source ?? "/start-a-project");
  return NextResponse.json(result, { status: result.ok ? 201 : 503 });
}

