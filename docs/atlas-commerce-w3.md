# Atlas Commerce W3

## Scope boundary

W3 is a private, no-index Commerce District review at `/internal/atlas-commerce`. It proves a district-specific service language for digital experiences, commerce systems, payments and integrations, and business portals. It does not replace the public homepage or Services page, does not build the complete Services section, and does not begin W4.

The route has page-level `noindex`, `nofollow`, `noarchive`, and `nosnippet` metadata, remains covered by the existing `/internal/` robots exclusion, is absent from public navigation, and accesses candidate Atlas material only through the typed `internal-review` capability.

## District interpretation

Commerce is treated as an active midday exchange field: the density, routes, canopies, people, and practical handoffs of a Lagos market meet the institutional scale and alignment of a commercial district. The page moves through a commissioned district scene, an inhabited exchange yard, explicit service rows, a ledger-like connected-system field, and a continuity register.

It intentionally does not use a hero dashboard, payment-provider logos, credit-card symbolism, generic shopping carts, floating interfaces, fintech glow, fake analytics, or a repeating card grid.

## Service groups and claim sources

Repository records are treated as current implementation scope, not as evidence of a specific delivered client system or commercial promise.

| Service group | Wording used | Evidence status | Source |
| --- | --- | --- | --- |
| Digital experiences | Websites, customer-facing web applications, responsive design, content and service journeys | Repository scope record | `src/lib/content.ts` Digital Experiences and Business Systems; `src/lib/pages.ts` `services/digital-experiences` |
| Commerce systems | E-commerce | Repository scope record | `src/lib/content.ts` Digital Experiences; `src/lib/pages.ts` `services/digital-experiences` |
| Commerce systems | Catalogues, checkout, ordering, customer accounts, and operational commerce workflows | Proposed internal scope | Required W3 structural scope; owner confirmation still required |
| Payments and integrations | API and payment integrations, workflow automation | Repository scope record | `src/lib/content.ts` Business Systems; `src/lib/pages.ts` `services/business-systems` |
| Payments and integrations | Data handoffs and external service connections | Proposed connective wording derived from the recorded integration scope | W3 internal composition; no provider is named |
| Business portals and operating systems | Custom applications, client and staff portals, operational dashboards, workflow systems, and automation | Repository scope record | `src/lib/content.ts` Business Systems; `src/lib/pages.ts` `services/business-systems` |
| Continuity | Maintenance, monitoring, support, and ongoing improvement | Repository scope record | `src/lib/content.ts`, `src/lib/pages.ts`, and `src/lib/selector.ts` |
| Continuity | Integration upkeep and system continuity around delivered scope | Proposed internal wording | W3 structural principle; exact terms require approval |

No named payment provider, client count, transaction volume, revenue improvement, conversion rate, delivery time, uptime, response time, certification, partnership, price, or service-level agreement is claimed.

## Proposed internal copy disclosures

The arrival line, “Every exchange depends on the systems beneath it.”, is proposed internal copy rather than an approved Atlas master line and is labelled as such on the page.

Catalogue, checkout, ordering, customer-account, data-handoff, external-connection, integration-upkeep, and continuity wording is restrained structural copy pending owner confirmation. Each service pathway prints its evidence state and source. The continuity section explicitly states that the review creates no package, service level, response time, uptime, price, or support-term promise.

## Components

W3 reuses `AtlasScene`, `ResponsivePicture`, `SceneFallback`, `ReducedMotionScene`, `DistrictMarker`, `PrimaryNavigation`, `MobileNavigation`, `AtlasRouteIndicator`, `SkipJourneyLink`, `ResponsibilitySummary`, `EvidenceList`, and `CaseStudyLink`.

It implements the approved `ServicePathway` and `CapabilityGroup` primitives. District-specific orchestration uses `CommerceDistrictReview`, `CommerceArrival`, `ExchangeFlow`, `CommercePathways`, `ConnectedCommerceSystem`, and `CommerceContinuity`. The page remains server-rendered except for the existing shared mobile navigation; no W3 client component or animation library was added.

## Candidate assets

| Asset | Role | Status |
| --- | --- | --- |
| `ILL-0003` organised Commerce District responsive scene | Prioritised district opening | Candidate |
| `marker-03-commerce.svg` | Secondary Commerce identity | Candidate |
| `route-01-primary.svg` | Service-directory route material | Candidate |
| `tex-print-01-fine-halftone.png` | Print surface | Candidate |
| `obj-0006-market-canopy.svg` | Exchange-yard material | Candidate |
| `obj-0010-route-map.svg` | Connected-system material | Candidate |
| `obj-0014-logistics-truck.svg` | Handoff object | Candidate |
| `obj-0021-market-scale.svg` | Exchange object | Candidate |
| `sign-03-market-lane.svg` | Market wayfinding object | Candidate |

No asset was promoted. Nothing is referenced from `scenes/candidates/`, `scenes/candidates/raw-generated/`, or a deprecated loose path.

## Connected-system explanation

The system field names seven responsibilities: customer-facing experience, commerce or portal layer, payment connection where required, data record, external integration, operational handoff, and support and maintenance. The visual uses a ledger and handoff lines rather than a speculative network diagram.

