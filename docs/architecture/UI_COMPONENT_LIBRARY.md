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
```

## Advanced Components

### DataTable Component

A comprehensive data table component with sorting, filtering, and pagination.

**Location**: `/src/components/ui/DataTable/`

**Features:**

- ✅ Sorting, filtering, pagination
- ✅ Row selection and multi-selection
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Responsive design with horizontal scrolling
- ✅ TypeScript type safety
- ✅ Customizable columns and cell renderers
- ✅ Empty states and loading indicators

**Usage:**

```tsx
import { DataTable } from '@/components/ui';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
];

<DataTable data={users} columns={columns} pagination filterable selectable />;
```

### Chart Component

Interactive charts with multiple types and responsive design.

**Location**: `/src/components/ui/Chart/`

**Features:**

- ✅ Multiple chart types (line, bar, pie, area, scatter)
- ✅ Interactive legend and axes
- ✅ Error and loading states
- ✅ TypeScript interfaces
- ✅ Responsive design
- ⚠️ Canvas-based implementation (has type issues to resolve)

**Usage:**

```tsx
import { Chart } from '@/components/ui';

<Chart
  type='line'
  data={chartData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
  }}
/>;
```

### Modal Suite

Comprehensive modal system with focus management and accessibility.

**Location**: `/src/components/ui/Modal/`

**Components:**

- `Modal` - Base modal component
- `ModalHeader` - Modal header with title and close button
- `ModalBody` - Content area
- `ModalFooter` - Action buttons area
- `ConfirmDialog` - Pre-built confirmation dialog

**Features:**

- ✅ Focus management and accessibility
- ✅ Portal rendering and backdrop handling
- ✅ Keyboard navigation (ESC to close)
- ✅ Size variants and custom styling

**Usage:**

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmDialog } from '@/components/ui';

// Basic Modal
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader title="Modal Title" />
  <ModalBody>
    <p>Modal content goes here...</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </ModalFooter>
</Modal>

// Confirmation Dialog
<ConfirmDialog
  open={showConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>
```

### Dropdown/Select Component

Advanced dropdown with search, multi-select, and keyboard navigation.

**Location**: `/src/components/ui/Dropdown/`

**Features:**

- ✅ Searchable and multi-select functionality
- ✅ Option groups and custom renderers
- ✅ Keyboard navigation
- ✅ Accessibility compliance
- ✅ Position-aware dropdown placement
- ✅ Loading and error states

**Usage:**

```tsx
import { Dropdown } from '@/components/ui';

// Single select
<Dropdown
  options={options}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select an option..."
  searchable
/>

// Multi-select
<Dropdown
  options={options}
  value={selectedValues}
  onChange={handleMultiChange}
  multiple
  searchable
  placeholder="Select multiple options..."
/>
```

### Tabs Component

Flexible tabs with multiple orientations and variants.

**Location**: `/src/components/ui/Tabs/`

**Features:**

- ✅ Horizontal and vertical orientations
- ✅ Multiple variants (default, pills, underline)
- ✅ Closable tabs with add button
- ✅ Lazy loading and keep-alive modes
- ✅ Accessibility features
- ✅ Keyboard navigation

**Usage:**

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/ui';

<Tabs variant='pills' orientation='horizontal'>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab closable>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content for Tab 1</TabPanel>
    <TabPanel>Content for Tab 2</TabPanel>
    <TabPanel>Content for Tab 3</TabPanel>
  </TabPanels>
</Tabs>;
```

### Accordion Component

Collapsible content panels with smooth animations.

**Location**: `/src/components/ui/Accordion/`

**Features:**

- ✅ Single and multiple expansion modes
- ✅ Smooth animations
- ✅ Various design variants
- ✅ Accessibility compliance
- ✅ Keyboard navigation
- ✅ Custom icons and styling

**Usage:**

```tsx
import { Accordion } from '@/components/ui';

const items = [
  {
    id: 'item1',
    trigger: 'Section 1',
    content: 'Content for section 1...',
  },
  {
    id: 'item2',
    trigger: 'Section 2',
    content: 'Content for section 2...',
  },
];

<Accordion items={items} variant='minimal' multiple={false} collapsible={true} />;
```

### Toast/Notification System

Global notification system with context provider.

**Location**: `/src/components/ui/Toast/`

**Features:**

- ✅ Toast context and provider
- ✅ Multiple notification types (info, success, warning, error)
- ✅ Action buttons and auto-dismiss
- ✅ Position management and stacking
- ✅ Smooth animations
- ✅ Accessibility features

**Usage:**

```tsx
import { useToast } from '@/components/ui';

function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed successfully.',
      type: 'success',
      duration: 3000,
    });
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong.',
      type: 'error',
      action: {
        label: 'Retry',
        onClick: () => retryOperation(),
      },
    });
  };

  return (
    <div>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
    </div>
  );
}
```

### Timeline Component

Vertical and horizontal timeline with custom styling.

**Location**: `/src/components/ui/Timeline/`

**Features:**

- ✅ Vertical and horizontal orientations
- ✅ Multiple variants and styling options
- ✅ Custom icons and timestamps
- ✅ Interactive actions
- ✅ Accessibility compliance
- ✅ Responsive design

**Usage:**

```tsx
import { Timeline, TimelineItem } from '@/components/ui';

