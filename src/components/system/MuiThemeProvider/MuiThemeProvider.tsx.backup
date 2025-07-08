'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
      default: '#232323', // Dark background - matches SCSS
      paper: '#353535',
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
  },
});

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
