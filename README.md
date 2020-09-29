
<p align="center">
  <a href="https://www.verygoodsecurity.com/" rel="nofollow">
    <img src="https://avatars0.githubusercontent.com/u/17788525" width="128" alt="VGS Logo">
  </a>
  <h3 align="center">VGS Collect.js</h3>

  <p align="center">
    Script loading module for VGS Collect.js
    <br />
    <a href="https://www.verygoodsecurity.com/docs/vgs-collect/js/overview"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/verygoodsecurity/vgs-collect-js/issues">Report Bug</a>
    ·
    <a href="https://github.com/verygoodsecurity/vgs-collect-js/issues">Request Feature</a>
  </p>
</p>

## Installation

Install package using `npm`

```
npm install @vgs/vgs-collect-js
```

## Built with

* [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [tsdx template](https://github.com/formium/tsdx)

## How to use

This module intended to simplify script loading. Imported function inserts `<script>` tag to the document head or body and returns the VGSCollect instance as the result of resolved Promise. The script won't be loaded until `loadVGSCollect()` invoked. In order to speed up cross-doamin loading, `dns-prefetch` and `preconnect` were added as a side effect.

```javascript
import { loadVGSCollect } from '@vgs/vgs-collect-js';

const VGSCollectInstance = await loadVGSCollect({
  vaultId: '<vault_id>', // required
  environment: 'sandbox',
  varsion: '2.0'
});

const VGSCollectForm = VGSCollectInstance.init(state => { console.log(state); });

VGSCollectForm.field({...});
VGSCollectForm.field({...});
VGSCollectForm.field({...});
```

| Property    | Type   | Description                                                                                                                                                                           | Default     |
|-------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| vaultId     | string | Every vault has a unique vault id - it’s a string value beginning with the prefix tnt                                                                                                 | required    |
| environment | string | Vault environment. Can be `sandbox`, `live`, or one with a specified data region (e.g `live-eu-1`).                                                                                   | `'sandbox'` |
| version     | string | You can specify library version being loaded. Version must be >= 2.0. Please check our [Changelog](https://www.verygoodsecurity.com/docs/vgs-collect/js/changelog) for more details.  | `'2.0'`     |