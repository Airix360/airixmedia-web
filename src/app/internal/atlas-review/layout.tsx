import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Runtime W0 — Internal Review",
  description: "Private implementation review for Airix Atlas runtime primitives.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
