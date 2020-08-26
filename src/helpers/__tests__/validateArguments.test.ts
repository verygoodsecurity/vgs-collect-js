import validateArguments from '../validateArguments';

const VALID_VALUES = [
    ['tnt12345678', 'sandbox'],
    ['tnt12345678', 'live'],
    ['tnt12345678', 'live-eu-1'],
    ['tnt12345678', 'sandbox'],
    ['tnt12345678', 'live'],
    ['tnt12345678', 'live-eu-1']
];

const INVALID_VALUES = [
    ['tnt12345678', 'random'],
    ['tnt12345678', 'sandox'],
    ['tnt12345678', 'sand123box'],
    ['1234tnt5678', 'sandbox'],
    ['trt12345678', 'sandbox'],
];

describe('validateArguments()', () => {
    test.each(VALID_VALUES)('test with valid values: %s, %s', (tenant, env) => {
        expect(validateArguments(tenant, env)).toBe(true);
        }
    );

    test.each(INVALID_VALUES)('test with invalid values: %s, %s', (tenant, env) => {
        expect(validateArguments(tenant, env)).toBe(false);
        }
    );
});
