import trackEvent, { ANALYTICS_EVENTS } from './trackEvent';
import {
  config,
  setConfig,
  TRACE_ID,
  MAIN_SCRIPT_DOMAIN,
  BACKUP_SCRIPT_DOMAIN,
} from './globals';

let script_url = MAIN_SCRIPT_DOMAIN;

export const registerScriptLoading = (params: IConfig) => {
  setConfig(params);
  trackEvent({
    type: ANALYTICS_EVENTS.LOADED_FROM_PACKAGE,
  });
};

export const scriptExists = () => {
  try {
    const scripts = document.querySelectorAll<HTMLScriptElement>(
      `script[src^="${script_url}"]`
    );
    return scripts.length > 0;
  } catch (e) {
    return false;
  }
};

export const appendScript = (
  tenantId: string,
  environment: string
): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = `${script_url}/vgs-collect/${config.version}/vgs-collect.js?traceId=${TRACE_ID}&tenantId=${tenantId}&env=${environment}`;
  const target = document.head || document.body;

  if (!target) {
    throw new Error('Unable to find document.head or document.body');
  }

  target.append(script);
  return script;
};

export const loadScript = (loadMainCDN: boolean = true) => {
  const { tenantId, environment } = config;

  const collectPromise = new Promise((resolve, reject) => {
    script_url = loadMainCDN ? script_url : BACKUP_SCRIPT_DOMAIN;

    if (scriptExists() && window.VGSCollect) {
      resolve(window.VGSCollect);
    }

    if (!window.VGSCollect) {
      const script = appendScript(tenantId, environment);
      if (script) {
        script.onload = () => {
          if (!window.VGSCollect) {
            trackEvent({
              type: ANALYTICS_EVENTS.INSTANCE_UNDEFINED,
              status: 'OK',
              mainCDN: loadMainCDN,
            });
            reject('VGS Collect is undefined.');
          }
          trackEvent({
            type: ANALYTICS_EVENTS.SCRIPT_LOADING,
            status: 'OK',
            mainCDN: loadMainCDN,
          });
          resolve(window.VGSCollect);
        };

        script.onerror = () => {
          trackEvent({
            type: ANALYTICS_EVENTS.SCRIPT_LOADING,
            status: 'Failed',
            mainCDN: loadMainCDN,
          });
          if (loadMainCDN) {
            // load script from backup CDN
            resolve(loadScript(false));
          } else {
            reject(`Error occurred while loading VGS Collect.js script.`);
          }
        };
      }
    }
  });
  return collectPromise;
};
