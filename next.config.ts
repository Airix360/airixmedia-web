import type { NextConfig } from "next";
import { routeConsolidationRedirects } from "./src/lib/route-consolidation";

const cloudflareAnalyticsScript = "https://static.cloudflareinsights.com";
const cloudflareAnalyticsEndpoint = "https://cloudflareinsights.com";
const scriptSource = process.env.NODE_ENV === "production"
  ? `script-src 'self' 'unsafe-inline' ${cloudflareAnalyticsScript}`
  : `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cloudflareAnalyticsScript}`;

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  async redirects() {
    return [
      ...routeConsolidationRedirects.map(({ source, destination, permanent }) => ({ source, destination, permanent })),
      { source: "/systems", destination: "/work", permanent: true },
      { source: "/systems/:slug*", destination: "/work", permanent: true },
      { source: "/company", destination: "/studio", permanent: true },
      { source: "/start-a-project", destination: "/contact?form=project", permanent: true },
      { source: "/project-brief", destination: "/contact?form=project", permanent: true },
      { source: "/policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
      { source: "/cookie-policy", destination: "/legal#cookies", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; connect-src 'self' ${cloudflareAnalyticsEndpoint}; font-src 'self' data:; form-action 'self' mailto: https://wa.me; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; ${scriptSource}; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests` },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
    ] }];
  },
};

export default nextConfig;
