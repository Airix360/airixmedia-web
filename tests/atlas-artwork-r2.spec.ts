import { expect, test, type Page } from "@playwright/test";

const routes = [
  ["/", "homepage"], ["/work", "work"], ["/services", "services"], ["/publishing", "publishing"], ["/publishing/ojs", "ojs"], ["/publishing/pricing", "pricing"],
  ["/studio", "studio"], ["/open-source", "open-source"],
  ["/atlas", "airix-atlas-highland-systems-overlook"], ["/discuss", "airix-project-discussion-granite-arrival"], ["/contact", "airix-contact-transport-interchange"], ["/book", "airix-consultation-courtyard-booking"],
] as const;

async function chooseTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((value) => localStorage.setItem("airix-theme", value), theme);
}

test("each assigned public route renders its active night artwork without requesting an inactive day pair", async ({ page }) => {
  for (const [route, key] of routes) {
    const requests: string[] = [];
    page.on("request", request => { if (request.url().includes("/atlas/heroes/")) requests.push(request.url()); });
    await chooseTheme(page, "dark");
    await page.goto(route);
    await expect(page.locator(`[data-active-hero$="${key}-night.webp"]`)).toHaveCount(1);
    expect(requests.some(url => url.includes(`${key}-day.webp`))).toBe(false);
    expect(requests.every(url => !url.endsWith("-day.webp"))).toBe(true);
    page.removeAllListeners("request");
  }
});

test("consolidated institutional pairs stay preserved but are not forced into public output", async ({ page, request }) => {
  for (const [route, key, destination] of [["/publishing/universities", "universities-delsu", "/publishing#universities"], ["/publishing/journal-platforms", "journal-platforms-unilag", "/publishing#journal-platforms"]] as const) {
    await page.goto(route); expect(new URL(page.url()).pathname + new URL(page.url()).hash).toBe(destination);
    await expect(page.locator(`[data-active-hero*="${key}-"]`)).toHaveCount(0);
    for (const mode of ["day", "night"]) expect((await request.get(`/atlas/heroes/${key}-${mode}.webp`)).status()).toBe(200);
  }
});

test("public route markup does not leak internal geography or institutional claims", async ({ page }) => {
  for (const route of ["/publishing/universities", "/publishing/journal-platforms"]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(/delta state|abraka|unilag/i);
  }
});
