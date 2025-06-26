import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SkipNavigationLink from '../layout/SkipNavigationLink';

describe('SkipNavigationLink', () => {
  it('renders skip navigation link', () => {
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('has correct initial hidden styles', () => {
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toHaveStyle({
      position: 'absolute',
      left: '-9999px',
      zIndex: '9999',
    });
  });

  it('becomes visible on focus', async () => {
    const user = userEvent.setup();
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    // Focus the link
    await user.tab();
    expect(skipLink).toHaveFocus();

    // Should be visible when focused
    expect(skipLink).toHaveStyle({
      left: '8px',
      top: '8px',
    });
  });

  it('becomes hidden on blur', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SkipNavigationLink />
        <button>Next focusable element</button>
      </div>
    );

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    const button = screen.getByRole('button');

    // Focus the skip link first
    await user.tab();
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveStyle({
      left: '8px',
      top: '8px',
    });

    // Tab to next element (blur the skip link)
    await user.tab();
    expect(button).toHaveFocus();

    // Skip link should be hidden again
    expect(skipLink).toHaveStyle({
      left: '-9999px',
    });
  });

  it('has proper accessibility attributes', () => {
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    // Should be a proper link element
    expect(skipLink.tagName.toLowerCase()).toBe('a');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('has correct styling for visibility and accessibility', () => {
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    // Check key accessibility styles
    expect(skipLink).toHaveStyle({
      backgroundColor: '#e2e891',
      color: '#232323',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '600',
      padding: '8px 16px',
    });
  });

  it('can be focused with keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>Before</button>
        <SkipNavigationLink />
        <button>After</button>
      </div>
    );

    const beforeButton = screen.getByRole('button', { name: 'Before' });
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    const afterButton = screen.getByRole('button', { name: 'After' });

    // Start at first button
    await user.click(beforeButton);
    expect(beforeButton).toHaveFocus();

    // Tab to skip link
    await user.tab();
    expect(skipLink).toHaveFocus();

    // Tab to next button
    await user.tab();
    expect(afterButton).toHaveFocus();
  });

  it('maintains high z-index for proper layering', () => {
    render(<SkipNavigationLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toHaveStyle({ zIndex: '9999' });
  });
});
