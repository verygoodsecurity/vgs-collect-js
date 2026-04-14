# vgs-collect-js-private Dependency Map

## Project Structure

Single-package Node.js/TypeScript library (`@vgs/collect-js`) that provides a
script loading module for VGS Collect.js. Built with `tsdx`, outputs CommonJS,
ESM, and TypeScript declarations.

- **`src/`** — Library source (entry point, utils, constants, side-effect modules
  for preConnect/preFetch)
- **`test/`** — Unit tests (load, parseVersion, validation)
- **`types/`** — TypeScript type declarations

The project has only two runtime dependencies (`core-js`, `uuid`) and a small
set of dev/build tooling.

## Dependency Categories

### Always Low Risk (Auto-merge Candidates)

| Pattern | Example | Reason |
|---------|---------|--------|
| Babel presets (devDep) | `@babel/preset-env` | Build-time only, no runtime impact |
| Type definitions (devDep) | `@types/uuid` | Compile-time only, stripped from output |
| Linting/formatting tools | `husky` | Git hooks only, no runtime impact |
| Build tooling (devDep) | `tsdx`, `tslib` | Build-time bundler, no runtime impact |
| CI action minor bumps | `actions/checkout` | CI-only, no runtime impact |
| `core-js` patch/minor | `core-js@3.x` lockfile | Polyfill patch updates, well-tested |

### Needs Quick Review

| Pattern | Example | Reason | Expected Test Coverage |
|---------|---------|--------|----------------------|
| TypeScript compiler | `typescript@^4.x → 5.x` | May surface type errors; build-only but can block CI | Build + existing tests catch regressions |
| `tslib` minor bumps | `tslib@^2.x` | Runtime helper lib used by compiled output | Unit tests cover core functionality |
| `qs` override bumps | `qs@6.x` (via tsdx override) | Pinned for security; verify override still applies | N/A (transitive) |

### Needs Deep Review

| Pattern | Example | Reason | Expected Test Coverage |
|---------|---------|--------|----------------------|
| `uuid` major version | `uuid@8.x → 13.x` | Runtime dependency, API may change, used for generating unique identifiers | Unit tests in `load.test.ts` |
| `core-js` major version | `core-js@3.x → 4.x` | Runtime polyfill, major version may drop/change polyfills affecting browser compat | Manual browser testing needed |
| `tsdx` major version | `tsdx@0.x → 1.x` | Build system, major change could alter output bundle format | Build + full test suite |
| Node.js engine version | `node@22.x` | Runtime engine for CI/build, may affect behavior | Full CI pipeline |

## Historical Patterns (from PR analysis)

There are ~10 open Renovate PRs, most created in early January 2026:

- **Major version bumps:** `uuid` v8→v13, `husky` v4→v9, `typescript` v4→v5
  (autoclosed), `@types/uuid` v8→v11, `actions/checkout` v4→v6
- **Minor/patch bumps:** `tslib`, `qs`, `core-js` lockfile, `@babel/preset-env`
- **Pinning:** A pin-dependencies PR is open
- **Node version:** `node` v22.22.2 update

The backlog suggests Renovate PRs have not been actively triaged since onboarding.

## Renovate Configuration

Minimal configuration — `renovate.json` contains only the schema reference with
no `extends`, labels, grouping, automerge rules, or package rules configured.
All defaults from Renovate apply.
