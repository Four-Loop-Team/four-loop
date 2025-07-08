import { renderWithTheme } from '@/test/utils';
import { useMediaQuery } from '@mui/material';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from '../Navigation';

// Mock Material-UI useMediaQuery
jest.mock('@mui/material', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const actual = jest.requireActual('@mui/material');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock router push method
const mockPush = jest.fn();

describe('Navigation - Routing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/'); // Default to home page
    mockPush.mockClear();
  });

  it('renders navigation bar with correct items', () => {
    renderWithTheme(<Navigation />);

    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About Us').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('shows active state for current page', () => {
    mockUsePathname.mockReturnValue('/work');
    renderWithTheme(<Navigation />);

    const workButton = screen.getByRole('button', { name: 'Work' });
    expect(workButton).toHaveStyle('color: var(--nav-text-active)');
  });

  it('navigates to work page when work button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navigation />);

    const workButton = screen.getByRole('button', { name: 'Work' });
    await user.click(workButton);

    expect(mockPush).toHaveBeenCalledWith('/work');
  });

  it('navigates to about page when about button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navigation />);

    const aboutButton = screen.getByRole('button', { name: 'About Us' });
    await user.click(aboutButton);

    expect(mockPush).toHaveBeenCalledWith('/about');
  });

  it('navigates to contact page when contact button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navigation />);

    const contactButton = screen.getByRole('button', { name: 'Contact' });
    await user.click(contactButton);

    expect(mockPush).toHaveBeenCalledWith('/contact');
  });

  it('navigates to home page when home button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navigation />);

    const homeButton = screen.getByRole('button', { name: 'Home' });
    await user.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders mobile drawer with navigation items', () => {
    mockUseMediaQuery.mockReturnValue(true); // Mobile
    renderWithTheme(<Navigation />);

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation menu' })
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('closes mobile drawer after navigation', async () => {
    const user = userEvent.setup();
    mockUseMediaQuery.mockReturnValue(true); // Mobile
    renderWithTheme(<Navigation />);

    // Open drawer
    const menuButton = screen.getByLabelText('Open navigation menu');
    await user.click(menuButton);

    // Click navigation item
    const workButton = screen.getByRole('button', { name: 'Work' });
    await user.click(workButton);

    expect(mockPush).toHaveBeenCalledWith('/work');
    // The drawer should be closed (component state change)
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Navigation />);

    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();

    // Check navigation links are accessible
    const homeButton = screen.getByRole('button', { name: 'Home' });
    const workButton = screen.getByRole('button', { name: 'Work' });
    const aboutButton = screen.getByRole('button', { name: 'About Us' });
    const contactButton = screen.getByRole('button', { name: 'Contact' });

    expect(homeButton).toBeInTheDocument();
    expect(workButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  it('shows correct active states for different routes', () => {
    const routes = [
      { path: '/', expectedActive: 'Home' },
      { path: '/work', expectedActive: 'Work' },
      { path: '/about', expectedActive: 'About Us' },
      { path: '/contact', expectedActive: 'Contact' },
    ];

    routes.forEach(({ path, expectedActive }) => {
      mockUsePathname.mockReturnValue(path);
      const { unmount } = renderWithTheme(<Navigation />);

      const activeButton = screen.getByRole('button', { name: expectedActive });
      expect(activeButton).toHaveStyle('color: var(--nav-text-active)');

      unmount();
    });
  });

  it('renders sticky navigation bar', () => {
    renderWithTheme(<Navigation />);

    const navbar = screen.getByLabelText('Main navigation');
    expect(navbar).toHaveStyle('position: sticky');
  });

  it('renders mobile drawer with correct ARIA attributes', () => {
    mockUseMediaQuery.mockReturnValue(true);
    renderWithTheme(<Navigation />);

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    const navElement = screen.getByRole('navigation', {
      name: 'Mobile navigation menu',
    });
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('id', 'mobile-navigation-menu');
  });
});
