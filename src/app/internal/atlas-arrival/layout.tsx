import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Arrival W1 — Internal Review",
  description: "Private review of the Airix Atlas Arrival District vertical slice.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasArrivalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
