# Grid System Documentation

## Overview

Four Loop Digital uses a dual grid system approach combining **12-column responsive layout** with
**8px spacing grid** to create layouts that are both structurally flexible and visually harmonious.

## Two Complementary Systems

### 🎯 8px Grid System (Spacing System)

**Purpose**: Controls spacing, padding, margins, and gaps **What it affects**: The _distance
between_ elements

```typescript
// Base 8px spacing scale
export const SPACING_SCALE = {
  0.5: '0.125rem', // 2px  (8px ÷ 4)
  1: '0.25rem', // 4px  (8px ÷ 2)
  2: '0.5rem', // 8px  (8px × 1) ⭐ Base unit
  4: '1rem', // 16px (8px × 2)
  6: '1.5rem', // 24px (8px × 3)
  8: '2rem', // 32px (8px × 4)
  12: '3rem', // 48px (8px × 6)
  16: '4rem', // 64px (8px × 8)
};

// Used for gaps between grid items
export const GRID_SPACING = {
  xs: '8px', // 8px × 1
  sm: '16px', // 8px × 2
  md: '24px', // 8px × 3
  lg: '32px', // 8px × 4
  xl: '48px', // 8px × 6
};
```

#### Why 8px Grid?

1. **Visual Consistency**: Creates predictable, harmonious spacing relationships
2. **Design-Development Alignment**: Designers and developers speak the same "spacing language"
3. **Scalability**: Easy to scale up/down while maintaining proportions
4. **Accessibility**: Better for users with visual impairments as it creates clear visual hierarchy
5. **Performance**: Fewer unique spacing values = smaller CSS bundles

### 📐 12-Column Grid System (Layout System)

**Purpose**: Controls layout structure and column spans **What it affects**: How much _width_
elements take up

```tsx
// 12-column layout system
<GridContainer>
  <GridItem xs={12} md={6} lg={4}>
    {' '}
    {/* Responsive column spans */}
    Content takes 12/12 cols on mobile, 6/12 on medium, 4/12 on large
  </GridItem>
  <GridItem xs={12} md={6} lg={8}>
    Content takes remaining space
  </GridItem>
</GridContainer>
```

#### Column Calculations

```scss
// Column width calculations (based on 12-column system)
$col-1: calc(100% / 12 * 1); // 8.333%
$col-6: calc(100% / 12 * 6); // 50%
$col-12: calc(100% / 12 * 12); // 100%
```

## How They Work Together

### Real-World Example

```tsx
// From GridSystemDemo.tsx
<GridContainer size='lg' gap='md'>
  {' '}
  {/* 12-col system + 8px spacing */}
  <GridItem xs={12} sm={6} md={4}>
    {' '}
    {/* 12-column layout */}
    <Paper sx={{ p: 2 }}>
      {' '}
      {/* 8px spacing (p: 2 = 16px) */}
      Content
    </Paper>
  </GridItem>
</GridContainer>
```

**Breaking this down:**

- `GridContainer` with `gap='md'` = **24px gap** (8px × 3) between items
- `GridItem xs={12} sm={6} md={4}` = Takes **full width** on mobile, **half width** on small
  screens, **1/3 width** on medium+
- `p: 2` = **16px padding** (8px × 2) inside each card

### Visual Comparison

```text
8px GRID SYSTEM (Spacing):
┌─────┐ 8px gap ┌─────┐ 8px gap ┌─────┐
│ 16px│         │ 16px│         │ 16px│
│ pad │         │ pad │         │ pad │
└─────┘         └─────┘         └─────┘

12-COLUMN GRID (Layout):
┌─────────────┬─────────────┬─────────────┐
│   4 cols    │   4 cols    │   4 cols    │
│             │             │             │
└─────────────┴─────────────┴─────────────┘
```

## Implementation Details

### React Components

#### GridContainer

```tsx
interface GridContainerProps {
  size?: 'default' | 'lg' | 'xl' | 'fluid';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 8px-based spacing
  type?: 'css' | 'flex';
}

// Container sizes (12-column system)
const containerSizes = {
  default: '1200px', // Standard max-width
  lg: '1400px', // Large container
  xl: '1600px', // Extra large
  fluid: '100%', // Full width
};

// Gap sizes (8px spacing system)
const gapSizes = {
  xs: '8px', // 8px × 1
  sm: '16px', // 8px × 2
  md: '24px', // 8px × 3
  lg: '32px', // 8px × 4
  xl: '48px', // 8px × 6
};
```

#### GridItem

```tsx
interface GridItemProps {
  // 12-column responsive breakpoints
  xs?: number; // 0-12 columns for extra small screens
  sm?: number; // 0-12 columns for small screens
  md?: number; // 0-12 columns for medium screens
  lg?: number; // 0-12 columns for large screens
  xl?: number; // 0-12 columns for extra large screens

  // CSS Grid positioning
  start?: number; // Column start position
  end?: number; // Column end position
  auto?: boolean; // Auto-sizing column
}
```

### CSS Classes

#### 12-Column Grid Classes

```css
/* Container classes */
.container {
  max-width: 1200px;
}
.container-lg {
  max-width: 1400px;
}
.container-xl {
  max-width: 1600px;
}
.container-fluid {
  max-width: none;
}

/* Column span classes */
.col-1 {
  grid-column: span 1;
}
.col-6 {
  grid-column: span 6;
}
.col-12 {
  grid-column: span 12;
}

/* Responsive column classes */
.xs-col-12 {
  grid-column: span 12;
}
.md-col-6 {
  grid-column: span 6;
}
.lg-col-4 {
  grid-column: span 4;
}
```

