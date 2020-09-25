import { loadScript } from './utils/loadScript';
import { registerScriptLoading } from './utils/setConfig';
import initCollect from './utils/initCollect';
import validateArguments from './utils/validateArguments';

export const loadVGSCollect = ({
  tenantId,
  environment = 'sandbox',
  version = '2.0',
}: IConfig) => {
  validateArguments(tenantId, environment, version);
  registerScriptLoading({ tenantId, environment, version });

  return new Promise((resolve, reject) => {
    if (typeof window === undefined) {
      reject(null);
      return;
    }

    if (window.VGSCollect) {
      initCollect(tenantId, environment);
      resolve(window.VGSCollect);
    }

    loadScript()
      .then(() => {
        initCollect(tenantId, environment);
        resolve(window.VGSCollect);
      })
      .catch(e => {
        reject(e);
      });
  });
};
