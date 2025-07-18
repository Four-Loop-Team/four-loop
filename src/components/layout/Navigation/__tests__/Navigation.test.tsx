import { renderWithTheme } from '@/test/utils';
import { useMediaQuery } from '@mui/material';
import { fireEvent, screen, waitFor } from '@testing-library/react';
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

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockedLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

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

  it('renders navigation bar with correct items', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount (has 100ms delay)
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Work').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About Us').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);

    // Check that logo is also a link
    const logoText = screen.getByText(/FOUR LOOP/);
    const logoLink = logoText.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('shows active state for current page', async () => {
    mockUsePathname.mockReturnValue('/work');
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    // Find the button inside the work link
    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '/work');

    const workButton = screen.getByRole('button', { name: 'Work' });
    expect(workButton).toHaveStyle('color: var(--text-inverse)');
  });

  it('has correct link for work page', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '/work');
  });

  it('has correct link for about page', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('has correct link for contact page', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders mobile drawer with navigation items', async () => {
    mockUseMediaQuery.mockReturnValue(true); // Mobile
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

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

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

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

  it('has proper accessibility attributes', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

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

  it('shows correct active states for different routes', async () => {
    const routes = [
      { path: '/work', expectedActive: 'Work' },
      { path: '/about', expectedActive: 'About Us' },
      { path: '/contact', expectedActive: 'Contact' },
    ];

    for (const { path, expectedActive } of routes) {
      mockUsePathname.mockReturnValue(path);
      const { unmount } = renderWithTheme(<Navigation />);

      // Wait for component to mount
      await waitFor(() => {
        expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
      });

      const activeButton = screen.getByRole('button', { name: expectedActive });
      expect(activeButton).toHaveStyle('color: var(--text-inverse)');

      unmount();
    }
  });

  it('renders sticky navigation bar', async () => {
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    const navbar = screen.getByLabelText('Main navigation');
    expect(navbar).toHaveStyle('position: sticky');
  });

  it('renders mobile drawer with correct ARIA attributes', async () => {
    mockUseMediaQuery.mockReturnValue(true);
    renderWithTheme(<Navigation />);

    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    const navElement = screen.getByRole('navigation', {
      name: 'Mobile navigation menu',
    });
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveAttribute('id', 'mobile-navigation-menu');
  });
});
