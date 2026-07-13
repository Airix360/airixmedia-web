# Airix Media redesign review protocol

This protocol governs every redesign phase after the rejected baseline. A phase is not ready for owner review until its review package is complete and committed.

## Required package

Each phase must create a clearly named directory under `design-review/` containing:

1. `SUMMARY.md`
2. `DECISIONS.md`
3. `FILES-CHANGED.md`
4. `QUALITY-RESULTS.md`
5. Desktop screenshots at the viewports required by that phase
6. Mobile screenshots at the viewports required by that phase
7. Light and dark screenshots wherever both appearances are implemented or affected
8. One labelled contact sheet that makes comparison possible
9. The exact commit SHA reviewed
10. A preview URL when the environment safely provides one
11. Known limitations
12. Questions requiring owner review

## Screenshot rules

- Capture the actual committed interface with Playwright.
- Use deterministic viewport, content, locale, theme, font-loading, animation, and scroll settings.
- Include both above-the-fold and full-page evidence when a phase changes page composition.
- Do not crop out weak areas, hide visitor-visible content, or edit screenshots to improve perception.
- Label contact sheets with route, viewport, theme, and phase.
- Preserve screenshot aspect ratios.
- Keep the review layout neutral and comparison-oriented.
- **Never hide screenshots in `.next`, `test-results`, `playwright-report`, temporary build directories, or untracked output folders.** All review screenshots and contact sheets must be committed under `design-review/`.

## Review gates

1. The phase objective and exclusions are documented before implementation.
2. Application changes remain within the approved phase boundary.
3. Lint, type checking, unit tests, production build, and relevant browser tests are run and recorded exactly.
4. Public-content evidence states are checked for leakage.
5. Desktop and mobile screenshots are compared against the prior committed phase.
6. Known limitations and unresolved questions are stated plainly.
7. The owner reviews the committed package and explicitly approves, rejects, or requests revision.
8. A later phase must not reinterpret silence as approval.

## Required document contents

### `SUMMARY.md`

State the phase objective, outcome, routes affected, major visible changes, and what was deliberately left unchanged.

### `DECISIONS.md`

Record approved choices, rejected alternatives, assumptions, and decisions still awaiting the owner. Separate facts from proposals.

### `FILES-CHANGED.md`

List every created, modified, renamed, and deleted file with a one-line reason. Identify public-interface files separately from review-only artefacts.

### `QUALITY-RESULTS.md`

For each command, record the exact command, pass/fail result, relevant output, whether a failure predates the phase, and the recommended action. Never change application code solely to disguise a baseline failure.

## Preview safety

- Prefer a local development URL or a safe environment-provided forwarded URL.
- Do not deploy merely to create a review link.
- Never change DNS, Cloudflare, tunnels, Dell services, secrets, or production infrastructure as part of a visual review package unless a separate prompt explicitly authorises it.
- State clearly when no externally accessible preview exists.

## Completion record

The final phase summary must include:

- Starting branch and commit
- Review branch and reviewed commit
- Working-tree status
- Quality results
- Every review artefact path
- Local/forwarded preview availability
- Public and production systems explicitly not changed
- Owner questions and the exact approval needed to proceed
