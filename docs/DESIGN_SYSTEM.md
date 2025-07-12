# Design System Documentation

## Overview

This enhanced design system provides a comprehensive set of design tokens for colors, typography,
spacing, and component styling. It's built with theme support, accessibility, and scalability in
mind.

## Status

✅ **Fully Implemented** - The design system is now complete with all features working:

- ✅ Enhanced color, typography, and spacing tokens
- ✅ Light/dark theme support with CSS custom properties
- ✅ Theme switching components (`ThemeProvider`, `ThemeToggle`, `ThemeSelector`)
- ✅ Tailwind integration with design tokens
- ✅ TypeScript definitions and type safety
- ✅ Demo pages with live theme switching
- ✅ Comprehensive documentation

**Demo Pages:**

- [Design System Demo](/design-system-demo) - Interactive showcase with theme controls
- [Test Page](/test-design-system) - Component testing and validation

## Features

- **Theme-aware**: Full support for light/dark modes with CSS custom properties
- **Accessible**: WCAG-compliant color contrasts and high contrast mode support
- **Responsive**: Fluid typography and responsive spacing
- **Type-safe**: Full TypeScript integration
- **Scalable**: Semantic naming and component tokens
- **Modern**: CSS-in-JS compatible with Tailwind integration

## Design Tokens

### Colors

#### Brand Colors

```typescript
import { BRAND_COLORS } from '@/constants/colors';

// Primary brand palette
BRAND_COLORS.primary[500]; // Main brand color
BRAND_COLORS.primary[600]; // Hover state
BRAND_COLORS.primary[700]; // Active state

// Neutral colors
BRAND_COLORS.neutral[900]; // Dark text
BRAND_COLORS.neutral[100]; // Light background
```

#### Semantic Colors

```typescript
import { SEMANTIC_COLORS } from '@/constants/colors';

// Success, warning, error, info
SEMANTIC_COLORS.success[500];
SEMANTIC_COLORS.warning[500];
SEMANTIC_COLORS.error[500];
SEMANTIC_COLORS.info[500];
```

#### Contextual Colors

```typescript
import { CONTEXTUAL_COLORS } from '@/constants/colors';

// Theme-aware colors (automatically switch based on theme)
CONTEXTUAL_COLORS.text.primary;
CONTEXTUAL_COLORS.surface.primary;
CONTEXTUAL_COLORS.border.default;
```

### Typography

#### Font Scales

```typescript
import { FONT_SIZES, FONT_WEIGHTS } from '@/constants/typography';

// Size scale (rem-based)
FONT_SIZES.xs; // 0.75rem (12px)
FONT_SIZES.sm; // 0.875rem (14px)
FONT_SIZES.base; // 1rem (16px)
FONT_SIZES.lg; // 1.125rem (18px)
FONT_SIZES['4xl']; // 2.25rem (36px)

// Weight scale
FONT_WEIGHTS.light; // 300
FONT_WEIGHTS.regular; // 400
FONT_WEIGHTS.medium; // 500
FONT_WEIGHTS.semibold; // 600
FONT_WEIGHTS.bold; // 700
```

#### Typography Presets

```typescript
import { TYPOGRAPHY_PRESETS } from '@/constants/typography';

// Pre-configured typography styles
TYPOGRAPHY_PRESETS.label; // Form labels
TYPOGRAPHY_PRESETS.helper; // Helper text
TYPOGRAPHY_PRESETS.code; // Code blocks
TYPOGRAPHY_PRESETS.badge; // Badge/pill text
TYPOGRAPHY_PRESETS.button; // Button text
```

#### Fluid Typography

```typescript
import { FLUID_TYPOGRAPHY } from '@/constants/typography';

// Responsive typography that scales with viewport
FLUID_TYPOGRAPHY.fluidH1; // clamp(2.25rem, 4vw + 1rem, 4.5rem)
FLUID_TYPOGRAPHY.fluidBody; // clamp(0.875rem, 1vw + 0.5rem, 1.125rem)
```

### Spacing

The Four Loop project uses an **8px Grid Spacing System** that ensures visual consistency and
harmony across all components and layouts.

#### 8px Grid System Principles

The 8px grid system is a fundamental design principle where **all spacing values are multiples of 8
pixels**. This creates:

- **Visual Consistency**: Predictable spacing relationships
- **Design-Development Alignment**: Shared spacing language between designers and developers
- **Scalability**: Easy to scale while maintaining proportions
- **Accessibility**: Clear visual hierarchy for better UX

