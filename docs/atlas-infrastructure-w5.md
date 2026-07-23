# Atlas Infrastructure W5

## Scope boundary

W5 is a private, no-index Infrastructure District review at `/internal/atlas-infrastructure`. It demonstrates a night civic-utility arrival, seven operating layers, six infrastructure capability groups, a continuity and service-category model, a variable recovery route, an integration-transit model, explicit responsibility boundaries, and direct access to the existing public Emergency Recovery route.

It does not alter or link from the public homepage, Services, Support, or Emergency Recovery pages; it does not create a public Infrastructure route; and it does not begin W6. Metadata sets `noindex`, `nofollow`, `noarchive`, and `nosnippet`; the existing robots policy disallows `/internal/`; every candidate asset requires explicit `internal-review` access.

## District interpretation

Infrastructure is shown as an exposed civic utility rather than a generic cloud-product dashboard: night operations, rain, visible routes, handoffs, monitoring, repair, and calm technical responsibility. The opening keeps candidate artwork dominant, then moves beneath the public surface through a cutaway, capability records, an operating window, a repair sequence, and an integration transit line.

The composition uses charcoal, paper cream, transit yellow, restrained lagoon blue, technical linework, and existing Atlas typography. It is deliberately distinct from Knowledge's editorial courtyard and Commerce's exchange yard. There are no glowing server racks, floating cloud icons, fake monitoring metrics, invented status dashboards, provider logos, security badges, infinite pulse animations, or guaranteed operational claims.

## Capability groups and sources

Repository records establish stated scope only. They do not prove a particular delivery, universal system design, provider relationship, security control, service term, or outcome.

| Capability group | Wording represented | Status | Verification source |
| --- | --- | --- | --- |
| Hosting and operating environments | Managed hosting; cloud and VPS administration; domains, DNS, business and transactional email; server administration | Repository scope record | `src/lib/content.ts` Managed Infrastructure; `src/lib/pages.ts` `services/managed-infrastructure` |
| Monitoring, maintenance, and continuity | Monitoring, updates, maintenance, backups, technical review, improvement, continuity planning | Repository scope record; commitments withheld | `src/lib/content.ts` Managed Infrastructure and Support and Recovery; `src/lib/pages.ts` `support` and `services/support-recovery`; `docs/DEPLOYMENT.md` prototype health check |
| Security and recovery | Hardening, controlled access, backup-led recovery, malware recovery, audit and remediation, compromise response | Repository scope record; controls and feasibility require scoping | `src/lib/content.ts` Security hardening and Malware recovery; `src/lib/pages.ts` `security` and `services/support-recovery` |
| Integrations and automation | APIs, workflow automation, data handoffs, email, payments, external-service coordination | Repository scope record | `src/lib/content.ts` Business Systems; `src/lib/pages.ts` `services/business-systems` and `services/managed-infrastructure` |
| Migration and rescue | Platform and data migration, failed-project rescue, emergency recovery, upgrade planning, troubleshooting, handover | Repository scope record | `src/lib/content.ts` Data migration and Failed-project rescue; `src/lib/pages.ts` `services/support-recovery` and `support/emergency` |
| Support and ownership | Technical support, troubleshooting, maintenance, documentation, improvement, continuity, provider coordination | Repository scope record; package terms unavailable | `src/lib/pages.ts` `support`, `service-levels`, and `services/managed-infrastructure`; `docs/CONTENT_GAPS.md` |

No uptime percentage, monitoring interval, incident count, backup frequency or retention, response or recovery time, public availability window, 24/7 commitment, guaranteed outcome, SOC 2 or ISO 27001 certification, penetration-testing or forensic service, or AWS, Azure, Cloudflare, or other provider partnership is claimed.

## Operating-layer model

`OperatingLayers` exposes seven dependencies: public experience; application or platform; data and files; integrations and handoffs; domains, DNS, and email; hosting and server environment; and monitoring, backups, and support. This is a structural review model, not a universal architecture. Providers, environments, access, controls, and contractual terms remain project-specific.

The control is an accessible tab list with roving focus, Arrow, Home, and End keyboard behaviour, one labelled panel, and a complete visible ordered textual equivalent. The cutaway uses the organised Third Mainland Bridge object as an infrastructural metaphor; it does not claim that a client system or Airix facility occupies that place.

## Continuity and service-level summary

`SupportContinuity` makes the operating pattern visible as Observe, Maintain, Recover. It states that no live monitoring is connected to the prototype. `ServiceLevelSummary` names five useful service categories—Monitored, Maintained, Backed up, Reviewed, and Supported—while leaving every interval, inclusion, frequency, retention, restoration, cadence, response, and escalation term as “Defined during project scoping.”

The model therefore communicates the dimensions an agreement must cover without fabricating an active SLA. The status-ready label is decorative candidate material, not a live operational signal.

## Recovery route

