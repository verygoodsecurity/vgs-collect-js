import axios from 'axios';
import { config, TRACE_ID } from './globals';

export const ANALYTICS_EVENTS = {
  // Script loaded from npm module
  LOADED_FROM_PACKAGE: 'LoadedFromPackage',
  // Script loaded
  SCRIPT_LOADING: 'ScriptLoading',
  // VGSCollect instance is undefined
  INSTANCE_UNDEFINED: 'InstanceUndefined',
};

export const trackEvent = (event: any) => {
  const { tenantId, environment, version } = config;
  let payload = '';

  const data = {
    env: environment,
    tnt: tenantId,
    userAgent: window.navigator.userAgent,
    version,
    timestamp: Date.now(),
    vgsCollectSessionId: TRACE_ID,
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