#### 8px Spacing Classes

```css
/* Gap utilities (8px multiples) */
.gap-xs {
  gap: 8px;
} /* 8px × 1 */
.gap-sm {
  gap: 16px;
} /* 8px × 2 */
.gap-md {
  gap: 24px;
} /* 8px × 3 */
.gap-lg {
  gap: 32px;
} /* 8px × 4 */
.gap-xl {
  gap: 48px;
} /* 8px × 6 */

/* Padding utilities (8px multiples) */
.p-1 {
  padding: 4px;
} /* 8px ÷ 2 */
.p-2 {
  padding: 8px;
} /* 8px × 1 */
.p-4 {
  padding: 16px;
} /* 8px × 2 */
.p-6 {
  padding: 24px;
} /* 8px × 3 */
.p-8 {
  padding: 32px;
} /* 8px × 4 */
```

## Responsive Breakpoints

### Breakpoint Scale

```typescript
export const BREAKPOINTS = {
  xs: 0, // Extra small devices
  sm: 600, // Small devices (phones in landscape)
  md: 960, // Medium devices (tablets)
  lg: 1280, // Large devices (laptops)
  xl: 1920, // Extra large devices (desktops)
};
```

### Responsive Grid Usage

```tsx
// Responsive layout example
<GridContainer gap='md'>
  <GridItem xs={12} sm={8} md={9}>
    {/* Main content:
        - 12 columns on mobile (full width)
        - 8 columns on small screens (2/3 width)
        - 9 columns on medium+ screens (3/4 width) */}
    <MainContent />
  </GridItem>

  <GridItem xs={12} sm={4} md={3}>
    {/* Sidebar:
        - 12 columns on mobile (full width, stacked)
        - 4 columns on small screens (1/3 width)
        - 3 columns on medium+ screens (1/4 width) */}
    <Sidebar />
  </GridItem>
</GridContainer>
```

### Responsive Spacing

The 8px spacing system also adapts to different screen sizes:

```typescript
export const RESPONSIVE_SPACING = {
  mobile: {
    container: '16px', // 8px × 2
    component: '8px', // 8px × 1
  },
  tablet: {
    container: '24px', // 8px × 3
    component: '16px', // 8px × 2
  },
  desktop: {
    container: '48px', // 8px × 6
    component: '24px', // 8px × 3
  },
};
```

## Pre-built Layout Components

### TwoColumnLayout

```tsx
<TwoColumnLayout
  left={<Sidebar />}
  right={<MainContent />}
  leftWidth={{ xs: 12, md: 4 }} // 12-column system
  rightWidth={{ xs: 12, md: 8 }} // 12-column system
  gap='lg' // 8px spacing (32px)
/>
```

### ThreeColumnLayout

```tsx
<ThreeColumnLayout
  left={<LeftSidebar />}
  center={<MainContent />}
  right={<RightSidebar />}
  leftWidth={{ xs: 12, lg: 3 }} // 12-column system
  centerWidth={{ xs: 12, lg: 6 }} // 12-column system
  rightWidth={{ xs: 12, lg: 3 }} // 12-column system
  gap='md' // 8px spacing (24px)
/>
```

### CardGrid

```tsx
<CardGrid
  items={cardItems}
  xs={1}
  sm={2}
  md={3}
  lg={4} // 12-column responsive: 1→2→3→4 cards per row
  gap='md' // 8px spacing (24px between cards)
/>
```

## Key Differences Summary

| Aspect       | 8px Grid System        | 12-Column Grid System |
| ------------ | ---------------------- | --------------------- |
| **Purpose**  | Spacing & rhythm       | Layout & positioning  |
| **Controls** | Gaps, padding, margins | Column widths, spans  |
| **Units**    | Multiples of 8px       | Fractions of 12       |
| **Example**  | `gap='md'` (24px)      | `xs={6}` (50% width)  |
| **CSS**      | `gap: 1.5rem`          | `grid-column: span 6` |

## Best Practices

### When to Use Each System

#### Use 8px Spacing For

- Component padding and margins
- Gaps between grid items
- Space between UI elements
- Form field spacing
- Card padding

#### Use 12-Column Grid For

- Page layout structure
- Content area widths
- Responsive column spans
- Component positioning
- Layout breakpoints

### Common Patterns

```tsx
// ✅ Good: Combines both systems effectively
<GridContainer gap='lg'>           {/* 8px: 32px gap */}
  <GridItem xs={12} md={8}>        {/* 12-col: responsive width */}
    <Card sx={{ p: 3 }}>           {/* 8px: 24px padding */}
      <Typography sx={{ mb: 2 }}>  {/* 8px: 16px margin */}
        Title
      </Typography>
      Content
    </Card>
  </GridItem>
</GridContainer>

// ❌ Avoid: Mixing arbitrary spacing values
<div style={{ gap: '23px', padding: '17px' }}>  // Not 8px multiples
  <div style={{ width: '33.7%' }}>              // Not 12-column fraction
    Content
  </div>
</div>
```

## Architecture Benefits

This dual approach provides:

1. **Structural Flexibility**: 12-column grid handles complex layouts
2. **Visual Harmony**: 8px spacing ensures consistent rhythm
3. **Developer Experience**: Clear guidelines reduce decision fatigue
4. **Maintainability**: Systematic approach scales with project growth
5. **Design-Code Consistency**: Shared language between design and development

Think of it like architecture:

- **12-column grid** = The _blueprint_ (room sizes, layout structure)
- **8px grid** = The _interior spacing_ (furniture placement, breathing room)

Together, they create layouts that are both functionally robust and visually pleasing! 🎨✨
