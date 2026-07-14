import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas Landmarks W2 — Internal Review",
  description: "Private implementation review of the Airix Atlas Landmark proof system.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AtlasLandmarksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
