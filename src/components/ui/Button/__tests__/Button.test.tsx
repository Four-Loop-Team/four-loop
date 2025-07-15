import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Primary variant now uses integrated primary functionality with SCSS styling
    expect(button).toHaveClass('btn-primary');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#232323' });

    rerender(<Button variant='outline'>Outline</Button>);
    expect(screen.getByRole('button')).toHaveStyle({
      border: '1px solid #666666',
    });

    rerender(<Button variant='ghost'>Ghost</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ color: '#ffffff' });
  });

  it('renders different sizes correctly', () => {
    // Test with secondary variant since primary has integrated arrow functionality
    const { rerender } = render(
      <Button variant='secondary' size='sm'>
        Small
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      fontSize: '0.875rem',
      minWidth: '44px',
      minHeight: '44px',
    });

    rerender(
      <Button variant='secondary' size='lg'>
        Large
      </Button>
    );
    expect(screen.getByRole('button')).toHaveStyle({
      fontSize: '1.125rem',
      minWidth: '44px',
      minHeight: '44px',
    });
  });

  it('shows loading state correctly', () => {
    // Test loading with non-primary variant since primary doesn't support loading
    render(
      <Button variant='secondary' loading>
        Loading
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders with icons correctly', () => {
    const leftIcon = <span data-testid='left-icon'>←</span>;
    const rightIcon = <span data-testid='right-icon'>→</span>;

    // Test with secondary variant since primary has built-in arrow
    render(
      <Button variant='secondary' leftIcon={leftIcon} rightIcon={rightIcon}>
        With Icons
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();

    // Test primary variant has built-in arrow icon
    render(<Button variant='primary'>Primary with Arrow</Button>);
    const primaryButton = screen.getByRole('button', {
      name: /primary with arrow/i,
    });
    expect(primaryButton.querySelector('svg')).toBeInTheDocument(); // MUI East icon
  });

  it('handles click events correctly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as full width when specified', () => {
    // Test fullWidth with non-primary variant since primary doesn't support fullWidth
    render(
      <Button variant='secondary' fullWidth>
        Full Width
      </Button>
    );
    expect(screen.getByRole('button')).toHaveStyle({ width: '100%' });
  });

  it('is disabled when specified', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Primary variant has opacity-60 when disabled
    expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
  });
});
