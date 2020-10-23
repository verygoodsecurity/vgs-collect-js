import { loadScript } from './utils/loadScript';
import { registerScriptLoading } from './utils/trackEvent';
import { initCollect } from './utils/initCollect';
import { isRequired } from './utils/validation';
import { VERSION } from './constants/index';

import { preFetch } from './sideEffects/preFetch';
import { preConnect } from './sideEffects/preConnect';

Promise.resolve().then(() => {
  if (!window.VGSCollect) {
    // DNS lookup
    preFetch();
    // Establish connection to the server
    preConnect();
  }
});

const loadVGSCollect = (config: IConfig = isRequired('config')) => {
  const {
    vaultId = isRequired('vaultId'),
    environment = 'sandbox',
    version = VERSION,
  } = config;

  registerScriptLoading({ vaultId, environment, version });

  return new Promise((resolve, reject) => {
    if (typeof window === undefined) {
      reject('window is undefined');
      return;
    }

    if (window.VGSCollect) {
      initCollect(vaultId, environment);
      resolve(window.VGSCollect);
    }

    loadScript()
      .then(() => {
        initCollect(vaultId, environment);
        resolve(window.VGSCollect);
      })
      .catch(e => {
        reject(e);
        return;
      });
  });
};

export { loadVGSCollect };
