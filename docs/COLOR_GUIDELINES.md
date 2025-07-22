# Color System Guidelines

This document outlines the proper usage of colors in the Four Loop Digital codebase to maintain
brand consistency and prevent hardcoded color issues.

## Brand Color System

We use a strict 4-color brand system:

- **Highlight**: `#e2e891` (Yellow-green for accent, buttons, highlights)
- **Primary Background**: `#353535` (Main site background, text on light)
- **Secondary Background**: `#232323` (Darker content backgrounds)
- **Light Text**: `#fff` (Text and borders on dark backgrounds)

## Implementation Methods

### 1. **SCSS Variables (Preferred for Stylesheets)**

```scss
// In SCSS files, use these variables:
$color-highlight: #e2e891;
$color-background-primary: #353535;
$color-background-secondary: #232323;
$color-text-light: #fff;

.my-component {
  background-color: $color-background-secondary;
  color: $color-text-light;
  border-color: $color-highlight;
}
```

### 2. **CSS Custom Properties (For Component Styles)**

```tsx
// In component sx props or CSS-in-JS:
sx={{
  backgroundColor: 'var(--color-background-secondary)',
  color: 'var(--color-text-light)',
  borderColor: 'var(--color-highlight)',
}}
```

### 3. **Theme Colors (Recommended for Material-UI)**

```tsx
import { colors } from '@/components/system/BrandThemeProvider/BrandThemeProvider';

// Type-safe and IDE-friendly:
sx={{
  backgroundColor: colors.backgroundSecondary,
  color: colors.textLight,
  borderColor: colors.highlight,
}}
```

### 4. **SCSS Utility Classes**

```tsx
// For simple cases, use utility classes:
<div className='bg-secondary-dark text-light border-highlight'>Content</div>
```

## ❌ What NOT to Do

```tsx
// DON'T use hardcoded hex colors:
sx={{ color: '#e2e891' }} // ❌ BAD

// DON'T use generic color names:
sx={{ color: 'white' }} // ❌ BAD

// DON'T use random colors outside our system:
sx={{ color: '#A8E6A3' }} // ❌ BAD - not in our brand palette
```

## ✅ What TO Do

```tsx
// ✅ GOOD - Use theme colors:
sx={{ color: colors.highlight }}

// ✅ GOOD - Use CSS custom properties:
sx={{ color: 'var(--color-highlight)' }}

// ✅ GOOD - Use utility classes:
className="text-highlight"
```

## ESLint Rules

Our ESLint configuration will catch hardcoded colors:

```json
// This will trigger an error:
"color": "#e2e891" // ❌ Hardcoded hex colors are not allowed

// This is allowed:
"color": "var(--color-highlight)" // ✅ Good
```

## Material-UI Integration

Use our `BrandThemeProvider` to ensure all Material-UI components respect our color system:

```tsx
// The existing MuiThemeProvider already handles this!
// Just import colors when needed:
import { colors } from '@/components/system/BrandThemeProvider/BrandThemeProvider';

function App() {
  return (
    <BrandThemeProvider>
      <YourComponents />
    </BrandThemeProvider>
  );
}
```

## Code Review Checklist

When reviewing code, check for:

- [ ] No hardcoded hex colors (`#123456`)
- [ ] No hardcoded RGB values (`rgb(18, 52, 86)`)
- [ ] No generic color names (`white`, `black`, `green`)
- [ ] All colors use our theme system or CSS custom properties
- [ ] Material-UI components use theme colors where possible

## Common Patterns

### Button Styling

```tsx
// ✅ Good
<Button
  sx={{
    backgroundColor: colors.highlight,
    color: colors.backgroundPrimary,
    '&:hover': {
      backgroundColor: colors.highlight,
      opacity: 0.9,
    },
  }}
/>
```

### Background Containers

```tsx
// ✅ Good
<Box
  sx={{
    backgroundColor: colors.backgroundSecondary,
    color: colors.textLight,
    border: `1px solid ${colors.textLight}`,
  }}
/>
```

### Text Highlighting

```tsx
// ✅ Good
<Typography sx={{ color: colors.highlight }}>Highlighted text</Typography>
```

## Troubleshooting

If you encounter color issues:

1. Check if you're using hardcoded colors
2. Verify CSS custom properties are defined
3. Ensure BrandThemeProvider is wrapping your app
4. Use browser dev tools to inspect computed styles
5. Run ESLint to catch color violations

## Tools and Scripts

- **ESLint**: Catches hardcoded colors automatically
- **Color Audit**: `npm run audit:colors` (searches for hardcoded colors)
- **Theme Inspector**: Browser extension to inspect CSS custom properties
