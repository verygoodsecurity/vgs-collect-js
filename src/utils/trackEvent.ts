import axios from 'axios';
import {
  SESSION_ID,
  ANALYTICS_EVENTS,
  VGS_COLLECT_KEEPER,
} from '../constants/index';
import { config, setConfig } from './setConfig';

const registerScriptLoading = (params: IConfig) => {
  setConfig(params);
  trackEvent({
    type: ANALYTICS_EVENTS.LOADED_FROM_PACKAGE,
  });
};

const trackEvent = (event: any) => {
  const { vaultId, environment, version } = config;
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

  axios({
    method: 'POST',
    url: `${VGS_COLLECT_KEEPER}/vgs`,
    data: payload,
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return;
    });
};

export { trackEvent, registerScriptLoading };
