import type { Config } from 'tailwindcss';
import {
  BRAND_COLORS,
  ELEVATION,
  SEMANTIC_COLORS,
} from './src/constants/colors';
import { SEMANTIC_SPACING, SPACING_SCALE } from './src/constants/spacing';
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LETTER_SPACING,
  LINE_HEIGHTS,
} from './src/constants/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // Override default spacing with our design system
    spacing: SPACING_SCALE,

    // Override default font sizes
    fontSize: FONT_SIZES,

    // Override default font weights
    fontWeight: FONT_WEIGHTS,

    // Override default line heights
    lineHeight: LINE_HEIGHTS,

    // Override default letter spacing
    letterSpacing: LETTER_SPACING,

    extend: {
      // Font families
      fontFamily: {
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
      },

      // Enhanced color system
      colors: {
        // Brand colors with full scale
        primary: BRAND_COLORS.primary,
        neutral: BRAND_COLORS.neutral,
        accent: BRAND_COLORS.accent,

        // Semantic colors
        success: SEMANTIC_COLORS.success,
        warning: SEMANTIC_COLORS.warning,
        error: SEMANTIC_COLORS.error,
        info: SEMANTIC_COLORS.info,

        // Theme-aware colors using CSS variables
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
          elevated: 'var(--color-background-elevated)',
          overlay: 'var(--color-background-overlay)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          elevated: 'var(--color-surface-elevated)',
          inverse: 'var(--color-surface-inverse)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
          'link-hover': 'var(--color-text-link-hover)',
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          focus: 'var(--color-border-focus)',
          error: 'var(--color-border-error)',
          disabled: 'var(--color-border-disabled)',
        },

        // Legacy colors for backward compatibility
        fld: {
          dark: '#232323',
          'light-green': '#e2e891',
          'logo-green': '#69685a',
          white: '#fff',
          'dark-gray': '#353535',
        },
      },

      // Enhanced box shadows using elevation system
      boxShadow: {
        ...ELEVATION,
        // Custom focus shadows
        'focus-primary': `0 0 0 2px var(--color-border-focus)`,
        'focus-error': `0 0 0 2px var(--color-border-error)`,
      },

      // Semantic spacing
      gap: SEMANTIC_SPACING.component,
      padding: SEMANTIC_SPACING.component,
      margin: SEMANTIC_SPACING.component,

      // Enhanced responsive breakpoints
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // Enhanced typography with your existing responsive system
      fontSize: {
        // Keep your existing responsive typography
        'h1-desktop': ['48px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-desktop': ['21px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-desktop': [
          '14px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-desktop': ['30px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-desktop': ['21px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-desktop': ['14px', { lineHeight: '1.6', fontWeight: '300' }],

        'h1-tablet': ['28px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-tablet': ['12px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-tablet': [
          '9px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-tablet': ['16px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-tablet': ['12px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-tablet': ['9px', { lineHeight: '1.6', fontWeight: '300' }],

        'h1-mobile': ['24px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-mobile': ['11px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-mobile': [
          '9px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-mobile': ['14px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-mobile': ['13px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-mobile': ['10px', { lineHeight: '1.6', fontWeight: '300' }],

        // New semantic typography
        'display-2xl': [
          '4.5rem',
          { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'display-xl': [
          '3.75rem',
          { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'display-lg': [
          '3rem',
          { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'display-md': [
          '2.25rem',
          { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'display-sm': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],

        'heading-2xl': [
          '2.25rem',
          { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'heading-xl': [
          '1.875rem',
          { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
        ],
        'heading-lg': [
          '1.5rem',
          { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.025em' },
        ],
        'heading-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-xs': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],

        'body-2xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-xl': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],

        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-sm': [
          '0.75rem',
          { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.025em' },
        ],

        'caption-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-md': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],

        'overline-lg': [
          '0.75rem',
          {
            lineHeight: '1.4',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          },
        ],
        'overline-md': [
          '0.75rem',
          {
            lineHeight: '1.4',
            fontWeight: '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
        ],
      },

      // Enhanced animations and transitions
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // Enhanced border radius
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },

      // Background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': `linear-gradient(135deg, ${BRAND_COLORS.primary[500]}, ${BRAND_COLORS.primary[600]})`,
        'gradient-accent': `linear-gradient(135deg, ${BRAND_COLORS.accent[500]}, ${BRAND_COLORS.accent[600]})`,
      },

      // Enhanced z-index scale
      zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '0',
        docked: '10',
        dropdown: '1000',
        sticky: '1100',
        banner: '1200',
        overlay: '1300',
        modal: '1400',
        popover: '1500',
        skipLink: '1600',
        toast: '1700',
        tooltip: '1800',
      },
    },
  },
  plugins: [
    // Add custom utilities for design system
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<
          string,
          Record<string, string | Record<string, string>>
        >
      ) => void;
    }) {
      const newUtilities = {
        // Semantic spacing utilities
        '.space-component-xs': { gap: SEMANTIC_SPACING.component.xs },
        '.space-component-sm': { gap: SEMANTIC_SPACING.component.sm },
        '.space-component-md': { gap: SEMANTIC_SPACING.component.md },
        '.space-component-lg': { gap: SEMANTIC_SPACING.component.lg },
        '.space-component-xl': { gap: SEMANTIC_SPACING.component.xl },

        // Focus utilities
        '.focus-primary': {
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 2px var(--color-border-focus)',
          },
        },
        '.focus-error': {
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 2px var(--color-border-error)',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
