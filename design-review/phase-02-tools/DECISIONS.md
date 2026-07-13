# Phase 02 decisions

## Approved and implemented

1. Skills are project-scoped under `.agents/skills` rather than installed into personal Codex configuration.
2. Taste installation is limited to `gpt-taste`, `redesign-existing-projects`, `brandkit`, `imagegen-frontend-web`, and `image-to-code`.
3. Hallmark is an independent critic and cannot lead the initial concept.
4. Impeccable is a refinement and detection tool, not the source of the Living Lagos direction.
5. shadcn is an assistant skill only; no component runtime, registry, or `components.json` exists.
6. Variant is external reference exploration only and is not installed.
7. The existing Motion dependency remains unchanged; no animation or WebGL package was added.
8. Living Lagos brief decisions override conflicting legacy visual details in the rejected prototype and its old `DESIGN.md`; neither file was silently rewritten in this tools-only phase.
9. Project intensity targets are documented as design variance 8/10, motion intensity 8/10, and visual density 7/10. They are not injected into third-party skill files.

## Installer exceptions handled

- `npx skills add <Taste source> --help` unexpectedly installed all 13 Taste skills because the CLI treated `--help` as an install invocation. The whole generated set and lockfile were moved outside the repository, then the five approved skills were installed individually with exact `--skill` names. No forbidden Taste skill remains.
- `pnpm dlx skills add shadcn/ui` installed both `shadcn` and `migrate-radix-to-base`. The unapproved migration skill and its lock entry were removed. Only `shadcn` remains.

## Pending decisions

- Whether to keep both project-local Impeccable harness copies long-term or reduce to Codex-only in a later maintenance phase.
- Whether shadcn should ever be initialised and which primitive base should be chosen. This requires a future functional-journey phase and owner approval.
- Which tool will lead the first breadth-first concept phase. Phase 2 does not make that decision by implementation.
