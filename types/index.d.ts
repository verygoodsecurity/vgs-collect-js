declare module 'vgs-collect-js' {
    const loadVGSCollect: (
        tenantId: string,
        environment: string
    ) => Promise<null>;
}

declare module 'uuid' {
    export function v4(): number
}

interface Window {
    VGSCollect: any
}
