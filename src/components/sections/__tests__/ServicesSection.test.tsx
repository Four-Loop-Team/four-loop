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
  ButtonPrimary: ({
    children,
    onClick,
    ...props
  }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>
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
    expect(
      screen.getByText(
        /our areas of expertise designed to elevate your digital presence/i
      )
    ).toBeInTheDocument();
  });

  it('renders accordion component for services', () => {
    render(<ServicesSection />);
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  it('renders collaboration section', () => {
    render(<ServicesSection />);
    expect(
      screen.getByRole('heading', { name: /ready to get started/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/let's collaborate to bring your vision to life/i)
    ).toBeInTheDocument();
  });

  it('renders collaborate button', () => {
    render(<ServicesSection />);
    const button = screen.getByRole('button', { name: /let's collaborate/i });
    expect(button).toBeInTheDocument();
  });

  it('handles collaborate button click with scroll', () => {
    const mockElement = { scrollIntoView: mockScrollIntoView };
    mockGetElementById.mockReturnValue(mockElement);

    render(<ServicesSection />);
    const button = screen.getByRole('button', { name: /let's collaborate/i });

    fireEvent.click(button);

    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles collaborate button click without contact section', () => {
    mockGetElementById.mockReturnValue(null);

    render(<ServicesSection />);
    const button = screen.getByRole('button', { name: /let's collaborate/i });

    // Should not throw error when contact section is not found
    expect(() => fireEvent.click(button)).not.toThrow();
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