#### Spacing Scale

```typescript
import { SPACING_SCALE } from '@/constants/spacing';

// 8px-based scale (all values are multiples of 8px or 4px)
SPACING_SCALE[0.5]; // 0.125rem (2px)  - 8px ÷ 4
SPACING_SCALE[1]; // 0.25rem (4px)   - 8px ÷ 2
SPACING_SCALE[2]; // 0.5rem (8px)    - 8px × 1 ⭐ Base unit
SPACING_SCALE[4]; // 1rem (16px)     - 8px × 2
SPACING_SCALE[6]; // 1.5rem (24px)   - 8px × 3
SPACING_SCALE[8]; // 2rem (32px)     - 8px × 4
SPACING_SCALE[12]; // 3rem (48px)     - 8px × 6
SPACING_SCALE[16]; // 4rem (64px)     - 8px × 8
```

#### Semantic Spacing

```typescript
import { SEMANTIC_SPACING } from '@/constants/spacing';

// Component spacing (8px multiples for consistency)
SEMANTIC_SPACING.component.xs; // 4px  (8px ÷ 2)
SEMANTIC_SPACING.component.sm; // 8px  (8px × 1)
SEMANTIC_SPACING.component.md; // 16px (8px × 2)
SEMANTIC_SPACING.component.lg; // 24px (8px × 3)
SEMANTIC_SPACING.component.xl; // 32px (8px × 4)

// Layout spacing (larger 8px multiples for structural elements)
SEMANTIC_SPACING.layout.xs; // 32px (8px × 4)
SEMANTIC_SPACING.layout.sm; // 1.5rem
SEMANTIC_SPACING.layout.md; // 2rem
SEMANTIC_SPACING.layout.lg; // 3rem
SEMANTIC_SPACING.layout.xl; // 4rem

// Section spacing
SEMANTIC_SPACING.section.sm; // 2rem
SEMANTIC_SPACING.section.md; // 3rem
SEMANTIC_SPACING.section.lg; // 4rem
SEMANTIC_SPACING.section.xl; // 6rem
```

## Component Tokens

### Button

```typescript
import { COMPONENT_TOKENS } from '@/constants/design-system';

// Pre-configured button styles
COMPONENT_TOKENS.button.padding.md; // Padding for medium buttons
COMPONENT_TOKENS.button.fontSize.md; // Font size for medium buttons
COMPONENT_TOKENS.button.borderRadius; // Border radius
COMPONENT_TOKENS.button.transition; // Transition timing
```

### Input

```typescript
// Pre-configured input styles
COMPONENT_TOKENS.input.padding.md; // Padding for medium inputs
COMPONENT_TOKENS.input.fontSize.md; // Font size for medium inputs
COMPONENT_TOKENS.input.borderRadius; // Border radius
```

### Card

```typescript
// Pre-configured card styles
COMPONENT_TOKENS.card.padding; // Default card padding
COMPONENT_TOKENS.card.borderRadius; // Border radius
COMPONENT_TOKENS.card.shadow; // Drop shadow
```

## Usage Examples

### React Components

#### Using Design Tokens in Components

```tsx
import React from 'react';
import { DESIGN_SYSTEM } from '@/constants/design-system';

const MyButton = ({ children, variant = 'primary' }) => {
  const styles = {
    padding: DESIGN_SYSTEM.components.button.padding.md,
    fontSize: DESIGN_SYSTEM.components.button.fontSize.md,
    borderRadius: DESIGN_SYSTEM.components.button.borderRadius,
    backgroundColor:
      variant === 'primary' ? DESIGN_SYSTEM.colors.brand.primary[500] : 'transparent',
    color: variant === 'primary' ? '#ffffff' : DESIGN_SYSTEM.colors.contextual.text.primary,
    transition: DESIGN_SYSTEM.animation.presets.all,
  };

  return <button style={styles}>{children}</button>;
};
```

#### Using with CSS-in-JS Libraries

```tsx
import styled from 'styled-components';
import { DESIGN_SYSTEM } from '@/constants/design-system';

const StyledButton = styled.button`
  padding: ${DESIGN_SYSTEM.components.button.padding.md};
  font-size: ${DESIGN_SYSTEM.components.button.fontSize.md};
  border-radius: ${DESIGN_SYSTEM.components.button.borderRadius};
  background-color: ${DESIGN_SYSTEM.colors.brand.primary[500]};
  color: white;
  transition: ${DESIGN_SYSTEM.animation.presets.all};

  &:hover {
    background-color: ${DESIGN_SYSTEM.colors.brand.primary[600]};
  }
