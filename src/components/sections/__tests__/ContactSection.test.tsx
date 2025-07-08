import { render, screen } from '@testing-library/react';
import { ContactSection } from '../ContactSection';

describe('ContactSection', () => {
  it('renders contact section with heading', () => {
    render(<ContactSection />);
    expect(
      screen.getByRole('heading', { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  it('renders contact description text', () => {
    render(<ContactSection />);
    expect(screen.getByText(/tell us about your project/i)).toBeInTheDocument();
    expect(screen.getByText(/where can we reach you/i)).toBeInTheDocument();
    expect(screen.getByText(/what can we help you build/i)).toBeInTheDocument();
  });

  it('renders call to action button', () => {
    render(<ContactSection />);
    const button = screen.getByRole('button', { name: /let's talk/i });
    expect(button).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    render(<ContactSection />);
    expect(screen.getByText(/© 2024 Four Loop Digital/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('section#contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'contact');
  });

  it('has correct button styling classes', () => {
    render(<ContactSection />);
    const button = screen.getByRole('button', { name: /let's talk/i });
    expect(button).toHaveClass('contact-button');
  });
});
