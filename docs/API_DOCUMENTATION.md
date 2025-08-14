# API Documentation

> 🤖 Auto-generated on 2025-08-14T03:08:21.367Z

## Component API Reference

### Logo

**File**: `src/components/brand/Logo.tsx`

* Logo component displays the Four Loop Digital brand logo with responsive sizing.

 This component is designed to provide consistent brand representation across
 the application with customizable dimensions and Material-UI Box styling.

 @component
 @example
 ```tsx
 // Basic usage
 <Logo />

 // Custom size and styling
 <Logo
   width={150}
   height={60}
   sx={{ margin: 2 }}
 />

 // With custom alt text
 <Logo alt="Company Logo" priority={false} />
 ```

 @param {LogoProps} props - The logo component props
 @param {string} [props.alt="Four Loop Digital Logo"] - Alt text for accessibility
 @param {number} [props.width=200] - Logo width in pixels
 @param {number} [props.height=80] - Logo height in pixels
 @param {boolean} [props.priority=true] - Next.js Image priority loading
 @returns {JSX.Element} The rendered logo component

---

### Grid.test

**File**: `src/components/Grid/__tests__/Grid.test.tsx`

* Grid Component Tests

 Note: Component implementation is empty, these are placeholder tests
 to prevent CI failures until the component is implemented.

---

### BreadcrumbNav

**File**: `src/components/layout/BreadcrumbNav.tsx`

* BreadcrumbNav component provides hierarchical navigation showing the user's location.

 This component is designed to help users understand their current page location
 and navigate back to parent pages in the site hierarchy.

 @component
 @example
 ```tsx
 // Basic usage with auto-generated breadcrumbs from URL
 <BreadcrumbNav />

 // Custom breadcrumb items
 <BreadcrumbNav
   items={[
     { label: 'Home', href: '/' },
     { label: 'Products', href: '/products' },
     { label: 'Category' }
   ]}
 />
 ```

 @param {BreadcrumbNavProps} props - The breadcrumb navigation props
 @param {BreadcrumbItem[]} [props.items] - Custom breadcrumb items, auto-generated if not provided
 @returns {JSX.Element} The rendered breadcrumb navigation component

---

### Navigation

**File**: `src/components/layout/Navigation/Navigation.tsx`

* Main navigation component with responsive design and optimized client-side routing.

 This component provides the primary navigation for the Four Loop Digital website,
 featuring responsive mobile/desktop layouts, optimized client-side navigation with
 Next.js Link components and prefetching, and visual active state indicators based
 on current route. The header persists across page transitions for optimal UX.

 @component
 @example
 ```tsx
 // Basic usage
 <Navigation />
 ```

 @returns {JSX.Element} The rendered navigation component with responsive behavior

 @accessibility
 - Supports keyboard navigation
 - ARIA labels for mobile menu toggle
 - Semantic navigation structure
 - High contrast focus indicators

 @performance
 - Client-side routing with Next.js Link components
 - Page prefetching for instant navigation
 - Conditional rendering for mobile/desktop
 - Efficient active page detection
 - Header persistence across page transitions

---

### NavigationSkeleton

**File**: `src/components/layout/Navigation/NavigationSkeleton.tsx`

* Loading skeleton for Navigation component
 Displays a placeholder layout while the navigation is mounting/loading

---

### SkipNavigationLink

**File**: `src/components/layout/SkipNavigationLink.tsx`

* A skip navigation link component that provides keyboard accessibility
 by allowing users to skip directly to the main content. The link is
 visually hidden until focused, following WCAG accessibility guidelines.

 @component
 @example
 ```tsx
 <SkipNavigationLink />
 ```

 @accessibility
 - Provides keyboard navigation skip functionality
 - Follows WCAG 2.1 AA guidelines for skip links
 - Becomes visible when focused via keyboard navigation
 - Uses high contrast colors for visibility

---

### ContactModal

**File**: `src/components/modals/ContactModal.tsx`

