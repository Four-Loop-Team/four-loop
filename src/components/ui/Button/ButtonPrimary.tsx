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
 * ```
 */
const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  ({ children, className = '', disabled, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Use only SCSS utility classes - no Tailwind
    const wrapperClasses = [
      'btn-primary',
      disabled && 'opacity-60 cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // CTA and arrow classes using SCSS utilities only
    const ctaClasses = 'inline-block py-em-02 px-em-18 font-medium';
    const arrowClasses =
      'inline-flex items-center justify-center rounded-full p-6px mr-neg-15px';

    return (
      <button
        ref={ref}
        className={wrapperClasses}
        disabled={disabled}
        {...props}
      >
        <span className={ctaClasses}>{children}</span>
        <span className={arrowClasses}>
          {isMounted ? <EastIcon fontSize='small' /> : <span>→</span>}
        </span>
      </button>
    );
  }
);

ButtonPrimary.displayName = 'ButtonPrimary';

export default ButtonPrimary;
