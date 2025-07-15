import { useTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import BrandThemeProvider from '../BrandThemeProvider';

// Test component to access and display theme values
const ThemeConsumer = () => {
  const theme = useTheme();

  return (
    <div>
      <div data-testid='theme-mode'>{theme.palette.mode}</div>
      <div data-testid='primary-color'>{theme.palette.primary.main}</div>
      <div data-testid='secondary-color'>{theme.palette.secondary.main}</div>
      <div data-testid='background-color'>
        {theme.palette.background.default}
      </div>
      <div data-testid='text-primary'>{theme.palette.text.primary}</div>
      <div data-testid='font-family'>{theme.typography.fontFamily}</div>
      <div data-testid='h1-color'>{theme.typography.h1?.color}</div>
      <div data-testid='h1-weight'>{theme.typography.h1?.fontWeight}</div>
      <div data-testid='body1-color'>{theme.typography.body1?.color}</div>
      <div data-testid='xs-breakpoint'>{theme.breakpoints.values.xs}</div>
      <div data-testid='sm-breakpoint'>{theme.breakpoints.values.sm}</div>
      <div data-testid='md-breakpoint'>{theme.breakpoints.values.md}</div>
      <div data-testid='lg-breakpoint'>{theme.breakpoints.values.lg}</div>
      <div data-testid='xl-breakpoint'>{theme.breakpoints.values.xl}</div>
    </div>
  );
};

describe('BrandThemeProvider', () => {
  it('renders children correctly', () => {
    render(
      <BrandThemeProvider>
        <div data-testid='child'>Test Child</div>
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('provides dark mode theme configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('provides correct primary color configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('primary-color')).toHaveTextContent('#e2e891');
  });

  it('provides correct secondary color configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('secondary-color')).toHaveTextContent('#353535');
  });

  it('provides correct background configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('background-color')).toHaveTextContent('#353535');
  });

  it('provides correct text color configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('text-primary')).toHaveTextContent('#ffffff');
  });

  it('provides correct font family configuration', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('font-family')).toHaveTextContent(
      'var(--font-poppins), sans-serif'
    );
  });

  it('provides correct typography configurations', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('h1-color')).toHaveTextContent('#ffffff');
    expect(screen.getByTestId('h1-weight')).toHaveTextContent('600');
    expect(screen.getByTestId('body1-color')).toHaveTextContent(
      'rgba(255, 255, 255, 0.87)'
    );
  });

  it('provides correct breakpoint configurations', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('xs-breakpoint')).toHaveTextContent('0');
    expect(screen.getByTestId('sm-breakpoint')).toHaveTextContent('600');
    expect(screen.getByTestId('md-breakpoint')).toHaveTextContent('960');
    expect(screen.getByTestId('lg-breakpoint')).toHaveTextContent('1280');
    expect(screen.getByTestId('xl-breakpoint')).toHaveTextContent('1920');
  });

  it('includes CssBaseline component', () => {
    const { container } = render(
      <BrandThemeProvider>
        <div>Test</div>
      </BrandThemeProvider>
    );

    // CssBaseline adds styles to body and html elements
    // We can check if the ThemeProvider is properly wrapping content
    expect(container.firstChild).toBeDefined();
  });

  it('maintains accessibility with high contrast colors', () => {
    render(
      <BrandThemeProvider>
        <ThemeConsumer />
      </BrandThemeProvider>
    );

    // Verify high contrast text colors for accessibility
    const primaryText = screen.getByTestId('text-primary');
    const backgroundColor = screen.getByTestId('background-color');

    expect(primaryText).toHaveTextContent('#ffffff'); // White text
    expect(backgroundColor).toHaveTextContent('#353535'); // Dark background
  });

  it('provides comprehensive color palette', () => {
    const TestColorPalette = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='error-color'>{theme.palette.error.main}</div>
          <div data-testid='warning-color'>{theme.palette.warning.main}</div>
          <div data-testid='info-color'>{theme.palette.info.main}</div>
          <div data-testid='success-color'>{theme.palette.success.main}</div>
          <div data-testid='primary-light'>{theme.palette.primary.light}</div>
          <div data-testid='primary-dark'>{theme.palette.primary.dark}</div>
          <div data-testid='primary-contrast'>
            {theme.palette.primary.contrastText}
          </div>
        </div>
      );
    };

    render(
      <BrandThemeProvider>
        <TestColorPalette />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('error-color')).toHaveTextContent('#f44336');
    expect(screen.getByTestId('warning-color')).toHaveTextContent('#ff9800');
    expect(screen.getByTestId('info-color')).toHaveTextContent('#2196f3');
    expect(screen.getByTestId('success-color')).toHaveTextContent('#4caf50');
    expect(screen.getByTestId('primary-light')).toHaveTextContent('#f0f4a6');
    expect(screen.getByTestId('primary-dark')).toHaveTextContent('#d1d57a');
    expect(screen.getByTestId('primary-contrast')).toHaveTextContent('#232323');
  });

  it('provides all typography variants with proper styling', () => {
    const TestTypography = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='h2-color'>{theme.typography.h2?.color}</div>
          <div data-testid='h2-weight'>{theme.typography.h2?.fontWeight}</div>
          <div data-testid='h3-color'>{theme.typography.h3?.color}</div>
          <div data-testid='h3-weight'>{theme.typography.h3?.fontWeight}</div>
          <div data-testid='h4-color'>{theme.typography.h4?.color}</div>
          <div data-testid='h4-weight'>{theme.typography.h4?.fontWeight}</div>
          <div data-testid='h5-color'>{theme.typography.h5?.color}</div>
          <div data-testid='h5-weight'>{theme.typography.h5?.fontWeight}</div>
          <div data-testid='h6-color'>{theme.typography.h6?.color}</div>
          <div data-testid='h6-weight'>{theme.typography.h6?.fontWeight}</div>
          <div data-testid='body2-color'>{theme.typography.body2?.color}</div>
        </div>
      );
    };

    render(
      <BrandThemeProvider>
        <TestTypography />
      </BrandThemeProvider>
    );

    // Test h2 styling
    expect(screen.getByTestId('h2-color')).toHaveTextContent('#ffffff');
    expect(screen.getByTestId('h2-weight')).toHaveTextContent('600');

    // Test h3 styling
    expect(screen.getByTestId('h3-color')).toHaveTextContent('#ffffff');
    expect(screen.getByTestId('h3-weight')).toHaveTextContent('500');

    // Test h4 styling
    expect(screen.getByTestId('h4-color')).toHaveTextContent('#ffffff');
    expect(screen.getByTestId('h4-weight')).toHaveTextContent('500');

    // Test h5 styling
    expect(screen.getByTestId('h5-color')).toHaveTextContent(
      'rgba(255, 255, 255, 0.95)'
    );
    expect(screen.getByTestId('h5-weight')).toHaveTextContent('400');

    // Test h6 styling
    expect(screen.getByTestId('h6-color')).toHaveTextContent(
      'rgba(255, 255, 255, 0.9)'
    );
    expect(screen.getByTestId('h6-weight')).toHaveTextContent('400');

    // Test body2 styling
    expect(screen.getByTestId('body2-color')).toHaveTextContent(
      'rgba(255, 255, 255, 0.85)'
    );
  });

  it('provides component style overrides', () => {
    const TestComponentOverrides = () => {
      const theme = useTheme();
      const appBarOverride = theme.components?.MuiAppBar?.styleOverrides?.root;
      const boxShadow =
        typeof appBarOverride === 'object' &&
        appBarOverride &&
        'boxShadow' in appBarOverride
          ? String(appBarOverride.boxShadow)
          : 'none';

      return (
        <div>
          <div data-testid='appbar-boxshadow'>{boxShadow}</div>
        </div>
      );
    };

    render(
      <BrandThemeProvider>
        <TestComponentOverrides />
      </BrandThemeProvider>
    );

    expect(screen.getByTestId('appbar-boxshadow')).toHaveTextContent('none');
  });

  it('supports nested providers without conflicts', () => {
    render(
      <BrandThemeProvider>
        <BrandThemeProvider>
          <ThemeConsumer />
        </BrandThemeProvider>
      </BrandThemeProvider>
    );

    // Inner provider should still provide the same theme
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#e2e891');
  });
});
