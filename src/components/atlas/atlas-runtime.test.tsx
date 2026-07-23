import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAtlasScene } from "@/lib/atlas/assets";
import { PrimaryNavigation } from "./navigation";
import { AtlasScene, ResponsivePicture } from "./scene";

const reviewAccess = { candidateAccess: "internal-review" } as const;
const arrival = getAtlasScene("ill-0001", reviewAccess);

describe("Atlas runtime primitives", () => {
  it("renders mobile, tablet and desktop sources with meaningful fallback text", () => {
    const { container } = render(
      <ResponsivePicture sources={arrival.responsive} alt={arrival.alt} priority />,
    );
    const sources = container.querySelectorAll("source");
    const image = screen.getByRole("img", { name: arrival.alt });

    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("srcset", arrival.responsive.mobile);
    expect(sources[1]).toHaveAttribute("srcset", arrival.responsive.tablet);
    expect(image).toHaveAttribute("src", arrival.responsive.desktop);
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
  });

  it("exposes scene identity while keeping separated art layers decorative", () => {
    const { container } = render(<AtlasScene scene={arrival} mode="layered" priority />);
    const scene = container.querySelector("[data-atlas-scene='ill-0001']");
    const layers = container.querySelectorAll("[data-layer-role]");

    expect(scene).toHaveAttribute("data-asset-status", "candidate");
    expect(layers).toHaveLength(5);
    layers.forEach((layer, index) => {
      expect(layer).toHaveAttribute("alt", "");
      expect(layer).toHaveAttribute("aria-hidden", "true");
      expect(layer).toHaveAttribute("loading", index <= 1 ? "eager" : "lazy");
      expect(layer).toHaveAttribute("fetchpriority", index <= 1 ? "high" : "auto");
    });
  });

  it("uses the exact public labels and keeps utilities outside the district metaphor", () => {
    render(<PrimaryNavigation activeDistrict="knowledge" />);
    const primary = screen.getByRole("navigation", { name: "Primary navigation" });
    const labels = ["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"];

    labels.forEach((label) => expect(within(primary).getByText(label)).toBeInTheDocument());
    expect(within(primary).getByText("Publishing").closest("a")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Emergency Support" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Client Portal/ }).length).toBeGreaterThan(0);
  });

  it("opens and dismisses the mobile sheet with keyboard focus restored", () => {
    render(<PrimaryNavigation />);
    const trigger = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Atlas navigation" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Atlas navigation" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
