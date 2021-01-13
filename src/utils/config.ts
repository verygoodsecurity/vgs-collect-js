import { DEFAULT_CONFIG } from '../constants/index';

let config = DEFAULT_CONFIG;

const setConfig = (params: IConfig) => {
  if (params) {
    config = { ...params };
  }
};

const getConfig = () => config;

export { setConfig, getConfig };
