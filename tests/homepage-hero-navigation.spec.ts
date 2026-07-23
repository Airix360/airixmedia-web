import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const output = path.join(process.cwd(), "output/playwright/atlas-home-navigation-cleanup");

test.beforeAll(() => fs.mkdirSync(output, { recursive: true }));
test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Explicit responsive viewports are verified in the desktop project.");
  await page.addInitScript(() => {
    if (!localStorage.getItem("airix-theme")) localStorage.setItem("airix-theme", "light");
  });
});

test("homepage presents the clean full-screen conversion hero", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("main section").first()).toHaveCSS("height", "1000px");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every thriving city depends on invisible systems.");
  await expect(page.getByText(/We design, build, run and rescue the websites/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Discuss a Project" }).first()).toHaveAttribute("href", "/contact?form=project&source=/");
  await expect(page.getByRole("link", { name: "View selected work" })).toHaveAttribute("href", "/work");
  await expect(page.locator('[data-active-hero$="-day.webp"]')).toBeVisible();
  await expect(page.getByText("Trusted by institutions and organisations across Africa").first()).toBeVisible();
  for (const name of ["Open Journal Systems", "Delta State University, Abraka", "Medical and Dental Consultants' Association of Nigeria", "Open Source Initiative"]) {
    await expect(page.getByRole("img", { name: `${name} logo` }).first()).toBeVisible();
  }
});

test("header prioritises primary navigation and keeps utilities in the menu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const header = page.getByRole("banner");
  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primary.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
  const navigationBox = await primary.boundingBox();
  expect(Math.abs((navigationBox?.x ?? 0) + (navigationBox?.width ?? 0) / 2 - 720)).toBeLessThanOrEqual(2);
  await expect(header.getByRole("link", { name: "Support", exact: true })).toHaveCount(0);
  await expect(header.getByRole("button", { name: "Open menu" })).toBeVisible();
  await header.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Site navigation" });
  await expect(menu.getByRole("link", { name: "Support", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Emergency", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Client Portal", exact: true })).toBeVisible();
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }, { width: 720, height: 800 }]) {
  test(`navigation reflows without clipping at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    if (viewport.width <= 390) await expect(page.getByRole("banner").getByRole("switch")).toHaveCount(0);
    if (viewport.width === 390) {
      await page.evaluate(() => localStorage.removeItem("airix-theme"));
      await page.reload();
    }
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Site navigation" });
    const dimensions = await menu.evaluate((node) => ({
      left: node.getBoundingClientRect().left,
      right: node.getBoundingClientRect().right,
      width: node.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(dimensions.left).toBeGreaterThanOrEqual(0);
    expect(dimensions.right).toBeLessThanOrEqual(viewport.width);
    expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewport);
    await expect(menu.getByRole("link", { name: "Support", exact: true })).toBeVisible();
    await expect(menu.getByRole("switch")).toBeVisible();
    if (viewport.width === 390) {
      await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
      await page.screenshot({ path: path.join(output, "navigation-mobile-390x844.png"), animations: "disabled" });
    }
  });
}

test("transparent and sticky headers remain readable and dark homepage passes automated contrast", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header).not.toHaveClass(/scrolled/);
  const lightHero = page.locator('[data-active-hero$="-day.webp"]').first();
  await lightHero.waitFor();
  await lightHero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0 ? true : new Promise((resolve) => image.addEventListener("load", () => resolve(true), { once: true })));
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.screenshot({ path: path.join(output, "homepage-desktop-light-1440x1000.png"), animations: "disabled" });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await expect(header).toHaveClass(/scrolled/);
  await header.screenshot({ path: path.join(output, "header-sticky-light.png"), animations: "disabled" });
  await page.evaluate(() => localStorage.setItem("airix-theme", "dark"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkHero = page.locator('[data-active-hero$="-night.webp"]').first();
  await darkHero.waitFor();
  await darkHero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0 ? true : new Promise((resolve) => image.addEventListener("load", () => resolve(true), { once: true })));
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.screenshot({ path: path.join(output, "homepage-desktop-dark-1440x1000.png"), animations: "disabled" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("captures tablet and mobile hero evidence in both themes", async ({ page }) => {
  for (const [name, viewport] of [["tablet", { width: 768, height: 1024 }], ["mobile", { width: 390, height: 844 }]] as const) {
    for (const theme of ["light", "dark"] as const) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.evaluate((next) => localStorage.setItem("airix-theme", next), theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const suffix = theme === "light" ? "-day.webp" : "-night.webp";
      const hero = page.locator(`[data-active-hero$="${suffix}"]`).first();
      await hero.waitFor();
      await hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0 ? true : new Promise((resolve) => image.addEventListener("load", () => resolve(true), { once: true })));
      await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
      await page.screenshot({ path: path.join(output, `homepage-${name}-${theme}-${viewport.width}x${viewport.height}.png`), animations: "disabled" });
      if (name === "mobile" && theme === "light") {
        const trust = page.getByRole("complementary", { name: /organisations, platforms and communities/i }).last();
        await trust.scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, "homepage-mobile-trust-light-390x844.png"), animations: "disabled" });
      }
    }
  }
});
