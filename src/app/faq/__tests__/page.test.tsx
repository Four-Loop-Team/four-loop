import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQPage, { metadata as faqMetadata } from '../page';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import * as structuredDataLib from '@/lib/structured-data';

// Mock the metadata and structured data modules
jest.mock('@/lib/metadata', () => ({
  generateMetadata: jest.fn(() => ({
    title: 'Frequently Asked Questions',
    description:
      "Find answers to common questions about Four Loop Digital's services, development process, pricing, and project timelines.",
  })),
}));

jest.mock('@/lib/structured-data', () => ({
  generateWebPageSchema: jest.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FAQ - Four Loop Digital',
  })),
  renderStructuredData: jest.fn((data) => JSON.stringify(data)),
}));

// Helper function to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('FAQPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading correctly', () => {
    renderWithTheme(<FAQPage />);

    expect(
      screen.getByRole('heading', {
        name: /frequently asked questions/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it('renders the subtitle correctly', () => {
    renderWithTheme(<FAQPage />);

    expect(
      screen.getByText(
        /find answers to common questions about our services and process/i
      )
    ).toBeInTheDocument();
  });

  it('renders the introductory description', () => {
    renderWithTheme(<FAQPage />);

    expect(
      screen.getByText(
        /get quick answers to the most frequently asked questions/i
      )
    ).toBeInTheDocument();
  });

  it('renders all FAQ accordions', () => {
    renderWithTheme(<FAQPage />);

    // Check for all FAQ questions
    expect(
      screen.getByText(/what services does four loop digital offer/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/how long does a typical project take/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what is your development process/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/do you provide ongoing support and maintenance/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what technologies do you work with/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/can you work with our existing team/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/how do you ensure project quality/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what makes four loop digital different/i)
    ).toBeInTheDocument();
  });

  it('renders FAQ accordions with proper structure', () => {
    renderWithTheme(<FAQPage />);

    // Check that accordions are properly structured
    const accordions = screen.getAllByRole('button', { expanded: false });
    expect(accordions).toHaveLength(8); // 8 FAQ questions

    // Check that each accordion has the proper ARIA attributes
    accordions.forEach((accordion, index) => {
      expect(accordion).toHaveAttribute(
        'aria-controls',
        `faq-content-${index}`
      );
      expect(accordion).toHaveAttribute('id', `faq-header-${index}`);
    });
  });

  it('expands and collapses FAQ accordions when clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    // Find the first FAQ accordion
    const firstAccordion = screen.getByRole('button', {
      name: /what services does four loop digital offer/i,
    });

    // Initially should be collapsed
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await user.click(firstAccordion);
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');

    // Check that the answer is now visible
    expect(
      screen.getByText(/four loop digital specializes in three core areas/i)
    ).toBeInTheDocument();

    // Click to collapse
    await user.click(firstAccordion);
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders specific FAQ content correctly', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    // Test services FAQ
    const servicesAccordion = screen.getByRole('button', {
      name: /what services does four loop digital offer/i,
    });
    await user.click(servicesAccordion);
    expect(
      screen.getByText(
        /web development.*mobile app development.*digital consulting/i
      )
    ).toBeInTheDocument();

    // Test technologies FAQ
    const techAccordion = screen.getByRole('button', {
      name: /what technologies do you work with/i,
    });
    await user.click(techAccordion);
    expect(
      screen.getByText(/react.*next\.js.*typescript.*node\.js/i)
    ).toBeInTheDocument();

    // Test development process FAQ
    const processAccordion = screen.getByRole('button', {
      name: /what is your development process/i,
    });
    await user.click(processAccordion);
    expect(
      screen.getByText(
        /discovery & planning.*design & architecture.*development & testing.*deployment & support/i
      )
    ).toBeInTheDocument();
  });

  it('renders project timeline information', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    const timelineAccordion = screen.getByRole('button', {
      name: /how long does a typical project take/i,
    });
    await user.click(timelineAccordion);

    expect(
      screen.getByText(/4-8 weeks.*8-16 weeks.*12-24 weeks/i)
    ).toBeInTheDocument();
  });

  it('renders quality assurance information', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    const qualityAccordion = screen.getByRole('button', {
      name: /how do you ensure project quality/i,
    });
    await user.click(qualityAccordion);

    expect(
      screen.getByText(/comprehensive testing.*code reviews.*automated ci\/cd/i)
    ).toBeInTheDocument();
  });

  it('renders team collaboration information', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    const teamAccordion = screen.getByRole('button', {
      name: /can you work with our existing team/i,
    });
    await user.click(teamAccordion);

    expect(
      screen.getByText(
        /integrate seamlessly.*technical leadership.*code reviews/i
      )
    ).toBeInTheDocument();
  });

  it('renders support and maintenance information', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    const supportAccordion = screen.getByRole('button', {
      name: /do you provide ongoing support and maintenance/i,
    });
    await user.click(supportAccordion);

    expect(
      screen.getByText(
        /comprehensive post-launch support.*bug fixes.*security updates/i
      )
    ).toBeInTheDocument();
  });

  it('renders company differentiation information', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FAQPage />);

    const differentiationAccordion = screen.getByRole('button', {
      name: /what makes four loop digital different/i,
    });
    await user.click(differentiationAccordion);

    expect(
      screen.getByText(
        /unique combination.*technical expertise.*strategic thinking/i
      )
    ).toBeInTheDocument();
  });

  it('renders "Still Have Questions?" section', () => {
    renderWithTheme(<FAQPage />);

    expect(
      screen.getByRole('heading', { name: /still have questions/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/can't find the answer you're looking for/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/visit our contact page to send us a message/i)
    ).toBeInTheDocument();
  });

  it('includes structured data scripts', () => {
    renderWithTheme(<FAQPage />);

    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(2); // WebPage schema + FAQ schema
  });

  it('calls generateWebPageSchema with correct parameters', () => {
    renderWithTheme(<FAQPage />);

    expect(structuredDataLib.generateWebPageSchema).toHaveBeenCalledWith({
      name: 'FAQ - Four Loop Digital',
      description:
        'Frequently asked questions about our digital consulting services.',
      url: 'https://fourloop.digital/faq',
    });
  });

  it('renders structured data using renderStructuredData', () => {
    renderWithTheme(<FAQPage />);

    expect(structuredDataLib.renderStructuredData).toHaveBeenCalled();
  });

  it('has proper accessibility structure with heading hierarchy', () => {
    renderWithTheme(<FAQPage />);

    // Check heading hierarchy (h1 -> h2)
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2s = screen.getAllByRole('heading', { level: 2 });

    expect(h1).toHaveTextContent(/frequently asked questions/i);
    expect(h2s.length).toBeGreaterThanOrEqual(1); // FAQ question headings and "Still Have Questions?"
  });

  it('renders within a container component', () => {
    renderWithTheme(<FAQPage />);

    const container = screen
      .getByRole('heading', { name: /frequently asked questions/i })
      .closest('.MuiContainer-root');
    expect(container).toBeInTheDocument();
  });

  it('includes proper meta information through metadata export', () => {
    // Test that the metadata export exists and has correct values
    expect(faqMetadata).toBeDefined();
    expect(faqMetadata.title).toBe('Frequently Asked Questions');
    expect(faqMetadata.description).toContain(
      "Find answers to common questions about Four Loop Digital's services"
    );
  });

  it('renders accordion expand icons', () => {
    renderWithTheme(<FAQPage />);

    // Check that expand icons are present (should be SVG elements)
    const expandIcons = document.querySelectorAll(
      '[data-testid="ExpandMoreIcon"]'
    );
    expect(expandIcons).toHaveLength(8); // One for each FAQ
  });

  it('handles missing structured data gracefully', () => {
    // Mock renderStructuredData to return empty string
    jest.mocked(structuredDataLib.renderStructuredData).mockReturnValue('');

    expect(() => renderWithTheme(<FAQPage />)).not.toThrow();
  });

  it('renders without crashing when all dependencies are available', () => {
    expect(() => renderWithTheme(<FAQPage />)).not.toThrow();
  });

  it('includes FAQ-specific structured data', () => {
    renderWithTheme(<FAQPage />);

    // Verify that renderStructuredData was called multiple times (for different schemas)
    expect(structuredDataLib.renderStructuredData).toHaveBeenCalledTimes(2);
  });

  it('renders all FAQ sections with proper content', () => {
    renderWithTheme(<FAQPage />);

    // Verify all major content sections are present
    expect(
      screen.getByText(/find answers to common questions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /get quick answers to the most frequently asked questions/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/still have questions/i)).toBeInTheDocument();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it('has proper responsive design structure', () => {
    renderWithTheme(<FAQPage />);

    // Check for responsive container and max width settings
    const mainContainer = screen
      .getByRole('heading', { name: /frequently asked questions/i })
      .closest('.MuiContainer-root');
    expect(mainContainer).toBeInTheDocument();

    // Check for FAQ container with max width
    const faqContainer = screen
      .getByRole('button', {
        name: /what services does four loop digital offer/i,
      })
      .closest('[class*="MuiBox"]');
    expect(faqContainer).toBeInTheDocument();
  });
});
