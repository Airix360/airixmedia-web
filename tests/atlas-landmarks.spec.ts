import { expect, test } from "@playwright/test";

test("Landmarks review is private, candidate-gated, and contains two distinct proof patterns", async ({ page }) => {
  await page.goto("/internal/atlas-landmarks");
  await expect(page).toHaveTitle(/Atlas Landmarks W2/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("[data-atlas-landmarks]")).toHaveAttribute("data-artwork-status", "candidate");
  await expect(page.locator("[data-case-pattern='operational']")).toHaveCount(1);
  await expect(page.locator("[data-case-pattern='editorial']")).toHaveCount(1);
  await expect(page.locator("[data-media-status='placeholder']")).toBeAttached();
  await expect(page.locator("[data-media-status='source_capture']")).toBeAttached();

  const labels = await page.locator("nav[aria-label='Primary navigation'] a > span").allTextContents();
  expect(labels).toEqual(["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"]);
});

test("Landmark evidence keeps responsibility, types, alternatives, and public routes explicit", async ({ page }) => {
  await page.goto("/internal/atlas-landmarks#technology-evidence");
  await expect(page.getByText("No authentic project media registered.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Responsibility before capability." }).first()).toBeVisible();
  await expect(page.getByText("Outcome record").first()).toBeVisible();

  await page.goto("/internal/atlas-landmarks#publishing-evidence");
  await expect(page.getByRole("img", { name: /KU Journals public homepage/ })).toBeVisible();
  await expect(page.getByText("Public interface").last()).toBeVisible();
  await expect(page.getByRole("link", { name: /Related public route Publishing/ })).toHaveAttribute("href", "/publishing");
});

test("reduced motion preserves both landmarks, proof registers, and onward actions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/internal/atlas-landmarks");
  await expect(page.getByRole("heading", { name: "Airix Food" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "KU Journals" })).toBeAttached();
  await expect(page.locator("#technology-evidence [data-media-status='placeholder']")).toBeAttached();
  await expect(page.locator("#publishing-evidence [data-media-status='source_capture']")).toBeAttached();
  await expect(page.getByRole("link", { name: /Discuss a Project/ }).last()).toBeAttached();
  await expect(page.locator("#publishing-landmark figure[data-atlas-scene]" )).toHaveCSS("animation-name", "none");
});

test("keyboard evidence navigation and mobile menu preserve focus behavior", async ({ page, isMobile }) => {
  await page.goto("/internal/atlas-landmarks#publishing-evidence");
  const first = page.getByRole("tab", { name: /Public interface capture/ });
  const second = page.getByRole("tab", { name: /Responsibility credit capture/ });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName(/Responsibility credit capture/);

  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }
});

test("public homepage remains isolated from the Landmark review", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[href='/internal/atlas-landmarks']")).toHaveCount(0);
  await expect(page.locator("[data-atlas-landmarks]")).toHaveCount(0);
  await expect(page.getByText("Internal W2 review")).toHaveCount(0);
});
