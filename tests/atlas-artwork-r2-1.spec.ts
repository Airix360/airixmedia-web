import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const routes = [["/", "homepage"], ["/work", "work"], ["/services", "services"], ["/publishing", "publishing"], ["/publishing/ojs", "ojs"], ["/publishing/pricing", "pricing"], ["/publishing/universities", "universities-delsu"], ["/publishing/journal-platforms", "journal-platforms-unilag"], ["/studio", "studio"], ["/open-source", "open-source"], ["/atlas", "airix-atlas-highland-systems-overlook"], ["/discuss", "airix-project-discussion-granite-arrival"], ["/contact", "airix-contact-transport-interchange"], ["/book", "airix-consultation-courtyard-booking"]] as const;
const out = path.join(process.cwd(), "output/playwright/atlas-artwork-r2-1");
const slug = (route: string) => route === "/" ? "home" : route.slice(1).replaceAll("/", "__");

async function state(page: Page) {
  return page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => ({ theme: document.documentElement.dataset.theme, active: node.dataset.activeHero, currentSrc: node.currentSrc }));
}

async function switchMode(page: Page, mode: "light" | "dark") {
  const target = mode === "dark" ? "Switch to dark mode" : "Switch to light mode";
  const control = page.getByRole("switch", { name: target }).first();
  if (await control.count()) await control.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
  await expect(page.locator("[data-active-hero]")).toHaveAttribute("data-active-hero", new RegExp(`-${mode === "dark" ? "night" : "day"}\\.webp$`));
  await expect.poll(() => page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => node.currentSrc)).toContain(`-${mode === "dark" ? "night" : "day"}.webp`);
}

test.describe.configure({ mode: "serial" });
test("proves in-place day/night switching and captures public-route evidence", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Captured once from desktop Chromium.");
  await mkdir(out, { recursive: true });
  const report: unknown[] = [];
  for (const [route, key] of routes) {
    const requested: string[] = [];
    const listener = (request: { url: () => string }) => { if (request.url().includes("/atlas/heroes/")) requested.push(request.url()); };
    page.on("request", listener);
    await page.addInitScript(() => localStorage.setItem("airix-theme", "light"));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await expect(page.locator("[data-active-hero]")).toHaveAttribute("data-active-hero", new RegExp(`${key}-day\\.webp$`));
    await expect.poll(() => page.locator("[data-active-hero]").evaluate((node: HTMLImageElement) => node.currentSrc)).toContain(`${key}-day.webp`);
    const light = await state(page);
    await page.screenshot({ path: path.join(out, `${slug(route)}-light-1440x1000.png`), fullPage: true, animations: "disabled", scale: "css" });
    await switchMode(page, "dark");
    const dark = await state(page);
    await page.screenshot({ path: path.join(out, `${slug(route)}-dark-1440x1000.png`), fullPage: true, animations: "disabled", scale: "css" });
    expect(light.currentSrc).toContain(`${key}-day.webp`); expect(dark.currentSrc).toContain(`${key}-night.webp`); expect(dark.currentSrc).not.toBe(light.currentSrc);
    await switchMode(page, "light");
    expect((await state(page)).currentSrc).toContain(`${key}-day.webp`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(out, `${slug(route)}-light-390x844.png`), fullPage: true, animations: "disabled", scale: "css" });
    await switchMode(page, "dark");
    await page.screenshot({ path: path.join(out, `${slug(route)}-dark-390x844.png`), fullPage: true, animations: "disabled", scale: "css" });
    expect(requested.filter(url => url.includes(`${key}-day.webp`)).length).toBeGreaterThan(0);
    expect(requested.filter(url => url.includes(`${key}-night.webp`)).length).toBeGreaterThan(0);
    report.push({ route, light, dark, requested: [...new Set(requested)] });
    page.off("request", listener);
  }
  await writeFile(path.join(out, "theme-proof.json"), JSON.stringify(report, null, 2));
});

test("fresh sessions request only the resolved initial hero on every integrated route", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "Verified once with isolated Chromium contexts.");
  for (const [route, key] of routes) for (const [saved, expected] of [["light", "day"], ["dark", "night"]] as const) {
    const context = await browser.newContext(); await context.addInitScript(value => localStorage.setItem("airix-theme", value), saved);
    const page = await context.newPage(); const requests: string[] = []; page.on("request", request => { if (request.url().includes("/atlas/heroes/")) requests.push(request.url()); });
    await page.goto(route); await expect(page.locator("[data-active-hero]")).toHaveAttribute("data-active-hero", new RegExp(`${key}-${expected}\\.webp$`));
    expect(requests).toHaveLength(1); expect(requests[0]).toContain(`${key}-${expected}.webp`); await context.close();
  }
});

test("fresh Auto sessions resolve one correct hero on every integrated route", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "Verified once with isolated Chromium contexts.");
  for (const [hour, expected] of [[10, "day"], [22, "night"]] as const) for (const [route, key] of routes) {
    const context = await browser.newContext(); await context.addInitScript(({ hour }) => { const RealDate = Date; class MockDate extends RealDate { constructor(...args: ConstructorParameters<typeof Date>) { super(...(args.length ? args : [2026, 6, 17, hour, 0, 0] as never)); } static now() { return new RealDate(2026, 6, 17, hour, 0, 0).getTime(); } } Object.defineProperty(window, "Date", { value: MockDate }); localStorage.removeItem("airix-theme"); }, { hour });
    const page = await context.newPage(); const requests: string[] = []; page.on("request", request => { if (request.url().includes("/atlas/heroes/")) requests.push(request.url()); });
    await page.goto(route); await expect(page.locator("[data-active-hero]")).toHaveAttribute("data-active-hero", new RegExp(`${key}-${expected}\\.webp$`));
    expect(requests).toHaveLength(1); expect(requests[0]).toContain(`${key}-${expected}.webp`); await context.close();
  }
});
