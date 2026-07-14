import { expect, test } from "@playwright/test";

test("Knowledge review is private, candidate-gated, and uses approved public navigation labels", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge");
  await expect(page).toHaveTitle(/Atlas Knowledge W4/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /nofollow/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noarchive/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /nosnippet/);
  await expect(page.locator("[data-atlas-knowledge]")).toHaveAttribute("data-artwork-status", "candidate");
  const labels = await page.locator("nav[aria-label='Primary navigation'] a > span").allTextContents();
  expect(labels).toEqual(["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"]);
  await expect(page.getByText("Emergency Support").first()).toBeAttached();
  await expect(page.getByText("Client Portal").first()).toBeAttached();
});

test("all required publishing capability groups state scope, need, Airix work, source, and route", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge#publishing-capabilities");
  for (const id of ["ojs-implementation", "migration-upgrades-recovery", "editorial-publishing-workflows", "metadata-doi-integrations", "hosting-maintenance-training-support", "open-source-publishing"]) {
    const pathway = page.locator(`[data-pathway='${id}']`);
    await expect(pathway).toBeAttached();
    await expect(pathway).toHaveAttribute("data-pathway-variant", "knowledge");
    await expect(pathway.getByRole("heading", { name: "What it covers" })).toBeAttached();
    await expect(pathway.getByRole("heading", { name: "When it becomes useful" })).toBeAttached();
    await expect(pathway.getByRole("heading", { name: "What Airix may build or connect" })).toBeAttached();
    await expect(pathway.getByText("Evidence status")).toBeAttached();
    await expect(pathway.getByRole("link", { name: /Explore/ })).toBeAttached();
  }
});

test("workflow is complete, configurable, and keyboard navigable", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge#publishing-workflow");
  await expect(page.locator("[data-workflow-textual-equivalent] > li")).toHaveCount(7);
  const tabs = page.getByRole("tablist", { name: "Configurable publishing workflow stages" }).getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
});

test("platform system exposes a complete readable textual equivalent", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge#publishing-system");
  await expect(page.locator("[data-publishing-system-textual-equivalent] > li")).toHaveCount(7);
  await expect(page.getByText("Textual equivalent:")).toBeVisible();
});

test("open-source workshop exposes the verified repository and limitation record", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge#open-source-workshop");
  const project = page.locator("[data-open-source-project]");
  await expect(project).toHaveAttribute("data-evidence-status", "verified-public-repository");
  await expect(project.getByRole("link", { name: /Inspect the OJS Paystack/ })).toHaveAttribute("href", "https://github.com/thathman/PaystackOJS");
  await expect(project).toContainText("latest GitHub release v1.1.1.0");
  await expect(project).toContainText("OJS 3.5.0+");
  await expect(project).toContainText("README header still displays version 1.1.0");
});

test("proposal labels and claim boundaries exclude fabricated metrics, partnerships, and guarantees", async ({ page }) => {
  await page.goto("/internal/atlas-knowledge");
  await expect(page.getByText("Proposed internal copy")).toBeVisible();
  await expect(page.getByText(/No response time, uptime, package price, indexing acceptance/)).toBeAttached();
  await expect(page.locator("body")).not.toContainText(/PKP partner|official PKP|ORCID partner|Crossref member|impact factor|citation count|journal count|migration total|99\.9%|24\/7|guaranteed response/i);
});

test("reduced motion preserves the complete Knowledge experience", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/internal/atlas-knowledge");
  await expect(page.getByRole("heading", { name: "Publishing is not a page." })).toBeVisible();
  await expect(page.locator("[data-workflow-textual-equivalent] > li")).toHaveCount(7);
  await expect(page.locator("[data-pathway-variant='knowledge']")).toHaveCount(6);
  await expect(page.locator("[data-publishing-system-textual-equivalent] > li")).toHaveCount(7);
  await expect(page.locator("[data-open-source-project]")).toBeAttached();
  await expect(page.getByRole("link", { name: /Related public route Discuss a Publishing Project/ })).toBeAttached();
  await expect(page.locator("[data-publishing-system-textual-equivalent] > li").first()).toHaveCSS("animation-name", "none");
});

test("skip target, related routes, decorative handling, and mobile menu keyboard behavior remain accessible", async ({ page, isMobile }) => {
  await page.goto("/internal/atlas-knowledge");
  const skip = page.getByRole("link", { name: "Skip to publishing capabilities" });
  await skip.focus();
  await skip.press("Enter");
  await expect(page.locator("#publishing-capabilities")).toBeFocused();
  await expect(page.getByRole("img", { name: /illustrated knowledge district/i })).toBeVisible();
  await expect(page.locator("[data-district='knowledge'] img[alt=''][aria-hidden='true']")).toHaveCount(6);
  for (const name of ["Work", "Services", "Infrastructure", "Atlas", "Discuss a Publishing Project"]) await expect(page.getByRole("link", { name: new RegExp(`Related public route ${name}`) })).toBeAttached();
  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }
});

test("public homepage and Publishing page remain isolated from W4", async ({ page }) => {
  for (const route of ["/", "/publishing"]) {
    await page.goto(route);
    await expect(page.locator("a[href='/internal/atlas-knowledge']")).toHaveCount(0);
    await expect(page.locator("[data-atlas-knowledge]")).toHaveCount(0);
    await expect(page.getByText("Internal W4 review")).toHaveCount(0);
  }
});
