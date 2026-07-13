import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const bundledModules = process.env.CODEX_NODE_MODULES ?? path.join(os.homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules");
const { default: sharp } = await import(pathToFileURL(path.join(bundledModules, "sharp/lib/index.js")).href);

const root = path.resolve("design-review/phase-03b-concept-differentiation");
const screenshots = path.join(root, "screenshots");
const concepts = ["after-dark", "in-motion", "reassembled"];
const states = ["opening", "proof", "final-cta"];

async function sheet(label, width, height, output) {
  const cellWidth = 560;
  const cellHeight = Math.round(cellWidth * height / width);
  const header = 42;
  const composites = [];
  for (let row = 0; row < states.length; row++) {
    for (let column = 0; column < concepts.length; column++) {
      const concept = concepts[column];
      const state = states[row];
      const image = await sharp(path.join(screenshots, `${concept}-${label}-${state}.png`)).resize(cellWidth, cellHeight, { fit: "cover" }).png().toBuffer();
      composites.push({ input: image, left: column * cellWidth, top: row * (cellHeight + header) + header });
      const caption = `<svg width="${cellWidth}" height="${header}"><rect width="100%" height="100%" fill="#121212"/><text x="16" y="27" fill="#f4f0e5" font-family="Arial" font-size="15" font-weight="700">${concept.toUpperCase()} · ${state.toUpperCase()}</text></svg>`;
      composites.push({ input: Buffer.from(caption), left: column * cellWidth, top: row * (cellHeight + header) });
    }
  }
  await sharp({ create: { width: cellWidth * 3, height: (cellHeight + header) * 3, channels: 3, background: "#121212" } }).composite(composites).png().toFile(output);
}

const desktop = path.join(root, "contact-sheet-desktop.png");
const mobile = path.join(root, "contact-sheet-mobile.png");
await sheet("desktop", 1440, 1000, desktop);
await sheet("mobile", 390, 844, mobile);
const [desktopBuffer, mobileBuffer] = await Promise.all([sharp(desktop).resize({ width: 1680 }).png().toBuffer(), sharp(mobile).resize({ width: 1680 }).png().toBuffer()]);
const desktopMeta = await sharp(desktopBuffer).metadata();
const mobileMeta = await sharp(mobileBuffer).metadata();
await sharp({ create: { width: 1680, height: desktopMeta.height + mobileMeta.height + 40, channels: 3, background: "#121212" } }).composite([{ input: desktopBuffer, top: 0, left: 0 }, { input: mobileBuffer, top: desktopMeta.height + 40, left: 0 }]).png().toFile(path.join(root, "contact-sheet-all.png"));
