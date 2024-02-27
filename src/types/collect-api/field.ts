type FieldState =
  | 'dirty'
  | 'empty'
  | 'valid'
  | 'invalid'
  | 'focused'
  | 'touched';
export type FieldType =
  | 'text'
  | 'card-number'
  | 'card-expiration-date'
  | 'card-security-code'
  | 'ssn'
  | 'zip-code'
  | 'file'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'textarea';
export type ClassMap = Partial<Record<FieldState, string>>;

type VGSKeyboardEventData<T = 'keydown' | 'keypress' | 'keyup'> = {
  type: T;
  timeStamp: number;
  isTrusted: boolean;
  key: string | null;
  keyCode: number | null;
  which: number | null;
  metaKey: boolean;
  ctrlKey: boolean;
  valueHidden: boolean;
  keyIndex: number;
};

type VGSFocusEventData<T = 'focus' | 'blur'> = {
  type: T;
  timeStamp: number;
  isTrusted: boolean;
};

export interface FieldInstance {
  classes: ClassMap;
  container: HTMLElement;
  debugId: string;
  env: string;
  fieldId: string;
  formId: string;
  name: string;
  tnt: string;
  type: FieldType;
  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#field-instance-events
   */
  on(
    eventType: 'keydown',
    callback: (event: VGSKeyboardEventData<'keydown'>) => void
  ): void;
  on(
    eventType: 'keypress',
    callback: (event: VGSKeyboardEventData<'keypress'>) => void
  ): void;
  on(
    eventType: 'keyup',
    callback: (event: VGSKeyboardEventData<'keyup'>) => void
  ): void;
  on(eventType: 'delete', callback: () => void): void;
  on(eventType: 'update', callback: (fieldState: any) => void): void;
  on(
    eventType: 'focus',
    callback: (event: VGSFocusEventData<'focus'>) => void
  ): void;
  on(
    eventType: 'blur',
    callback: (event: VGSFocusEventData<'blur'>) => void
  ): void;

  /**
   * Docs: https://www.verygoodsecurity.com/docs/vgs-collect/js/integration#field-instance-events
   */
  off(
    eventType: 'keydown',
    callback: (event: VGSKeyboardEventData<'keydown'>) => void
  ): void;
  off(
    eventType: 'keypress',
    callback: (event: VGSKeyboardEventData<'keypress'>) => void
  ): void;
  off(
    eventType: 'keyup',
    callback: (event: VGSKeyboardEventData<'keyup'>) => void
  ): void;
  off(eventType: 'delete', callback: () => void): void;
  off(eventType: 'update', callback: (fieldState: any) => void): void;
  off(
    eventType: 'focus',
    callback: (event: VGSFocusEventData<'focus'>) => void
  ): void;
  off(
    eventType: 'blur',
    callback: (event: VGSFocusEventData<'blur'>) => void
  ): void;
  off(eventType: 'update', callback: (fieldState: any) => void): void;
}