* Contact Modal Component

 A branded contact modal that matches the Four Loop design system,
 featuring the yellow accent styling and external close button.

 @component
 @example
 ```tsx
 const [isOpen, setIsOpen] = useState(false);

 <ContactModal
   isOpen={isOpen}
   onClose={() => setIsOpen(false)}
 />
 ```

---

### Navigation.test

**File**: `src/components/Navigation/__tests__/Navigation.test.tsx`

* Navigation Component Tests

 Note: Component implementation is empty, these are placeholder tests
 to prevent CI failures until the component is implemented.

---

### ContactSection

**File**: `src/components/sections/ContactSection.tsx`

* Contact section component
 Features contact form using the reusable Form component

 @component
 @example
 ```tsx
 <ContactSection />
 ```

---

### IntroSection

**File**: `src/components/sections/IntroSection.tsx`

* Intro section component for the homepage/work page
 Features the Four Loop Digital logo and company description in a styled container

 @component
 @example
 ```tsx
 <IntroSection />
 ```

---

### PartnersSection

**File**: `src/components/sections/PartnersSection.tsx`

* Partners section component
 Features information about company partnerships and collaborations

 @component
 @example
 ```tsx
 <PartnersSection />
 ```

---

### ServicesSection

**File**: `src/components/sections/ServicesSection.tsx`

* Services section component
 Features service areas with expandable details and collaboration CTA

 @component
 @example
 ```tsx
 <ServicesSection />
 ```

---

### BrandThemeProvider

**File**: `src/components/system/BrandThemeProvider/BrandThemeProvider.tsx`

* Brand colors object for use in sx props and components
 These match our theme palette and SCSS variables

---

### Grid

**File**: `src/components/system/Grid/Grid.tsx`

* Container type
 - 'default': Standard max-width container
 - 'lg': Large max-width container
 - 'xl': Extra large max-width container
 - 'fluid': Full width container

---

### GridSystemDemo

**File**: `src/components/system/GridSystemDemo.tsx`

* @fileoverview GridSystemDemo Component - Comprehensive grid system demonstration
 @component GridSystemDemo

 @description
 A comprehensive demonstration component showcasing the project's 12-column grid system capabilities.
 This component serves as both documentation and testing playground for the grid system, providing
 interactive examples of various grid layouts with visual feedback and responsive behavior demonstrations.

 @features
 - ✅ Basic grid container and item examples
 - ✅ Responsive breakpoint demonstrations (xs, sm, md, lg, xl)
 - ✅ Pre-built layout components (TwoColumnLayout, ThreeColumnLayout)
 - ✅ CardGrid responsive card layouts
 - ✅ Advanced grid positioning and offset examples
 - ✅ Auto-sizing column demonstrations
 - ✅ Gap size variations (xs, sm, md, lg, xl)
 - ✅ Container size examples (default, lg, xl, fluid)
 - ✅ CSS Grid and Flexbox implementations
 - ✅ Visual spacing and alignment guides
 - ✅ Real-world layout patterns

 @example
 ```tsx
 // Basic usage in a design system documentation page
 <GridSystemDemo />

 // Used in layout testing and development
 function LayoutDevelopmentPage() {
   return (
     <div>
       <h1>Grid System Examples</h1>
       <GridSystemDemo />
     </div>
   );
 }

 // In a design system showcase
 import { GridSystemDemo } from '@/components/system';

 function DesignSystemPage() {
   return (
     <section>
       <h2>Grid System</h2>
       <GridSystemDemo />
     </section>
   );
 }
 ```

 @see {@link GridContainer} - Main grid container component
 @see {@link GridItem} - Individual grid item component
 @see {@link TwoColumnLayout} - Pre-built two-column layout
 @see {@link ThreeColumnLayout} - Pre-built three-column layout
 @see {@link CardGrid} - Responsive card grid component

 @accessibility
 - Semantic HTML structure with proper headings
 - Color contrast compliant design tokens
 - Responsive design for all screen sizes
 - Keyboard navigable interface
 - Screen reader compatible content structure

 @performance
 - Lightweight implementation with minimal re-renders
 - CSS-based grid system for optimal performance
 - Efficient responsive breakpoint handling
 - Optimized Material-UI component usage

