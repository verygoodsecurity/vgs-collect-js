import { v4 as uuidv4 } from 'uuid';

const MAIN_SCRIPT_DOMAIN = `https://js.verygoodvault.com`;
const BACKUP_SCRIPT_DOMAIN = `https://js3.verygoodvault.com`;
const VGS_COLLECT_KEEPER = `https://vgs-collect-keeper.apps.verygood.systems`;
const SESSION_ID = uuidv4();

const ANALYTICS_EVENTS = {
  // Script loaded from npm module
  LOADED_FROM_PACKAGE: 'LoadedFromPackage',
  // Script loaded
  SCRIPT_LOAD: 'ScriptLoad',
  // VGSCollect instance is undefined
  INSTANCE_UNDEFINED: 'InstanceUndefined',
};

export {
  MAIN_SCRIPT_DOMAIN,
  BACKUP_SCRIPT_DOMAIN,
  SESSION_ID,
  ANALYTICS_EVENTS,
  VGS_COLLECT_KEEPER,
};
