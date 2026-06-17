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
