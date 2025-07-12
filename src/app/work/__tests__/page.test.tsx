import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import WorkPage from '../page';

// Create a test theme
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('WorkPage', () => {
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

  test('renders without crashing', () => {
    renderWithTheme(<WorkPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders the main tagline', () => {
    renderWithTheme(<WorkPage />);
    const tagline = screen.getByText(
      /crafted code.*thoughtful design.*real results/i
    );
    expect(tagline).toBeInTheDocument();
  });

  test('renders the Four Loop Digital logo', () => {
    renderWithTheme(<WorkPage />);
    const logo = screen.getByAltText(/four loop digital/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    renderWithTheme(<WorkPage />);

    // Check for main sections by their content
    expect(
      screen.getByText(/crafted code.*thoughtful design.*real results/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /^Partners$/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    renderWithTheme(<WorkPage />);

    // Should have main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Should have tagline text
    const tagline = screen.getByText(
      /crafted code.*thoughtful design.*real results/i
    );
    expect(tagline).toBeInTheDocument();
  });

  test('displays company description', () => {
    renderWithTheme(<WorkPage />);

    expect(
      screen.getByText(
        /At Four Loop Digital, we believe in building better brands/i
      )
    ).toBeInTheDocument();
  });
});
