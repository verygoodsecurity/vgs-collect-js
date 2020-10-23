import { v4 as uuidv4 } from 'uuid';

const VERSION = '2.0';

const MAIN_SCRIPT_DOMAIN = `https://js.verygoodvault.com`;
const BACKUP_SCRIPT_DOMAIN = `https://js.verygoodvault.com`;
const VGS_COLLECT_KEEPER = `https://vgs-collect-keeper.apps.verygood.systems`;
const SESSION_ID = uuidv4();

const DEFAULT_CONFIG: IConfig = {
  vaultId: '',
  environment: 'sandbox',
  version: VERSION,
};

const ANALYTICS_EVENTS = {
  // Script loaded from npm module
  LOADED_FROM_PACKAGE: 'LoadedFromPackage',
  // Script loaded
  SCRIPT_LOAD: 'ScriptLoad',
  // VGSCollect instance is undefined
  INSTANCE_UNDEFINED: 'InstanceUndefined',
};

export {
  VERSION,
  MAIN_SCRIPT_DOMAIN,
  BACKUP_SCRIPT_DOMAIN,
  SESSION_ID,
  ANALYTICS_EVENTS,
  VGS_COLLECT_KEEPER,
  DEFAULT_CONFIG,
};
