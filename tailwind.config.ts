import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-poppins)',
          '-apple-system',
          'blinkmacsystemfont',
          'Segoe UI',
          'roboto',
          'sans-serif',
        ],
      },
      colors: {
        fld: {
          dark: '#232323', // Main background
          'light-green': '#e2e891', // Component background
          'logo-green': '#69685a', // Logo color
          white: '#fff', // Font and border
          'dark-gray': '#353535', // Font and border
        },
      },
      fontSize: {
        // Desktop sizes
        'h1-desktop': ['48px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-desktop': ['21px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-desktop': [
          '14px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-desktop': ['30px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-desktop': ['21px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-desktop': ['14px', { lineHeight: '1.6', fontWeight: '300' }],

        // Tablet sizes
        'h1-tablet': ['28px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-tablet': ['12px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-tablet': [
          '9px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-tablet': ['16px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-tablet': ['12px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-tablet': ['9px', { lineHeight: '1.6', fontWeight: '300' }],

        // Mobile sizes
        'h1-mobile': ['24px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-mobile': ['11px', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading-1-mobile': [
          '9px',
          { lineHeight: '1.2', fontWeight: '400' },
        ],
        'body-1-mobile': ['14px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-2-mobile': ['13px', { lineHeight: '1.6', fontWeight: '300' }],
        'body-3-mobile': ['10px', { lineHeight: '1.6', fontWeight: '300' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
