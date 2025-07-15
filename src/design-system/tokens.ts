/**
 * Design System Tokens - Single Source of Truth
 * All design values should be defined here and exported for use across the application
 */

// =============================================================================
// COLORS - Brand and Semantic Color Definitions
// =============================================================================

export const COLOR_TOKENS = {
  // Brand Colors (Primary Identity)
  brand: {
    primary: '#e2e891', // Light green-yellow (signature color)
    secondary: '#353535', // Dark charcoal (backgrounds, text)
    accent: '#69685a', // Muted green (accents, highlights)
    white: '#ffffff', // Pure white
  },

  // Semantic Colors (Context-based)
  semantic: {
    text: {
      primary: '#ffffff', // Primary text on dark backgrounds
      secondary: '#353535', // Secondary text on light backgrounds
      tertiary: '#9a9a9a', // Muted text
      inverse: '#353535', // Text on light backgrounds
      brand: '#a8b229', // Brand-colored text
    },
    surface: {
      primary: '#ffffff', // Main background (light theme)
      secondary: '#f8f8f8', // Secondary background
      tertiary: '#f0f0f0', // Tertiary background
      inverse: '#353535', // Dark background
      overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
    },
    border: {
      default: '#e4e4e4', // Default border color
      muted: '#f0f0f0', // Subtle borders
      emphasis: '#9a9a9a', // Prominent borders
      interactive: '#d6de5f', // Interactive element borders
      inverse: '#ffffff', // Light borders on dark backgrounds
    },
    state: {
      success: '#22c55e', // Success states
      warning: '#f59e0b', // Warning states
      error: '#ef4444', // Error states
      info: '#3b82f6', // Info states
    },
  },

  // Theme Variants
  themes: {
    light: {
      background: '#ffffff',
      surface: '#ffffff',
      text: '#353535',
    },
    dark: {
      background: '#353535',
      surface: '#353535',
      text: '#ffffff',
    },
  },
} as const;

// =============================================================================
// SPACING - 8px Grid System
// =============================================================================

export const SPACING_TOKENS = {
  // Base spacing scale (8px grid)
  scale: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // Semantic spacing (component-specific)
  semantic: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  // Component-specific spacing
  component: {
    button: {
      padding: {
        sm: '0.5rem 0.75rem', // 8px 12px
        md: '0.75rem 1rem', // 12px 16px
        lg: '1rem 1.5rem', // 16px 24px
      },
    },
    card: {
      padding: {
        sm: '1rem', // 16px
        md: '1.5rem', // 24px
        lg: '2rem', // 32px
      },
    },
  },
} as const;

// =============================================================================
// TYPOGRAPHY - Font Sizes, Weights, and Line Heights
// =============================================================================

export const TYPOGRAPHY_TOKENS = {
  // Font sizes
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line heights
  lineHeight: {
    tight: '1.2',
    snug: '1.4',
    normal: '1.6',
    relaxed: '1.8',
  },

  // Font families
  fontFamily: {
    sans: [
      'var(--font-poppins)',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ],
  },
} as const;

// =============================================================================
// LAYOUT - Breakpoints, Containers, and Grid
// =============================================================================

export const LAYOUT_TOKENS = {
  // Responsive breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Grid system
  grid: {
    columns: 12,
    gutter: {
      sm: '1rem', // 16px
      md: '1.5rem', // 24px
      lg: '2rem', // 32px
    },
  },
} as const;

// =============================================================================
// EFFECTS - Shadows, Borders, and Animations
// =============================================================================

export const EFFECT_TOKENS = {
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    full: '9999px',
  },

  // Box shadows
  boxShadow: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    none: 'none',
  },

  // Transitions and animations
  transition: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// =============================================================================
// UNIFIED DESIGN TOKENS EXPORT
// =============================================================================

export const DESIGN_TOKENS = {
  colors: COLOR_TOKENS,
  spacing: SPACING_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  layout: LAYOUT_TOKENS,
  effects: EFFECT_TOKENS,
} as const;

// Export individual token categories for convenience
export {
  COLOR_TOKENS as colors,
  EFFECT_TOKENS as effects,
  LAYOUT_TOKENS as layout,
  SPACING_TOKENS as spacing,
  TYPOGRAPHY_TOKENS as typography,
};

// TypeScript types for design tokens
export type ColorToken =
  | keyof typeof COLOR_TOKENS.brand
  | keyof typeof COLOR_TOKENS.semantic.text;
export type SpacingToken = keyof typeof SPACING_TOKENS.semantic;
export type TypographyToken = keyof typeof TYPOGRAPHY_TOKENS.fontSize;

// Helper functions to get token values
export const getSpacingToken = (key: keyof typeof SPACING_TOKENS.semantic) =>
  SPACING_TOKENS.semantic[key];
export const getTypographyToken = (
  key: keyof typeof TYPOGRAPHY_TOKENS.fontSize
) => TYPOGRAPHY_TOKENS.fontSize[key];
export const getColorToken = {
  brand: COLOR_TOKENS.brand,
  text: COLOR_TOKENS.semantic.text,
  surface: COLOR_TOKENS.semantic.surface,
  border: COLOR_TOKENS.semantic.border,
  state: COLOR_TOKENS.semantic.state,
};
