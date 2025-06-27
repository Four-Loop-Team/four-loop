/**
 * Enhanced Spacing System
 * Comprehensive spacing tokens with semantic naming
 */

// Base spacing scale (8px grid system)
export const SPACING_SCALE = {
  0: '0rem',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

// Semantic spacing tokens (matching your existing system)
export const SEMANTIC_SPACING = {
  // Micro spacing (for fine-tuned adjustments)
  micro: {
    xs: SPACING_SCALE[0.5], // 2px
    sm: SPACING_SCALE[1], // 4px
    md: SPACING_SCALE[1.5], // 6px
    lg: SPACING_SCALE[2], // 8px
  },

  // Component spacing (matching your existing system)
  component: {
    xs: SPACING_SCALE[1], // 4px  - matching your $space-xs
    sm: SPACING_SCALE[2], // 8px  - matching your $space-sm
    md: SPACING_SCALE[4], // 16px - matching your $space-md
    lg: SPACING_SCALE[6], // 24px - matching your $space-lg
    xl: SPACING_SCALE[8], // 32px - matching your $space-xl
    '2xl': SPACING_SCALE[12], // 48px - matching your $space-2xl
    '3xl': SPACING_SCALE[16], // 64px - matching your $space-3xl
  },

  // Layout spacing (for larger structural elements)
  layout: {
    xs: SPACING_SCALE[8], // 32px
    sm: SPACING_SCALE[12], // 48px
    md: SPACING_SCALE[16], // 64px
    lg: SPACING_SCALE[24], // 96px
    xl: SPACING_SCALE[32], // 128px
    '2xl': SPACING_SCALE[40], // 160px
    '3xl': SPACING_SCALE[48], // 192px
    '4xl': SPACING_SCALE[64], // 256px
  },

  // Section spacing (for page-level spacing)
  section: {
    xs: SPACING_SCALE[16], // 64px
    sm: SPACING_SCALE[20], // 80px
    md: SPACING_SCALE[24], // 96px
    lg: SPACING_SCALE[32], // 128px
    xl: SPACING_SCALE[40], // 160px
    '2xl': SPACING_SCALE[48], // 192px
    '3xl': SPACING_SCALE[64], // 256px
  },

  // Container spacing (responsive padding)
  container: {
    xs: SPACING_SCALE[4], // 16px - matching your $container-padding-xs
    sm: SPACING_SCALE[6], // 24px - matching your $container-padding-sm
    md: SPACING_SCALE[8], // 32px - matching your $container-padding-md
    lg: SPACING_SCALE[12], // 48px - matching your $container-padding-lg
    xl: SPACING_SCALE[16], // 64px - matching your $container-padding-xl
  },
} as const;

// Grid spacing (matching your existing grid system)
export const GRID_SPACING = {
  none: SPACING_SCALE[0], // 0px
  xs: SPACING_SCALE[2], // 8px  - matching your $grid-gutter-xs (16px) / 2
  sm: SPACING_SCALE[4], // 16px - matching your $grid-gutter-sm (24px) adjusted
  md: SPACING_SCALE[6], // 24px - matching your $grid-gutter-md (32px) adjusted
  lg: SPACING_SCALE[8], // 32px - matching your $grid-gutter-lg (48px) adjusted
  xl: SPACING_SCALE[12], // 48px - matching your $grid-gutter-xl (64px) adjusted
} as const;

// Navigation-specific spacing (matching your existing nav system)
export const NAVIGATION_SPACING = {
  padding: SEMANTIC_SPACING.component.md, // 16px - matching your $nav-padding
  buttonPaddingX: SEMANTIC_SPACING.component.lg, // 24px - matching your $nav-button-padding-x
  buttonPaddingY: SPACING_SCALE[1], // 4px  - matching your $nav-button-padding-y
  mobileWidth: '18.75rem', // 300px - matching your $nav-mobile-width
  containerBorderRadius: '3.125rem', // 50px - matching your $nav-container-border-radius
  buttonOverlap: '-1.25rem', // -20px - matching your $nav-button-overlap
} as const;

// Component-specific spacing patterns
export const COMPONENT_SPACING = {
  // Button spacing
  button: {
    paddingX: {
      sm: SEMANTIC_SPACING.component.sm, // 8px
      md: SEMANTIC_SPACING.component.md, // 16px
      lg: SEMANTIC_SPACING.component.lg, // 24px
      xl: SEMANTIC_SPACING.component.xl, // 32px
    },
    paddingY: {
      sm: SEMANTIC_SPACING.component.xs, // 4px
      md: SEMANTIC_SPACING.component.sm, // 8px
      lg: SEMANTIC_SPACING.component.md, // 16px
      xl: SEMANTIC_SPACING.component.lg, // 24px
    },
    gap: {
      sm: SEMANTIC_SPACING.component.xs, // 4px
      md: SEMANTIC_SPACING.component.sm, // 8px
      lg: SEMANTIC_SPACING.component.md, // 16px
    },
  },

  // Card spacing
  card: {
    padding: {
      sm: SEMANTIC_SPACING.component.md, // 16px
      md: SEMANTIC_SPACING.component.lg, // 24px
      lg: SEMANTIC_SPACING.component.xl, // 32px
    },
    gap: {
      sm: SEMANTIC_SPACING.component.md, // 16px
      md: SEMANTIC_SPACING.component.lg, // 24px
      lg: SEMANTIC_SPACING.component.xl, // 32px
    },
  },

  // Form spacing
  form: {
    fieldGap: SEMANTIC_SPACING.component.lg, // 24px
    labelGap: SEMANTIC_SPACING.component.xs, // 4px
    inputPadding: SEMANTIC_SPACING.component.md, // 16px
    groupGap: SEMANTIC_SPACING.component.xl, // 32px
  },

  // List spacing
  list: {
    itemGap: {
      sm: SEMANTIC_SPACING.component.xs, // 4px
      md: SEMANTIC_SPACING.component.sm, // 8px
      lg: SEMANTIC_SPACING.component.md, // 16px
    },
    padding: SEMANTIC_SPACING.component.md, // 16px
  },

  // Modal/Dialog spacing
  modal: {
    padding: SEMANTIC_SPACING.component.xl, // 32px
    headerGap: SEMANTIC_SPACING.component.lg, // 24px
    footerGap: SEMANTIC_SPACING.component.md, // 16px
  },
} as const;

// Responsive spacing adjustments
export const RESPONSIVE_SPACING = {
  mobile: {
    container: SEMANTIC_SPACING.container.xs, // 16px
    section: SEMANTIC_SPACING.section.xs, // 64px
    component: SEMANTIC_SPACING.component.sm, // 8px
  },
  tablet: {
    container: SEMANTIC_SPACING.container.sm, // 24px
    section: SEMANTIC_SPACING.section.sm, // 80px
    component: SEMANTIC_SPACING.component.md, // 16px
  },
  desktop: {
    container: SEMANTIC_SPACING.container.lg, // 48px
    section: SEMANTIC_SPACING.section.lg, // 128px
    component: SEMANTIC_SPACING.component.lg, // 24px
  },
} as const;

// Negative spacing (for overlapping elements)
export const NEGATIVE_SPACING = {
  1: '-0.25rem', // -4px
  2: '-0.5rem', // -8px
  3: '-0.75rem', // -12px
  4: '-1rem', // -16px
  5: '-1.25rem', // -20px
  6: '-1.5rem', // -24px
  8: '-2rem', // -32px
  10: '-2.5rem', // -40px
  12: '-3rem', // -48px
  16: '-4rem', // -64px
  20: '-5rem', // -80px
  24: '-6rem', // -96px
} as const;

// Advanced Spacing Utilities
export const SPACING_UTILITIES = {
  // Auto spacing for flexbox/grid
  auto: 'auto',

  // Fractional spacing (useful for fine-tuning)
  fractional: {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '5/6': '83.333333%',
  },

  // Viewport-based spacing
  viewport: {
    vw: {
      1: '1vw',
      2: '2vw',
      5: '5vw',
      10: '10vw',
      15: '15vw',
      20: '20vw',
    },
    vh: {
      1: '1vh',
      2: '2vh',
      5: '5vh',
      10: '10vh',
      15: '15vh',
      20: '20vh',
    },
  },
} as const;

// Container and Layout Spacing
export const CONTAINER_SPACING = {
  // Container max-widths
  container: {
    xs: '20rem', // 320px
    sm: '24rem', // 384px
    md: '28rem', // 448px
    lg: '32rem', // 512px
    xl: '36rem', // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
    '4xl': '56rem', // 896px
    '5xl': '64rem', // 1024px
    '6xl': '72rem', // 1152px
    '7xl': '80rem', // 1280px
    full: '100%',
    screen: '100vw',
  },

  // Safe area spacing (for mobile devices)
  safeArea: {
    top: 'env(safe-area-inset-top)',
    right: 'env(safe-area-inset-right)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
  },
} as const;

// Design System Spacing Presets
export const SPACING_PRESETS = {
  // Card spacing
  card: {
    padding: SEMANTIC_SPACING.component.md,
    gap: SEMANTIC_SPACING.component.sm,
    radius: '0.5rem',
  },

  // Form spacing
  form: {
    fieldGap: SEMANTIC_SPACING.component.md,
    labelGap: SEMANTIC_SPACING.component.xs,
    buttonGap: SEMANTIC_SPACING.component.lg,
  },

  // Navigation spacing
  nav: {
    itemGap: SEMANTIC_SPACING.component.sm,
    sectionGap: SEMANTIC_SPACING.component.lg,
    padding: SEMANTIC_SPACING.component.md,
  },

  // Grid spacing
  grid: {
    gap: {
      tight: SEMANTIC_SPACING.component.xs,
      normal: SEMANTIC_SPACING.component.sm,
      loose: SEMANTIC_SPACING.component.md,
      spacious: SEMANTIC_SPACING.component.lg,
    },
  },
} as const;

// Responsive Spacing Functions
export function createResponsiveSpacing(
  mobileSpacing: keyof typeof SPACING_SCALE,
  tabletSpacing?: keyof typeof SPACING_SCALE,
  desktopSpacing?: keyof typeof SPACING_SCALE
) {
  return {
    mobile: SPACING_SCALE[mobileSpacing],
    tablet: SPACING_SCALE[tabletSpacing ?? mobileSpacing],
    desktop: SPACING_SCALE[desktopSpacing ?? tabletSpacing ?? mobileSpacing],
  };
}

/**
 * Get spacing value with fallback
 */
export function getSpacing(
  key:
    | keyof typeof SPACING_SCALE
    | keyof (typeof SEMANTIC_SPACING)['component'],
  fallback: string = '1rem'
): string {
  if (key in SPACING_SCALE) {
    return SPACING_SCALE[key as keyof typeof SPACING_SCALE];
  }
  if (key in SEMANTIC_SPACING.component) {
    return SEMANTIC_SPACING.component[
      key as keyof (typeof SEMANTIC_SPACING)['component']
    ];
  }
  return fallback;
}

/**
 * Create consistent spacing between elements
 */
export function createSpacingStack(
  spacing: string,
  direction: 'vertical' | 'horizontal' = 'vertical'
) {
  const property = direction === 'vertical' ? 'margin-top' : 'margin-left';
  return {
    [`& > * + *`]: {
      [property]: spacing,
    },
  };
}

// Type definitions
export type SpacingScale = keyof typeof SPACING_SCALE;
export type SemanticSpacing = keyof typeof SEMANTIC_SPACING;
export type ComponentSpacing = keyof typeof COMPONENT_SPACING;
export type GridSpacing = keyof typeof GRID_SPACING;

// Utility functions
export const getSemanticSpacing = (category: SemanticSpacing, size: string) => {
  const spacingCategory = SEMANTIC_SPACING[category];
  return spacingCategory[size as keyof typeof spacingCategory];
};

export const getResponsiveSpacing = (
  type: 'container' | 'section' | 'component',
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  return RESPONSIVE_SPACING[breakpoint][type];
};

// CSS Custom Properties (for runtime theme switching)
export const SPACING_CSS_VARS = {
  '--spacing-micro-xs': SEMANTIC_SPACING.micro.xs,
  '--spacing-micro-sm': SEMANTIC_SPACING.micro.sm,
  '--spacing-micro-md': SEMANTIC_SPACING.micro.md,
  '--spacing-micro-lg': SEMANTIC_SPACING.micro.lg,
  '--spacing-component-xs': SEMANTIC_SPACING.component.xs,
  '--spacing-component-sm': SEMANTIC_SPACING.component.sm,
  '--spacing-component-md': SEMANTIC_SPACING.component.md,
  '--spacing-component-lg': SEMANTIC_SPACING.component.lg,
  '--spacing-component-xl': SEMANTIC_SPACING.component.xl,
  '--spacing-component-2xl': SEMANTIC_SPACING.component['2xl'],
  '--spacing-component-3xl': SEMANTIC_SPACING.component['3xl'],
  '--spacing-layout-xs': SEMANTIC_SPACING.layout.xs,
  '--spacing-layout-sm': SEMANTIC_SPACING.layout.sm,
  '--spacing-layout-md': SEMANTIC_SPACING.layout.md,
  '--spacing-layout-lg': SEMANTIC_SPACING.layout.lg,
  '--spacing-layout-xl': SEMANTIC_SPACING.layout.xl,
  '--spacing-layout-2xl': SEMANTIC_SPACING.layout['2xl'],
  '--spacing-layout-3xl': SEMANTIC_SPACING.layout['3xl'],
  '--spacing-layout-4xl': SEMANTIC_SPACING.layout['4xl'],
} as const;
