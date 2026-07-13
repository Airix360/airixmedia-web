import { expect, test } from "@playwright/test";

const conceptRoutes = ["after-dark", "in-motion", "reassembled"] as const;

test("public homepage remains isolated from the design lab", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("digital systems");
  await expect(page.locator('a[href^="/__design_lab"]')).toHaveCount(0);
  await expect(page.getByText("Living Lagos", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Concept interface", { exact: true })).toHaveCount(0);
});

test("design lab is noindex and all concepts are reachable", async ({ page }) => {
  await page.goto("/__design_lab");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { name: /choose by behaviour/i })).toBeVisible();
  for (const route of conceptRoutes) {
    const response = await page.request.get(`/__design_lab/${route}`);
    expect(response.ok()).toBeTruthy();
  }
});

test("design lab is excluded from sitemap", async ({ page }) => {
  const response = await page.request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).not.toContain("__design_lab");
});

test("concept routes expose the required actions and disclosure", async ({ page }) => {
  for (const route of conceptRoutes) {
    await page.goto(`/__design_lab/${route}`);
    await expect(page.getByRole("link", { name: "Discuss a project" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "View selected work" }).first()).toBeVisible();
    await page.locator("#selected-work").scrollIntoViewIfNeeded();
    await expect(page.getByText("Concept interface", { exact: true })).toBeVisible();
  }
});

test("reduced motion reveals a static proposition and actions", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto("/__design_lab/after-dark");
  await expect(page.getByText(/systems that keep organisations moving/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Discuss a project" }).first()).toBeVisible();
  await context.close();
});
