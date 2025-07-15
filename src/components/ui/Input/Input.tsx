import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';

/**
 * Input component props interface
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label text */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Input variant style */
  variant?: 'default' | 'filled' | 'outlined';
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Enable multiline textarea mode */
  multiline?: boolean;
  /** Number of rows for textarea (when multiline is true) */
  rows?: number;
}

/**
 * Textarea component props interface
 */
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Input label text */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Input variant style */
  variant?: 'default' | 'filled' | 'outlined';
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Enable multiline textarea mode */
  multiline: true;
  /** Number of rows for textarea */
  rows?: number;
}

/**
 * A comprehensive input component with validation and accessibility features.
 * Supports both single-line inputs and multiline textareas with consistent styling.
 *
 * @component
 * @example
 * ```tsx
 * // Basic input
 * <Input label="Email" placeholder="Enter your email" />
 *
 * // With error state
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password is required"
 * />
 *
 * // Multiline textarea
 * <Input
 *   label="Description"
 *   multiline
 *   rows={4}
 *   placeholder="Tell us about your project..."
 * />
 *
 * // Filled variant with floating label
 * <Input
 *   label="Name"
 *   variant="filled"
 *   placeholder="Enter your name"
 * />
 * ```
 */
const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps | TextareaProps
>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      inputSize = 'md',
      leftIcon,
      rightIcon,
      multiline = false,
      rows = 4,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;
    const isTextarea = multiline;

    const baseClasses =
      'w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';

    const variantClasses = {
      default: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100 focus:bg-gray-50',
      outlined: 'border-2 border-gray-300 bg-white',
    };

    const sizeClasses = {
      sm: isTextarea ? 'px-3 py-2 text-sm' : 'px-3 py-2 text-sm',
      md: isTextarea ? 'px-4 py-3 text-base' : 'px-4 py-2 text-base',
      lg: isTextarea ? 'px-5 py-4 text-lg' : 'px-5 py-3 text-lg',
    };

    const stateClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'focus:border-blue-500';

    // Icon padding only applies to input (not textarea)
    const iconPadding = {
      left:
        !isTextarea && leftIcon
          ? inputSize === 'sm'
            ? 'pl-10'
            : inputSize === 'lg'
              ? 'pl-12'
              : 'pl-11'
          : '',
      right:
        !isTextarea && rightIcon
          ? inputSize === 'sm'
            ? 'pr-10'
            : inputSize === 'lg'
              ? 'pr-12'
              : 'pr-11'
          : '',
    };

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[inputSize],
      stateClasses,
      iconPadding.left,
      iconPadding.right,
      isTextarea ? 'resize-vertical' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            {label}
          </label>
        )}

        <div className='relative'>
          {!isTextarea && leftIcon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <span className='text-gray-400'>{leftIcon}</span>
            </div>
          )}

          {isTextarea ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              id={inputId}
              rows={rows}
              className={inputClasses}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              id={inputId}
              className={inputClasses}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {!isTextarea && rightIcon && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <span className='text-gray-400'>{rightIcon}</span>
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className='mt-1 text-sm text-red-600'>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className='mt-1 text-sm text-gray-500'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
