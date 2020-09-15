const validateArguments = (tenantId: string, environment: string): boolean => {
  const ENVS = ['sandbox', 'live', 'live-'];
  return (
    tenantId.startsWith('tnt') &&
    ENVS.some(substring => environment.indexOf(substring) !== -1)
  );
};

export default validateArguments;
