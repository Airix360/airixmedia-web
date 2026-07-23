import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Commerce W3 — Internal Review",
  description: "Private implementation review of the Airix Atlas Commerce District.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasCommerceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
