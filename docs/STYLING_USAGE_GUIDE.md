# Four Loop Digital - Styling System Usage Guide

## 🎯 Overview

This guide provides clear, actionable guidelines for using the Four Loop Digital styling system. It
establishes when to use each styling method and ensures consistency across all future React
applications.

## 🏗️ Architecture Summary

### **Single Source of Truth**

All design values are defined in `src/design-system/tokens.ts` and flow through the system:

```
Design Tokens → Tailwind Config → Component Styles → UI
```

### **Styling Methods Hierarchy (Use in this order)**

1. **Tailwind Classes** (Primary) - 90% of use cases
2. **CSS Variables** (Secondary) - Dynamic/calculated values
3. **sx prop** (Tertiary) - Material-UI components only
4. **Inline Styles** (Last Resort) - Temporary fixes only

## 📋 When to Use What

### ✅ **USE: Tailwind Classes (Primary Method)**

**For:** Layout, spacing, colors, typography, responsive design

```tsx
// ✅ Standard component styling
<button className="bg-brand-primary text-text-secondary px-md py-sm rounded-md hover:opacity-90">
  Click me
</button>

// ✅ Responsive layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
  {/* content */}
</div>

// ✅ State variants
<div className={`
  bg-surface-primary border border-default rounded-lg p-lg
  ${isActive ? 'border-brand-primary bg-brand-primary/10' : ''}
  ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
`}>
```

**Available Classes:**

- **Colors**: `bg-brand-primary`, `text-text-primary`, `border-border-default`
- **Spacing**: `p-md`, `m-lg`, `gap-sm`, `space-y-4`
- **Layout**: `flex`, `grid`, `items-center`, `justify-between`
- **Typography**: `text-lg`, `font-medium`, `leading-normal`

### ✅ **USE: CSS Variables (Secondary Method)**

**For:** Dynamic values, calculations, animations, theme switching

```tsx
// ✅ Dynamic/calculated values
<div style={{
  width: `calc(100% - var(--spacing-lg))`,
  transform: `translateX(${position}px)`,
  backgroundColor: isDark ? 'var(--color-surface-inverse)' : 'var(--color-surface-primary)'
}}>

// ✅ Complex animations (in CSS)
.slide-enter {
  transform: translateX(-100%);
  transition: transform var(--duration-normal) var(--easing-out);
}
```

**Available Variables:**

- **Colors**: `var(--color-brand-primary)`, `var(--color-text-secondary)`
- **Spacing**: `var(--spacing-md)`, `var(--spacing-lg)`
- **Effects**: `var(--duration-fast)`, `var(--easing-out)`

### ✅ **USE: sx prop (Tertiary Method)**

**For:** Material-UI components only, using CSS variables

```tsx
// ✅ Material-UI with design tokens
<Paper sx={{
  bgcolor: 'var(--color-surface-primary)',
  p: 'var(--spacing-lg)',
  borderRadius: 'var(--border-radius-lg)'
}}>

// ✅ Material-UI responsive
<Box sx={{
  display: { xs: 'block', md: 'flex' },
  gap: 'var(--spacing-md)'
}}>
```

### ❌ **AVOID: These Patterns**

```tsx
// ❌ Hardcoded colors
style={{ backgroundColor: '#e2e891' }}
sx={{ color: '#353535' }}

// ❌ Hardcoded spacing
className="pt-3 pl-5"  // Use semantic spacing instead

// ❌ Magic numbers
style={{ width: '247px' }}  // Use design tokens

// ❌ Inline styles for static values
style={{ borderRadius: '8px' }}  // Use Tailwind: rounded-lg

// ❌ CSS-in-JS for simple styling
const StyledButton = styled.button`
  background: #e2e891;  // Use Tailwind instead
`;
```

## 🎨 Component Patterns

### **Button Component Example**

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-text-secondary hover:opacity-90',
        secondary: 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary',
        outline:
          'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-text-secondary',
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

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
```

### **Layout Component Example**

```tsx
// ✅ Grid layout with design tokens
export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg p-lg'>{children}</div>
  );
}

// ✅ Card component
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-primary border border-border-default rounded-lg p-lg shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

## 🔧 Migration Strategy

### **Phase 1: Replace Hardcoded Values**

```tsx
// Before
<div style={{ backgroundColor: '#e2e891', padding: '16px' }}>

// After
<div className="bg-brand-primary p-md">
```

### **Phase 2: Standardize Spacing**

```tsx
// Before
<div className="pt-3 pl-5 mb-4">

// After
<div className="pt-sm pl-md mb-md">
```

### **Phase 3: Use Semantic Colors**

```tsx
// Before
<div className="bg-gray-100 text-gray-800">

// After
<div className="bg-surface-secondary text-text-secondary">
```

## 🛠️ Developer Tools

### **VS Code Snippets**

Create `.vscode/snippets.json`:

```json
{
  "Four Loop Button": {
    "prefix": "flbutton",
    "body": [
      "<Button variant=\"${1|primary,secondary,outline|}\" size=\"${2|sm,md,lg|}\">",
      "  $3",
      "</Button>"
    ]
  },
  "Four Loop Card": {
    "prefix": "flcard",
    "body": [
      "<div className=\"bg-surface-primary border border-border-default rounded-lg p-lg\">",
      "  $1",
      "</div>"
    ]
  }
}
```

### **ESLint Rules**

Add to `.eslintrc.js`:

```javascript
rules: {
  // Prevent hardcoded colors
  'no-restricted-syntax': [
    'error',
    {
      selector: 'Literal[value=/^#[0-9a-fA-F]{3,6}$/]',
      message: 'Use design tokens instead of hardcoded hex colors'
    }
  ]
}
```

### **Utility Function**

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  className
)}>
```

## 📊 Quality Checklist

Before submitting code, ensure:

- [ ] No hardcoded colors (hex, rgb, hsl)
- [ ] No magic numbers for spacing
- [ ] Using semantic Tailwind classes
- [ ] Proper responsive design patterns
- [ ] Consistent component variants
- [ ] Accessible focus states
- [ ] Theme-aware implementations

## 🎯 Benefits

### **For Developers:**

- Clear decision tree for styling choices
- Consistent patterns across components
- Type-safe design token usage
- Reduced cognitive load

### **For Design System:**

- Single source of truth
- Easy theme switching
- Consistent visual language
- Scalable architecture

### **For Future Projects:**

- Copy-paste ready patterns
- Battle-tested architecture
- Comprehensive documentation
- Built-in best practices

## 📖 Quick Reference

| Need          | Method     | Example                                                                                     |
| ------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Static color  | Tailwind   | `bg-brand-primary`                                                                          |
| Dynamic color | CSS var    | `style={{ color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-tertiary)' }}` |
| Layout        | Tailwind   | `flex items-center gap-md`                                                                  |
| Animation     | CSS + vars | `transition-transform duration-normal`                                                      |
| MUI component | sx + vars  | `sx={{ bgcolor: 'var(--color-surface-primary)' }}`                                          |
| Responsive    | Tailwind   | `grid grid-cols-1 md:grid-cols-2`                                                           |

This system provides a clear, maintainable approach that scales across projects while maintaining
design consistency and developer productivity.
