# Component Library API Documentation

> 🤖 This documentation is auto-generated from code and JSDoc comments. Do not edit manually.

📊 **Project Statistics**:

- **Components**: 12 total
- **Tests**: 313 passing
- **Test Coverage**: N/A%
- **Dependencies**: 79 total (3 production)

## Component Overview

### UI Components

## Button

A versatile button component with multiple variants, sizes, and states.

### Usage Examples

```tsx
import { Button } from '@/components/ui';

// Basic usage
<Button variant="primary">Click me</Button>

// With loading state
<Button loading>Loading...</Button>

// Full width button
<Button fullWidth>Full Width</Button>
```

### Props

| Prop        | Type                                               | Required | Description             |
| ----------- | -------------------------------------------------- | -------- | ----------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | ❌       | Button variant style    |
| `size`      | `'sm' \| 'md' \| 'lg'`                             | ❌       | Button size             |
| `loading`   | `boolean`                                          | ❌       | Shows loading spinner   |
| `disabled`  | `boolean`                                          | ❌       | Disables the button     |
| `fullWidth` | `boolean`                                          | ❌       | Makes button full width |
| `children`  | `React.ReactNode`                                  | ✅       | Button content          |
| `onClick`   | `() => void`                                       | ❌       | Click handler           |

**File**: `src/components/ui/Button`

**Tests**: ✅ Available

---

## Card

A flexible card component with different variants and customizable content areas.

### Usage Examples

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

<Card variant='elevated'>
  <CardHeader title='Card Title' subtitle='Card subtitle' />
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Props

| Prop        | Type                                    | Required | Description        |
| ----------- | --------------------------------------- | -------- | ------------------ |
| `variant`   | `'default' \| 'elevated' \| 'outlined'` | ❌       | Card variant style |
| `padding`   | `'sm' \| 'md' \| 'lg'`                  | ❌       | Internal padding   |
| `hoverable` | `boolean`                               | ❌       | Adds hover effects |
| `children`  | `React.ReactNode`                       | ✅       | Card content       |

**File**: `src/components/ui/Card`

**Tests**: ✅ Available

---

## CardHeader

Card header component with title and optional subtitle.

### Props

| Prop       | Type     | Required | Description       |
| ---------- | -------- | -------- | ----------------- |
| `title`    | `string` | ✅       | Header title      |
| `subtitle` | `string` | ❌       | Optional subtitle |

**File**: `src/components/ui/Card`

**Tests**: ✅ Available

---

## CardContent

Card content area component.

### Props

| Prop       | Type              | Required | Description |
| ---------- | ----------------- | -------- | ----------- |
| `children` | `React.ReactNode` | ✅       | Content     |

**File**: `src/components/ui/Card`

**Tests**: ✅ Available

---

## CardFooter

Card footer component for actions.

### Props

| Prop       | Type              | Required | Description    |
| ---------- | ----------------- | -------- | -------------- |
| `children` | `React.ReactNode` | ✅       | Footer content |

**File**: `src/components/ui/Card`

**Tests**: ✅ Available

---

## Input

A comprehensive input component with validation and accessibility features.

### Usage Examples

```tsx
import { Input } from '@/components/ui';

// Basic input
<Input label="Email" placeholder="Enter your email" />

// With error state
<Input
  label="Password"
  type="password"
  error="Password is required"
/>

// With helper text
<Input
  label="Username"
  helperText="Must be at least 3 characters"
/>
```

### Props

| Prop           | Type                                                   | Required | Description                              |
| -------------- | ------------------------------------------------------ | -------- | ---------------------------------------- |
| `label`        | `string`                                               | ❌       | Input label                              |
| `placeholder`  | `string`                                               | ❌       | Placeholder text                         |
| `type`         | `string`                                               | ❌       | Input type (text, email, password, etc.) |
| `error`        | `string`                                               | ❌       | Error message                            |
| `helperText`   | `string`                                               | ❌       | Helper text                              |
| `disabled`     | `boolean`                                              | ❌       | Disables the input                       |
| `required`     | `boolean`                                              | ❌       | Makes input required                     |
| `value`        | `string`                                               | ❌       | Controlled value                         |
| `defaultValue` | `string`                                               | ❌       | Default value                            |
| `onChange`     | `(event: React.ChangeEvent<HTMLInputElement>) => void` | ❌       | Change handler                           |

**File**: `src/components/ui/Input`

**Tests**: ✅ Available

---

## Accessibility Features

All components implement WCAG 2.1 AA compliance:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets AA standards
- **Semantic HTML**: Proper HTML structure

## TypeScript Support

All components are fully typed with TypeScript:

- **Props Interfaces**: Complete type definitions
- **Generic Support**: Where applicable
- **Strict Mode**: Full TypeScript strict mode compliance
- **IntelliSense**: Full IDE support

## Testing

All components include comprehensive test coverage:

- **Unit Tests**: Component behavior testing
- **Accessibility Tests**: WCAG compliance testing
- **Visual Regression**: Snapshot testing
- **Integration Tests**: Component interaction testing

---

_Last updated: June 26, 2025_ _Generated from: 12 components, 313 tests_
