import axios from 'axios';

export const ANALYTICS_EVENTS = {
  // load from npm module registered
  LOADED_FROM_PACKAGE: 'LoadedFromPackage',
  // Script loaded
  SCRIPT_LOADING: 'ScriptLoading',
  // VGSCollect instance is undefined
  INSTANCE_UNDEFINED: 'InstanceUndefined',
};

let TENANT_ID = 'unknown';
let ENVIRONMENT = 'sandbox';

export const registerScriptLoading = (tenantId: string, env: string) => {
  TENANT_ID = tenantId;
  ENVIRONMENT = env;
  trackEvent({
    type: ANALYTICS_EVENTS.LOADED_FROM_PACKAGE,
  });
};

export const trackEvent = (event: any) => {
  let payload = '';

  const data = {
    env: ENVIRONMENT,
    tnt: TENANT_ID,
    version: '2.0',
    userAgent: window.navigator.userAgent,
  };

  try {
    payload = window.btoa(JSON.stringify({ ...event, ...data }));
  } catch (err) {
    return;
  }

  axios({
    method: 'POST',
    url: 'https://vgs-collect-keeper.apps.verygood.systems/vgs',
    data: payload,
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return;
    });
};

export default trackEvent;
