import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WorkPage from '../page';
import { workMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
  webDevelopmentServiceSchema,
  mobileAppServiceSchema,
  digitalConsultingServiceSchema,
} from '@/lib/structured-data';

// Mock the metadata and structured data modules
jest.mock('@/lib/metadata', () => ({
  workMetadata: {
    title: 'Our Work - Four Loop Digital Portfolio',
    description:
      "Explore Four Loop Digital's portfolio of successful projects and client success stories.",
  },
}));

jest.mock('@/lib/structured-data', () => ({
  generateWebPageSchema: jest.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Our Work - Four Loop Digital Portfolio',
    description:
      "Explore Four Loop Digital's portfolio of successful projects and client success stories.",
    url: 'https://fourloop.digital/work',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Four Loop Digital',
      url: 'https://fourloop.digital',
    },
  })),
  renderStructuredData: jest.fn((schema: object) => JSON.stringify(schema)),
  webDevelopmentServiceSchema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Development',
  },
  mobileAppServiceSchema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile App Development',
  },
  digitalConsultingServiceSchema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Consulting',
  },
}));

// Get the mocked functions
const mockGenerateWebPageSchema = generateWebPageSchema as jest.MockedFunction<
  typeof generateWebPageSchema
>;
const mockRenderStructuredData = renderStructuredData as jest.MockedFunction<
  typeof renderStructuredData
>;

