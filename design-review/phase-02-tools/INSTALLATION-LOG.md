# Phase 02 installation log

Date: 2026-07-13

Working directory: `/Users/hendrix/airixmedia-web`

Harness: Codex Desktop, project-local Codex skill path `.agents/skills`

## Runtime verification

| Item | Result |
| --- | --- |
| Node.js | `v26.0.0`, satisfies Impeccable minimum 22.12 |
| pnpm | `11.12.0` |
| npm | `11.12.1` |
| Operating system | macOS 15.7.7, build 24G720, x86_64 |
| Codex environment | Codex Desktop; `CODEX_SHELL=1`; thread `019f5666-638e-7913-98d4-dc3b2e1f2380` |
| skills CLI | `1.5.16` |

## Taste Skill

The following exact commands completed successfully and each selected one named skill:

```text
npx skills add https://github.com/Leonxlnx/taste-skill --skill "gpt-taste"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "brandkit"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-web"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"
```

Each command detected Codex, cloned `Leonxlnx/taste-skill`, reported 13 available skills, selected only the named skill, and copied it into `.agents/skills/<name>`. The CLI also emitted non-fatal npm warnings about the repository’s pnpm-specific `.npmrc` keys `node-linker` and `confirmModulesPurge`.

### Taste installer overreach

The exploratory command `npx skills add https://github.com/Leonxlnx/taste-skill --help` unexpectedly installed all 13 skills instead of displaying help. Generated `.agents` and `skills-lock.json` were archived at `/tmp/airix-phase2-accidental-all-skills-1783938434`, leaving the repository clean before the five exact installs. Forbidden skills were not retained.

## Hallmark

```text
npx skills add nutlope/hallmark
```

Result: success. One `hallmark` skill, including its references, was copied to `.agents/skills/hallmark`. It was not invoked as a designer or critic.

## Impeccable

```text
npx impeccable install
```

Selections:

- Detected harnesses only: Codex and GitHub
- Install location: project
- Design hook: yes

Result: Impeccable 3.2.1 was installed into `.agents/skills/impeccable` and `.github/skills/impeccable`, with hooks at `.codex/hooks.json` and `.github/hooks/impeccable.json`. The ignored local consent file `.impeccable/config.local.json` was also created; it contains no secret. No global harness file was modified.

The installer instructed: `Run /impeccable init in your AI harness`. Slash commands cannot be invoked from this shell execution channel, so first-run initialisation remains pending. Manual verification confirmed readable skill files, `PRODUCT.md`, `DESIGN.md`, `.impeccable/live/config.json`, hook commands, and the Codex-specific skill reference.

Detector command:

```text
npx impeccable detect src/app src/components src/lib
```

Result: exit code 2 with two findings. This is an audit result, not an installation failure. Full output is in `IMPECCABLE-BASELINE.txt`; no finding was fixed.

## shadcn skill

```text
pnpm dlx skills add shadcn/ui
```

Result: upstream exposed two skills and installed both. The approved `.agents/skills/shadcn` skill was retained. The unapproved `.agents/skills/migrate-radix-to-base` skill was archived at `/tmp/airix-phase2-extra-shadcn-skill` and removed from `skills-lock.json`.

No `shadcn init` command was run. No `components.json`, component, registry, Radix/Base UI dependency, marketing block, Tailwind change, or package-lock change was created. The skill can provide general instructions now, but registry-aware project commands require a future approved `components.json`.

## Not installed

- Variant: external only
- GSAP
- React Three Fiber
- Three.js
- Theatre.js
- Lenis
- WebGL or shader helpers
- Video-generation packages
- Additional animation libraries

The existing `motion` dependency was untouched.
