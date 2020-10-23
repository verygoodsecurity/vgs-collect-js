const configSchema: IConfigSchema = {
  vaultId: value => typeof value === 'string' && /^tnt.{8}$/.test(value),
  environment: value =>
    typeof value === 'string' && /^(sandbox|live)((-eu)-\d{1})?$/.test(value),
  version: value =>
    typeof value === 'string' &&
    /^\d{1,2}\.\d{1,2}(\.\d{1,2})?$/.test(value) &&
    !value.startsWith('1.'),
};

const isRequired = (param: string) => {
  throw new Error(`${param} is required.`);
};

const validate = <T extends IConfigSchema, U extends { [key: string]: string }>(
  schema: T,
  obj: U
): void => {
  if (schema) {
    const errors = Object.keys(schema)
      .filter(key => !schema[key](obj[key]))
      .map(key => new Error(`${key} is invalid.`));

    if (errors.length > 0) {
      for (const { message } of errors) {
        throw new Error(message);
      }
    }
  }
};

const validateConfig = (config: any): void => {
  validate(configSchema, config);
};

export { validateConfig, isRequired };
