/**
 * Testing utilities for component and integration tests
 * @fileoverview Common test utilities, providers, and helper functions for React Testing Library
 */

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Test theme configuration for consistent styling in tests
 * @constant
 */
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

/**
 * Test wrapper component that provides necessary providers
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Wrapped components with providers
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={testTheme}>{children}</ThemeProvider>;
};

/**
 * Custom render function that includes all necessary providers
 * Wraps React Testing Library's render with theme and other providers
 *
 * @param {ReactElement} ui - The component to render
 * @param {Omit<RenderOptions, 'wrapper'>} [options] - Additional render options
 * @returns {RenderResult} The result of the render function with all providers
 * @example
 * ```tsx
 * import { customRender } from '@/test/utils';
 *
 * test('renders button', () => {
 *   customRender(<Button>Click me</Button>);
 *   expect(screen.getByRole('button')).toBeInTheDocument();
 * });
 * ```
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * Test data factory for creating consistent user objects
 * @param {Object} [overrides={}] - Properties to override in the default user object
 * @returns {Object} Test user object with merged properties
 * @example
 * ```tsx
 * const user = createTestUser({ name: 'Jane Doe', age: 30 });
 * ```
 */
export const createTestUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

/**
 * Test data factory for creating consistent contact form objects
 * @param {Object} [overrides={}] - Properties to override in the default contact object
 * @returns {Object} Test contact object with merged properties
 * @example
 * ```tsx
 * const contact = createTestContact({ message: 'Custom message' });
 * ```
 */
export const createTestContact = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Test message',
  ...overrides,
});

/**
 * Mock event handlers for common test scenarios
 * Pre-configured Jest mock functions for consistent testing
 * @constant
 */
export const mockHandlers = {
  /** Mock click handler */
  click: jest.fn(),
  /** Mock form submit handler */
  submit: jest.fn(),
  /** Mock input change handler */
  change: jest.fn(),
  /** Mock focus event handler */
  focus: jest.fn(),
  /** Mock blur event handler */
  blur: jest.fn(),
};

/**
 * Performance measurement utility for testing
 * Measures execution time of a callback function
 *
 * @param {Function} callback - Function to measure performance for
 * @returns {number} Execution time in milliseconds
 * @example
 * ```tsx
 * const duration = measurePerformance(() => {
 *   // Code to measure
 *   heavyComputation();
 * });
 * expect(duration).toBeLessThan(100); // Should complete in under 100ms
 * ```
 */
export const measurePerformance = (callback: () => void) => {
  const start = performance.now();
  callback();
  const end = performance.now();
  return end - start;
};

/**
 * Accessibility testing configuration for axe-core
 * Excludes rules that might be flaky in test environments
 * @constant
 */
export const axeConfig = {
  rules: {
    // Exclude color contrast checks that might be flaky in tests
    'color-contrast': { enabled: false },
  },
};

// Responsive testing utilities
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};

export const setViewport = (viewport: keyof typeof viewports) => {
  const { width, height } = viewports[viewport];
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

// Export everything including the custom render
export * from '@testing-library/react';
export { customRender as render, customRender as renderWithTheme };
