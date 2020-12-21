import { ERROR_MESSAGE } from '../constants';

const configSchema: IConfigSchema = {
  vaultId: value => typeof value === 'string' && /^tnt.{8}$/.test(value),
  environment: value =>
    typeof value === 'string' && /^(sandbox|live)((-eu)-\d{1})?$/.test(value),
  version: value =>
    value === 'canary' ||
    (typeof value === 'string' &&
      /^\d{1,2}\.\d{1,2}(\.\d{1,2})?$/.test(value) &&
      !value.startsWith('1.')),
};

const isRequired = (param: string) => {
  throw new Error(ERROR_MESSAGE.IS_REQUIRED(param));
};

const validate = <T extends IConfigSchema, U extends { [key: string]: string }>(
  schema: T,
  obj: U
): void => {
  if (schema) {
    const errors = Object.keys(schema)
      .filter(key => !schema[key](obj[key]))
      .map(key => new Error(ERROR_MESSAGE.IS_INVALID(key)));

    if (errors.length) {
      const [error] = errors;
      throw error;
    }
  }
};

const validateConfig = (config: any): void => {
  validate(configSchema, config);
};

export { validateConfig, isRequired };
