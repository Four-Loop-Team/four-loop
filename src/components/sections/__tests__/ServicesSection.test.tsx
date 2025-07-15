import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ServicesSection } from '../ServicesSection';

// Mock the UI components
jest.mock('@/components/ui/Accordion', () => ({
  Accordion: ({ children, ...props }: React.ComponentProps<'div'>) => (
    <div data-testid='accordion' {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/Button', () => ({
  Button: ({
    children,
    onClick,
    variant,
    ...props
  }: React.ComponentProps<'button'> & { variant?: string }) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

// Mock getElementById for scroll behavior
const mockScrollIntoView = jest.fn();
const mockGetElementById = jest.fn();

beforeEach(() => {
  mockScrollIntoView.mockClear();
  mockGetElementById.mockClear();
  global.document.getElementById = mockGetElementById;
});

describe('ServicesSection', () => {
  it('renders services section with heading', () => {
    render(<ServicesSection />);
    expect(
      screen.getByRole('heading', { name: /services/i })
    ).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/our areas of expertise/i)).toBeInTheDocument();
  });

  it('renders accordion component for services', () => {
    render(<ServicesSection />);
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  it('renders collaborate buttons (desktop and mobile)', () => {
    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });
    expect(buttons).toHaveLength(2); // One for desktop header, one for mobile
  });

  it('handles collaborate button click with scroll', () => {
    const mockElement = { scrollIntoView: mockScrollIntoView };
    mockGetElementById.mockReturnValue(mockElement);

    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });

    fireEvent.click(buttons[0]); // Click first button

    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles collaborate button click without contact section', () => {
    mockGetElementById.mockReturnValue(null);

    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });

    // Should not throw error when contact section is not found
    expect(() => fireEvent.click(buttons[0])).not.toThrow();
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
  });

  it('has proper semantic structure with section element', () => {
    const { container } = render(<ServicesSection />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('displays proper styling structure', () => {
    const { container } = render(<ServicesSection />);
    const sections = container.querySelectorAll('section');
    expect(sections[0]).toBeInTheDocument();
  });
});