---

### ThemeProvider

**File**: `src/components/ThemeProvider.tsx`

* @fileoverview Theme Provider Component for managing application-wide theme state.
 Provides theme switching functionality with local storage persistence and system preference detection.

---

### ThemeStatusIndicator

**File**: `src/components/ThemeStatusIndicator.tsx`

* @fileoverview Theme Status Indicator Component for displaying current theme state.
 Client-side only component that shows the active theme with proper hydration handling.

---

### Accordion.test

**File**: `src/components/ui/Accordion/__tests__/Accordion.test.tsx`

* Comprehensive test file for Accordion component
 Tests functionality, accessibility, edge cases, and coverage improvements

---

### Accordion

**File**: `src/components/ui/Accordion/Accordion.tsx`

* @fileoverview Accordion and Collapsible Components - Expandable content sections
 @component Accordion

 @description
 Flexible accordion and collapsible components for organizing expandable content with:
 - Single and multiple expansion modes
 - Controlled and uncontrolled states
 - Multiple visual variants
 - Smooth animations and transitions
 - Keyboard navigation support
 - Accessibility features built-in
 - Customizable styling options

 @features
 - ✅ Single/multiple expansion modes
 - ✅ Controlled/uncontrolled behavior
 - ✅ Multiple visual variants
 - ✅ Smooth animations
 - ✅ Keyboard navigation
 - ✅ Icon customization
 - ✅ ARIA compliance
 - ✅ TypeScript support

 @example
 ```tsx
 // Basic accordion usage
 <Accordion
   items={[
     {
       id: '1',
       title: 'Section 1',
       content: <div>Content for section 1</div>
     },
     {
       id: '2',
       title: 'Section 2',
       content: <div>Content for section 2</div>
     }
   ]}
 />

 // Multiple expansion allowed
 <Accordion
   items={accordionItems}
   multiple={true}
   defaultExpandedItems={['1', '3']}
   variant="bordered"
 />

 // Individual collapsible component
 <Collapsible
   title="Expandable Section"
   isExpanded={isExpanded}
   onToggle={setIsExpanded}
 >
   <p>This content can be expanded or collapsed</p>
 </Collapsible>
 ```

 @accessibility
 - ARIA expanded/collapsed states
 - Keyboard navigation (Enter, Space, Arrow keys)
 - Focus management
 - Screen reader compatible
 - High contrast support

---

### Button

**File**: `src/components/ui/Button/Button.tsx`

* Button component props interface

---

### Calendar

**File**: `src/components/ui/Calendar/Calendar.tsx`

* @fileoverview Calendar/DatePicker Component with comprehensive date selection features.
 Provides calendar view, date input, time picker, and range selection capabilities.

---

### Card

**File**: `src/components/ui/Card/Card.tsx`

* Card component props interface

---

### Chart

**File**: `src/components/ui/Chart/Chart.tsx`

* Chart Component
 A flexible data visualization component with support for multiple chart types
 including line, bar, area, pie, and scatter charts. Provides responsive design
 and customizable styling options.

 @component
 @example
 ```tsx
 <Chart
   type="line"
   data={{
     labels: ['Jan', 'Feb', 'Mar'],
     datasets: [{
       label: 'Sales',
       data: [100, 200, 150],
       borderColor: '#3B82F6'
     }]
   }}
   width={600}
   height={400}
 />
 ```

 @param {ChartProps} props - The component props
 @param {string} props.type - Type of chart to render
 @param {object} props.data - Chart data including labels and datasets
 @param {object} props.options - Chart configuration options
 @param {number} props.width - Chart width in pixels
 @param {number} props.height - Chart height in pixels
 @param {string} props.className - Additional CSS classes
 @param {boolean} props.loading - Loading state indicator
 @param {string} props.error - Error message to display

---

### DataTable

**File**: `src/components/ui/DataTable/DataTable.tsx`

