# GitHub Contributor Guidance

## Scope

These instructions apply to files under `.github/` and to repository changes that affect public documentation, examples, or committed `skills/` artifacts.

## Public Documentation

- Keep `README.md` focused on customers integrating the package and using public API. Do not add internal implementation details, agent workflow notes, private security triage details, or repo-maintenance process there.
- Treat `skills/` as public customer integration guidance. Keep committed skill routers, references, and examples accurate against the current source, package metadata, README, and examples.
- When public API, documented behavior, supported environments, compatibility ranges, or package versions change, update the relevant public skill router, references, and examples in the same change.
- Back public skill API and version claims with current repo evidence. If a claim cannot be verified, label it as `HYPOTHESIS` and add a TODO instead of presenting it as fact.

## Security

- Keep examples on sandbox and placeholders unless a sanitized customer project already supplies different values.
- Never put PAN, CVC, SSN, passwords, OAuth tokens, client secrets, production route IDs, production vault IDs, production CNAME details, or bearer tokens in browser examples, screenshots, logs, prompts, or committed skill references.
- Prefer public integration guidance that preserves VGS Collect secure iframe boundaries.

## Validation Expectations

Before finalizing `.github` changes, confirm:

- Contributor instructions and `README.md` were checked for required updates, with README changes limited to customer-facing public API and integration content.
- Public `skills/` were checked for required updates when public API, versions, compatibility, setup, examples, or documented behavior changed.
- Required validation was run, or the blocker was reported.
