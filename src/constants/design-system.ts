/**
 * @fileoverview Enhanced Design Token Integration and comprehensive design system constants.
 * Provides a unified system for managing design tokens across themes, components, and layouts
 * with support for animations, spacing, typography, colors, and component-specific tokens.
 */

import {
  BRAND_COLORS,
  CONTEXTUAL_COLORS,
  ELEVATION,
  EXTENDED_SEMANTIC_COLORS,
  FOCUS_STATES,
  SEMANTIC_COLORS,
} from './colors';
import {
  CONTAINER_SPACING,
  SEMANTIC_SPACING,
  SPACING_PRESETS,
  SPACING_SCALE,
} from './spacing';
import {
  FLUID_TYPOGRAPHY,
  FONT_SIZES,
  FONT_WEIGHTS,
  LETTER_SPACING,
  LINE_HEIGHTS,
  TYPOGRAPHY_PRESETS,
  TYPOGRAPHY_SCALE,
} from './typography';

/**
 * Animation and transition tokens for consistent motion design.
 * Provides duration presets, easing functions, and common transition patterns.
 */
export const ANIMATION_TOKENS = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Preset transitions for common UI patterns
  presets: {
    fade: 'opacity 300ms ease-in-out',
    slide: 'transform 300ms ease-out',
    scale: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    color: 'color 150ms ease-in-out, background-color 150ms ease-in-out',
    all: 'all 300ms ease-in-out',
  },
} as const;

/**
 * Border radius tokens for consistent corner rounding across components.
 * Includes both scale-based values and semantic component-specific radii.
 */
export const BORDER_RADIUS_TOKENS = {
  none: '0',
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',

  // Semantic radius values for specific components
  button: '0.375rem',
  card: '0.5rem',
  input: '0.375rem',
  modal: '0.75rem',
  avatar: '9999px',
} as const;

/**
 * Shadow tokens for depth and elevation in the design system.
 * Provides both scale-based shadows and semantic component-specific shadows.
 */
export const SHADOW_TOKENS = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Semantic shadows
  button: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  dropdown:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// Z-Index Tokens
export const Z_INDEX_TOKENS = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 2147483647,
} as const;

// Component Token Groups
export const COMPONENT_TOKENS = {
  button: {
    padding: {
      sm: `${SPACING_SCALE[2]} ${SPACING_SCALE[3]}`,
      md: `${SPACING_SCALE[2.5]} ${SPACING_SCALE[4]}`,
      lg: `${SPACING_SCALE[3]} ${SPACING_SCALE[6]}`,
    },
    fontSize: {
      sm: FONT_SIZES.sm,
      md: FONT_SIZES.base,
      lg: FONT_SIZES.lg,
    },
    borderRadius: BORDER_RADIUS_TOKENS.button,
    transition: ANIMATION_TOKENS.presets.all,
    shadow: SHADOW_TOKENS.button,
  },

  input: {
    padding: {
      sm: `${SPACING_SCALE[2]} ${SPACING_SCALE[3]}`,
      md: `${SPACING_SCALE[2.5]} ${SPACING_SCALE[3.5]}`,
      lg: `${SPACING_SCALE[3]} ${SPACING_SCALE[4]}`,
    },
    fontSize: {
      sm: FONT_SIZES.sm,
      md: FONT_SIZES.base,
      lg: FONT_SIZES.lg,
    },
    borderRadius: BORDER_RADIUS_TOKENS.input,
    transition: ANIMATION_TOKENS.presets.color,
  },

  card: {
    padding: SPACING_PRESETS.card.padding,
    borderRadius: BORDER_RADIUS_TOKENS.card,
    shadow: SHADOW_TOKENS.card,
  },

  modal: {
    borderRadius: BORDER_RADIUS_TOKENS.modal,
    shadow: SHADOW_TOKENS.modal,
    zIndex: Z_INDEX_TOKENS.modal,
  },
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  light: {
    colors: {
      // Surface colors
      'color-surface-primary': '#ffffff',
      'color-surface-secondary': BRAND_COLORS.neutral[50],
      'color-surface-tertiary': BRAND_COLORS.neutral[100],
      'color-surface-inverse': BRAND_COLORS.neutral[900],
      'color-surface-overlay': 'rgba(0, 0, 0, 0.5)',

      // Border colors
      'color-border-default': BRAND_COLORS.neutral[200],
      'color-border-muted': BRAND_COLORS.neutral[100],
      'color-border-emphasis': BRAND_COLORS.neutral[300],
      'color-border-interactive': BRAND_COLORS.primary[400],

      // Text colors
      'color-text-primary': BRAND_COLORS.neutral[900],
      'color-text-secondary': BRAND_COLORS.neutral[600],
      'color-text-tertiary': BRAND_COLORS.neutral[500],
      'color-text-inverse': '#ffffff',
      'color-text-brand': BRAND_COLORS.primary[600],
    },
  },

  dark: {
    colors: {
      // Surface colors
      'color-surface-primary': BRAND_COLORS.neutral[900],
      'color-surface-secondary': BRAND_COLORS.neutral[800],
      'color-surface-tertiary': BRAND_COLORS.neutral[700],
      'color-surface-inverse': '#ffffff',
      'color-surface-overlay': 'rgba(0, 0, 0, 0.7)',

      // Border colors
      'color-border-default': BRAND_COLORS.neutral[700],
      'color-border-muted': BRAND_COLORS.neutral[800],
      'color-border-emphasis': BRAND_COLORS.neutral[600],
      'color-border-interactive': BRAND_COLORS.primary[400],

      // Text colors
      'color-text-primary': '#ffffff',
      'color-text-secondary': BRAND_COLORS.neutral[300],
      'color-text-tertiary': BRAND_COLORS.neutral[400],
      'color-text-inverse': BRAND_COLORS.neutral[900],
      'color-text-brand': BRAND_COLORS.primary[400],
    },
  },
} as const;

