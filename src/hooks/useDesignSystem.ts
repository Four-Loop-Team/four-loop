/**
 * @fileoverview Design System Hook - Centralized access to design tokens
 *
 * This hook provides a consistent interface for accessing design tokens
 * throughout the component system. It bridges the gap between TypeScript
 * tokens, SCSS variables, and CSS custom properties.
 */

import {
  ANIMATION_TOKENS,
  BORDER_RADIUS_TOKENS,
  BRAND_COLORS,
  COLOR_TOKENS,
  COMPONENT_TOKENS,
  DesignSystemUtils,
  SEMANTIC_SPACING,
  SHADOW_TOKENS,
  SPACING_TOKENS,
  TYPOGRAPHY_TOKENS,
  Z_INDEX_TOKENS,
} from '@/constants/design-tokens-consolidated';

/**
 * Design system hook providing centralized access to all design tokens
 *
 * @example
 * ```tsx
 * const { colors, spacing, typography, radius, shadows } = useDesignSystem();
 *
 * const styles = {
 *   backgroundColor: colors.background.primary,
 *   padding: spacing.component.md,
 *   borderRadius: radius.button,
 *   boxShadow: shadows.card,
 * };
 * ```
 */
export const useDesignSystem = () => {
  return {
    // Brand colors - direct access to 4-color palette
    brand: BRAND_COLORS,

    // Semantic colors - usage-based tokens
    colors: COLOR_TOKENS,

    // Spacing system - 8px grid with semantic layers
    spacing: {
      base: SPACING_TOKENS,
      semantic: SEMANTIC_SPACING,
      // Convenient shortcuts for common usage
      component: SEMANTIC_SPACING.component,
      layout: SEMANTIC_SPACING.layout,
      section: SEMANTIC_SPACING.section,
      micro: SEMANTIC_SPACING.micro,
    },

    // Typography system
    typography: TYPOGRAPHY_TOKENS,

    // Border radius tokens
    radius: BORDER_RADIUS_TOKENS,

    // Shadow system
    shadows: SHADOW_TOKENS,

    // Animation tokens
    animation: ANIMATION_TOKENS,

    // Z-index system
    zIndex: Z_INDEX_TOKENS,

    // Component-specific tokens
    components: COMPONENT_TOKENS,

    // Utility functions
    utils: DesignSystemUtils,
  };
};

/**
 * CSS-in-JS styles hook - converts tokens to CSS custom properties
 * Use this when you need CSS custom properties for runtime theming
 *
 * @example
 * ```tsx
 * const cssVars = useDesignSystemCSS();
 *
 * const styles = {
 *   backgroundColor: cssVars['--color-bg-primary'],
 *   padding: cssVars['--spacing-md'],
 * };
 * ```
 */
export const useDesignSystemCSS = () => {
  return {
    // Colors
    '--color-text-primary': COLOR_TOKENS.text.primary,
    '--color-text-inverse': COLOR_TOKENS.text.inverse,
    '--color-text-accent': COLOR_TOKENS.text.accent,
    '--color-text-muted': COLOR_TOKENS.text.muted,

    '--color-bg-primary': COLOR_TOKENS.background.primary,
    '--color-bg-secondary': COLOR_TOKENS.background.secondary,
    '--color-bg-accent': COLOR_TOKENS.background.accent,
    '--color-bg-inverse': COLOR_TOKENS.background.inverse,

    '--color-border-default': COLOR_TOKENS.border.default,
    '--color-border-accent': COLOR_TOKENS.border.accent,
    '--color-border-muted': COLOR_TOKENS.border.muted,

    '--color-success': COLOR_TOKENS.state.success,
    '--color-warning': COLOR_TOKENS.state.warning,
    '--color-error': COLOR_TOKENS.state.error,
    '--color-info': COLOR_TOKENS.state.info,

    // Spacing
    '--spacing-xs': SPACING_TOKENS.xs,
    '--spacing-sm': SPACING_TOKENS.sm,
    '--spacing-md': SPACING_TOKENS.md,
    '--spacing-lg': SPACING_TOKENS.lg,
    '--spacing-xl': SPACING_TOKENS.xl,
    '--spacing-2xl': SPACING_TOKENS['2xl'],
    '--spacing-3xl': SPACING_TOKENS['3xl'],

    // Typography
    '--font-size-xs': TYPOGRAPHY_TOKENS.fontSize.xs,
    '--font-size-sm': TYPOGRAPHY_TOKENS.fontSize.sm,
    '--font-size-base': TYPOGRAPHY_TOKENS.fontSize.base,
    '--font-size-lg': TYPOGRAPHY_TOKENS.fontSize.lg,
    '--font-size-xl': TYPOGRAPHY_TOKENS.fontSize.xl,
    '--font-size-2xl': TYPOGRAPHY_TOKENS.fontSize['2xl'],
    '--font-size-3xl': TYPOGRAPHY_TOKENS.fontSize['3xl'],
    '--font-size-4xl': TYPOGRAPHY_TOKENS.fontSize['4xl'],

    '--font-weight-light': TYPOGRAPHY_TOKENS.fontWeight.light,
    '--font-weight-normal': TYPOGRAPHY_TOKENS.fontWeight.normal,
    '--font-weight-medium': TYPOGRAPHY_TOKENS.fontWeight.medium,
    '--font-weight-semibold': TYPOGRAPHY_TOKENS.fontWeight.semibold,
    '--font-weight-bold': TYPOGRAPHY_TOKENS.fontWeight.bold,

    // Border Radius
    '--border-radius-sm': BORDER_RADIUS_TOKENS.sm,
    '--border-radius-md': BORDER_RADIUS_TOKENS.md,
    '--border-radius-lg': BORDER_RADIUS_TOKENS.lg,
    '--border-radius-xl': BORDER_RADIUS_TOKENS.xl,
    '--border-radius-full': BORDER_RADIUS_TOKENS.full,
    '--border-radius-button': BORDER_RADIUS_TOKENS.button,
    '--border-radius-card': BORDER_RADIUS_TOKENS.card,
    '--border-radius-input': BORDER_RADIUS_TOKENS.input,

    // Shadows
    '--shadow-sm': SHADOW_TOKENS.sm,
    '--shadow-md': SHADOW_TOKENS.md,
    '--shadow-lg': SHADOW_TOKENS.lg,
    '--shadow-xl': SHADOW_TOKENS.xl,
    '--shadow-button': SHADOW_TOKENS.button,
    '--shadow-card': SHADOW_TOKENS.card,
    '--shadow-modal': SHADOW_TOKENS.modal,

    // Z-Index
    '--z-index-dropdown': Z_INDEX_TOKENS.dropdown,
    '--z-index-modal': Z_INDEX_TOKENS.modal,
    '--z-index-tooltip': Z_INDEX_TOKENS.tooltip,
    '--z-index-toast': Z_INDEX_TOKENS.toast,
  };
};

