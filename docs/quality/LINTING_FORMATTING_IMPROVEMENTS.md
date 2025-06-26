# Linting & Formatting Configuration Analysis & Improvements

## 📊 Current Setup Analysis

### ✅ **Strengths of Current Configuration**

1. **Comprehensive Coverage**: ESLint, Prettier, Stylelint, and TypeScript
2. **Next.js Integration**: Proper Next.js ESLint configuration
3. **TypeScript Support**: Strong TypeScript rules with type checking
4. **Git Hooks**: Pre-commit quality checks with Husky
5. **Consistent Formatting**: Prettier for code formatting
6. **SCSS Support**: Stylelint with SCSS configuration

### 🎯 **Recommended Improvements**

## 1. Enhanced ESLint Configuration

### Current Issues:

- Limited accessibility rules
- No import ordering rules
- Missing React hooks rules
- No performance-related rules

### Improved `.eslintrc.js`:

```javascript
/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react-hooks', 'jsx-a11y', 'import'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
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

    // Import organization
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'off', // TypeScript handles this
    'import/no-duplicates': 'error',

    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',

    // General code quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  env: {
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
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

        // Performance
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
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
```

## 2. Enhanced Prettier Configuration

### Current Issues:

- Very basic configuration
- Missing useful formatting options

### Improved `.prettierrc`:

```json
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "printWidth": 100,
        "proseWrap": "always"
      }
    },
    {
      "files": "*.{yml,yaml}",
      "options": {
        "tabWidth": 2,
        "singleQuote": false
      }
    }
  ]
}
```

## 3. Enhanced Stylelint Configuration

### Current Issues:

- Basic SCSS configuration
- Missing performance rules
- No property ordering

### Improved `.stylelintrc.json`:

```json
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
    "stylelint-config-recess-order"
  ],
  "plugins": ["stylelint-order", "stylelint-scss", "stylelint-high-performance-animation"],
  "rules": {
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global", "export", "local"]
      }
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "layer",
          "apply",
          "config",
          "variants",
          "responsive",
          "screen"
        ]
      }
    ],
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": ["composes"]
      }
    ],

    // Performance rules
    "plugin/no-low-performance-animation-properties": [
      true,
      {
        "ignore": "paint-properties"
      }
    ],

    // Order rules
    "order/properties-alphabetical-order": null,
    "order/order": ["custom-properties", "declarations"],

    // SCSS specific
    "scss/dollar-variable-pattern": "^[a-z][a-zA-Z0-9-]*$",
    "scss/percent-placeholder-pattern": "^[a-z][a-zA-Z0-9-]*$",
    "scss/at-mixin-pattern": "^[a-z][a-zA-Z0-9-]*$",
    "scss/at-function-pattern": "^[a-z][a-zA-Z0-9-]*$",

    // Best practices
    "max-nesting-depth": 4,
    "selector-max-compound-selectors": 4,
    "color-named": "never",
    "font-weight-notation": "numeric",
    "length-zero-no-unit": true,

    // Disable conflicting rules with CSS modules
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global", "local", "export"]
      }
    ]
  },
  "ignoreFiles": ["**/*.js", "**/*.ts", "**/*.tsx"]
}
```

## 4. Enhanced TypeScript Configuration

### Current Issues:

- Could be more strict
- Missing useful compiler options

### Improved `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,

    // Enhanced strict options
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,

    // Module resolution
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/styles/*": ["./src/app/ui/styles/*"],
      "@/utils/*": ["./src/utils/*"]
    },

    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next", "coverage", "dist"]
}
```

## 5. Enhanced lint-staged Configuration

### Current Issues:

- Basic file handling
- Could be more efficient

### Improved `lint-staged.config.js`:

```javascript
/* eslint-env node */
const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['prettier --write', eslintCommand],

  // Styles
  '*.{css,scss}': ['prettier --write', 'stylelint --fix'],

  // Documentation and config
  '*.{md,json,yml,yaml}': ['prettier --write'],

  // Package.json
  'package.json': [
    'prettier --write',
    // Add package.json sorting if desired
  ],
};
```

## 6. New Package Dependencies

Add these packages for enhanced linting:

```bash
npm install --save-dev \\
  eslint-plugin-react-hooks \\
  eslint-plugin-jsx-a11y \\
  eslint-plugin-import \\
  @typescript-eslint/eslint-plugin \\
  eslint-import-resolver-typescript \\
  stylelint-config-recess-order \\
  stylelint-order \\
  stylelint-scss \\
  stylelint-high-performance-animation
```

## 7. Enhanced Scripts

### Improved `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "npm run lint:check && npm run type-check && next build",
    "start": "next start",

    // Separate linting commands
    "lint": "npm run lint:js && npm run lint:styles && npm run format:check",
    "lint:js": "next lint",
    "lint:styles": "stylelint \"**/*.{css,scss}\"",
    "lint:fix": "npm run lint:js -- --fix && npm run lint:styles -- --fix",

    // Formatting commands
    "format": "prettier --write .",
    "format:check": "prettier --check .",

    // Type checking
    "type-check": "tsc --noEmit",

    // Build commands
    "build:local": "npm run format && npm run lint:fix && npm run type-check && next build",

    // Testing
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",

    // Husky
    "prepare": "husky"
  }
}
```

## 8. Additional Configuration Files

### `.eslintignore`:

```ignore
.next/
node_modules/
coverage/
dist/
.husky/
*.config.js
public/
```

### Enhanced `.prettierignore`:

```ignore
node_modules
.next
.husky
coverage
dist
public
*.min.js
*.min.css
package-lock.json
yarn.lock
.prettierignore
.stylelintignore
.eslintignore
.gitignore
```

### Enhanced `.stylelintignore`:

```ignore
node_modules/
.next/
coverage/
dist/
public/
**/*.min.css
**/*.js
**/*.ts
**/*.tsx
```

## 🎯 Summary of Improvements

### Performance Enhancements:

- ✅ Animation performance linting
- ✅ Import organization for better tree shaking
- ✅ TypeScript strict mode for better optimization

### Code Quality:

- ✅ Enhanced accessibility rules
- ✅ React Hooks linting
- ✅ Import/export organization
- ✅ TypeScript strict configuration

### Developer Experience:

- ✅ Better error messages
- ✅ Separate commands for different types of linting
- ✅ Enhanced pre-commit hooks
- ✅ Consistent formatting across file types

### Maintainability:

- ✅ Property ordering in CSS
- ✅ SCSS naming conventions
- ✅ Import path aliases
- ✅ Comprehensive ignore files

## 🚀 Implementation Steps

1. **Install new dependencies**
2. **Update configuration files** with improved settings
3. **Run `npm run lint:fix`** to apply new rules
4. **Test the setup** with `npm run build`
5. **Update documentation** with new commands and rules

These improvements will provide better code quality, performance, accessibility, and developer
experience while maintaining the existing workflow.
