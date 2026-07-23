import { expect, test } from "@playwright/test";

test("Arrival review is no-index and preserves the complete vertical slice", async ({ page }) => {
  await page.goto("/internal/atlas-arrival");

  await expect(page).toHaveTitle(/Atlas Arrival W1/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-atlas-arrival]")).toHaveAttribute("data-asset-status", "candidate");
  await expect(page.locator("[data-arrival-step]")).toHaveCount(4);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Every thriving city depends on invisible systems");
  await expect(page.getByRole("heading", { name: /We build the invisible systems/ })).toBeAttached();
});

test("Arrival responsive picture exposes intentional mobile and tablet variants", async ({ page }) => {
  await page.goto("/internal/atlas-arrival");
  const picture = page.locator("#arrival-movement picture");
  await expect(picture.locator("source").nth(0)).toHaveAttribute("srcset", /mobile-4x5\.webp$/);
  await expect(picture.locator("source").nth(1)).toHaveAttribute("srcset", /tablet-4x3\.webp$/);
  await expect(picture.locator("img")).toHaveAttribute("src", /desktop-16x9\.webp$/);
});

test("reduced motion retains opening, proposition, route and actions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/internal/atlas-arrival");

  await expect(page.locator("#arrival-opening [data-atlas-scene-fallback]")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: /We build the invisible systems/ })).toBeAttached();
  await expect(page.getByRole("link", { name: "Explore the system" })).toBeAttached();
  await expect(page.locator("#arrival-movement picture img")).toHaveCSS("animation-name", "none");
});

test("keyboard users can skip the journey and dismiss mobile navigation", async ({ page, isMobile }) => {
  await page.goto("/internal/atlas-arrival");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip Atlas journey" });
  if (!(await skip.evaluate((element) => document.activeElement === element))) {
    await page.keyboard.press("Tab");
  }
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#arrival-proposition$/);

  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }
});

test("public homepage has no Arrival review link or W1 content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[href='/internal/atlas-arrival']")).toHaveCount(0);
  await expect(page.locator("[data-atlas-arrival]")).toHaveCount(0);
  await expect(page.getByText("Internal W1 review")).toHaveCount(0);
});
