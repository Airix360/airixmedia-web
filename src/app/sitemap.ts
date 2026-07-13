import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { caseStudies, openSourceProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://airixmedia.com";
  const paths = ["", ...Object.keys(pages), "systems", ...caseStudies.map((item) => `systems/${item.slug}`), "open-source", ...openSourceProjects.map((item) => `open-source/${item.slug}`), "publishing/pricing", "start-a-project"];
  return paths.map((path) => ({ url: `${origin}/${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7, alternates: { languages: { en: `${origin}/${path}`, fr: `${origin}/fr${path ? `/${path}` : ""}`, pt: `${origin}/pt${path ? `/${path}` : ""}` } } }));
}
