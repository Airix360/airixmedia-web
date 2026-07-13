# Phase 01 quality results

Date: 2026-07-13  
Starting commit: `18d27ef781ddf7146ff4d6f67b8ee9177a207a84`  
Branch: `redesign/living-lagos`  
Runtime: Node.js `v26.0.0`  
Package manager: pnpm `11.12.0`

No application code was changed before or during these checks. The results therefore describe the rejected prototype as it existed on `main` before the redesign branch was created.

## Dependency installation

| Command | Result | Relevant output | Existing before redesign? | Recommended later action |
| --- | --- | --- | --- | --- |
| `pnpm install --frozen-lockfile` | Pass | `Lockfile is up to date`; `Already up to date`; completed using pnpm 11.12.0. | Yes. The repository already used `pnpm-lock.yaml`. | Continue to use frozen-lockfile installs in verification and CI. |

## Required checks

### Lint

- Command: `pnpm lint`
- Result: **Pass**
- Relevant output:

  ```text
  $ eslint
  ```

- Existing before redesign: Yes; this is the unchanged baseline.
- Recommended later action: Keep lint mandatory after each redesign phase.

### Type checking

- Command: `pnpm typecheck`
- Result: **Pass**
- Relevant output:

  ```text
  $ tsc --noEmit
  ```

- Existing before redesign: Yes; this is the unchanged baseline.
- Recommended later action: Keep strict type checking mandatory after each redesign phase.

### Unit tests

- Command: `pnpm test`
- Result: **Pass**
- Relevant output:

  ```text
  $ vitest run
  Test Files  3 passed (3)
       Tests  6 passed (6)
    Duration  6.29s
  ```

- Existing before redesign: Yes; all baseline tests passed before any public-interface change.
- Recommended later action: Retain the six tests and add redesign-specific regression coverage without weakening existing assertions.

### Production build

- Command: `pnpm build`
- Result: **Pass**
- Relevant output:

  ```text
  $ next build
  ▲ Next.js 16.2.10 (Turbopack)
  ✓ Compiled successfully in 21.5s
  Finished TypeScript in 9.4s
  ✓ Generating static pages using 7 workers (18/18) in 1195ms
  Finalizing page optimization ...
  ```

  The build reported 18 application routes, including `/`, `/fr`, `/pt`, `/start-a-project`, pricing, support, health, robots, sitemap, and dynamic content routes.

- Existing before redesign: Yes; the production build passed from the unchanged starting commit.
- Recommended later action: Continue to require a production build and inspect route output for accidental route or review-content exposure.

### Existing end-to-end tests

- Command: `pnpm test:e2e`
- Result: **Pass**
- Relevant output:

  ```text
  $ playwright test
  Running 6 tests using 4 workers
  6 passed (51.5s)
  ```

  Chromium logged a non-fatal warning that `NO_COLOR` was ignored because `FORCE_COLOR` was set.

- Existing before redesign: Yes; desktop and mobile projects both passed against the unchanged baseline.
- Recommended later action: Retain both projects. Add screenshot, keyboard, reduced-motion, theme, and responsive checks in later approved implementation phases. The colour-environment warning may be cleaned up in test configuration but is not a product failure.

## Result summary

| Check | Result |
| --- | --- |
| Lint | Pass |
| Type check | Pass |
| Unit tests | Pass — 3 files, 6 tests |
| Production build | Pass — 18 routes generated/reported |
| End-to-end | Pass — 6 tests |

There were no existing quality-check failures to isolate. Passing checks confirm a useful engineering baseline; they do not imply visual approval.
