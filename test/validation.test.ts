import { validateConfig, isRequired } from '../src/utils/validation';

const INVALID_VAULT_ID = [
  'invalid',
  'tnt1234567',
  'test1234567',
  'tnt',
  'tnttwertyu',
  '',
  [],
  {},
  false,
  true,
  null,
];

const INVALID_ENVS = [
  'invalid',
  'live-',
  'live-ua-1',
  'sandbox-',
  'sandbox-ua-1',
  'live-eu-1-1',
  '',
  [],
  {},
  false,
  true,
  null,
];

const INVALID_VERSIONS = [
  '1',
  '1.0.',
  '1.0.1',
  '2',
  '2.224.24',
  '1.22.22',
  '',
  [],
  {},
  false,
  true,
  null,
];

describe('validateConfig()', () => {
  test.each(INVALID_VAULT_ID)('test with invalid value: %s', vaultId => {
    expect(() =>
      validateConfig({ vaultId, environment: 'sandbox', version: '2.0' })
    ).toThrow('vaultId is invalid');
  });

  test.each(INVALID_ENVS)('test with invalid value: %s', environment => {
    expect(() =>
      validateConfig({ vaultId: 'tnt12345678', environment, version: '2.0' })
    ).toThrow('environment is invalid');
  });

  test.each(INVALID_VERSIONS)('test with invalid value: %s', version => {
    expect(() =>
      validateConfig({
        vaultId: 'tnt12345678',
        environment: 'sandbox',
        version,
      })
    ).toThrow('version is invalid');
  });
});

test('isRequired()', () => {
  expect(() => isRequired('test')).toThrow('is required');
});
