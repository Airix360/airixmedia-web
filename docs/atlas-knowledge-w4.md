# Atlas Knowledge W4

## Scope boundary

W4 is a private, no-index Knowledge District review at `/internal/atlas-knowledge`. It demonstrates a district-specific Publishing arrival, configurable editorial workflow, six capability groups, a platform-and-metadata relationship model, one verified public open-source record, source-captured publishing evidence, and continuity boundaries.

It does not replace or link from the public homepage or public Publishing page, does not build the complete Publishing section, and does not begin W5. Page metadata sets `noindex`, `nofollow`, `noarchive`, and `nosnippet`; the existing robots policy disallows `/internal/`; every candidate asset requires explicit `internal-review` access.

## District interpretation

Knowledge is a calm reading courtyard feeding an editorial desk and archive. The opening illustration remains the primary world surface. The page then moves through a manuscript record, capability folios, an issue-and-metadata desk, a public-code workshop, authentic publishing captures, and a continuity register.

This composition is deliberately distinct from Commerce. It uses breathing room, editorial serif typography, paper and record surfaces, horizontal and vertical manuscript alignment, archival registers, and measured lagoon-blue emphasis. It does not reuse Commerce's exchange yard, transaction density, yellow system ledger, or repeated four-pathway directory.

No floating book, graduation cap, holographic library, fake dashboard, fake citation counter, impact factor, journal metric, indexing badge, provider partnership, or speculative AI-review system is used.

## Publishing capability groups and sources

Repository records establish current stated scope; they do not prove a specific delivered project, universal configuration, commercial term, or outcome.

| Capability group | Wording represented | Status | Verification source |
| --- | --- | --- | --- |
| OJS implementation and configuration | New installations, single- and multi-journal platforms, journal setup, themes, interface customisation, roles, permissions, workflows, plugins, and integrations | Repository scope record | `src/lib/pages.ts` `publishing`, `publishing/ojs`, and `publishing/journal-platforms`; `src/lib/content.ts` Publishing Technology |
| Migration, upgrades, and recovery | Version upgrades, platform/database/file migration, staging, validation, recovery, troubleshooting, legacy cleanup, continuity planning | Repository scope record; cleanup wording remains restrained structural interpretation | `src/lib/pages.ts` `publishing/ojs`, `services/support-recovery`, and the OJS upgrade field note |
| Editorial and publishing workflows | Submissions, editorial stages, review, revision, production, issue publishing, journal structure, author and reviewer experience, metadata quality, documentation, training | Repository scope record | `src/lib/pages.ts` `publishing/editorial-support`; `src/lib/pricing.ts` editorial workflow configuration and training inclusions |
| Metadata, DOI, indexing, and integrations | Metadata configuration, DOI and Crossref implementation support, indexing preparation, email, payment plugins, archiving where agreed, and external services | Repository scope record; archiving remains conditional structural wording | `src/lib/pages.ts` `publishing`, `publishing/editorial-support`, and `publishing/plugins`; public PaystackOJS repository |
| Hosting, maintenance, training, and support | Hosting, updates, maintenance, backups, monitoring, training, documentation, issue resolution, improvement, continuity | Repository scope record | `src/lib/pages.ts` `publishing/hosting-support`; `src/lib/content.ts` Publishing Technology and Managed Infrastructure |
| Open-source publishing work | Public OJS plugins, repository documentation, releases, installation and compatibility notes, and maintenance boundaries | Public repository and repository scope record | `https://github.com/thathman/PaystackOJS`; `src/lib/pages.ts` `publishing/plugins` |

The page makes no claim of PKP certification or partnership, Crossref membership, ORCID partnership, indexing acceptance, DOI ownership, journal count, article count, migration volume, success rate, downtime, uptime, response time, adoption, institutional users, or measurable publishing outcome.

## Publishing workflow

`PublishingWorkflow` presents seven stages: Submission, Editorial assessment, Review, Revision, Production, Publication, and Discovery and preservation. The sequence is explicitly labelled a configurable illustrative model rather than a universal journal process.

The repository verifies OJS platform work, editorial workflows, submissions/reviews/metadata/payments, production and issue publishing scope, and technical publishing support through `src/lib/pages.ts`, `src/lib/content.ts`, and `src/lib/pricing.ts`. The exact seven-stage arrangement is W4 structural copy required by the sprint and remains proposed for internal review.

The control uses an accessible tab list with roving focus, Left/Right/Up/Down/Home/End keyboard behaviour, one labelled panel, and a complete visible ordered textual representation. No circular diagram or hover-only information is used.

## Proposed internal copy disclosures

The opening lines “Publishing is not a page.” and “It is a system of people, decisions, records, and trust.” are proposed internal copy and are labelled on the page.

