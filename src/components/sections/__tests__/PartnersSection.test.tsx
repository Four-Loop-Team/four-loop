import { render, screen } from '@testing-library/react';
import { PartnersSection } from '../PartnersSection';

describe('PartnersSection', () => {
  it('renders partners section with main heading', () => {
    render(<PartnersSection />);
    expect(
      screen.getByRole('heading', { name: /^partners$/i, level: 2 })
    ).toBeInTheDocument();
  });

  it('renders section subtitle', () => {
    render(<PartnersSection />);
    expect(screen.getByText(/companies we love/i)).toBeInTheDocument();
  });

  it('renders secondary heading', () => {
    render(<PartnersSection />);
    expect(
      screen.getByText(/partnerships that shaped our journey/i)
    ).toBeInTheDocument();
  });

  it('renders partnership description', () => {
    render(<PartnersSection />);
    expect(screen.getByText(/over the past 25 years/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we've collaborated with teams across industries/i)
    ).toBeInTheDocument();
  });

  it('has proper semantic structure with section element', () => {
    const { container } = render(<PartnersSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders with proper styling structure', () => {
    const { container } = render(<PartnersSection />);
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ position: 'relative' });
  });

  it('contains partnership narrative text', () => {
    render(<PartnersSection />);
    expect(
      screen.getByText(/thoughtful design, reliable code/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/relationships we've built/i)).toBeInTheDocument();
  });
});
