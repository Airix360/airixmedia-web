# R3 route consolidation manifest

Version: 2.3.0.0  
Baseline: `670d609d6ab50a8dac043007582d30ac218abaad`

The public English sitemap is reduced from 44 canonical routes to 16. Redirects are permanent (308 in Next.js), destination anchors are owned by the retained page, and removed routes do not appear in `sitemap.xml`. Query-string form states are interaction states whose canonical remains `/contact`.

| Former route | Destination | Status | Anchor/query | Reason | Canonical | Sitemap | Artwork disposition |
|---|---|---:|---|---|---|---|---|
| `/atlas` | `/studio#atlas` | 308 | `atlas` | Atlas is a substantial Studio section | removed | removed | Atlas pair is a Studio section visual |
| `/discuss` | `/contact?form=project` | 308 | `form=project` | Shared purpose-specific dialog | removed | removed | Discuss pair is retained on Contact |
| `/book` | `/contact?form=book` | 308 | `form=book` | Shared purpose-specific dialog | removed | removed | Book pair is retained on Contact |
| `/services/digital-experiences` | `/services#digital-experiences` | 308 | `digital-experiences` | One complete Services page | removed | removed | Section visual |
| `/services/business-systems` | `/services#business-systems` | 308 | `business-systems` | One complete Services page | removed | removed | Section visual |
| `/services/managed-infrastructure` | `/services#managed-infrastructure` | 308 | `managed-infrastructure` | One complete Services page | removed | removed | Section visual |
| `/services/support-recovery` | `/services#support-recovery` | 308 | `support-recovery` | One complete Services page | removed | removed | Section visual |
| `/publishing/ojs` | `/publishing#ojs` | 308 | `ojs` | One complete Publishing page | removed | removed | Preserved; section/asset register |
| `/publishing/pricing` | `/publishing#pricing` | 308 | `pricing` | Pricing belongs in Publishing | removed | removed | Preserved; section/asset register |
| `/publishing/universities` | `/publishing#universities` | 308 | `universities` | Institutional offer belongs in Publishing | removed | removed | Preserved internally pending accuracy review |
| `/publishing/journal-platforms` | `/publishing#journal-platforms` | 308 | `journal-platforms` | Platform offer belongs in Publishing | removed | removed | Preserved internally pending rights review |
| `/publishing/hosting-support` | `/publishing#hosting-support` | 308 | `hosting-support` | Hosting belongs in Publishing | removed | removed | No dedicated pair |
| `/publishing/editorial-support` | `/publishing#editorial-support` | 308 | `editorial-support` | Editorial support belongs in Publishing | removed | removed | No dedicated pair |
| `/publishing/plugins` | `/publishing#plugins` | 308 | `plugins` | Themes and plugins belong in Publishing | removed | removed | No dedicated pair |
| `/publishing/projects` | `/publishing#projects` | 308 | `projects` | Work summary links to Work | removed | removed | No dedicated pair |
| `/publishing/resources` | `/publishing#resources` | 308 | `resources` | Resources belong in Publishing | removed | removed | No dedicated pair |
| `/open-source/paystack-ojs` | `/open-source#paystack-ojs` | 308 | `paystack-ojs` | One verified catalogue | removed | removed | Catalogue uses the Open Source page pair |
| `/open-source/ojs-magic-login` | `/open-source#ojs-magic-login` | 308 | `ojs-magic-login` | One verified catalogue | removed | removed | Catalogue uses the Open Source page pair |
| `/open-source/submission-fee` | `/open-source#submission-fee` | 308 | `submission-fee` | One verified catalogue | removed | removed | Catalogue uses the Open Source page pair |
| `/open-source/multipay` | `/open-source#multipay` | 308 | `multipay` | One verified catalogue | removed | removed | Catalogue uses the Open Source page pair |
| `/open-source/request-waiver` | `/open-source#request-waiver` | 308 | `request-waiver` | One verified catalogue | removed | removed | Catalogue uses the Open Source page pair |
| `/knowledge-base` | `/support#guides` | 308 | `guides` | No decorative or empty knowledge base | removed | removed | Support page visual |
| `/service-levels` | `/support#service-levels` | 308 | `service-levels` | Agreement-specific guidance belongs on Support | removed | removed | Support page visual |
| `/status` | `/support` | 308 | — | No verified public status feed | removed | removed | None; future dedicated service possible |
| `/cookies` | `/legal#cookies` | 308 | `cookies` | Legal-centre section | removed | removed | None |
| `/accessibility` | `/legal#accessibility` | 308 | `accessibility` | Legal-centre section | removed | removed | None |
| `/acceptable-use` | `/legal#acceptable-use` | 308 | `acceptable-use` | Legal-centre section | removed | removed | None |
| `/work/ku-journals` | `/work#publishing` | 308 | `publishing` | Supportable publishing proof belongs in Work | removed | removed | Work page visual |
| `/insights` | `/support#guides` | 308 | `guides` | Placeholder content removed | removed | removed | Preserved internally, not forced public |
| `/resources` | `/support#guides` | 308 | `guides` | Placeholder content removed | removed | removed | Preserved internally, not forced public |

## Retained canonical routes

`/`, `/studio`, `/work`, `/services`, `/publishing`, `/open-source`, `/contact`, `/support`, `/support/emergency`, `/legal`, `/privacy`, `/terms`, `/service-terms`, `/security`, `/data-processing`, `/subprocessors`.

Private owner-review routes remain noindex, disallowed by robots, unlinked, and absent from the sitemap.
