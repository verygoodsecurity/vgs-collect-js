# VGS Collect.js script loading module

Script loading module for VGS Collect.js

## Installation

Install package using `npm`

```
npm install @vgs/vgs-collect-js
```

## How to use

This module intended to simplify script loading. This module inserts `<script>` tag to the document head or body and returns
VGSCollect instance as the result of resolved Promise.

```javascript
import { loadVGSCollect } from '@vgs/vgs-collect-js';

const VGSCollectInstance = await loadVGSCollect('<TENANT_ID>', '<ENVIRONMENT>');
const VGSCollectForm = VGSCollectInstance.init(state => { console.log(state); });


VGSCollectForm.field({...});
VGSCollectForm.field({...});
VGSCollectForm.field({...});
```
