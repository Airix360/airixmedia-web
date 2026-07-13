# Atlas Runtime W0

## Boundary

This change establishes the Atlas runtime foundation only. The public homepage is not replaced, no public route imports the Atlas review components, and no W1 page integration is included.

The internal implementation review is available at `/internal/atlas-review`. It is excluded by page-level robots metadata and the site robots policy.

## Foundation delivered

- CSS and TypeScript tokens for the approved Atlas palette, typography roles, spacing, rules, shadows, surfaces, scene depth, motion, content widths, and district accents.
- A typed registry for 10 master scenes, responsive crops, five-layer scene compositions, fallbacks, and 12 supporting-asset categories.
- Explicit candidate gating: callers receive a `CandidateAssetAccessError` unless they opt into `internal-review`; raw-generated and scene-candidate paths are rejected.
- Scene primitives for responsive sources, layers, static fallbacks, reduced-motion equivalents, captions, safe zones, signals, markers, decorative images, and loading priority.
- Navigation primitives with explicit public labels, secondary district identities, utility access, active district state, route indication, a keyboard-contained mobile sheet, and visible focus treatment.
- Accessibility and motion utilities, semantic landmarks, skip links, and platform reduced-motion handling.
- An internal review harness for scene modes, navigation state, type roles, colour, texture, reusable material, registry coverage, and mobile behaviour.

## Evidence

- [Desktop layered review](../output/playwright/atlas-runtime-w0/desktop-1440x1000.png)
- [Mobile layered review](../output/playwright/atlas-runtime-w0/mobile-390x844.png)
- [Reduced-motion review](../output/playwright/atlas-runtime-w0/reduced-motion-1440x1000.png)

The pre-W0 and post-W0 public homepage captures are both 1440 × 7959. No public homepage component or stylesheet was edited. The captures have a mean RGB delta below `0.06 / 255`, caused by capture timing in the existing animated homepage; the public isolation browser test also confirms that no internal route, scene primitive, or review label is exposed on `/`.

## Verification

- `pnpm lint` — passed with no warnings or errors.
- `pnpm typecheck` — passed.
- `pnpm test` — 6 files passed; 16 tests passed.
- `pnpm build` — passed; 19 routes generated, including the isolated internal route.
- `pnpm test:e2e` — 11 passed; 1 intentionally skipped because the mobile-navigation contract only applies to the mobile project.
- Browser console on the review harness — 0 errors and 0 warnings after asset-path correction.

## Known limitations

- All supplied Atlas artwork remains `candidate`; the review route opts in explicitly and no candidate is promoted to approved production use.
- W0 uses the existing project fonts through Atlas role tokens. Final font-pair selection remains a later visual review decision.
- Scene focal points and safe zones are typed and functional but still require art-direction review for every scene before public integration.
- The mobile sheet foundation is implemented and tested, but district-by-district public navigation integration belongs to W1 or later.
- The review harness demonstrates composition mechanics; it is not a proposed public page.

## Source notes

The latest dated decision was ambiguous because `decisions/2026-07-13-atlas-v1-freeze.md` and `decisions/2026-07-13-foundation.md` share the same date and repository revision. Both were read. They do not conflict: the freeze document governs status and scope, while the foundation document supplies implementation detail.

The Atlas typography source requests later comparison of multiple font pairings; W0 therefore defines semantic roles without claiming a final pairing. The asset package is explicitly marked candidate, so the runtime treats every registered item as opt-in internal material despite its `production-package-v1` directory name.
