# Atlas Arrival W1

## Scope boundary

W1 is a private, no-index vertical slice at `/internal/atlas-arrival`. It proves only the Arrival opening, initial world movement, first proposition reveal, and first systems transition. It does not replace or link from the public homepage, and it does not implement later homepage chapters or any W2 district.

The route is protected at three levels: page metadata sets `noindex`, `nofollow`, `noarchive`, and `nosnippet`; `robots.ts` disallows `/internal/`; and candidate assets require the typed `internal-review` access capability. The artwork remains a candidate and the persistent review status states that it is not approved for public use.

## Narrative sequence

1. **Wonder — monumental calm.** The illustration dominates the opening with the approved line “Every thriving city depends on invisible systems.”
2. **Movement — Lagos energy.** The same world expands into bridge, lagoon, transit, people, atmosphere, and an emerging route. “The city wakes.” is the only supporting narrative line.
3. **Discovery.** A restrained connection diagram lets roads, handoffs, and infrastructure suggest the Atlas metaphor before the approved “Invisible systems. Visible progress.” line appears.
4. **Understanding.** The direct proposition, “We build the invisible systems that allow ambitious organisations to thrive.”, arrives with explicit routes to Services, Atlas, and Discuss a Project.

Browser scrolling remains normal. A keyboard-accessible “Skip Atlas journey” link moves directly to the proposition.

## Components

W1 extends the W0 runtime instead of creating a generic hero system. It uses `AtlasScene`, `SceneLayer`, `ResponsivePicture`, `SceneFallback`, `ReducedMotionScene`, `SceneCaption`, `AtlasSignal`, `DistrictMarker`, `PrimaryNavigation`, `MobileNavigation`, `AtlasRouteIndicator`, and `SkipJourneyLink`.

W1 adds `ArrivalJourney`, `ArrivalOpening`, `ArrivalMovement`, `PropositionReveal`, `SystemsTransition`, `JourneyProgress`, and `ArrivalReviewStatus`. Only `JourneyProgress` is a new client component; the narrative sections remain server-rendered.

## Artwork and asset status

All visual material is registered as `candidate` and is requested through explicit internal-review access. W1 uses:

- `ILL-0001` Arrival District responsive scene package
- `marker-01-arrival.svg`
- `route-01-primary.svg`
- `obj-0001-atlas-signal.svg` through the W0 `AtlasSignal`
- `tex-paper-01-warm-paper.png`
- `tex-weather-02-haze.png`

The opening intentionally uses the flattened responsive scene rather than stacking the five current scene layers. Those layers reproduce baked scene lettering and create visible ghosting when offset; keeping one coherent candidate composition is more faithful than digitally correcting it. The separate bridge, ferry, danfo, and people objects were evaluated but not overlaid because they duplicate the master scene and introduce scale or landmark inconsistencies.

No asset was read from `scenes/candidates/` or `scenes/candidates/raw-generated/`, promoted, renamed, or presented as final.

## Focal points and safe zones

The typed Arrival registry records:

| View | Focal point | Safe zone |
| --- | --- | --- |
| Desktop | `52% 50%` | right |
| Tablet | `58% 48%` | right |
| Mobile | `56% 42%` | bottom |

Desktop copy sits in a lower-left paper caption while wayfinding occupies the upper-right safe area. Mobile uses the authored 4:5 crop, moves the caption to the bottom, hides the fixed journey rail, and preserves the skyline, lagoon, transit, people, and narrative order. This is a different composition rather than a scaled desktop view.

## Motion and reduced motion

The opening uses one finite, low-amplitude canvas settle. Movement uses subtle scene depth and route emergence; discovery and transition lines build in the direction of travel. No scroll hijacking, pinned sequence, bouncing action, particles, or second animation library was added.

At `prefers-reduced-motion: reduce`, the illustration, section order, route, proposition, navigation, and actions are unchanged, while all animation is replaced by fully resolved static compositions. Essential content is never gated by animation.

## Performance

Only the opening responsive image is prioritised. Tablet and mobile receive their authored variants through `<picture>`; movement imagery is lazy-loaded; decorative W0 layers are not eagerly fetched in static mode; below-the-fold route and textures use existing local assets; and no third-party runtime was added.

Approximate source weights are 380 KB desktop, 308 KB tablet, and 316 KB mobile for the responsive Arrival scene. The warm-paper texture is 344 KB and haze texture is 32 KB. The 2.7 MB master and the roughly 1 MB five-layer package are not loaded by the W1 opening. The candidate artwork remains the main performance risk and should be recompressed after visual approval rather than degraded during review.

## Accessibility

- Semantic header, navigation, main, region, figure, heading, and complementary landmarks are preserved.
- The scene has meaningful alt text; route and texture imagery is decorative and hidden from assistive technology.
- Heading order is one `h1` followed by section `h2` headings.
- Focus styles are visible, controls meet the W0 touch-size rules, and meaning is not conveyed only by colour.
- The journey skip link reaches the proposition; the mobile menu retains its focus trap, Escape dismissal, and focus restoration.
- Reduced motion preserves all meaning and actions.

Automated checks cover metadata, candidate access, responsive sources, decorative layers, reduced motion, navigation labels, keyboard flow, mobile menu focus restoration, direct proposition presence, and public homepage isolation.

## Evidence

- [Desktop opening](../output/playwright/atlas-arrival-w1/desktop-opening-1440x1000.png)
- [Desktop proposition](../output/playwright/atlas-arrival-w1/desktop-proposition-1440x1000.png)
- [Mobile opening](../output/playwright/atlas-arrival-w1/mobile-opening-390x844.png)
- [Mobile proposition](../output/playwright/atlas-arrival-w1/mobile-proposition-390x844.png)
- [Reduced-motion opening](../output/playwright/atlas-arrival-w1/reduced-motion-opening-1440x1000.png)
- [Reduced-motion proposition](../output/playwright/atlas-arrival-w1/reduced-motion-proposition-1440x1000.png)

## Checks

The final W1 gate passed:

- `pnpm lint` — passed with no ESLint errors or warnings.
- `pnpm typecheck` — passed with no TypeScript errors.
- `pnpm test` — 7 files and 20 tests passed.
- `pnpm build` — Next.js 16.2.10 production build passed; the private route was statically generated.
- `pnpm test:e2e` — 21 tests passed and 1 expected project-specific test was skipped across desktop and mobile projects.

## Known limitations

- `ILL-0001` is not an approved golden master. Generated environmental lettering in the art must be reviewed; it is artwork, not website-authored Nigerian-language copy.
- The mobile crop preserves the narrative but reduces the bridge and lagoon identity relative to desktop.
- The illustrated bridge reads as cable-stayed rather than a definitive Third Mainland Bridge depiction.
- The current flattened scene limits independent ferry, traffic, water, and people animation. The transparent layers cannot safely provide that movement until their duplicated baked lettering is corrected at source.
- Source governance still places Arrival artwork approval at a review gate. This W1 brief explicitly authorises candidate use only on a private review route; it does not resolve or bypass that approval.
- Passing checks confirms implementation quality, not visual approval.
