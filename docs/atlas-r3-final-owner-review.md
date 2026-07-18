# Atlas R3 final owner review

Review date: 18 July 2026  
Branch: `build/atlas-artwork-completion-r3`  
Review base: `4594c6f08b34c36b77096ea39a21667b67499851`  
Public sitemap reviewed: 16 routes  
Recommendation: **do not merge for production or launch yet**

> Remediation status — 18 July 2026: the four implementation-level interface defects (Dark trust contrast, expanded mobile-navigation clipping, 200% header reflow and Dark sticky-header Emergency-link contrast) have been corrected on `fix/atlas-r3-launch-interface-blockers`. See `docs/atlas-r3-interface-remediation.md`. The corrections remain subject to final owner re-review and do not change this review's original issue counts or launch recommendation.

> Post-remediation addendum — 18 July 2026: owner re-review at `7c56134b5d28603cde88fdab5cc964092efe2ec6` confirms the four interface blockers are closed by commits `77b5c7c`, `cd5c393` and `7c56134`. Active launch blockers are now limited to live form delivery, monitored emergency escalation, qualified legal approval and artwork cultural, rights and landmark clearance. The original findings and P0–P3 counts below remain historically accurate for their review date; the current classification is recorded in `docs/atlas-r3-post-remediation-owner-review.md`.

## Executive summary

The consolidated site is technically coherent, distinctive and substantially easier to review than the former 44-route structure. The public sitemap, canonicals, 30 consolidation redirects, navigation, anchor destinations, contact preselection, active day/night artwork, responsive page layouts and core accessibility mechanics are working. The homepage communicates the invisible-systems proposition and the Build. Run. Rescue. operating model. Studio, Services, Publishing and Open Source now behave as focused destinations rather than route collections.

The site is not launch-ready. Six P1 issues remain: no live form provider, no operational emergency escalation, unresolved legal and privacy fields, a dark-theme contrast failure, mobile-navigation and 200% zoom clipping, and public artwork without completed cultural, rights or landmark review. These are factual launch blockers, not design preferences. No P0 issue was found because live collection and deployment remain disabled.

Issue count: **P0 0 · P1 6 · P2 3 · P3 3**.

## Launch recommendation

Keep this branch unmerged and undeployed. Create a separate remediation change for the three interface regressions, complete provider and emergency routing, obtain qualified legal approval, and close the recorded artwork reviews. After those changes, regenerate this evidence set and rerun all gates. Do not expand the sitemap.

## Audit health snapshot

| Dimension | Score | Key finding |
|---|---:|---|
| Accessibility | 2/4 | Light routes pass automated WCAG checks; dark trust content and 200% reflow do not |
| Performance | 4/4 | WebP runtime assets, one active adaptive hero and no failed images in the reviewed routes |
| Theming | 3/4 | Light, Dark and Auto switch correctly; one dark section has invalid contrast |
| Responsive design | 2/4 | Canonical pages avoid horizontal overflow, but expanded mobile navigation and 200% zoom clip controls |
| Anti-patterns | 3/4 | The Atlas art direction is recognisable; repeated numbering and gateway treatment remain formulaic |
| **Total** | **14/20** | **Good, with specific launch blockers** |

Anti-pattern verdict: **pass**. The site does not read as a generic technology template. It has a coherent Atlas world, specific Nigerian infrastructure imagery, restrained colour and a consistent editorial voice. The remaining repeated section numbers and universal gateway are visible patterns, not a reason to redesign approved pages.

## P0 issues

None found. Live form collection, merge, deployment and DNS changes are not active, so the unresolved provider and privacy fields have not yet created a production data-loss or collection event.

## P1 issues

### P1-01: Public forms cannot deliver an enquiry

All six forms validate, but every valid request returns HTTP 503 `provider_not_configured`. `CONTACT_SUBMISSION_PROVIDER` has no supported adapter. This blocks the primary conversion path. See `docs/contact-production-readiness-r3.md`.

