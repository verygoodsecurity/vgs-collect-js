import loadScript from './helpers/loadScript';
import initCollect from './helpers/initCollect';

const validTenantId = (tenantId: string): boolean => {
    return tenantId.includes('tnt');
};

export const loadVGSCollect = (tenantId: string, environment: string = 'sandbox') => {
  if (!validTenantId(tenantId)) {
      throw new Error('Please specify correct tenantId and environment!');
  }

  const resolvePromise = (resolve: (VGSCollect: any) => void) => {
    initCollect(tenantId, environment);
    resolve(window.VGSCollect);
  };

  return new Promise((resolve, reject) => {
      if (typeof window === undefined) {
          reject(null);
          return;
      }

      if (window.VGSCollect) {
          resolvePromise(resolve);
      }

      const script = loadScript(tenantId);

      if (script) {
          script.onload = () => {
            if (!window.VGSCollect) {
                reject('VGS Collect is undefined.');
            }

            resolvePromise(resolve);
          };

          script.onerror = () => {
            reject(`Error occurred while loading VGS Collect.js script.`);
          };
      }
  });
};
