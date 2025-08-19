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

// Mock the ContactModal component
jest.mock('@/components/modals', () => ({
  ContactModal: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div data-testid='contact-modal' role='dialog' aria-label='Contact Modal'>
        <button onClick={onClose} data-testid='modal-close'>
          Close
        </button>
        <h2>Let&apos;s Build Something Amazing</h2>
      </div>
    ) : null,
}));

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

  it('renders collaborate button', () => {
    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });
    expect(buttons).toHaveLength(1); // Single button that shows on all screen sizes
  });

  it('opens contact modal when collaborate button is clicked', () => {
    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });

    // Modal should not be visible initially
    expect(screen.queryByTestId('contact-modal')).not.toBeInTheDocument();

    // Click first button to open modal
    fireEvent.click(buttons[0]);

    // Modal should now be visible
    expect(screen.getByTestId('contact-modal')).toBeInTheDocument();
    expect(
      screen.getByText("Let's Build Something Amazing")
    ).toBeInTheDocument();
  });

  it('closes contact modal when close button is clicked', () => {
    render(<ServicesSection />);
    const buttons = screen.getAllByRole('button', {
      name: /let's collaborate/i,
    });

    // Open modal
    fireEvent.click(buttons[0]);
    expect(screen.getByTestId('contact-modal')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByTestId('contact-modal')).not.toBeInTheDocument();
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
