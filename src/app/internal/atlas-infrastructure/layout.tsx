import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Infrastructure W5 — Internal Review",
  description: "Private implementation review of the Airix Atlas Infrastructure District.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasInfrastructureLayout({ children }: { children: React.ReactNode }) { return children; }
