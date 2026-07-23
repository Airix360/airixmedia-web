import type { MetadataRoute } from "next";
import { retainedPublicRoutes } from "@/lib/route-consolidation";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://airixmedia.com";
  return retainedPublicRoutes.map((route) => ({ url: `${origin}${route}`, changeFrequency: route === "/" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.7 }));
}
