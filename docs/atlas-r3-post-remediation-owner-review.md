# Atlas R3 post-remediation owner review

Review date: 18 July 2026
Source review commit: `1adc7e110766cc5bc6db59509b6073fefc0f5ea4`
Review base: `7c56134b5d28603cde88fdab5cc964092efe2ec6`
Branch: `fix/atlas-r3-launch-interface-blockers`
Remediation commits: `77b5c7c376bb8cf7dd7b13aa0e2677ba93876a77`, `cd5c393ad1d8511b3d403565640acbc02f72d8b6`, `7c56134b5d28603cde88fdab5cc964092efe2ec6`
Version: `2.3.1.0`

## Executive summary

The four implementation-level interface blockers from the original R3 review are closed. The homepage trust section is compliant in Light, Dark and Auto; the Emergency link is compliant in transparent, sticky and mobile states; the expanded mobile navigation remains fully in bounds at every required viewport; and the header reflows into its accessible menu state through 200% zoom without overlap or horizontal overflow.

The site is still **not ready to merge for production or launch**. Four P1 categories remain: live form delivery, monitored emergency escalation, qualified legal approval and artwork cultural, rights and landmark clearance. No new P0 or P1 defect was found. The issue count is now **P0 0 · P1 4 · P2 3 · P3 3**.

The approved 16-route architecture, navigation, 30 redirects, sitemap, canonicals, public content, pricing, artwork files and artwork assignments remain unchanged. This review does not merge, deploy or change DNS.

## Closed interface findings

| Former finding | Post-remediation result |
|---|---|
| Dark homepage trust contrast | Closed. Dark main text is 10.46:1, Dark paragraph is 8.67:1 and Light text is 10.05:1. Axe reports no serious or critical violation. |
| Expanded mobile navigation clipping | Closed. Support, Emergency, Client Portal, theme and close controls remain visible and in bounds at 320×568, 360×800, 375×667, 390×844, 412×915 and 844×390 landscape. Scroll lock and focus return pass. |
| Header reflow at 200% zoom | Closed. The responsive menu is available at 125%, 150%, 175% and 200%; controls do not overlap and transparent/sticky states remain usable in Light, Dark and Auto. |
| Dark sticky Emergency-link contrast | Closed. Dark sticky is 5.27:1, Light sticky 5.75:1, both transparent states 18.82:1 and Dark mobile 5.36:1. Hover, active and focus-visible retain non-colour distinction. |

## Remaining launch blockers

### P1-01: Live form delivery

All six dialogs open correctly, validate honestly, support direct query states and retain the approved service preselection. A valid submission returns HTTP 503 with `provider_not_configured`; no success is shown. No supported production provider, durable accepted-submission record or delivery verification exists.

### P1-02: Monitored emergency escalation

Emergency Support remains visually distinct and clearly scoped, but the request reaches the same unavailable endpoint as other enquiries. It creates no ticket, incident, email, SMS, call, page or on-call notification. It must not be treated as a monitored response channel.

### P1-03: Qualified legal approval

All seven legal routes remain `requires-legal-review`. Entity, controller, jurisdiction, lawful-basis, retention, processor, transfer, liability, governing-law, data-processing and subprocessor details remain intentionally unresolved or subject to signed schedules and provider selection.

### P1-04: Artwork clearance

Technical integration, responsive crops, adaptive switching and runtime delivery pass, but technical or owner-direction approval does not establish cultural accuracy, landmark accuracy, rights clearance or launch approval. Three public landmark/location placements, eight public cultural placements and nine public rights placements remain open. The archived Universities campus pair and Journal Platforms pair retain their separate archived review requirements.

## Updated issue classification

- P0: 0.
- P1: 4 — form delivery, emergency escalation, legal approval and artwork clearance.
- P2: 3 — homepage proof breadth, form field burden and Publishing Resources readiness.
- P3: 3 — repeated gateway, duplicate Services numbering and the long evenly weighted Services sequence.

## Route-by-route decision summary

