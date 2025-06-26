// Unit tests for the Logo component
import { render, screen } from '@/test/utils';
import Logo from '../brand/Logo';

describe('Logo Component', () => {
  it('renders logo image with correct alt text', () => {
    render(<Logo alt='Test Alt Text' />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'Test Alt Text');
  });

  it('uses default alt text when none provided', () => {
    render(<Logo />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('alt', 'Four Loop Digital Logo');
  });

  it('applies custom styling props correctly', () => {
    render(<Logo data-testid='logo-container' />);

    const logoContainer = screen.getByTestId('logo-container');
    expect(logoContainer).toBeInTheDocument();
  });

  it('has correct image source path', () => {
    render(<Logo />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute(
      'src',
      expect.stringContaining('logo.png')
    );
  });

  it('applies width and height props correctly', () => {
    render(<Logo width={300} height={120} />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('width', '300');
    expect(logoImage).toHaveAttribute('height', '120');
  });

  it('renders with priority prop for above-the-fold images', () => {
    render(<Logo priority={true} />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeInTheDocument();
    // Priority prop affects Next.js Image behavior but not DOM attributes
  });
});
