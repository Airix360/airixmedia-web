# Airix design-tool responsibility matrix

Project targets for approved concept work: design variance 8/10, motion intensity 8/10, visual density 7/10. These are governance targets, not edits to third-party skill files.

## `redesign-existing-projects`

- Installed skill: `redesign-existing-projects`
- Location: `.agents/skills/redesign-existing-projects`
- Primary responsibility: audit rejected interfaces and identify structural or visual problems.
- Approved phases: audit and existing-interface diagnosis.
- Forbidden phases: final identity selection and unsupervised rebuilding.
- Inputs: current interface, screenshots, baseline audit, Living Lagos brief.
- Expected outputs: remove/reconsider recommendations and evidence-backed diagnosis.
- Production-code modification: no during audit; only under a later explicit implementation phase.
- Visual decisions: may recommend reconsideration, but cannot decide Living Lagos language.
- Known conflicts: generic replacement sections; overlap with Hallmark criticism.
- Review requirement: owner reviews findings before concept work.

## `gpt-taste`

- Installed skill: `gpt-taste`
- Location: `.agents/skills/gpt-taste`
- Primary responsibility: lead Codex visual concept implementation with high compositional variance and resistance to common AI layouts.
- Approved phases: concept implementation, approved design-system creation, approved homepage implementation.
- Forbidden phases: work without the Living Lagos brief, unilateral brand decisions, and simultaneous co-design with Hallmark.
- Inputs: approved brief, approved references, authentic assets, phase constraints.
- Expected outputs: live browser explorations and approved implementation code.
- Production-code modification: yes, but only in an explicitly approved implementation phase.
- Visual decisions: bounded decisions inside an owner-approved direction; cannot overwrite approved decisions.
- Known conflicts: Hallmark as co-designer; Impeccable if invoked too early; template reflexes.
- Review requirement: deterministic screenshots, Hallmark audit after the pass, owner approval.

## `brandkit`

- Installed skill: `brandkit`
- Location: `.agents/skills/brandkit`
- Primary responsibility: identity boards, typography, palettes, texture, signage language, and logo applications.
- Approved phases: typography, colour, and identity laboratories.
- Forbidden phases: logo replacement, unilateral finalisation, and production-code generation.
- Inputs: Living Lagos brief, logo assets, cultural references, brand constraints.
- Expected outputs: labelled identity studies and reviewed boards.
- Production-code modification: no.
- Visual decisions: proposes options; owner decides.
- Known conflicts: legacy `DESIGN.md`; generic editorial reflex; unapproved logo changes.
- Review requirement: archive options under `design-review/` and obtain owner selection.

## `imagegen-frontend-web`

- Installed skill: `imagegen-frontend-web`
- Location: `.agents/skills/imagegen-frontend-web`
- Primary responsibility: high-fidelity reference frames, hero moodframes, showreel storyboards, and transition studies.
- Approved phases: breadth-first Living Lagos exploration before code.
- Forbidden phases: production code, fabricated project evidence, misleading client imagery.
- Inputs: brief, authentic asset boundaries, approved prompt constraints.
- Expected outputs: clearly labelled generated reference images.
- Production-code modification: no.
- Visual decisions: proposes references; cannot approve them.
- Known conflicts: image-to-code self-approval; evidence policy.
- Review requirement: owner approval before any reference informs implementation.

## `image-to-code`

- Installed skill: `image-to-code`
- Location: `.agents/skills/image-to-code`
- Primary responsibility: analyse an approved visual reference and translate it into implementation guidance or code.
- Approved phases: implementation only after a reference is approved.
- Forbidden phases: generating and approving its own reference or treating unreviewed imagery as final.
- Inputs: approved frame, measured screenshot, design tokens, responsive constraints.
- Expected outputs: implementation guidance or reviewable code.
- Production-code modification: yes, only in an approved implementation phase.
- Visual decisions: implementation decisions only; no direction selection.
- Known conflicts: generated reference provenance and missing manual comparison.
- Review requirement: side-by-side Playwright comparison and owner review.

## Hallmark

