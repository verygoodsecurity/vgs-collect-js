export interface IConfig {
  vaultId: string;
  environment: string;
  version: string;
  integrity?: string;
  crossorigin?: 'use-credentials' | 'anonymous' | '';
}
