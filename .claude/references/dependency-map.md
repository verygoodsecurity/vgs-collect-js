# vgs-collect-js Dependency Map

## Project Structure

Single-package Node.js/TypeScript library (`@vgs/collect-js`) that provides a
script loading module for VGS Collect.js. Built and tested with `tsdx`.

- `src/` -- Library source (entry point, utils, constants, side effects)
- `test/` -- Unit tests (load, parseVersion, validation)
- `types/` -- TypeScript type declarations
- `dist/` -- Build output (CJS + ESM)

## Dependency Categories

### Always Low Risk (Auto-merge Candidates)

| Pattern | Example | Reason |
|---------|---------|--------|
| Type definition packages | `@types/uuid` | Compile-time only, no runtime impact |
| Babel presets (dev) | `@babel/preset-env` | Build-time transpilation only |
| TypeScript helper lib (dev) | `tslib` | Bundled at build time, minor bumps are safe |
| CI actions | `actions/checkout` | CI-only, no runtime impact |
| Lint/format tooling | `husky` | Pre-commit hooks only, no runtime impact |

### Needs Quick Review

| Pattern | Example | Reason | Expected Test Coverage |
|---------|---------|--------|----------------------|
| Polyfill library (minor/patch) | `core-js` patch/minor | Runtime dep but polyfills are additive | Unit tests cover core loading behavior |
| UUID library (patch) | `uuid` patch | Runtime dep, stable API | Unit tests use UUID generation |
| TypeScript compiler (minor) | `typescript` minor | May affect type checking or build output | Build + test suite validates |
| Build toolchain (patch) | `tsdx` patch | Affects build/test pipeline | Full test suite run validates |

### Needs Deep Review

| Pattern | Example | Reason | Expected Test Coverage |
|---------|---------|--------|----------------------|
| UUID major version bump | `uuid` v8 -> v13 | Major version, potential API breaking changes | Unit tests cover UUID usage in `src/utils/` |
| TypeScript major version bump | `typescript` v4 -> v5 | May break type checking, new strictness rules | Build must succeed, all tests must pass |
| Husky major version bump | `husky` v4 -> v9 | Config format changed significantly between majors | Pre-commit hook must still work |
| Build toolchain major | `tsdx` major | Core build/test infra, can break everything | Full build + test suite |
| core-js major | `core-js` major | Runtime polyfills, removal/changes can break browser compat | Unit tests + manual browser verification |
| Dependency pinning PRs | Pin dependencies | Pins can reveal version conflicts or restrict updates | Build + test suite |
| Override changes | `qs` (via tsdx override) | Security override (`qs@6.5.3`), changes need care | Transitive, verify no regression |

## Historical Patterns (from PR analysis)

There are currently 10 open Renovate PRs, including several major version bumps
that have been open since late 2025:

- **Major bumps (high risk):** `uuid` v8->v13, `typescript` v4->v5, `husky` v4->v9, `@types/uuid` v8->v11
- **Minor/patch bumps (lower risk):** `core-js`, `tslib`, `@babel/preset-env`, `qs` override
- **CI updates:** `actions/checkout` v4->v6
- **Pinning:** One PR to pin dependencies

The backlog suggests dependency updates have not been actively triaged. Several
of the major bumps (especially `typescript` and `husky`) will likely require
config or code changes beyond a simple merge.

## Renovate Configuration

Minimal configuration -- `renovate.json` contains only the JSON schema reference
with no custom `extends`, labels, grouping, automerge rules, or package rules.
This means Renovate is running with default settings:

- No automerge enabled
- No dependency grouping
- No custom scheduling
- PRs are labeled with `renovate` by default