### P1-02: Emergency Support has no monitored escalation

The emergency journey is visually and verbally distinct, but it posts to the same unavailable endpoint as ordinary enquiries. It creates no incident, ticket, alert, call, text or on-call notification. A genuine emergency could be delayed after a visitor completes a long form.

### P1-03: Public legal and privacy content is unresolved

The pages have dates and versions, but controller identity, legal entity, registered address, jurisdiction, lawful basis, retention, processors, transfers, governing law, liability, DPA terms and provider register remain unresolved. Public copy explicitly calls some material a draft or future field. Status: `requires-legal-review`.

### P1-04: Dark homepage trust section fails WCAG AA contrast

Automated WCAG 2 AA analysis found one serious `color-contrast` violation covering the trust-section kicker, heading, paragraph and Studio link. The light theme passes. This requires a separate implementation correction; no style was changed during this review.

### P1-05: Mobile navigation and 200% zoom clip essential controls

At 390×844, the expanded menu's Support link begins outside the left edge and the Dark label/theme utility extends beyond the right edge. At 200% zoom, the desktop header remains in its wide layout and loses right-side controls. Canonical pages have no horizontal overflow when the menu is closed, but these interaction states fail reflow and mobile usability.

### P1-06: Public artwork still lacks required human clearance

Wave 2 service, support and emergency artwork remains pending cultural, rights and launch review. Studio and Open Source heroes remain pending rights review. Atlas, Discuss and Contact placements retain landmark or location verification; Contact also retains rights review. Owner direction and technical integration do not establish launch approval.

## P2 issues

### P2-01: Homepage proof coverage is narrower than the proposition

The homepage explains Airix, the operating model, service areas, publishing proof and contact action. It does not explicitly present open-source activity, and selected work is represented by one KU Journals evidence record. Add no new route, but before public promotion decide whether a concise, evidence-backed open-source reference and broader selected-work cue belong on the homepage.

### P2-02: Several contact forms require information a valid visitor may not have

Project requires an existing system; Publishing requires a journal URL, OJS version, hosting arrangement and launch date; Consultation requires an existing platform and review material; Support requires error details. New projects and nontechnical visitors may have no valid answer. Field counts are high: Project 11 required, Publishing 12, Consultation 10, Support 11 and Emergency 10. Review whether these can be optional or accept “not applicable / unknown” without weakening qualification.

### P2-03: Publishing Resources is an empty promise

The section says useful guidance will be published when real, but exposes no resource. It behaves like “coming soon” content even though that phrase is absent. Remove the section before promotion or publish a maintained, verified resource; do not invent one.

## P3 issues

### P3-01: The gateway repeats on every marketing route

“Where shall we build next?” appears on the homepage plus Studio, Work, Services, Publishing, Open Source, Contact, Support and Emergency. It is a consistent conversion device, but it reduces route-specific endings. Optional only.

### P3-02: Services duplicates its numbering grammar

Each service section renders a section number and an eyebrow that already begins with the same number. The page remains understandable, but the duplicate markers add visual scaffolding without information.

### P3-03: Services remains a long, evenly weighted page

The four anchors are distinct, alternate composition and use correct art, but each receives nearly equal visual weight. The result still approaches four page-length chapters stacked together. This is a refinement, not a launch blocker.

## Route-by-route review

