import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Knowledge W4 — Internal Review",
  description: "Private implementation review of the Airix Atlas Knowledge District.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasKnowledgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
