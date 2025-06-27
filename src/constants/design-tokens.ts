/**
 * Design Tokens - CSS Custom Properties for Runtime Theme Switching
 * This creates CSS variables that can be dynamically updated for theme switching
 */

import { DARK_THEME, ELEVATION, LIGHT_THEME, Z_INDEX } from './colors';
import { SPACING_CSS_VARS } from './spacing';
import { FONT_FAMILIES, FONT_WEIGHTS, TYPOGRAPHY_SCALE } from './typography';

// Color CSS Variables
export const COLOR_CSS_VARS = {
  light: {
    // Background variables
    '--color-background-primary': LIGHT_THEME.background.primary,
    '--color-background-secondary': LIGHT_THEME.background.secondary,
    '--color-background-tertiary': LIGHT_THEME.background.tertiary,
    '--color-background-elevated': LIGHT_THEME.background.elevated,
    '--color-background-overlay': LIGHT_THEME.background.overlay,

    // Surface variables
    '--color-surface-primary': LIGHT_THEME.surface.primary,
    '--color-surface-secondary': LIGHT_THEME.surface.secondary,
    '--color-surface-tertiary': LIGHT_THEME.surface.tertiary,
    '--color-surface-elevated': LIGHT_THEME.surface.elevated,
    '--color-surface-inverse': LIGHT_THEME.surface.inverse,

    // Text variables
    '--color-text-primary': LIGHT_THEME.text.primary,
    '--color-text-secondary': LIGHT_THEME.text.secondary,
    '--color-text-tertiary': LIGHT_THEME.text.tertiary,
    '--color-text-disabled': LIGHT_THEME.text.disabled,
    '--color-text-inverse': LIGHT_THEME.text.inverse,
    '--color-text-link': LIGHT_THEME.text.link,
    '--color-text-link-hover': LIGHT_THEME.text.linkHover,

    // Border variables
    '--color-border-primary': LIGHT_THEME.border.primary,
    '--color-border-secondary': LIGHT_THEME.border.secondary,
    '--color-border-focus': LIGHT_THEME.border.focus,
    '--color-border-error': LIGHT_THEME.border.error,
    '--color-border-disabled': LIGHT_THEME.border.disabled,

    // Brand color variables
    '--color-primary-50': LIGHT_THEME.brand.primary[50],
    '--color-primary-100': LIGHT_THEME.brand.primary[100],
    '--color-primary-200': LIGHT_THEME.brand.primary[200],
    '--color-primary-300': LIGHT_THEME.brand.primary[300],
    '--color-primary-400': LIGHT_THEME.brand.primary[400],
    '--color-primary-500': LIGHT_THEME.brand.primary[500],
    '--color-primary-600': LIGHT_THEME.brand.primary[600],
    '--color-primary-700': LIGHT_THEME.brand.primary[700],
    '--color-primary-800': LIGHT_THEME.brand.primary[800],
    '--color-primary-900': LIGHT_THEME.brand.primary[900],
    '--color-primary-950': LIGHT_THEME.brand.primary[950],

    // Semantic color variables
    '--color-success': LIGHT_THEME.semantic.success[500],
    '--color-warning': LIGHT_THEME.semantic.warning[500],
    '--color-error': LIGHT_THEME.semantic.error[500],
    '--color-info': LIGHT_THEME.semantic.info[500],
  },

  dark: {
    // Background variables
    '--color-background-primary': DARK_THEME.background.primary,
    '--color-background-secondary': DARK_THEME.background.secondary,
    '--color-background-tertiary': DARK_THEME.background.tertiary,
    '--color-background-elevated': DARK_THEME.background.elevated,
    '--color-background-overlay': DARK_THEME.background.overlay,

    // Surface variables
    '--color-surface-primary': DARK_THEME.surface.primary,
    '--color-surface-secondary': DARK_THEME.surface.secondary,
    '--color-surface-tertiary': DARK_THEME.surface.tertiary,
    '--color-surface-elevated': DARK_THEME.surface.elevated,
    '--color-surface-inverse': DARK_THEME.surface.inverse,

    // Text variables
    '--color-text-primary': DARK_THEME.text.primary,
    '--color-text-secondary': DARK_THEME.text.secondary,
    '--color-text-tertiary': DARK_THEME.text.tertiary,
    '--color-text-disabled': DARK_THEME.text.disabled,
    '--color-text-inverse': DARK_THEME.text.inverse,
    '--color-text-link': DARK_THEME.text.link,
    '--color-text-link-hover': DARK_THEME.text.linkHover,

    // Border variables
    '--color-border-primary': DARK_THEME.border.primary,
    '--color-border-secondary': DARK_THEME.border.secondary,
    '--color-border-focus': DARK_THEME.border.focus,
    '--color-border-error': DARK_THEME.border.error,
    '--color-border-disabled': DARK_THEME.border.disabled,

    // Brand color variables (same as light)
    '--color-primary-50': DARK_THEME.brand.primary[50],
    '--color-primary-100': DARK_THEME.brand.primary[100],
    '--color-primary-200': DARK_THEME.brand.primary[200],
    '--color-primary-300': DARK_THEME.brand.primary[300],
    '--color-primary-400': DARK_THEME.brand.primary[400],
    '--color-primary-500': DARK_THEME.brand.primary[500],
    '--color-primary-600': DARK_THEME.brand.primary[600],
    '--color-primary-700': DARK_THEME.brand.primary[700],
    '--color-primary-800': DARK_THEME.brand.primary[800],
    '--color-primary-900': DARK_THEME.brand.primary[900],
    '--color-primary-950': DARK_THEME.brand.primary[950],

    // Semantic color variables
    '--color-success': DARK_THEME.semantic.success[400],
    '--color-warning': DARK_THEME.semantic.warning[400],
    '--color-error': DARK_THEME.semantic.error[400],
    '--color-info': DARK_THEME.semantic.info[400],
  },
} as const;