| Route | Decision | Review |
|---|---|---|
| `/` | Conditional pass | Clear identity, audience, invisible-systems proposition, Build. Run. Rescue., service areas, publishing proof and project CTA. P2: no explicit open-source activity and narrow selected-work proof. P1: dark trust contrast. |
| `/studio` | Conditional pass | Successfully combines studio identity, Airix 360 brand relationship, Atlas philosophy, working principles and long-term ownership. `/studio#atlas` exists and the redirect lands correctly. Atlas artwork requires landmark verification. |
| `/work` | Pass with human review | Claim-safe proof language and no unsupported outcomes detected. Artwork is technically sound. Final owner/client permission remains a human publication decision. |
| `/services` | Conditional pass | Four anchors exist, section copy is specific, artwork supports each practice and CTA preselection is correct. P3: long, evenly weighted sequence and duplicate numbering. Wave 2 art reviews remain open. |
| `/publishing` | Conditional pass | Complete and readable overview, OJS, hosting/support, editorial, themes/plugins, university/platform, pricing, work and enquiry path. All seven approved price lines match exactly. P2: Resources is empty. |
| `/open-source` | Pass | Functions as one catalogue. All five public GitHub repositories and issue links resolve, status is “Public repository”, compatibility is stated only where present in the typed record, and external links use a new tab with `noreferrer`. Rights review remains for the hero. |
| `/contact` | Fail for production | Six choices are understandable, dialogs are accessible and direct query/preselection works. No false success is shown. P1: provider unavailable. P2: field burden. |
| `/support` | Conditional pass | Entry point, evidence to provide, agreement-specific service levels, security reporting and emergency handoff are clear. P1: no ticket provider. P2: Guides contains no actual guide. |
| `/support/emergency` | Fail for production | Urgency, billing warning, secrets warning and scope boundary are clear. P1: no monitored delivery or escalation. |
| `/legal` | `requires-legal-review` | Useful directory with effective date, cookie/local-storage, accessibility and acceptable-use anchors. Entity, jurisdiction and final legal approval remain unresolved. |
| `/privacy` | `requires-legal-review` | Not launch-ready for live collection. Controller, address, jurisdiction, basis, processors, transfers, retention, deletion and verified rights contact are unresolved. |
| `/terms` | `requires-legal-review` | Website/enquiry and intellectual-property boundaries are understandable. Liability, governing law and jurisdiction remain counsel-review fields. |
| `/service-terms` | `requires-legal-review` | Covers the right contract subjects but intentionally leaves warranties, indemnity, liability, law and disputes unresolved. |
| `/security` | Conditional pass, `requires-legal-review` | Avoids invented certifications, uptime and recovery claims. The private reporting contact is an email, and form/ticket routing is not operational. Confirm incident language and contact ownership. |
| `/data-processing` | `requires-legal-review` | A framework only. Roles, instructions, measures, transfers, deletion, audit and notification require a signed project schedule. |
| `/subprocessors` | `requires-legal-review` | Intentionally avoids invented providers, but the register is empty. It must be completed when production form, CRM, mail, calendar, storage or abuse-control providers are chosen. |

## Contact readiness

- Six contact cards: pass for labelling and differentiation.
- Direct query links: pass.
- Service preselection: pass for all four service anchors.
- Dialog focus, Escape and validation: pass in the existing browser suite.
- Mobile dialog width: pass at 390×844.
- False success prevention: pass.
- Production submission: fail, HTTP 503.
- Provider: missing.
- Attachments: metadata validated; bytes discarded.
- Booking: request only; no availability or event creation.
- Support: no ticket creation.
- Emergency: no operational escalation.
- Spam protection: same-origin plus honeypot only; no rate limit or approved challenge.

## Legal readiness

Every legal page has an effective date of 18 July 2026 and version 2.3.0.0. Dates do not make the text approved. Seven routes remain `requires-legal-review`. The most urgent dependency is completing Privacy, Data Processing and Subprocessors before any live collection provider is enabled.

## Artwork readiness

- Runtime files: 40 WebP files; no PNG/JPEG masters in `public/atlas/heroes/`.
- Runtime hashes: recorded in `output/playwright/atlas-r3-final-review/runtime-artwork-hash-report.json` and unchanged from the review base.
- Adaptive switching and perceptual day/night pairs: technically pass through the R2/R3 scripts and tests.
- Remaining public landmark/location reviews: 3 placements (Atlas, Discuss, Contact).
- Additional archived campus-accuracy review: 1 pair (Universities).
- Remaining public cultural reviews: 8 placements (Discuss, Book and six Wave 2 placements).
- Remaining public rights reviews: 9 placements (six Wave 2 placements, Contact, Studio and Open Source).
- Additional archived rights review: 1 pair (Journal Platforms).
- Launch approval: not established by owner direction or technical integration.

