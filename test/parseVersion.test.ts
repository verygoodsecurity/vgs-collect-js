import {
  parseVersionString,
  isVersionGreater,
} from '../src/utils/parseVersion';

const VERSIONS: Record<string, any> = {
  '2.1.0': {
    major: 2,
    minor: 1,
    patch: 0,
  },
  '3.1': {
    major: 3,
    minor: 1,
    patch: 0,
  },
  '20.14.3': {
    major: 20,
    minor: 14,
    patch: 3,
  },
};

describe('test parseVersionString()', () => {
  test.each(Object.keys(VERSIONS))(
    'test parseVersionString(): %s',
    (version: string) => {
      expect(parseVersionString(version)).toEqual(VERSIONS[version]);
    }
  );
});

describe('test isVersionGreater()', () => {
  test('version is greater than minimal', () => {
    expect(isVersionGreater('2.4.0', '2.3.0')).toBe(true);
  });
  test('version is greater than minimal', () => {
    expect(isVersionGreater('3.0.0', '2.0.0')).toBe(true);
  });
  test('version is greater than minimal', () => {
    expect(isVersionGreater('2.4.5', '2.4.4')).toBe(true);
  });
  test('version is less than minimal', () => {
    expect(isVersionGreater('2.2.0', '2.3.0')).toBe(false);
  });
  test('version is less than minimal', () => {
    expect(isVersionGreater('1.2.0', '2.3.0')).toBe(false);
  });
  test('version is less than minimal', () => {
    expect(isVersionGreater('2.2.0', '2.2.3')).toBe(false);
  });
  test('versions are equal', () => {
    expect(isVersionGreater('2.3.0', '2.3.0')).toBe(false);
  });
  test('common version is canary', () => {
    expect(isVersionGreater('canary', '2.3.0')).toBe(true);
  });
});
