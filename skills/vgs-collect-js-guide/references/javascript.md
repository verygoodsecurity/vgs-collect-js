# JavaScript Integration

Use this reference for customers integrating VGS Collect in vanilla JavaScript, framework-agnostic browser apps, or apps that want to load VGS Collect without the React wrapper.

## Contents

- Installation Shape
- Choose One Load Path
- Load Order
- Flow Selection
- Default CMP Create-Card Pattern
- Loader Path
- Raw CDN Path
- Loader API
- Core/CDN API
- Form And Field API
- Submit Modes
- Events And State
- Masking And Field Transforms
- CMP And Session Notes

## Installation Shape

Install the loader package when the app uses a package manager or bundler:

```bash
npm install @vgs/collect-js
```

Use the raw CDN script when the app cannot install npm packages or already manages browser scripts directly.

## Choose One Load Path

Vanilla JS has two public load sub-paths:

1. Loader package: import `loadVGSCollect` from `@vgs/collect-js`, then create a form after the loader resolves.
2. Raw CDN script: include `https://js.verygoodvault.com/vgs-collect/<collect_version>/vgs-collect.js`, then use `window.VGSCollect.session(...)` for CMP or `window.VGSCollect.create(...)` for manual flows.

Use one load path per page unless the customer's app already has a deliberate script-loading strategy.

## Load Order

1. Load Collect core with `loadVGSCollect(...)` or a raw CDN script.
2. Create the form only after Collect core is available.
3. Render VGS fields into stable DOM containers.
4. Validate field state before create-card, submit, or tokenization when the app controls the submit button.
5. Send only aliases, tokens, card IDs, or other non-sensitive response values to the app layer.

## Flow Selection

Start every integration answer by choosing the customer's load path and submit family. CMP create-card is the default for ambiguous card-management work, but this reference must still guide other vanilla JavaScript use cases when requested. The loader path is the default for new vanilla JavaScript examples, but direct CDN remains supported when requested.

| Customer request | Recommended JavaScript path |
| --- | --- |
| Add, save, or create a card/payment method and no other submission family is named | `@vgs/collect-js` with `collect.session(...)` and `form.createCard(...)` |
| Existing script-tag app or no package manager | Raw CDN script with `VGSCollect.session(...)` for CMP, or `VGSCollect.create(...)` for manual flows |
| Existing `window.VGSCollect` runtime | Use the existing runtime; do not add another script unless the customer asks to migrate |
| Submit collected values through a VGS route | `form.submit(path, options, success?, failure?)` |
| Create aliases directly | `form.createAliases(params, onSuccess?, onError?)` |
| Tokenize fields | `form.tokenize(onSuccess?, onError?)` |
| CMP create-card without React | `VGSCollect.session(...)` or loader-returned `collect.session(...)`, then `form.createCard(...)` |
| CMP update-card without React | `VGSCollect.session(...)` or loader-returned `collect.session(...)`, then `form.updateCard(...)` |
| Style fields, handle events, mask supported fields, or wire UI only | Render fields and callbacks for that task; do not force a submit flow |
| Collect SSN, passwords, files, routing numbers, dates, or generic non-card data | Use matching field types and the requested proxy/vault/tokenization flow; do not use a card-specific default |

If the request is ambiguous but appears to be generic secure collection rather than card creation, ask which submission family they need instead of forcing CMP.

## Default CMP Create-Card Pattern

Use this pattern by default when the customer asks for a vanilla JavaScript card form, payment form, card entry, add-card, save-card, or payment-method setup and does not name another submission family.

