import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://airixmedia.com"; return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/preview/", "/internal/"] }, sitemap: `${origin}/sitemap.xml`, host: origin }; }