- Installed skill: `hallmark`
- Location: `.agents/skills/hallmark`
- Primary responsibility: independent criticism, AI-macrostructure detection, and reference study without copying.
- Approved phases: after a concept/implementation exists and final visual audit.
- Forbidden phases: leading the initial concept, selecting a catalogue theme as Airix identity, or simultaneous redesign with `gpt-taste`.
- Inputs: completed pass, screenshots, approved brief and references.
- Expected outputs: independent critique with concrete evidence.
- Production-code modification: no during criticism.
- Visual decisions: challenges decisions but does not overwrite the brief.
- Known conflicts: `gpt-taste` co-design and theme-catalogue substitution.
- Review requirement: findings remain separate from the lead pass and go to owner review.

## Impeccable

- Installed skill: `impeccable`
- Location: `.agents/skills/impeccable`, mirrored for detected GitHub harness at `.github/skills/impeccable`
- Primary responsibility: refine typography, spacing, hierarchy, colour, motion, clutter, and detect known anti-patterns.
- Approved phases: after concept selection, approved design-system refinement, final polish, and deterministic CI detection.
- Forbidden phases: initial direction selection, breadth-first concept replacement, and Phase 2 public changes.
- Inputs: approved implementation, design context, source directories.
- Expected outputs: detector reports or bounded refinements.
- Production-code modification: yes only in an approved refinement phase; detector is read-only.
- Visual decisions: refinement decisions inside an approved direction only.
- Known conflicts: premature use can collapse concept breadth; installed vendor scripts add lint warnings.
- Review requirement: preserve detector output and compare screenshots after any change.

## shadcn skill

- Installed skill: `shadcn`
- Location: `.agents/skills/shadcn`
- Primary responsibility: accessible functional primitives for forms, sheets, dialogs, accordions, menus, tabs, tooltips, and feedback states.
- Approved phases: functional journeys after visual approval.
- Forbidden phases: marketing homepage design, default marketing sections, generic card grids, or Phase 2 initialisation.
- Inputs: approved functional requirements and visual system.
- Expected outputs: accessible, styled primitives that conform to Airix design.
- Production-code modification: yes only after explicit approval.
- Visual decisions: no identity or macrostructure decisions.
- Known conflicts: default component styling and registry assumptions.
- Review requirement: future `components.json` choice and each component addition require review.

## Variant

- Installed skill: none; external and not installed.
- Location: external service when access is available.
- Primary responsibility: rapid visual breadth exploration.
- Approved phases: before selecting an implementation reference.
- Forbidden phases: production code, final design decisions, and claims of repository integration.
- Inputs: bounded exploration brief.
- Expected outputs: reviewed reference material saved under `design-review/`.
- Production-code modification: no.
- Visual decisions: proposes variants only.
- Known conflicts: provenance loss and unreviewed output entering implementation.
- Review requirement: save and approve useful references before implementation.

## Playwright

- Installed package: existing `@playwright/test` 1.61.1
- Location: existing project dependency and tests.
- Primary responsibility: deterministic screenshots, interactions, responsive/theme verification, and visual evidence.
- Approved phases: every phase that verifies or affects public interface.
- Forbidden phases: none within safe local verification; it may not deploy.
- Inputs: local route, viewport, theme, locale, motion settings.
- Expected outputs: committed screenshots, contact sheets, and test results.
- Production-code modification: no.
- Visual decisions: no.
- Known conflicts: concurrent Next.js development servers can contend for `.next/dev` lock.
- Review requirement: committed artefacts under `design-review/`.

## Existing Motion library

- Installed package: existing `motion` 12.42.2
- Location: existing application dependency.
- Primary responsibility: small approved interface transitions.
- Approved phases: approved animation implementation.
- Forbidden phases: unapproved cinematic narrative, mixing animation libraries on one element, and Phase 2 changes.
- Inputs: approved motion storyboard and reduced-motion equivalent.
- Expected outputs: purposeful transitions with accessible fallback.
- Production-code modification: yes only in an approved implementation phase.
- Visual decisions: implements approved motion; does not select the narrative.
- Known conflicts: future GSAP or other animation runtime on the same element.
- Review requirement: reduced-motion capture, performance verification, and owner review.
