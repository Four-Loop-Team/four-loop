# Design System Quick Reference

## 🚀 Getting Started

### Import Design Tokens

```typescript
import { DESIGN_SYSTEM } from '@/constants/design-system';
```

### Use in Components

```typescript
// Using design tokens directly
const styles = {
  padding: DESIGN_SYSTEM.spacing.scale[4],
  color: DESIGN_SYSTEM.colors.brand.primary[600],
  fontSize: DESIGN_SYSTEM.typography.sizes.lg,
};

// Using component tokens
const buttonStyles = {
  ...DESIGN_SYSTEM.components.button,
  backgroundColor: DESIGN_SYSTEM.colors.brand.primary[500],
};
```

### Use CSS Utilities

```html
<div class="card p-lg rounded-lg shadow-md">
  <h3 class="text-xl font-semibold text-primary mb-md">Title</h3>
  <p class="text-base text-secondary">Content</p>
  <button class="btn btn-primary btn-md">Action</button>
</div>
```

## 🎨 Quick Token Reference

### Colors

```typescript
// Brand colors
DESIGN_SYSTEM.colors.brand.primary[500]; // Main brand
DESIGN_SYSTEM.colors.brand.neutral[900]; // Dark text
DESIGN_SYSTEM.colors.brand.accent[600]; // Accent color

// Semantic colors
DESIGN_SYSTEM.colors.semantic.success[500]; // #22c55e
DESIGN_SYSTEM.colors.semantic.warning[500]; // #f59e0b
DESIGN_SYSTEM.colors.semantic.error[500]; // #ef4444
DESIGN_SYSTEM.colors.semantic.info[500]; // #3b82f6

// Theme-aware (CSS variables)
DESIGN_SYSTEM.colors.contextual.text.primary; // var(--color-text-primary)
DESIGN_SYSTEM.colors.contextual.surface.primary; // var(--color-surface-primary)
DESIGN_SYSTEM.colors.contextual.border.default; // var(--color-border-default)
```

### Typography

```typescript
// Font sizes
DESIGN_SYSTEM.typography.sizes.xs; // 0.75rem (12px)
DESIGN_SYSTEM.typography.sizes.sm; // 0.875rem (14px)
DESIGN_SYSTEM.typography.sizes.base; // 1rem (16px)
DESIGN_SYSTEM.typography.sizes.lg; // 1.125rem (18px)
DESIGN_SYSTEM.typography.sizes.xl; // 1.25rem (20px)
DESIGN_SYSTEM.typography.sizes['2xl']; // 1.5rem (24px)

// Font weights
DESIGN_SYSTEM.typography.weights.light; // 300
DESIGN_SYSTEM.typography.weights.regular; // 400
DESIGN_SYSTEM.typography.weights.medium; // 500
DESIGN_SYSTEM.typography.weights.semibold; // 600
DESIGN_SYSTEM.typography.weights.bold; // 700

// Line heights
DESIGN_SYSTEM.typography.lineHeights.tight; // 1.1
DESIGN_SYSTEM.typography.lineHeights.normal; // 1.4
DESIGN_SYSTEM.typography.lineHeights.relaxed; // 1.6

// Presets
DESIGN_SYSTEM.typography.presets.button; // Pre-configured button text
DESIGN_SYSTEM.typography.presets.label; // Form label styles
DESIGN_SYSTEM.typography.presets.code; // Code block styles
```

### Spacing

```typescript
// Scale (8px based)
DESIGN_SYSTEM.spacing.scale[1]; // 0.25rem (4px)
DESIGN_SYSTEM.spacing.scale[2]; // 0.5rem (8px)
DESIGN_SYSTEM.spacing.scale[4]; // 1rem (16px)
DESIGN_SYSTEM.spacing.scale[8]; // 2rem (32px)
DESIGN_SYSTEM.spacing.scale[16]; // 4rem (64px)

// Semantic spacing
DESIGN_SYSTEM.spacing.semantic.component.xs; // 0.25rem
DESIGN_SYSTEM.spacing.semantic.component.sm; // 0.5rem
DESIGN_SYSTEM.spacing.semantic.component.md; // 1rem
DESIGN_SYSTEM.spacing.semantic.component.lg; // 1.5rem
DESIGN_SYSTEM.spacing.semantic.component.xl; // 2rem

// Layout spacing
DESIGN_SYSTEM.spacing.semantic.layout.sm; // 1.5rem
DESIGN_SYSTEM.spacing.semantic.layout.md; // 2rem
DESIGN_SYSTEM.spacing.semantic.layout.lg; // 3rem
```

## 🛠️ Component Patterns

### Button

