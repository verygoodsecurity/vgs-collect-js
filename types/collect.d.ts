interface IStateCallback {
  (state?: object): void
}

interface IVGSCollectGlobal {
  create: (id: string, env: string, callback: IStateCallback) => any,
  init: (callback: () => void) => any,
  load: (modulesList: []) => void,
  modules: []
}
