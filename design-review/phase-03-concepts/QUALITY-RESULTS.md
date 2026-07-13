# Quality results

Date: 2026-07-13 · Branch: `redesign/living-lagos`

## Required checks

| Check | Result | Evidence |
| --- | --- | --- |
| Node version | Pass | `v26.0.0` (required minimum: 22.12) |
| Lint | Pass | `pnpm lint`; zero warnings |
| Type check | Pass | `pnpm typecheck`, including a repeat after Playwright’s dev server generated route types |
| Unit tests | Pass | `pnpm test`; 3 files, 6 tests |
| Production build | Pass | `pnpm build`; 22 static/dynamic route entries generated successfully |
| Existing end-to-end tests | Pass | Included in the Playwright run |
| Design-lab browser tests | Pass | 16/16 across desktop and mobile projects |
| Diff hygiene | Pass | `git diff --check` |
| Dependency control | Pass | No `package.json` or `pnpm-lock.yaml` diff |

## Design-lab browser coverage

The browser suite verifies:

- public homepage proposition still renders;
- no public link targets `/__design_lab`;
- no Living Lagos or Concept interface labels leak onto `/`;
- review index emits `noindex`;
- all three owner-facing routes return successfully;
- sitemap contains no `__design_lab` route;
- both required actions are available;
- generated proof is labelled **Concept interface**;
- reduced motion exposes a static proposition and actions.

## Public homepage comparison

Compared:

- Phase 2 baseline: `design-review/phase-02-tools/screenshots/homepage-light-1440.png`
- Phase 3 comparison: `design-review/phase-03-concepts/public-homepage-comparison.png`

Both are 1440 × 1000. Pixel comparison returned:

```text
changed_pixels=0
changed_percent=0.0
sha256=dfd2e24eadd2cac806d9771aeb455c7ee452b86c980590cd5a8816849906a88b
```

The public homepage is pixel-identical to the Phase 2 capture.

## Screenshot evidence

- 27 concept screenshots total.
- Desktop: 1440 × 1000 opening, reveal and work states; full-page capture for each concept.
- Mobile: 390 × 844 opening, reveal and work states; full-page capture for each concept.
- Reduced motion: one 1440 × 1000 opening per concept.
- Fonts were awaited before every scripted capture.
- Contact sheets were visually inspected after capture.

## Recording evidence

Playwright browser recording produced three silent WebM files at 1280 × 800. The deterministic interaction timeline contains 9 seconds of explicit dwell and transition time after font/network settlement. File sizes:

| Recording | Size |
| --- | ---: |
| `after-dark.webm` | 814 KB |
| `in-motion.webm` | 903 KB |
| `reassembled.webm` | 994 KB |

All are comfortably below the 8 MB cap. No audio source or track is created by the capture script.

## Accessibility and motion review

- Visible `:focus-visible` treatment is applied to concept navigation and primary actions.
- CTA labels remain one line.
- Semantic headings, landmarks and labelled navigation are present.
- Scene SVGs and generated visuals are `aria-hidden`; meaning is repeated in text.
- Reduced motion removes animation and spatial transform, freezes the scene and exposes proposition plus both actions in the opening viewport.
- Mobile screenshots were manually checked for word breaks, clipping and overlap. In Motion and After Dark were corrected after inspection; Reassembled retains a documented controlled collision and is called out by Hallmark for further mobile work if it advances.

## Preview

Run locally:

```bash
pnpm dev
```

Then open:

- `http://localhost:3000/__design_lab`
- `http://localhost:3000/__design_lab/after-dark`
- `http://localhost:3000/__design_lab/in-motion`
- `http://localhost:3000/__design_lab/reassembled`

No forwarded preview URL was created because this phase explicitly excludes deployment and external infrastructure changes.

## Safety confirmation

- Production homepage was not redesigned.
- Public navigation was not changed.
- No client claim was fabricated.
- No generated interface was presented as real work.
- No new animation or WebGL dependency was installed.
- No deployment was performed.
- No Cloudflare, DNS, Dell server, portal or tunnel setting was changed.
- `main` was not modified.
