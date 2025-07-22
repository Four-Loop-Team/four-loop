import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutPage, * as pageModule from '../page';

// Mock the metadata utilities
jest.mock('@/lib/metadata', () => ({
  aboutMetadata: {
    title: 'About Four Loop Digital',
    description:
      'Learn about Four Loop Digital and our commitment to exceptional digital experiences.',
  },
}));

const mockGenerateWebPageSchema = generateWebPageSchema as jest.MockedFunction<
  typeof generateWebPageSchema
>;
const mockRenderStructuredData = renderStructuredData as jest.MockedFunction<
  typeof renderStructuredData
>;

jest.mock('@/lib/structured-data', () => ({
  generateWebPageSchema: jest.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About Four Loop Digital',
    description:
      "Learn about Four Loop Digital's mission, team, and commitment to delivering exceptional digital experiences.",
    url: 'https://fourloop.digital/about',
  })),
  renderStructuredData: jest.fn((schema) => JSON.stringify(schema)),
}));

// Mock MUI components to avoid theme provider requirements in tests
jest.mock('@mui/material', () => ({
  Container: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='container' {...props}>
      {children}
    </div>
  ),
  Typography: ({
    children,
    variant,
    component,
    ...props
  }: {
    children: React.ReactNode;
    variant?: string;
    component?: string;
    [key: string]: unknown;
  }) => {
    const Component = component ?? 'div';
    return React.createElement(
      Component,
      { 'data-testid': `typography-${variant}`, ...props },
      children
    );
  },
  Box: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='box' {...props}>
      {children}
    </div>
  ),
}));

describe('AboutPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading correctly', () => {
    render(<AboutPage />);

    const heading = screen.getByTestId('typography-h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Us');
  });

  it('renders the subtitle correctly', () => {
    render(<AboutPage />);

    const subtitle = screen.getByTestId('typography-h6');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      'Learn more about Four Loop Digital and our mission to deliver exceptional digital experiences.'
    );
  });

  it('renders within a container component', () => {
    render(<AboutPage />);

    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
  });

  it('includes structured data script', () => {
    const { container } = render(<AboutPage />);

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(scriptTag).toBeInTheDocument();

    if (scriptTag) {
      const scriptContent = scriptTag.innerHTML;
      const parsedContent = JSON.parse(scriptContent) as {
        '@context': string;
        '@type': string;
        name: string;
        url: string;
      };

      expect(parsedContent['@context']).toBe('https://schema.org');
      expect(parsedContent['@type']).toBe('WebPage');
      expect(parsedContent.name).toBe('About Four Loop Digital');
      expect(parsedContent.url).toBe('https://fourloop.digital/about');
    }
  });

  it('calls generateWebPageSchema with correct parameters', () => {
    render(<AboutPage />);

    expect(mockGenerateWebPageSchema).toHaveBeenCalledWith({
      name: 'About Four Loop Digital',
      description:
        "Learn about Four Loop Digital's mission, team, and commitment to delivering exceptional digital experiences.",
      url: 'https://fourloop.digital/about',
    });
  });

  it('renders structured data using renderStructuredData', () => {
    render(<AboutPage />);

    expect(mockRenderStructuredData).toHaveBeenCalled();
  });

  it('has proper accessibility structure with heading hierarchy', () => {
    render(<AboutPage />);

    const h1 = screen.getByTestId('typography-h1');
    const h6 = screen.getByTestId('typography-h6');

    expect(h1).toBeInTheDocument();
    expect(h6).toBeInTheDocument();

    // Verify the heading appears before the subtitle in DOM order
    const allElements = screen.getAllByTestId(/typography-/);
    expect(allElements[0]).toBe(h1);
    expect(allElements[1]).toBe(h6);
  });

  it('uses proper semantic HTML elements', () => {
    render(<AboutPage />);

    const heading = screen.getByTestId('typography-h1');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  });

  it('centers content using Box component', () => {
    render(<AboutPage />);

    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();
  });

  it('includes proper meta information through metadata export', () => {
    // This test verifies the metadata export exists
    expect(pageModule.metadata).toBeDefined();
  });

  it('handles missing structured data gracefully', () => {
    mockGenerateWebPageSchema.mockReturnValueOnce({
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

    // Should not throw an error even if structured data is minimal
    expect(() => render(<AboutPage />)).not.toThrow();
  });

  it('renders without crashing when all dependencies are available', () => {
    const { container } = render(<AboutPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
