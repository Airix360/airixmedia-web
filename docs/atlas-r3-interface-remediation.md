# Atlas R3 interface remediation

Date: 18 July 2026
Source review commit: `1adc7e110766cc5bc6db59509b6073fefc0f5ea4`
Starting remediation commit: `77b5c7c376bb8cf7dd7b13aa0e2677ba93876a77`
Branch: `fix/atlas-r3-launch-interface-blockers`
Version: `2.3.1.0`

## Scope

This branch corrects the three implementation-level interface blockers recorded in the final R3 owner review and the subsequently authorised Dark sticky-header Emergency-link contrast defect. It does not address form delivery, monitored emergency routing, legal approval, artwork clearance, field burden, Publishing Resources, repeated gateways or Services-page length.

## Findings and corrections

### Dark homepage trust section

Root cause: the section retained its light ochre `#d6c5a5` background in Dark mode while inheriting the global cream foreground. The resulting `#eee5d3` on `#d6c5a5` measured 1.35:1.

Correction: Dark mode now uses an Atlas ink-green `#243632` section surface, cream `#f2e8d2` primary text and `#ded4c2` paragraph text. The approved composition and artwork are unchanged. The Studio link retains its underline and has an explicit three-pixel focus outline.

| Element | Before | After Dark | WCAG AA |
|---|---:|---:|---|
| Kicker, heading and Studio link | 1.35:1 | 10.46:1 | Pass |
| Paragraph | 1.35:1 | 8.67:1 | Pass |
| Light-mode trust text | 10.05:1 | 10.05:1 | Pass; unchanged |

### Expanded mobile navigation

Root cause: the utility area used a centred, non-wrapping flex row. Its combined Support, Emergency, Client Portal and labelled theme-control width exceeded the available 350px content area at 390px, pushing Support left of zero and the theme control beyond the right edge.

Correction: the overlay now owns its border-box width, respects safe-area insets and uses a three-column utility grid below 700px with the theme control on a full-width second row. Long labels can wrap, the close control remains in bounds, and the menu locks background scrolling while open. A dedicated mobile Emergency class avoids the desktop breakpoint’s intentional hiding rule.

Verified without horizontal overflow at 320×568, 360×800, 375×667, 390×844, 412×915 and 844×390 landscape. A 125% root text-size check also remains in bounds. Support, Emergency, Client Portal, the theme switch and close control all remain reachable.

### Header reflow at zoom

Root cause: the header responded only to the outer viewport media query. The final-review element-level zoom simulation enlarged the wide desktop header without giving its descendants an effective responsive boundary.

Correction: the header is now an inline-size CSS container. Its navigation descendants switch to the existing menu layout at the same 1280px threshold, without JavaScript viewport measurement or a new navigation architecture.

The review used layout-equivalent CSS widths for a physical 1440px viewport: 1152px at 125%, 960px at 150%, 823px at 175% and 720px at 200%. Every state exposes the menu and theme control, has no control overlap, has no horizontal overflow and remains usable after the transparent-to-sticky transition. The ordinary 1440px/100% layout retains the desktop navigation.

### Dark sticky-header Emergency link

Root cause: the Light-mode brick red `#953e29` was reused against the Dark sticky surface `#1a1916`, producing 2.51:1 at 12.16px/650 weight. The text does not qualify as large text and therefore requires 4.5:1.

Correction: only Dark solid-header and Dark mobile-menu states use Atlas terracotta `#d86f4a`. Transparent hero headers remain white, and Light sticky headers retain `#953e29`. The link now carries a permanent underline, a thicker hover/focus underline, a three-pixel focus outline, a double active underline and an explicit forced-colours treatment. No animation was added.

| State | Foreground | Reference background | Ratio | Result |
|---|---|---|---:|---|
| Light transparent | `#ffffff` | `#14110d` overlay reference | 18.82:1 | Pass |
| Light sticky | `#953e29` | `#f2e8d2` | 5.75:1 | Pass |
| Dark transparent | `#ffffff` | `#14110d` overlay reference | 18.82:1 | Pass |
| Dark sticky | `#d86f4a` | `#1a1916` | 5.27:1 | Pass |
| Auto Light sticky | `#953e29` | `#f2e8d2` | 5.75:1 | Pass |
| Auto Dark sticky | `#d86f4a` | `#1a1916` | 5.27:1 | Pass |
| Dark mobile menu | `#d86f4a` | `#191714` | 5.36:1 | Pass |

Hover, focus-visible and active states retain the same compliant foreground. Forced-colours mode maps the link to the system LinkText colour and preserves a double underline.

## Files changed

- `package.json`
- `src/app/health/route.ts`
- `src/components/atlas-public/PublicHeader.tsx`
- `src/components/atlas-public/atlas-public.module.css`
- `tests/atlas-r3-interface-remediation.spec.ts`
- `docs/atlas-r3-interface-remediation.md`
- `docs/atlas-r3-final-owner-review.md` — status note only
- `output/playwright/atlas-r3-interface-remediation/` — dedicated evidence only

## Accessibility and interaction results

- Focused Axe WCAG A/AA scan: zero violations in Light and Dark.
- Keyboard traversal reaches every primary link, all three utility links and the theme switch.
- Escape closes the directory and restores focus to the menu trigger.
- Background scroll lock is active only while the menu is open.
- Reduced motion matches and the theme thumb transition resolves to `0s`.
- Forced-colours mode preserves system colour and non-colour Emergency distinction.
- No horizontal overflow was detected in the tested navigation or zoom states.

## Integrity results

- Sitemap: 16 approved URLs, unchanged.
- Redirects: all 30 remain exact permanent 308 destinations.
- Canonicals: all 16 retained routes pass.
- Internal broken links: none.
- Browser console/page errors: none in the retained-route audit.
- Secrets scan: no probable committed secret values detected.
- Runtime artwork: 40 WebPs, hashes unchanged from the source review commit.
- Source-PNG audit: no PNG/JPEG masters in `public/atlas/heroes/`.

Evidence is stored under `output/playwright/atlas-r3-interface-remediation/`. The original `output/playwright/atlas-r3-final-review/` evidence was not overwritten.

## Known limitations and next review

These corrections close the recorded interface implementation defects only. Production form delivery, monitored emergency routing, qualified legal approval and the outstanding landmark, cultural and rights reviews remain launch blockers. The branch must return to final owner review before any merge or deployment decision.