* DataTable component with comprehensive sorting, filtering, and pagination capabilities.

 A highly customizable data table component that supports:
 - Dynamic column configuration with custom renderers
 - Built-in sorting with custom sort functions
 - Advanced filtering with multiple field types
 - Pagination with configurable page sizes
 - Row selection (single or multiple)
 - Responsive design with size variants
 - Loading states and empty state handling
 - Custom row styling and click handlers

 @component
 @template T - The type of data objects in the table
 @example
 ```tsx
 // Basic data table
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
   onPaginationChange={(page, pageSize) => fetchData(page, pageSize)}
 />

 // Advanced usage with selection and custom styling
 <DataTable
   data={products}
   columns={productColumns}
   selectable
   selectedRows={selectedProducts}
   onSelectionChange={setSelectedProducts}
   size="lg"
   bordered
   striped
   hoverable
   getRowProps={(row) => ({
     className: row.featured ? 'featured-row' : '',
     'data-testid': `product-${row.id}`
   })}
 />
 ```

 @param {DataTableProps<T>} props - The data table configuration
 @param {T[]} props.data - Array of data objects to display
 @param {Column<T>[]} props.columns - Column configuration array
 @param {boolean} [props.loading=false] - Show loading state
 @param {string} [props.emptyMessage="No data available"] - Message when no data
 @param {boolean} [props.sortable=false] - Enable sorting functionality
 @param {SortConfig} [props.defaultSort] - Default sort configuration
 @param {Function} [props.onSort] - Sort change handler
 @param {boolean} [props.filterable=false] - Enable filtering functionality
 @param {Function} [props.onFilter] - Filter change handler
 @param {PaginationConfig} [props.pagination] - Pagination configuration
 @param {Function} [props.onPaginationChange] - Pagination change handler
 @param {boolean} [props.selectable=false] - Enable row selection
 @param {string[]} [props.selectedRows=[]] - Currently selected row IDs
 @param {Function} [props.onSelectionChange] - Selection change handler
 @param {Function} [props.onRowClick] - Row click handler
 @param {Function} [props.getRowProps] - Custom row props generator
 @param {string} [props.className=""] - Additional CSS classes
 @param {"sm" | "md" | "lg"} [props.size="md"] - Table size variant
 @param {boolean} [props.bordered=false] - Show table borders
 @param {boolean} [props.striped=false] - Use alternating row colors
 @param {boolean} [props.hoverable=true] - Enable row hover effects
 @returns {JSX.Element} The rendered data table component

 @accessibility
 - Full keyboard navigation support
 - ARIA labels for sorting and selection
 - Screen reader friendly table structure
 - Focus management for interactive elements

 @performance
 - Virtualization support for large datasets
 - Memoized column rendering
 - Optimized sort and filter operations
 - Lazy loading compatible

---

### Dropdown

**File**: `src/components/ui/Dropdown/Dropdown.tsx`

* @fileoverview Dropdown/Select Component with advanced features.
 @component Dropdown

 @description
 Flexible dropdown with search, multi-select, grouping, and accessibility support.
 Provides a comprehensive dropdown/select component with features like:
 - Single and multi-select modes
 - Search functionality
 - Grouping of options
 - Keyboard navigation
 - Custom styling and theming
 - Accessibility compliance

 @example
 ```tsx
 // Basic dropdown
 <Dropdown
   options={[
     { value: 'option1', label: 'Option 1' },
     { value: 'option2', label: 'Option 2' }
   ]}
   placeholder="Select an option..."
   onChange={(value) => console.log(value)}
 />

 // Multi-select dropdown
 <Dropdown
   options={options}
   multiple
   placeholder="Select multiple options..."
   onChange={(values) => console.log(values)}
 />

 // Dropdown with search
 <Dropdown
   options={options}
   searchable
   placeholder="Search and select..."
 />
 ```

---

### FileUpload

**File**: `src/components/ui/FileUpload/FileUpload.tsx`

