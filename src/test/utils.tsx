// Testing utilities for component and integration tests
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ReactElement } from 'react';

// Create a test theme for consistent styling in tests
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

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={testTheme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Test data factories for consistent test data
export const createTestUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export const createTestContact = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Test message',
  ...overrides,
});

// Mock handlers for common scenarios
export const mockHandlers = {
  click: jest.fn(),
  submit: jest.fn(),
  change: jest.fn(),
  focus: jest.fn(),
  blur: jest.fn(),
};

// Performance testing utilities
export const measurePerformance = (callback: () => void) => {
  const start = performance.now();
  callback();
  const end = performance.now();
  return end - start;
};

// Accessibility testing utilities
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
export { customRender as render };
export { customRender as renderWithTheme };
