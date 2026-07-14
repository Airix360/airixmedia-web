import { expect, test } from "@playwright/test";

test("Infrastructure review is private, candidate-gated, and uses approved navigation", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure"); await expect(page).toHaveTitle(/Atlas Infrastructure W5/);
  const robots = page.locator("meta[name='robots']"); for (const value of ["noindex", "nofollow", "noarchive", "nosnippet"]) await expect(robots).toHaveAttribute("content", new RegExp(value));
  await expect(page.locator("[data-atlas-infrastructure]")).toHaveAttribute("data-artwork-status", "candidate");
  expect(await page.locator("nav[aria-label='Primary navigation'] a > span").allTextContents()).toEqual(["Work", "Services", "Publishing", "Atlas", "Studio", "Discuss a Project"]);
  await expect(page.getByText("Emergency Support").first()).toBeAttached(); await expect(page.getByText("Client Portal").first()).toBeAttached();
});

test("six capability groups expose scope, need, Airix work, source, and route", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#infrastructure-capabilities");
  for (const id of ["hosting-operating-environments", "monitoring-maintenance-continuity", "security-recovery", "integrations-automation", "migration-rescue", "support-ownership"]) {
    const item = page.locator(`[data-pathway='${id}']`); await expect(item).toHaveAttribute("data-pathway-variant", "infrastructure");
    for (const heading of ["What it covers", "When it becomes useful", "What Airix may build or connect"]) await expect(item.getByRole("heading", { name: heading })).toBeAttached();
    await expect(item.getByText("Evidence status")).toBeAttached(); await expect(item.getByRole("link", { name: /Explore/ })).toBeAttached();
  }
});

test("operating layers are complete and keyboard navigable", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#infrastructure-capabilities"); await expect(page.locator("[data-operating-layers-textual-equivalent] > li")).toHaveCount(7);
  const tabs = page.getByRole("tablist", { name: "Infrastructure operating layers" }).getByRole("tab"); await tabs.first().focus(); await page.keyboard.press("ArrowDown"); await expect(tabs.nth(1)).toBeFocused(); await page.keyboard.press("End"); await expect(tabs.last()).toBeFocused();
});

test("continuity shows categories but leaves commitments to scoping", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#monitoring-continuity"); await expect(page.locator("[data-service-level-summary] li")).toHaveCount(5);
  await expect(page.getByText(/Defined during project scoping/).first()).toBeVisible(); await expect(page.getByText(/No live monitoring is connected/)).toBeVisible();
});

test("recovery route is variable, textual, and keyboard navigable", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#recovery-route"); await expect(page.locator("[data-recovery-route-textual-equivalent] > li")).toHaveCount(6);
  const tabs = page.getByRole("tablist", { name: "Variable recovery route" }).getByRole("tab"); await tabs.first().focus(); await page.keyboard.press("ArrowRight"); await expect(tabs.nth(1)).toBeFocused(); await page.keyboard.press("End"); await expect(tabs.last()).toBeFocused();
  await expect(page.getByText(/promises neither timing nor outcome/)).toBeVisible();
});

test("integration model has a complete textual equivalent", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#integration-transit"); await expect(page.locator("[data-integration-textual-equivalent] > li")).toHaveCount(7); await expect(page.getByText("Textual equivalent:")).toBeVisible();
});

test("emergency support is directly reachable and explicit about missing terms", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure#emergency-support"); const emergency = page.locator("[data-emergency-support]");
  await expect(emergency.getByRole("link", { name: /Open Emergency Recovery/ })).toHaveAttribute("href", "/support/emergency");
  await expect(emergency).toContainText("Affected URL and system"); await expect(emergency).toContainText("No public emergency response time is verified"); await expect(emergency).toContainText("No 24/7 commitment");
});

test("no fabricated operational, security, provider, or service-level claims appear", async ({ page }) => {
  await page.goto("/internal/atlas-infrastructure");
  await expect(page.locator("body")).not.toContainText(/99\.9%|99\.99%|SOC 2|ISO 27001|penetration testing|AWS partner|Cloudflare partner|Azure partner|incident count|every 5 minutes/i);
  await expect(page.getByText("24/7 support", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Guaranteed recovery", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Guaranteed response", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Forensic service", { exact: true })).toHaveCount(0);
});

test("reduced motion preserves all Infrastructure meaning and actions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/internal/atlas-infrastructure");
  await expect(page.getByRole("heading", { name: /Everything working beneath/ })).toBeVisible(); await expect(page.locator("[data-operating-layers-textual-equivalent] > li")).toHaveCount(7); await expect(page.locator("[data-pathway-variant='infrastructure']")).toHaveCount(6); await expect(page.locator("[data-recovery-route-textual-equivalent] > li")).toHaveCount(6); await expect(page.locator("[data-integration-textual-equivalent] > li")).toHaveCount(7); await expect(page.locator("[data-emergency-support]")).toBeAttached();
  await expect(page.locator("[data-recovery-route-textual-equivalent] > li").first()).toHaveCSS("animation-name", "none");
});

test("skip, decorative handling, related routes, and mobile menu remain accessible", async ({ page, isMobile }) => {
  await page.goto("/internal/atlas-infrastructure"); const skip = page.getByRole("link", { name: "Skip to infrastructure capabilities" }); await skip.focus(); await skip.press("Enter"); await expect(page.locator("#infrastructure-capabilities")).toBeFocused();
  await expect(page.getByRole("img", { name: /illustrated infrastructure district/i })).toBeVisible(); await expect(page.locator("[data-district='infrastructure'] img[alt=''][aria-hidden='true']")).toHaveCount(6);
  for (const name of ["Work", "Services", "Support", "Security", "Discuss a Project"]) await expect(page.getByRole("link", { name: new RegExp(`Related public route ${name}`) })).toBeAttached();
  if (isMobile) { const menu = page.getByRole("button", { name: "Menu" }); await menu.click(); await expect(page.getByRole("dialog", { name: "Atlas navigation" })).toBeVisible(); await page.keyboard.press("Escape"); await expect(menu).toBeFocused(); }
});

test("public homepage, Services, Support, and Emergency remain isolated from W5", async ({ page }) => {
  for (const route of ["/", "/services", "/support", "/support/emergency"]) { await page.goto(route); await expect(page.locator("a[href='/internal/atlas-infrastructure']")).toHaveCount(0); await expect(page.locator("[data-atlas-infrastructure]")).toHaveCount(0); await expect(page.getByText("Internal W5 review")).toHaveCount(0); }
});
