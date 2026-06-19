---
name: vgs-collect-js-guide
description: Help VGS customers integrate, implement, migrate, troubleshoot, or review the public VGS Collect JavaScript SDK through @vgs/collect-js or a direct CDN script. Use when users ask to load Collect.js in vanilla JavaScript, use loadVGSCollect, configure window.VGSCollect, create secure fields without React, submit, tokenize, create aliases, use Collect Session from vanilla JavaScript, choose public Collect CDN versions, or troubleshoot customer-facing non-React Collect integrations.
metadata:
  author: verygoodsecurity
  version: '1.0.0'
---

# VGS Collect JS Guide

Use this skill for public customer integration guidance for vanilla JavaScript, `@vgs/collect-js`, and direct Collect.js CDN script usage only. Keep answers and bundled references limited to public JavaScript APIs, public CDN usage, examples, and troubleshooting.

## Route First

1. Read `references/javascript.md` for loader setup, direct CDN setup, public form/field APIs, submit/tokenize usage, and examples.
2. Read `references/compatibility.md` when the answer mentions package installation, Collect core version selection, CDN version selection, or upgrade questions.
3. Use `examples/js-loader/index.js` only when the selected flow uses the `@vgs/collect-js` loader path.
4. Use `examples/js-cdn/index.html` only when the selected flow uses the raw CDN script path.

Do not load or answer with React wrapper patterns unless the user explicitly asks for React. If they need `@vgs/collect-js-react`, `VGSCollectSession`, `VGSCollectForm`, React hooks, or React components, use a React wrapper Collect guide instead.

## Task Routing

Choose one primary task mode before answering. The primary mode controls the shape of the output.

- `integrate`: first-time vanilla JavaScript setup. Choose one load path, load Collect core before creating fields, and wire the requested submit flow.
- `implement`: add or change customer app behavior. Generate code with explicit validation, error handling, and placeholders for secrets, identifiers, endpoints, and environment values the user has not supplied.
- `migrate`: move between loader, raw CDN, or Collect core versions, or replace direct CDN setup with `@vgs/collect-js`. Compare current and target versions separately for `@vgs/collect-js` and Collect core.
- `troubleshoot`: localize the failure before changing code. Prefer package state, CDN URL, loader configuration, console errors, network errors, sanitized logs, or a minimal repro.
- `review`: review code against public JavaScript APIs, selected load path, version evidence, security rules, compatibility, and missing tests. Flag private, deprecated, insecure, or version-incompatible behavior.

## Use-Case Routing

CMP create-card is the primary default, not the only supported use case. First identify the customer's requested load path and submission family, then generate guidance for that flow.

Default to the `@vgs/collect-js` loader path for new vanilla JavaScript examples unless the customer asks for a raw CDN script, already has `window.VGSCollect`, or needs to avoid package installation.

Default to a Card Management Platform create-card integration only when the customer asks for a vanilla JavaScript card form, card entry, add-card, save-card, or payment-method setup and does not name another submission family. Use:

- `loadVGSCollect({ vaultId, environment, version })` followed by `collect.session(...)`, or `VGSCollect.session(...)` for raw CDN script integrations.
- `formId` for the Collect Session form configured for CMP.
- `authHandler` that fetches a short-lived access token from the customer's backend.
- Secure card fields created with `cardholderNameField`, `cardNumberField`, `cardExpirationDateField`, and `cardCVCField`.
- Required card validations for card number, expiration date, and security code.
- `form.on('getCardAttributesSuccess', ...)` / `form.on('getCardAttributesError', ...)` when BIN/card-attributes events are useful.
- `form.createCard(...)` with customer-safe cardholder metadata and success/error callbacks.

Use the requested flow instead when the customer asks for direct CDN script tags, existing `window.VGSCollect`, CMP update-card, proxy submission, vault alias creation, tokenization, custom headers, custom serialization, CNAME, masking, field replacement, non-card fields, file upload, or UI-only field wiring.

## Clarifying Questions

Ask only when the missing information materially changes the recommendation:

- target flow: CMP create-card, CMP update-card, proxy submit, vault aliases, tokenization, Collect Session, or UI-only wiring
- load path: `@vgs/collect-js`, raw CDN script, or app-provided `window.VGSCollect`
- installed `@vgs/collect-js` package version or Collect core/CDN version when behavior is version-sensitive
- target surface: `collect.session(...)`, `VGSCollect.session(...)`, `collect.init(...)`, or `VGSCollect.create(...)`
- relevant sanitized error, console output, network status, package manifest, lockfile, CDN URL, or code snippet for troubleshooting

## Version And Evidence Policy

Treat the loader package and Collect core as separate versioned surfaces. Do not infer one from another.

When the customer's installed package, CDN script, or requested target version is newer than the versions verified in this skill's references, do not answer from stale bundled guidance alone.

1. Read `references/compatibility.md`.
2. Check `https://js.verygoodvault.com/versions/vgs_collect.json` when the answer needs public vanilla Collect CDN/core versions.
3. Inspect the customer's current `package.json`, lockfile, CDN URL, and provided code before making version-specific claims.
4. If current evidence is still unavailable, label the version-specific claim as unverified and ask the customer to confirm it from VGS documentation, public package metadata, or the versions endpoint.
5. If this skill was installed through `skills.sh`, tell the user they can refresh the local skill with `npx skills check` and `npx skills update <skill-name>` or `npx skills update`.
6. Do not silently edit or reinstall this skill unless the user explicitly asks for that update.

For version-sensitive answers, state the evidence basis briefly, for example:

- `Using @vgs/collect-js 0.8.0 from package.json; Collect core version was not provided.`
- `Detected Collect core version <collect_version> from the CDN script URL.`
- `Could not determine installed loader or Collect core versions; using bundled guidance and marking version-specific claims unverified.`

Retrieve additional evidence only when the task needs exact API signatures, version-specific behavior, concrete error detail, or integration examples. Prefer customer project files first, then public package metadata, README/examples, the public versions endpoint, and official VGS documentation.

## Customer Safety Rules

- Preserve public API names exactly as implemented.
- If a claim cannot be verified from public package metadata, VGS documentation, the public versions endpoint, or the customer's provided project files, say what must be confirmed instead of inventing an answer.
- Never ask customers to put PAN, CVC, SSN, passwords, OAuth tokens, client secrets, production route IDs, or production CNAME details in browser code, logs, screenshots, examples, or prompts.
- Keep sensitive values in placeholders such as `<vault_id>`, `<route_id>`, `<collect_version>`, and `<access_token_from_backend>`.