* A comprehensive file upload component with drag-and-drop support and file validation.

 This component provides a user-friendly interface for uploading files with features like:
 - File type and size validation
 - Multiple file support
 - Visual feedback for upload status
 - Customizable styling and behavior
 - Accessibility support with keyboard navigation

 Features:
 - Drag and drop file upload
 - File type filtering with accept prop
 - Maximum file size validation
 - Multiple file selection support
 - Upload progress indication
 - Error handling and user feedback
 - Fully accessible with ARIA labels

 @component
 @example
 ```tsx
 // Basic file upload
 <FileUpload
   accept="image/*"
   maxSize={5 * 1024 * 1024} // 5MB
   onChange={(files) => console.log('Uploaded:', files)}
   onError={(id, message) => console.error('Error:', message)}
 />

 // Multiple file upload with custom styling
 <FileUpload
   multiple
   accept=".pdf,.doc,.docx"
   className="custom-upload-area"
   placeholder="Drop documents here or click to browse"
   onChange={handleFileUpload}
 />
 ```

 @param props - FileUpload component props
 @param props.accept - File types to accept (e.g., "image/*", ".pdf,.doc")
 @param props.maxSize - Maximum file size in bytes (default: 10MB)
 @param props.multiple - Allow multiple file selection (default: false)
 @param props.disabled - Disable the upload functionality (default: false)
 @param props.className - Additional CSS classes for styling
 @param props.placeholder - Placeholder text for the upload area
 @param props.onChange - Callback when files are successfully uploaded
 @param props.onError - Callback when upload errors occur
 @param props.data-testid - Test ID for component testing

---

### Form

**File**: `src/components/ui/Form/Form.tsx`

* Props for the Form component

---

### Input

**File**: `src/components/ui/Input/Input.tsx`

* Input component props interface extending Material-UI TextField

---

### Modal

**File**: `src/components/ui/Modal/Modal.tsx`

* @fileoverview Modal Component Suite - Flexible modal dialog system
 @component Modal

 @description
 A comprehensive modal component suite providing overlay dialogs with:
 - Multiple sizes and positioning options
 - Backdrop interaction control
 - Keyboard navigation and focus management
 - Portal rendering for proper layering
 - Confirmation dialog variants
 - Customizable styling and animations
 - Full accessibility support

 @features
 - ✅ Multiple size variants (sm, md, lg, xl, full)
 - ✅ Flexible positioning options
 - ✅ Backdrop click handling
 - ✅ Keyboard navigation (Escape to close)
 - ✅ Focus management and restoration
 - ✅ Portal rendering
 - ✅ Confirmation dialog patterns
 - ✅ ARIA compliance
 - ✅ TypeScript support

 @example
 ```tsx
 // Basic modal usage
 <Modal isOpen={isOpen} onClose={handleClose}>
   <ModalHeader>
     <h2>Modal Title</h2>
   </ModalHeader>
   <ModalBody>
     Modal content goes here
   </ModalBody>
   <ModalFooter>
     <button onClick={handleClose}>Close</button>
   </ModalFooter>
 </Modal>

 // Confirmation dialog
 <ConfirmDialog
   isOpen={showConfirm}
   title="Confirm Action"
   message="Are you sure you want to proceed?"
   onConfirm={handleConfirm}
   onCancel={handleCancel}
   variant="danger"
 />

 // Custom positioned modal
 <Modal
   isOpen={isOpen}
   onClose={handleClose}
   size="lg"
   position="top"
   backdrop="blur"
 >
   <div>Custom modal content</div>
 </Modal>
 ```

 @accessibility
 - ARIA dialog pattern implementation
 - Focus trap and restoration
 - Keyboard navigation (Escape, Tab)
 - Screen reader announcements
 - High contrast support

---

### RichTextEditor

**File**: `src/components/ui/RichTextEditor/RichTextEditor.tsx`

