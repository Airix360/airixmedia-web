# Files changed

## Experience implementation

- `src/components/design-lab/concept-experience.tsx` — thin concept dispatcher; shared page skeleton removed.
- `src/components/design-lab/concept-primitives.tsx` — small review-caption and CTA utilities.
- `src/components/design-lab/after-dark-experience.tsx` — independent After Dark narrative.
- `src/components/design-lab/after-dark.module.css` — After Dark tokens, route navigation, scenes and reduced-motion behaviour.
- `src/components/design-lab/in-motion-experience.tsx` — independent In Motion narrative and manual handoff state.
- `src/components/design-lab/in-motion.module.css` — In Motion tokens, dispatch navigation, horizontal journey and mobile treatment.
- `src/components/design-lab/reassembled-experience.tsx` — independent Reassembled narrative and assembly model.
- `src/components/design-lab/reassembled.module.css` — Reassembled tokens, scaffold, material field, assembly and mobile reading lane.
- `src/components/design-lab/design-lab-index.tsx` — Phase 03B review label.
- `src/components/design-lab/design-lab.module.css` — reduced to index-only styling; rejected shared concept rules removed.

## Verification and evidence

- `tests/design-lab.spec.ts` — distinct navigation/proof checks, reduced-motion checks, mobile reading-lane check and public isolation.
- `scripts/capture-phase-03b.mjs` — deterministic 36-state capture and WebM recording workflow.
- `scripts/contact-sheets-phase-03b.mjs` — contact-sheet assembly from captured opening, proof and closing frames.
- `design-review/phase-03b-concept-differentiation/` — review documentation, screenshots, recordings and contact sheets.

No public page, global production style, content schema, deployment file or Phase 3 artefact changed.
