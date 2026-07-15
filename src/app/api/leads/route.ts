import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    { ok: false, error: "Online project submission is unavailable. Use the local brief and a verified contact channel." },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "86400" } },
  );
}
