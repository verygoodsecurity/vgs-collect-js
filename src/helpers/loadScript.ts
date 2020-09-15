import { v4 as uuidv4 } from 'uuid';
import trackEvent, { ANALYTICS_EVENTS } from './logEvents';

const VERSION: string = '2.0';
const MAIN_SCRIPT_URL: string = `https://js.verygoodvault.com/vgs-collect/${VERSION}/vgs-collect.js`;
const BACKUP_SCRIPT_URL: string = `https://js3.verygoodvault.com/vgs-collect/${VERSION}/vgs-collect.js`;
const TRACE_ID = uuidv4();

let SCRIPT_URL = MAIN_SCRIPT_URL;

const scriptExists = () => {
  try {
    const scripts = document.querySelectorAll<HTMLScriptElement>(
      `script[src^="${SCRIPT_URL}"]`
    );
    return scripts.length > 0 ? scripts[scripts.length - 1] : false;
  } catch (e) {
    return false;
  }
};

const appendScript = (
  tenantId: string,
  environment: string
): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = `${SCRIPT_URL}?traceId=${TRACE_ID}&tenantId=${tenantId}&env=${environment}`;
  const target = document.head || document.body;

  if (!target) {
    throw new Error('Unable to find document.head or document.body');
  }

  target.append(script);
  return script;
};

const loadScript = (tnt: string, env: string, loadMainCDN: boolean = true) => {
  const collectPromise = new Promise((resolve, reject) => {
    SCRIPT_URL = loadMainCDN ? SCRIPT_URL : BACKUP_SCRIPT_URL;

    if (scriptExists() && window.VGSCollect) {
      resolve(window.VGSCollect);
    }

    if (!window.VGSCollect) {
      const script = appendScript(tnt, env);
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
            resolve(loadScript(tnt, env, false));
          } else {
            reject(`Error occurred while loading VGS Collect.js script.`);
          }
        };
      }
    }
  });
  return collectPromise;
};

export default loadScript;
