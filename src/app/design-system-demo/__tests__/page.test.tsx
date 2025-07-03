import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import DesignSystemDemoPage from '../page';

// Mock the ThemeProvider
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-testid='theme-provider'>{children}</div>
);

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: MockThemeProvider,
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => {
  return (importFn: () => Promise<{ default: React.ComponentType }>) => {
    // Return a mock component for dynamic imports
    const MockComponent = () => (
      <div data-testid='dynamic-component'>Dynamic Component</div>
    );
    return MockComponent;
  };
});

// Mock the DesignSystemShowcase component
jest.mock('@/components/DesignSystemShowcase', () => ({
  DesignSystemShowcase: () => (
    <div data-testid='design-system-showcase'>Design System Showcase</div>
  ),
}));

// Mock ThemeStatusIndicator
jest.mock('@/components/ThemeStatusIndicator', () => ({
  ThemeStatusIndicator: () => (
    <div data-testid='theme-status'>Theme Status</div>
  ),
}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Box: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
  Container: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
  Typography: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} {...(props as Record<string, unknown>)}>
      {children}
    </button>
  ),
}));

describe('DesignSystemDemoPage', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<div data-testid='theme-provider'>{ui}</div>);
  };

  it('should render the page without crashing', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Design System Demo')).toBeInTheDocument();
  });

  it('should display the main heading', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Design System Demo')).toBeInTheDocument();
  });

  it('should display theme controls', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Theme:')).toBeInTheDocument();
  });

  it('should render theme controls section', async () => {
    renderWithTheme(<DesignSystemDemoPage />);

    await waitFor(() => {
      expect(screen.getByText('Theme:')).toBeInTheDocument();
    });
  });

  it('should render design tokens section', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(
      screen.getByText('MUI + Design System Integration')
    ).toBeInTheDocument();
  });

  it('should render color palette', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Enhanced Color Palette')).toBeInTheDocument();
  });

  it('should render typography scale', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Typography Scale')).toBeInTheDocument();
  });

  it('should render spacing system', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Spacing System')).toBeInTheDocument();
  });

  it('should render component showcase', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByTestId('design-system-showcase')).toBeInTheDocument();
  });

  it('should render semantic colors section', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Semantic Colors')).toBeInTheDocument();
  });

  it('should display color scale', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('950')).toBeInTheDocument();
  });

  it('should display component spacing', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Component Spacing')).toBeInTheDocument();
  });

  it('should display typography examples', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText(/9XL.*The quick brown fox/)).toBeInTheDocument();
  });

  it('should render theme system demo', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Theme System Demo')).toBeInTheDocument();
  });

  it('should render dynamic theme elements', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Dynamic Theme Elements')).toBeInTheDocument();
  });

  it('should show theme switching tip', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(
      screen.getByText(/Try switching themes using the controls above/)
    ).toBeInTheDocument();
  });

  it('should render MUI components section', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('MUI Components')).toBeInTheDocument();
  });

  it('should render design system components section', () => {
    renderWithTheme(<DesignSystemDemoPage />);
    expect(screen.getByText('Design System Components')).toBeInTheDocument();
  });

  it('should have proper document structure', () => {
    renderWithTheme(<DesignSystemDemoPage />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByText('Design System Demo');
    expect(mainHeading).toBeInTheDocument();

    // Check for section headings
    expect(
      screen.getByText('MUI + Design System Integration')
    ).toBeInTheDocument();
    expect(screen.getByText('Enhanced Color Palette')).toBeInTheDocument();
    expect(screen.getByText('Typography Scale')).toBeInTheDocument();
    expect(screen.getByText('Spacing System')).toBeInTheDocument();
    expect(screen.getByText('Theme System Demo')).toBeInTheDocument();
  });
});
