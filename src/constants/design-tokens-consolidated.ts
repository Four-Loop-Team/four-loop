/**
 * @fileoverview Consolidated Design Tokens - TypeScript Source of Truth
 *
 * This file consolidates the best features from the existing design-system.ts
 * and creates a focused token system that matches your current SCSS variables.
 *
 * Architecture Decision:
 * - Keep the excellent animation, shadow, and z-index systems from design-system.ts
 * - Simplify to match your actual 4-color brand palette
 * - Maintain compatibility with existing SCSS variables
 * - Add semantic layers for easy component integration
 *
 * Migration Strategy: TypeScript-first with SCSS generation
 */

// =============================================================================
// BRAND FOUNDATION - Core brand colors (source of truth)
// =============================================================================

export const BRAND_COLORS = {
  primary: '#e2e891', // Main brand accent
  secondary: '#353535', // Primary text/background
  tertiary: '#232323', // Secondary background
  neutral: '#ffffff', // White/light backgrounds
} as const;

// =============================================================================
// SEMANTIC COLOR SYSTEM - Usage-based color tokens
// =============================================================================

export const COLOR_TOKENS = {
  // Text colors - semantic naming for clarity
  text: {
    primary: BRAND_COLORS.secondary, // #353535 - Main text
    inverse: BRAND_COLORS.neutral, // #ffffff - Text on dark backgrounds
    accent: BRAND_COLORS.primary, // #e2e891 - Accent text
    muted: '#9a9a9a', // Muted/secondary text
  },

  // Background colors
  background: {
    primary: BRAND_COLORS.secondary, // #353535 - Main page background
    secondary: BRAND_COLORS.tertiary, // #232323 - Cards, sections
    accent: BRAND_COLORS.primary, // #e2e891 - Highlights, CTAs
    inverse: BRAND_COLORS.neutral, // #ffffff - Light backgrounds
  },

  // Border colors
  border: {
    default: BRAND_COLORS.secondary, // #353535 - Standard borders
    accent: BRAND_COLORS.primary, // #e2e891 - Interactive borders
    inverse: BRAND_COLORS.neutral, // #ffffff - Borders on dark
    muted: '#818181', // Subtle borders
  },

  // State colors for UI feedback
  state: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Surface colors for depth
  surface: {
    primary: BRAND_COLORS.neutral, // #ffffff - Cards, modals
    secondary: BRAND_COLORS.tertiary, // #232323 - Elevated surfaces
    tertiary: '#5a5a5a', // Additional depth level
  },
} as const;

// =============================================================================
// SPACING TOKENS - Enhanced 8px grid system with 12-column support
// =============================================================================

export const SPACING_TOKENS = {
  // Base scale - multiples of 8px for consistent rhythm
  0: '0',
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '3rem', // 48px
  '2xl': '4rem', // 64px
  '3xl': '6rem', // 96px
  '4xl': '8rem', // 128px
  '5xl': '10rem', // 160px
  '6xl': '12rem', // 192px

  // Semantic spacing for specific contexts
  component: '1.5rem', // Default component spacing
  section: '4rem', // Between major sections
  gutter: '1rem', // General element spacing
} as const;

// =============================================================================
// SEMANTIC SPACING - Context-specific spacing tokens
// =============================================================================