* @fileoverview RichTextEditor Component - WYSIWYG text editor with formatting tools
 @component RichTextEditor

 @description
 A feature-rich WYSIWYG (What You See Is What You Get) text editor component that provides:
 - Rich text formatting (bold, italic, underline, etc.)
 - Text alignment options
 - List creation (ordered and unordered)
 - Customizable toolbar
 - Real-time content updates
 - Accessibility support

 @features
 - ✅ Rich text formatting tools
 - ✅ Customizable toolbar
 - ✅ Real-time content updates
 - ✅ Keyboard shortcuts
 - ✅ Accessible editor
 - ✅ Cross-browser compatibility
 - ✅ Mobile-friendly
 - ✅ TypeScript support

 @example
 ```tsx
 // Basic rich text editor
 <RichTextEditor
   value={content}
   onChange={(newContent) => setContent(newContent)}
   placeholder="Start writing..."
   height={300}
 />

 // Editor with custom toolbar
 <RichTextEditor
   value={content}
   onChange={handleChange}
   toolbar={{
     formatting: true,
     alignment: false,
     lists: true
   }}
   disabled={isLoading}
 />

 // Read-only editor
 <RichTextEditor
   value={content}
   readOnly
   toolbar={false}
   height={200}
 />
 ```

 @accessibility
 - ARIA labels for toolbar buttons
 - Keyboard navigation support
 - Screen reader compatible
 - Focus management

 @performance
 - Debounced content updates
 - Efficient DOM manipulation
 - Minimal re-renders

---

### Sticky

**File**: `src/components/ui/Sticky/Sticky.tsx`

* @fileoverview Sticky Component - Flexible sticky positioning solution
 @component Sticky

 @description
 A versatile component for creating sticky positioned elements that:
 - Provides flexible positioning options (top, bottom, left, right)
 - Supports both sticky and fixed positioning
 - Includes intersection observer for performance
 - Offers responsive breakpoint support
 - Handles z-index management
 - Provides offset customization

 @features
 - ✅ Multiple position options
 - ✅ Fixed and sticky positioning
 - ✅ Intersection Observer API
 - ✅ Responsive breakpoints
 - ✅ Z-index management
 - ✅ Offset configuration
 - ✅ Performance optimized
 - ✅ TypeScript support

 @example
 ```tsx
 // Basic sticky header
 <Sticky position="top" offset={20}>
   <header>Sticky Header Content</header>
 </Sticky>

 // Fixed sidebar
 <Sticky position="left" fixed zIndex={1000}>
   <nav>Navigation Menu</nav>
 </Sticky>

 // Responsive sticky with breakpoint
 <Sticky
   position="top"
   offset={10}
   breakpoint="md"
   className="bg-white shadow"
 >
   <div>Responsive Sticky Content</div>
 </Sticky>
 ```

 @accessibility
 - Maintains focus management
 - Preserves keyboard navigation
 - Screen reader compatible

 @performance
 - Uses Intersection Observer for efficiency
 - Minimal style recalculations
 - Optimized for scroll performance

---

### StickyHeader

**File**: `src/components/ui/Sticky/StickyHeader.tsx`

* @fileoverview StickyHeader Component - Specialized sticky header with styling options
 @component StickyHeader

 @description
 A specialized sticky header component built on top of the Sticky component that provides:
 - Pre-configured sticky behavior for headers
 - Shadow and background styling options
 - Flexible height configuration
 - Responsive design support
 - Easy-to-use header-specific API

 @features
 - ✅ Pre-configured for header use cases
 - ✅ Built-in shadow effects
 - ✅ Background color options
 - ✅ Flexible height settings
 - ✅ Responsive breakpoint support
 - ✅ Smooth transitions
 - ✅ TypeScript support
 - ✅ Accessibility ready

 @example
 ```tsx
 // Basic sticky header
 <StickyHeader>
   <h1>My Website</h1>
   <nav>Navigation</nav>
 </StickyHeader>

 // Header with custom styling
 <StickyHeader
   height={80}
   background="rgba(255, 255, 255, 0.95)"
   showShadow
   offset={10}
 >
   <Logo />
   <NavigationMenu />
 </StickyHeader>

 // Fixed header with breakpoint
 <StickyHeader
   fixed
   breakpoint="lg"
   zIndex={1000}
   className="backdrop-blur-sm"
 >
   <HeaderContent />
 </StickyHeader>
 ```

 @accessibility
 - Maintains proper heading hierarchy
 - Preserves keyboard navigation
 - Screen reader compatible
 - Focus management

 @performance
 - Optimized sticky positioning
 - Efficient shadow transitions
 - Minimal layout shifts

