import type { Metadata } from "next";
import { Anybody, Archivo_Black, Barlow_Condensed, Bitter, Bodoni_Moda, Literata } from "next/font/google";

const afterSans = Barlow_Condensed({ subsets: ["latin"], variable: "--lab-after-sans", weight: ["400", "500", "600", "700"] });
const afterSerif = Literata({ subsets: ["latin"], variable: "--lab-after-serif", weight: ["400", "500", "600"] });
const motionSans = Anybody({ subsets: ["latin"], variable: "--lab-motion-sans" });
const motionSerif = Bitter({ subsets: ["latin"], variable: "--lab-motion-serif", weight: ["400", "500", "600"] });
const assembledSans = Archivo_Black({ subsets: ["latin"], variable: "--lab-assembled-sans", weight: "400" });
const assembledSerif = Bodoni_Moda({ subsets: ["latin"], variable: "--lab-assembled-serif" });

export const metadata: Metadata = {
  title: "Living Lagos design lab",
  description: "Private concept review routes for Airix Media.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${afterSans.variable} ${afterSerif.variable} ${motionSans.variable} ${motionSerif.variable} ${assembledSans.variable} ${assembledSerif.variable}`}>{children}</div>;
}
