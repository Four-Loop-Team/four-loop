/**
 * @fileoverview Form component exports
 * @component Form
 *
 * @description
 * Export module for Form components including Form, MultiStepForm, and form-related types.
 * Provides comprehensive form handling with validation, multi-step support, and field management.
 *
 * @example
 * ```tsx
 * import { Form, MultiStepForm } from '@/components/ui/Form';
 * import type { FormField } from '@/components/ui/Form';
 *
 * <Form onSubmit={handleSubmit} validationSchema={schema}>
 *   <input name="email" type="email" required />
 *   <button type="submit">Submit</button>
 * </Form>
 * ```
 */

export { Form, MultiStepForm } from './Form';
export type {
  FormErrors,
  FormField,
  FormFieldProps,
  FormHelpers,
  FormProps,
  FormState,
  FormTouched,
  FormValues,
  MultiStepFormProps,
  MultiStepFormState,
} from './types';
