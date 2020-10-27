interface IStateCallback {
  (state?: object): void
}

interface IVGSCollectGlobal {
  create: (id: string, env: string, callback: IStateCallback | undefined) => any,
  load: (modulesList: []) => void,
  setVault: (vault: string) => void,
  setEnvironment: (env: string) => void,
  modules: []
}
