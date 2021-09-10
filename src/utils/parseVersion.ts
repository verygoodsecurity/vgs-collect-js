const parseVersionString = (version: string) => {
  const parts = version.split('.');

  const major = parseInt(parts[0]) || 0;
  const minor = parseInt(parts[1]) || 0;
  const patch = parseInt(parts[2]) || 0;
  return {
    major,
    minor,
    patch,
  };
};

const isVersionGreater = (current: string, minimal: string) => {
  if (current === 'canary') return true;

  const currentParsed = parseVersionString(current);
  const minimalParsed = parseVersionString(minimal);
  if (currentParsed.major !== minimalParsed.major) {
    return currentParsed.major > minimalParsed.major;
  }

  if (currentParsed.minor !== minimalParsed.minor) {
    return currentParsed.minor > minimalParsed.minor;
  }

  if (currentParsed.patch !== minimalParsed.patch) {
    return currentParsed.patch > minimalParsed.patch;
  }
  return false;
};

export { parseVersionString, isVersionGreater };
