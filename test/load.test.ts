import { preFetch } from '../src/sideEffects/preFetch';
import { preConnect } from '../src/sideEffects/preConnect';
import { scriptExists } from '../src/utils/loadScript';
import { MAIN_SCRIPT_DOMAIN, BACKUP_SCRIPT_DOMAIN } from '../src/constants';

const SCRIPT_URL = 'script[src^="https://js.verygoodvault.com/vgs-collect/"]';

describe('loadVGSCollect', () => {
  afterEach(() => {
    const scripts = Array.from(document.querySelectorAll(SCRIPT_URL));

    for (const script of scripts) {
      if (script.parentElement) {
        script.parentElement.removeChild(script);
      }
    }
  });

  test("script doesn't exist before function call", () => {
    require('../src/index');
    expect(document.querySelectorAll(SCRIPT_URL).length).toBe(0);
  });

  test('script exists after loadVGSCollect call', () => {
    const { loadVGSCollect } = require('../src/index');
    loadVGSCollect({
      vaultId: 'tnt12345352',
    });
    expect(document.head.innerHTML).toContain(
      `<link rel=\"dns-prefetch\" href=\"${MAIN_SCRIPT_DOMAIN}\"><link rel=\"dns-prefetch\" href=\"${BACKUP_SCRIPT_DOMAIN}\">`
    );
    expect(document.head.innerHTML).toContain(
      `<link rel=\"preconnect\" href=\"${MAIN_SCRIPT_DOMAIN}\"><link rel=\"preconnect\" href=\"${BACKUP_SCRIPT_DOMAIN}\">`
    );
    expect(document.querySelectorAll(SCRIPT_URL).length).toBe(1);
  });
});

describe('check if script exists', () => {
  test('VGS Collect script already exists on the page', async () => {
    const test = document.createElement('script');
    test.src = 'https://js.test.com/vgs-collect/';
    document.head.appendChild(test);

    expect(scriptExists()).toBe(false);

    const script = document.createElement('script');
    script.src = 'https://js.verygoodvault.com/vgs-collect/2.0/vgs-collect.js';
    document.head.appendChild(script);

    expect(scriptExists()).toBe(true);
  });
});

describe('check pre-fectch preconnect', () => {
  test('check for dns-prefetch link', () => {
    preFetch();
    expect(document.head.innerHTML).toContain(
      `<link rel=\"dns-prefetch\" href=\"${MAIN_SCRIPT_DOMAIN}\"><link rel=\"dns-prefetch\" href=\"${BACKUP_SCRIPT_DOMAIN}\">`
    );
  });
  test('check for preconnect link', () => {
    preConnect();
    expect(document.head.innerHTML).toContain(
      `<link rel=\"preconnect\" href=\"${MAIN_SCRIPT_DOMAIN}\"><link rel=\"preconnect\" href=\"${BACKUP_SCRIPT_DOMAIN}\">`
    );
  });
});
