import { loadScript } from './utils/loadScript';
import { registerScriptLoading } from './utils/trackEvent';
import { initCollect } from './utils/initCollect';
import { isRequired } from './utils/validation';

import { ERROR_MESSAGE, DEFAULT_CONFIG } from './constants';

import { preFetch } from './sideEffects/preFetch';
import { preConnect } from './sideEffects/preConnect';

import { VGSCollectInstance } from './types/collect-api/form';
import { LoadVGSCollectConfig } from './types/config';

export * from './types/collect-api/form';

// side effects
Promise.resolve().then(() => {
  if (typeof window !== 'undefined' && !window.VGSCollect) {
    // DNS lookup
    preFetch();
    // Establish connection to the server
    preConnect();
  }
});

const loadVGSCollect = (
  config: LoadVGSCollectConfig = isRequired('config')
): Promise<VGSCollectInstance | null> => {
  const {
    vaultId = isRequired('vaultId'),
    environment = DEFAULT_CONFIG.environment,
    version = DEFAULT_CONFIG.version,
  } = config;

  if (version === 'canary') {
    console.warn(ERROR_MESSAGE.CHANGE_VERSION);
  }

  registerScriptLoading({ vaultId, environment, version });

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(ERROR_MESSAGE.IS_UNDEFINED('window'));
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
