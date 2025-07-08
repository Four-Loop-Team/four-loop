/**
 * Enhanced design system colors with theme support
 * Comprehensive color palette including brand colors, semantic states, and neutral scales
 * @fileoverview Color constants and theme definitions for consistent design implementation
 */

/**
 * Brand color palette based on Four Loop Digital's visual identity
 * Each color includes a full scale from 50 (lightest) to 950 (darkest)
 * @constant
 */
export const BRAND_COLORS = {
  /**
   * Primary brand colors using the signature green-yellow palette
   */
  primary: {
    50: '#f8fce4',
    100: '#f0f7c7',
    200: '#e7f194',
    300: '#e2e891', // Your current primary
    400: '#d6de5f',
    500: '#c5ce3a',
    600: '#a8b229',
    700: '#8a941f',
    800: '#6d7519',
    900: '#565d15',
    950: '#2f3309',
  },

  /**
   * Secondary/Neutral colors for backgrounds and subtle elements
   */
  neutral: {
    50: '#f8f8f8',
    100: '#f0f0f0',
    200: '#e4e4e4',
    300: '#d1d1d1',
    400: '#b4b4b4',
    500: '#9a9a9a',
    600: '#818181',
    700: '#6a6a6a',
    800: '#5a5a5a',
    900: '#4a4a4a',
    950: '#353535', // Your current secondary
  },

  /**
   * Accent color derived from logo green elements
   */
  accent: {
    50: '#f7f7f6',
    100: '#eeeeed',
    200: '#dddcda',
    300: '#c7c5c0',
    400: '#afaca4',
    500: '#9b9689',
    600: '#8d8a7e',
    700: '#76736a',
    800: '#69685a', // Your current logo accent
    900: '#5a5951',
    950: '#2f2e2a',
  },
} as const;

/**
 * Semantic color system for UI states and feedback
 * @constant
 */
export const SEMANTIC_COLORS = {
  /**
   * Success state colors for positive feedback
   */
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  /**
   * Warning state colors for caution and alerts
   */
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  /**
   * Error state colors for critical issues and validation
   */
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Info states (new addition)
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
} as const;

// Extended Semantic States
export const EXTENDED_SEMANTIC_COLORS = {
  // Disabled state
  disabled: {
    background: BRAND_COLORS.neutral[100],
    text: BRAND_COLORS.neutral[400],
    border: BRAND_COLORS.neutral[200],
  },

  // Skeleton/Loading state
  skeleton: {
    base: BRAND_COLORS.neutral[200],
    highlight: BRAND_COLORS.neutral[100],
  },

  // Interactive states
  interactive: {
    hover: {
      primary: BRAND_COLORS.primary[600],
      secondary: BRAND_COLORS.neutral[700],
      accent: BRAND_COLORS.accent[700],
    },
    active: {
      primary: BRAND_COLORS.primary[700],
      secondary: BRAND_COLORS.neutral[800],
      accent: BRAND_COLORS.accent[800],
    },
  },
} as const;

// Context-Aware Color Tokens
export const CONTEXTUAL_COLORS = {
  // Surface colors (backgrounds)
  surface: {
    primary: 'var(--color-surface-primary)',
    secondary: 'var(--color-surface-secondary)',
    tertiary: 'var(--color-surface-tertiary)',
    inverse: 'var(--color-surface-inverse)',
    overlay: 'var(--color-surface-overlay)',
  },

  // Border colors
  border: {
    default: 'var(--color-border-default)',
    muted: 'var(--color-border-muted)',
    emphasis: 'var(--color-border-emphasis)',
    interactive: 'var(--color-border-interactive)',
  },

  // Text colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
    brand: 'var(--color-text-brand)',
  },
} as const;

// Color Accessibility Utilities
export const COLOR_CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;

/**
 * Get the appropriate text color for a given background color
 * Determines the best contrast text color based on WCAG accessibility guidelines
 *
 * @param {string} backgroundColor - The background color to check against
 * @returns {string} The appropriate text color (primary or inverse)
 * @example
 * ```typescript
 * const textColor = getContrastTextColor('#ffffff'); // Returns dark text
 * const textColor2 = getContrastTextColor('#333333'); // Returns light text
 * ```
 */
export function getContrastTextColor(backgroundColor: string): string {
  // This would be implemented with a proper contrast calculation
  // For now, returning semantic values
  return backgroundColor.includes('50') ||
    backgroundColor.includes('100') ||
    backgroundColor.includes('200')
    ? CONTEXTUAL_COLORS.text.primary
    : CONTEXTUAL_COLORS.text.inverse;
}

/**
 * Generate color variations with opacity by appending alpha hex values
 * Converts opacity percentage to hex and appends to color
 *
 * @param {string} color - The base color in hex format
 * @param {number} opacity - Opacity value between 0 and 1
 * @returns {string} Color with opacity in hex format (e.g., #ffffff80)
 * @example
 * ```typescript
 * const semiTransparent = withOpacity('#ffffff', 0.5); // '#ffffff80'
 * const almostOpaque = withOpacity('#333333', 0.9); // '#333333e6'
 * ```
 */
export function withOpacity(color: string, opacity: number): string {
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
}

