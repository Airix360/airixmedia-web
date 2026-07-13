# Rejected homepage baseline audit

Date: 2026-07-13  
Status: **Public-facing design rejected; no visual section is approved.**  
Evidence: unchanged application at `18d27ef`, 16 deterministic Playwright screenshots, source inspection, lint, type checking, unit tests, production build, and existing browser tests.

## What works functionally

1. **Core routing is operational.** The production build completes and reports the English, French, Portuguese, project-selector, pricing, support, health, robots, sitemap, and dynamic content routes.
2. **Theme selection works.** The header toggles `data-theme`, stores the choice in `localStorage`, and the initial layout restores the stored or system-selected appearance before page content renders. Both themes were captured successfully.
3. **Critical locale routes work.** Existing browser tests verify `/fr` and `/pt`; the header selector persists a locale cookie and routes between unprefixed English and prefixed French/Portuguese URLs.
4. **Responsive layout rules execute.** Desktop navigation becomes a mobile trigger, multi-column sections stack, and the homepage renders without horizontal clipping at 1440, 1280, 768, and 390 pixels.
5. **The project selector has a tested validation foundation.** The existing browser test confirms that advancing with missing required input exposes a validation error.
6. **The content and recommendation logic has unit coverage.** Three Vitest files containing six tests pass.
7. **Basic accessibility foundations exist.** The document includes a skip link, semantic landmarks, labelled navigation, visible focus styles, reduced-motion CSS, and labelled theme/language controls.
8. **Reusable structured data exists.** Practices, case studies, locale copy, pricing, open-source projects, and publication evidence states are represented in reusable TypeScript data.

These are engineering foundations only. Their current visual expression is not approved.

## What fails visually

### First impression and hero

The first frame reads as a monochrome B2B technology template. It is orderly but emotionally flat: no Lagos, no culture, no full-colour work, no human energy, and no unmistakable Airix point of view. The route grid, animated dotted line, and five floating system labels explain a systems metaphor but create neither curiosity nor a premium cinematic opening. At tablet and mobile widths the labels disappear, leaving a thinner version of the same composition instead of a deliberately art-directed smaller-screen experience.

### Composition, density, and rhythm

The homepage is approximately 8,873–9,556 pixels tall on desktop and 10,230 pixels tall on mobile. Large blank intervals, repeated top borders, one oversized heading followed by one list or grid, and repeated full-width monochrome bands create a predictable scroll rhythm. Content is extensive but visual information is sparse. The page feels assembled section-by-section rather than composed as one evolving narrative.

### Typography

The repeated giant sans-serif headings, compressed line-height, and small uppercase monospace labels create a familiar AI-generated startup-site dialect. Scale is used repeatedly rather than selectively. There is no serif counterpoint, no street or architectural typographic influence, and no hierarchy that distinguishes a cinematic opening, project proof, editorial expertise, and operational detail.

### Colour and appearance modes

Light mode is clinical white with black structure; dark mode is primarily the same layout with token inversion. Five small service colours appear as utility dots and route accents but do not establish a memorable brand world. Neither appearance uses the approved warm ivory, warm charcoal, single Airix accent, grain, halftone, selective glass, or full-colour project imagery. Dark mode is legible but not independently art-directed.

### Imagery and authenticity

The homepage contains no authentic project photography, interface capture, showreel footage, Lagos imagery, or credible project artefacts. “Selected Systems” displays written claims inside fabricated browser frames. The portal section uses a generic orbit diagram. The route grid and workflow dots are abstract technology imagery, not proof. This makes the work feel hypothetical even when source data exists.

### Project and service presentation

Services appear as bordered rows with coloured dots; projects appear as tabs feeding a fake browser canvas. The services therefore dominate the page structurally while the brief requires projects to carry more of the homepage. The selected case studies are marked `inferred_needs_review` and `publicApproved: false` in source data, yet their names and descriptions are displayed. The visible `OWNER APPROVAL REQUIRED` strip exposes internal review process to visitors instead of preventing unapproved material from entering the public experience.

### Navigation and footer

The desktop header is a dense row of small links with a generic text wordmark and several utilities. The primary CTA says “Start a project,” not the approved “Discuss a project.” The mobile header is functional but visually cramped and treats the smaller experience as a collapse of desktop navigation. The four-column footer is conventional and contributes little identity.

