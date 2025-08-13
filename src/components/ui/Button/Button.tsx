'use client';

import { useDesignSystem } from '@/lib/hooks';
import { colors as brandColors } from '@/components/system/BrandThemeProvider/BrandThemeProvider';
import MuiButton from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Button component props interface
 */
export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button color scheme */
  colorVariant?: 'primary' | 'secondary';
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
 * A versatile button component built on Material-UI Button with custom Four Loop branding.
 * Provides multiple variants, sizes, and states while maintaining consistent theme integration.
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
 *
 * // Secondary color variant for light backgrounds
 * <Button variant="primary" colorVariant="secondary">Dark on Light</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      colorVariant = 'primary',
      size = 'md',
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
    const { colors, spacing, typography } = useDesignSystem();

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Map our custom sizes to MUI sizes
    const muiSizeMap = {
      sm: 'small' as const,
      md: 'medium' as const,
      lg: 'large' as const,
    };

    // Map our custom variants to MUI variants
    const getMuiVariant = (): 'text' | 'outlined' | 'contained' => {
      switch (variant) {
        case 'primary':
          return 'outlined';
        case 'secondary':
          return 'contained';
        case 'outline':
          return 'outlined';
        case 'ghost':
          return 'text';
        default:
          return 'outlined';
      }
    };

    // Get color scheme based on colorVariant
    const colorScheme =
      colorVariant === 'secondary'
        ? {
            borderColor: brandColors.textDark,
            textColor: brandColors.textDark,
            hoverBackground: brandColors.textDark,
            hoverText: brandColors.textLight,
          }
        : {
            borderColor: colors.text.inverse,
            textColor: colors.text.inverse,
            hoverBackground: colors.background.accent,
            hoverText: colors.text.primary,
          };

    // Handle primary variant with integrated ButtonPrimary functionality
    if (variant === 'primary') {
      const primaryButtonSx: SxProps<Theme> = {
        backgroundColor: 'transparent',
        border: `1px solid ${colorScheme.borderColor}`,
        borderRadius: '30px',
        color: colorScheme.textColor,
        fontFamily: typography.fontFamily.primary,
        fontWeight: 500,
        textTransform: 'none',
        minHeight: 'auto',
        padding: 0,
        '&:hover': {
          backgroundColor: colorScheme.hoverBackground,
          color: colorScheme.hoverText,
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
          variant={getMuiVariant()}
          size={muiSizeMap[size]}
          disabled={disabled || loading}
          fullWidth={fullWidth}
          sx={primaryButtonSx}
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
              backgroundColor:
                colorVariant === 'secondary'
                  ? brandColors.textDark
                  : colors.background.accent,
              color:
                colorVariant === 'secondary'
                  ? brandColors.textLight
                  : colors.text.primary,
              flexShrink: 0,
            }}
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
      ...(variant === 'secondary' && {
        backgroundColor: colors.background.secondary,
        color: colors.text.inverse,
        '&:hover': {
          backgroundColor: colors.background.secondary,
          opacity: 0.9,
        },
      }),
      ...(variant === 'outline' && {
        border: `1px solid ${colors.text.muted}`,
        color: colors.text.inverse,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }),
      ...(variant === 'ghost' && {
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
        variant={getMuiVariant()}
        size={muiSizeMap[size]}
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