```typescript
// Using component tokens
const buttonStyle = {
  padding: DESIGN_SYSTEM.components.button.padding.md,
  fontSize: DESIGN_SYSTEM.components.button.fontSize.md,
  borderRadius: DESIGN_SYSTEM.components.button.borderRadius,
  transition: DESIGN_SYSTEM.animation.presets.all,
};

// Using CSS classes
<button class="btn btn-primary btn-md">Click me</button>
```

### Card

```typescript
// Using component tokens
const cardStyle = {
  padding: DESIGN_SYSTEM.components.card.padding,
  borderRadius: DESIGN_SYSTEM.components.card.borderRadius,
  boxShadow: DESIGN_SYSTEM.components.card.shadow,
};

// Using CSS classes
<div class="card p-lg rounded-lg shadow-md">Content</div>
```

### Input

```typescript
// Using component tokens
const inputStyle = {
  padding: DESIGN_SYSTEM.components.input.padding.md,
  fontSize: DESIGN_SYSTEM.components.input.fontSize.md,
  borderRadius: DESIGN_SYSTEM.components.input.borderRadius,
};

// Using CSS classes
<input class="input rounded-md border-default focus:ring" />
```

## 🌙 Theme Management

### Theme Provider

```tsx
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

// Wrap your app
<ThemeProvider defaultTheme='auto'>
  <App />
</ThemeProvider>;

// Use in components
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

### Theme Controls

```tsx
import { ThemeToggle, ThemeSelector } from '@/components/ThemeProvider';

// Simple toggle button
<ThemeToggle />

// Dropdown selector
<ThemeSelector />
```

### Manual Theme Switching

```typescript
// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');

// Using CSS classes
document.documentElement.classList.toggle('dark', true);
```

## 📱 Responsive Design

### CSS Utilities

```html
<!-- Responsive classes -->
<div class="text-base sm:text-lg md:text-xl lg:text-2xl">Responsive text</div>

<div class="p-sm md:p-lg lg:p-xl">Responsive padding</div>

<div class="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">Responsive grid</div>
```

### Fluid Typography

```typescript
// Scales automatically with viewport
fontSize: DESIGN_SYSTEM.typography.fluid.fluidH1; // clamp(2.25rem, 4vw + 1rem, 4.5rem)
fontSize: DESIGN_SYSTEM.typography.fluid.fluidBody; // clamp(0.875rem, 1vw + 0.5rem, 1.125rem)
```

## ✨ Animation & Effects

### Transitions

```typescript
// Preset transitions
transition: DESIGN_SYSTEM.animation.presets.all; // all 300ms ease-in-out
transition: DESIGN_SYSTEM.animation.presets.colors; // color transitions
transition: DESIGN_SYSTEM.animation.presets.transform; // transform with spring

// Custom timing
duration: DESIGN_SYSTEM.animation.duration.fast; // 150ms
duration: DESIGN_SYSTEM.animation.duration.normal; // 300ms
easing: DESIGN_SYSTEM.animation.easing.spring; // cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

### Shadows & Elevation

```typescript
boxShadow: DESIGN_SYSTEM.shadows.sm; // Subtle shadow
boxShadow: DESIGN_SYSTEM.shadows.md; // Medium shadow
boxShadow: DESIGN_SYSTEM.shadows.lg; // Large shadow

// Z-index layering
zIndex: DESIGN_SYSTEM.zIndex.modal; // 1400
zIndex: DESIGN_SYSTEM.zIndex.dropdown; // 1000
```

## 🎯 Best Practices

1. **Use semantic tokens** when possible:

   ```typescript
   // ✅ Good
   color: DESIGN_SYSTEM.colors.contextual.text.primary;

   // ❌ Avoid
   color: DESIGN_SYSTEM.colors.brand.neutral[900];
   ```

2. **Prefer component tokens** for UI consistency:

   ```typescript
   // ✅ Good
   padding: DESIGN_SYSTEM.components.button.padding.md;

   // ❌ Avoid
   padding: '10px 16px';
   ```

3. **Use CSS custom properties** for theme-aware styling:

   ```css
   /* ✅ Good - adapts to theme */
   color: var(--color-text-primary);

   /* ❌ Avoid - static color */
   color: #333333;
   ```

4. **Leverage responsive utilities**:

   ```html
   <!-- ✅ Good - responsive -->
   <div class="text-sm md:text-base lg:text-lg">
     <!-- ❌ Avoid - fixed size -->
     <div class="text-base"></div>
   </div>
   ```

## 🔗 Useful Links

- Design System Demo: `/design-system-demo`
- Test Page: `/test-design-system`
- Full Documentation: `/docs/DESIGN_SYSTEM.md`
- Color Constants: `/src/constants/colors.ts`
- Typography Constants: `/src/constants/typography.ts`
- Spacing Constants: `/src/constants/spacing.ts`
