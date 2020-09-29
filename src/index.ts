import { loadScript } from './utils/loadScript';
import { registerScriptLoading } from './utils/trackEvent';
import { initCollect } from './utils/initCollect';
import { validateArguments, isRequired } from './utils/validation';

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

export const loadVGSCollect = ({
  vaultId = isRequired('vaultId'),
  environment = 'sandbox',
  version = '2.0',
}: IConfig) => {
  const config = { vaultId, environment, version };

  validateArguments(config);
  registerScriptLoading(config);

  return new Promise((resolve, reject) => {
    if (typeof window === undefined) {
      reject(null);
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
      });
  });
};
