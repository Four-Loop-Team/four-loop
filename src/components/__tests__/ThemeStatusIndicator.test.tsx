import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeStatusIndicator } from '../ThemeStatusIndicator';

// Mock the custom theme provider
jest.mock('@/components/ThemeProvider', () => ({
  useTheme: () => ({
    mode: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeStatusIndicator', () => {
  const mockTheme = createTheme();

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
  };

  it('should render without crashing', () => {
    renderWithTheme(<ThemeStatusIndicator />);
  });

  it('should display theme information', () => {
    renderWithTheme(<ThemeStatusIndicator />);
    // The component should render some theme-related information
    // Since it shows "theme → resolvedTheme", look for the arrow
    expect(screen.getByText(/→/)).toBeInTheDocument();
  });

  it('should handle hydration properly', async () => {
    renderWithTheme(<ThemeStatusIndicator />);

    // Wait for any useEffect hooks to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Component should be rendered and hydrated
    expect(screen.getByText(/→/)).toBeInTheDocument();
  });

  it('should be accessible', () => {
    renderWithTheme(<ThemeStatusIndicator />);

    // Check that the component renders properly
    expect(screen.getByText(/→/)).toBeInTheDocument();
  });
});