// Typography CSS Variables
export const TYPOGRAPHY_CSS_VARS = {
  // Font families
  '--font-family-sans': FONT_FAMILIES.sans.join(', '),
  '--font-family-serif': FONT_FAMILIES.serif.join(', '),
  '--font-family-mono': FONT_FAMILIES.mono.join(', '),

  // Font weights
  '--font-weight-light': FONT_WEIGHTS.light.toString(),
  '--font-weight-regular': FONT_WEIGHTS.regular.toString(),
  '--font-weight-medium': FONT_WEIGHTS.medium.toString(),
  '--font-weight-semibold': FONT_WEIGHTS.semibold.toString(),
  '--font-weight-bold': FONT_WEIGHTS.bold.toString(),

  // Typography scale
  '--typography-display-2xl-size': TYPOGRAPHY_SCALE.display['2xl'].fontSize,
  '--typography-display-xl-size': TYPOGRAPHY_SCALE.display.xl.fontSize,
  '--typography-display-lg-size': TYPOGRAPHY_SCALE.display.lg.fontSize,
  '--typography-display-md-size': TYPOGRAPHY_SCALE.display.md.fontSize,
  '--typography-display-sm-size': TYPOGRAPHY_SCALE.display.sm.fontSize,

  '--typography-heading-2xl-size': TYPOGRAPHY_SCALE.heading['2xl'].fontSize,
  '--typography-heading-xl-size': TYPOGRAPHY_SCALE.heading.xl.fontSize,
  '--typography-heading-lg-size': TYPOGRAPHY_SCALE.heading.lg.fontSize,
  '--typography-heading-md-size': TYPOGRAPHY_SCALE.heading.md.fontSize,
  '--typography-heading-sm-size': TYPOGRAPHY_SCALE.heading.sm.fontSize,
  '--typography-heading-xs-size': TYPOGRAPHY_SCALE.heading.xs.fontSize,

  '--typography-body-2xl-size': TYPOGRAPHY_SCALE.body['2xl'].fontSize,
  '--typography-body-xl-size': TYPOGRAPHY_SCALE.body.xl.fontSize,
  '--typography-body-lg-size': TYPOGRAPHY_SCALE.body.lg.fontSize,
  '--typography-body-md-size': TYPOGRAPHY_SCALE.body.md.fontSize,
  '--typography-body-sm-size': TYPOGRAPHY_SCALE.body.sm.fontSize,
} as const;

// Elevation CSS Variables
export const ELEVATION_CSS_VARS = {
  '--elevation-none': ELEVATION.none,
  '--elevation-xs': ELEVATION.xs,
  '--elevation-sm': ELEVATION.sm,
  '--elevation-md': ELEVATION.md,
  '--elevation-lg': ELEVATION.lg,
  '--elevation-xl': ELEVATION.xl,
  '--elevation-2xl': ELEVATION['2xl'],
  '--elevation-inner': ELEVATION.inner,
} as const;

// Z-Index CSS Variables
export const Z_INDEX_CSS_VARS = {
  '--z-index-hide': Z_INDEX.hide.toString(),
  '--z-index-auto': Z_INDEX.auto,
  '--z-index-base': Z_INDEX.base.toString(),
  '--z-index-docked': Z_INDEX.docked.toString(),
  '--z-index-dropdown': Z_INDEX.dropdown.toString(),
  '--z-index-sticky': Z_INDEX.sticky.toString(),
  '--z-index-banner': Z_INDEX.banner.toString(),
  '--z-index-overlay': Z_INDEX.overlay.toString(),
  '--z-index-modal': Z_INDEX.modal.toString(),
  '--z-index-popover': Z_INDEX.popover.toString(),
  '--z-index-skip-link': Z_INDEX.skipLink.toString(),
  '--z-index-toast': Z_INDEX.toast.toString(),
  '--z-index-tooltip': Z_INDEX.tooltip.toString(),
} as const;

// Combined CSS Variables Object
export const DESIGN_TOKENS_CSS_VARS = {
  ...SPACING_CSS_VARS,
  ...TYPOGRAPHY_CSS_VARS,
  ...ELEVATION_CSS_VARS,
  ...Z_INDEX_CSS_VARS,
} as const;

// Theme Generation Functions
export const generateThemeCSS = (theme: 'light' | 'dark') => {
  const colorVars = COLOR_CSS_VARS[theme];
  const allVars = { ...DESIGN_TOKENS_CSS_VARS, ...colorVars };

  return Object.entries(allVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ');
};

// CSS Variable Utility Functions
export const createCSSVariables = (vars: Record<string, string | number>) => {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => {
      acc[key] = typeof value === 'number' ? value.toString() : value;
      return acc;
    },
    {} as Record<string, string>
  );
};

// Root CSS Generation (for injecting into document)
export const generateRootCSS = (theme: 'light' | 'dark' = 'light') => {
  return `
:root {
  ${generateThemeCSS(theme)}
}

[data-theme="light"] {
  ${generateThemeCSS('light')}
}

[data-theme="dark"] {
  ${generateThemeCSS('dark')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    ${generateThemeCSS('dark')}
  }
}
`;
};

// Type definitions
export type ColorCSSVar = keyof typeof COLOR_CSS_VARS.light;
export type TypographyCSSVar = keyof typeof TYPOGRAPHY_CSS_VARS;
export type SpacingCSSVar = keyof typeof SPACING_CSS_VARS;
export type ElevationCSSVar = keyof typeof ELEVATION_CSS_VARS;
export type ZIndexCSSVar = keyof typeof Z_INDEX_CSS_VARS;
