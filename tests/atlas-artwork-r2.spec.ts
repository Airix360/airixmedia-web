import { expect, test, type Page } from "@playwright/test";

const routes = [
  ["/", "homepage"], ["/work", "work"], ["/services", "services"], ["/publishing", "publishing"], ["/publishing/ojs", "ojs"], ["/publishing/pricing", "pricing"],
  ["/publishing/universities", "universities-delsu"], ["/publishing/journal-platforms", "journal-platforms-unilag"], ["/studio", "studio"], ["/open-source", "open-source"],
] as const;

async function chooseTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((value) => localStorage.setItem("airix-theme", value), theme);
}

test("each assigned public route requests exactly its active day or night artwork", async ({ page }) => {
  for (const [route, key] of routes) {
    const requests: string[] = [];
    page.on("request", request => { if (request.url().includes("/atlas/heroes/")) requests.push(request.url()); });
    await chooseTheme(page, "dark");
    await page.goto(route);
    await expect(page.locator("[data-active-hero]")).toHaveAttribute("data-active-hero", new RegExp(`${key}-night\\.webp$`));
    expect(requests.filter(url => url.includes(`${key}-`))).toHaveLength(1);
    expect(requests.some(url => url.includes(`${key}-day.webp`))).toBe(false);
    page.removeAllListeners("request");
  }
});

test("public route markup does not leak internal geography or institutional claims", async ({ page }) => {
  for (const route of ["/publishing/universities", "/publishing/journal-platforms"]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(/delta state|abraka|unilag/i);
  }
});
