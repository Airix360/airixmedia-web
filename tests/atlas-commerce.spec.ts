import { expect, test } from "@playwright/test";

test("Commerce review is private, candidate-gated, and uses approved public navigation labels", async ({ page }) => {
  await page.goto("/internal/atlas-commerce");
  await expect(page).toHaveTitle(/Atlas Commerce W3/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /nofollow/);
  await expect(page.locator("[data-atlas-commerce]")).toHaveAttribute("data-artwork-status", "candidate");
  const labels = await page.locator("nav[aria-label='Primary navigation'] a > span").allTextContents();
  expect(labels).toEqual(["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"]);
  await expect(page.getByText("Emergency Support").first()).toBeAttached();
  await expect(page.getByText("Client Portal").first()).toBeAttached();
});

test("all required service pathways state scope, need, Airix work, route, and evidence status", async ({ page }) => {
  await page.goto("/internal/atlas-commerce#commerce-pathways");
  for (const id of ["digital-experiences", "commerce-systems", "payments-integrations", "business-portals"]) {
    const pathway = page.locator(`[data-pathway='${id}']`);
    await expect(pathway).toBeAttached();
    await expect(pathway.getByRole("heading", { name: "What it covers" })).toBeAttached();
    await expect(pathway.getByRole("heading", { name: "When it becomes useful" })).toBeAttached();
    await expect(pathway.getByRole("heading", { name: "What Airix may build or connect" })).toBeAttached();
    await expect(pathway.getByText("Evidence status")).toBeAttached();
    await expect(pathway.getByRole("link", { name: /Explore/ })).toBeAttached();
  }
});

test("connected system includes a readable textual equivalent and continuity limits", async ({ page }) => {
  await page.goto("/internal/atlas-commerce#connected-commerce-system");
  await expect(page.locator("[data-connected-system-textual-equivalent] > li")).toHaveCount(7);
  await expect(page.getByText("Textual equivalent:")).toBeVisible();
  await expect(page.getByText(/No package, service level, response time, uptime, price, or support term/)).toBeAttached();
  await expect(page.getByRole("link", { name: /Related public route Work/ })).toHaveAttribute("href", "/systems");
  await expect(page.getByRole("link", { name: /Related public route Infrastructure/ })).toHaveAttribute("href", "/services/managed-infrastructure");
  await expect(page.getByRole("link", { name: /Related public route Publishing/ })).toHaveAttribute("href", "/publishing");
  await expect(page.getByRole("link", { name: /Related public route Discuss a Project/ })).toHaveAttribute("href", "/start-a-project");
});

test("reduced motion preserves opening, pathways, connected system, continuity, and actions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/internal/atlas-commerce");
  await expect(page.getByRole("heading", { name: /Every exchange depends/ })).toBeVisible();
  await expect(page.locator("[data-pathway]")).toHaveCount(4);
  await expect(page.locator("[data-connected-system-textual-equivalent] > li")).toHaveCount(7);
  await expect(page.getByRole("heading", { name: "Responsibility before capability." })).toBeAttached();
  await expect(page.getByRole("link", { name: /Related public route Discuss a Project/ })).toBeAttached();
  await expect(page.locator("[data-pathway='digital-experiences'] i")).toHaveCSS("animation-name", "none");
});

test("skip and pathway controls are keyboard accessible, with mobile menu focus restoration", async ({ page, isMobile }) => {
  await page.goto("/internal/atlas-commerce");
  const skip = page.getByRole("link", { name: "Skip to service pathways" });
  await skip.focus();
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("#commerce-pathways")).toBeFocused();
  const firstPath = page.getByRole("navigation", { name: "Commerce service pathways" }).getByRole("link").first();
  await firstPath.focus();
  await expect(firstPath).toBeFocused();

  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }
});

test("scene alternative text is meaningful and decorative artwork is hidden", async ({ page }) => {
  await page.goto("/internal/atlas-commerce");
  await expect(page.getByRole("img", { name: /illustrated Lagos commerce district/i })).toBeVisible();
  await expect(page.locator("[data-district='commerce'] img[alt=''][aria-hidden='true']")).toHaveCount(6);
});

test("Commerce review excludes named providers, metrics, guarantees, and public-route leakage", async ({ page }) => {
  await page.goto("/internal/atlas-commerce");
  await expect(page.locator("body")).not.toContainText(/Stripe|Flutterwave|Paystack|Visa|Mastercard|conversion rate|transaction volume|revenue increase|99\.9%|24\/7|guaranteed response/i);
  await page.goto("/");
  await expect(page.locator("a[href='/internal/atlas-commerce']")).toHaveCount(0);
  await expect(page.locator("[data-atlas-commerce]")).toHaveCount(0);
  await expect(page.getByText("Internal W3 review")).toHaveCount(0);
});

test("public Services remains isolated from the Commerce review", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator("a[href='/internal/atlas-commerce']")).toHaveCount(0);
  await expect(page.locator("[data-atlas-commerce]")).toHaveCount(0);
  await expect(page.getByText("Internal W3 review")).toHaveCount(0);
});
