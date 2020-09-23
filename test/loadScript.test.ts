import { appendScript, scriptExists } from '../src/helpers/loadScript';
import { TRACE_ID } from '../src/helpers/globals';

test('scriptExists', () => {
  expect(scriptExists()).toBe(false);
});

test('appendScript', () => {
  appendScript('tntsd3w57ei', 'sandbox');
  expect(document.head.innerHTML).toBe(
    `<script src="https://js.verygoodvault.com/vgs-collect/2.0/vgs-collect.js?traceId=${TRACE_ID}&amp;tenantId=tntsd3w57ei&amp;env=sandbox"></script>`
  );
});

test('scriptExists', () => {
  expect(scriptExists()).toBe(true);
});
