import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

// Mock the components that have complex implementations
jest.mock('@/components/layout', () => ({
  Navigation: () => <nav data-testid='navigation'>Navigation</nav>,
  SkipNavigationLink: () => <a data-testid='skip-link'>Skip to content</a>,
}));

jest.mock('@/components/system', () => ({
  BrandThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='brand-theme-provider'>{children}</div>
  ),
}));

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='theme-provider'>{children}</div>
  ),
}));

jest.mock('@/lib/metadata', () => ({
  homeMetadata: {
    title: 'Test App',
    description: 'Test Description',
  },
}));

jest.mock('@/lib/structured-data', () => ({
  generateOrganizationSchema: jest.fn(() => ({ '@type': 'Organization' })),
  generateWebSiteSchema: jest.fn(() => ({ '@type': 'WebSite' })),
  renderStructuredData: jest.fn(
    () => '<script type="application/ld+json"></script>'
  ),
}));

// Mock the global SCSS import
jest.mock('../ui/styles/_global.scss', () => ({}));

describe('RootLayout', () => {
  it('should render children within the layout structure', () => {
    const testContent = <div data-testid='test-content'>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check that the basic structure is rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('skip-link')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('should have proper HTML structure', () => {
    const testContent = <div>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // The html element should have lang attribute
    const htmlElement = document.documentElement;
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });

  it('should render with Poppins font class', () => {
    const testContent = <div>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check if the font class is applied to body
    const bodyElement = document.body;
    expect(bodyElement.className).toContain('antialiased');
    // The poppins.variable generates a dynamic class name, so we check if it exists
    expect(bodyElement.className.length).toBeGreaterThan(0);
  });

  it('should include favicon links in head', () => {
    const testContent = <div>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check for favicon links
    const appleTouchIcon = document.querySelector(
      'link[rel="apple-touch-icon"]'
    );
    expect(appleTouchIcon).toBeInTheDocument();
    expect(appleTouchIcon).toHaveAttribute('sizes', '180x180');
    expect(appleTouchIcon).toHaveAttribute('href', '/apple-touch-icon.png');

    const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
    expect(favicon32).toBeInTheDocument();
    expect(favicon32).toHaveAttribute('href', '/favicon-32x32.png');

    const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
    expect(favicon16).toBeInTheDocument();
    expect(favicon16).toHaveAttribute('href', '/favicon-16x16.png');
  });

  it('should include manifest and other meta tags', () => {
    const testContent = <div>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check for manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    expect(manifestLink).toBeInTheDocument();
    expect(manifestLink).toHaveAttribute('href', '/site.webmanifest');

    // Check for mask icon
    const maskIcon = document.querySelector('link[rel="mask-icon"]');
    expect(maskIcon).toBeInTheDocument();
    expect(maskIcon).toHaveAttribute('href', '/safari-pinned-tab.svg');
  });

  it('should include structured data scripts', () => {
    const testContent = <div>Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check if structured data functions were called
    const structuredDataModule = require('@/lib/structured-data') as {
      generateOrganizationSchema: jest.Mock;
      generateWebSiteSchema: jest.Mock;
    };
    expect(structuredDataModule.generateOrganizationSchema).toHaveBeenCalled();
    expect(structuredDataModule.generateWebSiteSchema).toHaveBeenCalled();
  });

  it('should render main content within main tag', () => {
    const testContent = <div data-testid='main-content'>Main Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check that content is within main tag
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toContainElement(screen.getByTestId('main-content'));
  });

  it('should have proper accessibility structure', () => {
    const testContent = <div>Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    // Check for skip link (accessibility)
    expect(screen.getByTestId('skip-link')).toBeInTheDocument();

    // Check for navigation landmark
    expect(screen.getByTestId('navigation')).toBeInTheDocument();

    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
