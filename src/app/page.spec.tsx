import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Mock the MuiThemeProvider to avoid Material-UI issues in tests
jest.mock('@/components/system/MuiThemeProvider', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

// Mock the Logo component to avoid image loading issues
jest.mock('@/components/brand/Logo', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='logo'>Logo</div>,
  };
});

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('contains the main heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText('Crafted Code. Thoughtful Design. Real Results.')
    ).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<HomePage />);
    // The new homepage uses modular sections instead of specific IDs
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has required heading for homepage', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Crafted Code. Thoughtful Design. Real Results.')
    ).toBeInTheDocument();
  });
});
