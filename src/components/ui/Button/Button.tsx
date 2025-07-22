'use client';

import { useDesignSystem } from '@/lib/hooks';
import EastIcon from '@mui/icons-material/East';
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react';

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
    const [isMounted, setIsMounted] = useState(false);
    const { colors, spacing, typography } = useDesignSystem();

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Handle primary variant with integrated ButtonPrimary functionality
    if (variant === 'primary') {
      // Primary button styles using design system tokens
      const buttonStyles: React.CSSProperties = {
        backgroundColor: 'transparent',
        border: `1px solid ${colors.text.inverse}`,
        borderRadius: '30px',
        color: colors.text.inverse,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
        opacity: disabled ? 0.6 : 1,
        fontFamily: typography.fontFamily.primary,
        textDecoration: 'none',
        outline: 'none',
        padding: 0,
      };

      // CTA and arrow styles using inline styles instead of classes
      const ctaStyles = {
        display: 'inline-block',
        paddingTop: '0.2em',
        paddingBottom: '0.2em',
        paddingLeft: '1.8em',
        paddingRight: '1.8em',
        fontWeight: 500,
      };

      // Arrow container with correct sizing to match button height
      const arrowStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '42px',
        height: '42px',
        backgroundColor: colors.background.accent,
        color: colors.text.primary,
        flexShrink: 0,
      };

      return (
        <button
          ref={ref}
          style={buttonStyles}
          disabled={disabled}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = colors.background.accent;
              e.currentTarget.style.color = colors.text.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.text.inverse;
            }
          }}
          {...props}
        >
          <span style={ctaStyles}>{children}</span>
          <span style={arrowStyles}>
            {isMounted ? <EastIcon fontSize='small' /> : <span>→</span>}
          </span>
        </button>
      );
    }

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: typography.fontWeight.medium,
      borderRadius: spacing.component.sm, // 8px
      transition: 'all 0.2s ease-in-out',
      border: 'none',
      cursor: 'pointer',
      fontFamily: typography.fontFamily.primary,
      textDecoration: 'none',
      outline: 'none',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      secondary: {
        backgroundColor: colors.background.secondary,
        color: colors.text.inverse,
      },
      outline: {
        border: `1px solid ${colors.text.muted}`,
        color: colors.text.inverse,
        backgroundColor: 'transparent',
      },
      ghost: {
        color: colors.text.inverse,
        backgroundColor: 'transparent',
      },
    };

    const sizeStyles = {
      sm: {
        padding: `${spacing.component.sm} ${spacing.component.md}`,
        fontSize: typography.fontSize.sm,
        minWidth: '44px',
        minHeight: '44px',
      },
      md: {
        padding: `${spacing.component.lg} ${spacing.component.xl}`,
        fontSize: typography.fontSize.base,
        minWidth: '44px',
        minHeight: '44px',
      },
      lg: {
        padding: `${spacing.component.xl} ${spacing.layout.xs}`,
        fontSize: typography.fontSize.lg,
        minWidth: '44px',
        minHeight: '44px',
      },
    };

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(fullWidth && { width: '100%' }),
      ...((disabled ?? loading) && {
        opacity: 0.5,
        cursor: 'not-allowed',
      }),
    };

    return (
      <button
        ref={ref}
        style={combinedStyles}
        className={className}
        disabled={disabled ?? loading}
        {...props}
      >
        {' '}
        {loading && (
          <svg
            style={{
              marginLeft: '-4px',
              marginRight: spacing.component.sm,
              height: '16px',
              width: '16px',
            }}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='button-icon-opacity-disabled'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='button-icon-opacity-loading'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {leftIcon && !loading && (
          <span style={{ marginRight: spacing.component.sm }}>{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span style={{ marginLeft: spacing.component.sm }}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
