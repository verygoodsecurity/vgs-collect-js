import { trackEvent } from './trackEvent';
import { config } from './setConfig';
import {
  SESSION_ID,
  MAIN_SCRIPT_DOMAIN,
  BACKUP_SCRIPT_DOMAIN,
  ANALYTICS_EVENTS,
} from '../constants/index';
import { appendElement } from './appendElement';

let scriptURL = MAIN_SCRIPT_DOMAIN;

const scriptExists = () => {
  try {
    const scripts = document.querySelectorAll<HTMLScriptElement>(
      `script[src^="${scriptURL}/vgs-collect/"]`
    );
    return scripts.length > 0;
  } catch (e) {
    return false;
  }
};

const appendScript = (): HTMLScriptElement => {
  const { vaultId, environment, version } = config;
  const script = document.createElement('script');

  script.src = `${scriptURL}/vgs-collect/${version}/vgs-collect.js?traceId=${SESSION_ID}&tenantId=${vaultId}&env=${environment}`;
  appendElement(script);

  return script;
};

const loadScript = (loadMainCDN: boolean = true) => {
  const collectPromise = new Promise((resolve, reject) => {
    scriptURL = loadMainCDN ? scriptURL : BACKUP_SCRIPT_DOMAIN;

    if (scriptExists() && window.VGSCollect) {
      resolve(window.VGSCollect);
    }

    if (!window.VGSCollect) {
      const script = appendScript();
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
            type: ANALYTICS_EVENTS.SCRIPT_LOAD,
            status: 'OK',
            mainCDN: loadMainCDN,
          });
          resolve(window.VGSCollect);
        };

        script.onerror = () => {
          trackEvent({
            type: ANALYTICS_EVENTS.SCRIPT_LOAD,
            status: 'Failed',
            mainCDN: loadMainCDN,
          });
          if (loadMainCDN) {
            // Load script from backup CDN
            resolve(loadScript(false));
          } else {
            reject(`VGS Collect.js script was not loaded.`);
          }
        };
      }
    }
  });
  return collectPromise;
};

export { loadScript, appendScript, scriptExists };
