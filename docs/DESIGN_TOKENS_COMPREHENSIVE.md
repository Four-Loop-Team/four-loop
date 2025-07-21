# Comprehensive Design Tokens System Documentation

## Overview

This document describes the enhanced design tokens system that preserves ALL features from the
original `design-system.ts` while adapting to the project's 4-color brand palette and maintaining
the 8px grid system with 12-column grid support.

## Architecture

### Source of Truth: TypeScript First

- **Primary Source**: `src/constants/design-tokens-consolidated.ts`
- **Generated Outputs**: SCSS variables, CSS custom properties
- **Migration Strategy**: Gradual transition from CSS custom properties to TypeScript tokens

### 11 Feature Categories Preserved

#### 1. **Color System**

```typescript
// 4-Color Brand Palette
BRAND_COLORS: {
  primary: '#e2e891',    // Yellow-green accent
  secondary: '#353535',  // Dark gray
  tertiary: '#232323',   // Darker gray
  neutral: '#ffffff'     // White
}

// Semantic Color Tokens
COLOR_TOKENS: {
  text: { primary, inverse, accent, muted },
  background: { primary, secondary, accent, inverse },
  border: { default, accent, muted },
  state: { success, warning, error, info }
}
```

#### 2. **Spacing System (8px Grid + 12-Column Support)**

```typescript
// Base 8px grid scale: xs(4px) → 6xl(96px)
SPACING_TOKENS: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  // ... up to 6xl: '96px'

  // Semantic spacing
  component: '16px',
  section: '48px',
  gutter: '24px'
}

// 12-Column Grid System
GRID_TOKENS: {
  container: {
    maxWidth: '1200px',
    padding: '24px',
    columns: 12,
    gap: '24px'
  }
}
```

#### 3. **Typography System**

```typescript
TYPOGRAPHY_TOKENS: {
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem'   // 60px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
}
```

#### 4. **Animation System**

```typescript
ANIMATION_TOKENS: {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms'
  },
  easing: {
    linear: 'cubic-bezier(0, 0, 1, 1)',
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  presets: {
    fadeIn: 'opacity 300ms cubic-bezier(0, 0, 0.58, 1)',
    slideUp: 'transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    scale: 'transform 150ms cubic-bezier(0.25, 0.1, 0.25, 1)'
  }
}
```

#### 5. **Border Radius System**

```typescript
BORDER_RADIUS_TOKENS: {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',

  // Semantic component values
  button: '6px',
  input: '4px',
  card: '8px',
  modal: '12px'
}
```

#### 6. **Shadow System**

```typescript
SHADOW_TOKENS: {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Component-specific shadows
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
}
```

#### 7. **Z-Index System**

```typescript
Z_INDEX_TOKENS: {
  auto: 'auto',
  base: '0',
  docked: '10',
  dropdown: '1000',
  sticky: '1020',
  banner: '1030',
  overlay: '1040',
  modal: '1050',
  popover: '1060',
  skipLink: '1070',
  toast: '1080',
  tooltip: '1090'
}
```

#### 8. **Component Tokens**

```typescript
COMPONENT_TOKENS: {
  navigation: {
    background: BRAND_COLORS.secondary,
    containerBackground: BRAND_COLORS.neutral,
    buttonPaddingX: SPACING_TOKENS.md,
    buttonPaddingY: SPACING_TOKENS.sm,
    containerBorderRadius: BORDER_RADIUS_TOKENS.lg
  },
  button: {
    paddingX: SPACING_TOKENS.lg,
    paddingY: SPACING_TOKENS.sm,
    borderRadius: BORDER_RADIUS_TOKENS.button,
    fontSize: TYPOGRAPHY_TOKENS.fontSize.base,
    fontWeight: TYPOGRAPHY_TOKENS.fontWeight.medium
  },
  // ... input, card, modal tokens
}
```

#### 9. **Theme System (Light/Dark)**

```typescript
THEME_TOKENS: {
  light: {
    colors: {
      'color-surface-primary': '#ffffff',
      'color-surface-secondary': '#f8f9fa',
      'color-text-primary': '#232323',
      'color-text-inverse': '#ffffff',
      // ... comprehensive theme colors
    }
  },
  dark: {
    colors: {
      'color-surface-primary': '#232323',
      'color-surface-secondary': '#353535',
      'color-text-primary': '#ffffff',
      'color-text-inverse': '#232323',
      // ... dark theme variants
    }
  }
}
```

#### 10. **CSS Generation Utilities**

```typescript
// Generate SCSS variables
generateSCSSVariables(): string

// Generate CSS custom properties
generateDesignTokenCSS(): string

// Generate theme-specific CSS
createThemeCSS(theme: 'light' | 'dark'): string
```

#### 11. **Design System Utilities**

```typescript
DesignSystemUtils: {
  getToken(path: string),
  getSpacingTokens(),
  getBrandColors(),
  getColorTokens(context?),
  getComponentTokens(component),
  getThemeTokens(theme?),
  generateThemeCSS(theme),
  generateSCSS(),
  generateFullCSS()
}
```

## Usage Examples

### In Components

```typescript
import {
  BRAND_COLORS,
  SPACING_TOKENS,
  DesignSystemUtils,
} from '@/constants/design-tokens-consolidated';

// Direct token usage
const styles = {
  backgroundColor: BRAND_COLORS.primary,
  padding: SPACING_TOKENS.lg,
  borderRadius: DesignSystemUtils.getToken('BORDER_RADIUS_TOKENS.button'),
};
```

### Generated SCSS

```scss
// Auto-generated from TypeScript tokens
$primary: #e2e891;
$secondary: #353535;
$spacing-md: 16px;
$font-size-lg: 1.125rem;
$shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

### CSS Custom Properties

```css
:root {
  --color-primary: #e2e891;
  --spacing-md: 16px;
  --font-size-lg: 1.125rem;
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --color-surface-primary: #232323;
  --color-text-primary: #ffffff;
}
```

## Migration Strategy

### Phase 1: Foundation ✅ COMPLETE

- Enhanced design-tokens-consolidated.ts with ALL 11 features
- 4-color palette integration
- 8px grid + 12-column grid support
- Theme system with light/dark modes

### Phase 2: Build Integration (NEXT)

- Create SCSS generation scripts
- Integrate with build process
- Generate CSS custom properties

### Phase 3: Component Migration

- Replace hardcoded CSS custom properties
- Update components to use TypeScript tokens
- Validate visual consistency

### Phase 4: Testing & Optimization

- Cross-browser testing
- Performance optimization
- Documentation updates

## Benefits

1. **Single Source of Truth**: All design decisions in TypeScript
2. **Type Safety**: Full IntelliSense and compile-time validation
3. **Consistency**: Systematic approach to spacing, colors, typography
4. **Maintainability**: Easy to update and extend
5. **Flexibility**: Supports both SCSS and CSS custom properties
6. **Theme Support**: Built-in light/dark theme switching
7. **Component Focus**: Pre-configured tokens for common components
8. **Grid Compliance**: Adheres to both 8px and 12-column grid systems

## File Locations

- **Main Token File**: `src/constants/design-tokens-consolidated.ts`
- **Documentation**: `docs/DESIGN_TOKENS_COMPREHENSIVE.md`
- **Legacy References**: See `DOCUMENTATION_INDEX.md` for related docs

This system provides a comprehensive, type-safe, and maintainable foundation for the entire design
system while preserving all existing functionality.
