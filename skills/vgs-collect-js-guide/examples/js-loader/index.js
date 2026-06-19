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
