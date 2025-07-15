'use client';

/* eslint-disable no-restricted-syntax */
// This file contains legitimate hardcoded brand colors as part of the theme definition

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { SEMANTIC_SPACING, SPACING_SCALE } from '../../../constants/spacing';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode for better contrast
    primary: {
      main: '#e2e891', // Primary brand color - matches SCSS
      light: '#f0f4a6',
      dark: '#d1d57a',
      contrastText: '#232323',
    },
    secondary: {
      main: '#353535', // Dark gray - matches SCSS
      light: '#4a4a4a',
      dark: '#2a2a2a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#353535', // Dark background - matches SCSS
      paper: '#232323',
    },
    text: {
      primary: '#ffffff', // High contrast white text
      secondary: 'rgba(255, 255, 255, 0.85)', // Slightly dimmed but still accessible
    },
    error: {
      main: '#f44336',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#000000',
    },
    info: {
      main: '#2196f3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'var(--font-poppins), sans-serif',
    // Ensure proper contrast ratios for all text variants
    h1: {
      color: '#ffffff',
      fontWeight: 600,
    },
    h2: {
      color: '#ffffff',
      fontWeight: 600,
    },
    h3: {
      color: '#ffffff',
      fontWeight: 500,
    },
    h4: {
      color: '#ffffff',
      fontWeight: 500,
    },
    h5: {
      color: 'rgba(255, 255, 255, 0.95)', // High contrast for subtitles
      fontWeight: 400,
    },
    h6: {
      color: 'rgba(255, 255, 255, 0.9)', // Good contrast for smaller headings
      fontWeight: 400,
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.87)', // WCAG AA compliant
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.85)', // WCAG AA compliant
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    // Ensure CssBaseline applies our background consistently
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#353535',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
        html: {
          backgroundColor: '#353535',
          minHeight: '100vh',
        },
        '#root, #__next': {
          backgroundColor: '#353535',
          minHeight: '100vh',
        },
      },
    },
  },
});

/**
 * Brand colors object for use in sx props and components
 * These match our theme palette and SCSS variables
 */
export const colors = {
  highlight: '#e2e891', // Primary brand color
  backgroundPrimary: '#353535', // Main background
  backgroundSecondary: '#232323', // Card/paper background
  textLight: '#ffffff', // Primary text color (white)
  textDark: '#353535', // Dark text for light backgrounds
  textMuted: '#666666', // Muted text for secondary content
  accent: '#2d4747', // Accent color for gradients and special elements
} as const;

/**
 * Brand spacing tokens for consistent spacing across components
 * Based on 8px grid system for visual harmony
 */
export const spacing = {
  // Component spacing (most commonly used)
  component: {
    xs: SEMANTIC_SPACING.component.xs, // 4px
    sm: SEMANTIC_SPACING.component.sm, // 8px
    md: SEMANTIC_SPACING.component.md, // 16px
    lg: SEMANTIC_SPACING.component.lg, // 24px
    xl: SEMANTIC_SPACING.component.xl, // 32px
  },
  // Layout spacing (for larger structural elements)
  layout: {
    xs: SEMANTIC_SPACING.layout.xs, // 32px
    sm: SEMANTIC_SPACING.layout.sm, // 48px
    md: SEMANTIC_SPACING.layout.md, // 64px
    lg: SEMANTIC_SPACING.layout.lg, // 96px
    xl: SEMANTIC_SPACING.layout.xl, // 128px
  },
  // Section spacing (for page-level spacing)
  section: {
    xs: SEMANTIC_SPACING.section.xs, // 64px
    sm: SEMANTIC_SPACING.section.sm, // 80px
    md: SEMANTIC_SPACING.section.md, // 96px
    lg: SEMANTIC_SPACING.section.lg, // 128px
    xl: SEMANTIC_SPACING.section.xl, // 160px
  },
  // Direct access to base scale
  scale: SPACING_SCALE,
} as const;

/**
 * Brand typography tokens for consistent text styling
 * Matches Material-UI theme typography with brand-specific values
 */
export const typography = {
  // Font families
  fontFamily: {
    primary: 'var(--font-poppins), sans-serif',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  // Font sizes (following Material-UI conventions)
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
    '6xl': '4rem', // 64px
  },
  // Line heights
  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

interface BrandThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Four Loop Digital Brand Theme Provider Component
 *
 * This component provides consistent theming across all Material-UI components,
 * implementing the Four Loop Digital brand colors, typography, and design tokens.
 * Includes dark mode support and accessibility-compliant color contrasts.
 *
 * @component
 * @example
 * ```tsx
 * // Wrap your app with the theme provider
 * <BrandThemeProvider>
 *   <App />
 * </BrandThemeProvider>
 * ```
 *
 * @param {BrandThemeProviderProps} props - The theme provider props
 * @param {React.ReactNode} props.children - Child components to receive theme context
 * @returns {JSX.Element} The themed application wrapper
 *
 * @accessibility
 * - WCAG AA compliant color contrasts (4.5:1 minimum)
 * - Dark mode optimized for reduced eye strain
 * - High contrast text and background combinations
 *
 * @design
 * - Primary: #e2e891 (brand yellow-green)
 * - Secondary: #353535 (dark gray)
 * - Background: #232323 (deep dark)
 * - Typography: Poppins font family
 */
export default function BrandThemeProvider({
  children,
}: BrandThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
