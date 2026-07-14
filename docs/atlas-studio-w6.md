# Atlas Studio W6

## Scope boundary

W6 adds a private, no-index Studio review at `/internal/atlas-studio`. It introduces the approved Edo identity for Studio, company, process, principles, branding, and design without changing the public `/company` route, homepage, navigation destinations, or any other public page. The route uses candidate artwork behind explicit `internal-review` access, identifies proposed copy, and is blocked from indexing by route metadata and the existing `/internal/` robots rule.

## Experience

Studio is an inhabited working compound rather than a generic About page. The opening places the work itself at the centre: creative direction, design, technology, operations, and long-term support share one table. The journey moves through five working disciplines, a five-stage process, five principles, a three-part collaboration model, related public routes, and the existing Discuss a Project entry point.

The Edo interpretation uses contemporary masonry, shaded thresholds, restrained red-earth colour, timber, paper, material samples, visible making, and review. It avoids team-card theatre, employee counts, named staff, invented offices, awards, certifications, client totals, partnerships, and years-in-business claims.

## Content sources and disclosures

The working disciplines and principles are derived from `src/lib/content.ts`, `src/lib/pages.ts`, `PRODUCT.md`, `ACCESSIBILITY.md`, and the Atlas creative source. “The work stays connected.”, the exact five-stage sequence, the compound metaphor, and connective copy are proposed W6 language awaiting owner approval. “Boutique practice with senior oversight” reflects repository positioning; it does not state a team size or named leadership structure.

No page statement proves a particular client outcome, universal delivery method, partnership, location, or staffing level. Automation is framed as support for accountable human service, not autonomous decision-making.

## Components and state orientation

`StudioReview` composes `StudioArrival`, `WorkingCompound`, `StudioProcess`, `StudioPrinciples`, `CollaborationModel`, and `StudioReviewStatus`. It reuses the W0–W5 runtime, responsive scene primitive, primary/mobile navigation, route indicator, skip link, and reduced-motion handling. `AtlasStateMarker` keeps the public route name explicit while adding “Edo State / Studio District” as contextual orientation and a direct return to `/atlas`. `StateTransition` suggests the wider multi-state world without turning it into a tourism map or prescribing future state layouts.

## Candidate artwork

`ILL-0050` is a generated private-review candidate, not a verified Airix office or evidence of team size. Desktop and mobile masters were generated separately. Runtime requests use 1440×811, 1024×768, and 960×1200 WebP derivatives; the source PNG masters are retained for review but never loaded on entry. The typed registry records Edo state, candidate status, focal points, safe zones, meaningful alternative text, and explicit access gating.

## Motion and reduced motion

Studio movement is finite and measured: placement, alignment, review, handoff, and route progression. There is no animation library, scroll hijacking, parallax field, particle system, or continuously floating decoration. Reduced motion removes finite reveals and route drawing while retaining the complete identity, process, principles, evidence labels, links, and reading order.

## Responsive and accessibility decisions

Desktop lets the compound remain a broad environment with an anchored copy plane. The separately authored mobile composition uses a vertical workshop view and a shorter opening so state, meaning, and actions appear within the initial 390×844 frame. Process and principle records stack without removing content.

The page has semantic header/main/footer landmarks, one `h1`, ordered heading levels, a meaningful scene description, decorative marks isolated from assistive technology, visible focus, a skip link to a focusable process section, touch-safe controls, no hover-only content, textual process equivalents, written candidate/proposal labels, and complete reduced-motion content.

## Evidence screenshots

- [Desktop opening](../output/playwright/atlas-studio-w6/desktop-opening-1440x1000.png)
- [Desktop process](../output/playwright/atlas-studio-w6/desktop-process-1440x1000.png)
- [Mobile opening](../output/playwright/atlas-studio-w6/mobile-opening-390x844.png)
- [Reduced-motion opening](../output/playwright/atlas-studio-w6/reduced-motion-opening-1440x1000.png)

## Known limitations

- Artwork, composition, anatomy, small tools, prototype geometry, and Edo cultural/architectural interpretation remain unapproved.
- The compound is fictional and does not depict a real Airix facility, staff, or location.
- Exact process, responsibilities, specialists, support, and maintenance terms remain engagement-specific.
- Passing automated checks is not visual, cultural, content, or owner approval.
- All carried W1–W5 limitations remain unresolved.
