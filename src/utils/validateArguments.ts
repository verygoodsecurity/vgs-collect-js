const validateArguments = (
  tenantId: string,
  environment: string,
  version: string
): void => {
  const ALLOWED_ENVS = ['sandbox', 'live', 'live-'];

  if (!tenantId) {
    throw new Error('Property tenantId is required');
  }

  if (!tenantId.startsWith('tnt')) {
    throw new Error('Invalit config.tenantId property value');
  }

  if (!ALLOWED_ENVS.some(substring => environment.indexOf(substring) !== -1)) {
    throw new Error('Invalit config.environment property value');
  }

  if (version.startsWith('1')) {
    throw new Error(
      'Module supports only VGS Collect.js starting from the version 2.0'
    );
  }
};

export default validateArguments;
