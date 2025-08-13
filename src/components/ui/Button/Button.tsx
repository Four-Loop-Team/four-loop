'use client';

import { useDesignSystem } from '@/lib/hooks';
import EastIcon from '@mui/icons-material/East';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import React, { forwardRef, useEffect, useState } from 'react';

/**
 * Button component props interface
 */
export interface ButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  /** Button variant style */
  variant?: 'outlined' | 'contained' | 'text';
  /** Button color scheme */
  color?: 'light' | 'dark';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
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
 * A versatile button component built on Material-UI Button with custom Four Loop branding.
 * Provides multiple variants, sizes, and states while maintaining consistent theme integration.
 *
 * @component
 * @example
 * ```tsx
 * // Basic outlined button (default)
 * <Button variant="outlined">Click me</Button>
 *
 * // Contained button
 * <Button variant="contained">Contained Button</Button>
 *
 * // Text button
 * <Button variant="text">Text Button</Button>
 *
 * // With loading state
 * <Button loading>Loading...</Button>
 *
 * // Different sizes
 * <Button size="small">Small Button</Button>
 * <Button size="medium">Medium Button</Button>
 * <Button size="large">Large Button</Button>
 *
 * // Full width button
 * <Button fullWidth>Full Width</Button>
 *
 * // Secondary color variant for light backgrounds
 * <Button variant="outlined" color="dark">Dark on Light</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'outlined',
      color = 'light',
      size = 'medium',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      sx,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { colors, spacing, typography } = useDesignSystem();

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Get color scheme based on color
    const colorScheme =
      color === 'dark'
        ? {
            borderColor: colors.text.primary,
            textColor: colors.text.primary,
            backgroundColor: colors.background.accent,
          }
        : {
            borderColor: colors.text.inverse,
            textColor: colors.text.inverse,
            backgroundColor: colors.background.primary,
          };

    // Handle outlined variant with integrated ButtonPrimary functionality
    if (variant === 'outlined') {
      const arrowBackgroundColor = isHovered
        ? color === 'dark'
          ? colors.background.accent
          : colors.background.inverse
        : color === 'dark'
          ? colors.text.primary
          : colors.background.accent;

      const arrowColor =
        isHovered && color === 'dark'
          ? colors.text.primary
          : color === 'dark'
            ? colors.text.inverse
            : colors.text.primary;

      const arrowBorder =
        color === 'dark'
          ? `1px solid ${colors.border.default}`
          : `1px solid ${colors.border.inverse}`;

      const arrowMargin = '-1px -1px -1px 0';

      const primaryButtonSx: SxProps<Theme> = {
        backgroundColor: colorScheme.backgroundColor,
        border: `1px solid ${colorScheme.borderColor}`,
        borderRadius: '30px',
        color: colorScheme.textColor,
        fontFamily: typography.fontFamily.primary,
        fontWeight: 500,
        textTransform: 'none',
        minHeight: 'auto',
        padding: 0,
        '&:hover': {
          borderColor: colorScheme.borderColor,
        },
        '&:disabled': {
          opacity: 0.6,
          color: colorScheme.textColor,
          borderColor: colorScheme.borderColor,
        },
        ...(fullWidth && { width: '100%' }),
        ...sx,
      };

      return (
        <MuiButton
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          fullWidth={fullWidth}
          sx={primaryButtonSx}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <span
            style={{
              display: 'inline-block',
              paddingTop: '0.2em',
              paddingBottom: '0.2em',
              paddingLeft: '1.8em',
              paddingRight: '1.8em',
            }}
          >
            {children}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              backgroundColor: arrowBackgroundColor,
              color: arrowColor,
              border: arrowBorder,
              margin: arrowMargin,
              flexShrink: 0,
              transition:
                'background-color 0.2s ease, color 0.2s ease, border 0.2s ease',
            }}
            className='button-arrow'
          >
            {isMounted ? <EastIcon fontSize='small' /> : <span>→</span>}
          </span>
        </MuiButton>
      );
    }

    // For other variants, use MUI Button with custom styling
    const customButtonSx: SxProps<Theme> = {
      fontWeight: typography.fontWeight.medium,
      borderRadius: spacing.component.sm,
      fontFamily: typography.fontFamily.primary,
      textTransform: 'none',
      minWidth: '44px',
      minHeight: '44px',
      ...(variant === 'contained' && {
        backgroundColor: colors.background.secondary,
        color: colors.text.inverse,
        '&:hover': {
          backgroundColor: colors.background.secondary,
          opacity: 0.9,
        },
      }),
      ...(variant === 'text' && {
        color: colors.text.inverse,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }),
      ...(fullWidth && { width: '100%' }),
      ...((disabled || loading) && {
        opacity: 0.5,
      }),
      ...sx,
    };

    return (
      <MuiButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        sx={customButtonSx}
        {...props}
      >
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
              style={{ opacity: 0.25 }}
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              style={{ opacity: 0.75 }}
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
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