export const SEMANTIC_SPACING = {
  // Micro spacing (for fine-tuned adjustments)
  micro: {
    xs: SPACING_TOKENS.xs, // 8px
    sm: SPACING_TOKENS.sm, // 16px
    md: SPACING_TOKENS.md, // 24px
  },

  // Component spacing (internal component spacing)
  component: {
    xs: SPACING_TOKENS.sm, // 16px
    sm: SPACING_TOKENS.md, // 24px
    md: SPACING_TOKENS.lg, // 32px
    lg: SPACING_TOKENS.xl, // 48px
    xl: SPACING_TOKENS['2xl'], // 64px
  },

  // Layout spacing (for major layout structure)
  layout: {
    xs: SPACING_TOKENS.lg, // 32px
    sm: SPACING_TOKENS.xl, // 48px
    md: SPACING_TOKENS['2xl'], // 64px
    lg: SPACING_TOKENS['3xl'], // 96px
    xl: SPACING_TOKENS['4xl'], // 128px
  },

  // Section spacing (between major page sections)
  section: {
    sm: SPACING_TOKENS['2xl'], // 64px
    md: SPACING_TOKENS['3xl'], // 96px
    lg: SPACING_TOKENS['4xl'], // 128px
    xl: SPACING_TOKENS['5xl'], // 160px
  },
} as const;

// =============================================================================
// GRID SYSTEM - 12-column responsive grid with 8px spacing
// =============================================================================

export const GRID_TOKENS = {
  // Container max-widths for responsive design
  container: {
    sm: '640px', // Small screens
    md: '768px', // Medium screens
    lg: '1024px', // Large screens
    xl: '1280px', // Extra large screens
    '2xl': '1536px', // 2X large screens
  },

  // Column system (12-column grid)
  columns: {
    1: '8.333333%', // 1/12
    2: '16.666667%', // 2/12
    3: '25%', // 3/12
    4: '33.333333%', // 4/12
    5: '41.666667%', // 5/12
    6: '50%', // 6/12
    7: '58.333333%', // 7/12
    8: '66.666667%', // 8/12
    9: '75%', // 9/12
    10: '83.333333%', // 10/12
    11: '91.666667%', // 11/12
    12: '100%', // 12/12
    full: '100%',
  },

  // Grid gaps (using 8px spacing system)
  gap: {
    none: '0',
    xs: SPACING_TOKENS.xs, // 8px
    sm: SPACING_TOKENS.sm, // 16px
    md: SPACING_TOKENS.md, // 24px
    lg: SPACING_TOKENS.lg, // 32px
    xl: SPACING_TOKENS.xl, // 48px
  },

  // Container padding
  padding: {
    xs: SPACING_TOKENS.sm, // 16px
    sm: SPACING_TOKENS.md, // 24px
    md: SPACING_TOKENS.lg, // 32px
    lg: SPACING_TOKENS.xl, // 48px
  },
} as const;

// =============================================================================
// ANIMATION TOKENS - Enhanced animation system from design-system.ts
// =============================================================================

