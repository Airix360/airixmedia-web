import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  async redirects() {
    return [
      { source: "/systems", destination: "/work", permanent: true },
      { source: "/systems/:slug*", destination: "/work/:slug*", permanent: true },
      { source: "/company", destination: "/studio", permanent: true },
      { source: "/start-a-project", destination: "/discuss", permanent: true },
      { source: "/project-brief", destination: "/discuss", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ] }];
  },
};

export default nextConfig;
