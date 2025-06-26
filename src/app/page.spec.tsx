import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Mock the MuiThemeProvider to avoid Material-UI issues in tests
jest.mock('@/components/MuiThemeProvider', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

// Mock the Logo component to avoid image loading issues
jest.mock('@/components/Logo', () => {
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
    expect(document.querySelector('#work')).toBeInTheDocument();
    expect(document.querySelector('#about')).toBeInTheDocument();
    expect(document.querySelector('#contact')).toBeInTheDocument();
  });

  it('has all required headings for SEO', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Welcome to Four Loop Digital')
    ).toBeInTheDocument();
    expect(screen.getByText('Our Work')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});
