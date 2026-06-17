# JavaScript Integration

Use this reference for customers integrating VGS Collect in vanilla JavaScript, framework-agnostic browser apps, or apps that want to load VGS Collect without the React wrapper.

## Contents

- Choose One Load Path
- Loader Path
- Raw CDN Path
- Loader API
- Core/CDN API
- Form And Field API
- Submit Behavior

## Choose One Load Path

Vanilla JS has two public load sub-paths:

1. Loader package: import `loadVGSCollect` from `@vgs/collect-js`, then create a form after the loader resolves.
2. Raw CDN script: include `https://js.verygoodvault.com/vgs-collect/<collect_version>/vgs-collect.js`, then use `window.VGSCollect.create(...)`.

Use one load path per page unless the customer's app already has a deliberate script-loading strategy.

## Loader Path

```js
import { loadVGSCollect } from '@vgs/collect-js';

const collect = await loadVGSCollect({
  vaultId: '<vault_id>',
  environment: 'sandbox',
  version: '<collect_version>'
});

const form = collect.init((state) => {
  console.log(state);
});

form.field('#card-name', {
  type: 'text',
  name: 'card_name',
  validations: ['required'],
  placeholder: 'Name on card'
});

form.field('#card-number', {
  type: 'card-number',
  name: 'card_number',
  validations: ['required', 'validCardNumber'],
  placeholder: 'Card number'
});

form.field('#card-expiration', {
  type: 'card-expiration-date',
  name: 'card_expiration',
  validations: ['required', 'validCardExpirationDate'],
  yearLength: 2,
  placeholder: 'MM/YY'
});

form.field('#card-cvc', {
  type: 'card-security-code',
  name: 'card_cvc',
  validations: ['required', 'validCardSecurityCode'],
  placeholder: 'CVC'
});

document.querySelector('#payment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const result = await form.submit('/post', {
      serialization: 'formData'
    });
    console.log(result.status, result.data);
  } catch (errors) {
    console.log(errors);
  }
});
```

## Raw CDN Path

```html
<form id="payment-form">
  <div id="card-name"></div>
  <div id="card-number"></div>
  <div id="card-expiration"></div>
  <div id="card-cvc"></div>
  <button type="submit">Submit</button>
</form>

<script src="https://js.verygoodvault.com/vgs-collect/<collect_version>/vgs-collect.js"></script>
<script>
  const form = VGSCollect.create('<vault_id>', 'sandbox', function (state) {
    console.log(state);
  });

  form.field('#card-name', {
    type: 'text',
    name: 'card_name',
    validations: ['required'],
    placeholder: 'Name on card'
  });

  form.field('#card-number', {
    type: 'card-number',
    name: 'card_number',
    validations: ['required', 'validCardNumber'],
    placeholder: 'Card number'
  });

  form.field('#card-expiration', {
    type: 'card-expiration-date',
    name: 'card_expiration',
    validations: ['required', 'validCardExpirationDate'],
    yearLength: 2,
    placeholder: 'MM/YY'
  });

  form.field('#card-cvc', {
    type: 'card-security-code',
    name: 'card_cvc',
    validations: ['required', 'validCardSecurityCode'],
    placeholder: 'CVC'
  });

  document.querySelector('#payment-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      const result = await form.submit('/post', { serialization: 'formData' });
      console.log(result.status, result.data);
    } catch (errors) {
      console.log(errors);
    }
  });
</script>
```

## Loader API

Use this section for customers who import from `@vgs/collect-js`.

`loadVGSCollect(config)` accepts:

- `vaultId`: required vault ID, represented as `<vault_id>` in examples.
- `environment`: optional environment; use `sandbox` in examples.
- `version`: optional Collect core SDK version; production integrations should pin an explicit public version.
- `integrity`: optional script integrity value.
- `crossorigin`: optional script cross-origin setting.

`loadVGSCollect(config)` resolves to the loaded Collect instance. After it resolves, call `collect.init(stateCallback)` to create a form for manual field setup.

## Core/CDN API

Use this section for customers who load the raw CDN script or already have `window.VGSCollect` available.

`VGSCollect` methods commonly used in customer integrations:

- `create(tntId, environment = 'sandbox', onUpdateCallback)`
- `session(options)`
- `load(modulesList)`
- `logLevel('none' | 'default')`
- `emit(eventName, ...args)`
- `subscribe(eventName, callback)`

Use `VGSCollect.create(...)` for direct/manual field setup. Use `VGSCollect.session(...)` when the customer has a Collect Session form ID, CMP/Card Attributes configuration, or authenticated session behavior.

## Form And Field API

Common form methods:

- `useCname(cname)`
- `setRouteId(routeId)`
- `setAuthToken(token)`
- `field(selector, properties)`
- `reset()`
- `submit(path, options, onSuccess?, onFailure?)`
- `tokenize(onSuccess?, onError?)`
- `createAliases(params, onSuccess?, onError?)`
- `createCard(parameters, onSuccess?, onError?)`
- `updateCard(parameters, onSuccess?, onError?)`
- `on(event, callback)`
- `off(event, callback)`
- `unmount()`

Common field methods:

- `on(eventType, callback)`
- `off(eventType, callback)`
- `delete()`
- `mask(mask, maskChar?, formatChars?)` or `mask({ mask, maskChar, formatChars, hideValue })`
- `replacePattern(regExpString, newSubStr?)`
- `focus()`
- `prefill()`
- `reset()`
- `update(params)`

Common field types include `card-number`, `card-expiration-date`, `card-security-code`, `zip-code`, `postal-code`, `file`, `ssn`, `checkbox`, `dropdown`, `password`, `number`, `radio`, `textarea`, `text`, and `date`.

Common validations include `required`, `validCardNumber`, `validCardExpirationDate`, `validCardSecurityCode`, `validSSN`, `validABARoutingNumber`, `compareValue`, `compareDate`, postal code validations, and regex validations written as `/pattern/flags`.

## Submit Behavior

`form.submit(path, options, success?, failure?)` supports callbacks and promises. A successful submit resolves `{ status, data }`; validation errors reject with the form state payload passed to the failure callback.

Common submit options:

- `data`: object or function.
- `headers`: object or async function.
- `method`: HTTP method.
- `serialization`: default JSON-like object, or `formData`.
- `mapDotToObject`: false by default; `true`, `merge`, or `mergeArray` shape nested field names and additional data.
- `withCredentials`: false by default.