/**
 * Create CSS custom properties for a specific theme
 * Generates CSS variable declarations for light or dark theme
 *
 * @param {'light' | 'dark'} theme - The theme to generate CSS for
 * @returns {string} CSS custom properties string
 * @example
 * ```typescript
 * const lightThemeCSS = createThemeCSS('light');
 * // Returns: '  --primary: #e2e891;\n  --secondary: #353535;...'
 * ```
 */
export function createThemeCSS(theme: 'light' | 'dark'): string {
  const themeColors = THEME_CONFIG[theme].colors;

  return Object.entries(themeColors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
}

/**
 * Generate complete CSS custom properties for the design system
 * Creates a comprehensive set of CSS variables for colors, spacing, and typography
 *
 * @returns {string} Complete CSS with all design token variables
 * @example
 * ```typescript
 * const designTokens = generateDesignTokenCSS();
 * // Use in a style tag or CSS file for design system variables
 * ```
 */
export function generateDesignTokenCSS(): string {
  return `
:root {
  /* Colors */
${createThemeCSS('light')}

  /* Spacing */
${Object.entries(SPACING_SCALE)
  .map(([key, value]) => `  --spacing-${key}: ${value};`)
  .join('\n')}

  /* Typography */
${Object.entries(FONT_SIZES)
  .map(([key, value]) => `  --font-size-${key}: ${value};`)
  .join('\n')}

${Object.entries(FONT_WEIGHTS)
  .map(([key, value]) => `  --font-weight-${key}: ${value};`)
  .join('\n')}

  /* Border Radius */
${Object.entries(BORDER_RADIUS_TOKENS)
  .map(([key, value]) => `  --border-radius-${key}: ${value};`)
  .join('\n')}

  /* Shadows */
${Object.entries(SHADOW_TOKENS)
  .map(([key, value]) => `  --shadow-${key}: ${value};`)
  .join('\n')}

  /* Animation */
${Object.entries(ANIMATION_TOKENS.duration)
  .map(([key, value]) => `  --duration-${key}: ${value};`)
  .join('\n')}

${Object.entries(ANIMATION_TOKENS.easing)
  .map(([key, value]) => `  --easing-${key}: ${value};`)
  .join('\n')}

  /* Z-Index */
${Object.entries(Z_INDEX_TOKENS)
  .map(([key, value]) => `  --z-index-${key}: ${value};`)
  .join('\n')}
}

[data-theme="dark"] {
${createThemeCSS('dark')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${createThemeCSS('dark')}
  }
}
`;
}

// Export all tokens as a comprehensive design system
export const DESIGN_SYSTEM = {
  colors: {
    brand: BRAND_COLORS,
    semantic: SEMANTIC_COLORS,
    extended: EXTENDED_SEMANTIC_COLORS,
    contextual: CONTEXTUAL_COLORS,
    elevation: ELEVATION,
    focus: FOCUS_STATES,
  },
  typography: {
    sizes: FONT_SIZES,
    weights: FONT_WEIGHTS,
    lineHeights: LINE_HEIGHTS,
    letterSpacing: LETTER_SPACING,
    semantic: TYPOGRAPHY_SCALE,
    presets: TYPOGRAPHY_PRESETS,
    fluid: FLUID_TYPOGRAPHY,
  },
  spacing: {
    scale: SPACING_SCALE,
    semantic: SEMANTIC_SPACING,
    container: CONTAINER_SPACING,
    presets: SPACING_PRESETS,
  },
  animation: ANIMATION_TOKENS,
  borderRadius: BORDER_RADIUS_TOKENS,
  shadows: SHADOW_TOKENS,
  zIndex: Z_INDEX_TOKENS,
  components: COMPONENT_TOKENS,
  themes: THEME_CONFIG,
} as const;

export type DesignSystem = typeof DESIGN_SYSTEM;
