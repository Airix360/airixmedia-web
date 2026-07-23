import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const allowedFile = /^(?:[a-z0-9-]+-(?:desktop-(?:light|dark)|tablet-light|mobile-390-(?:light|dark)|mobile-360-light)|contact-(?:project-desktop|publishing-mobile)|navigation-desktop)\.png$/;

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!allowedFile.test(file) || path.basename(file) !== file) return new NextResponse("Not found", { status: 404 });
  try {
    const directory = file.startsWith("contact-") || file.startsWith("navigation-") ? "atlas-route-consolidation-r3" : "atlas-artwork-r3-wave2";
    const image = await readFile(path.join(process.cwd(), "output/playwright", directory, file));
    return new NextResponse(image, { headers: { "Content-Type": "image/png", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });
  } catch {
    return new NextResponse("Evidence has not been generated", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" } });
  }
}
