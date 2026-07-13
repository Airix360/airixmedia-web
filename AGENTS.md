# AGENTS.md

These repository instructions apply to every Codex run working on the Airix Media redesign.

## Required reading

Before changing anything:

1. Read `design-review/LIVING-LAGOS-BRIEF.md`.
2. Read `design-review/REVIEW-PROTOCOL.md`.
3. Read the latest completed phase package under `design-review/`.
4. Confirm the named phase, branch, starting commit, and exclusions.

## Phase discipline

- Work only on the phase explicitly named by the owner.
- Use only the tool authorised as lead for that phase.
- One tool leads each pass; critics run only after the lead pass is complete.
- Keep each significant phase in a separate commit.
- Save screenshots, contact sheets, decisions, quality results, and summaries under `design-review/`.
- Never treat silence as approval.
- Stop at the stated phase boundary.
- Return the exact commit SHA and review artefact paths.

## Repository and infrastructure safety

- Never modify `main` during redesign work.
- Never deploy or alter Cloudflare, DNS, tunnels, the Dell server, the portal, or production infrastructure without dedicated written authorisation for that exact action.
- Never fabricate client work, testimonials, metrics, results, endorsements, or product screenshots.
- Keep Airix Labs placeholders visibly internal during review and exclude them from production output.
- Never expose visitor-facing internal approval labels, review status, or unapproved evidence.

## Visual anti-slop rules

The rejected prototype is a comparison baseline, not a style source. Do not reintroduce:

- Empty monochrome expanses
- Repeated giant headings as section grammar
- Small monospace eyebrows above every section
- Generic technical grids
- Floating feature chips or system labels
- Fake browser frames
- Five service colours
- Gradient-heavy SaaS imagery
- Excessive rounded cards or generic card mosaics
- Repeated bordered-row service lists
- Abstract technology imagery used instead of authentic proof
- Visitor-visible review or approval warnings

The approved direction is Living Lagos Creative Studio: project-led, cinematic, culturally specific, highly produced, and governed by authentic evidence. Any implementation still requires screenshots and explicit owner review.

## Tool governance

- `gpt-taste` may lead only an approved concept or implementation pass.
- Hallmark is an independent critic, never a simultaneous co-designer with `gpt-taste`.
- Impeccable refines an approved direction and runs deterministic detection; it does not originate the identity.
- shadcn is limited to accessible functional primitives after visual approval; it does not design the marketing homepage.
- Generated images are references, not client evidence.
- No design tool may publish, deploy, or modify production infrastructure.
