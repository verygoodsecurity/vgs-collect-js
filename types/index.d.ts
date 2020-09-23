/// <reference path='collect.d.ts' />

declare module 'vgs-collect-js' {
  const loadVGSCollect: (config: IConfig) => Promise<null>;
}

interface IConfig {
  tenantId: string,
  environment: string,
  version?: string,
}

interface Window {
    VGSCollect: IVGSCollectGlobal
}
