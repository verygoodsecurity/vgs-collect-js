import loadScript from './helpers/loadScript';
import initCollect from './helpers/initCollect';
import validateArguments from './helpers/validateArguments';
import { registerScriptLoading } from './helpers/logEvents';

export const loadVGSCollect = (
  tenantId: string,
  environment: string = 'sandbox'
) => {
  registerScriptLoading(tenantId, environment);
  if (!tenantId) {
    throw new Error(
      'tenantId is required: loadVGSCollect(tenantId, environment)'
    );
  }

  if (!validateArguments(tenantId, environment)) {
    throw new Error('Please specify correct tenantId and environment!');
  }

  return new Promise((resolve, reject) => {
    if (typeof window === undefined) {
      reject(null);
      return;
    }

    if (window.VGSCollect) {
      initCollect(tenantId, environment);
      resolve(window.VGSCollect);
    }

    loadScript(tenantId, environment)
      .then(() => {
        initCollect(tenantId, environment);
        resolve(window.VGSCollect);
      })
      .catch(e => {
        reject(e);
      });
  });
};
