import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { publishingLandmark, technologyLandmark } from "@/content/atlas/landmarks";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";
import { ProjectMediaSequence } from "@/components/atlas/proof";
import { LandmarkReview } from "./LandmarkReview";

const review = { candidateAccess: "internal-review" } as const;

function renderReview() {
  return render(
    <LandmarkReview
      technologyScene={getAtlasScene("ill-0003", review)}
      publishingScene={getAtlasScene("ill-0002", review)}
      commerceMarker={getAtlasLibraryAsset("commerceMarker", review)}
      knowledgeMarker={getAtlasLibraryAsset("knowledgeMarker", review)}
      route={getAtlasLibraryAsset("primaryRoute", review)}
      paper={getAtlasLibraryAsset("fineHalftone", review)}
      texture={getAtlasLibraryAsset("fineHalftone", review)}
    />,
  );
}

describe("Atlas Landmark proof system", () => {
  it("renders two compositionally distinct proof patterns and explicit evidence states", () => {
    const { container } = renderReview();
    expect(container.querySelector("[data-case-pattern='operational']")).toHaveAttribute("data-proof-status", "placeholder");
    expect(container.querySelector("[data-case-pattern='editorial']")).toHaveAttribute("data-proof-status", "source_capture");
    expect(container.querySelector("[data-proof-pattern='technology']")).toBeInTheDocument();
    expect(container.querySelector("[data-proof-pattern='publishing']")).toBeInTheDocument();
    expect(screen.getByText("No authentic project media registered.")).toBeInTheDocument();
    expect(screen.getAllByText("Responsibility before capability.")).toHaveLength(2);
  });

  it("renders evidence types, source disclosures, useful media alternatives, and public routes", () => {
    renderReview();
    expect(screen.getAllByText("Responsibility record").length).toBeGreaterThan(1);
    expect(screen.getByText(/src\/lib\/content\.ts · inferred_needs_review/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /KU Journals public homepage/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Publishing/ }).some((link) => link.getAttribute("href") === "/publishing")).toBe(true);
    expect(screen.getAllByRole("link", { name: /Discuss a Project/ }).some((link) => link.getAttribute("href") === "/start-a-project")).toBe(true);
  });

  it("keeps the media sequence keyboard-operable without carousel semantics", () => {
    render(<ProjectMediaSequence projectName={publishingLandmark.name} media={publishingLandmark.media} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName(/Responsibility credit capture/);
  });

  it("keeps every unverified general-technology field visibly incomplete", () => {
    renderReview();
    const technology = screen.getByRole("heading", { name: technologyLandmark.name }).closest("article");
    expect(technology).not.toBeNull();
    expect(within(technology!).getAllByText(/Missing/).length).toBeGreaterThan(1);
    expect(within(technology!).queryByText(/conversion rate|revenue|user count/i)).not.toBeInTheDocument();
  });
});
