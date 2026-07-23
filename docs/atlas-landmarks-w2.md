# Atlas Landmarks W2

## Scope boundary

W2 is a private, no-index proof-system review at `/internal/atlas-landmarks`. It demonstrates one general-technology pattern and one scholarly-publishing pattern. It is not the complete Work section, does not publish a case study, does not alter the public homepage, and does not begin W3.

The route has `noindex`, `nofollow`, `noarchive`, and `nosnippet` metadata, remains covered by the existing `/internal/` robots exclusion, is not linked publicly, and requests all candidate Atlas material through explicit `internal-review` access.

## Selected examples and claim provenance

### Airix Food — general technology structural example

The repository records Airix Food as an Airix 360 sister venture and case-study candidate. The Cloudflare audit records that `airixfood.com` existed as an active zone at audit time. Neither record verifies the project need, Airix delivery responsibility, current interface, delivery date, or outcomes.

| Statement shown | Status | Source |
| --- | --- | --- |
| Airix Food is an Airix 360 sister venture. | Repository record | `src/lib/pages.ts` |
| Airix Food is a case-study candidate. | Repository record | `docs/CASE_STUDY_CANDIDATES.md` |
| `airixfood.com` existed as an active zone at audit time. | Audit-time observation only | `docs/CLOUDFLARE_AUDIT.md` |
| Project need, Airix responsibility, current interface, date, and outcomes. | Missing | Not claimed |

The current public Airix Food surface was inspected but rejected as evidence because it contains obvious inherited template material. No screenshot from it is included. The proof pattern is intentionally a structural placeholder that names every missing record.

### KU Journals — scholarly publishing source-captured example

The repository Cloudflare audit records `kujournals.ac.ug` as an active zone at audit time. The current public interface was captured on 2026-07-14. Its public footer visibly credits Airix Media with design, development, and maintenance. W2 uses only those inspectable facts.

| Statement shown | Status | Source |
| --- | --- | --- |
| `kujournals.ac.ug` existed as an active zone at audit time. | Verified audit record | `docs/CLOUDFLARE_AUDIT.md` |
| A current KU Journals public interface exists. | Source captured | `https://kujournals.ac.ug`, captured 2026-07-14 |
| The footer credits Airix Media with design, development, and maintenance. | Source captured | Live footer and `ku-journals-footer-credit-2026-07-14.png` |
| Original project need and constraints. | Missing | Not claimed |
| Editorial content, policies, institutional claims, journal metrics, and publishing decisions are Airix responsibilities. | Not attributed | No supporting evidence |
| Measurable project outcomes. | Missing | Not claimed |

The existing `src/lib/content.ts` KU Journals narrative remains `inferred_needs_review`; W2 identifies that record but does not repeat its challenge, solution, or ongoing-role language as fact.

## Proof experiences and compositional disparity

The general-technology pattern is operational, route-led, dark, and deliberately incomplete. A dense Commerce landmark arrives at a hard evidence bay. The empty media field, three-part responsibility register, evidence types, and missing-state language make the refusal to fabricate visible.

The publishing pattern is calmer, editorial, and archival. A Knowledge reading courtyard sits beside the project record; an archive threshold opens into real, unframed interface captures at their original 16:10 proportion. Media tabs behave as an evidence index, followed by responsibility and source registers.

Both patterns share proof primitives, Atlas materials, public navigation, and evidence states, but they do not share one rigid case-study template.

## Components

W2 reuses `AtlasScene`, `ResponsivePicture`, `SceneFallback`, `ReducedMotionScene`, `DistrictMarker`, `PrimaryNavigation`, `MobileNavigation`, `AtlasRouteIndicator`, and `SkipJourneyLink` from W0/W1.

The proof primitives are `LandmarkReveal`, `ProjectFeature`, `ProjectMediaSequence`, `ResponsibilitySummary`, `EvidenceList`, and `CaseStudyLink`. W2 orchestration uses `LandmarkReview`, `TechnologyLandmark`, and `PublishingLandmark`. Only the accessible media sequence is client-rendered.

## Assets and status

| Asset | Use | Status |
| --- | --- | --- |
| `ILL-0003` Commerce District responsive scene | General-technology landmark | Candidate |
| `ILL-0002` Knowledge District responsive scene | Publishing landmark | Candidate |
| `marker-03-commerce.svg` | Technology district marker | Candidate |
| `marker-02-knowledge.svg` | Publishing district marker | Candidate |
| `route-01-primary.svg` | Technology route material | Candidate |
| `tex-print-01-fine-halftone.png` | Shared proof and archive material | Candidate |
| KU Journals homepage capture | Authentic public interface evidence | Source capture, 2026-07-14 |
| KU Journals footer capture | Authentic public responsibility evidence | Source capture, 2026-07-14 |

No candidate was promoted. Nothing was loaded from `scenes/candidates/` or `scenes/candidates/raw-generated/`.

