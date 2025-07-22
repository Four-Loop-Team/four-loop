# Styling Architecture Proposal - Four Loop Digital Template

## 🎯 Goals

- Create a scalable, maintainable styling system
- Establish clear usage guidelines
- Fix current integration issues
- Make this a solid template for future projects

## 🏗️ Proposed Architecture

### **Tier 1: Design Tokens (Single Source of Truth)**

```typescript
// src/design-system/tokens.ts
export const DESIGN_TOKENS = {
  colors: {
    brand: {
      primary: '#e2e891',
      secondary: '#353535',
      accent: '#69685a',
      background: '#353535',
    },
    semantic: {
      text: {
        primary: '#ffffff',
        secondary: '#353535',
        tertiary: '#9a9a9a',
      },
      surface: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        inverse: '#353535',
      },
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    // ... existing typography tokens
  },
} as const;
```

### **Tier 2: CSS Custom Properties (Runtime Bridge)**

```css
/* src/styles/tokens.css */
:root {
  /* Generated from design tokens */
  --color-brand-primary: #e2e891;
  --color-text-primary: #ffffff;
  --spacing-md: 1rem;

  /* Theme variants */
  [data-theme='dark'] {
    --color-surface-primary: #353535;
  }
}
```

### **Tier 3: Tailwind Integration (Utility Generation)**

```typescript
// tailwind.config.ts - Simplified and working
import { DESIGN_TOKENS } from './src/design-system/tokens';

export default {
  theme: {
    colors: {
      // Direct mapping from tokens
      brand: DESIGN_TOKENS.colors.brand,
      text: DESIGN_TOKENS.colors.semantic.text,
      surface: DESIGN_TOKENS.colors.semantic.surface,
    },
    spacing: DESIGN_TOKENS.spacing,
  },
};
```

### **Tier 4: Component Implementation (Clear Guidelines)**

#### ✅ **Primary Method: Tailwind Classes**

```tsx
// For 90% of styling needs
<button className='bg-brand-primary text-text-primary px-md py-sm rounded-md'>Click me</button>
```

#### ✅ **Secondary Method: CSS Variables (When Tailwind isn't enough)**

```tsx
// For complex animations, dynamic values, or custom properties
<div style={{
  backgroundColor: 'var(--color-brand-primary)',
  transform: `translateX(${dynamicValue}px)`
}}>
```

#### ✅ **Tertiary Method: sx prop (MUI components only)**

```tsx
// Only for Material-UI components
<Paper sx={{
  bgcolor: 'var(--color-surface-primary)',
  p: 'var(--spacing-md)'
}}>
```

#### ❌ **Avoid: Hardcoded values**

```tsx
// Never do this
style={{ backgroundColor: '#e2e891' }}
sx={{ color: '#353535' }}
```

## 🛠️ Implementation Plan

### Phase 1: Fix Core Issues

1. ✅ Create unified design tokens
2. ✅ Fix Tailwind configuration
3. ✅ Update CSS custom properties
4. ✅ Create usage guidelines

### Phase 2: Standardize Components

1. Update all components to use new system
2. Remove hardcoded colors
3. Standardize spacing usage
4. Create component style guides

### Phase 3: Developer Experience

1. Create linting rules
2. Add TypeScript types for design tokens
3. Create VS Code snippets
4. Documentation and examples

## 📋 Usage Guidelines

### **When to use what:**

| Scenario                   | Method                  | Example                                               |
| -------------------------- | ----------------------- | ----------------------------------------------------- |
| Standard component styling | Tailwind classes        | `className="bg-brand-primary"`                        |
| Dynamic/calculated values  | CSS variables + inline  | `style={{ width: 'calc(100% - var(--spacing-lg))' }}` |
| Material-UI components     | sx with CSS variables   | `sx={{ bgcolor: 'var(--color-surface-primary)' }}`    |
| Animations/transitions     | CSS classes + variables | Custom CSS with `var()` functions                     |
| Component variants         | Tailwind + clsx/cn      | Conditional class application                         |

### **File Organization:**

```
src/
├── design-system/
│   ├── tokens.ts           # Single source of truth
│   ├── components.ts       # Component-specific tokens
│   └── themes.ts          # Theme variants
├── styles/
│   ├── globals.css        # CSS custom properties
│   ├── components.css     # Component base styles
│   └── utilities.css      # Custom utility classes
└── components/
    └── [component]/
        ├── Component.tsx
        ├── Component.styles.ts  # Component-specific styles if needed
        └── Component.stories.tsx
```

## 🎨 Component Style Patterns

### **Button Component Example:**

```tsx
// styles/button.styles.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-text-primary hover:bg-brand-primary/90',
        secondary: 'bg-surface-secondary text-text-secondary',
        outline: 'border border-brand-primary text-brand-primary',
      },
      size: {
        sm: 'px-sm py-xs text-sm',
        md: 'px-md py-sm',
        lg: 'px-lg py-md text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

## 🔍 Quality Checks

### **Automated Linting:**

```javascript
// .eslintrc.js - Custom rules
rules: {
  // Prevent hardcoded colors
  'no-hardcoded-colors': 'error',
  // Ensure design token usage
  'use-design-tokens': 'warn',
}
```

### **TypeScript Safety:**

```typescript
// Ensure type safety for design tokens
type ColorToken = keyof typeof DESIGN_TOKENS.colors.brand;
type SpacingToken = keyof typeof DESIGN_TOKENS.spacing;
```

## 🚀 Benefits of This Approach

1. **Single Source of Truth**: All values come from design tokens
2. **Type Safety**: Full TypeScript support
3. **Theme Support**: Easy light/dark mode switching
4. **Performance**: Optimal CSS output
5. **Developer Experience**: Clear guidelines and tooling
6. **Scalability**: Easy to extend for new projects
7. **Consistency**: Enforced through tooling and patterns

## 📖 Migration Strategy

1. **Phase 1**: Implement new token system alongside existing
2. **Phase 2**: Migrate components one by one
3. **Phase 3**: Remove old patterns and clean up
4. **Phase 4**: Add quality gates and documentation

This approach will create a robust, maintainable styling system that can serve as an excellent
template for future React applications.
