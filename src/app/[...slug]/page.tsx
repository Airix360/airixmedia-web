import type { Metadata } from "next";
import { PageTemplate } from "@/components/page-template";
import { getPageDefinition } from "@/lib/pages";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const page = getPageDefinition(slug.join("/"));
  return { title: page?.title ?? "Airix Media", description: page?.summary };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; return <PageTemplate path={slug.join("/")} />; }
