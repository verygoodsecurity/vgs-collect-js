---
name: vgs-collect-js-guide
description: Help VGS customers integrate the public VGS Collect JavaScript SDK through @vgs/collect-js or a direct CDN script. Use when users ask to load Collect.js in vanilla JavaScript, use loadVGSCollect, configure window.VGSCollect, create secure fields without React, submit/tokenize VGS Collect forms, choose public Collect CDN versions, or troubleshoot customer-facing non-React Collect integrations.
metadata:
  author: verygoodsecurity
  version: '1.0.0'
---

# VGS Collect JS Guide

Use this skill for public customer integration guidance for vanilla JavaScript, `@vgs/collect-js`, and direct Collect.js CDN script usage only. Keep answers and bundled references limited to public JavaScript APIs, public CDN usage, examples, and troubleshooting.

## Route First

1. Read `references/javascript.md` for loader setup, direct CDN setup, public form/field APIs, submit/tokenize usage, and examples.
2. Read `references/compatibility.md` when the answer mentions package installation, Collect core version selection, CDN version selection, or upgrade questions.
3. Use examples only as copy-paste starting points:
   - `examples/js-loader/index.js`
   - `examples/js-cdn/index.html`

Do not load or answer with React wrapper patterns unless the user explicitly asks for React. If they need `@vgs/collect-js-react`, `VGSCollectSession`, `VGSCollectForm`, React hooks, or React components, use a React wrapper Collect guide instead.

## Version Freshness

When the customer's installed package, CDN script, or requested target version is newer than the versions verified in this skill's references, do not answer from stale bundled guidance alone.

1. Read `references/compatibility.md`.
2. Check `https://js.verygoodvault.com/versions/vgs_collect.json` when the answer needs public vanilla Collect CDN/core versions.
3. Inspect the customer's current `package.json`, lockfile, CDN URL, and provided code before making version-specific claims.
4. If current evidence is still unavailable, label the version-specific claim as unverified and ask the customer to confirm it from VGS documentation, public package metadata, or the versions endpoint.
5. If this skill was installed through `skills.sh`, tell the user they can refresh the local skill with `npx skills check` and `npx skills update <skill-name>` or `npx skills update`.
6. Do not silently edit or reinstall this skill unless the user explicitly asks for that update.

## Customer Safety Rules

- Preserve public API names exactly as documented for customer integrations.
- If a claim cannot be verified from public package metadata, VGS documentation, the public versions endpoint, or the customer's provided project files, say what must be confirmed instead of inventing an answer.
- Never ask customers to put PAN, CVC, SSN, passwords, OAuth tokens, client secrets, production route IDs, or production CNAME details in browser code, logs, screenshots, examples, or prompts.
- Keep sensitive values in placeholders such as `<vault_id>`, `<route_id>`, `<collect_version>`, and `<access_token_from_backend>`.