---

### Tabs

**File**: `src/components/ui/Tabs/Tabs.tsx`

* @fileoverview Tabs Component - Flexible tabbed interface navigation
 @component Tabs

 @description
 A flexible tabs component providing navigation between content panels with:
 - Multiple visual variants (default, buttons, cards)
 - Horizontal and vertical orientations
 - Controlled and uncontrolled modes
 - Keyboard navigation support
 - Customizable styling and animations
 - Accessibility features built-in

 @features
 - ✅ Multiple orientation support
 - ✅ Customizable variants
 - ✅ Keyboard navigation
 - ✅ Controlled/uncontrolled modes
 - ✅ Custom styling support
 - ✅ Animation support
 - ✅ ARIA compliance
 - ✅ TypeScript support

 @example
 ```tsx
 // Basic tabs usage
 <Tabs
   items={[
     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
   ]}
 />

 // Controlled tabs with custom variant
 <Tabs
   items={tabItems}
   activeTab={activeTab}
   onTabChange={setActiveTab}
   variant="buttons"
   orientation="vertical"
 />

 // Card variant with custom styling
 <Tabs
   items={tabItems}
   variant="cards"
   className="custom-tabs"
   defaultActiveTab="tab2"
 />
 ```

 @accessibility
 - ARIA tablist pattern implementation
 - Keyboard navigation (Arrow keys, Home/End)
 - Focus management and visual indicators
 - Screen reader compatible
 - High contrast support

---

### Timeline

**File**: `src/components/ui/Timeline/Timeline.tsx`

* @fileoverview Timeline Component - Flexible timeline for displaying chronological events.
 @component Timeline

 @description
 Provides versatile timeline visualization with customizable appearance and behavior.
 Perfect for displaying chronological events, project milestones, or process steps with:
 - Vertical and horizontal orientations
 - Custom item styling and content
 - Responsive design
 - Accessibility support
 - Flexible timestamp formatting

 @example
 ```tsx
 // Basic timeline
 <Timeline
   items={[
     {
       timestamp: new Date('2023-01-01'),
       title: 'Project Started',
       description: 'Initial project setup and planning'
     },
     {
       timestamp: new Date('2023-02-15'),
       title: 'First Milestone',
       description: 'Completed core functionality'
     }
   ]}
 />

 // Horizontal timeline with custom formatting
 <Timeline
   items={timelineItems}
   orientation="horizontal"
   formatTimestamp={(date) => date.toLocaleDateString()}
 />
 ```

---

### Toast

**File**: `src/components/ui/Toast/Toast.tsx`

* @fileoverview Toast Component and useToast Hook - Individual toast notifications
 @component Toast

 @description
 Individual toast component and utility hook for displaying toast notifications with:
 - Multiple toast types (success, error, warning, info, loading)
 - Auto-dismiss functionality with customizable duration
 - Manual dismiss with action buttons
 - Smooth enter/exit animations
 - Portal rendering for proper layering
 - Accessibility features and announcements
 - Customizable styling and positioning

 @features
 - ✅ Multiple toast types and variants
 - ✅ Auto-dismiss with custom durations
 - ✅ Manual dismiss controls
 - ✅ Smooth animations
 - ✅ Action button support
 - ✅ Portal rendering
 - ✅ ARIA live announcements
 - ✅ TypeScript support

 @example
 ```tsx
 // Individual toast component
 <Toast
   toast={{
     id: '1',
     type: 'success',
     title: 'Success!',
     message: 'Operation completed successfully',
     duration: 5000
   }}
   onDismiss={handleDismiss}
 />

 // Using the useToast hook
 function MyComponent() {
   const { addToast, removeToast } = useToast();

   const showSuccess = () => {
     addToast({
       type: 'success',
       title: 'Success!',
       message: 'Your action was completed'
     });
   };

   const showWithActions = () => {
     addToast({
       type: 'info',
       message: 'New update available',
       actions: [
         { label: 'Update', onClick: handleUpdate },
         { label: 'Later', onClick: () => {} }
       ]
     });
   };
 }

 // Toast container for positioning
 <ToastContainer
   toasts={toasts}
   position="top-right"
   onDismiss={handleDismiss}
 />
 ```

 @accessibility
 - ARIA live regions for announcements
 - Screen reader compatible messages
 - Keyboard dismissible
 - High contrast support
 - Focus management for actions

