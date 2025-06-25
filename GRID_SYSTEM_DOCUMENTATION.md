# 12-Column Grid System Documentation

## Overview

The Four Loop Digital application now includes a comprehensive, responsive 12-column grid system that integrates seamlessly with the existing design system. The grid system provides both CSS Grid and Flexbox implementations, ensuring maximum flexibility and browser compatibility.

## Table of Contents

1. [Architecture](#architecture)
2. [Grid Variables](#grid-variables)
3. [CSS Utilities](#css-utilities)
4. [React Components](#react-components)
5. [Usage Examples](#usage-examples)
6. [Responsive Behavior](#responsive-behavior)
7. [Integration with Design System](#integration-with-design-system)
8. [Best Practices](#best-practices)
9. [Performance Considerations](#performance-considerations)

## Architecture

The 12-column grid system follows the established three-layer architecture:

```
SCSS Variables → CSS Custom Properties → CSS Utilities → React Components
     ↓                    ↓                    ↓              ↓
Grid Tokens     Runtime Values     CSS Classes     Components
```

### Implementation Layers

1. **SCSS Variables** - Grid configuration and responsive values
2. **CSS Custom Properties** - Runtime-accessible grid values
3. **CSS Utilities** - Class-based grid layout utilities
4. **React Components** - Type-safe, component-based grid API

## Grid Variables

### Configuration Variables

```scss
// Grid Configuration
$grid-columns: 12; // Total number of columns
$grid-max-width: 1200px; // Default container max-width
$grid-max-width-lg: 1400px; // Large container max-width
$grid-max-width-xl: 1600px; // Extra large container max-width

// Responsive Gutters
$grid-gutter-xs: $space-md; // 16px - Mobile gutters
$grid-gutter-sm: $space-lg; // 24px - Small screen gutters
$grid-gutter-md: $space-xl; // 32px - Medium screen gutters
$grid-gutter-lg: $space-2xl; // 48px - Large screen gutters
$grid-gutter-xl: $space-3xl; // 64px - Extra large gutters

// Container Padding
$container-padding-xs: $space-md; // 16px - Mobile padding
$container-padding-sm: $space-lg; // 24px - Small screen padding
$container-padding-md: $space-xl; // 32px - Medium screen padding
$container-padding-lg: $space-2xl; // 48px - Large screen padding
$container-padding-xl: $space-3xl; // 64px - Extra large padding
```

### Column Width Variables

```scss
// Calculated column widths (as percentages)
$col-1: calc(100% / 12 * 1); // 8.333%
$col-2: calc(100% / 12 * 2); // 16.667%
$col-3: calc(100% / 12 * 3); // 25%
$col-4: calc(100% / 12 * 4); // 33.333%
$col-5: calc(100% / 12 * 5); // 41.667%
$col-6: calc(100% / 12 * 6); // 50%
$col-7: calc(100% / 12 * 7); // 58.333%
$col-8: calc(100% / 12 * 8); // 66.667%
$col-9: calc(100% / 12 * 9); // 75%
$col-10: calc(100% / 12 * 10); // 83.333%
$col-11: calc(100% / 12 * 11); // 91.667%
$col-12: calc(100% / 12 * 12); // 100%
```

## CSS Utilities

### Container Classes

```scss
/* Basic Container */
.container {
  width: 100%;
  max-width: var(--grid-max-width); // 1200px
  margin: 0 auto;
  padding-left: var(--container-padding-xs);
  padding-right: var(--container-padding-xs);
}

/* Container Sizes */
.container-lg {
  max-width: var(--grid-max-width-lg); // 1400px
}

.container-xl {
  max-width: var(--grid-max-width-xl); // 1600px
}

.container-fluid {
  max-width: none; // Full width
}
```

### Grid Container Classes

```scss
/* CSS Grid Implementation */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter-xs); // Responsive gaps
}

/* Flexbox Implementation */
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--grid-gutter-xs) * -0.5);
  margin-right: calc(var(--grid-gutter-xs) * -0.5);
}

.flex-grid > * {
  padding-left: calc(var(--grid-gutter-xs) * 0.5);
  padding-right: calc(var(--grid-gutter-xs) * 0.5);
}
```

### Column Classes

#### CSS Grid Columns

```scss
.col-1 {
  grid-column: span 1;
}
.col-2 {
  grid-column: span 2;
}
.col-3 {
  grid-column: span 3;
}
.col-4 {
  grid-column: span 4;
}
.col-5 {
  grid-column: span 5;
}
.col-6 {
  grid-column: span 6;
}
.col-7 {
  grid-column: span 7;
}
.col-8 {
  grid-column: span 8;
}
.col-9 {
  grid-column: span 9;
}
.col-10 {
  grid-column: span 10;
}
.col-11 {
  grid-column: span 11;
}
.col-12 {
  grid-column: span 12;
}
```

#### Flexbox Columns

```scss
.flex-col-1 {
  flex: 0 0 var(--col-1);
  max-width: var(--col-1);
}
.flex-col-2 {
  flex: 0 0 var(--col-2);
  max-width: var(--col-2);
}
/* ... continues for all 12 columns */
```

#### Grid Positioning (CSS Grid Only)

```scss
/* Column Start Positions */
.col-start-1 {
  grid-column-start: 1;
}
.col-start-2 {
  grid-column-start: 2;
}
/* ... continues for all 12 positions */

/* Column End Positions */
.col-end-1 {
  grid-column-end: 1;
}
.col-end-2 {
  grid-column-end: 2;
}
/* ... continues through col-end-13 */
```

### Responsive Classes

Each column class has responsive variants:

```scss
/* Small screens (600px+) */
@media (min-width: 600px) {
  .sm-col-1 {
    grid-column: span 1;
  }
  .sm-col-2 {
    grid-column: span 2;
  }
  /* ... all columns */

  .sm-flex-col-1 {
    flex: 0 0 var(--col-1);
    max-width: var(--col-1);
  }
  /* ... all flex columns */
}

/* Medium screens (960px+) */
@media (min-width: 960px) {
  .md-col-1 {
    grid-column: span 1;
  }
  /* ... all responsive variants */
}

/* Large screens (1280px+) */
@media (min-width: 1280px) {
  .lg-col-1 {
    grid-column: span 1;
  }
  /* ... all responsive variants */
}

/* Extra large screens (1920px+) */
@media (min-width: 1920px) {
  .xl-col-1 {
    grid-column: span 1;
  }
  /* ... all responsive variants */
}
```

### Gap Utilities

```scss
.gap-xs {
  gap: var(--grid-gutter-xs);
}
.gap-sm {
  gap: var(--grid-gutter-sm);
}
.gap-md {
  gap: var(--grid-gutter-md);
}
.gap-lg {
  gap: var(--grid-gutter-lg);
}
.gap-xl {
  gap: var(--grid-gutter-xl);
}
```

## React Components

### GridContainer Component

```tsx
interface GridContainerProps extends BoxProps {
  children: React.ReactNode;
  size?: 'default' | 'lg' | 'xl' | 'fluid';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'css' | 'flex';
}

// Usage
<GridContainer size='lg' gap='md' type='css'>
  {children}
</GridContainer>;
```

### GridItem Component

```tsx
interface GridItemProps extends BoxProps {
  children: React.ReactNode;
  xs?: number; // Column span for extra small screens
  sm?: number; // Column span for small screens
  md?: number; // Column span for medium screens
  lg?: number; // Column span for large screens
  xl?: number; // Column span for extra large screens
  start?: number; // Column start position (CSS Grid only)
  end?: number; // Column end position (CSS Grid only)
  auto?: boolean; // Auto-sizing column
}

// Usage
<GridItem xs={12} sm={6} md={4} lg={3}>
  Responsive content
</GridItem>;
```

### Pre-built Layout Components

#### TwoColumnLayout

```tsx
<TwoColumnLayout
  left={<div>Sidebar</div>}
  right={<div>Main Content</div>}
  leftWidth={{ xs: 12, md: 4 }}
  rightWidth={{ xs: 12, md: 8 }}
  gap='lg'
  containerSize='default'
/>
```

#### ThreeColumnLayout

```tsx
<ThreeColumnLayout
  left={<div>Left Sidebar</div>}
  center={<div>Main Content</div>}
  right={<div>Right Sidebar</div>}
  leftWidth={{ xs: 12, lg: 3 }}
  centerWidth={{ xs: 12, lg: 6 }}
  rightWidth={{ xs: 12, lg: 3 }}
/>
```

#### CardGrid

```tsx
<CardGrid
  items={cardArray}
  xs={1} // 1 column on mobile
  sm={2} // 2 columns on small screens
  md={3} // 3 columns on medium screens
  lg={4} // 4 columns on large screens
  gap='md'
/>
```

## Usage Examples

### Basic Grid Layout

```tsx
import { GridContainer, GridItem } from '@/components/Grid';

const MyComponent = () => (
  <GridContainer>
    <GridItem xs={12} md={8}>
      <h1>Main Content</h1>
      <p>
        This content takes full width on mobile, 8 columns on medium+ screens.
      </p>
    </GridItem>
    <GridItem xs={12} md={4}>
      <aside>
        <h2>Sidebar</h2>
        <p>
          This sidebar stacks below on mobile, alongside on medium+ screens.
        </p>
      </aside>
    </GridItem>
  </GridContainer>
);
```

### CSS Grid with Positioning

```tsx
<GridContainer type='css'>
  <GridItem xs={6} start={2} end={8}>
    Content positioned from column 2 to column 8
  </GridItem>
  <GridItem xs={4} start={9}>
    Content starting at column 9
  </GridItem>
</GridContainer>
```

### Responsive Card Layout

```tsx
const ProductGrid = ({ products }) => (
  <CardGrid
    items={products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
    xs={1} // 1 column on mobile
    sm={2} // 2 columns on small tablets
    md={3} // 3 columns on medium screens
    lg={4} // 4 columns on large screens
    xl={6} // 6 columns on extra large screens
    gap='lg'
  />
);
```

### Complex Layout

```tsx
<GridContainer size='xl' gap='lg'>
  <GridItem xs={12}>
    <Header />
  </GridItem>

  <GridItem xs={12} lg={3}>
    <Navigation />
  </GridItem>

  <GridItem xs={12} lg={6}>
    <MainContent />
  </GridItem>

  <GridItem xs={12} lg={3}>
    <Sidebar />
  </GridItem>

  <GridItem xs={12}>
    <Footer />
  </GridItem>
</GridContainer>
```

## Responsive Behavior

### Breakpoint System

The grid system follows Material UI breakpoints:

| Breakpoint | Screen Size | Container Padding | Grid Gap |
| ---------- | ----------- | ----------------- | -------- |
| `xs`       | 0px+        | 16px              | 16px     |
| `sm`       | 600px+      | 24px              | 24px     |
| `md`       | 960px+      | 32px              | 32px     |
| `lg`       | 1280px+     | 48px              | 48px     |
| `xl`       | 1920px+     | 64px              | 64px     |

### Container Sizes

| Container Type | Max Width | Best For                 |
| -------------- | --------- | ------------------------ |
| `default`      | 1200px    | Standard content layouts |
| `lg`           | 1400px    | Wide content layouts     |
| `xl`           | 1600px    | Extra wide layouts       |
| `fluid`        | 100%      | Full-width layouts       |

### Responsive Column Behavior

```tsx
// This component demonstrates mobile-first responsive design
<GridItem xs={12} sm={6} md={4} lg={3} xl={2}>
  {/* 
    xs: 12 columns (100% width) on mobile
    sm: 6 columns (50% width) on small screens
    md: 4 columns (33.33% width) on medium screens
    lg: 3 columns (25% width) on large screens
    xl: 2 columns (16.67% width) on extra large screens
  */}
</GridItem>
```

## Integration with Design System

### Variable Integration

The grid system seamlessly integrates with existing design system variables:

```scss
// Grid gutters use spacing scale
$grid-gutter-xs: $space-md; // 16px
$grid-gutter-sm: $space-lg; // 24px
$grid-gutter-md: $space-xl; // 32px

// Container padding follows same scale
$container-padding-xs: $space-md;
```

### Theme Compatibility

Grid components work with the existing theme system:

```tsx
<GridItem xs={12} md={6}>
  <Paper
    sx={{
      p: 'var(--space-lg)', // Uses design system spacing
      bgcolor: 'var(--nav-container-background)', // Uses theme colors
      borderRadius: 'var(--nav-container-border-radius)', // Uses theme values
    }}
  >
    Content with theme integration
  </Paper>
</GridItem>
```

### CSS Custom Properties

All grid values are available as CSS custom properties:

```css
.custom-grid-item {
  width: var(--col-6); /* 50% width */
  margin-left: var(--col-2); /* 16.67% left margin */
  padding: var(--grid-gutter-md); /* 32px padding */
}
```

## Best Practices

### 🎯 Do's

1. **Use Mobile-First Approach**

   ```tsx
   ✅ <GridItem xs={12} md={6} lg={4}>
   ❌ <GridItem lg={4} md={6} xs={12}>
   ```

2. **Choose Appropriate Container Size**

   ```tsx
   ✅ <GridContainer size="lg">     // For wide layouts
   ✅ <GridContainer size="fluid">  // For full-width designs
   ```

3. **Use Semantic Gap Sizes**

   ```tsx
   ✅ <GridContainer gap="md">      // Medium gap for standard layouts
   ✅ <GridContainer gap="lg">      // Large gap for spacious designs
   ```

4. **Leverage Pre-built Components**

   ```tsx
   ✅ <TwoColumnLayout />           // For simple layouts
   ✅ <CardGrid />                  // For card-based layouts
   ```

5. **Use CSS Grid for Complex Layouts**
   ```tsx
   ✅ <GridContainer type="css">    // Better for complex positioning
   ✅ <GridItem start={3} end={10}> // Precise positioning
   ```

### ❌ Don'ts

1. **Don't Mix Grid Systems**

   ```tsx
   ❌ <div className="row">         // Don't use Bootstrap classes
       <GridItem xs={6}>           // With our grid system
   ```

2. **Don't Hardcode Column Widths**

   ```tsx
   ❌ <Box sx={{ width: '50%' }}>  // Use GridItem instead
   ✅ <GridItem xs={6}>
   ```

3. **Don't Ignore Responsive Design**

   ```tsx
   ❌ <GridItem xs={4}>            // Only mobile sizing
   ✅ <GridItem xs={12} md={4}>    // Responsive sizing
   ```

4. **Don't Use Excessive Nesting**
   ```tsx
   ❌ <GridContainer>
         <GridItem xs={12}>
           <GridContainer>          // Unnecessary nesting
   ```

### 🔧 Code Quality Guidelines

#### Component Naming

```tsx
// ✅ Descriptive component names
const ProductGrid = () => <CardGrid items={products} xs={1} sm={2} md={3} />;

// ✅ Clear prop usage
<GridItem xs={12} md={8} lg={9}>
  <MainContent />
</GridItem>;
```

#### Responsive Patterns

```tsx
// ✅ Common responsive patterns
const ResponsiveLayout = () => (
  <>
    {/* Hero Section - Full Width */}
    <GridItem xs={12}>
      <HeroSection />
    </GridItem>

    {/* Content + Sidebar */}
    <GridItem xs={12} lg={8}>
      <MainContent />
    </GridItem>
    <GridItem xs={12} lg={4}>
      <Sidebar />
    </GridItem>

    {/* Three Column Cards */}
    <GridItem xs={12} sm={6} lg={4}>
      <FeatureCard />
    </GridItem>
  </>
);
```

## Performance Considerations

### CSS Bundle Size

The grid system adds approximately **8KB** to the CSS bundle (gzipped), providing:

- Complete 12-column grid system
- Responsive utilities for all breakpoints
- Both CSS Grid and Flexbox implementations
- Container and gap utilities

### Runtime Performance

1. **CSS Grid Advantages**

   - Better performance for complex layouts
   - Native browser grid calculations
   - More efficient than JavaScript-based layouts

2. **Flexbox Advantages**
   - Better browser support
   - Easier content-based sizing
   - More predictable behavior

### Memory Usage

- **Minimal JavaScript footprint** - Components are thin wrappers around CSS
- **No runtime calculations** - All sizing handled by CSS
- **Efficient re-renders** - Material UI Box optimizations

### Bundle Optimization

```tsx
// ✅ Import only what you need
import { GridContainer, GridItem } from '@/components/Grid';

// ✅ Tree-shakeable exports
import { TwoColumnLayout } from '@/components/Grid';

// ❌ Avoid importing everything
import Grid from '@/components/Grid'; // Imports all components
```

## Migration Guide

### From Material UI Grid v4

```tsx
// Old Material UI Grid v4
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    Content
  </Grid>
</Grid>

// New Four Loop Grid System
<GridContainer gap="lg">
  <GridItem xs={12} md={6}>
    Content
  </GridItem>
</GridContainer>
```

### From CSS Frameworks

```tsx
// Bootstrap-style
<div className="container">
  <div className="row">
    <div className="col-md-6">Content</div>
  </div>
</div>

// Four Loop Grid System
<GridContainer>
  <GridItem xs={12} md={6}>
    Content
  </GridItem>
</GridContainer>
```

### Adding to Existing Pages

1. **Wrap existing content in GridContainer**
2. **Convert div layouts to GridItem**
3. **Add responsive breakpoints**
4. **Test across all screen sizes**

## Testing and Validation

### Visual Testing Checklist

- [ ] **Mobile (xs)**: Content stacks properly
- [ ] **Tablet (sm/md)**: Appropriate column distribution
- [ ] **Desktop (lg/xl)**: Optimal layout utilization
- [ ] **Gap consistency**: Proper spacing at all breakpoints
- [ ] **Container sizing**: Appropriate max-widths
- [ ] **Grid positioning**: Correct start/end positions
- [ ] **Auto-sizing**: Flexible columns work properly

### Browser Testing

- [ ] **Chrome**: Latest version
- [ ] **Firefox**: Latest version
- [ ] **Safari**: Latest version
- [ ] **Edge**: Latest version
- [ ] **Mobile browsers**: iOS Safari, Chrome Mobile

### Performance Testing

- [ ] **Layout shifts**: Minimal CLS during loading
- [ ] **Render performance**: Smooth scrolling and interactions
- [ ] **Memory usage**: No memory leaks with dynamic content
- [ ] **Bundle size**: CSS size within acceptable limits

---

**Implementation Date**: June 25, 2025  
**Grid System Version**: 1.0.0  
**Framework Compatibility**: Next.js 14.2.30, Material UI 5.x  
**Browser Support**: Modern browsers with CSS Grid and Flexbox support

This comprehensive 12-column grid system provides a robust foundation for responsive layouts while maintaining consistency with the existing design system and theme architecture.
