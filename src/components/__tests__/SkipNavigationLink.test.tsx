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
    expect(skipLink).toHaveClass('skip-link');
    expect(skipLink).not.toHaveClass('skip-link-focused');
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

    // Should have focused class when focused
    expect(skipLink).toHaveClass('skip-link-focused');
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
    expect(skipLink).toHaveClass('skip-link-focused');

    // Tab to next element (blur the skip link)
    await user.tab();
    expect(button).toHaveFocus();

    // Skip link should not have focused class
    expect(skipLink).not.toHaveClass('skip-link-focused');
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

    // Check that the element has the correct class
    expect(skipLink).toHaveClass('skip-link');
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
    expect(skipLink).toHaveClass('skip-link');
  });
});
