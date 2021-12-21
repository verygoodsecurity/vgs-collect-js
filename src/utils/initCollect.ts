const initCollect = (vaultId: string, environment: string): void => {
  window.VGSCollect.init = callback => {
    return window.VGSCollect.create(vaultId, environment, callback);
  };
};

export { initCollect };
