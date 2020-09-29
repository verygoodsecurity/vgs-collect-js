import { appendLink } from '../utils/appendElement';
import { MAIN_SCRIPT_DOMAIN, BACKUP_SCRIPT_DOMAIN } from '../constants/index';

const preConnect = () => {
  appendLink('preconnect', MAIN_SCRIPT_DOMAIN);
  appendLink('preconnect', BACKUP_SCRIPT_DOMAIN);
};

export { preConnect };
