let config: IConfig = {
  vaultId: '',
  environment: 'sandbox',
  version: '2.0',
};

const setConfig = (params: IConfig) => {
  if (params) {
    config = { ...params };
  }
};

export { config, setConfig };
