import { appendLink } from '../utils/appendElement';
import { MAIN_SCRIPT_DOMAIN, BACKUP_SCRIPT_DOMAIN } from '../constants/index';

const preFetch = () => {
  appendLink('dns-prefetch', MAIN_SCRIPT_DOMAIN);
  appendLink('dns-prefetch', BACKUP_SCRIPT_DOMAIN);
};

export { preFetch };
