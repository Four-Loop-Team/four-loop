import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import ButtonPrimary from './ButtonPrimary';

/**
 * Button component props interface
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Shows loading spinner when true */
  loading?: boolean;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Makes button full width when true */
  fullWidth?: boolean;
}

/**
 * A versatile button component with multiple variants, sizes, and states.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary">Click me</Button>
 *
 * // With loading state
 * <Button loading>Loading...</Button>
 *
 * // Full width button
 * <Button fullWidth>Full Width</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Use ButtonPrimary for primary variant to maintain CTA styling
    if (variant === 'primary') {
      return (
        <ButtonPrimary
          ref={ref}
          size={size}
          loading={loading}
          fullWidth={fullWidth}
          disabled={disabled}
          className={className}
          {...props}
        >
          {children}
        </ButtonPrimary>
      );
    }

    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline:
        'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
    };

    const sizeClasses = {
      sm: 'px-4 py-3 text-sm min-w-[44px] min-h-[44px]', // Updated for 44px min touch target
      md: 'px-6 py-3 text-base min-w-[44px] min-h-[44px]', // Updated for 44px min touch target
      lg: 'px-8 py-4 text-lg min-w-[44px] min-h-[44px]', // Updated for 44px min touch target
    };

    const classes = [
      baseClasses,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      variantClasses[variant as keyof typeof variantClasses] || '',
      sizeClasses[size],
      fullWidth && 'w-full',
      (disabled ?? loading) && 'opacity-50 cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && (
          <svg
            className='animate-spin -ml-1 mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {leftIcon && !loading && <span className='mr-2'>{leftIcon}</span>}
        {children}
        {rightIcon && <span className='ml-2'>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
