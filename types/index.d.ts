/// <reference path='collect.d.ts' />

declare module 'vgs-collect-js' {
  const loadVGSCollect: (config: IConfig) => Promise<null>;
}

interface IConfig {
  vaultId: string,
  environment: string,
  version: string,
  [index: string]: string
}

interface IConfigSchema {
  [key: string]: (value: string) => boolean; 
}

interface Window {
    VGSCollect: IVGSCollectGlobal
}