/**
 * Material-UI theme integration hook
 * Provides design tokens in a format compatible with Material-UI theming
 *
 * @example
 * ```tsx
 * const muiTheme = useDesignSystemMUI();
 *
 * <Box sx={{
 *   backgroundColor: muiTheme.palette.background.primary,
 *   padding: muiTheme.spacing.component.md,
 * }}>
 * ```
 */
export const useDesignSystemMUI = () => {
  return {
    palette: {
      primary: {
        main: BRAND_COLORS.primary,
      },
      secondary: {
        main: BRAND_COLORS.secondary,
      },
      background: {
        primary: COLOR_TOKENS.background.primary,
        secondary: COLOR_TOKENS.background.secondary,
        inverse: COLOR_TOKENS.background.inverse,
      },
      text: {
        primary: COLOR_TOKENS.text.primary,
        secondary: COLOR_TOKENS.text.muted,
        inverse: COLOR_TOKENS.text.inverse,
      },
      error: {
        main: COLOR_TOKENS.state.error,
      },
      warning: {
        main: COLOR_TOKENS.state.warning,
      },
      success: {
        main: COLOR_TOKENS.state.success,
      },
      info: {
        main: COLOR_TOKENS.state.info,
      },
    },
    spacing: SEMANTIC_SPACING,
    typography: {
      fontFamily: 'var(--font-poppins), sans-serif',
      fontSize: TYPOGRAPHY_TOKENS.fontSize,
      fontWeight: TYPOGRAPHY_TOKENS.fontWeight,
      lineHeight: TYPOGRAPHY_TOKENS.lineHeight,
    },
    shape: {
      borderRadius: BORDER_RADIUS_TOKENS.md,
    },
    shadows: SHADOW_TOKENS,
    zIndex: Z_INDEX_TOKENS,
  };
};

/**
 * SCSS class name utilities
 * Provides consistent class names that map to generated SCSS variables
 */
export const useDesignSystemClasses = () => {
  return {
    // Text colors
    text: {
      primary: 'text-primary',
      inverse: 'text-inverse',
      accent: 'text-accent',
      muted: 'text-muted',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
    },

    // Background colors
    bg: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      inverse: 'bg-inverse',
      surface: 'bg-surface',
    },

    // Spacing utilities
    spacing: {
      p: {
        xs: 'p-xs',
        sm: 'p-sm',
        md: 'p-md',
        lg: 'p-lg',
        xl: 'p-xl',
      },
      m: {
        xs: 'm-xs',
        sm: 'm-sm',
        md: 'm-md',
        lg: 'm-lg',
        xl: 'm-xl',
      },
      px: {
        xs: 'px-xs',
        sm: 'px-sm',
        md: 'px-md',
        lg: 'px-lg',
        xl: 'px-xl',
      },
      py: {
        xs: 'py-xs',
        sm: 'py-sm',
        md: 'py-md',
        lg: 'py-lg',
        xl: 'py-xl',
      },
    },

    // Typography
    typography: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
      },
      weight: {
        light: 'font-light',
        normal: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },

    // Border radius
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },

    // Shadows
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },

    // Layout
    layout: {
      flex: 'flex',
      grid: 'grid',
      block: 'block',
      inlineBlock: 'inline-block',
      hidden: 'hidden',
    },

    // Component presets
    components: {
      btn: 'btn',
      btnSm: 'btn btn-sm',
      btnMd: 'btn btn-md',
      btnLg: 'btn btn-lg',
      btnPrimary: 'btn btn-primary',
      btnSecondary: 'btn btn-secondary',
      card: 'card',
      cardElevated: 'card card-elevated',
      input: 'design-system-input',
    },
  };
};

export default useDesignSystem;