// Create a test theme
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('WorkPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateWebPageSchema.mockReturnValue({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Our Work - Four Loop Digital Portfolio',
      description:
        "Explore Four Loop Digital's portfolio of successful projects and client success stories.",
      url: 'https://fourloop.digital/work',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Four Loop Digital',
        url: 'https://fourloop.digital',
      },
    });
    mockRenderStructuredData.mockImplementation((schema: object) =>
      JSON.stringify(schema)
    );
  });

  it('renders the main heading correctly', () => {
    renderWithTheme(<WorkPage />);

    const heading = screen.getByRole('heading', {
      name: /our work & services/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the subtitle correctly', () => {
    renderWithTheme(<WorkPage />);

    const subtitle = screen.getByText(
      /discover our portfolio of digital solutions/i
    );
    expect(subtitle).toBeInTheDocument();
  });

  it('renders web development service card', () => {
    renderWithTheme(<WorkPage />);

    expect(screen.getByText(/web development/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /custom web applications built with modern technologies/i
      )
    ).toBeInTheDocument();
  });

  it('renders mobile app development service card', () => {
    renderWithTheme(<WorkPage />);

    expect(screen.getByText(/mobile app development/i)).toBeInTheDocument();
    expect(
      screen.getByText(/native and cross-platform mobile applications/i)
    ).toBeInTheDocument();
  });

  it('renders digital consulting service card', () => {
    renderWithTheme(<WorkPage />);

    expect(screen.getByText(/digital consulting/i)).toBeInTheDocument();
    expect(
      screen.getByText(/strategic digital transformation consulting/i)
    ).toBeInTheDocument();
  });

  it('renders development process section', () => {
    renderWithTheme(<WorkPage />);

    expect(
      screen.getByRole('heading', {
        name: /our development process/i,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it('renders service descriptions and features', () => {
    renderWithTheme(<WorkPage />);

    // Check for service-related content that actually exists
    expect(
      screen.getByText(/progressive web applications/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/server-side rendering/i)).toBeInTheDocument();
    expect(screen.getByText(/api development/i)).toBeInTheDocument();
  });

  it('renders technology chips for services', () => {
    renderWithTheme(<WorkPage />);

    // Check for common technologies that should be mentioned in chips
    const reactChips = screen.getAllByText(/^react$/i);
    expect(reactChips.length).toBeGreaterThan(0);

    expect(screen.getByText(/^next\.js$/i)).toBeInTheDocument();
    expect(screen.getByText(/^node\.js$/i)).toBeInTheDocument();
  });

  it('includes structured data scripts', () => {
    renderWithTheme(<WorkPage />);

    // Check that structured data scripts are present
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(4); // WebPage + 3 services
  });

  it('calls generateWebPageSchema with correct parameters', () => {
    renderWithTheme(<WorkPage />);

    expect(mockGenerateWebPageSchema).toHaveBeenCalledWith({
      name: 'Our Work - Four Loop Digital Portfolio',
      description:
        "Explore Four Loop Digital's portfolio of successful projects and client success stories.",
      url: 'https://fourloop.digital/work',
    });
  });

  it('renders structured data using renderStructuredData', () => {
    renderWithTheme(<WorkPage />);

    expect(mockRenderStructuredData).toHaveBeenCalledTimes(4);

    // Check that it was called with webpage schema
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
      })
    );

    // Check that service schemas were rendered
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'Service',
      })
    );
  });

  it('has proper accessibility structure with heading hierarchy', () => {
    renderWithTheme(<WorkPage />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    const h3Elements = screen.getAllByRole('heading', { level: 3 });

    expect(h1).toBeInTheDocument();
    expect(h2Elements.length).toBeGreaterThanOrEqual(2); // "Our Services" and "Featured Projects"
    expect(h3Elements.length).toBeGreaterThanOrEqual(3); // Service cards
  });

  it('renders within a container component', () => {
    const { container } = renderWithTheme(<WorkPage />);

    // Check that content is properly structured (MUI Container creates a div)
    expect(container.firstChild).toBeInTheDocument();
  });

  it('includes proper meta information through metadata export', () => {
    // Test that the metadata export exists and has correct values
    expect(workMetadata).toBeDefined();
    expect(workMetadata.title).toBe('Our Work - Four Loop Digital Portfolio');
  });

  it('renders service cards in grid layout', () => {
    renderWithTheme(<WorkPage />);

    // Check that service cards are properly structured (these are h2, not h3)
    const webDevCard = screen.getByRole('heading', {
      name: /web development/i,
      level: 2,
    });
    const mobileCard = screen.getByRole('heading', {
      name: /mobile app development/i,
      level: 2,
    });
    const consultingCard = screen.getByRole('heading', {
      name: /digital consulting/i,
      level: 2,
    });

    expect(webDevCard.closest('[class*="MuiCard"]')).toBeInTheDocument();
    expect(mobileCard.closest('[class*="MuiCard"]')).toBeInTheDocument();
    expect(consultingCard.closest('[class*="MuiCard"]')).toBeInTheDocument();
  });

  it('renders development process steps with proper structure', () => {
    renderWithTheme(<WorkPage />);

    // Check that development process steps are properly structured
    expect(screen.getByText(/discovery & planning/i)).toBeInTheDocument();
    expect(screen.getByText(/design & architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/development & testing/i)).toBeInTheDocument();
    expect(screen.getByText(/deployment & support/i)).toBeInTheDocument();
  });

  it('renders call-to-action section', () => {
    renderWithTheme(<WorkPage />);

    // Check for CTA section
    expect(
      screen.getByText(/ready to start your project/i)
    ).toBeInTheDocument();
  });

  it('handles missing structured data gracefully', () => {
    mockGenerateWebPageSchema.mockReturnValue({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '',
      description: '',
      url: '',
      isPartOf: {
        '@type': 'WebSite',
        name: '',
        url: '',
      },
    });

    expect(() => renderWithTheme(<WorkPage />)).not.toThrow();
  });

  it('renders without crashing when all dependencies are available', () => {
    expect(() => renderWithTheme(<WorkPage />)).not.toThrow();
  });

  it('includes service-specific structured data', () => {
    renderWithTheme(<WorkPage />);

    // Verify that all service schemas were called
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Web Development',
      })
    );

    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Mobile App Development',
      })
    );

    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Digital Consulting',
      })
    );
  });

  it('renders technology tags with proper chip components', () => {
    renderWithTheme(<WorkPage />);

    // Check that technology chips are rendered with MUI Chip component
    // Use more specific selectors to avoid multiple matches
    const reactChips = screen.getAllByText(/^react$/i);
    expect(reactChips[0].closest('[class*="MuiChip"]')).toBeInTheDocument();

    const nextjsChip = screen.getByText(/^next\.js$/i);
    expect(nextjsChip.closest('[class*="MuiChip"]')).toBeInTheDocument();

    const nodejsChip = screen.getByText(/^node\.js$/i);
    expect(nodejsChip.closest('[class*="MuiChip"]')).toBeInTheDocument();
  }); // Additional tests for 100% Work page coverage
  it('renders all structured data scripts correctly', () => {
    render(<WorkPage />);

    // Check for multiple structured data scripts
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('renders service technologies and features', () => {
    render(<WorkPage />);

    // Check for specific technologies that exist in the page
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Vercel')).toBeInTheDocument();
  });

  it('renders main service category', () => {
    render(<WorkPage />);

    // Test the main service section that actually exists
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(
      screen.getByText(/Custom web applications built with modern technologies/)
    ).toBeInTheDocument();
  });

  it('renders hero section content', () => {
    render(<WorkPage />);

    expect(screen.getByText('Our Work & Services')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Discover our portfolio of digital solutions and client success stories.'
      )
    ).toBeInTheDocument();
  });
});
