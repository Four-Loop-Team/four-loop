import { render, screen } from '@testing-library/react';
import { IntroSection } from '../IntroSection';

// Mock the Logo component
jest.mock('@/components/brand', () => ({
  Logo: () => <div data-testid='logo'>Four Loop Digital Logo</div>,
}));

describe('IntroSection', () => {
  it('renders intro section with main tagline', () => {
    render(<IntroSection />);
    expect(
      screen.getByText(/crafted code\. thoughtful design\. real results\./i)
    ).toBeInTheDocument();
  });

  it('renders company description', () => {
    render(<IntroSection />);
    expect(
      screen.getByText(
        /at four loop digital, we believe in building better brands/i
      )
    ).toBeInTheDocument();
  });

  it('renders the logo component', () => {
    render(<IntroSection />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('has proper semantic structure with section element', () => {
    const { container } = render(<IntroSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('displays the decorative elements', () => {
    const { container } = render(<IntroSection />);
    // Check for elements with MUI styling classes
    const elements = container.querySelectorAll('[class*="css-"]');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders tagline and mission statement', () => {
    render(<IntroSection />);
    expect(
      screen.getByText(/we remove roadblocks, elevate identities/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/lead with expertise, grow through reputation/i)
    ).toBeInTheDocument();
  });
});
