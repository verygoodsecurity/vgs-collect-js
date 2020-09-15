/// <reference path='collect.d.ts' />

declare module 'vgs-collect-js-test' {
    const loadVGSCollect: (
        tenantId: string,
        environment: string
    ) => Promise<null>;
}

interface Window {
    VGSCollect: IVGSCollectGlobal
}
