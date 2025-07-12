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

  it('renders email input field', () => {
    render(<ContactSection />);
    const emailInput = screen.getByLabelText(/where can we reach you/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  it('renders project textarea field', () => {
    render(<ContactSection />);
    const projectInput = screen.getByLabelText(/what can we help you build/i);
    expect(projectInput).toBeInTheDocument();
    expect(projectInput).toHaveAttribute('required');
  });

  it('has proper semantic structure', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('section#contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'contact');
  });

  it('has form with submit functionality', () => {
    const { container } = render(<ContactSection />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /let's talk/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
