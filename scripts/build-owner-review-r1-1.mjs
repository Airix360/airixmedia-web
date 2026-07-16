import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const captures = join(root, "output/playwright/atlas-owner-remediation-r1-1");
const review = join(root, "output/review/airix-owner-review-r1-1");
const assets = join(review, "assets");
const legal = new Set(["legal", "terms", "privacy", "cookies", "accessibility", "acceptable-use", "service-terms", "data-processing", "subprocessors"]);

async function files(directory) {
  const entries = await readdir(directory);
  return Promise.all(entries.map(async (entry) => {
    const item = join(directory, entry);
    return (await stat(item)).isDirectory() ? files(item) : [item];
  })).then((items) => items.flat());
}

await rm(review, { recursive: true, force: true });
await mkdir(assets, { recursive: true });
for (const file of await files(captures)) await cp(file, join(assets, relative(captures, file)));
const images = (await files(assets)).filter((file) => file.endsWith(".png")).map((file) => relative(review, file).replaceAll("\\", "/")).sort();
const groups = new Map();
for (const image of images) {
  const route = image.replace(/^assets\//, "").replace(/-(desktop|mobile|header)-.*$/, "");
  groups.set(route, [...(groups.get(route) ?? []), image]);
}
const routeTitle = (route) => route === "home" ? "/" : `/${route.replaceAll("__", "/")}`;
const disclosure = (route) => route === "publishing-pricing" ? "Artwork blocked pending the approved market-square image." : legal.has(route) ? "Artwork pending: each legal page is reviewed separately and no legal hero is represented as complete." : "Candidate evidence from this corrected branch. Existing hero candidates may repeat and are not presented as unique artwork.";
const sections = [...groups.entries()].map(([route, screenshots]) => `<section id="${route}"><header><p class="eyebrow">${legal.has(route) ? "LEGAL PAGE EVIDENCE" : "ROUTE EVIDENCE"}</p><h2>${routeTitle(route)}</h2><p>${disclosure(route)}</p></header><div class="images">${screenshots.map((image) => `<figure><img src="${image}" alt="${routeTitle(route)} review capture"><figcaption>${image.replace("assets/", "")}</figcaption></figure>`).join("")}</div><fieldset><legend>Owner review</legend><label><input type="radio" name="${route}"> Retain</label><label><input type="radio" name="${route}"> Revise</label><label><input type="radio" name="${route}"> Replace artwork</label><label><input type="radio" name="${route}"> Needs closer review</label></fieldset><label class="notes">Notes<textarea placeholder="Not saved or transmitted. Copy notes manually before closing."></textarea></label></section>`).join("\n");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Airix Media — Owner Review R1.1</title><style>body{margin:0;background:#f3ecdc;color:#211b16;font:16px/1.5 Arial,sans-serif}main{padding:32px;max-width:1500px;margin:auto}h1,h2{font-family:Georgia,serif;line-height:.96}h1{font-size:clamp(3rem,8vw,7rem)}h2{font-size:clamp(2rem,4vw,4rem)}.eyebrow{font:700 .72rem ui-monospace,monospace;letter-spacing:.12em}.notice{border:1px solid #9a3e29;padding:16px;max-width:780px}.toc{display:flex;flex-wrap:wrap;gap:8px;position:sticky;top:0;background:#f3ecdc;padding:16px 0;border-bottom:1px solid #b8aa96}.toc a{color:inherit;border:1px solid #b8aa96;padding:5px 8px;text-decoration:none;font-size:.75rem}section{padding:64px 0;border-bottom:1px solid #b8aa96}.images{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}figure{margin:0;border:1px solid #b8aa96;padding:8px;background:#fff8e9}img{display:block;width:100%;height:auto}figcaption{font:12px ui-monospace,monospace;padding:8px 2px 0}fieldset{border:0;padding:22px 0;display:flex;flex-wrap:wrap;gap:16px}.notes{display:block;max-width:680px}textarea{display:block;width:100%;min-height:100px;margin-top:8px;font:inherit;padding:8px;box-sizing:border-box;background:transparent;border:1px solid #b8aa96}@media(max-width:640px){main{padding:20px}.toc{overflow:auto;flex-wrap:nowrap}}</style></head><body><main><p class="eyebrow">PRIVATE · OFFLINE OWNER REVIEW · R1.1</p><h1>Corrected review evidence.</h1><p class="notice">Every capture was regenerated from build/atlas-owner-remediation-r1-1. This file makes no network requests and contains no live-route links. Decisions and notes are visual-only and are not saved or transmitted.</p><nav class="toc">${[...groups.keys()].map((route) => `<a href="#${route}">${routeTitle(route)}</a>`).join("")}</nav>${sections}</main></body></html>`;
await writeFile(join(review, "index.html"), html);
await writeFile(join(review, "README.txt"), "Offline owner review package. Open index.html locally. All screenshots are full-page captures from build/atlas-owner-remediation-r1-1. No review control persists or transmits data.\n");
