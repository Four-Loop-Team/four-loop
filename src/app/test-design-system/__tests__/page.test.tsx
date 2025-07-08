import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DesignSystemTestPage from '../page';

// Mock the design system constants
jest.mock('@/constants/design-system', () => ({
  DESIGN_SYSTEM: {
    spacing: {
      scale: {
        4: '1rem',
        8: '2rem',
      },
    },
    colors: {
      brand: {
        primary: {
          600: '#1976d2',
        },
      },
      semantic: {
        success: {
          500: '#4caf50',
        },
        warning: {
          500: '#ff9800',
        },
        error: {
          500: '#f44336',
        },
      },
    },
    typography: {
      sizes: {
        base: '1rem',
        lg: '1.125rem',
        '3xl': '1.875rem',
      },
      weights: {
        normal: 400,
        bold: 700,
      },
    },
  },
}));

describe('DesignSystemTestPage', () => {
  it('should render without crashing', () => {
    render(<DesignSystemTestPage />);
    expect(screen.getByText('✅ Design System Working!')).toBeInTheDocument();
  });

  it('should display the main heading', () => {
    render(<DesignSystemTestPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '✅ Design System Working!'
    );
  });

  it('should display success message', () => {
    render(<DesignSystemTestPage />);
    expect(
      screen.getByText(/All design tokens are loaded and working correctly/)
    ).toBeInTheDocument();
  });

  it('should display color examples', () => {
    render(<DesignSystemTestPage />);
    expect(screen.getByText('Primary Color')).toBeInTheDocument();
    expect(screen.getByText('Success Color')).toBeInTheDocument();
    expect(screen.getByText('Warning Color')).toBeInTheDocument();
    expect(screen.getByText('Error Color')).toBeInTheDocument();
  });

  it('should display typography examples', () => {
    render(<DesignSystemTestPage />);
    expect(screen.getByText('Base Text')).toBeInTheDocument();
    expect(screen.getByText('Large Text')).toBeInTheDocument();
  });

  it('should display spacing examples', () => {
    render(<DesignSystemTestPage />);
    expect(screen.getByText('Spacing Test')).toBeInTheDocument();
  });

  it('should apply design system styles', () => {
    render(<DesignSystemTestPage />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({
      color: '#1976d2',
      fontSize: '1.875rem',
      fontWeight: '700',
    });
  });

  it('should display all color swatches', () => {
    render(<DesignSystemTestPage />);

    // Check for color swatch containers
    const colorSwatches = screen.getAllByText(/Color$/);
    expect(colorSwatches).toHaveLength(4); // Primary, Success, Warning, Error
  });

  it('should display typography scale', () => {
    render(<DesignSystemTestPage />);

    const baseText = screen.getByText('Base Text');
    const largeText = screen.getByText('Large Text');

    expect(baseText).toBeInTheDocument();
    expect(largeText).toBeInTheDocument();
  });

  it('should have proper document structure', () => {
    render(<DesignSystemTestPage />);

    // Check for main container
    const container = screen
      .getByText('✅ Design System Working!')
      .closest('div');
    expect(container).toBeInTheDocument();

    // Check for sections
    expect(screen.getByText('Colors:')).toBeInTheDocument();
    expect(screen.getByText('Typography:')).toBeInTheDocument();
    expect(screen.getByText('Spacing:')).toBeInTheDocument();
  });
});
