import { getConfig } from './config';

const collect = {
  create: (...args: any) => {
    const last = args[args.length - 1];
    const { vaultId, environment } = getConfig();
    const callback = typeof last === 'function' ? last : () => {};
    return window.VGSCollect.create(vaultId, environment, callback);
  },
};

export { collect };
