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
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
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
      files: ['**/*.{test,spec}.{js,ts,tsx}', '**/__tests__/**/*.{js,ts,tsx}'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
