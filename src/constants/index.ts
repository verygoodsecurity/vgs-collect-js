import { v4 as uuidv4 } from 'uuid';
import { IConfig } from '../utils/IConfig';

// Loading script from CloudFront CDN
const MAIN_SCRIPT_DOMAIN = `https://js.verygoodvault.com`;
// Loading script from Fastly CDN
const BACKUP_SCRIPT_DOMAIN = `https://js3.verygoodvault.com`;
const VGS_COLLECT_KEEPER = `https://vgs-collect-keeper.apps.verygood.systems`;
const SESSION_ID = uuidv4();

const DEFAULT_CONFIG: IConfig = {
  vaultId: '',
  environment: 'sandbox',
  version: 'canary',
};

const ANALYTICS_EVENTS = {
  // Script loaded from npm module
  LOADED_FROM_PACKAGE: 'LoadedFromPackage',
  // Script loaded
  SCRIPT_LOAD: 'ScriptLoad',
  // VGSCollect instance is undefined
  INSTANCE_UNDEFINED: 'InstanceUndefined',
};

const ERROR_MESSAGE = {
  IS_REQUIRED: (value: string) => `${value} is required.`,
  IS_UNDEFINED: (value: string) => `${value} is undefined.`,
  IS_INVALID: (value: string) => `${value} is invalid.`,
  UNABLE_TO_FIND: (value: string) => `Unable to find ${value}`,
  SCRIPT_WAS_NOT_LOADED: 'VGS Collect.js script was not loaded.',
  CHANGE_VERSION:
    'Please explicitly set locked VGS Collect.js version before going live. Check out the changelog https://www.verygoodsecurity.com/docs/vgs-collect/js/changelog',
};

export {
  MAIN_SCRIPT_DOMAIN,
  BACKUP_SCRIPT_DOMAIN,
  SESSION_ID,
  ANALYTICS_EVENTS,
  VGS_COLLECT_KEEPER,
  DEFAULT_CONFIG,
  ERROR_MESSAGE,
};
