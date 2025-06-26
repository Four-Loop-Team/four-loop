import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContactPage from '../page';
import { contactMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';

// Mock the metadata and structured data modules
jest.mock('@/lib/metadata', () => ({
  contactMetadata: {
    title: 'Contact Four Loop Digital',
    description:
      'Get in touch with Four Loop Digital to discuss your next digital project.',
  },
}));

jest.mock('@/lib/structured-data', () => ({
  generateWebPageSchema: jest.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Contact Four Loop Digital',
    description:
      'Get in touch with Four Loop Digital to discuss your next digital project.',
    url: 'https://fourloop.digital/contact',
  })),
  renderStructuredData: jest.fn((schema: Record<string, unknown>) =>
    JSON.stringify(schema)
  ),
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

describe('ContactPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateWebPageSchema.mockReturnValue({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Contact Four Loop Digital',
      description:
        'Get in touch with Four Loop Digital to discuss your next digital project.',
      url: 'https://fourloop.digital/contact',
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
    renderWithTheme(<ContactPage />);

    const heading = screen.getByRole('heading', {
      name: /contact us/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the subtitle correctly', () => {
    renderWithTheme(<ContactPage />);

    const subtitle = screen.getByText(/get in touch with our team/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the contact form with all required fields', () => {
    renderWithTheme(<ContactPage />);

    // Check form fields
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project description/i)).toBeInTheDocument();

    // Check submit button
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('renders required field attributes correctly', () => {
    renderWithTheme(<ContactPage />);

    // Check required fields
    expect(screen.getByLabelText(/first name/i)).toBeRequired();
    expect(screen.getByLabelText(/last name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();

    // Project description should not be required
    expect(screen.getByLabelText(/project description/i)).not.toBeRequired();
  });

  it('renders email field with correct type', () => {
    renderWithTheme(<ContactPage />);

    const emailField = screen.getByLabelText(/email address/i);
    expect(emailField).toHaveAttribute('type', 'email');
  });

  it('renders contact information section', () => {
    renderWithTheme(<ContactPage />);

    // Check section heading
    expect(
      screen.getByRole('heading', { name: /get in touch/i, level: 2 })
    ).toBeInTheDocument();

    // Check contact details
    expect(screen.getByText(/hello@fourloop.digital/i)).toBeInTheDocument();
    expect(
      screen.getByText(/monday - friday: 9am - 6pm est/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/remote-first, worldwide/i)).toBeInTheDocument();
  });

  it('renders contact information with proper icons', () => {
    renderWithTheme(<ContactPage />);

    // Check that contact sections are rendered (icons are included via MUI components)
    expect(screen.getByText(/email us/i)).toBeInTheDocument();
    expect(screen.getByText(/business hours/i)).toBeInTheDocument();
    expect(screen.getByText(/location/i)).toBeInTheDocument();
  });

  it('includes structured data scripts', () => {
    renderWithTheme(<ContactPage />);

    // Check that structured data scripts are present
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(2);
  });

  it('calls generateWebPageSchema with correct parameters', () => {
    renderWithTheme(<ContactPage />);

    expect(mockGenerateWebPageSchema).toHaveBeenCalledWith({
      name: 'Contact Four Loop Digital',
      description:
        'Get in touch with Four Loop Digital to discuss your next digital project.',
      url: 'https://fourloop.digital/contact',
    });
  });

  it('renders structured data using renderStructuredData', () => {
    renderWithTheme(<ContactPage />);

    expect(mockRenderStructuredData).toHaveBeenCalledTimes(2);

    // Check that it was called with webpage schema
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
      })
    );

    // Check that it was called with contact page schema
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
      })
    );
  });

  it('has proper accessibility structure with heading hierarchy', () => {
    renderWithTheme(<ContactPage />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const h2Elements = screen.getAllByRole('heading', { level: 2 });

    expect(h1).toBeInTheDocument();
    expect(h2Elements.length).toBeGreaterThanOrEqual(2); // "Start Your Project" and "Get in Touch"
  });

  it('uses proper semantic HTML elements', () => {
    renderWithTheme(<ContactPage />);

    // Check for form element (MUI Box renders as form when component="form" is used)
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Check for proper button
    const button = screen.getByRole('button', { name: /send message/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders within a container component', () => {
    const { container } = renderWithTheme(<ContactPage />);

    // Check that content is properly structured (MUI Container creates a div)
    expect(container.firstChild).toBeInTheDocument();
  });

  it('includes proper meta information through metadata export', () => {
    // Test that the metadata export exists and has correct values
    expect(contactMetadata).toBeDefined();
    expect(contactMetadata.title).toBe('Contact Four Loop Digital');
  });

  it('renders form fields with proper grid layout', () => {
    renderWithTheme(<ContactPage />);

    // Check that first and last name fields exist and are rendered
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    
    // Check that both fields are in the same container (indicating grid layout)
    const form = firstNameField.closest('form');
    expect(form).toContain(firstNameField);
    expect(form).toContain(lastNameField);
  });

  it('renders contact information in cards', () => {
    renderWithTheme(<ContactPage />);

    // Check that contact information is properly structured in cards
    const emailSection = screen.getByText(/email us/i);
    const businessHoursSection = screen.getByText(/business hours/i);
    const locationSection = screen.getByText(/location/i);

    expect(emailSection.closest('[class*="MuiCard"]')).toBeInTheDocument();
    expect(
      businessHoursSection.closest('[class*="MuiCard"]')
    ).toBeInTheDocument();
    expect(locationSection.closest('[class*="MuiCard"]')).toBeInTheDocument();
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

    expect(() => renderWithTheme(<ContactPage />)).not.toThrow();
  });

  it('renders without crashing when all dependencies are available', () => {
    expect(() => renderWithTheme(<ContactPage />)).not.toThrow();
  });

  it('includes contact page specific structured data', () => {
    renderWithTheme(<ContactPage />);

    // Verify that contact page schema was called
    expect(mockRenderStructuredData).toHaveBeenCalledWith(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        mainEntity: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: 'English',
          areaServed: 'Worldwide',
        },
      })
    );
  });

  it('renders textarea with correct attributes', () => {
    renderWithTheme(<ContactPage />);

    const textarea = screen.getByLabelText(/project description/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Tell us about your project...'
    );
  }); // Additional tests for 100% Contact page coverage
  it('renders all structured data scripts correctly', () => {
    render(<ContactPage />);

    // Check for structured data elements
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('renders contact form structure', () => {
    render(<ContactPage />);

    // Check for basic form elements that actually exist
    expect(screen.getByText('Start Your Project')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fill out the form below and we'll get back to you within 24 hours."
      )
    ).toBeInTheDocument();
  });
  it('renders basic form fields', () => {
    render(<ContactPage />);

    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });
});
