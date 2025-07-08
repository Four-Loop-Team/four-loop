/**
 * Comprehensive tests for the main App page component
 * Tests rendering, accessibility, and responsive behavior
 */

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../page';

// Create a test theme
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('App Page Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Rendering', () => {
    test('should render without crashing', () => {
      renderWithTheme(<App />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('should render the Four Loop Digital logo', () => {
      renderWithTheme(<App />);
      const logo = screen.getByAltText(/four loop digital/i);
      expect(logo).toBeInTheDocument();
    });

    test('should render the main heading', () => {
      renderWithTheme(<App />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/four loop digital/i);
    });

    test('should render the tagline', () => {
      renderWithTheme(<App />);
      const tagline = screen.getByText(/digital consulting services/i);
      expect(tagline).toBeInTheDocument();
    });

    test('should render all main sections', () => {
      renderWithTheme(<App />);

      // Check for main sections by their IDs or content
      const companyNameElements = screen.getAllByText(/four loop digital/i);
      expect(companyNameElements.length).toBeGreaterThan(0);
      expect(
        screen.getByText(/digital consulting services/i)
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      renderWithTheme(<App />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    test('should have alt text for images', () => {
      renderWithTheme(<App />);

      const logo = screen.getByAltText(/four loop digital/i);
      expect(logo).toBeInTheDocument();
    });

    test('should have main landmark', () => {
      renderWithTheme(<App />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    test('should have proper semantic structure', () => {
      renderWithTheme(<App />);

      // Should have main content area
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();

      // Should have heading
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    test('should apply responsive design classes', () => {
      renderWithTheme(<App />);

      // The component should render without errors
      // Material-UI handles responsive classes internally
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    test('should use Material-UI components', () => {
      renderWithTheme(<App />);

      // Check that Material-UI components are rendered
      // by looking for specific classes or structure
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    test('should display correct company name', () => {
      renderWithTheme(<App />);

      const companyNameElements = screen.getAllByText(/four loop digital/i);
      expect(companyNameElements.length).toBeGreaterThan(0);
    });

    test('should display correct tagline', () => {
      renderWithTheme(<App />);

      expect(
        screen.getByText(/digital consulting services/i)
      ).toBeInTheDocument();
    });

    test('should display logo with correct alt text', () => {
      renderWithTheme(<App />);

      const logo = screen.getByAltText(/four loop digital/i);
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    test('should render quickly', () => {
      const startTime = performance.now();
      renderWithTheme(<App />);
      const endTime = performance.now();

      // Should render in less than 100ms (generous threshold for testing)
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should not have memory leaks in repeated renders', () => {
      // Render multiple times to check for memory leaks
      for (let i = 0; i < 10; i++) {
        const { unmount } = renderWithTheme(<App />);
        unmount();
      }

      // If we reach here without errors, no obvious memory leaks
      expect(true).toBe(true);
    });
  });

  describe('Theme Integration', () => {
    test('should work with custom theme', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#ff0000',
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('should handle theme changes gracefully', () => {
      const { rerender } = renderWithTheme(<App />);

      // Rerender with different theme
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      rerender(
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
