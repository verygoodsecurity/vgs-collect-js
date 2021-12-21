import { FieldInstance, ClassMap, FieldType } from './field';

/**
 * Available options for .field() method configuration
 */
type BooleanValue = boolean | 'true' | 'false';
type FileType =
  | 'image/png'
  | 'image/apng'
  | 'image/avif'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'image/svg'
  | 'image/webp'
  | 'image/*'
  | '.pdf'
  | '.csv';
type FileCapture = 'user' | 'environment';
type YearLength = '2' | '4' | 2 | 4;

/**
 * Available options for .submit() method
 */
type SubmitMethod = 'post' | 'patch' | 'put' | 'delete' | 'get';
type SubmitSerializer = 'deep' | 'flat';
type SubmitSerialization = 'json' | 'formData';
type SubmitMapDotToObject = BooleanValue | 'merge' | 'mergeArray';

/**
 * Available options for the form .on() method
 */
type FormEventTypes = 'enterPress';

interface VGSCollectStateParams {
  name: string;
  errorMessages: string[];
  isDirty: boolean;
  isTouched: boolean;
  isFocused: boolean;
  isValid: boolean;
  isEmpty: boolean;
  last4?: string;
  bin?: string;
  /**
   * TODO: check for another properties
   */
}

interface CardInfo {
  type: string;
  pattern: RegExp;
  format?: RegExp;
  length?: number[];
  cvvLength?: number[];
  luhn?: Boolean;
}

interface VGSCollectSubmitOptions {
  data: object | ((values: any) => any);
  headers: object;
  method: SubmitMethod;
  serailizer: SubmitSerializer;
  serialization: SubmitSerialization;
  mapDotToObject: SubmitMapDotToObject;
  withCredentials: BooleanValue;
}

export interface VGSCollectFieldOptions {
  /**
   * TODO: check full list
   */
  type: FieldType;
  name: string;
  validations?: string[];
  css?: Record<string, any>;
  successColor?: string;
  errorColor?: string;
  classes?: ClassMap;
  serializers?: any;
  hideValue?: BooleanValue;
  autoComplete?: string;
  placeholder?: string;
  autoFocus?: BooleanValue;
  disabled?: BooleanValue;
  ariaLabel?: string;
  readonly?: BooleanValue;
  /**
   * card-number specific properties
   */
  icons?: Record<string, string>;
  showCardIcon?: BooleanValue | Record<string, any>;
  addCardBrands?: CardInfo[];
  /**
   * file specific properties
   */
  multiple?: BooleanValue;
  accept?: FileType[];
  capture?: FileCapture;
  maxFileSize?: number;
  maxFiles?: number;
  /**
   * text specific properties
   */
  min?: number;
  max?: number;
  maxLength?: number;
  step?: number;
  /**
   * card-expiration-date specific properties
   */
  yearLength?: YearLength;
  separator?: string;
  /**
   * checkbox specific properties
   */
  value?: string;
  /**
   * dropdown specific properties
   */
  options?: string[];
}

export type VGSCollectFormState = Record<string, VGSCollectStateParams> | null;

export interface VGSCollectForm {
  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#create-and-setup-form-fields
   */
  field(selector: string, options: VGSCollectFieldOptions): FieldInstance;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#form-instance-events
   */
  on(event: FormEventTypes, callback: (info: { name: string }) => void): void;
  off(event: FormEventTypes, callback: () => void): void;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#setup-form-submission
   */
  submit(
    path: string,
    options: Partial<VGSCollectSubmitOptions>,
    successCallback: (status: number | null, data: any) => any,
    errorCallback: (error: VGSCollectFormState) => any
  ): any;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#form-reset
   */
  reset(): any;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#form-unmount
   */
  unmount(): void;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/cookbook#how-to-integrate-vgs-collectjs-with-vgs-satellite
   */
  connectSatellite(port: number): any;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#vgs-collect-with-cname
   */
  useCname(cname: string): void;
}

export interface VGSCollectInstance {
  init(
    stateCallback?: (state: VGSCollectFormState) => void | undefined
  ): VGSCollectForm;
  create(
    tenantId: string,
    environment: string,
    stateCallback?: (state: VGSCollectFormState) => void
  ): VGSCollectForm;
}