`RecoveryRoute` presents six variable stages: Report and detect, Stabilise, Assess, Restore or repair, Verify, and Document and improve. The ordered sequence is proposed structural copy. Actual actions depend on the affected system, evidence, access, providers, available backups, diagnosis, and confirmed scope; the model promises neither timing nor outcome.

The route uses an accessible tab list with roving focus, Arrow, Home, and End keyboard behaviour, one labelled panel, and a complete visible ordered textual equivalent. Reduced motion removes finite route-drawing animation while preserving every stage and action.

## Integration transit

`IntegrationTransit` traces seven handoffs: website or portal; application or platform; data store; payment or external service; email and notification; operational owner; support route. It describes automation as a dependable agreed handoff between systems and people, not an autonomous decision-maker.

All nodes are present in an ordered textual equivalent. Payments and external services are conditional; providers, credentials, failure states, ownership, and exact integrations remain scope-dependent.

## Emergency support

`EmergencySupportCTA` links directly to the existing `/support/emergency` route. The call to action asks visitors to provide the affected URL and system, what users see, when the issue began, recent changes, impact, and available access and backups—the same categories verified in `src/lib/pages.ts`.

The page preserves the public route's existing boundaries: an initial diagnostic may be chargeable; response depends on availability and the active package; an out-of-hours submission does not guarantee an immediate human response or resolution. The following remain explicitly unavailable: a public emergency response time, a public availability window, a 24/7 commitment, and a guaranteed resolution.

## Proposed internal copy disclosures

“Everything working beneath the surface.”, the seven-layer cutaway, the operating-window language, “Calm steps through an impaired system.”, the exact six-stage route, “Information reaches the next responsible place.”, and the transit arrangement are proposed internal explanatory copy. They describe the review concept and do not establish commercial terms, live service condition, universal architecture, or a delivered-project outcome.

## Components

W5 reuses `AtlasScene`, `ResponsivePicture`, `SceneFallback`, `ReducedMotionScene`, `DistrictMarker`, `PrimaryNavigation`, `MobileNavigation`, `AtlasRouteIndicator`, `SkipJourneyLink`, `CapabilityGroup`, `ServicePathway`, `ResponsibilitySummary`, `EvidenceList`, and `CaseStudyLink`.

It implements the required `SupportContinuity`, `ServiceLevelSummary`, and `EmergencySupportCTA`, plus `OperatingLayers`, `RecoveryRoute`, `IntegrationTransit`, `InfrastructureArrival`, `InfrastructureCapabilities`, `InfrastructureResponsibility`, and `InfrastructureDistrictReview`.

`ServicePathway` now accepts an Infrastructure variant. The Commerce and Knowledge variants remain unchanged. Infrastructure uses exposed technical route records rather than Commerce transaction panels or Knowledge archival folios.

## Candidate assets

| Asset | Use | Status |
| --- | --- | --- |
| `ILL-0004` organised Infrastructure responsive scene | Prioritised district opening | Candidate |
| `marker-04-infrastructure.svg` | Infrastructure identity | Candidate |
| `obj-0004-third-mainland-bridge.svg` | Operating-layer cutaway | Candidate |
| `obj-0016-streetlight.svg` and `obj-0017-telecom-mast.svg` | Utility-route material | Candidate |
| `route-02-secondary.svg` and `route-04-night.svg` | Recovery and operating-window routes | Candidate |
| `label-07-status-ready.svg`, `label-04-warning.svg`, `stamp-06-route-confirmed.svg` | Review-state utility marks | Candidate, decorative only |
| `tex-env-02-road-grit.png` and `tex-weather-01-rain.png` | Night, rain, and road surfaces | Candidate, decorative only |

No asset was promoted. Nothing is referenced from `scenes/candidates/`, `scenes/candidates/raw-generated/`, a loose-generated path, a package-wrapper duplicate, or a deprecated path.

## Motion and reduced motion

Motion is limited to finite rain, route, monitoring-line, recovery-route, and integration-line progression using CSS and the existing view-timeline approach. State changes occur only when a visitor selects a layer or recovery stage. There is no scroll hijacking, universal parallax, infinite status pulse, animated metric, spinning icon, particle system, or added animation library.

Reduced motion disables the rain and route animations. District identity, seven operating layers, six capability groups, five service categories, six recovery stages, seven integration handoffs, responsibility boundaries, emergency disclosures, related routes, and actions remain complete and in the same reading order.

## Responsive decisions

Desktop uses a full-canvas utility arrival with an anchored dark operating record, a two-column cutaway, broad technical pathway records, an operating window, recovery console, and seven-stop transit line.

At 390 px, the authored 4:5 Infrastructure crop remains dominant and the operating record becomes a contained foreground surface. Layer and recovery controls become touch-friendly horizontal indices above full-width panels; complete textual equivalents stack below. Capability records, service categories, transit nodes, responsibility evidence, and emergency details become single-column sequences without removing content.

## Accessibility