```js
import { loadVGSCollect } from '@vgs/collect-js';

const cmpConfiguration = {
  cardAttributes: {
    enable: true,
    parameters: ['card_brand', 'card_type', 'product_name']
  }
};

async function getAccessToken() {
  const response = await fetch('/api/access-token');
  const data = await response.json();

  if (!response.ok || typeof data.access_token !== 'string') {
    throw new Error(data.error_description || data.error || 'Failed to fetch access token');
  }

  return data.access_token;
}

function handleFormState(state) {
  void state;
  // Map validity and error state to customer-safe UI; do not log sensitive field state.
}

function handleCreateCardSuccess(status, data) {
  void status;
  void data;
  // Store card IDs or other non-sensitive response values needed by the app.
}

function handleCreateCardError(errors) {
  void errors;
  // Map validation/session errors to customer-safe UI messages.
}

const collect = await loadVGSCollect({
  vaultId: '<vault_id>',
  environment: 'sandbox',
  version: '<collect_version>'
});

const form = await collect.session({
  vaultId: '<vault_id>',
  env: 'sandbox',
  formId: '<collect_form_id>',
  configuration: cmpConfiguration,
  stateCallback: handleFormState,
  authHandler: getAccessToken,
  onErrorCallback: handleCreateCardError
});

form.on('getCardAttributesSuccess', (response) => {
  void response;
  // Use card brand/type/product metadata for UI only; do not log sensitive input.
});

form.on('getCardAttributesError', (errors) => {
  void errors;
});

form.cardholderNameField('#card-name', {
  placeholder: 'Name on card'
});

form.cardNumberField('#card-number', {
  validations: ['required', 'validCardNumber'],
  placeholder: 'Card number'
});

form.cardExpirationDateField('#card-expiration', {
  validations: ['required', 'validCardExpirationDate'],
  yearLength: 2,
  placeholder: 'MM/YY'
});

form.cardCVCField('#card-cvc', {
  validations: ['required', 'validCardSecurityCode'],
  placeholder: 'CVC'
});

document.querySelector('#payment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await form.createCard(
      {
        data: {
          cardholder: {
            address: {
              address1: '123 Main St',
              city: 'LA',
              region: 'CA',
              postal_code: '12345',
              country: 'USA'
            }
          }
        }
      },
      handleCreateCardSuccess,
      handleCreateCardError
    );
  } catch (errors) {
    handleCreateCardError(errors);
  }
});
```

## Loader Path

Use this path when the app imports from `@vgs/collect-js`.

- Import `loadVGSCollect`.
- Pass `vaultId`, `environment`, and a pinned `version`.
- Wait for the promise to resolve.
- Call `collect.session(options)` for the default CMP create-card flow.
- Call `collect.init(stateCallback)` only for direct/manual field setup such as proxy submit, aliases, tokenization, or UI-only wiring.
- Create fields with CMP preset helpers or `form.field(selector, properties)`, depending on the requested flow.
- Create cards, submit, tokenize, or create aliases with the form method that matches the requested flow.

Use `examples/js-loader/index.js` as the copy-paste starting point for this path.

## Raw CDN Path

Use this path when the app loads Collect core directly with a script tag or already has `window.VGSCollect`.

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
  (async function () {
    const cmpConfiguration = {
      cardAttributes: {
        enable: true,
        parameters: ['card_brand', 'card_type', 'product_name']
      }
    };

    async function getAccessToken() {
      const response = await fetch('/api/access-token');
      const data = await response.json();

      if (!response.ok || typeof data.access_token !== 'string') {
        throw new Error(data.error_description || data.error || 'Failed to fetch access token');
      }

      return data.access_token;
    }

    function handleFormState(state) {
      void state;
      // Map validity and error state to customer-safe UI; do not log sensitive field state.
    }

    function handleCreateCardSuccess(status, data) {
      void status;
      void data;
      // Store card IDs or other non-sensitive response values needed by the app.
    }

    function handleCreateCardError(errors) {
      void errors;
      // Map validation/session errors to customer-safe UI messages.
    }

    const form = await VGSCollect.session({
      vaultId: '<vault_id>',
      env: 'sandbox',
      formId: '<collect_form_id>',
      configuration: cmpConfiguration,
      stateCallback: handleFormState,
      authHandler: getAccessToken,
      onErrorCallback: handleCreateCardError
    });

    form.on('getCardAttributesSuccess', function (response) {
      void response;
      // Use card brand/type/product metadata for UI only; do not log sensitive input.
    });

    form.on('getCardAttributesError', function (errors) {
      void errors;
    });

    form.cardholderNameField('#card-name', {
      placeholder: 'Name on card'
    });

    form.cardNumberField('#card-number', {
      validations: ['required', 'validCardNumber'],
      placeholder: 'Card number'
    });

    form.cardExpirationDateField('#card-expiration', {
      validations: ['required', 'validCardExpirationDate'],
      yearLength: 2,
      placeholder: 'MM/YY'
    });

    form.cardCVCField('#card-cvc', {
      validations: ['required', 'validCardSecurityCode'],
      placeholder: 'CVC'
    });

    document.querySelector('#payment-form').addEventListener('submit', async function (event) {
      event.preventDefault();
      try {
        await form.createCard(
          {
            data: {
              cardholder: {
                address: {
                  address1: '123 Main St',
                  city: 'LA',
                  region: 'CA',
                  postal_code: '12345',
                  country: 'USA'
                }
              }
            }
          },
          handleCreateCardSuccess,
          handleCreateCardError
        );
      } catch (errors) {
        handleCreateCardError(errors);
      }
    });
  })();