The workflow's exact stage order, “A journal is an archive in motion.”, the seven-part platform relationship model, archival metaphors, legacy-cleanup wording, archiving configuration, and connective descriptions are internal explanatory structures. They do not create a commercial promise or establish one mandatory journal workflow.

## Open-source verification

The workshop uses **OJS Paystack Payment Gateway** from `https://github.com/thathman/PaystackOJS`.

GitHub repository and release APIs plus the public README were inspected on 2026-07-14:

- exact repository: `thathman/PaystackOJS`;
- public and not archived;
- default branch: `main`;
- licence recorded by GitHub: GPL-3.0;
- language recorded by GitHub: PHP;
- latest GitHub release: `v1.1.1.0`, published 2026-06-10;
- actual purpose: Paystack-hosted checkout for OJS payment activity with server-side verification before fulfilment;
- README requirements: OJS 3.5.0+ and PHP 8.1+;
- no adoption or institutional-user number is published here.

An ambiguity remains visible: the repository's latest release is `v1.1.1.0`, while the README header still displays version 1.1.0. W4 reports both instead of silently choosing one. Paystack account eligibility governs available currencies. The page does not describe the repository as an official PKP, Paystack, Crossref, or ORCID partnership.

## Authentic publishing evidence

`ProjectMediaSequence` reuses the two W2 KU Journals captures dated 2026-07-14. The current public interface and its visible footer credit are source-captured. The footer credits Airix Media with design, development, and maintenance. The original need, project constraints, complete responsibility, editorial decisions, policies, metrics, and outcomes remain unverified and are not claimed.

## Components

W4 reuses `AtlasScene`, `ResponsivePicture`, `SceneFallback`, `ReducedMotionScene`, `DistrictMarker`, `PrimaryNavigation`, `MobileNavigation`, `AtlasRouteIndicator`, `SkipJourneyLink`, `CapabilityGroup`, `ServicePathway`, `ResponsibilitySummary`, `EvidenceList`, `CaseStudyLink`, and `ProjectMediaSequence`.

It implements `PublishingWorkflow` and `OpenSourceProject`. Knowledge orchestration uses `KnowledgeDistrictReview`, `KnowledgeArrival`, `EditorialCourtyard`, `PublishingCapabilityGroups`, `PublishingSystemMap`, `OpenSourceWorkshop`, and `KnowledgeContinuity`.

`ServicePathway` now accepts a shared typed content contract and a Knowledge variant. The Commerce default remains unchanged. Knowledge uses archival folios and stacked scope registers rather than the Commerce composition.

## Candidate assets

| Asset | Use | Status |
| --- | --- | --- |
| `ILL-0002` organised Knowledge District responsive scene | Prioritised district opening | Candidate |
| `marker-02-knowledge.svg` | Secondary Knowledge identity | Candidate |
| `route-01-primary.svg` | Registered route material | Candidate |
| `tex-print-01-fine-halftone.png` | Paper-print surface | Candidate |
| `obj-0007-community-archive.svg` | Courtyard archive object | Candidate |
| `obj-0022-letterpress.svg` | Workflow production object | Candidate |
| `obj-0023-archive-cabinet.svg` | Platform archive object | Candidate |
| `sign-04-archive-room.svg` | System-record sign | Candidate |
| `stamp-05-archive-copy.svg` | Folio and repository mark | Candidate |

No asset was promoted. Nothing is referenced from `scenes/candidates/`, `scenes/candidates/raw-generated/`, a loose-generated path, or a deprecated path.

## Platform-system model

The system view names seven relationships: people and roles; manuscripts and files; editorial workflow; journal and issue record; metadata and DOI; external services; and hosting and continuity. It uses an issue folio, archive cabinet, numbered records, and visible text rather than a futuristic network diagram.

An ordered textual equivalent and prose equivalent remain visible to screen readers, mobile visitors, reduced-motion visitors, and anyone viewing the page without decorative material. Payments are qualified as applicable; archiving and all other external services are qualified as agreed scope.

## Motion and reduced motion

Motion is limited to finite paper alignment and record-line progression using the existing CSS view-timeline approach. Workflow state changes occur only when a visitor selects a stage. There is no scroll hijacking, universal parallax, bouncing paper, floating book, particle system, spinning icon, animated metric, continuous decoration, or added animation library.

Reduced motion disables the line and paper-alignment animations. District identity, seven workflow stages, six capability groups, the seven-part system, repository evidence, KU source captures, continuity record, related routes, and all actions remain complete and in the same reading order.

## Responsive decisions

Desktop uses a full-canvas courtyard arrival with a left editorial folio, a two-column workflow desk, broad archival pathway records, an issue-and-metadata desk, and an asymmetric repository/evidence workshop.

At 390 px, the authored 4:5 Knowledge crop remains dominant while the folio sits at the lower edge. Workflow controls become a touch-friendly horizontal index above a full-width record. The complete textual workflow stacks vertically. Capability groups become a clear editorial sequence. The platform system becomes one issue folio followed by one record stack. The open-source record places evidence before secondary decoration and keeps the repository link usable.

