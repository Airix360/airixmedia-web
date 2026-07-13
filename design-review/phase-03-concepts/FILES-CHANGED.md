# Files changed

## Runtime and route isolation

- `next.config.ts` — rewrites the requested `/__design_lab` paths to an unlinked internal App Router segment.
- `src/app/design-lab-preview/layout.tsx` — provisional fonts and design-lab-wide `noindex, nofollow` metadata.
- `src/app/design-lab-preview/page.tsx` — neutral review index route.
- `src/app/design-lab-preview/after-dark/page.tsx`
- `src/app/design-lab-preview/in-motion/page.tsx`
- `src/app/design-lab-preview/reassembled/page.tsx`

The internal segment is an implementation detail. Owner-facing review URLs remain `/__design_lab` and its three children.

## Concept implementation

- `src/lib/design-lab.ts` — typed concept, palette and typography records.
- `src/components/design-lab/design-lab-index.tsx` — live review panel and copyable response template.
- `src/components/design-lab/concept-experience.tsx` — three procedural scenes, scroll/pointer behaviour, content and reduced-motion equivalents.
- `src/components/design-lab/design-lab.module.css` — fully scoped concept systems and mobile/reduced-motion compositions.
- `scripts/capture-phase-03.mjs` — deterministic screenshot and native Playwright video capture.
- `tests/design-lab.spec.ts` — isolation, noindex, sitemap, CTA, route and reduced-motion browser checks.

## Review documents

- `SUMMARY.md`
- `DECISIONS.md`
- `FILES-CHANGED.md`
- `QUALITY-RESULTS.md`
- `REFERENCE-STUDY.md`
- `CONCEPT-A-AFTER-DARK.md`
- `CONCEPT-B-IN-MOTION.md`
- `CONCEPT-C-REASSEMBLED.md`
- `HALLMARK-AUDIT.md`
- `CONTENT-GENERATION-NOTES.md`
- `OWNER-REVIEW.md`

All documents above live in `design-review/phase-03-concepts/`.

## Screenshots

All paths are relative to `design-review/phase-03-concepts/`:

- `screenshots/after-dark-desktop-opening.png`
- `screenshots/after-dark-desktop-reveal.png`
- `screenshots/after-dark-desktop-work.png`
- `screenshots/after-dark-desktop-full.png`
- `screenshots/after-dark-mobile-opening.png`
- `screenshots/after-dark-mobile-reveal.png`
- `screenshots/after-dark-mobile-work.png`
- `screenshots/after-dark-mobile-full.png`
- `screenshots/after-dark-desktop-reduced-opening.png`
- `screenshots/in-motion-desktop-opening.png`
- `screenshots/in-motion-desktop-reveal.png`
- `screenshots/in-motion-desktop-work.png`
- `screenshots/in-motion-desktop-full.png`
- `screenshots/in-motion-mobile-opening.png`
- `screenshots/in-motion-mobile-reveal.png`
- `screenshots/in-motion-mobile-work.png`
- `screenshots/in-motion-mobile-full.png`
- `screenshots/in-motion-desktop-reduced-opening.png`
- `screenshots/reassembled-desktop-opening.png`
- `screenshots/reassembled-desktop-reveal.png`
- `screenshots/reassembled-desktop-work.png`
- `screenshots/reassembled-desktop-full.png`
- `screenshots/reassembled-mobile-opening.png`
- `screenshots/reassembled-mobile-reveal.png`
- `screenshots/reassembled-mobile-work.png`
- `screenshots/reassembled-mobile-full.png`
- `screenshots/reassembled-desktop-reduced-opening.png`

The separate `public-homepage-comparison.png` is the Phase 2 regression comparison and is not counted among the 27 concept captures.

## Recordings

- `recordings/after-dark.webm`
- `recordings/in-motion.webm`
- `recordings/reassembled.webm`

## Contact sheets and comparison

- `contact-sheet-desktop.png`
- `contact-sheet-mobile.png`
- `contact-sheet-all.png`
- `public-homepage-comparison.png`

## Explicitly unchanged

- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/home-page.tsx`
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/app/sitemap.ts`
- `package.json`
- `pnpm-lock.yaml`
- all service, publishing, pricing, project-selector and portal integration files