### Motion

The main motion signature is an infinitely moving dotted route line, plus a short generic transition between browser-frame case studies. The animation explains no real system state, does not reveal project craft, and has no cinematic sequencing. Reduced-motion handling exists, but the motion concept itself is not approved.

### Perceived production quality

The site is technically coherent, but the absence of authentic material and the dependence on generic interface motifs make it feel like a polished wireframe or technology template. It does not yet look expensive, surprising, culturally specific, or highly produced.

## Generic AI-design indicators

| Indicator | Baseline finding |
| --- | --- |
| Empty monochrome space | Extensive; large sections contain little visual evidence. |
| Giant headings repeated in every section | Extensive; the same heading scale and rhythm recur throughout. |
| Small monospace eyebrow text | Extensive; used for hero, model, publishing, rescue, portal, process, and selector labels. |
| Technical grids | Central to the hero and several bordered section structures. |
| Floating labels | Five system labels float over the hero route map on large screens. |
| Fake browser frames | Central device for all selected case studies. |
| Service lists as bordered rows | The five practices use this exact formula. |
| Generic animated lines | The hero’s dotted route line loops indefinitely. |
| Excessive section borders | Nearly every section begins with a horizontal border. |
| Template-like black-and-white blocks | Alternating monochrome blocks define most of the page. |
| Abstract technology imagery without real proof | Route map, workflow dots, browser canvas, and portal orbit substitute for authentic artefacts. |
| Internal review labels exposed to visitors | `SELECTED SYSTEMS UNDER REVIEW` and `OWNER APPROVAL REQUIRED` are visible in the visitor experience. |

## Major element classification

No item below is visually approved.

| Homepage element | Classification | Requirement |
| --- | --- | --- |
| Sticky header, route links, theme and locale controls | **Keep functionally** | Preserve destinations and control behaviour; rebuild the composition, hierarchy, CTA language, and mobile interaction. |
| Current wordmark treatment | **Rebuild completely** | Retain the approved logo asset as source material but art-direct its placement and opening visibility. |
| Route-grid hero, dotted animation, and five floating system labels | **Remove completely** | Replace with the approved Lagos-inspired interactive landscape and cinematic project/interface material. |
| Hero proposition and two-action routing | **Keep functionally** | Retain broad proposition and project/system destinations as content inputs; rewrite and recompose around curiosity and `Discuss a project`. |
| Internal-review proof strip | **Remove completely** | Review state belongs in internal tooling, never in the visitor experience. Unapproved records must be excluded. |
| Five-practice data and destinations | **Keep functionally** | Keep taxonomy/routes if still strategically valid; rebuild the bordered-row visual treatment and replace five service colours with one primary Airix accent. |
| Build / Run / Rescue operating model | **Keep functionally** | Retain the operating idea; rebuild the three-box monochrome presentation. |
| Selected Systems tabs and fake browser frames | **Replace with authentic media** | Use approved screenshots, footage, interface fragments, diagrams, outcomes, and project narratives. |
| Publishing proposition and workflow information | **Keep functionally** | Retain OJS expertise and workflow meaning; rebuild with credible publishing material outside the opening hero. |
| Open-source repository evidence | **Keep functionally** | Preserve verified links and names; recompose as supporting proof rather than another bordered list. |
| Rescue/support proposition | **Keep functionally** | Preserve safe emergency language and destinations; remove the generic rotated-square decoration and rebuild the section. |
| Portal capability copy | **Needs further investigation** | Verify what may be shown publicly; replace the orbit graphic with authentic, approved portal evidence or a restrained text treatment. |
| Understand / Define / Build / Stay process | **Keep functionally** | Preserve only if it supports the final narrative; rebuild the four-column bordered formula. |
| Project-selector route and recommendation flow | **Keep functionally** | Keep the qualified-brief conversion logic; rename the primary CTA to `Discuss a project` and redesign its entry point. |
| Four-column footer and contact metadata | **Keep functionally** | Preserve verified links/contact data; rebuild the conventional visual layout. |

## Baseline conclusion

The rejected prototype provides reliable routing, structured content, locale/theme handling, forms, and passing checks. Its public design should not be incrementally polished. The visual system must be rebuilt around authentic work, a cinematic and interactive Lagos opening, stronger typographic contrast, denser project-led storytelling, and controlled evidence publication.