---

### ToastManager

**File**: `src/components/ui/Toast/ToastManager.tsx`

* @fileoverview ToastManager Component - Toast notification display manager
 @component ToastManager

 @description
 A manager component that handles the rendering and positioning of toast notifications.
 It connects to the ToastProvider context to display toasts with:
 - Flexible positioning options
 - Maximum toast limits
 - Animation support
 - Order control (normal/reverse)
 - Gap and offset configuration

 @features
 - ✅ Multiple position options
 - ✅ Maximum toast limits
 - ✅ Animation support
 - ✅ Order control
 - ✅ Gap and offset customization
 - ✅ Context integration
 - ✅ TypeScript support
 - ✅ Accessibility ready

 @example
 ```tsx
 // Basic toast manager
 <ToastManager position="top-right" />

 // Manager with custom settings
 <ToastManager
   position="bottom"
   maxToasts={5}
   reverseOrder
   gap={12}
   offset={20}
   animated
 />

 // Multiple managers for different positions
 <ToastManager position="top-left" maxToasts={3} />
 <ToastManager position="bottom-right" maxToasts={2} />
 ```

 @requires ToastProvider - Must be wrapped in ToastProvider

 @accessibility
 - ARIA live regions for announcements
 - Screen reader compatible
 - Keyboard dismissible
 - Focus management

---

### ToastProvider

**File**: `src/components/ui/Toast/ToastProvider.tsx`

* @fileoverview ToastProvider Component - Global toast notification state management
 @component ToastProvider

 @description
 A context provider component that manages global toast notification state including:
 - Toast creation and removal
 - Auto-dismiss timers
 - Toast queue management
 - State updates and notifications
 - Maximum toast limits
 - Default duration configuration

 @features
 - ✅ Global toast state management
 - ✅ Auto-dismiss functionality
 - ✅ Toast queue management
 - ✅ Unique ID generation
 - ✅ Timer management
 - ✅ Context API integration
 - ✅ TypeScript support
 - ✅ Performance optimized

 @example
 ```tsx
 // Basic provider setup
 <ToastProvider>
   <App />
   <ToastManager />
 </ToastProvider>

 // Provider with custom settings
 <ToastProvider
   defaultDuration={5000}
   maxToasts={5}
 >
   <App />
   <ToastManager position="top-right" />
 </ToastProvider>

 // Using the toast context
 function MyComponent() {
   const { addToast, removeToast } = useToastContext();

   const showSuccess = () => {
     addToast({
       type: 'success',
       title: 'Success!',
       message: 'Operation completed successfully'
     });
   };

   return <button onClick={showSuccess}>Show Toast</button>;
 }
 ```

 @context
 Provides ToastContextValue with:
 - toasts: Array of current toast notifications
 - addToast: Function to add new toast
 - removeToast: Function to remove toast by ID
 - updateToast: Function to update existing toast
 - clearToasts: Function to clear all toasts

 @accessibility
 - Manages ARIA live regions
 - Provides screen reader announcements
 - Handles focus management

 @performance
 - Efficient state updates
 - Optimized timer management
 - Minimal re-renders

---


## Adding Documentation

To add API documentation for your components:

1. Add JSDoc comments above your component declarations
2. Run `npm run docs:generate` to update this file
3. Documentation will be automatically extracted and formatted

---

*This documentation is automatically generated from JSDoc comments in your components.*
