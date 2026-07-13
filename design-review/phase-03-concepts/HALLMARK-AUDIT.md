<!-- Hallmark · pre-emit critique: P4 H4 E4 S5 R4 V4 -->
# Hallmark independent audit

Mode: `hallmark audit` · read-only · no redesign · no code changes · no winner selected.

The design lab is intentionally exempt from `DESIGN.md` theme matching: this phase exists to test alternate systems before one is approved. The audit therefore treats palette and font divergence as declared experimental scope, not production design-system drift.

## Critical findings

### 1. Default-attractor sameness — all three concepts become the same page after the opening

- **Tell:** Default-attractor sameness / familiar template macrostructure.
- **Where:** `src/components/design-lab/concept-experience.tsx:77–93`; desktop and mobile full-page screenshots for all three concepts.
- **Severity:** critical.
- **Why:** The proposition grid, first-proof split, generated interface, operating-model rows and footer are identical. The openings are genuinely different, but the concepts then read as three hero skins on one shared studio template.
- **Fix:** In a later phase, give each approved candidate a different proof mechanic and page rhythm—not merely different colour and type—while preserving the same factual content.

### 2. The AI nav — one generic header shape is repeated three times

- **Tell:** The AI nav.
- **Where:** `src/components/design-lab/concept-experience.tsx:66–69`; `src/components/design-lab/design-lab.module.css:4`.
- **Severity:** critical.
- **Why:** Wordmark hard-left, three inline links hard-right and a full-width hairline is the standard genre-blind agency navigation. It also conflicts with the brief’s request for a distinct header per concept.
- **Fix:** In a later phase, make navigation behaviour part of each concept: for example a route legend, a moving destination band, or a scaffold index—without reducing keyboard or mobile clarity.

## Major findings

### 3. Eyebrow on every section — numbered labels become a repeated tic

- **Tell:** Eyebrow on every section.
- **Where:** `src/components/design-lab/concept-experience.tsx:78`, `:86`, `:90`.
- **Severity:** major.
- **Why:** `01 / POSITION`, `02 / FIRST PROOF` and `03 / OPERATING MODEL` repeat on every concept. The sequence is technically ordinal, but three uppercase labels per short page overpower the hierarchy and read as generated editorial styling.
- **Fix:** Keep at most one orientation label, then let section composition establish sequence.

### 4. Default-attractor sameness — the three motion systems are one transform recipe

- **Tell:** Default-attractor sameness / universal scroll-triggered fade-up.
- **Where:** `src/components/design-lab/concept-experience.tsx:55–57`, `:79`, `:87`.
- **Severity:** major.
- **Why:** Every concept uses the same scene translation, scale, fade-up and timing. The visual materials differ, but motion does not express night traffic, daylight exchange or physical reassembly differently.
- **Fix:** If a direction advances, replace the shared recipe with concept-specific state change and keep only one orchestrated reveal.

### 5. Mid-render token improvisation — colours escape the concept token blocks

- **Tell:** Mid-render token improvisation.
- **Where:** `src/components/design-lab/design-lab.module.css:2`, `:7`, `:10`, `:13`, `:26`.
- **Severity:** major.
- **Why:** Each concept declares useful semantic tokens, then scene, glow, paper, shadow and responsive corrections introduce raw hex and rgba values directly. The pages feel coherent now, but future iteration will drift quickly.
- **Fix:** Promote every colour and material value into concept-scoped named tokens before further refinement.

### 6. Controlled collision exceeds the legibility budget on Reassembled mobile

- **Tell:** Fake complexity without hierarchy (mobile expression).
- **Where:** `src/components/design-lab/design-lab.module.css:13`, `:26`; `screenshots/reassembled-mobile-opening.png`.
- **Severity:** major.
- **Why:** Scaffold lines, halftone and the serif proposition compete in the same lower-third. The yellow fragment was moved away, but the reading path still depends on decoding rather than scanning.
- **Fix:** Preserve collision among the upper material fragments, then reserve a clean mobile reading lane for the proposition.

## Minor findings

### 7. Every section padded the same

- **Tell:** Every section padded the same.
- **Where:** `src/components/design-lab/design-lab.module.css:4`, `:15`.
- **Severity:** minor.
- **Why:** Proposition, proof and operating model share nearly identical large vertical padding. Background changes hide some repetition, but full-page captures show a predictable cadence.
- **Fix:** Tighten the proof entry or expand one transition so density changes with narrative purpose.

