import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { knowledgeServicePathways, paystackOjsProject, publishingSystem, publishingWorkflow } from "@/content/atlas/knowledge";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";
import { KnowledgeDistrictReview } from "./KnowledgeDistrictReview";

const review = { candidateAccess: "internal-review" } as const;

function renderReview() {
  return render(
    <KnowledgeDistrictReview
      scene={getAtlasScene("ill-0002", review)}
      marker={getAtlasLibraryAsset("knowledgeMarker", review)}
      route={getAtlasLibraryAsset("primaryRoute", review)}
      paper={getAtlasLibraryAsset("fineHalftone", review)}
      archive={getAtlasLibraryAsset("communityArchive", review)}
      letterpress={getAtlasLibraryAsset("letterpress", review)}
      cabinet={getAtlasLibraryAsset("archiveCabinet", review)}
      archiveSign={getAtlasLibraryAsset("archiveRoomSign", review)}
      archiveStamp={getAtlasLibraryAsset("archiveCopyStamp", review)}
    />,
  );
}

describe("Atlas Knowledge District", () => {
  it("renders the six required sourced capability groups with the approved public navigation", () => {
    const { container } = renderReview();
    expect(container.querySelector("[data-atlas-knowledge]")).toHaveAttribute("data-artwork-status", "candidate");
    expect(container.querySelectorAll("[data-pathway-variant='knowledge']")).toHaveLength(6);
    for (const pathway of knowledgeServicePathways) expect(screen.getByRole("heading", { name: pathway.name })).toBeInTheDocument();
    const labels = within(screen.getByRole("navigation", { name: "Primary navigation" })).getAllByRole("link").map((link) => link.textContent).join(" ");
    expect(labels).toMatch(/Work.*Services.*Publishing.*Atlas.*Studio.*Discuss a Project/);
  });

  it("provides complete textual equivalents for the workflow and publishing system", () => {
    const { container } = renderReview();
    expect(container.querySelectorAll("[data-workflow-textual-equivalent] > li")).toHaveLength(publishingWorkflow.length);
    expect(container.querySelectorAll("[data-publishing-system-textual-equivalent] > li")).toHaveLength(publishingSystem.length);
  });

  it("supports arrow-key movement through the workflow stage tabs", () => {
    renderReview();
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("shows the verified public repository record and its explicit limitations", () => {
    renderReview();
    const project = screen.getByRole("heading", { name: paystackOjsProject.name }).closest("article");
    expect(project).toHaveAttribute("data-evidence-status", "verified-public-repository");
    expect(within(project as HTMLElement).getByRole("link", { name: /Inspect the OJS Paystack/ })).toHaveAttribute("href", paystackOjsProject.repository);
    expect(within(project as HTMLElement).getByText(/README header still displays version 1.1.0/)).toBeInTheDocument();
  });

  it("keeps proposal status, commercial limits, and related routes explicit", () => {
    renderReview();
    expect(screen.getByText("Proposed internal copy")).toBeInTheDocument();
    expect(screen.getByText(/No response time, uptime, package price, indexing acceptance/)).toBeInTheDocument();
    const routes = screen.getByRole("navigation", { name: "Knowledge related routes" });
    expect(within(routes).getByRole("link", { name: /Work/ })).toHaveAttribute("href", "/systems");
    expect(within(routes).getByRole("link", { name: /Services/ })).toHaveAttribute("href", "/services");
    expect(within(routes).getByRole("link", { name: /Infrastructure/ })).toHaveAttribute("href", "/services/managed-infrastructure");
    expect(within(routes).getByRole("link", { name: /Atlas/ })).toHaveAttribute("href", "/atlas");
    expect(within(routes).getByRole("link", { name: /Discuss a Publishing Project/ })).toHaveAttribute("href", "/start-a-project");
  });

  it("uses meaningful scene alternative text and hides decorative marker artwork", () => {
    renderReview();
    expect(screen.getAllByRole("img", { name: /illustrated knowledge district/i }).length).toBeGreaterThan(0);
    const marker = document.querySelector("[data-district='knowledge'] img");
    expect(marker).toHaveAttribute("alt", "");
    expect(marker).toHaveAttribute("aria-hidden", "true");
  });
});
