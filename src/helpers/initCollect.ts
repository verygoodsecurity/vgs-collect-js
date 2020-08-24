const initCollect = (tenantId: string, environment: string) => {
    window.VGSCollect.init = (callback: () => void) => {
        return window.VGSCollect.create(tenantId, environment, callback);
    };
};

export default initCollect;
