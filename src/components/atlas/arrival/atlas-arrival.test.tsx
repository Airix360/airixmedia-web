import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";
import { ArrivalJourney } from "./ArrivalJourney";

const review = { candidateAccess: "internal-review" } as const;

function renderJourney() {
  return render(
    <ArrivalJourney
      scene={getAtlasScene("ill-0001", review)}
      marker={getAtlasLibraryAsset("arrivalMarker", review)}
      route={getAtlasLibraryAsset("primaryRoute", review)}
      paper={getAtlasLibraryAsset("warmPaper", review)}
      haze={getAtlasLibraryAsset("morningHaze", review)}
    />,
  );
}

describe("Atlas Arrival vertical slice", () => {
  it("preserves the four-state narrative and direct proposition", () => {
    const { container } = renderJourney();

    expect(container.querySelectorAll("[data-arrival-step]")).toHaveLength(4);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Every thriving city depends on invisible systems.");
    expect(screen.getByRole("heading", { name: "The city wakes." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /We build the invisible systems/ })).toBeInTheDocument();
  });

  it("exposes a functional skip target and approved onward actions", () => {
    renderJourney();
    expect(screen.getByRole("link", { name: "Skip Atlas journey" })).toHaveAttribute("href", "#arrival-proposition");
    const proposition = screen.getByRole("heading", { name: /We build the invisible systems/ }).closest("section");
    expect(proposition).toHaveAttribute("id", "arrival-proposition");
    expect(within(proposition!).getByRole("link", { name: "Explore the system" })).toHaveAttribute("href", "/services");
    expect(within(proposition!).getByRole("link", { name: "Discuss a Project" })).toHaveAttribute("href", "/start-a-project");
  });

  it("keeps candidate status explicit in the route and scene", () => {
    const { container } = renderJourney();
    expect(container.querySelector("[data-atlas-arrival]")).toHaveAttribute("data-asset-status", "candidate");
    expect(screen.getByText("ILL-0001 remains candidate artwork")).toBeInTheDocument();
    expect(container.querySelector("[data-atlas-scene='ill-0001']")).toHaveAttribute("data-asset-status", "candidate");
  });
});
