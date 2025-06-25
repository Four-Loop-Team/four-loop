# Styling System Documentation

## Overview

This document provides comprehensive guidance on how styling, variables, and themes are handled in the Four Loop Digital application. The system is built with scalability, maintainability, and theme flexibility in mind, following modern CSS architecture principles.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [SCSS Variables System](#scss-variables-system)
3. [CSS Custom Properties](#css-custom-properties)
4. [Component Styling Patterns](#component-styling-patterns)
5. [Theme System](#theme-system)
6. [Responsive Design](#responsive-design)
7. [Grid System Integration](#grid-system-integration)
8. [Animation System](#animation-system)
9. [Best Practices](#best-practices)
10. [Adding New Components](#adding-new-components)
11. [Theme Customization](#theme-customization)

## Architecture Overview

The styling system follows a **three-layer architecture**:

```
SCSS Variables → CSS Custom Properties → Component Styles
     ↓                    ↓                    ↓
   Source of Truth    Runtime Bridge     Implementation
```

### Layer 1: SCSS Variables (Source of Truth)

- **File**: `/src/app/ui/styles/_variables.scss`
- **Purpose**: Define all design tokens in a semantic, maintainable structure
- **Compile Time**: Values are processed during build

### Layer 2: CSS Custom Properties (Runtime Bridge)

- **File**: `/src/app/ui/styles/_global.scss`
- **Purpose**: Bridge SCSS variables to runtime-modifiable CSS properties
- **Runtime**: Values can be dynamically changed via JavaScript

### Layer 3: Component Styles (Implementation)

- **Files**: Component files (e.g., `Navigation.tsx`)
- **Purpose**: Consume CSS custom properties for styling
- **Framework**: Material UI with CSS custom properties

## SCSS Variables System

### File Structure

```
src/app/ui/styles/
├── _variables.scss     # All design tokens
└── _global.scss       # Global styles and CSS custom properties
```

### Variable Categories

#### 1. Base Color Palette

```scss
// Base semantic colors
$color-primary: #e2e891; // Light green - primary brand color
$color-secondary: #353535; // Dark gray - secondary/neutral
$color-background: #232323; // Dark background
$color-surface: #353535; // Component surfaces
$color-text-primary: #fff; // Primary text on dark backgrounds
$color-text-secondary: #353535; // Secondary text on light backgrounds
$color-accent: #69685a; // Logo accent color
```

**Naming Convention**: `$color-{purpose}` where purpose describes the semantic role, not the visual appearance.

#### 2. Component-Specific Colors

```scss
// Navigation-specific semantic variables
$nav-background: $color-surface;
$nav-container-background: $color-primary;
$nav-slider-background: $color-secondary;
$nav-slider-border: $color-primary;
$nav-text-active: $color-text-primary;
$nav-text-inactive: $color-text-secondary;
$nav-text-hover: $color-text-primary;

// Mobile drawer semantic variables
$drawer-background: $color-surface;
$drawer-active-background: rgba($color-primary, 0.15);
$drawer-active-border: rgba($color-primary, 0.3);
$drawer-active-text: $color-primary;
$drawer-inactive-text: $color-text-primary;
$drawer-hover-background: rgba($color-primary, 0.25);
$drawer-border-accent: rgba($color-primary, 0.2);
```

**Naming Convention**: `${component}-{element}-{state}` pattern for maximum clarity.

#### 3. Spacing System (8px Grid)

```scss
// Base spacing scale (following 8px grid)
$space-xs: 0.25rem; // 4px
$space-sm: 0.5rem; // 8px
$space-md: 1rem; // 16px
$space-lg: 1.5rem; // 24px
$space-xl: 2rem; // 32px
$space-2xl: 3rem; // 48px
$space-3xl: 4rem; // 64px

// Component-specific spacing
$nav-padding: $space-md;
$nav-button-padding-x: $space-lg;
$nav-button-padding-y: 0.25rem;
$nav-button-overlap: -20px;
$nav-container-border-radius: 50px;
$nav-mobile-width: 300px;
```

**Design System**: Based on 8px grid for consistent visual rhythm and easier designer-developer handoff.

#### 4. Animation System

```scss
// Animation timing
$transition-fast: 0.2s;
$transition-normal: 0.4s;
$transition-slow: 0.6s;

// Easing functions
$transition-easing: cubic-bezier(0.4, 0, 0.2, 1); // Material Design standard
$transition-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
$transition-easing-ease-in: ease-in;
$transition-easing-ease-out: ease-out;

// Component-specific animations (optimized for performance)
$nav-slider-transition:
  left $transition-normal cubic-bezier(0.25, 0.46, 0.45, 0.94),
  width $transition-normal cubic-bezier(0.25, 0.46, 0.45, 0.94),
  opacity $transition-fast $transition-easing;
$nav-button-transition:
  color $transition-fast $transition-easing,
  background-color $transition-fast $transition-easing,
  transform $transition-fast $transition-easing;
$drawer-transition: transform $transition-normal $transition-easing;
```

**Key Features**:

- **Performance Optimized**: Specific property transitions instead of generic `all` transitions
- **Material Design Standards**: Follows Material Design motion principles
- **Custom Easing**: Enhanced navigation slider with smooth acceleration/deceleration curves
- **Browser Optimized**: Uses `will-change` CSS property for hardware acceleration

#### 5. Responsive Breakpoints

```scss
// Breakpoint values (matching Material UI defaults)
$breakpoint-xs: 0px;
$breakpoint-sm: 600px;
$breakpoint-md: 960px;
$breakpoint-lg: 1280px;
$breakpoint-xl: 1920px;

// Component-specific breakpoints
$nav-mobile-breakpoint: $breakpoint-md;
```

**Compatibility**: Aligned with Material UI breakpoints for seamless integration.

#### 6. Typography System

```scss
// Font stack
$font-family-primary:
  var(--font-poppins),
  -apple-system,
  blinkmacsystemfont,
  'Segoe UI',
  roboto,
  sans-serif;

// Font weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Line heights
$line-height-base: 1.6;
$line-height-tight: 1.2;

// Font sizes
$font-size-base: 1rem;
```

## CSS Custom Properties

### Implementation

CSS custom properties are defined in `/src/app/ui/styles/_global.scss` and make SCSS variables available at runtime:

```scss
/* CSS Custom Properties for Navigation using semantic SCSS variables */
:root {
  /* Color Variables */
  --nav-background: #{variables.$nav-background};
  --nav-container-background: #{variables.$nav-container-background};
  --nav-slider-background: #{variables.$nav-slider-background};
  --nav-text-active: #{variables.$nav-text-active};

  /* Spacing Variables */
  --space-xs: #{variables.$space-xs};
  --space-md: #{variables.$space-md};
  --space-lg: #{variables.$space-lg};
  --nav-button-padding-x: #{variables.$nav-button-padding-x};
  --nav-button-overlap: #{variables.$nav-button-overlap};

  /* Animation Variables */
  --transition-fast: #{variables.$transition-fast};
  --nav-slider-transition: #{variables.$nav-slider-transition};
  --nav-button-transition: #{variables.$nav-button-transition};

  /* Breakpoint Variables */
  --breakpoint-md: #{variables.$breakpoint-md};
}
```

### Benefits

1. **Runtime Theme Switching**: Change themes without recompiling CSS
2. **JavaScript Integration**: Modify styles dynamically via JS
3. **Performance**: No build process required for theme changes
4. **Browser Support**: Excellent modern browser support

## Component Styling Patterns

### Material UI Integration

Components use Material UI's `sx` prop with CSS custom properties:

```tsx
// ✅ Correct: Using CSS custom properties
<Button
  sx={{
    color: 'var(--nav-text-active)',
    padding: 'var(--nav-button-padding-x)',
    transition: 'var(--nav-button-transition)',
    marginLeft: index > 0 ? 'var(--nav-button-overlap)' : '0px',
  }}
>
  {item.label}
</Button>

// ❌ Incorrect: Hardcoded values
<Button
  sx={{
    color: '#fff',
    padding: '24px',
    transition: 'all 0.4s ease',
    marginLeft: index > 0 ? '-20px' : '0px',
  }}
>
  {item.label}
</Button>
```

### Responsive Patterns

Use Material UI breakpoints with CSS custom properties:

```tsx
// Responsive spacing
sx={{
  px: { xs: 'var(--space-md)', md: 'var(--space-lg)' },
  py: 'var(--space-lg)',
}}

// Responsive display
sx={{
  display: { xs: 'none', md: 'block' }
}}
```

### Animation Patterns

Consistent animation using predefined timing:

```tsx
// Navigation slider animation
sx={{
  transition: 'var(--nav-slider-transition)',
  left: `${sliderPosition.left}px`,
  width: `${sliderPosition.width}px`,
}}

// Button hover animation
sx={{
  transition: 'var(--nav-button-transition)',
  '&:hover': {
    color: 'var(--nav-text-hover)',
    zIndex: 3,
  },
}}
```

## Theme System

### Current Theme: Dark Mode

The application currently implements a dark theme with light green accents:

```scss
$color-primary: #e2e891; // Light green accent
$color-background: #232323; // Dark background
$color-surface: #353535; // Component surfaces
$color-text-primary: #fff; // White text
$color-text-secondary: #353535; // Dark gray text
```

### Theme Architecture

The system is designed to support multiple themes through CSS custom property overrides:

#### Base Theme (Default - Dark)

```scss
:root {
  --color-primary: #e2e891;
  --color-background: #232323;
  --color-text-primary: #fff;
}
```

#### Light Theme (Example)

```scss
[data-theme='light'] {
  --color-primary: #4caf50;
  --color-background: #ffffff;
  --color-text-primary: #232323;
  --nav-background: #f5f5f5;
}
```

#### Brand Variations (Example)

```scss
[data-theme='blue'] {
  --color-primary: #2196f3;
}

[data-theme='purple'] {
  --color-primary: #9c27b0;
}
```

### Theme Switching Implementation

#### JavaScript Theme Toggle

```javascript
// Theme switching function
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'default';
setTheme(savedTheme);
```

#### React Hook for Theme Management

```tsx
function useTheme() {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, switchTheme };
}
```

## Responsive Design

### Breakpoint System

Following Material UI conventions:

| Breakpoint | Size    | Usage                          |
| ---------- | ------- | ------------------------------ |
| `xs`       | 0px+    | Extra small devices            |
| `sm`       | 600px+  | Small devices (phones)         |
| `md`       | 960px+  | Medium devices (tablets)       |
| `lg`       | 1280px+ | Large devices (laptops)        |
| `xl`       | 1920px+ | Extra large devices (desktops) |

### Implementation Patterns

#### Component Responsive Logic

```tsx
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// Conditional rendering
{
  mounted && !isMobile && <DesktopNavigation />;
}

{
  mounted && isMobile && <MobileNavigation />;
}
```

#### Responsive Styling

```tsx
sx={{
  // Responsive spacing
  px: { xs: 'var(--space-md)', md: 'var(--space-lg)' },

  // Responsive typography
  fontSize: { xs: '1rem', md: '1.2rem' },

  // Responsive display
  display: { xs: 'block', md: 'none' },
}}
```

## Grid System Integration

The application includes a comprehensive 12-column grid system that integrates seamlessly with the styling system. The grid system follows the same architectural patterns and uses the established variable system.

### Grid Variables Integration

```scss
// Grid system variables follow the same semantic naming
$grid-columns: 12;
$grid-max-width: 1200px;
$grid-max-width-lg: 1400px;
$grid-max-width-xl: 1600px;

// Responsive gutters using spacing system
$grid-gutter-xs: $space-md; // 16px
$grid-gutter-sm: $space-lg; // 24px
$grid-gutter-md: $space-xl; // 32px
$grid-gutter-lg: $space-2xl; // 48px
$grid-gutter-xl: $space-3xl; // 64px
```

### CSS Custom Properties Exposure

```scss
:root {
  // Grid variables exposed as CSS custom properties
  --grid-columns: #{variables.$grid-columns};
  --grid-max-width: #{variables.$grid-max-width};
  --grid-gutter-xs: #{variables.$grid-gutter-xs};
  // ... all grid variables
}
```

### Component Integration

```tsx
import { GridContainer, GridItem } from '@/components/Grid';

// React component usage
<GridContainer size="lg" gap="md">
  <GridItem xs={12} md={6} lg={4}>
    <YourComponent />
  </GridItem>
</GridContainer>

// CSS class usage
<div className="container grid">
  <div className="col-12 col-md-6 col-lg-4">
    Content
  </div>
</div>
```

### Documentation

For comprehensive grid system documentation, see:

- **[Grid System Documentation](./GRID_SYSTEM_DOCUMENTATION.md)**

## Animation System

### Performance Optimizations

1. **GPU Acceleration**: Use `transform` and `opacity` for smooth animations
2. **Specific Property Transitions**: Target specific CSS properties instead of using `all`
3. **Hardware Optimization**: Use `will-change` CSS property for browser optimization
4. **Debounced Updates**: Prevent rapid state changes during scroll events
5. **requestAnimationFrame**: Use for smooth, synchronized updates
6. **Consistent Timing**: Standardized transition durations and easing
7. **Reduced Motion**: Respect user preferences for reduced motion

**Navigation-Specific Optimizations**:

- **Immediate State Updates**: Navigation clicks update state immediately for instant feedback
- **Scroll Interference Prevention**: Navigation flags prevent scroll events from interrupting transitions
- **Custom Easing Curves**: Optimized cubic-bezier functions for natural motion

### Animation Categories

#### Micro-interactions

- **Duration**: `var(--transition-fast)` (0.2s)
- **Use Cases**: Button hovers, focus states
- **Easing**: `var(--transition-easing)`

#### Component Transitions

- **Duration**: `var(--transition-normal)` (0.4s)
- **Use Cases**: Navigation slider, drawer open/close
- **Easing**: `var(--transition-easing)`

#### Page Transitions

- **Duration**: `var(--transition-slow)` (0.6s)
- **Use Cases**: Route changes, modal appearances
- **Easing**: `var(--transition-easing)`

### Implementation Examples

#### Navigation Slider Animation

```tsx
// Enhanced smooth slider movement with performance optimization
sx={{
  transition: 'var(--nav-slider-transition)',
  willChange: 'left, width, opacity', // Browser optimization
  left: `${sliderPosition.left}px`,
  width: `${sliderPosition.width}px`,
  opacity: sliderPosition.width > 0 ? 1 : 0,
}}
```

**Key Features**:

- **Debounced Updates**: 100ms debouncing prevents rapid state changes during scroll
- **Navigation Priority**: Click navigation takes precedence over scroll detection
- **Performance Optimized**: Uses `requestAnimationFrame` and `will-change` for smooth animations
- **Smooth Easing**: Custom cubic-bezier curves for natural acceleration/deceleration

#### Button Hover Effects

```tsx
sx={{
  transition: 'var(--nav-button-transition)',
  '&:hover': {
    color: 'var(--nav-text-hover)',
    zIndex: 3,
  },
}}
```

## Best Practices

### 🎯 Do's

1. **Use Semantic Variable Names**

   ```scss
   ✅ $nav-text-active
   ❌ $green-text
   ```

2. **Leverage CSS Custom Properties**

   ```tsx
   ✅ color: 'var(--nav-text-active)'
   ❌ color: '#fff'
   ```

3. **Follow the 8px Grid**

   ```scss
   ✅ padding: 'var(--space-lg)'  // 24px
   ❌ padding: '23px'
   ```

4. **Use Component-Specific Variables**

   ```scss
   ✅ $nav-button-padding-x: $space-lg;
   ❌ $button-padding: 24px;
   ```

5. **Maintain Abstraction Layers**
   ```scss
   ✅ $nav-background: $color-surface;
   ❌ $nav-background: #353535;
   ```

### ❌ Don'ts

1. **Don't Hardcode Values in Components**
2. **Don't Use Non-Semantic Color Names**
3. **Don't Skip the Variable System**
4. **Don't Break the 8px Grid**
5. **Don't Use Inline Styles for Theme-able Properties**

### 🔧 Code Quality Guidelines

#### Variable Organization

```scss
// Group by category with clear comments
// =============================================================================
// SEMANTIC COLOR SYSTEM - Theme-aware and reusable
// =============================================================================

// Base Palette
$color-primary: #e2e891;
$color-secondary: #353535;

// Component-specific
$nav-background: $color-surface;
$nav-text-active: $color-text-primary;
```

#### CSS Custom Property Naming

```scss
:root {
  /* Group by component */
  --nav-background: #{variables.$nav-background};
  --nav-text-active: #{variables.$nav-text-active};

  /* Consistent with SCSS variable names */
  --space-md: #{variables.$space-md};
  --transition-normal: #{variables.$transition-normal};
}
```

## Adding New Components

### Step 1: Define Component Variables

Add semantic variables to `_variables.scss`:

```scss
// Button component variables
$button-background: $color-primary;
$button-text: $color-text-primary;
$button-background-hover: darken($color-primary, 10%);
$button-border-radius: 8px;
$button-padding-x: $space-lg;
$button-padding-y: $space-sm;
```

### Step 2: Add CSS Custom Properties

Add to `_global.scss`:

```scss
:root {
  /* Button Variables */
  --button-background: #{variables.$button-background};
  --button-text: #{variables.$button-text};
  --button-background-hover: #{variables.$button-background-hover};
  --button-border-radius: #{variables.$button-border-radius};
  --button-padding-x: #{variables.$button-padding-x};
  --button-padding-y: #{variables.$button-padding-y};
}
```

### Step 3: Implement Component

Use CSS custom properties in the component:

```tsx
const CustomButton = ({ children, ...props }) => (
  <Button
    sx={{
      backgroundColor: 'var(--button-background)',
      color: 'var(--button-text)',
      borderRadius: 'var(--button-border-radius)',
      px: 'var(--button-padding-x)',
      py: 'var(--button-padding-y)',
      '&:hover': {
        backgroundColor: 'var(--button-background-hover)',
      },
    }}
    {...props}
  >
    {children}
  </Button>
);
```

### Step 4: Export Variables (Optional)

Add to `:export` block in `_variables.scss`:

```scss
:export {
  // ...existing exports...
  button: {
    background: $button-background;
    text: $button-text;
    backgroundhover: $button-background-hover;
    borderradius: $button-border-radius;
    paddingx: $button-padding-x;
    paddingy: $button-padding-y;
  }
}
```

## Theme Customization

### Creating a New Theme

#### Step 1: Define Theme Colors

```scss
// themes/_light-theme.scss
:root[data-theme='light'] {
  /* Base colors */
  --color-primary: #4caf50;
  --color-secondary: #757575;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text-primary: #212121;
  --color-text-secondary: #757575;

  /* Component overrides */
  --nav-background: var(--color-surface);
  --nav-container-background: var(--color-primary);
  --nav-text-active: #ffffff;
  --nav-text-inactive: var(--color-text-primary);
}
```

#### Step 2: Import Theme

```scss
// In _global.scss
@import 'themes/light-theme';
```

#### Step 3: Implement Theme Switcher

```tsx
const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  const switchTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <Select value={currentTheme} onChange={(e) => switchTheme(e.target.value)}>
      <MenuItem value='default'>Dark Theme</MenuItem>
      <MenuItem value='light'>Light Theme</MenuItem>
    </Select>
  );
};
```

### Advanced Theme Features

#### Dynamic Color Generation

```scss
// Generate color variations automatically
$primary-variants: (
  50: lighten($color-primary, 40%),
  100: lighten($color-primary, 30%),
  200: lighten($color-primary, 20%),
  300: lighten($color-primary, 10%),
  400: $color-primary,
  500: darken($color-primary, 10%),
  600: darken($color-primary, 20%),
  700: darken($color-primary, 30%),
  800: darken($color-primary, 40%),
  900: darken($color-primary, 50%),
);
```

#### Contextual Themes

```scss
// Different themes for different sections
.admin-section {
  --color-primary: #ff5722;
  --nav-container-background: var(--color-primary);
}

.user-section {
  --color-primary: #2196f3;
  --nav-container-background: var(--color-primary);
}
```

## Maintenance and Updates

### Updating Colors

1. **Global Color Change**: Update base color in `_variables.scss`
2. **Component-Specific Change**: Update component variable
3. **Theme Override**: Add theme-specific override in theme file

### Adding New Spacing Values

1. Add to spacing scale in `_variables.scss`
2. Add to CSS custom properties in `_global.scss`
3. Export if needed for JavaScript access

### Performance Monitoring

- Monitor CSS bundle size
- Check for unused CSS custom properties
- Validate theme switching performance
- Test across different devices and browsers

## File Reference

### Core Files

- `/src/app/ui/styles/_variables.scss` - All design tokens
- `/src/app/ui/styles/_global.scss` - Global styles and CSS custom properties
- `/src/components/Navigation/Navigation.tsx` - Reference implementation

### Generated Files

- CSS custom properties are auto-generated from SCSS variables
- No manual synchronization required

### Import Structure

```scss
// Global stylesheet import order
@use 'variables';           // Design tokens
@tailwind base;             // Tailwind base styles
@tailwind components;       // Tailwind components
@tailwind utilities;        // Tailwind utilities

/* CSS Custom Properties */
:root { ... }

/* Global styles */
html { ... }
body { ... }
```

This styling system provides a robust foundation for scalable, maintainable, and theme-ready applications. The three-layer architecture ensures that design changes can be made efficiently while maintaining consistency across all components.

## Recent Updates & Improvements

### Navigation Animation System (Latest)

**Enhanced Navigation Slider Performance**:

- ✅ **Smooth Direct Movement**: Slider now moves directly to selected items without intermediate stops
- ✅ **Debounced Scroll Detection**: 100ms debouncing prevents rapid state changes during scroll
- ✅ **Navigation Priority System**: Click navigation takes precedence over scroll detection
- ✅ **Performance Optimizations**:
  - Specific property transitions (`left`, `width`, `opacity`) instead of generic `all`
  - Hardware acceleration with `will-change` CSS property
  - `requestAnimationFrame` for smooth updates
- ✅ **Enhanced Easing**: Custom cubic-bezier curves for natural motion

**Technical Improvements**:

```scss
// Before: Generic transition
$nav-slider-transition: all $transition-normal $transition-easing;

// After: Optimized specific properties
$nav-slider-transition:
  left $transition-normal cubic-bezier(0.25, 0.46, 0.45, 0.94),
  width $transition-normal cubic-bezier(0.25, 0.46, 0.45, 0.94),
  opacity $transition-fast $transition-easing;
```

**Component Enhancements**:

- Added `isNavigating` state to prevent scroll interference
- Implemented scroll timeout management for clean state handling
- Added `will-change` CSS property for browser optimization