The Knowledge focal points are `72% 50%` desktop, `68% 50%` tablet, and `66% 46%` mobile. They keep the reading courtyard and human activity legible while excluding a stray baked district-title fragment from the desktop crop. Commerce uses the registry default `50% 50%` focal points.

## Motion and reduced motion

Technology uses a finite route-arrival crop and the shared threshold route build. Publishing uses the threshold build and evidence alignment in reading order. There is no scroll hijacking, pinned multi-screen sequence, device animation, continuous decorative motion, or additional animation library.

Reduced motion resolves the landmarks, thresholds, evidence media, responsibility summaries, registers, and related routes as complete static compositions. No evidence depends on movement.

## Responsive decisions

Desktop technology pairs a large operational evidence bay with a responsibility register. Desktop publishing uses an asymmetric paper-and-courtyard opening followed by a broad archival evidence surface.

At mobile width, both use authored 4:5 district crops. Technology becomes a sequential evidence bay followed immediately by responsibility. Publishing places the reading courtyard before its archival record and keeps interface captures readable at the full available width. Evidence tabs remain touch-friendly and use arrow-key navigation; no tiny browser simulation is introduced.

## Accessibility

- One page `h1`, project `h2` headings, and proof-register `h3`/`h4` headings preserve hierarchy.
- Scenes and interface captures have purpose-specific alt text; decorative markers, routes, textures, and thresholds are isolated.
- Media navigation uses an accessible tab list, roving tab focus, Left/Right/Home/End behavior, labelled tab panels, captions, and visible focus.
- Evidence is available without hover and statuses are written in text rather than conveyed only by colour.
- The journey skip targets the first evidence state.
- Existing mobile-navigation trapping, Escape dismissal, and focus restoration remain covered.
- Reduced motion preserves every proof and action.

## Performance

The first Commerce scene is prioritised; the Knowledge scene and both project captures are lazy-loaded. A fresh initial-route trace requested the Commerce responsive image, two small marker SVGs, the 4 KB route, and the 4 KB shared texture. It did not request the Knowledge scene or either KU Journals capture.

Approximate responsive weights are 488 KB desktop / 352 KB tablet / 340 KB mobile for Commerce and 516 KB / 380 KB / 396 KB for Knowledge. Each authentic KU Journals PNG is approximately 112 KB. No multi-megabyte master, scene-layer package, or third-party runtime was added.

## Evidence screenshots

- [Desktop technology opening](../output/playwright/atlas-landmarks-w2/desktop-technology-opening-1440x1000.png)
- [Desktop technology evidence](../output/playwright/atlas-landmarks-w2/desktop-technology-evidence-1440x1000.png)
- [Desktop publishing opening](../output/playwright/atlas-landmarks-w2/desktop-publishing-opening-1440x1000.png)
- [Desktop publishing evidence](../output/playwright/atlas-landmarks-w2/desktop-publishing-evidence-1440x1000.png)
- [Mobile technology proof](../output/playwright/atlas-landmarks-w2/mobile-technology-390x844.png)
- [Mobile publishing proof](../output/playwright/atlas-landmarks-w2/mobile-publishing-390x844.png)
- [Reduced-motion technology proof](../output/playwright/atlas-landmarks-w2/reduced-motion-technology-1440x1000.png)
- [Reduced-motion publishing proof](../output/playwright/atlas-landmarks-w2/reduced-motion-publishing-1440x1000.png)

## Checks

The complete W2 quality gate passed:

- `pnpm lint` — passed with no ESLint errors or warnings.
- `pnpm typecheck` — passed with no TypeScript errors.
- `pnpm test` — 8 files and 25 tests passed.
- `pnpm build` — Next.js 16.2.10 production build passed; 21 routes were generated, including the private Landmark route.
- `pnpm test:e2e` — 31 tests passed and 1 expected project-specific test was skipped across desktop and mobile projects.

## Known limitations and source conflicts

- Airix Food is only a structural example. Authentic media, approved responsibility, project need, delivery record, date, owner approval, and outcomes are missing.
- KU Journals has source-captured public media and a public responsibility credit, but its project brief, constraints, implementation record, client permission, and measurable outcomes remain missing.
- Both district scenes remain generated candidates with baked environmental text requiring verification. The Knowledge artwork also depicts a fictional/composite Lagos campus rather than KU Journals or Kampala University.
- The Atlas illustration registry lists the Landmark Threshold (`ILL-0010`) as planned, while an unrelated gongbi candidate exists only under a forbidden candidate path. W2 therefore uses organised Commerce and Knowledge scenes through the typed registry instead of bypassing asset governance.
- Atlas review gates say candidate illustrations require approval before implementation, while the W2 brief explicitly authorises private, gated candidate use. This implementation follows the narrower W2 review exception without implying approval.
- Carried W1 limitations remain unresolved and W2 does not modify Arrival artwork.
- Passing checks is not visual approval.
