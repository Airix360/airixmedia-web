import { expect, test } from "@playwright/test";

test("internal Atlas review is isolated and mode controls work", async ({ page }) => {
  await page.goto("/internal/atlas-review");

  await expect(page).toHaveTitle(/Atlas Runtime W0/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("World-building primitives");
  await expect(page.locator("[data-atlas-scene='ill-0001']")).toHaveAttribute("data-asset-status", "candidate");

  await page.getByRole("button", { name: "static" }).click();
  await expect(page.locator("[data-scene-mode='static']")).toBeVisible();
  await page.getByRole("button", { name: "reduced" }).click();
  await expect(page.locator("[data-scene-mode='reduced']")).toBeVisible();
});

test("mobile Atlas navigation is keyboard dismissible", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation contract");
  await page.goto("/internal/atlas-review");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("public homepage does not expose the internal review harness", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-atlas-scene]")).toHaveCount(0);
  await expect(page.getByText("INTERNAL · ATLAS RUNTIME 1 · W0")).toHaveCount(0);
  await expect(page.locator("a[href^='/internal/']")).toHaveCount(0);
});