| Route | Decision | Post-remediation review |
|---|---|---|
| `/` | Conditional pass | Interface defects closed. Proposition, Build. Run. Rescue., publishing proof and project CTA remain intact. P2 proof breadth remains. |
| `/studio` | Conditional pass | Content and Atlas anchor pass; artwork still requires landmark/human clearance. |
| `/work` | Pass with human review | Claim-safe presentation remains intact; final client permission remains a publication decision. |
| `/services` | Conditional pass | Four anchors and service preselection pass. Wave 2 artwork review and existing P3 presentation refinements remain. |
| `/publishing` | Conditional pass | Offer, OJS, pricing and enquiry journey remain correct. Publishing Resources remains P2. |
| `/open-source` | Conditional pass | Five verified public repositories remain correctly presented; hero rights clearance remains open. |
| `/contact` | Fail for production | Six accessible dialogs, queries, validation and service preselection pass; live delivery is unavailable. |
| `/support` | Conditional pass | Support guidance and emergency handoff pass; no operational ticket provider exists. |
| `/support/emergency` | Fail for production | Visual urgency and scope pass; no monitored delivery or escalation exists. |
| `/legal` | `requires-legal-review` | Directory remains accurate; final entity, jurisdiction and counsel approval remain unresolved. |
| `/privacy` | `requires-legal-review` | Controller, basis, provider, transfer, retention and rights details remain unresolved. |
| `/terms` | `requires-legal-review` | Liability, governing law and jurisdiction remain counsel-review fields. |
| `/service-terms` | `requires-legal-review` | Warranties, indemnity, liability, law and disputes remain agreement/counsel fields. |
| `/security` | `requires-legal-review` | No invented certification or service-level claims; incident language and operational contact ownership remain to be approved. |
| `/data-processing` | `requires-legal-review` | The DPA remains a framework requiring a signed project-specific schedule. |
| `/subprocessors` | `requires-legal-review` | The register remains intentionally empty pending production-provider selection. |

## Form, booking, upload and abuse readiness

- Dialogs: all six pass opening, local validation and accessible labelling.
- Query parameters and browser state: pass.
- Service preselection: pass.
- Valid submission: explicit non-success, HTTP 503 `provider_not_configured`.
- Booking: request-only; no availability lookup, reservation or calendar event.
- Uploads: declared metadata is validated, but file bytes are not stored or delivered.
- Spam protection: same-origin validation and honeypot only; no rate limit, challenge, reputation or duplicate control.
- False success: none.

## Emergency readiness

The emergency route remains visually distinct, uses direct language and links from Support correctly. It is not operationally ready: there is no ticket or incident creation, delivery acknowledgement, monitored rota, notification fan-out or tested fallback. Keep this as P1 until a monitored end-to-end escalation is proven.

## Legal readiness

Seven routes remain `requires-legal-review`: `/legal`, `/privacy`, `/terms`, `/service-terms`, `/security`, `/data-processing` and `/subprocessors`. Their unresolved conditions remain accurately represented. Qualified counsel must approve the production text and the actual provider/entity details before live collection or launch.

## Artwork readiness

All 40 runtime WebPs match the source-review hashes and no PNG/JPEG masters are present in `public/atlas/heroes/`. Artwork assignments are unchanged. Open reviews remain: three public landmark/location placements, eight public cultural placements and nine public rights placements, plus one archived campus-accuracy pair and one archived rights-review pair.

## Redirect, sitemap and canonical readiness

- Redirects: all 30 exact permanent 308 destinations pass.
- Sitemap: exactly 16 approved public routes; no removed or internal route appears.
- Canonicals: all 16 routes pass; query-state forms canonicalise to `/contact` through existing coverage.
- Broken internal links: none in the fresh audit.
- Public architecture and navigation: unchanged.

## Mobile and accessibility readiness

The mobile directory passes at all six required viewport states, including landscape. Controls remain visible, scroll locking is limited to the open overlay, Escape returns focus and reduced motion removes the theme-thumb transition. Zoom-equivalent layouts pass from 100% through 200% in Light, Dark and Auto. The focused Axe audit reports zero serious or critical violations in Light and Dark.

## Evidence

Fresh evidence is stored under `output/playwright/atlas-r3-post-remediation-review/`. It contains the required trust, Emergency, mobile-menu and zoom screenshots plus contrast, Axe, overflow, reduced-motion, redirect, sitemap, canonical, console, form, legal and runtime-artwork reports. The original final-review and interface-remediation evidence directories remain part of the historical record and are not included in this new package.

## Exact next action

Implement and test the production form provider and a separately monitored emergency-escalation path on an authorised integration branch. In parallel, obtain qualified legal approval and close the outstanding cultural, rights and landmark reviews. Only after those four P1 categories have evidence-backed closure should the owner run one final launch review and decide whether to merge and deploy.
