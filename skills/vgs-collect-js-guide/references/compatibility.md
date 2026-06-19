# Compatibility

Use this reference for package installation, version selection, loader/core compatibility, CDN version selection, and upgrade questions.

## Customer-Safe Rules

- Do not claim a package or CDN version is latest unless it was verified from current public package or documentation metadata.
- Do not infer the loader package version from the Collect core version.
- Do not infer the Collect core version from the loader package version.
- For production, use an explicit pinned Collect core version.
- When troubleshooting, prefer the versions already pinned in the customer's package manager files, environment variables, and CDN script URLs.

## Installation Shape

For package-based vanilla JavaScript integrations, install the loader package:

```bash
npm install @vgs/collect-js
```

For raw CDN integrations, no npm package is required. The customer must include a pinned Collect core script:

```html
<script src="https://js.verygoodvault.com/vgs-collect/<collect_version>/vgs-collect.js"></script>
```

## Version Source

When vanilla Collect CDN/core versions are required, check:

```txt
https://js.verygoodvault.com/versions/vgs_collect.json
```

Use `tags.stable` and the `versions` list from that endpoint as the public source for available Collect versions. Do not hardcode or claim a current version without checking the endpoint at answer time.

## Package Roles

| Layer | Customer-facing purpose | Versioning guidance |
| --- | --- | --- |
| `@vgs/collect-js` | Browser script loader that loads the Collect core SDK from the CDN. | Version separately from the Collect core SDK. It accepts a configured core SDK version. |
| Collect core SDK | Browser runtime exposed as `window.VGSCollect`. | Pin a concrete CDN/core version for production. Use the customer's existing pinned version when diagnosing behavior. |
| Raw CDN script | Direct browser script tag without the loader package. | Use `https://js.verygoodvault.com/vgs-collect/<collect_version>/vgs-collect.js` with a verified version. |

## Version Selection

- Use `<collect_version>` as a placeholder in examples unless the customer provided a verified target version.
- If the customer asks which exact version to install or pin, verify the current package/CDN version first.
- If verification is unavailable, explain the rule: pin a concrete production version and confirm the target version from VGS docs, package metadata, the public versions endpoint, or the customer's existing project config.
- For vanilla JavaScript apps, choose either the loader package or the raw CDN script path.
- The loader package can load a configured Collect core version; production examples should pass `version: '<collect_version>'` instead of relying on loader defaults.

## Load Path Compatibility

- Use the loader path when the app already has a bundler, package manager, or framework-agnostic module setup.
- Use the raw CDN path when the app cannot install npm packages or already manages browser scripts directly.
- Use only one load path on a page unless the customer has a deliberate script-loading strategy.
- If `window.VGSCollect` already exists, `loadVGSCollect(...)` resolves with that runtime and initializes the convenience `init(...)` wrapper with the supplied vault, environment, and log-level config.
- If Content Security Policy is in scope, include the VGS script and connection domains required by the customer's selected environment and route setup.

## Upgrade Guidance

- Ask for the customer's current package versions, Collect core version, CDN script URL, and relevant console errors.
- Upgrade one layer at a time when possible: loader and core SDK are separate versioned surfaces.
- For loader-path changes, verify `@vgs/collect-js` package metadata and the configured `version` passed to `loadVGSCollect(...)`.
- For raw CDN changes, verify the script URL and the public versions endpoint.
- Keep customer examples on sandbox and placeholders unless the user provides sanitized project config.
