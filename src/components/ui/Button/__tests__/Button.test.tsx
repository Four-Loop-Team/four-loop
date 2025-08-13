import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Secondary');

    rerender(<Button variant='outline'>Outline</Button>);
    const outlineButton = screen.getByRole('button');
    expect(outlineButton).toHaveTextContent('Outline');

    rerender(<Button variant='ghost'>Ghost</Button>);
    const ghostButton = screen.getByRole('button');
    expect(ghostButton).toHaveTextContent('Ghost');
  });

  it('renders different sizes correctly', () => {
    // Test with secondary variant since primary has integrated arrow functionality
    const { rerender } = render(
      <Button variant='secondary' size='sm'>
        Small
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Small');

    rerender(
      <Button variant='secondary' size='lg'>
        Large
      </Button>
    );
    const largeButton = screen.getByRole('button');
    expect(largeButton).toHaveTextContent('Large');
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
    expect(screen.getByText('Loading')).toBeInTheDocument();
    // Loading spinner should be present
    expect(button.querySelector('svg')).toBeInTheDocument();
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
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Full Width');
    // MUI Button adds fullWidth as a prop and CSS classes, not inline styles
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('is disabled when specified', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Disabled');
  });

  it('renders primary button with different color variants correctly', () => {
    // Test primary color variant (default)
    const { rerender } = render(
      <Button variant='primary'>Primary Default</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Primary Default');

    // Test secondary color variant
    rerender(
      <Button variant='primary' colorVariant='secondary'>
        Primary Secondary
      </Button>
    );
    const secondaryButton = screen.getByRole('button');
    expect(secondaryButton).toHaveTextContent('Primary Secondary');
    expect(secondaryButton.querySelector('svg')).toBeInTheDocument(); // Should still have arrow icon
  });
});
