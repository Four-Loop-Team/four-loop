'use client';

import EastIcon from '@mui/icons-material/East';
import React, { forwardRef, useEffect, useState } from 'react';

/**
 * ButtonPrimary component props interface
 */
export interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to display in the button */
  children: React.ReactNode;
  /** Custom className for additional styling */
  className?: string;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Shows loading spinner when true */
  loading?: boolean;
  /** Makes button full width when true */
  fullWidth?: boolean;
}

/**
 * A specialized primary button component with an arrow icon for call-to-action purposes.
 * Features a rounded design with a hover effect that inverts the arrow colors.
 * Uses client-side mounting to prevent hydration mismatches with MUI icons.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonPrimary>Let's Collaborate</ButtonPrimary>
 *
 * // With click handler
 * <ButtonPrimary onClick={() => console.log('clicked')}>
 *   Get Started
 * </ButtonPrimary>
 *
 * // Custom styling
 * <ButtonPrimary className="custom-button">
 *   Contact Us
 * </ButtonPrimary>
 *
 * // Different sizes
 * <ButtonPrimary size="lg">Large Button</ButtonPrimary>
 *
 * // With loading state
 * <ButtonPrimary loading>Loading...</ButtonPrimary>
 * ```
 */
const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  (
    {
      children,
      className = '',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const baseClasses =
      'border border-gray-900 rounded-full cursor-pointer bg-transparent inline-flex items-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

    const sizeClasses = {
      sm: 'text-sm min-w-[44px] min-h-[44px]',
      md: 'text-base min-w-[44px] min-h-[44px]',
      lg: 'text-lg min-w-[44px] min-h-[44px]',
    };

    const ctaSizeClasses = {
      sm: 'py-1 px-4',
      md: 'py-2 px-6',
      lg: 'py-3 px-8',
    };

    const arrowSizeClasses = {
      sm: 'p-1.5 w-6 h-6',
      md: 'p-1.5 w-8 h-8',
      lg: 'p-2 w-10 h-10',
    };

    const classes = [
      baseClasses,
      sizeClasses[size],
      fullWidth && 'w-full',
      (disabled ?? loading) && 'opacity-60 cursor-not-allowed',
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
        <span
          className={`inline-block font-medium text-gray-900 ${ctaSizeClasses[size]}`}
        >
          {children}
        </span>
        <span
          className={`inline-flex items-center justify-center -mr-0.5 rounded-full text-white bg-blue-600 transition-all duration-200 ease-in-out group-hover:text-blue-600 group-hover:bg-white hover:text-blue-600 hover:bg-white ${arrowSizeClasses[size]}`}
        >
          {isMounted ? <EastIcon fontSize='small' /> : <span>→</span>}
        </span>
      </button>
    );
  }
);

ButtonPrimary.displayName = 'ButtonPrimary';

export default ButtonPrimary;
