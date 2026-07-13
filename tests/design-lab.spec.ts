import { expect, test } from "@playwright/test";

const concepts = [
  { route: "after-dark", navigation: "route-legend", proof: "immersive-corridor" },
  { route: "in-motion", navigation: "destination-strip", proof: "controlled-handoff" },
  { route: "reassembled", navigation: "scaffold-index", proof: "fragment-resolution" },
] as const;

test("public homepage remains isolated from the design lab", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("digital systems");
  await expect(page.locator('a[href^="/__design_lab"]')).toHaveCount(0);
  await expect(page.getByText("Living Lagos", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Concept material", { exact: false })).toHaveCount(0);
});

test("design lab is noindex and excluded from the sitemap", async ({ page }) => {
  await page.goto("/__design_lab");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { name: /choose by behaviour/i })).toBeVisible();
  const response = await page.request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).not.toContain("__design_lab");
});

test("each concept has a distinct navigation and proof model", async ({ page }) => {
  for (const concept of concepts) {
    await page.goto(`/__design_lab/${concept.route}`);
    const main = page.locator("main");
    await expect(main).toHaveAttribute("data-navigation-model", concept.navigation);
    await expect(main).toHaveAttribute("data-proof-model", concept.proof);
    await expect(page.locator("[data-record-nav]")).toBeVisible();
    await expect(page.locator("#proof")).toHaveCount(1);
    await expect(page.getByText("Concept material", { exact: false })).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Discuss a project" })).toBeVisible();
  }
});

test("each proof remains available with reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  for (const concept of concepts) {
    await page.goto(`/__design_lab/${concept.route}`);
    await page.locator("#proof").scrollIntoViewIfNeeded();
    await expect(page.locator("#proof")).toBeVisible();
    await expect(page.getByRole("link", { name: "Discuss a project" })).toBeAttached();
  }
  await context.close();
});

test("Reassembled exposes a clean mobile reading lane", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/__design_lab/reassembled");
  const lane = page.locator("section [data-mobile-reading-lane=true]");
  await expect(lane).toBeVisible();
  const box = await lane.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(360);
  await context.close();
});
