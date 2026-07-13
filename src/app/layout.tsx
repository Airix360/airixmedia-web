import type { Metadata } from "next";
import { Archivo, Fragment_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/atlas-tokens.css";

const archivo = Archivo({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const fragmentMono = Fragment_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://airixmedia.com"),
  title: { default: "Airix Media — Digital systems organisations rely on", template: "%s | Airix Media" },
  description: "Airix Media designs, builds, runs, and rescues websites, business systems, publishing platforms, and technical infrastructure.",
  openGraph: { title: "Airix Media", description: "We build the digital systems organisations rely on.", type: "website", locale: "en_GB" },
  alternates: { canonical: "/", languages: { "en": "/", "fr": "/fr", "pt": "/pt" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${fragmentMono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('airix-theme');var theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',theme)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()` }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
