const configSchema: IConfigSchema = {
  vaultId: value => value.startsWith('tnt'),
  environment: value =>
    ['sandbox', 'live', 'live-'].some(
      substring => value.indexOf(substring) !== -1
    ),
  version: value => !value.startsWith('1'),
};

const isRequired = (param: string) => {
  throw new Error(`${param} is required.`);
};

const validate = <T extends IConfigSchema, U extends { [key: string]: string }>(
  schema: T,
  obj: U
): void => {
  if (schema) {
  }
  const errors = Object.keys(schema)
    .filter(key => !schema[key](obj[key]))
    .map(key => new Error(`${key} is invalid.`));

  if (errors.length > 0) {
    for (const { message } of errors) {
      throw new Error(message);
    }
  }
};

const validateArguments = (config: IConfig): void => {
  validate(configSchema, config);
};

export { validateArguments, isRequired };
