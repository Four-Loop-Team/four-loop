import React from 'react';
import { screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import BreadcrumbNav from '../BreadcrumbNav';
import { renderWithTheme } from '@/test/utils';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('BreadcrumbNav', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null on homepage', () => {
    mockUsePathname.mockReturnValue('/');

    const { container } = renderWithTheme(<BreadcrumbNav />);
    expect(container.firstChild).toBeNull();
  });

  it('generates breadcrumbs from pathname', () => {
    mockUsePathname.mockReturnValue('/about/team');

    renderWithTheme(<BreadcrumbNav />);

    expect(screen.getByLabelText('breadcrumb navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('shows home icon for home link', () => {
    mockUsePathname.mockReturnValue('/about');

    renderWithTheme(<BreadcrumbNav />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders last item as text (not link)', () => {
    mockUsePathname.mockReturnValue('/contact/form');

    renderWithTheme(<BreadcrumbNav />);

    // Home and Contact should be links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();

    // Form should be text (current page)
    const formText = screen.getByText('Form');
    expect(formText).toBeInTheDocument();
    expect(formText.tagName.toLowerCase()).toBe('p'); // Typography component renders as p
  });

  it('uses custom items when provided', () => {
    mockUsePathname.mockReturnValue('/any/path');

    const customItems = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Reports', href: '/dashboard/reports' },
      { label: 'Monthly Report' }, // No href = current page
    ];

    renderWithTheme(<BreadcrumbNav items={customItems} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Monthly Report')).toBeInTheDocument();

    // Dashboard and Reports should be links
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByRole('link', { name: /reports/i })).toHaveAttribute(
      'href',
      '/dashboard/reports'
    );
  });

  it('handles single-level paths correctly', () => {
    mockUsePathname.mockReturnValue('/about');

    renderWithTheme(<BreadcrumbNav />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    // Home should be a link, About should be text
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /about/i })
    ).not.toBeInTheDocument();
  });

  it('handles deep nested paths', () => {
    mockUsePathname.mockReturnValue(
      '/work/projects/web-development/e-commerce'
    );

    renderWithTheme(<BreadcrumbNav />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Web-development')).toBeInTheDocument();
    expect(screen.getByText('E-commerce')).toBeInTheDocument();

    // All except the last should be links
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute(
      'href',
      '/work'
    );
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute(
      'href',
      '/work/projects'
    );
    expect(
      screen.getByRole('link', { name: /web-development/i })
    ).toHaveAttribute('href', '/work/projects/web-development');

    // Last item should not be a link
    expect(
      screen.queryByRole('link', { name: /e-commerce/i })
    ).not.toBeInTheDocument();
  });

  it('capitalizes segment labels correctly', () => {
    mockUsePathname.mockReturnValue('/api/user-profile');

    renderWithTheme(<BreadcrumbNav />);

    expect(screen.getByText('Api')).toBeInTheDocument();
    expect(screen.getByText('User-profile')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    mockUsePathname.mockReturnValue('/about/team');

    renderWithTheme(<BreadcrumbNav />);

    const nav = screen.getByLabelText('breadcrumb navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.tagName.toLowerCase()).toBe('nav');
  });

  it('handles empty custom items array', () => {
    mockUsePathname.mockReturnValue('/about');

    const { container } = renderWithTheme(<BreadcrumbNav items={[]} />);

    // Should fall back to null since items array is empty (length <= 1)
    expect(container.firstChild).toBeNull();
  });

  it('handles custom items without href', () => {
    mockUsePathname.mockReturnValue('/any/path');

    const customItems = [
      { label: 'Step 1' }, // No href
      { label: 'Step 2' }, // No href
    ];

    renderWithTheme(<BreadcrumbNav items={customItems} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();

    // Both should be text, not links
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
