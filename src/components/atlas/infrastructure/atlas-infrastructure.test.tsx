import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { infrastructurePathways, integrationTransit, operatingLayers, recoveryRoute } from "@/content/atlas/infrastructure";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";
import { InfrastructureDistrictReview } from "./InfrastructureDistrictReview";

const review = { candidateAccess: "internal-review" } as const;
const asset = (id: Parameters<typeof getAtlasLibraryAsset>[0]) => getAtlasLibraryAsset(id, review);
function renderReview() { return render(<InfrastructureDistrictReview scene={getAtlasScene("ill-0004", review)} marker={asset("infrastructureMarker")} bridge={asset("thirdMainlandBridge")} streetlight={asset("utilityStreetlight")} mast={asset("telecomMast")} route={asset("secondaryRoute")} nightRoute={asset("nightRoute")} ready={asset("statusReadyLabel")} warning={asset("warningLabel")} confirmed={asset("routeConfirmedStamp")} grit={asset("roadGrit")} rain={asset("rain")} />); }

describe("Atlas Infrastructure District", () => {
  it("renders six sourced capability groups and approved public navigation", () => {
    const { container } = renderReview();
    expect(container.querySelector("[data-atlas-infrastructure]")).toHaveAttribute("data-artwork-status", "candidate");
    expect(container.querySelectorAll("[data-pathway-variant='infrastructure']")).toHaveLength(6);
    for (const pathway of infrastructurePathways) expect(screen.getByRole("heading", { name: pathway.name })).toBeInTheDocument();
    const labels = within(screen.getByRole("navigation", { name: "Primary navigation" })).getAllByRole("link").map((link) => link.textContent).join(" ");
    expect(labels).toMatch(/Work.*Services.*Publishing.*Atlas.*Studio.*Discuss a Project/);
  });
  it("provides complete textual equivalents for operating, recovery, and integration models", () => {
    const { container } = renderReview();
    expect(container.querySelectorAll("[data-operating-layers-textual-equivalent] > li")).toHaveLength(operatingLayers.length);
    expect(container.querySelectorAll("[data-recovery-route-textual-equivalent] > li")).toHaveLength(recoveryRoute.length);
    expect(container.querySelectorAll("[data-integration-textual-equivalent] > li")).toHaveLength(integrationTransit.length);
  });
  it("supports keyboard navigation for operating layers and recovery stages", () => {
    renderReview(); const lists = screen.getAllByRole("tablist");
    const layerTabs = within(lists[0]).getAllByRole("tab"); layerTabs[0].focus(); fireEvent.keyDown(layerTabs[0], { key: "ArrowDown" }); expect(layerTabs[1]).toHaveFocus();
    const recoveryTabs = within(lists[1]).getAllByRole("tab"); recoveryTabs[0].focus(); fireEvent.keyDown(recoveryTabs[0], { key: "End" }); expect(recoveryTabs.at(-1)).toHaveFocus();
  });
  it("keeps service terms unavailable and emergency access direct", () => {
    renderReview();
    expect(screen.getAllByText(/Defined during project scoping/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Open Emergency Recovery/ })).toHaveAttribute("href", "/support/emergency");
    expect(screen.getByText("No public emergency response time is verified.")).toBeInTheDocument();
  });
  it("uses meaningful scene alt text and hides decorative marker artwork", () => {
    renderReview(); expect(screen.getAllByRole("img", { name: /illustrated infrastructure district/i }).length).toBeGreaterThan(0);
    const marker = document.querySelector("[data-district='infrastructure'] img"); expect(marker).toHaveAttribute("alt", ""); expect(marker).toHaveAttribute("aria-hidden", "true");
  });
});
