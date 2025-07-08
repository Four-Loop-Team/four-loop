'use client';

import EastIcon from '@mui/icons-material/East';
import React from 'react';
import styles from './ButtonPrimary.module.scss';

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
const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={`${styles.wrapper} ${className}`} {...props}>
      <span className={styles.cta}>{children}</span>
      <span className={styles.arrow}>
        <EastIcon />
      </span>
    </button>
  );
};

export default ButtonPrimary;