## Accessibility

- One page `h1` is followed by section `h2` and local `h3`/`h4` headings.
- The scene has purpose-specific alternative text; district markers and CSS material are decorative.
- The capability skip link moves focus to the focusable capability section.
- The workflow uses labelled tabs, roving focus, keyboard directional controls, a labelled panel, and a full ordered textual equivalent.
- The platform model includes an ordered textual equivalent and visible prose equivalent.
- Evidence and proposal states are written as text, not carried only by colour.
- Repository links are descriptive and identify the project.
- Native related-route links keep visible focus and accessible labels.
- Existing mobile-menu focus containment, Escape dismissal, and focus restoration remain covered.
- No essential content depends on hover, animation, or decorative imagery.

## Performance

Only the responsive Knowledge opening is prioritised. Desktop, tablet, and mobile scene derivatives are approximately 526 KB, 388 KB, and 404 KB. The fine-halftone texture is 3.6 KB. The five Knowledge-specific SVG objects total approximately 5.9 KB. The two reused KU Journals source captures are approximately 114 KB and 111 KB and remain lazy-loaded below the fold.

No multi-megabyte scene master, five-layer scene package, candidate-path asset, third-party runtime, or new animation library is loaded by W4. The generated candidate opening remains the primary image-weight and visual-review risk.

## Evidence screenshots

- [Desktop opening](../output/playwright/atlas-knowledge-w4/desktop-opening-1440x1000.png)
- [Desktop workflow](../output/playwright/atlas-knowledge-w4/desktop-workflow-1440x1000.png)
- [Desktop capabilities](../output/playwright/atlas-knowledge-w4/desktop-capabilities-1440x1000.png)
- [Desktop platform system](../output/playwright/atlas-knowledge-w4/desktop-platform-system-1440x1000.png)
- [Desktop open source](../output/playwright/atlas-knowledge-w4/desktop-open-source-1440x1000.png)
- [Mobile opening](../output/playwright/atlas-knowledge-w4/mobile-opening-390x844.png)
- [Mobile workflow](../output/playwright/atlas-knowledge-w4/mobile-workflow-390x844.png)
- [Mobile capabilities](../output/playwright/atlas-knowledge-w4/mobile-capabilities-390x844.png)
- [Mobile open source](../output/playwright/atlas-knowledge-w4/mobile-open-source-390x844.png)
- [Reduced-motion opening](../output/playwright/atlas-knowledge-w4/reduced-motion-opening-1440x1000.png)
- [Reduced-motion workflow](../output/playwright/atlas-knowledge-w4/reduced-motion-workflow-1440x1000.png)

## Checks

- `pnpm lint` — passed with no ESLint errors or warnings.
- `pnpm typecheck` — passed with no TypeScript errors.
- `pnpm test` — 10 files and 36 tests passed.
- `pnpm build` — Next.js 16.2.10 production build passed; 23 routes were generated, including the isolated Knowledge route.
- `pnpm test:e2e` — 69 tests passed and 3 capture-project tests were intentionally skipped because each evidence suite runs only in its matching desktop or mobile project.

## Known limitations and Atlas conflicts

- The Knowledge illustration remains an unapproved generated candidate. Baked district and environmental lettering requires visual, factual, and language review before public use.
- The illustration depicts a fictional/composite Lagos academic environment rather than KU Journals, Kampala University, or a verified client campus.
- The Atlas source registry identifies planned Knowledge illustrations as `ILL-0030` Reading Courtyard and `ILL-0031` Editorial Workflow, while the organised runtime package labels the available private-review scene `ILL-0002`. W4 uses only the organised typed package and does not claim the planned official assets exist.
- Atlas Gate A requires approval before implementation, while the W4 brief explicitly permits candidate artwork through private internal-review access. W4 follows the narrower review-only exception without promoting the art.
- The exact seven-stage workflow is an illustrative configurable model, not a universal editorial or governance promise.
- Repository capability records establish stated scope but do not prove delivered client work, a package, certification, partnership, indexing outcome, or commercial availability in every configuration.
- PaystackOJS has a latest GitHub release of `v1.1.1.0`, while its README header displays 1.1.0. Supported OJS is documented as 3.5.0+ in the README; no broader compatibility is claimed.
- Crossref implementation support is repository-recorded, but membership, DOI ownership, deposit authority, and successful registration are not claimed. ORCID is not included because no inspected repository source verified it for this slice.
- The KU Journals evidence supports only its current interface and public Airix Media footer credit. Original need, complete scope, and measurable outcomes remain unverified.
- All carried W1–W3 limitations remain unresolved. W4 does not edit Arrival, Landmark proof records, Commerce content, or public routes.
- Passing checks is not visual approval.