`;
```

### CSS Classes

#### Using Utility Classes

```html
<!-- Button with utility classes -->
<button class="btn btn-primary btn-md">Click me</button>

<!-- Card with utility classes -->
<div class="card p-lg rounded-lg shadow-md">
  <h3 class="text-xl font-semibold text-primary mb-md">Card Title</h3>
  <p class="text-base text-secondary">Card content goes here.</p>
</div>

<!-- Input with utility classes -->
<input class="input rounded-md border-default focus:ring" placeholder="Enter text..." />
```

#### Using CSS Custom Properties

```css
.my-component {
  background-color: var(--color-surface-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}
```

### Tailwind Integration

The design system is fully integrated with Tailwind CSS:

```html
<!-- Using Tailwind classes with design tokens -->
<div class="bg-surface-primary text-primary p-component-lg rounded-component shadow-component">
  <h2 class="text-heading-lg font-semibold text-brand mb-component-md">Welcome</h2>
  <p class="text-body text-secondary mb-component-lg">
    This content uses design tokens through Tailwind.
  </p>
  <button class="btn-primary px-component-lg py-component-md rounded-component">Get Started</button>
</div>
```

## Theme Switching

### Programmatic Theme Switching

```typescript
import { generateDesignTokenCSS } from '@/constants/design-system';

// Generate CSS for a specific theme
const lightThemeCSS = generateDesignTokenCSS();

// Switch theme by updating data attribute
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### CSS Theme Variables

```css
/* Themes are automatically applied based on user preference or data attribute */
:root {
  /* Light theme variables */
}

[data-theme='dark'] {
  /* Dark theme variables */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Automatic dark theme for users who prefer it */
  }
}
```

## Accessibility Features

### Color Contrast

- All color combinations meet WCAG AA standards
- High contrast mode support included
- Color-blind friendly palette

### Typography Accessibility

- Relative units (rem/em) for better scaling
- Appropriate line heights for readability
- Support for user font size preferences

### Interactive Elements

- Focus indicators on all interactive elements
- Sufficient touch targets (44px minimum)
- Keyboard navigation support

### Motion

- Respects `prefers-reduced-motion` setting
- Optional animations and transitions
- Performance-optimized animations

## Performance Considerations

### CSS Custom Properties

- Minimal runtime overhead
- Efficient theme switching
- Browser-native support

### Tree Shaking

- Import only what you need
- TypeScript interfaces for compile-time checking
- Modular architecture

### Caching

- Consistent token values enable better caching
- Minimal CSS output
- Optimized for production builds

## Migration Guide

### From Existing System

1. **Install dependencies** (if using the React components):

   ```bash
   npm install react @types/react
   ```

2. **Import design tokens**:

   ```typescript
   import { DESIGN_SYSTEM } from '@/constants/design-system';
   ```

3. **Update component styles**:

   ```typescript
   // Before
   const styles = {
     padding: '16px',
     fontSize: '14px',
     color: '#333',
   };

   // After
   const styles = {
     padding: DESIGN_SYSTEM.spacing.scale[4],
     fontSize: DESIGN_SYSTEM.typography.sizes.sm,
     color: DESIGN_SYSTEM.colors.contextual.text.primary,
   };
   ```

4. **Add CSS utilities** (optional):

   ```css
   @import './src/styles/design-system.css';
   ```

### Best Practices

1. **Use semantic tokens** when possible:

   ```typescript
   // Good
   color: DESIGN_SYSTEM.colors.contextual.text.primary;

   // Avoid
   color: DESIGN_SYSTEM.colors.brand.neutral[900];
   ```

2. **Prefer component tokens** for consistent UI:

   ```typescript
   // Good
   padding: DESIGN_SYSTEM.components.button.padding.md;

   // Avoid
   padding: `${DESIGN_SYSTEM.spacing.scale[2.5]} ${DESIGN_SYSTEM.spacing.scale[4]}`;
   ```

3. **Use responsive utilities** for adaptive design:

   ```typescript
   fontSize: DESIGN_SYSTEM.typography.fluid.fluidBody;
   ```

## Contributing

When adding new tokens:

1. Follow semantic naming conventions
2. Ensure accessibility compliance
3. Add TypeScript types
4. Update documentation
5. Test across themes and screen sizes

## Browser Support

- Modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+)
- CSS Custom Properties required for theming
- Fallbacks provided for older browsers
- Progressive enhancement approach