- One page `h1` is followed by section `h2` and local `h3`/`h4` headings.
- The scene has purpose-specific alternative text; marks, textures, stamps, routes, and CSS objects are decorative.
- The capability skip link moves focus to the focusable capability section.
- Layer and recovery models use labelled tabs, roving focus, directional controls, labelled panels, and full ordered textual equivalents.
- The integration route includes a complete ordered textual equivalent and visible prose summary.
- Evidence, proposal, candidate, and unavailable-term states are written as text, not carried only by colour.
- The emergency link is direct and descriptive.
- Native related-route links keep visible focus; existing mobile-menu containment, Escape dismissal, and focus restoration remain covered.
- No essential content depends on hover, animation, or decorative imagery.

## Performance

Only the responsive Infrastructure opening is prioritised: approximately 415 KB desktop, 297 KB tablet, and 278 KB mobile. The three object SVGs total approximately 4.4 KB; two route SVGs total 0.8 KB; three status marks total 1.6 KB; road grit is 5.1 KB; and rain is 14.2 KB. Small below-fold material is referenced through the organised registry and is not preloaded. No full-resolution source master, duplicate asset wrapper, third-party runtime, live monitoring SDK, or new animation library is loaded by W5. The generated candidate opening is the primary image-weight and visual-review risk; CSS background material may still be requested before its section enters the viewport, depending on browser scheduling.

## Evidence screenshots

- [Desktop opening](../output/playwright/atlas-infrastructure-w5/desktop-opening-1440x1000.png)
- [Desktop operating layers](../output/playwright/atlas-infrastructure-w5/desktop-operating-layers-1440x1000.png)
- [Desktop continuity](../output/playwright/atlas-infrastructure-w5/desktop-continuity-1440x1000.png)
- [Desktop recovery](../output/playwright/atlas-infrastructure-w5/desktop-recovery-1440x1000.png)
- [Desktop integrations](../output/playwright/atlas-infrastructure-w5/desktop-integrations-1440x1000.png)
- [Desktop emergency](../output/playwright/atlas-infrastructure-w5/desktop-emergency-1440x1000.png)
- [Mobile opening](../output/playwright/atlas-infrastructure-w5/mobile-opening-390x844.png)
- [Mobile operating layers](../output/playwright/atlas-infrastructure-w5/mobile-operating-layers-390x844.png)
- [Mobile recovery](../output/playwright/atlas-infrastructure-w5/mobile-recovery-390x844.png)
- [Mobile emergency](../output/playwright/atlas-infrastructure-w5/mobile-emergency-390x844.png)
- [Reduced-motion opening](../output/playwright/atlas-infrastructure-w5/reduced-motion-opening-1440x1000.png)
- [Reduced-motion recovery](../output/playwright/atlas-infrastructure-w5/reduced-motion-recovery-1440x1000.png)

## Checks

- `pnpm lint` — passed with no ESLint errors or warnings.
- `pnpm typecheck` — passed with no TypeScript errors.
- `pnpm test` — 11 files and 41 tests passed.
- `pnpm build` — Next.js 16.2.10 production build passed; 24 routes were generated, including the isolated Infrastructure route.
- `pnpm test:e2e` — 93 tests passed and 7 capture-project tests were intentionally skipped because evidence suites run only in their matching desktop or mobile project.

## Known limitations and Atlas conflicts

- The Infrastructure illustration remains an unapproved generated candidate. Baked district, monitoring, location, and environmental lettering requires visual, factual, and language review before public use.
- It depicts a fictional/composite Lagos utility environment, not a verified Airix facility, network, operations centre, client site, uptime state, or delivered system.
- The Atlas source registry identifies planned Infrastructure illustrations as `ILL-0040` Visible Infrastructure and `ILL-0041` Recovery in Rain, while the organised runtime package labels the available private-review scene `ILL-0004`. W5 uses only the organised typed package and does not claim the planned official assets exist.
- Atlas Gate A requires approval before implementation, while the W5 brief explicitly permits candidate artwork through private internal-review access. W5 follows the narrower review-only exception without promoting the art.
- The seven operating layers, five service categories, six recovery stages, and seven integration handoffs are structural models, not universal architecture, live service telemetry, a package, or an SLA.
- Repository scope records verify stated capabilities but do not prove delivery, availability, security controls, certification, partnership, response time, recovery time, backup viability, or outcome.
- The Cloudflare audit contains audit-time observations only. They are not surfaced as uptime, reliability, service-provider, or operations claims in W5.
- Security hardening and malware recovery are repository-recorded scope, but exact controls, access, evidence handling, restoration feasibility, and commercial terms remain project-specific. No certification, penetration test, forensic investigation, or guaranteed compromise recovery is claimed.
- Emergency Recovery is reachable, but its response time, public availability, 24/7 coverage, guaranteed resolution, and package terms remain unverified.
- All carried W1–W4 limitations remain unresolved. W5 does not edit Arrival, Landmark proof records, Commerce, Knowledge, or public routes.
- Passing checks is not visual or owner approval.