## Redirect, sitemap and canonical readiness

- Thirty consolidation redirects: pass, permanent 308, single hop, no loops.
- Fragment targets: pass.
- Contact query destinations: pass and auto-open the correct dialog.
- Existing query strings: preserved in the audit.
- Removed routes in sitemap: none.
- Sitemap: exactly 16 approved URLs.
- Canonicals: pass on all 16 routes; contact form query states canonicalise to `/contact`.
- Internal broken links: 32 unique links checked, zero broken.

## Mobile and accessibility readiness

Closed-page layouts at 768×1024, 390×844 and 360×800 show no horizontal overflow across all 16 routes. Mobile hero crops retain the main subject and copy. Dialogs fit the 390px viewport. Reduced-motion media matching is active.

Accessibility is not ready because the dark trust section has a serious contrast failure, the expanded mobile navigation clips controls and the 200% zoom state loses header controls. The automated light-theme scan found no WCAG A/AA violations on the 16 retained routes, but automated results do not replace keyboard and assistive-technology review.

## Content and claim audit

Rendered public content contains no Lorem Ipsum, TODO, FIXME, “placeholder”, `example.com`, “coming soon”, owner-approval strip, internal-review language, “Draft structure awaiting legal review”, accidental state names or internal route links. No failed rendered image or console/page error was detected. No repeated main paragraphs were found. The repeated gateway and footer headings are deliberate shared components.

The homepage and route copy make no unsupported metrics, certification, uptime, response-time or outcome claim. KU Journals is described only through the public interface and visible footer credit. Airix 360 is presented at brand level while legal entity language remains unresolved.

## Open Source verification

The five catalogue destinations were checked directly on GitHub on 18 July 2026:

- `https://github.com/thathman/PaystackOJS`
- `https://github.com/thathman/ojs-magic-login`
- `https://github.com/thathman/submissionFee-OJS`
- `https://github.com/thathman/ojs-multipay`
- `https://github.com/thathman/ojs-request-waiver`

All five are public and reachable. No missing version or documentation was invented.

## Evidence register

Fresh evidence is under `output/playwright/atlas-r3-final-review/`. It includes Light, Dark and Auto homepage captures; 1440×1000 route captures; 768×1024 Services; 390×844 and 360×800 homepage captures; every contact dialog; mobile navigation; transparent and sticky header states; footer; 200% zoom; reduced motion; redirect, canonical, sitemap, anchor, navigation, dialog, form, legal, placeholder, link, console, accessibility, responsive, secrets, source-PNG and runtime-hash reports.

## Outstanding human reviews

1. Qualified counsel: entity, privacy, terms, service terms, security, DPA and subprocessors.
2. Operations owner: CRM, notifications, support queue, emergency rota and fallback.
3. Security/privacy owner: provider region, secrets, rate limiting, logging, upload scanning and retention.
4. Landmark/location reviewers: Atlas, Discuss and Contact; Universities if the archived pair is reconsidered.
5. Cultural reviewers: Discuss, Book and the six Wave 2 scenes.
6. Rights reviewers: Contact, Studio, Open Source and the six Wave 2 scenes; Journal Platforms if reconsidered.
7. Owner: final launch approval after all P1 evidence is closed.

## Exact recommended next action

Open one separate remediation branch from the final review commit. Fix only the dark trust contrast, mobile menu utility layout and 200% header reflow; configure and test the chosen provider and emergency route in a separate integration change; complete legal and artwork approvals; then regenerate this review package and rerun every gate. Do not merge or deploy the present branch.
