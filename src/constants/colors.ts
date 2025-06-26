/**
 * Design system colors and theme constants
 */

export const COLORS = {
  // Primary brand colors
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrast: '#ffffff',
  },

  // Secondary colors
  secondary: {
    main: '#dc004e',
    light: '#e91e63',
    dark: '#c51162',
    contrast: '#ffffff',
  },

  // Neutral colors
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic colors
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrast: '#ffffff',
  },

  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrast: '#ffffff',
  },

  error: {
    main: '#d32f2f',
    light: '#f44336',
    dark: '#c62828',
    contrast: '#ffffff',
  },

  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrast: '#ffffff',
  },
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

export const Z_INDEX = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

export type ColorPalette = keyof typeof COLORS;
export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];
