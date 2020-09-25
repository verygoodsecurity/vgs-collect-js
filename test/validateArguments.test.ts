import validateArguments from '../src/utils/validateArguments';

const VALID_VALUES = [
  ['tnt12345678', 'sandbox', '2'],
  ['tnt12345678', 'live', '2.0'],
  ['tnt12345678', 'live-eu-1', '2.0.1'],
  ['tnt12345678', 'sandbox', '2.0'],
  ['tnt12345678', 'live', '2.0'],
  ['tnt12345678', 'live-eu-1', '2.0'],
];

const INVALID_VALUES = [
  ['tnt12345678', 'random', '1.0'],
  ['tnt12345678', 'sandox', '1'],
  ['tnt12345678', 'sand123box', '1.2.3'],
  ['1234tnt5678', 'sandbox', '1.0.0'],
  ['trt12345678', 'sandbox', '1'],
];

describe('validateArguments()', () => {
  test.each(VALID_VALUES)(
    'test with valid values: %s, %s',
    (tenant, env, version) => {
      expect(() => validateArguments(tenant, env, version)).not.toThrow();
    }
  );

  test.each(INVALID_VALUES)(
    'test with invalid values: %s, %s',
    (tenant, env, version) => {
      expect(() => validateArguments(tenant, env, version)).toThrow();
    }
  );
});
