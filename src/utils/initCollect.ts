interface IStateCallback {
  (state?: object): void;
}

const initCollect = (
  vaultId: string,
  environment: string,
  logLevel?: 'none'
): void => {
  if (logLevel && typeof window.VGSCollect.logLevel === 'function') {
    window.VGSCollect.logLevel(logLevel);
  }

  window.VGSCollect.init = (callback: IStateCallback = () => {}) => {
    return window.VGSCollect.create(vaultId, environment, callback);
  };
};

export { initCollect };
