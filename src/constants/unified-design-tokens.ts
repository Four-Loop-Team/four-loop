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
// SPACING TOKENS - 8px grid system
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

  // Semantic spacing for specific contexts
  component: '1.5rem', // Default component spacing
  section: '4rem', // Between major sections
  gutter: '1rem', // General element spacing
} as const;

// =============================================================================
// ANIMATION TOKENS - From design-system.ts (proven system)
// =============================================================================

export const ANIMATION_TOKENS = {
  duration: {
    instant: '0ms',
    fast: '150ms', // Quick feedback (hover, focus)
    normal: '300ms', // Standard transitions
    slow: '500ms', // Emphasis transitions
    slower: '800ms', // Page transitions
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// =============================================================================
// BORDER RADIUS TOKENS - From design-system.ts
// =============================================================================

export const BORDER_RADIUS_TOKENS = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',

  // Semantic radius for components
  button: '6px',
  card: '8px',
  modal: '12px',
  pill: '9999px',
} as const;

// =============================================================================
// SHADOW TOKENS - From design-system.ts (excellent depth system)
// =============================================================================

export const SHADOW_TOKENS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Semantic shadows
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  modal: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  tooltip: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// =============================================================================
// Z-INDEX TOKENS - From design-system.ts (solid layering system)
// =============================================================================

export const Z_INDEX_TOKENS = {
  auto: 'auto',
  base: '1',
  docked: '10',
  dropdown: '1000',
  sticky: '1020',
  banner: '1030',
  overlay: '1040',
  modal: '1050',
  popover: '1060',
  skipLink: '1070',
  toast: '1080',
  tooltip: '1090',
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS - Simplified font system
// =============================================================================

export const TYPOGRAPHY_TOKENS = {
  fontFamily: {
    primary:
      'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// =============================================================================
// COMPONENT-SPECIFIC TOKENS - High-level component configurations
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
    buttonPaddingX: SPACING_TOKENS.xl, // 2rem (48px)
    buttonPaddingY: '0.5rem', // 8px - keeps working value
    containerBorderRadius: '50px', // Pill shape
    buttonOverlap: '-20px', // Overlap effect

    // Animations
    transition: `left ${ANIMATION_TOKENS.duration.normal} cubic-bezier(0.25, 0.46, 0.45, 0.94), width ${ANIMATION_TOKENS.duration.normal} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  },

  // Button tokens
  button: {
    radius: BORDER_RADIUS_TOKENS.button, // 6px
    shadow: SHADOW_TOKENS.sm, // Subtle depth
    transition: `all ${ANIMATION_TOKENS.duration.fast} ${ANIMATION_TOKENS.easing['ease-in-out']}`,
  },

  // Card tokens
  card: {
    background: COLOR_TOKENS.surface.primary, // #ffffff
    radius: BORDER_RADIUS_TOKENS.card, // 8px
    shadow: SHADOW_TOKENS.card, // Card depth
    padding: SPACING_TOKENS.md, // 24px
  },
} as const;

// =============================================================================
// CONSOLIDATED DESIGN TOKENS - Single export
// =============================================================================

export const DESIGN_TOKENS = {
  colors: COLOR_TOKENS,
  spacing: SPACING_TOKENS,
  animation: ANIMATION_TOKENS,
  borderRadius: BORDER_RADIUS_TOKENS,
  shadows: SHADOW_TOKENS,
  zIndex: Z_INDEX_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  components: COMPONENT_TOKENS,
} as const;

// =============================================================================
// SCSS VARIABLE GENERATION - Convert tokens to SCSS format
// =============================================================================

export function generateSCSSVariables(): string {
  const scssVars: string[] = [
    '// =============================================================================',
    '// Generated SCSS Variables from TypeScript Design Tokens',
    '// DO NOT EDIT - This file is auto-generated from unified-design-tokens.ts',
    '// =============================================================================',
    '',
    '// Brand Colors',
    `$primary: ${BRAND_COLORS.primary};`,
    `$secondary: ${BRAND_COLORS.secondary};`,
    `$tertiary: ${BRAND_COLORS.tertiary};`,
    `$neutral: ${BRAND_COLORS.neutral};`,
    '',
    '// Semantic Colors',
    `$text-primary: ${COLOR_TOKENS.text.primary};`,
    `$text-inverse: ${COLOR_TOKENS.text.inverse};`,
    `$text-accent: ${COLOR_TOKENS.text.accent};`,
    `$text-muted: ${COLOR_TOKENS.text.muted};`,
    '',
    `$bg-primary: ${COLOR_TOKENS.background.primary};`,
    `$bg-secondary: ${COLOR_TOKENS.background.secondary};`,
    `$bg-accent: ${COLOR_TOKENS.background.accent};`,
    `$bg-inverse: ${COLOR_TOKENS.background.inverse};`,
    '',
    '// Spacing Scale',
  ];

  // Add spacing variables
  Object.entries(SPACING_TOKENS).forEach(([key, value]) => {
    scssVars.push(`$spacing-${key}: ${value};`);
  });

  scssVars.push('');
  scssVars.push('// Component Spacing');
  scssVars.push(
    `$nav-button-padding-x: ${COMPONENT_TOKENS.navigation.buttonPaddingX};`
  );
  scssVars.push(
    `$nav-button-padding-y: ${COMPONENT_TOKENS.navigation.buttonPaddingY};`
  );
  scssVars.push(`$component-padding: ${SPACING_TOKENS.component};`);
  scssVars.push(`$section-spacing: ${SPACING_TOKENS.section};`);

  return scssVars.join('\n');
}

// =============================================================================
// CSS CUSTOM PROPERTIES GENERATION - For runtime theming
// =============================================================================

export function generateCSSCustomProperties(): string {
  const cssVars: string[] = [
    ':root {',
    '  /* Brand Colors */',
    `  --color-primary: ${BRAND_COLORS.primary};`,
    `  --color-secondary: ${BRAND_COLORS.secondary};`,
    `  --color-tertiary: ${BRAND_COLORS.tertiary};`,
    `  --color-neutral: ${BRAND_COLORS.neutral};`,
    '',
    '  /* Semantic Colors */',
    `  --color-text-primary: ${COLOR_TOKENS.text.primary};`,
    `  --color-text-inverse: ${COLOR_TOKENS.text.inverse};`,
    `  --color-text-accent: ${COLOR_TOKENS.text.accent};`,
    `  --color-bg-primary: ${COLOR_TOKENS.background.primary};`,
    `  --color-bg-secondary: ${COLOR_TOKENS.background.secondary};`,
    '',
    '  /* Spacing */',
  ];

  // Add spacing custom properties
  Object.entries(SPACING_TOKENS).forEach(([key, value]) => {
    cssVars.push(`  --spacing-${key}: ${value};`);
  });

  cssVars.push('');
  cssVars.push('  /* Animation */');
  Object.entries(ANIMATION_TOKENS.duration).forEach(([key, value]) => {
    cssVars.push(`  --duration-${key}: ${value};`);
  });

  cssVars.push('}');

  return cssVars.join('\n');
}

// Export for immediate use
export default DESIGN_TOKENS;
