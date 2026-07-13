# Content and generation notes

## Procedural visual material

All city scenes and interfaces are generated locally from HTML, CSS and inline SVG:

- After Dark: invented route lines, paired arcs, lagoon silhouette and signal points.
- In Motion: invented word field, sun disc, wake curves, ferry polygon and generic route placard.
- Reassembled: generated paper fragments, scaffold rails, grid and halftone.
- Proof interfaces: generic Build / Run / Rescue relationships and an abstract signal curve.

No image-generation model was used. No reference image or production asset was downloaded, embedded or hotlinked.

## Claim and identity controls

- No client name appears in the concepts.
- No performance metric, testimonial, logo or outcome is invented.
- Every generated work interface is labelled **Concept interface**.
- “Airix Media” is retained as a simple text identifier; no replacement logo was proposed.
- The fonts and palettes are explicitly provisional and restricted to the design lab.

## Interaction generation

Motion uses the repository’s existing `motion` dependency and native browser APIs. Pointer position updates two local CSS properties. Scroll progress controls scene translation and scale. Intersection-based reveals run once. Reduced-motion media preferences remove transforms, animations and transitions, and expose a static proposition/action block.

## Recording method

Playwright’s existing browser video capability created silent 1280 × 800 WebM recordings. No audio track, codec package or video dependency was installed.
