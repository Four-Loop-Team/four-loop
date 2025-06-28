# API Documentation

> 🤖 Auto-generated on 2025-06-28T14:29:32.076Z

## Component API Reference

### DesignSystemShowcase

**File**: `src/components/DesignSystemShowcase.tsx`

* Design System Component Examples
 Demonstrates how to use the enhanced design tokens in React components

---

### Grid.test

**File**: `src/components/Grid/__tests__/Grid.test.tsx`

* Grid Component Tests

 Note: Component implementation is empty, these are placeholder tests
 to prevent CI failures until the component is implemented.

---

### MuiThemeProvider.test

**File**: `src/components/MuiThemeProvider/__tests__/MuiThemeProvider.test.tsx`

* MuiThemeProvider Component Tests

 Note: Component implementation is empty, these are placeholder tests
 to prevent CI failures until the component is implemented.

---

### Navigation.test

**File**: `src/components/Navigation/__tests__/Navigation.test.tsx`

* Navigation Component Tests

 Note: Component implementation is empty, these are placeholder tests
 to prevent CI failures until the component is implemented.

---

### Grid

**File**: `src/components/system/Grid/Grid.tsx`

* Container type
 - 'default': Standard max-width container
 - 'lg': Large max-width container
 - 'xl': Extra large max-width container
 - 'fluid': Full width container

---

### ThemeProvider

**File**: `src/components/ThemeProvider.tsx`

* Theme Provider Component
 Manages theme switching and provides theme context throughout the app

---

### ThemeStatusIndicator

**File**: `src/components/ThemeStatusIndicator.tsx`

* Theme Status Indicator Component
 Shows current theme state - client-side only

---

### Accordion.test

**File**: `src/components/ui/Accordion/__tests__/Accordion.test.tsx`

* Test file for Accordion component
 Tests functionality, accessibility, and edge cases

---

### Accordion

**File**: `src/components/ui/Accordion/Accordion.tsx`

* Accordion and Collapsible Components
 Flexible components for expandable content sections

---

### Button

**File**: `src/components/ui/Button/Button.tsx`

* Button component props interface

---

### Calendar

**File**: `src/components/ui/Calendar/Calendar.tsx`

* Calendar/DatePicker Component
 A comprehensive date selection component with calendar view and input

---

### Card

**File**: `src/components/ui/Card/Card.tsx`

* Card component props interface

---

### Chart

**File**: `src/components/ui/Chart/Chart.tsx`

* Chart Component
 A flexible data visualization component with support for multiple chart types

---

### DataTable

**File**: `src/components/ui/DataTable/DataTable.tsx`

* DataTable component with sorting, filtering, and pagination

 @component
 @example
 ```tsx
 const columns = [
   { id: 'name', header: 'Name', accessor: 'name', sortable: true },
   { id: 'email', header: 'Email', accessor: 'email', filterable: true },
   { id: 'actions', header: 'Actions', cell: (value, row) => <Button>Edit</Button> }
 ];

 <DataTable
   data={users}
   columns={columns}
   sortable
   filterable
   pagination={{ page: 0, pageSize: 10, total: 100 }}
 />
 ```

---

### Dropdown

**File**: `src/components/ui/Dropdown/Dropdown.tsx`

* Dropdown/Select Component
 A flexible dropdown with search, multi-select, and grouping capabilities

---

### FileUpload

**File**: `src/components/ui/FileUpload/FileUpload.tsx`

* FileUpload Component
 A simple file upload component with basic functionality

---

### Form

**File**: `src/components/ui/Form/Form.tsx`

* Form Component - Fixed Version
 A comprehensive form wrapper with validation, field management, and multi-step support

---

### Input

**File**: `src/components/ui/Input/Input.tsx`

* Input component props interface

---

### Modal

**File**: `src/components/ui/Modal/Modal.tsx`

* Modal Component Suite
 A collection of modal components including basic Modal, ConfirmDialog

---

### RichTextEditor

**File**: `src/components/ui/RichTextEditor/RichTextEditor.tsx`

* RichTextEditor Component
 A WYSIWYG rich text editor with formatting tools

---

### Sticky

**File**: `src/components/ui/Sticky/Sticky.tsx`

* Sticky Component
 A flexible component for creating sticky positioned elements

---

### StickyHeader

**File**: `src/components/ui/Sticky/StickyHeader.tsx`

* StickyHeader Component
 A sticky header component with shadow and background options

---

### Tabs

**File**: `src/components/ui/Tabs/Tabs.tsx`

* Tabs Component
 A flexible tabs component with multiple variants and orientations

---

### Timeline

**File**: `src/components/ui/Timeline/Timeline.tsx`

* Timeline Component
 A flexible timeline component for displaying chronological events

---

### Toast

**File**: `src/components/ui/Toast/Toast.tsx`

* Toast Component and useToast Hook
 Individual toast component and utility hook for displaying toasts

---

### ToastManager

**File**: `src/components/ui/Toast/ToastManager.tsx`

* Toast Manager Component
 Handles rendering of toast notifications

---

### ToastProvider

**File**: `src/components/ui/Toast/ToastProvider.tsx`

* Toast Context and Provider
 Global state management for toast notifications

---


## Adding Documentation

To add API documentation for your components:

1. Add JSDoc comments above your component declarations
2. Run `npm run docs:generate` to update this file
3. Documentation will be automatically extracted and formatted

---

*This documentation is automatically generated from JSDoc comments in your components.*