## Concept A — After Dark

- **Generic AI agency site?** The night palette and abstract route field risk the familiar “creative technology studio” category, but the city-first opening and absence of glow blobs keep it from the usual template.
- **Familiar macrostructure?** The opening is specific; everything after it shares the common template flagged above.
- **Lagos meaningfully present?** Yes, through lagoon mass, bridge pairs, junctions and signal movement rather than a skyline photograph.
- **Culturally specific without cliché?** Mostly. It avoids neon-club shorthand and literal map copying.
- **Premium?** Yes. Restraint, depth and typography are controlled.
- **Broad and full-service?** The Build / Run / Rescue close communicates range, though publishing and commerce are not yet visible.
- **Creative before technical?** Yes; the city is encountered before the operating interface.
- **First frame curious?** Yes. The reduced headline scale was the correct correction.
- **Selected-work transition convincing?** Partially. The dark operating view is coherent, but it is the same generic proof object used elsewhere.
- **Mobile designed, not collapsed?** Yes. The road field is recropped and the statement is deliberately small.
- **Strongest feature:** City-as-infrastructure opening.
- **Reject:** Any further glow, dashboard detail or oversized night headline.
- **Potential combination:** Its restraint and city-first patience could strengthen the proof discipline of In Motion.

## Concept B — In Motion

- **Generic AI agency site?** Least at risk in the opening because the market verbs, wake and variable-width type form a recognisable movement system; the shared lower structure restores some template familiarity.
- **Familiar macrostructure?** Opening is distinct; later sections are familiar and repeated.
- **Lagos meaningfully present?** Yes, through exchange, yellow movement markers, lagoon routes and verbal pace.
- **Culturally specific without cliché?** Generally. It avoids bus illustration and tourist language, though yellow plus route names must remain restrained.
- **Premium?** Energetic rather than luxurious; the strong type and disciplined ivory field keep it credible.
- **Broad and full-service?** Build / Run / Rescue is clear; the opening initially reads more commerce-focused than full-service.
- **Creative before technical?** Strongly yes.
- **First frame curious?** Yes. It suggests movement without explaining the whole company immediately.
- **Selected-work transition convincing?** The lagoon-blue switch is strong, but the interface mechanics are not uniquely “in motion.”
- **Mobile designed, not collapsed?** Yes after correction: the route placard is removed, word breaks are protected and the composition is recropped.
- **Strongest feature:** The relationship between verbs, width and horizontal current.
- **Reject:** Literal Danfo illustration, travel imagery or faster continuous motion.
- **Potential combination:** Its colour confidence could animate After Dark’s proof transition without importing its density.

## Concept C — Reassembled

- **Generic AI agency site?** The opening is not generic; it risks becoming a graphic-design portfolio exercise instead.
- **Familiar macrostructure?** The opening is structurally distinct; the rest repeats the common concept template.
- **Lagos meaningfully present?** Yes through kiosk/scaffold logic, copied matter and temporary construction material rather than generic “African” motifs.
- **Culturally specific without cliché?** Mostly. It avoids copying a named magazine or fashion identity.
- **Premium?** On desktop, yes through controlled collision and strong type. On mobile, legibility pressure reduces the premium effect.
- **Broad and full-service?** Rescue and inherited-system work are especially clear; greenfield creation is less immediate until Build / Run / Rescue.
- **Creative before technical?** Yes.
- **First frame curious?** Very. It rewards a second look.
- **Selected-work transition convincing?** Conceptually strongest when fragments resolve into one interface, but implementation still uses the same interface shell as A and B.
- **Mobile designed, not collapsed?** It is recropped, but the proposition lane remains too contested.
- **Strongest feature:** Fragment-to-order narrative.
- **Reject:** Additional scraps, distressed textures or fashion-editorial imitation.
- **Potential combination:** Its reassembly logic could give another concept a more authentic rescue transition, provided its visual density is not imported wholesale.

## Audit summary

`2 critical · 4 major · 1 minor`

Verdict: the three openings are specific, culturally considered and meaningfully different; the shared navigation, proof structure and motion recipe keep the overall set from reaching the same level of distinctness. No concept is declared the winner.
