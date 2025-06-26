# UI Component Library

## Overview

The Four Loop Digital UI Component Library provides a consistent set of reusable components built
with React, TypeScript, and Tailwind CSS. All components follow accessibility best practices and are
fully typed for excellent developer experience.

## Design Principles

### 1. **Accessibility First**

- All components include proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios

### 2. **Consistent Design**

- Unified color palette and spacing
- Consistent naming conventions
- Predictable component APIs

### 3. **Developer Experience**

- Full TypeScript support
- Comprehensive prop interfaces
- Clear component composition patterns
- Extensive JSDoc documentation

### 4. **Performance**

- Lightweight and optimized components
- Minimal bundle size impact
- Tree-shakeable exports

## Component Overview

### Button Component

A versatile button component with multiple variants and states.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode
- `fullWidth`: boolean

**Usage:**

```tsx
import { Button } from '@/components/ui';

// Basic usage
<Button>Click me</Button>

// With variants and icons
<Button variant="outline" size="lg" leftIcon={<Icon />}>
  Save Changes
</Button>

// Loading state
<Button loading disabled>
  Saving...
</Button>
```

### Card Component

A flexible container component with header, content, and footer sections.

**Props:**

- `variant`: 'default' | 'elevated' | 'outlined'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean

**Subcomponents:**

- `CardHeader`: For titles and subtitles
- `CardContent`: Main content area
- `CardFooter`: Action area

**Usage:**

```tsx
import { Card, CardHeader, CardContent, CardFooter, Button } from '@/components/ui';

<Card variant='elevated' hoverable>
  <CardHeader title='Card Title' subtitle='Optional subtitle' />
  <CardContent>
    <p>Your content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Input Component

A comprehensive input component with validation states and icons.

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- `variant`: 'default' | 'filled' | 'outlined'
- `inputSize`: 'sm' | 'md' | 'lg'
- `leftIcon`, `rightIcon`: React.ReactNode

**Usage:**

```tsx
import { Input } from '@/components/ui';

// Basic input
<Input
  label="Email Address"
  placeholder="Enter your email"
  type="email"
/>

// With validation
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  leftIcon={<LockIcon />}
/>

// With helper text
<Input
  label="Username"
  helperText="Must be unique and 3-20 characters"
  rightIcon={<CheckIcon />}
/>
```

## Path Aliases

The project uses TypeScript path aliases for clean imports:

```tsx
// Instead of relative paths like '../../../components/ui'
import { Button, Card, Input } from '@/components/ui';

// Or specific component paths
import Button from '@/components/ui/Button';
import { GridContainer } from '@/components/system';
import { ROUTES } from '@/constants';
import { formatCurrency } from '@/utils';
```

**Available Aliases:**

- `@/components/*` - All components
- `@/components/ui/*` - UI library components
- `@/components/layout/*` - Layout components
- `@/components/system/*` - System components
- `@/components/brand/*` - Brand components
- `@/types/*` - TypeScript type definitions
- `@/constants/*` - Application constants
- `@/utils/*` - Utility functions
- `@/hooks/*` - Custom React hooks

## Testing

All UI components include comprehensive test suites using Jest and React Testing Library.

**Test Structure:**

```
src/components/ui/
├── Button/
│   ├── Button.tsx
│   ├── index.ts
│   └── __tests__/
│       └── Button.test.tsx
├── Card/
│   ├── Card.tsx
│   ├── index.ts
│   └── __tests__/
│       └── Card.test.tsx
```

**Running Tests:**

```bash
# Run all UI component tests
npm test src/components/ui

# Run specific component tests
npm test Button.test.tsx

# Run tests in watch mode
npm test -- --watch
```

## Adding New Components

### 1. Create Component Structure

```bash
mkdir src/components/ui/ComponentName
touch src/components/ui/ComponentName/ComponentName.tsx
touch src/components/ui/ComponentName/index.ts
touch src/components/ui/ComponentName/__tests__/ComponentName.test.tsx
```

### 2. Component Template

```tsx
import React, { HTMLAttributes, forwardRef } from 'react';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'alternative';
  // Add your props here
}

const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ children, variant = 'default', className = '', ...props }, ref) => {
    const classes = ['base-classes', variant === 'alternative' && 'alternative-classes', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

### 3. Index Export

```tsx
export { default as ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 4. Update Main UI Index

```tsx
// Add to src/components/ui/index.ts
export * from './ComponentName';
```

### 5. Write Tests

Follow the existing test patterns and ensure good coverage of:

- Default rendering
- Prop variations
- User interactions
- Edge cases
- Accessibility features

## Future Enhancements

### Planned Components

- **Modal/Dialog**: For overlays and confirmations
- **Dropdown/Select**: For option selection
- **Tooltip**: For contextual help
- **Badge**: For status indicators
- **Spinner/Loading**: For loading states
- **Alert/Notification**: For user feedback
- **Tabs**: For content organization
- **Accordion**: For collapsible content

### Advanced Features

- **Theme Provider**: For consistent theming
- **Animation System**: For smooth transitions
- **Form Components**: Complete form handling
- **Data Display**: Tables, lists, and grids
- **Navigation**: Breadcrumbs, pagination, menus

## Contributing

When contributing to the UI library:

1. Follow the established naming conventions
2. Include comprehensive TypeScript types
3. Write thorough tests
4. Add JSDoc documentation
5. Ensure accessibility compliance
6. Follow the design system guidelines
7. Update this documentation

## Resources

- [React Forwardref](https://react.dev/reference/react/forwardRef)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
