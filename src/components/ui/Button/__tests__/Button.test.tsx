import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Primary variant now uses ButtonPrimary component
    expect(button).toHaveClass('border', 'border-gray-900', 'rounded-full');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600');

    rerender(<Button variant='outline'>Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border', 'border-gray-300');

    rerender(<Button variant='ghost'>Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-700',
      'hover:bg-gray-100'
    );
  });

  it('renders different sizes correctly', () => {
    // Test with secondary variant since primary uses ButtonPrimary
    const { rerender } = render(
      <Button variant='secondary' size='sm'>
        Small
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'px-4',
      'py-3',
      'text-sm',
      'min-w-[44px]',
      'min-h-[44px]'
    );

    rerender(
      <Button variant='secondary' size='lg'>
        Large
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'px-8',
      'py-4',
      'text-lg',
      'min-w-[44px]',
      'min-h-[44px]'
    );

    // Test primary variant (ButtonPrimary) sizes
    rerender(
      <Button variant='primary' size='sm'>
        Primary Small
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(
      <Button variant='primary' size='lg'>
        Primary Large
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Primary variant uses ButtonPrimary which has opacity-60
    expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders with icons correctly', () => {
    const leftIcon = <span data-testid='left-icon'>←</span>;
    const rightIcon = <span data-testid='right-icon'>→</span>;

    // Test with secondary variant since primary (ButtonPrimary) has built-in arrow
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
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('is disabled when specified', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Primary variant uses ButtonPrimary which has opacity-60
    expect(button).toHaveClass('opacity-60', 'cursor-not-allowed');
  });
});
