# Compatibility

Use this reference for package installation, version selection, loader/core compatibility, CDN version selection, and upgrade questions.

## Customer-Safe Rules

- Do not claim a package or CDN version is latest unless it was verified from current public package or documentation metadata.
- Do not infer the loader package version from the Collect core version.
- For production, use an explicit pinned Collect core version.
- When troubleshooting, prefer the versions already pinned in the customer's package manager files, environment variables, and CDN script URLs.

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

## Upgrade Guidance

- Ask for the customer's current package versions, Collect core version, CDN script URL, and relevant console errors.
- Upgrade one layer at a time when possible: loader and core SDK are separate versioned surfaces.
- Keep customer examples on sandbox and placeholders unless the user provides sanitized project config.
