/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    // Jest rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    // React Hook rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General code quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // Color system enforcement - prevent hardcoded colors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/^#[0-9A-Fa-f]{6}$/]',
        message:
          '❌ Hardcoded hex colors are not allowed. Use CSS custom properties (var(--color-*)) or theme colors from @/lib/theme instead.',
      },
      {
        selector: 'Literal[value=/^#[0-9A-Fa-f]{3}$/]',
        message:
          '❌ Hardcoded hex colors are not allowed. Use CSS custom properties (var(--color-*)) or theme colors from @/lib/theme instead.',
      },
    ],
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: [
        '**/layout.tsx',
        '**/metadata.ts',
        '**/constants/**',
        '**/design-system/**',
        '**/lib/theme/**',
        '**/__tests__/**',
        '**/test/**',
      ],
      rules: {
        'no-restricted-syntax': 'off', // Allow hardcoded colors in design system, theme, and test files
      },
    },
    {
      files: ['**/demo/**', '**/style-guide/**'],
      rules: {
        'no-restricted-syntax': 'off', // Allow hardcoded colors in demo/style guide pages for documentation
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'next/core-web-vitals',
        'prettier',
      ],
      rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      },
    },
    {
      // Configuration files
      files: ['*.config.{js,ts}', '.eslintrc.js'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // Test files
      files: [
        '**/*.{test,spec}.{js,ts,tsx}',
        '**/__tests__/**/*.{js,ts,tsx}',
        'src/test/**/*.{js,ts,tsx}',
      ],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
