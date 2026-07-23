# W7.1 Multi-State Recognition Audit

Status: complete for internal review; owner and cultural approval pending. Date: 2026-07-14. Public routes, public homepage, navigation meaning, forms, integrations and deployment are unchanged.

## Test method

Each of the nine W6/W7 candidate scenes was inspected in desktop, mobile and reduced-motion states, then re-inspected with navigation, state marker, review strip, candidate badge and hero copy visually suppressed through the private `?state-audit=hidden-labels` mode. Layout and accessible semantics remain present. A scene passes only when geography, participating infrastructure, human activity and material language identify the state family without a written state name. Generated text, anatomy, transport geometry, cultural sensitivity and crop survival were also checked.

Research anchors: Benin City’s radial/monocentric morphology and Ring Road civic centre; Kaduna railway and engineering compounds; Jos Plateau’s layered highland topography; Abeokuta’s granite outcrops and confirmed rail connection. These are compositional references, not claims that the fictional scenes reproduce real places.

## Scene outcomes

| State / route | Original ID and result | Geographic anchor | Infrastructure anchor | Activity anchor | Material anchor | Desktop / mobile hidden-label | Correction / replacement | Remaining defects | Owner / cultural review | Final recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Edo / Studio | ILL-0050 · regenerate | Benin radial civic form | Court and spoke work routes | Making and prototype review | Red earth, brick, timber, paper | pass / pass | Regenerated as ILL-0051 | Small hands, tools and drawings need close review | pending / pending | Retain as candidate |
| Edo / Trust | ILL-0070 · regenerate | Benin radial civic form | Review court and archive wings | Record movement and stewardship | Brick, timber louvres, stone, paper | pass / pass | Regenerated as ILL-0071 | Small hands, carts and records need close review | pending / pending | Retain as candidate |
| Kaduna / Labs | ILL-0060 · pass | Dry-season red-earth rail yard | Rail, test and service routes | Fabrication, repair, documentation | Steel, concrete, cream, red earth | pass / pass | Retained | Illustrative rail/tool geometry | pending / pending | Retain as candidate |
| Plateau / Observatory | ILL-0090 · pass | Layered highland escarpment | Observation terraces | Mapping and comparison | Granite, timber, grass, cool haze | pass / pass | Retained | Small anatomy and map geometry | pending / pending | Retain as candidate |
| Plateau / Insights | ILL-0091 · pass | Highland editorial terrace | Evidence terraces | Notes and editorial comparison | Stone, timber, paper, muted grass | pass / pass | Retained | Small document geometry | pending / pending | Retain as candidate |
| Plateau / Resources | ILL-0092 · pass | Highland field-library shelves | Terraces and shelving | Guide and archive preparation | Stone, timber, paper, grass | pass / pass | Retained | Small resource/anatomy geometry | pending / pending | Retain as candidate |
| Ogun / Gateway | ILL-0080 · regenerate | Abeokuta-like granite outcrop | Rail, road and pavilion bend around rock | Brief arrival and route choice | Granite, steel, timber, concrete | pass / pass | Regenerated as ILL-0083 | Fictional rail and vehicle details | pending / pending | Retain as candidate |
| Ogun / Contact | ILL-0081 · regenerate | Abeokuta-like granite edge | Court receives rail/road handoff | Brief exchange and consultation | Granite wall, steel, timber, planting | pass / pass | Regenerated as ILL-0084 | Small anatomy, train and vehicle details | pending / pending | Retain as candidate |
| Ogun / Booking | ILL-0082 · regenerate | Abeokuta-like granite slope | Rooms and routes cut into terrain | Folio, sample and timing preparation | Granite, concrete, timber, paper | pass / pass | Regenerated as ILL-0085 | Abstract timetable and small anatomy | pending / pending | Retain as candidate |

## Replacement safeguards

- Edo radial geometry is contemporary civic urban-form interpretation, never palace, moat, royal, sacred or archaeological reconstruction.
- Ogun granite is an Abeokuta-informed fictional composite, deliberately not an exact Olumo Rock image and never tourism or sacred-site representation.
- Rail and road elements participate in movement and work; they are not state-themed ornaments.
- Desktop and mobile were generated independently. Focal points and safe zones are recorded in each manifest.
- No generated wording is accepted as content. Abstract paper and timetable marks are non-semantic and remain review risks.
- Every package remains `candidate`, requires explicit `internal-review` access, and has owner/cultural status `pending`.

## Recognition verdict

All nine active scenes now pass the internal hidden-label recognition test at desktop and mobile sizes. Automated tests do not establish cultural or visual approval. This is a design-governance result, not publication approval. Close inspection found no blocking anatomy, crop, rail or generated-text defect; small figures, hands, papers, tools, vehicles and rails remain explicit owner-review items.

## Accessibility findings

Playwright keyboard, responsive-asset, reduced-motion, alternative-text and public-isolation checks pass. Axe 4.11 found pre-existing private-review debt: 13 findings on Studio, 15 on Labs, and 5 each on Observatory and Gateway. These are chiefly low-contrast wayfinding labels, the shared skip link/landmark relationship, and one Labs tab-panel role. W7.1 does not conceal or treat those findings as approval; correcting them belongs in a separately verified accessibility change because this stop boundary permits only recognition-audit work.

## Performance and asset weights

The production Lighthouse sample for private Studio scored Performance 84, Accessibility 95, Best Practices 100 and SEO 69, with 4.4 s LCP and 543 KiB transferred. The SEO score reflects intentional private/no-index behavior. Active scene WebPs total 4,605,904 bytes: desktop 1,844,294; tablet 1,200,118; mobile 1,360,510; thumbnails 200,982. No source PNG is requested at runtime. The 18 active source masters total 52,911,056 bytes (50.46 MiB) and are flagged for archive or Git LFS review before any public-integration decision.
