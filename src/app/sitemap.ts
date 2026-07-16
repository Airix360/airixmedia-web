import type { MetadataRoute } from "next";
import { publicPages } from "@/content/atlas/public";
import { openSourceProjects } from "@/lib/content";
import { legalDocuments } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://airixmedia.com";
  const paths = ["", ...publicPages.map((page) => page.path), "work/ku-journals", ...openSourceProjects.map((item) => `open-source/${item.slug}`), "publishing/pricing", ...legalDocuments.map((item) => item.path)];
  return [...new Set(paths)].map((path) => ({ url: `${origin}/${path}`, changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