export const ANIMATION_TOKENS = {
  duration: {
    instant: '0ms',
    fast: '150ms', // Quick feedback (hover, focus)
    normal: '300ms', // Standard transitions
    slow: '500ms', // Emphasis transitions
    slower: '750ms', // Page transitions
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
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

// =============================================================================
// BORDER RADIUS TOKENS - Enhanced from design-system.ts
// =============================================================================

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

  // Semantic radius for components
  button: '0.375rem', // 6px
  card: '0.5rem', // 8px
  input: '0.375rem', // 6px
  modal: '0.75rem', // 12px
  avatar: '9999px', // Full circle
  pill: '9999px', // Pill shape
} as const;

// =============================================================================
// SHADOW TOKENS - Enhanced depth system from design-system.ts
// =============================================================================

export const SHADOW_TOKENS = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Semantic shadows for specific components
  button: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  dropdown:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  tooltip: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// =============================================================================
// Z-INDEX TOKENS - Enhanced layering system from design-system.ts
// =============================================================================

export const Z_INDEX_TOKENS = {
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
  tooltip: 1600,
  toast: 1700,
  skipLink: 1070,
  max: 2147483647,
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS - Enhanced font system from design-system.ts
// =============================================================================

export const TYPOGRAPHY_TOKENS = {
  fontFamily: {
    primary:
      'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
  },

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
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
    '8xl': '6rem', // 96px
    '9xl': '8rem', // 128px
  },

  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Semantic typography scales
  scale: {
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    body: { fontSize: '1rem', lineHeight: 1.625 },
    heading: { fontSize: '1.5rem', lineHeight: 1.25 },
    display: { fontSize: '2.25rem', lineHeight: 1 },
  },
} as const;

// =============================================================================
// COMPONENT-SPECIFIC TOKENS - Enhanced component system
// =============================================================================

export const COMPONENT_TOKENS = {
  // Navigation component - matches your current working styles
  navigation: {
    background: COLOR_TOKENS.background.primary, // #353535
    containerBackground: COLOR_TOKENS.background.accent, // #e2e891
    sliderBackground: COLOR_TOKENS.background.secondary, // #232323
    sliderBorder: COLOR_TOKENS.border.accent, // #e2e891
    textActive: COLOR_TOKENS.text.inverse, // #ffffff
    textInactive: COLOR_TOKENS.text.primary, // #353535

    // Spacing from your working navigation
    buttonPaddingX: SPACING_TOKENS.xl, // 3rem (48px)
    buttonPaddingY: '0.5rem', // 8px - keeps working value
    containerBorderRadius: '50px', // Pill shape
    buttonOverlap: '-20px', // Overlap effect

    // Animations
    transition: `left ${ANIMATION_TOKENS.duration.normal} cubic-bezier(0.25, 0.46, 0.45, 0.94), width ${ANIMATION_TOKENS.duration.normal} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  },

  // Button tokens - enhanced from design-system.ts
  button: {
    padding: {
      sm: `${SEMANTIC_SPACING.micro.xs} ${SEMANTIC_SPACING.micro.md}`, // 8px 24px
      md: `${SEMANTIC_SPACING.micro.sm} ${SEMANTIC_SPACING.component.sm}`, // 16px 24px
      lg: `${SEMANTIC_SPACING.micro.md} ${SEMANTIC_SPACING.component.md}`, // 24px 32px
    },
    fontSize: {
      sm: TYPOGRAPHY_TOKENS.fontSize.sm,
      md: TYPOGRAPHY_TOKENS.fontSize.base,
      lg: TYPOGRAPHY_TOKENS.fontSize.lg,
    },
    borderRadius: BORDER_RADIUS_TOKENS.button, // 6px
    shadow: SHADOW_TOKENS.button, // Button-specific shadow
    transition: ANIMATION_TOKENS.presets.all, // Pre-built transition
  },

  // Input tokens - from design-system.ts
  input: {
    padding: {
      sm: `${SEMANTIC_SPACING.micro.xs} ${SEMANTIC_SPACING.micro.md}`,
      md: `${SEMANTIC_SPACING.micro.sm} ${SEMANTIC_SPACING.component.xs}`,
      lg: `${SEMANTIC_SPACING.micro.md} ${SEMANTIC_SPACING.component.sm}`,
    },
    fontSize: {
      sm: TYPOGRAPHY_TOKENS.fontSize.sm,
      md: TYPOGRAPHY_TOKENS.fontSize.base,
      lg: TYPOGRAPHY_TOKENS.fontSize.lg,
    },
    borderRadius: BORDER_RADIUS_TOKENS.input,
    transition: ANIMATION_TOKENS.presets.color,
  },

  // Card tokens - enhanced
  card: {
    background: COLOR_TOKENS.surface.primary, // #ffffff
    padding: SEMANTIC_SPACING.component.md, // 32px
    borderRadius: BORDER_RADIUS_TOKENS.card, // 8px
    shadow: SHADOW_TOKENS.card, // Card depth
  },

  // Modal tokens - from design-system.ts
  modal: {
    borderRadius: BORDER_RADIUS_TOKENS.modal,
    shadow: SHADOW_TOKENS.modal,
    zIndex: Z_INDEX_TOKENS.modal,
    padding: SEMANTIC_SPACING.layout.sm, // 48px
  },
} as const;

// =============================================================================
// THEME SYSTEM - Light/Dark theme support adapted for 4-color palette
// =============================================================================

export const THEME_TOKENS = {
  light: {
    colors: {
      // Surface colors
      'color-surface-primary': BRAND_COLORS.neutral, // #ffffff
      'color-surface-secondary': '#f8f9fa', // Light gray
      'color-surface-tertiary': '#e9ecef', // Lighter gray
      'color-surface-inverse': BRAND_COLORS.secondary, // #353535
      'color-surface-overlay': 'rgba(0, 0, 0, 0.5)',

      // Border colors
      'color-border-default': '#e5e5e5',
      'color-border-muted': '#f0f0f0',
      'color-border-emphasis': '#d4d4d4',
      'color-border-interactive': BRAND_COLORS.primary, // #e2e891

      // Text colors
      'color-text-primary': BRAND_COLORS.secondary, // #353535
      'color-text-secondary': '#6b7280',
      'color-text-tertiary': '#9ca3af',
      'color-text-inverse': BRAND_COLORS.neutral, // #ffffff
      'color-text-brand': BRAND_COLORS.primary, // #e2e891
    },
  },

  dark: {
    colors: {
      // Surface colors
      'color-surface-primary': BRAND_COLORS.secondary, // #353535
      'color-surface-secondary': BRAND_COLORS.tertiary, // #232323
      'color-surface-tertiary': '#1a1a1a', // Even darker
      'color-surface-inverse': BRAND_COLORS.neutral, // #ffffff
      'color-surface-overlay': 'rgba(0, 0, 0, 0.7)',

      // Border colors
      'color-border-default': '#404040',
      'color-border-muted': '#2a2a2a',
      'color-border-emphasis': '#525252',
      'color-border-interactive': BRAND_COLORS.primary, // #e2e891

      // Text colors
      'color-text-primary': BRAND_COLORS.neutral, // #ffffff
      'color-text-secondary': '#d1d5db',
      'color-text-tertiary': '#9ca3af',
      'color-text-inverse': BRAND_COLORS.secondary, // #353535
      'color-text-brand': BRAND_COLORS.primary, // #e2e891
    },
  },
} as const;

// =============================================================================
// CONSOLIDATED DESIGN TOKENS - Single export with all features
// =============================================================================

export const DESIGN_TOKENS = {
  brand: BRAND_COLORS,
  colors: COLOR_TOKENS,
  spacing: SPACING_TOKENS,
  semanticSpacing: SEMANTIC_SPACING,
  grid: GRID_TOKENS,
  animation: ANIMATION_TOKENS,
  borderRadius: BORDER_RADIUS_TOKENS,
  shadows: SHADOW_TOKENS,
  zIndex: Z_INDEX_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  components: COMPONENT_TOKENS,
  themes: THEME_TOKENS,
} as const;

// =============================================================================
// SCSS VARIABLE GENERATION - Convert tokens to SCSS format
// =============================================================================

/**
 * Enhanced SCSS variable generation - includes all design token features
 */
export function generateSCSSVariables(): string {
  const scssVars: string[] = [
    '// =============================================================================',
    '// Generated SCSS Variables from TypeScript Design Tokens',
    '// DO NOT EDIT - This file is auto-generated from design-tokens-consolidated.ts',
    '// =============================================================================',
    '',
    '// =============================================================================',
    '// BRAND COLORS - Core 4-color palette',
    '// =============================================================================',
    `$primary: ${BRAND_COLORS.primary};`,
    `$secondary: ${BRAND_COLORS.secondary};`,
    `$tertiary: ${BRAND_COLORS.tertiary};`,
    `$neutral: ${BRAND_COLORS.neutral};`,
    '',
    '// =============================================================================',
    '// SEMANTIC COLORS - Usage-based color tokens',
    '// =============================================================================',
    '',
    '// Text Colors',
    `$text-primary: ${COLOR_TOKENS.text.primary};`,
    `$text-inverse: ${COLOR_TOKENS.text.inverse};`,
    `$text-accent: ${COLOR_TOKENS.text.accent};`,
    `$text-muted: ${COLOR_TOKENS.text.muted};`,
    '',
    '// Background Colors',
    `$bg-primary: ${COLOR_TOKENS.background.primary};`,
    `$bg-secondary: ${COLOR_TOKENS.background.secondary};`,
    `$bg-accent: ${COLOR_TOKENS.background.accent};`,
    `$bg-inverse: ${COLOR_TOKENS.background.inverse};`,
    '',
    '// Border Colors',
    `$border-default: ${COLOR_TOKENS.border.default};`,
    `$border-accent: ${COLOR_TOKENS.border.accent};`,
    `$border-muted: ${COLOR_TOKENS.border.muted};`,
    '',
    '// State Colors',
    `$color-success: ${COLOR_TOKENS.state.success};`,
    `$color-warning: ${COLOR_TOKENS.state.warning};`,
    `$color-error: ${COLOR_TOKENS.state.error};`,
    `$color-info: ${COLOR_TOKENS.state.info};`,
    '',
    '// =============================================================================',
    '// SPACING SYSTEM - 8px grid + 12-column support',
    '// =============================================================================',
    '',
    '// Base Spacing Scale',
  ];

  // Add base spacing variables
  Object.entries(SPACING_TOKENS).forEach(([key, value]) => {
    if (!['component', 'section', 'gutter'].includes(key)) {
      scssVars.push(`$spacing-${key}: ${value};`);
    }
  });

  scssVars.push('');
  scssVars.push('// Semantic Spacing');
  scssVars.push(`$spacing-component: ${SPACING_TOKENS.component};`);
  scssVars.push(`$spacing-section: ${SPACING_TOKENS.section};`);
  scssVars.push(`$spacing-gutter: ${SPACING_TOKENS.gutter};`);

  scssVars.push('');
  scssVars.push('// Grid System (12-column)');
  Object.entries(GRID_TOKENS.container).forEach(([key, value]) => {
    scssVars.push(`$container-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push(
    '// ============================================================================='
  );
  scssVars.push('// COMPONENT TOKENS - Pre-configured component values');
  scssVars.push(
    '// ============================================================================='
  );
  scssVars.push('');
  scssVars.push('// Navigation');
  scssVars.push(`$nav-background: ${COMPONENT_TOKENS.navigation.background};`);
  scssVars.push(
    `$nav-container-background: ${COMPONENT_TOKENS.navigation.containerBackground};`
  );
  scssVars.push(
    `$nav-button-padding-x: ${COMPONENT_TOKENS.navigation.buttonPaddingX};`
  );
  scssVars.push(
    `$nav-button-padding-y: ${COMPONENT_TOKENS.navigation.buttonPaddingY};`
  );
  scssVars.push(
    `$nav-container-border-radius: ${COMPONENT_TOKENS.navigation.containerBorderRadius};`
  );

  scssVars.push('');
  scssVars.push('// Typography');
  Object.entries(TYPOGRAPHY_TOKENS.fontSize).forEach(([key, value]) => {
    scssVars.push(`$font-size-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Font Weights');
  Object.entries(TYPOGRAPHY_TOKENS.fontWeight).forEach(([key, value]) => {
    scssVars.push(`$font-weight-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Animation');
  Object.entries(ANIMATION_TOKENS.duration).forEach(([key, value]) => {
    scssVars.push(`$duration-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Shadows');
  Object.entries(SHADOW_TOKENS).forEach(([key, value]) => {
    scssVars.push(`$shadow-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Border Radius');
  Object.entries(BORDER_RADIUS_TOKENS).forEach(([key, value]) => {
    scssVars.push(`$border-radius-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Z-Index');
  Object.entries(Z_INDEX_TOKENS).forEach(([key, value]) => {
    scssVars.push(`$z-index-${key}: ${value};`);
  });

  return scssVars.join('\n');
}

// =============================================================================
// CSS GENERATION UTILITIES - Enhanced theme and CSS generation
// =============================================================================

/**
 * Create CSS custom properties for a specific theme
 * @param theme - 'light' or 'dark'
 * @returns CSS custom properties string
 */
export function createThemeCSS(theme: 'light' | 'dark'): string {
  const themeData = THEME_TOKENS[theme];

  return Object.entries(themeData.colors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
}

/**
 * Generate complete CSS custom properties for the design system
 * Creates comprehensive CSS variables for runtime theming
 */
export function generateDesignTokenCSS(): string {
  return `
:root {
  /* Brand Colors */
  --brand-primary: ${BRAND_COLORS.primary};
  --brand-secondary: ${BRAND_COLORS.secondary};
  --brand-tertiary: ${BRAND_COLORS.tertiary};
  --brand-neutral: ${BRAND_COLORS.neutral};

  /* Theme Colors (Light) */
${createThemeCSS('light')}

  /* Spacing Scale */
${Object.entries(SPACING_TOKENS)
  .filter(([key]) => !['component', 'section', 'gutter'].includes(key))
  .map(([key, value]) => `  --spacing-${key}: ${value};`)
  .join('\n')}

  /* Semantic Spacing */
  --spacing-component: ${SPACING_TOKENS.component};
  --spacing-section: ${SPACING_TOKENS.section};
  --spacing-gutter: ${SPACING_TOKENS.gutter};

  /* Grid System */
${Object.entries(GRID_TOKENS.container)
  .map(([key, value]) => `  --container-${key}: ${value};`)
  .join('\n')}

  /* Typography */
${Object.entries(TYPOGRAPHY_TOKENS.fontSize)
  .map(([key, value]) => `  --font-size-${key}: ${value};`)
  .join('\n')}

${Object.entries(TYPOGRAPHY_TOKENS.fontWeight)
  .map(([key, value]) => `  --font-weight-${key}: ${value};`)
  .join('\n')}

${Object.entries(TYPOGRAPHY_TOKENS.lineHeight)
  .map(([key, value]) => `  --line-height-${key}: ${value};`)
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

/* Dark Theme */
[data-theme="dark"] {
${createThemeCSS('dark')}
}

/* System Dark Mode */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${createThemeCSS('dark')}
  }
}
`;
}

// Export for immediate use
export default DESIGN_TOKENS;

/**
 * Comprehensive design system utilities
 */
export const DesignSystemUtils = {
  /**
   * Get a specific token value
   */
  getToken: (path: string): string | number | object | undefined => {
    const keys = path.split('.');
    let value: unknown = DESIGN_TOKENS;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }

    return value as string | number | object | undefined;
  },

  /**
   * Get all available spacing values
   */
  getSpacingTokens: () => SPACING_TOKENS,

  /**
   * Get brand colors
   */
  getBrandColors: () => BRAND_COLORS,

  /**
   * Get semantic colors for a specific context
   */
  getColorTokens: (context?: 'text' | 'background' | 'border' | 'state') => {
    if (context) {
      return COLOR_TOKENS[context];
    }
    return COLOR_TOKENS;
  },

  /**
   * Get component-specific tokens
   */
  getComponentTokens: (
    component: 'navigation' | 'button' | 'input' | 'card' | 'modal'
  ) => {
    return COMPONENT_TOKENS[component];
  },

  /**
   * Get theme tokens
   */
  getThemeTokens: (theme?: 'light' | 'dark') => {
    if (theme) {
      return THEME_TOKENS[theme];
    }
    return THEME_TOKENS;
  },

  /**
   * Generate CSS for a specific theme
   */
  generateThemeCSS: createThemeCSS,

  /**
   * Generate SCSS variables
   */
  generateSCSS: generateSCSSVariables,

  /**
   * Generate complete CSS custom properties
   */
  generateFullCSS: generateDesignTokenCSS,
};
