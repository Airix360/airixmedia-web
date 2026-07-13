import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Airix Media", short_name: "Airix", description: "Digital systems organisations rely on.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#111111", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] }; }
