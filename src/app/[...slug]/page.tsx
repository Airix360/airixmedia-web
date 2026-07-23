import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { PublicPage } from "@/components/atlas-public/PublicPage";
import { getPublicPage } from "@/content/atlas/public";
import { getLegalDocument } from "@/content/legal";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const path = slug.join("/"); const legal = getLegalDocument(path); const page = getPublicPage(path);
  return { title: legal?.title ?? page?.title ?? "Airix Media", description: legal?.summary ?? page?.summary, alternates: { canonical: `/${path}` }, openGraph: { title: legal?.title ?? page?.title, description: legal?.summary ?? page?.summary, type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const legal = getLegalDocument(path);
  if (legal) return <LegalPage document={legal} />;
  const page = getPublicPage(path);
  if (!page) notFound();
  return <PublicPage page={page} path={path} />;
}
