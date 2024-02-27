import { DEFAULT_CONFIG } from '../constants/index';
import { LoadVGSCollectConfig } from '../types/config';

let config = DEFAULT_CONFIG;

const setConfig = (params: LoadVGSCollectConfig) => {
  if (params) {
    config = { ...params };
  }
};

const getConfig = () => config;

export { setConfig, getConfig };