</script>
```

Use `examples/js-cdn/index.html` as the copy-paste starting point for this path.

## Loader API

Use this section for customers who import from `@vgs/collect-js`.

`loadVGSCollect(config)` accepts:

- `vaultId`: required vault ID, represented as `<vault_id>` in examples.
- `environment`: optional environment; use `sandbox` in examples.
- `version`: optional Collect core SDK version; production integrations should pin an explicit public version.
- `integrity`: optional script integrity value.
- `crossorigin`: optional script cross-origin setting.
- `logLevel`: optional Collect log-level setting; use `none` only when the customer intentionally wants to suppress Collect logs.

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
- CMP presets: `cardNumberField`, `cardExpirationDateField`, `cardCVCField`, `cardholderNameField`
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

## Submit Modes

`form.submit(path, options, success?, failure?)` supports callbacks and promises. A successful submit resolves `{ status, data }`; validation errors reject with the form state payload passed to the failure callback.

Common submit options:

- `data`: object or function.
- `headers`: object or async function.
- `method`: HTTP method.
- `serialization`: default JSON-like object, or `formData`.
- `mapDotToObject`: false by default; `true`, `merge`, or `mergeArray` shape nested field names and additional data.
- `withCredentials`: false by default.

Other customer-facing submit methods:

- `form.tokenize(onSuccess?, onError?)`.
- `form.createAliases(params, onSuccess?, onError?)`.
- `form.createCard(parameters, onSuccess?, onError?)`.
- `form.updateCard(parameters, onSuccess?, onError?)`.

Use the method that matches the customer's requested flow. Do not mix proxy submit, aliases, tokenization, and CMP card flows in one default example.

## Events And State

Use form and field events for UI state, not for logging sensitive input.

- Form event methods: `form.on(event, callback)` and `form.off(event, callback)`.
- Field event methods: `field.on(eventType, callback)` and `field.off(eventType, callback)`.
- The form state callback is appropriate for rendering validation state, disabling submit, or showing customer-safe field errors.
- Do not persist or log full form state, submit payloads, tokens, aliases, card IDs, access tokens, route IDs, or production identifiers unless the customer has provided sanitized values and explicitly needs that behavior.

## Masking And Field Transforms

Use masking or replacement only when the customer asks for field formatting behavior.

- `field.mask(mask, maskChar?, formatChars?)`.
- `field.mask({ mask, maskChar, formatChars, hideValue })`.
- `field.replacePattern(regExpString, newSubStr?)`.

Confirm the customer's field type and desired format before recommending a mask. For postal formats that require letters or custom formatting, verify the actual field behavior in the customer's current Collect core version before claiming support.

## CMP And Session Notes

For vanilla JavaScript CMP or Collect Session flows, confirm the customer has the required Collect Session form ID, backend token/auth flow, and selected operation before generating code.

CMP create-card requires a Collect Session `formId` configured for CMP and `form.createCard(...)`. Include `configuration.cardAttributes` and card-attributes form events when card brand/type/product metadata should be available as the user enters the card number.

Do not hardcode bearer tokens, client secrets, route IDs, production vault IDs, production CNAME details, or access tokens in browser examples. Fetch short-lived credentials from the customer's backend when a flow requires authentication, and keep examples on sandbox placeholders unless sanitized customer configuration is provided.