const timelineData = [
  {
    id: '1',
    title: 'Project Started',
    description: 'Initial project setup and planning',
    timestamp: '2025-01-01',
    icon: <StartIcon />,
  },
  {
    id: '2',
    title: 'Development Phase',
    description: 'Core features implementation',
    timestamp: '2025-02-15',
    icon: <CodeIcon />,
  },
];

<Timeline orientation='vertical' variant='default'>
  {timelineData.map((item) => (
    <TimelineItem
      key={item.id}
      title={item.title}
      description={item.description}
      timestamp={item.timestamp}
      icon={item.icon}
    />
  ))}
</Timeline>;
```

### Calendar/DatePicker Components

Date selection with range support and time integration.

**Location**: `/src/components/ui/Calendar/`

**Features:**

- ✅ Calendar and DatePicker components
- ✅ Date range and multiple selection
- ✅ Time picker integration
- ✅ Month/year navigation
- ✅ Disabled dates and min/max constraints
- ✅ Accessibility features
- ✅ Multiple variants and customization

**Usage:**

```tsx
import { Calendar, DatePicker, DateRangePicker } from '@/components/ui';

// Single date picker
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
  minDate={new Date()}
/>

// Date range picker
<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }}
  placeholder="Select date range"
/>

// Calendar component
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  mode="single"
  disabledDates={disabledDates}
/>
```

### Form Components

Comprehensive form system with validation and multi-step support.

**Location**: `/src/components/ui/Form/`

**Features:**

- ✅ Comprehensive form wrapper with validation
- ✅ Multi-step form wizard
- ✅ Field-level and form-level validation
- ✅ Various input types support
- ✅ Auto-save functionality
- ✅ Accessibility compliance
- ⚠️ Has TypeScript issues to resolve

**Usage:**

```tsx
import { Form, FormField, MultiStepForm } from '@/components/ui';

// Basic form
<Form
  onSubmit={handleSubmit}
  validationSchema={schema}
  defaultValues={defaultValues}
>
  <FormField
    name="email"
    label="Email Address"
    type="email"
    required
  />
  <FormField
    name="password"
    label="Password"
    type="password"
    required
  />
  <Button type="submit">Submit</Button>
</Form>

// Multi-step form
<MultiStepForm
  steps={formSteps}
  onComplete={handleComplete}
  onStepChange={handleStepChange}
  autoSave
/>
```

## Components in Development

### FileUpload Component

**Status**: Types defined, implementation needed

**Planned Features:**

- Drag & drop functionality
- File previews and thumbnails
- Upload progress tracking
- Multiple file support
- File type validation

### Rich Text Editor

**Status**: Not yet implemented

**Planned Features:**

- WYSIWYG editing interface
- Formatting tools and toolbar
- Accessibility compliance
- Markdown support

### Sticky Elements

**Status**: Not yet implemented

**Planned Features:**

- Sticky headers and navigation
- Floating sidebars
- Position-aware sticky behavior

## Technical Implementation

### Design System Compliance

- ✅ Consistent color palette and spacing
- ✅ Typography scale and font weights
- ✅ Component size variants (sm, md, lg)
- ✅ Dark mode considerations
- ✅ Responsive design patterns

### Accessibility Features

- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader compatibility
- ✅ Color contrast compliance
- ✅ Semantic HTML structures

### TypeScript Integration

- ✅ Comprehensive type definitions
- ✅ Generic component types
- ✅ Prop validation and IntelliSense
- ⚠️ Some type issues remain in Chart and Form components

### Performance Considerations

- ✅ Lazy loading for heavy components
- ✅ Memoization for expensive computations
- ✅ Virtual scrolling for large datasets
- ✅ Optimized re-renders with React.memo

## Component Export

All components are exported from `/src/components/ui/index.ts`:

```tsx
import {
  // Basic Components
  Button,
  Card,
  Input,

  // Advanced Components
  DataTable,
  Chart,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  Toast,
  useToast,
  Timeline,
  TimelineItem,
  Calendar,
  DatePicker,
  DateRangePicker,
  Form,
  FormField,
  MultiStepForm,

  // Dialog Components
  ConfirmDialog,
} from '@/components/ui';
```

## Known Issues & Next Steps

### Current Issues

1. **Chart Component**: Canvas API type safety issues need resolution
2. **Form Component**: Circular dependency in helpers object
3. **Build Process**: Type issues blocking production build

### Development Roadmap

1. Fix remaining TypeScript issues in Chart and Form components
2. Complete FileUpload component implementation
3. Implement RichTextEditor with proper accessibility
4. Add Sticky components (headers, sidebars)
5. Enhance test coverage for new components
6. Update documentation and examples

The component library provides a comprehensive foundation for building accessible, performant, and
user-friendly interfaces while maintaining consistency across the application.
