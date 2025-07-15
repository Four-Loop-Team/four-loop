import type { Config } from 'tailwindcss';
import { BRAND_COLORS } from './src/constants/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: BRAND_COLORS.primary[300],
        secondary: BRAND_COLORS.neutral[950],
        accent: BRAND_COLORS.accent[600],
        light: BRAND_COLORS.neutral[50],
        dark: BRAND_COLORS.neutral[950],
        muted: BRAND_COLORS.neutral[500],
        surface: BRAND_COLORS.neutral[50],
        'surface-dim': BRAND_COLORS.neutral[100],
        'surface-dark': BRAND_COLORS.neutral[950],
      },
      borderRadius: {
        button: '30px',
      },
    },
  },

  plugins: [],
};

export default config;
