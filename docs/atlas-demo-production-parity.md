# Atlas demo production parity

Verified: 23 July 2026

Demo: `https://demo.airixmedia.com`

Candidate version: `2.4.1.0`

Candidate branch: `fix/atlas-r3-homepage-production-parity`

## Deployment state

- The complete candidate source was built on the Dell host using Next.js standalone output.
- The demo runs as one persistent production-mode Node.js instance behind the existing Cloudflare Tunnel.
- The application and tunnel services are active.
- The secure runtime environment contains the required Brevo contact-delivery and emergency-routing configuration.
- The production site, production DNS, tunnel configuration and public release tag were not changed.

## Live public-route verification

All 16 sitemap routes returned HTTP 200 and passed desktop Light, desktop Dark and 390-pixel mobile checks.

| Route | Public page identity | Adaptive artwork |
|---|---|---|
| `/` | Homepage | Day and night |
| `/studio` | Studio | Day and night |
| `/work` | Work | Day and night |
| `/services` | Services | Day and night |
| `/publishing` | Publishing | Day and night |
| `/open-source` | Open Source | Day and night |
| `/contact` | Contact | Day and night |
| `/support` | Support | Day and night |
| `/support/emergency` | Emergency Support | Day and night |
| `/legal` | Legal hub | Not applicable |
| `/privacy` | Privacy | Not applicable |
| `/terms` | Terms | Not applicable |
| `/service-terms` | Service Terms | Not applicable |
| `/security` | Security | Not applicable |
| `/data-processing` | Data Processing | Not applicable |
| `/subprocessors` | Subprocessors | Not applicable |

The browser audit also confirmed:

- Emergency Support is not the landing page and appears only at `/support/emergency`.
- Each artwork route changes from its `*-day.webp` asset to its `*-night.webp` asset.
- The mobile menu is available and no tested route has horizontal overflow.
- No public route links to an internal review page.
- No owner-approval or draft-review metadata leaks into public content.
- The homepage uses the approved full-viewport hero, centered desktop navigation, mobile hamburger navigation and trust-mark presentation.
- The CSP permits Cloudflare Web Analytics' official script and collection endpoints.

## Evidence

- `output/playwright/atlas-home-navigation-cleanup/demo-production-parity-1440x1000.png`
- `output/playwright/atlas-home-navigation-cleanup/demo-production-parity-mobile-390x844.png`
