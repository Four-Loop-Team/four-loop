/**
 * @fileoverview Input component exports
 * @component Input
 *
 * @description
 * Export module for Input component and related types.
 * Provides a flexible input component with validation, styling, and accessibility features.
 *
 * @example
 * ```tsx
 * import { Input } from '@/components/ui/Input';
 * import type { InputProps } from '@/components/ui/Input';
 *
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * />
 * ```
 */

export { default as Input } from './Input';
export type { InputProps, TextareaProps } from './Input';
