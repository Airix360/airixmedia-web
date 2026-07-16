import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const routes = [
  "/", "/work", "/work/ku-journals", "/services", "/services/digital-experiences", "/services/business-systems", "/services/managed-infrastructure", "/services/support-recovery",
  "/publishing", "/publishing/ojs", "/publishing/universities", "/publishing/journal-platforms", "/publishing/hosting-support", "/publishing/editorial-support", "/publishing/plugins", "/publishing/pricing",
  "/support", "/support/emergency", "/knowledge-base", "/status", "/security", "/service-levels", "/studio", "/open-source", "/open-source/paystack-ojs", "/open-source/ojs-magic-login", "/open-source/submission-fee", "/open-source/multipay", "/open-source/request-waiver", "/atlas", "/insights", "/resources", "/discuss", "/contact", "/book",
  "/legal", "/terms", "/privacy", "/cookies", "/accessibility", "/acceptable-use", "/service-terms", "/data-processing", "/subprocessors",
] as const;

const prohibited = /lagos|oyo|rivers|edo|kaduna|plateau|ogun/i;
const output = (route: string, name: string) => path.join(process.cwd(), "output/playwright/atlas-owner-remediation-r1-1", `${route === "/" ? "home" : route.slice(1).replaceAll("/", "__")}-${name}.png`);

async function setTheme(page: Page, theme: "light" | "dark") {
  await page.evaluate((nextTheme) => {
    localStorage.setItem("airix-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, theme);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

async function capture(page: Page, route: string, theme: "light" | "dark", label: string) {
  await page.goto(route);
  await setTheme(page, theme);
  await expect(page.locator("main")).toBeVisible();
  const destination = output(route, `${label}-${theme}-full`);
  await mkdir(path.dirname(destination), { recursive: true });
  await page.screenshot({ path: destination, fullPage: true, animations: "disabled", scale: "css" });
}

test.describe.configure({ mode: "serial" });

test("public route markup excludes internal geography and the legal draft hero", async ({ page }, testInfo) => {
  for (const route of routes) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    const metadata = await page.locator("head meta").evaluateAll((nodes) => nodes.map((node) => `${node.getAttribute("name") ?? ""} ${node.getAttribute("property") ?? ""} ${node.getAttribute("content") ?? ""}`).join("\n"));
    const images = await page.locator("img").evaluateAll((nodes) => nodes.map((node) => `${node.getAttribute("src") ?? ""} ${node.getAttribute("alt") ?? ""}`).join("\n"));
    expect(text).not.toMatch(prohibited);
    expect(metadata).not.toMatch(prohibited);
    expect(images).not.toMatch(prohibited);
  }
  await page.goto("/legal");
  await expect(page.getByText("Draft structure awaiting legal review.")).toHaveCount(0);
  await expect(page.getByRole("switch")).toHaveAttribute("aria-checked", /true|false/);
  await expect(page.locator("header select")).toHaveCount(0);
  await expect(page.locator(".official-logo-light")).toHaveAttribute("src", /airixmedia\.png/);
  await expect(page.locator(".official-logo-dark")).toHaveAttribute("src", /airixmedia-dark\.png/);
  expect(testInfo.project.name).toBeTruthy();
});

test("captures corrected full-page review evidence", async ({ page }, testInfo) => {
  test.skip(!process.env.CAPTURE_OWNER_REVIEW, "Run only when regenerating the owner-review package.");
  if (testInfo.project.name === "desktop") {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const route of routes) {
      await capture(page, route, "light", "desktop-1440x1000");
      await capture(page, route, "dark", "desktop-1440x1000");
    }
    await page.goto("/");
    await setTheme(page, "light");
    await page.waitForTimeout(1_000);
    await page.screenshot({ path: output("/", "header-transparent-1440x1000"), animations: "disabled", scale: "css" });
    await page.getByRole("heading", { name: "Where shall we build next?" }).last().scrollIntoViewIfNeeded();
    await expect(page.locator("header")).toHaveClass(/scrolled/);
    await page.screenshot({ path: output("/", "header-sticky-1440x1000"), animations: "disabled", scale: "css" });
    return;
  }

  for (const [width, height] of [[390, 844], [360, 800]] as const) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await capture(page, route, "light", `mobile-${width}x${height}`);
      await capture(page, route, "dark", `mobile-${width}x${height}`);
    }
  }
});
