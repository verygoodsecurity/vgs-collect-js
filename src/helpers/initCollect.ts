const initCollect = (tenantId: string, environment: string): void => {
    window.VGSCollect.init = (callback: IStateCallback) => {
        return window.VGSCollect.create(tenantId, environment, callback);
    };
};

export default initCollect;
