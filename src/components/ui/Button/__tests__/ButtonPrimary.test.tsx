import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ButtonPrimary from '../ButtonPrimary';

describe('ButtonPrimary Component', () => {
  it('renders with children text', () => {
    render(<ButtonPrimary>Let&apos;s Collaborate</ButtonPrimary>);
    expect(screen.getByText("Let's Collaborate")).toBeInTheDocument();
  });

  it('renders with default structure', () => {
    render(<ButtonPrimary>Test Button</ButtonPrimary>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border', 'border-gray-900', 'rounded-full');

    const ctaText = screen.getByText('Test Button');
    expect(ctaText).toHaveClass('inline-block', 'font-medium', 'text-gray-900');

    // Check for arrow span (MUI icon container)
    const arrowSpan = button.querySelector('span:last-child');
    expect(arrowSpan).toBeInTheDocument();
    expect(arrowSpan).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center'
    );
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ButtonPrimary onClick={handleClick}>Click Me</ButtonPrimary>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<ButtonPrimary className='custom-class'>Test</ButtonPrimary>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-gray-900', 'rounded-full');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards HTML button attributes', () => {
    render(
      <ButtonPrimary disabled title='Test Title'>
        Disabled Button
      </ButtonPrimary>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('title', 'Test Title');
  });
  it('has proper accessibility attributes', () => {
    render(<ButtonPrimary>Accessible Button</ButtonPrimary>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Button element has implicit type="submit" in forms, type="button" elsewhere by default
    expect(button).not.toHaveAttribute('type', 'submit');
  });

  it('renders with specific button type', () => {
    render(<ButtonPrimary type='submit'>Submit Button</ButtonPrimary>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  describe('Styling and CSS Classes', () => {
    it('applies correct CSS classes', () => {
      render(<ButtonPrimary>Style Test</ButtonPrimary>);

      const button = screen.getByRole('button');
      const ctaSpan = screen.getByText('Style Test');
      const arrowSpan = button.querySelector('span:last-child');

      expect(button).toHaveClass('border', 'border-gray-900', 'rounded-full');
      expect(ctaSpan).toHaveClass(
        'inline-block',
        'font-medium',
        'text-gray-900'
      );
      expect(arrowSpan).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center'
      );
    });

    it('applies correct size classes', () => {
      const { rerender } = render(
        <ButtonPrimary size='sm'>Small</ButtonPrimary>
      );
      expect(screen.getByRole('button')).toHaveClass('text-sm');

      rerender(<ButtonPrimary size='lg'>Large</ButtonPrimary>);
      expect(screen.getByRole('button')).toHaveClass('text-lg');
    });

    it('applies full width when specified', () => {
      render(<ButtonPrimary fullWidth>Full Width</ButtonPrimary>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('shows loading state', () => {
      render(<ButtonPrimary loading>Loading</ButtonPrimary>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.querySelector('svg')).toBeInTheDocument(); // Loading spinner
    });
  });

  describe('Component Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <ButtonPrimary type='submit'>Submit Form</ButtonPrimary>
        </form>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

describe('ButtonPrimary Accessibility', () => {
  it('has proper keyboard navigation', () => {
    render(<ButtonPrimary>Keyboard Test</ButtonPrimary>);

    const button = screen.getByRole('button');

    // Test focus
    button.focus();
    expect(button).toHaveFocus();

    // Test Enter key
    const handleClick = jest.fn();
    button.onclick = handleClick;
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('supports screen readers', () => {
    render(
      <ButtonPrimary aria-label='Custom label for screen readers'>
        Visual Text
      </ButtonPrimary>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      'Custom label for screen readers'
    );
  });
});
