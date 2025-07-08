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
      screen.getByText('Welcome to Four Loop Digital')
    ).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<HomePage />);
    expect(document.querySelector('#home')).toBeInTheDocument();
    // Work, About, and Contact sections are now separate pages
  });

  it('has required heading for homepage', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Welcome to Four Loop Digital')
    ).toBeInTheDocument();
    expect(screen.getByText('Digital Consulting Services')).toBeInTheDocument();
  });
});
