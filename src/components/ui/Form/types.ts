/**
 * Form wrapper component types and interfaces
 */

export interface FormField {
  name: string;
  label?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'file'
    | 'hidden';
  placeholder?: string;
  defaultValue?: unknown;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  validation?: {
    required?: boolean | string;
    minLength?: number | { value: number; message: string };
    maxLength?: number | { value: number; message: string };
    min?: number | { value: number; message: string };
    max?: number | { value: number; message: string };
    pattern?: RegExp | { value: RegExp; message: string };
    custom?: (value: unknown) => string | boolean;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  description?: string;
  rows?: number; // for textarea
  multiple?: boolean; // for select and file
  accept?: string; // for file input
}

export interface FormValues {
  [key: string]: unknown;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export interface FormProps {
  /** Form fields configuration */
  fields?: FormField[];
  /** Initial form values */
  initialValues?: FormValues;
  /** Form validation schema */
  validationSchema?: (values: FormValues) => FormErrors;
  /** Form submission handler */
  onSubmit?: (values: FormValues, formState: FormState) => void | Promise<void>;
  /** Form change handler */
  onChange?: (values: FormValues, formState: FormState) => void;
  /** Form validation handler */
  onValidate?: (values: FormValues) => FormErrors;
  /** Form reset handler */
  onReset?: () => void;
  /** Form layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Form size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether form is disabled */
  disabled?: boolean;
  /** Form class name */
  className?: string;
  /** Form children (for custom layout) */
  children?:
    | React.ReactNode
    | ((formState: FormState, helpers: FormHelpers) => React.ReactNode);
  /** Submit button text */
  submitText?: string;
  /** Reset button text */
  resetText?: string;
  /** Show submit button */
  showSubmit?: boolean;
  /** Show reset button */
  showReset?: boolean;
  /** Form variant */
  variant?: 'default' | 'card' | 'inline';
  /** Auto-save configuration */
  autoSave?: {
    enabled: boolean;
    delay?: number;
    key?: string;
  };
  /** Test ID */
  'data-testid'?: string;
}

export interface FormHelpers {
  /** Set field value */
  setFieldValue: (name: string, value: unknown) => void;
  /** Set field error */
  setFieldError: (name: string, error: string) => void;
  /** Set field touched */
  setFieldTouched: (name: string, touched: boolean) => void;
  /** Set multiple field values */
  setValues: (values: Partial<FormValues>) => void;
  /** Set multiple field errors */
  setErrors: (errors: Partial<FormErrors>) => void;
  /** Set form submitting state */
  setSubmitting: (submitting: boolean) => void;
  /** Reset form */
  resetForm: () => void;
  /** Validate form */
  validateForm: () => Promise<FormErrors>;
  /** Validate field */
  validateField: (name: string) => Promise<string>;
  /** Submit form programmatically */
  submitForm: () => Promise<void>;
  /** Get field props */
  getFieldProps: (name: string) => {
    name: string;
    value: unknown;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    onBlur: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    error?: string;
    touched?: boolean;
  };
}

export interface FormFieldProps {
  /** Field configuration */
  field: FormField;
  /** Field value */
  value: unknown;
  /** Field error */
  error?: string;
  /** Field touched state */
  touched?: boolean;
  /** Field change handler */
  onChange: (value: unknown) => void;
  /** Field blur handler */
  onBlur: () => void;
  /** Form layout */
  layout: 'vertical' | 'horizontal' | 'inline';
  /** Form size */
  size: 'sm' | 'md' | 'lg';
  /** Whether form is disabled */
  disabled: boolean;
}

export interface MultiStepFormProps {
  /** Form steps configuration */
  steps: Array<{
    title: string;
    description?: string;
    fields: FormField[];
    validation?: (values: FormValues) => FormErrors;
  }>;
  /** Initial form values */
  initialValues?: FormValues;
  /** Form submission handler */
  onSubmit?: (values: FormValues) => void | Promise<void>;
  /** Step change handler */
  onStepChange?: (step: number, values: FormValues) => void;
  /** Form completion handler */
  onComplete?: (values: FormValues) => void;
  /** Whether to allow navigation to previous steps */
  allowBackward?: boolean;
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
  /** Whether to show progress bar */
  showProgress?: boolean;
  /** Form size */
  size?: 'sm' | 'md' | 'lg';
  /** Form class name */
  className?: string;
  /** Submit button text */
  submitText?: string;
  /** Previous button text */
  previousText?: string;
  /** Next button text */
  nextText?: string;
  /** Test ID */
  'data-testid'?: string;
}

export interface MultiStepFormState {
  currentStep: number;
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  completedSteps: Set<number>;
}
