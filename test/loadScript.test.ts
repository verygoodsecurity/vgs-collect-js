import { scriptExists } from '../src/utils/loadScript';

test('scriptExists', () => {
  expect(scriptExists()).toBe(false);
});
