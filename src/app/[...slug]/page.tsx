import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/atlas-public/PublicPage";
import { getPublicPage } from "@/content/atlas/public";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const page = getPublicPage(slug.join("/"));
  const path = slug.join("/");
  return { title: page?.title ?? "Airix Media", description: page?.summary, alternates: { canonical: `/${path}` }, openGraph: { title: page?.title, description: page?.summary, type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = getPublicPage(path);
  if (!page) notFound();
  return <PublicPage page={page} path={path} />;
}
