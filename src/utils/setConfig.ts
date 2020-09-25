import trackEvent, { ANALYTICS_EVENTS } from './trackEvent';

export let config: IConfig = {
  tenantId: '',
  environment: '',
  version: '',
};

export const registerScriptLoading = (params: IConfig) => {
  config = { ...params };
  trackEvent({
    type: ANALYTICS_EVENTS.LOADED_FROM_PACKAGE,
  });
};