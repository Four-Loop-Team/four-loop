/**
 * Enhanced Typography System
 * Comprehensive type scale with semantic naming and responsive behavior
 */

// Font Weights
export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Line Heights
export const LINE_HEIGHTS = {
  none: 1,
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Letter Spacing
export const LETTER_SPACING = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Base Font Sizes (in rem)
export const FONT_SIZES = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', // 72px
  '8xl': '6rem', // 96px
  '9xl': '8rem', // 128px
} as const;

// Typography Scale with Semantic Names
export const TYPOGRAPHY_SCALE = {
  // Display styles (for hero sections, large headings)
  display: {
    '2xl': {
      fontSize: FONT_SIZES['7xl'],
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    xl: {
      fontSize: FONT_SIZES['6xl'],
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    lg: {
      fontSize: FONT_SIZES['5xl'],
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    md: {
      fontSize: FONT_SIZES['4xl'],
      lineHeight: LINE_HEIGHTS.snug,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    sm: {
      fontSize: FONT_SIZES['3xl'],
      lineHeight: LINE_HEIGHTS.snug,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // Heading styles
  heading: {
    '2xl': {
      fontSize: FONT_SIZES['4xl'],
      lineHeight: LINE_HEIGHTS.snug,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    xl: {
      fontSize: FONT_SIZES['3xl'],
      lineHeight: LINE_HEIGHTS.snug,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
    },
    lg: {
      fontSize: FONT_SIZES['2xl'],
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.tight,
    },
    md: {
      fontSize: FONT_SIZES.xl,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.normal,
    },
    sm: {
      fontSize: FONT_SIZES.lg,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.normal,
    },
    xs: {
      fontSize: FONT_SIZES.base,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // Body text styles
  body: {
    '2xl': {
      fontSize: FONT_SIZES.xl,
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
    xl: {
      fontSize: FONT_SIZES.lg,
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
    lg: {
      fontSize: FONT_SIZES.base,
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
    md: {
      fontSize: FONT_SIZES.sm,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
    sm: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // Label styles
  label: {
    lg: {
      fontSize: FONT_SIZES.sm,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: LETTER_SPACING.normal,
    },
    md: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: LETTER_SPACING.normal,
    },
    sm: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: LETTER_SPACING.wide,
    },
  },

  // Caption styles
  caption: {
    lg: {
      fontSize: FONT_SIZES.sm,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
    md: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.regular,
      letterSpacing: LETTER_SPACING.normal,
    },
  },

  // Overline styles (for small labels, badges)
  overline: {
    lg: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.wider,
      textTransform: 'uppercase' as const,
    },
    md: {
      fontSize: FONT_SIZES.xs,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: LETTER_SPACING.widest,
      textTransform: 'uppercase' as const,
    },
  },
} as const;

// Responsive Typography Scaling
export const RESPONSIVE_TYPOGRAPHY = {
  // Desktop-first approach with your existing patterns
  desktop: {
    h1: {
      fontSize: '3rem', // 48px - matching your h1-desktop
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    h2: {
      fontSize: '1.3125rem', // 21px - matching your h2-desktop
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    subheading: {
      fontSize: '0.875rem', // 14px - matching your subheading-1-desktop
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    body1: {
      fontSize: '1.875rem', // 30px - matching your body-1-desktop
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body2: {
      fontSize: '1.3125rem', // 21px - matching your body-2-desktop
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body3: {
      fontSize: '0.875rem', // 14px - matching your body-3-desktop
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
  },

  tablet: {
    h1: {
      fontSize: '1.75rem', // 28px - matching your h1-tablet
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    h2: {
      fontSize: '0.75rem', // 12px - matching your h2-tablet
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    subheading: {
      fontSize: '0.5625rem', // 9px - matching your subheading-1-tablet
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    body1: {
      fontSize: '1rem', // 16px - matching your body-1-tablet
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body2: {
      fontSize: '0.75rem', // 12px - matching your body-2-tablet
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body3: {
      fontSize: '0.5625rem', // 9px - matching your body-3-tablet
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
  },

  mobile: {
    h1: {
      fontSize: '1.5rem', // 24px - matching your h1-mobile
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    h2: {
      fontSize: '0.6875rem', // 11px - matching your h2-mobile
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    subheading: {
      fontSize: '0.5625rem', // 9px - matching your subheading-1-mobile
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.regular,
    },
    body1: {
      fontSize: '0.875rem', // 14px - matching your body-1-mobile
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body2: {
      fontSize: '0.8125rem', // 13px - matching your body-2-mobile
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
    body3: {
      fontSize: '0.625rem', // 10px - matching your body-3-mobile
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.light,
    },
  },
} as const;

// Font Family Definitions
export const FONT_FAMILIES = {
  sans: [
    'var(--font-poppins)',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    '"SF Mono"',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ],
} as const;

// Advanced Typography Utilities
export const TYPOGRAPHY_UTILITIES = {
  // Text truncation variants
  truncate: {
    single: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    multi: (lines: number) => ({
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
  },

  // Text decoration variants
  decoration: {
    underline: {
      default: 'underline',
      offset: 'underline 2px',
      thickness: {
        thin: 'underline 1px',
        medium: 'underline 2px',
        thick: 'underline 3px',
      },
    },
  },

  // Text transform variants
  transform: {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    normal: 'none',
  },

  // Text alignment variants
  align: {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify',
    start: 'start',
    end: 'end',
  },
} as const;

// Typography Presets for Common UI Patterns
export const TYPOGRAPHY_PRESETS = {
  // Form labels
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },

  // Helper text
  helper: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },

  // Code/monospace
  code: {
    fontSize: FONT_SIZES.sm,
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.snug,
  },

  // Badge/pill text
  badge: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.none,
    letterSpacing: LETTER_SPACING.wide,
    textTransform: 'uppercase' as const,
  },

  // Button text
  button: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.none,
    letterSpacing: LETTER_SPACING.normal,
  },
} as const;

// Fluid Typography (responsive font sizes)
export const FLUID_TYPOGRAPHY = {
  // Responsive headings that scale smoothly
  fluidH1: 'clamp(2.25rem, 4vw + 1rem, 4.5rem)', // 36px - 72px
  fluidH2: 'clamp(1.875rem, 3vw + 1rem, 3.75rem)', // 30px - 60px
  fluidH3: 'clamp(1.5rem, 2.5vw + 0.5rem, 3rem)', // 24px - 48px
  fluidH4: 'clamp(1.25rem, 2vw + 0.5rem, 2.25rem)', // 20px - 36px
  fluidH5: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.875rem)', // 18px - 30px
  fluidH6: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)', // 16px - 24px

  // Responsive body text
  fluidBody: 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)', // 14px - 18px
  fluidCaption: 'clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)', // 12px - 14px
} as const;

/**
 * Generate responsive typography styles with scaling across breakpoints
 * Creates typography that scales appropriately for mobile, tablet, and desktop
 *
 * @param {keyof typeof FONT_SIZES} baseSize - The base font size key
 * @param {number} [scaleRatio=1.2] - The ratio for scaling between breakpoints
 * @returns {Object} Responsive typography object with mobile, tablet, and desktop sizes
 * @example
 * ```typescript
 * const responsiveHeading = createResponsiveTypography('xl', 1.25);
 * // { mobile: '1.25rem', tablet: '1.56rem', desktop: '1.95rem' }
 * ```
 */
export function createResponsiveTypography(
  baseSize: keyof typeof FONT_SIZES,
  scaleRatio: number = 1.2
) {
  const base = parseFloat(FONT_SIZES[baseSize]);
  return {
    mobile: `${base}rem`,
    tablet: `${base * scaleRatio}rem`,
    desktop: `${base * scaleRatio * scaleRatio}rem`,
  };
}

/**
 * Calculate optimal line height for a given font size
 * Implements typography best practices for readability
 *
 * @param {string} fontSize - The font size (e.g., '1.5rem', '16px')
 * @returns {number} The optimal line height ratio
 * @example
 * ```typescript
 * const lineHeight = calculateLineHeight('1.2rem'); // 1.3
 * const headingLineHeight = calculateLineHeight('3rem'); // 1.1
 * ```
 */
export function calculateLineHeight(fontSize: string): number {
  const size = parseFloat(fontSize);
  if (size <= 1) return 1.4; // Small text needs more line height
  if (size <= 1.5) return 1.3;
  if (size <= 2.25) return 1.2;
  return 1.1; // Large headings need tighter line height
}

// Type definitions
export type FontWeight = keyof typeof FONT_WEIGHTS;
export type FontSize = keyof typeof FONT_SIZES;
export type LineHeight = keyof typeof LINE_HEIGHTS;
export type LetterSpacing = keyof typeof LETTER_SPACING;
export type TypographyVariant = keyof typeof TYPOGRAPHY_SCALE;
export type ResponsiveTypographyVariant =
  keyof typeof RESPONSIVE_TYPOGRAPHY.desktop;

/**
 * Get typography styles for a specific variant and size
 * @param {string} variant - The typography variant (e.g., 'heading', 'body')
 * @param {string} size - The size within that variant
 * @returns {Object|null} Typography styles object or null if not found
 * @example
 * ```typescript
 * const headingStyles = getTypographyStyles('heading', 'lg');
 * ```
 */
export const getTypographyStyles = (variant: string, size: string) => {
  const scale = TYPOGRAPHY_SCALE[variant as TypographyVariant];
  if (!scale) return null;

  return scale[size as keyof typeof scale];
};

export const getResponsiveTypography = (
  variant: ResponsiveTypographyVariant,
  breakpoint: 'desktop' | 'tablet' | 'mobile' = 'desktop'
) => {
  return RESPONSIVE_TYPOGRAPHY[breakpoint][variant];
};
