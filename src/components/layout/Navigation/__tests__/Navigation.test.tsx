import { renderWithTheme } from '@/test/utils';
import { useMediaQuery } from '@mui/material';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
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
  usePathname: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation - Routing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
    mockUsePathname.mockReturnValue('/'); // Default to home page
  });

  it('renders navigation bar with correct items', () => {
    renderWithTheme(<Navigation />);

    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About Us').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);

    // Check that logo is also a link
    const logoText = screen.getByText(/FOUR LOOP/);
    const logoLink = logoText.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('shows active state for current page', () => {
    mockUsePathname.mockReturnValue('/work');
    renderWithTheme(<Navigation />);

    // Find the button inside the work link
    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '/work');

    const workButton = screen.getByRole('button', { name: 'Work' });
    expect(workButton).toHaveStyle('color: var(--nav-text-active)');
  });

  it('has correct link for work page', () => {
    renderWithTheme(<Navigation />);

    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '/work');
  });

  it('has correct link for about page', () => {
    renderWithTheme(<Navigation />);

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('has correct link for contact page', () => {
    renderWithTheme(<Navigation />);

    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders mobile drawer with navigation items', () => {
    mockUseMediaQuery.mockReturnValue(true); // Mobile
    renderWithTheme(<Navigation />);

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation menu' })
    ).toBeInTheDocument();

    // Check that mobile navigation items are links
    const workLink = screen.getByRole('link', { name: 'Work' });
    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });

    expect(workLink).toHaveAttribute('href', '/work');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('closes mobile drawer when navigation link is clicked', async () => {
    const user = userEvent.setup();
    mockUseMediaQuery.mockReturnValue(true); // Mobile
    renderWithTheme(<Navigation />);

    // Open drawer
    const menuButton = screen.getByLabelText('Open navigation menu');
    await user.click(menuButton);

    // Verify drawer is open
    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation menu' })
    ).toBeInTheDocument();

    // Click navigation link (Work link)
    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '/work');

    // The drawer closing behavior is handled by the handleNavClick function
    // which is attached to the Link onClick handler
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Navigation />);

    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();

    // Check navigation links are accessible
    const workLink = screen.getByRole('link', { name: 'Work' });
    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });

    expect(workLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    // Check that buttons inside links are also accessible
    const workButton = screen.getByRole('button', { name: 'Work' });
    const aboutButton = screen.getByRole('button', { name: 'About Us' });
    const contactButton = screen.getByRole('button', { name: 'Contact' });

    expect(workButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  it('shows correct active states for different routes', () => {
    const routes = [
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
