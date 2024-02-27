import {
  SESSION_ID,
  ANALYTICS_EVENTS,
  VGS_COLLECT_KEEPER,
} from '../constants/index';
import { setConfig, getConfig } from './config';
import { LoadVGSCollectConfig } from '../types/config';
import { validateConfig } from './validation';

const registerScriptLoading = (params: LoadVGSCollectConfig) => {
  validateConfig(params);
  setConfig(params);
  trackEvent({
    type: ANALYTICS_EVENTS.LOADED_FROM_PACKAGE,
  });
};

const trackEvent = (event: any) => {
  const { vaultId, environment, version } = getConfig();
  let payload = '';

  const data = {
    env: environment,
    tnt: vaultId,
    userAgent: window.navigator.userAgent,
    version,
    timestamp: Date.now(),
    vgsCollectSessionId: SESSION_ID,
  };

  try {
    payload = window.btoa(JSON.stringify({ ...event, ...data }));
  } catch (err) {
    return;
  }

  fetch(`${VGS_COLLECT_KEEPER}/vgs`, {
    method: 'POST',
    body: payload,
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return true;
    });
};

export { trackEvent, registerScriptLoading };