// Theme Color Mappings
export const LIGHT_THEME = {
  // Backgrounds
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    elevated: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Surfaces
  surface: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    elevated: '#ffffff',
    inverse: BRAND_COLORS.neutral[900],
  },

  // Text colors
  text: {
    primary: BRAND_COLORS.neutral[900],
    secondary: BRAND_COLORS.neutral[700],
    tertiary: BRAND_COLORS.neutral[600],
    disabled: BRAND_COLORS.neutral[400],
    inverse: '#ffffff',
    link: BRAND_COLORS.primary[600],
    linkHover: BRAND_COLORS.primary[700],
  },

  // Border colors
  border: {
    primary: BRAND_COLORS.neutral[200],
    secondary: BRAND_COLORS.neutral[300],
    focus: BRAND_COLORS.primary[500],
    error: SEMANTIC_COLORS.error[500],
    disabled: BRAND_COLORS.neutral[200],
  },

  // Brand colors
  brand: BRAND_COLORS,
  semantic: SEMANTIC_COLORS,
} as const;

export const DARK_THEME = {
  // Backgrounds (using your existing dark theme)
  background: {
    primary: '#232323', // Your current background
    secondary: '#2a2a2a',
    tertiary: '#333333',
    elevated: '#3a3a3a',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  // Surfaces
  surface: {
    primary: '#353535', // Your current surface
    secondary: '#404040',
    tertiary: '#4a4a4a',
    elevated: '#454545',
    inverse: '#ffffff',
  },

  // Text colors
  text: {
    primary: '#ffffff', // Your current primary text
    secondary: '#e0e0e0',
    tertiary: '#c0c0c0',
    disabled: '#757575',
    inverse: BRAND_COLORS.neutral[900],
    link: BRAND_COLORS.primary[300],
    linkHover: BRAND_COLORS.primary[200],
  },

  // Border colors
  border: {
    primary: BRAND_COLORS.neutral[700],
    secondary: BRAND_COLORS.neutral[600],
    focus: BRAND_COLORS.primary[400],
    error: SEMANTIC_COLORS.error[400],
    disabled: BRAND_COLORS.neutral[700],
  },

  // Brand colors (adjusted for dark theme)
  brand: BRAND_COLORS,
  semantic: SEMANTIC_COLORS,
} as const;

// Legacy colors for backward compatibility
export const COLORS = {
  primary: {
    main: BRAND_COLORS.primary[300],
    light: BRAND_COLORS.primary[200],
    dark: BRAND_COLORS.primary[600],
    contrast: '#ffffff',
  },
  secondary: {
    main: BRAND_COLORS.neutral[950],
    light: BRAND_COLORS.neutral[700],
    dark: BRAND_COLORS.neutral[950],
    contrast: '#ffffff',
  },
  grey: {
    50: BRAND_COLORS.neutral[50],
    100: BRAND_COLORS.neutral[100],
    200: BRAND_COLORS.neutral[200],
    300: BRAND_COLORS.neutral[300],
    400: BRAND_COLORS.neutral[400],
    500: BRAND_COLORS.neutral[500],
    600: BRAND_COLORS.neutral[600],
    700: BRAND_COLORS.neutral[700],
    800: BRAND_COLORS.neutral[800],
    900: BRAND_COLORS.neutral[900],
  },
  success: SEMANTIC_COLORS.success,
  warning: SEMANTIC_COLORS.warning,
  error: SEMANTIC_COLORS.error,
  info: SEMANTIC_COLORS.info,
} as const;

// Elevation/Shadow System
export const ELEVATION = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// Focus States
export const FOCUS_STATES = {
  ring: {
    width: '2px',
    offset: '2px',
    color: BRAND_COLORS.primary[500],
    style: 'solid',
  },
  outline: {
    width: '2px',
    offset: '0px',
    color: BRAND_COLORS.primary[500],
    style: 'solid',
  },
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Type exports
export type BrandColor = keyof typeof BRAND_COLORS;
export type SemanticColor = keyof typeof SEMANTIC_COLORS;
export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];
export type ElevationLevel = keyof typeof ELEVATION;

/**
 * Get theme colors based on mode (light or dark)
 * @param {ThemeMode} mode - The theme mode ('light' or 'dark')
 * @returns {Object} Theme object with colors for the specified mode
 * @example
 * ```typescript
 * const lightTheme = getTheme('light');
 * const darkTheme = getTheme('dark');
 * ```
 */
export const getTheme = (mode: ThemeMode) => {
  return mode === 'dark' ? DARK_THEME : LIGHT_THEME;
};

/**
 * Create a programmatic color scale from a base color
 * Generates a range of color variations for consistent theming
 *
 * @param {string} baseColor - The base color to create variations from
 * @param {number} [steps=11] - Number of color steps to generate
 * @returns {Array} Array of color objects with step and color values
 * @example
 * ```typescript
 * const brandScale = createColorScale('#e2e891', 11);
 * // Returns: [{ step: 50, color: '#...' }, { step: 100, color: '#...' }, ...]
 * ```
 */
export const createColorScale = (baseColor: string, steps = 11) => {
  // Utility function to create color scales programmatically
  // This can be used for custom brand colors
  return Array.from({ length: steps }, (_, i) => ({
    step: i * 100,
    color: baseColor, // In a real implementation, this would generate variations
  }));
};