The same relationship is expressed as a visible ordered list and a concise textual equivalent. The diagram therefore remains understandable to screen-reader users, on mobile, and without animation.

## Motion and reduced motion

Commerce motion is limited to finite route growth in the exchange field, service pathways, and handoff marks. It does not delay content, loop continuously, hijack scrolling, animate numbers, move cards, or introduce another motion system.

Reduced motion resolves the opening scene, six exchange responsibilities, all four pathways, the seven-part system model, continuity register, related routes, and calls to action as complete static compositions. No essential understanding depends on movement.

## Responsive decisions

Desktop uses a full-width district scene, an irregular twelve-column exchange yard, broad ledger-like service rows, and a two-column connected-system field. Tablet reduces the service rows and system field without changing reading order.

At 390 px, the authored 4:5 Commerce crop is shortened so the scene and complete headline share the first viewport. Exchange points become a clear vertical route, pathway content becomes one semantic column, and the connected system becomes a large ledger followed by a single ordered responsibility stack. Decorative route material simplifies; controls retain touch-friendly sizing.

## Accessibility

- One page `h1` is followed by section `h2` and local `h3`/`h4` headings.
- The Commerce scene has purpose-specific alternative text; district markers and CSS objects are decorative.
- Public navigation labels, Emergency Support, and Client Portal remain explicit.
- The first skip link targets the focusable service-pathway section.
- Pathway and related-route controls are native links with visible focus and touch-size treatment.
- Connected-system meaning appears in an ordered textual representation and visible prose equivalent.
- Evidence and approval states are written in text rather than communicated only through colour.
- Existing mobile-menu focus containment, Escape dismissal, and focus restoration remain intact.
- Reduced motion preserves all content and actions.

## Performance

Only the responsive Commerce opening is prioritised. No scene master or five-layer package is fetched by the static opening. All supporting objects are local SVGs under 1.2 KB each, and no new client component or third-party runtime was introduced.

Approximate responsive scene weights are 498 KB desktop, 357 KB tablet, and 346 KB mobile. The fine-halftone texture is 3.6 KB; the route, canopy, route-map, truck, scale, and sign assets total approximately 5 KB. A clean 1440 px initial-request trace loaded the desktop Commerce derivative plus these small local materials and did not request any master, layer image, W2 evidence capture, or forbidden candidate path. The candidate opening derivative remains the largest W3 asset risk.

## Evidence screenshots

- [Desktop opening](../output/playwright/atlas-commerce-w3/desktop-opening-1440x1000.png)
- [Desktop pathways](../output/playwright/atlas-commerce-w3/desktop-pathways-1440x1000.png)
- [Desktop connected system](../output/playwright/atlas-commerce-w3/desktop-connected-system-1440x1000.png)
- [Mobile opening](../output/playwright/atlas-commerce-w3/mobile-opening-390x844.png)
- [Mobile pathways](../output/playwright/atlas-commerce-w3/mobile-pathways-390x844.png)
- [Mobile connected system](../output/playwright/atlas-commerce-w3/mobile-connected-system-390x844.png)
- [Reduced-motion opening](../output/playwright/atlas-commerce-w3/reduced-motion-opening-1440x1000.png)
- [Reduced-motion pathways](../output/playwright/atlas-commerce-w3/reduced-motion-pathways-1440x1000.png)

## Checks

The complete W3 gate passed:

- `pnpm lint` — passed with no ESLint errors or warnings.
- `pnpm typecheck` — passed with no TypeScript errors.
- `pnpm test` — 9 files and 30 tests passed.
- `pnpm build` — Next.js 16.2.10 production build passed; 22 routes were generated, including the isolated Commerce route.
- `pnpm test:e2e` — 47 tests passed and 1 expected project-specific test was skipped across desktop and mobile projects.

The browser console on the Commerce review reported zero errors and zero warnings. A pre-existing W2 cold-cache assertion was made deterministic by scrolling its lazy-loaded KU Journals evidence into view before testing visibility; no W2 interface or content changed.

## Known limitations and Atlas conflicts

- The Commerce illustration remains an unapproved generated candidate. Its baked title fragment and environmental/bank-like lettering require visual and language review before any public use.
- The Atlas source registry identifies `ILL-0020 — Market and Finance Exchange` as the planned official Commerce scene, while the organised runtime asset foundation labels the available Commerce package `ILL-0003`. W3 uses only the organised typed package authorised for private review; it does not claim that the planned official illustration now exists.
- Atlas Gate A requires asset approval before implementation, while the W3 brief explicitly permits candidate art through private internal-review access. W3 follows the narrower review-only exception without promoting the scene.
- Repository service records establish current stated scope but do not prove a delivered Commerce client project, commercial availability in every configuration, or owner-approved package terms.
- The connected-system view is an explanatory model, not a system architecture, provider commitment, delivered implementation, or guarantee.
- Independent scene animation remains limited because W3 uses the flattened responsive candidate rather than loading the current five-layer package.
- All carried W1 and W2 limitations remain unresolved. W3 does not alter Arrival, Airix Food, KU Journals, or Landmark Threshold records.
- Passing checks is not visual approval.
