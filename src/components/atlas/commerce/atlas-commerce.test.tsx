import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { commerceServicePathways, connectedCommerceSystem } from "@/content/atlas/commerce";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";
import { CommerceDistrictReview } from "./CommerceDistrictReview";

const review = { candidateAccess: "internal-review" } as const;

function renderReview() {
  return render(
    <CommerceDistrictReview
      scene={getAtlasScene("ill-0003", review)}
      marker={getAtlasLibraryAsset("commerceMarker", review)}
      route={getAtlasLibraryAsset("primaryRoute", review)}
      texture={getAtlasLibraryAsset("fineHalftone", review)}
      canopy={getAtlasLibraryAsset("marketCanopy", review)}
      routeMap={getAtlasLibraryAsset("commerceRouteMap", review)}
      truck={getAtlasLibraryAsset("logisticsTruck", review)}
      scale={getAtlasLibraryAsset("marketScale", review)}
      marketLaneSign={getAtlasLibraryAsset("marketLaneSign", review)}
    />,
  );
}

describe("Atlas Commerce District", () => {
  it("keeps public service labels explicit and renders all four required pathways", () => {
    const { container } = renderReview();
    expect(container.querySelector("[data-atlas-commerce]")).toHaveAttribute("data-artwork-status", "candidate");
    for (const pathway of commerceServicePathways) {
      expect(screen.getByRole("heading", { name: pathway.name })).toBeInTheDocument();
      expect(container.querySelector(`[data-pathway='${pathway.id}']`)).toHaveAttribute("data-evidence-status", pathway.evidenceStatus);
    }
    const labels = within(screen.getByRole("navigation", { name: "Primary navigation" })).getAllByRole("link").map((link) => link.textContent);
    expect(labels.join(" ")).toMatch(/Work.*Services.*Publishing.*Atlas.*Studio.*Discuss a Project/);
  });

  it("provides an explicit textual equivalent for every connected-system responsibility", () => {
    const { container } = renderReview();
    const equivalent = container.querySelector("[data-connected-system-textual-equivalent]");
    expect(equivalent).not.toBeNull();
    expect(within(equivalent as HTMLElement).getAllByRole("listitem")).toHaveLength(connectedCommerceSystem.length);
    for (const node of connectedCommerceSystem) expect(within(equivalent as HTMLElement).getByText(node.name)).toBeInTheDocument();
  });

  it("exposes the pathway skip target, route controls, continuity limits, and related public routes", () => {
    renderReview();
    expect(screen.getByRole("link", { name: "Skip to service pathways" })).toHaveAttribute("href", "#commerce-pathways");
    expect(screen.getByText(/No package, service level, response time, uptime, price, or support term/)).toBeInTheDocument();
    const routes = screen.getByRole("navigation", { name: "Commerce related routes" });
    expect(within(routes).getByRole("link", { name: /Work/ })).toHaveAttribute("href", "/systems");
    expect(within(routes).getByRole("link", { name: /Infrastructure/ })).toHaveAttribute("href", "/services/managed-infrastructure");
    expect(within(routes).getByRole("link", { name: /Publishing/ })).toHaveAttribute("href", "/publishing");
    expect(within(routes).getByRole("link", { name: /Discuss a Project/ })).toHaveAttribute("href", "/start-a-project");
  });

  it("keeps proposed scope disclosed and excludes provider, metric, pricing, and guarantee claims", () => {
    const { container } = renderReview();
    expect(screen.getAllByText(/Proposed internal scope/).length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/Stripe|Flutterwave|Paystack|Visa|Mastercard|conversion rate|transaction volume|revenue increase|99\.9%|24\/7|guaranteed response/i);
  });

  it("uses meaningful scene alternative text and hides decorative marker artwork", () => {
    renderReview();
    expect(screen.getAllByRole("img", { name: /illustrated Lagos commerce district/i }).length).toBeGreaterThan(0);
    const decorativeMarker = document.querySelector("[data-district='commerce'] img");
    expect(decorativeMarker).toHaveAttribute("alt", "");
    expect(decorativeMarker).toHaveAttribute("aria-hidden", "true");
  });
});
