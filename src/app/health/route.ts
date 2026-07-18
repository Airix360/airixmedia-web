import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ status: "ok", service: "airixmedia-web", version: "2.3.1.0" }); }
