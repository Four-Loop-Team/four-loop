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

  it('should render different variants correctly', () => {
    const { rerender } = render(<Button variant='contained'>Contained</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Contained');
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant='text'>Text</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Text');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render different sizes correctly', () => {
    // Test with contained variant since outlined has integrated arrow functionality
    const { rerender } = render(
      <Button variant='contained' size='small'>
        Small Button
      </Button>
    );

    expect(screen.getByText('Small Button')).toBeInTheDocument();

    rerender(
      <Button variant='contained' size='large'>
        Large Button
      </Button>
    );
    expect(screen.getByText('Large Button')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    // Test loading with non-outlined variant since outlined doesn't support loading
    render(
      <Button variant='contained' loading>
        Loading Button
      </Button>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Loading Button');
    // Check for loading spinner in DOM
    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with icons correctly', () => {
    const leftIcon = <span data-testid='left-icon'>←</span>;
    const rightIcon = <span data-testid='right-icon'>→</span>;

    // Test with contained variant since outlined has built-in arrow
    render(
      <Button variant='contained' leftIcon={leftIcon} rightIcon={rightIcon}>
        With Icons
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();

    // Test outlined variant has built-in arrow icon
    render(<Button variant='outlined'>Outlined with Arrow</Button>);
    const outlinedButton = screen.getByRole('button', {
      name: /outlined with arrow/i,
    });
    expect(outlinedButton.querySelector('svg')).toBeInTheDocument(); // MUI East icon
  });

  it('handles click events correctly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as full width when specified', () => {
    // Test fullWidth with non-outlined variant since outlined doesn't support fullWidth
    render(
      <Button variant='contained' fullWidth>
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

  it('renders outlined button with different color variants correctly', () => {
    // Test primary color variant (default)
    const { rerender } = render(
      <Button variant='outlined'>Outlined Default</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Outlined Default');

    // Test secondary color variant
    rerender(
      <Button variant='outlined' color='dark'>
        Outlined Secondary
      </Button>
    );
    const secondaryButton = screen.getByRole('button');
    expect(secondaryButton).toHaveTextContent('Outlined Secondary');
    expect(secondaryButton.querySelector('svg')).toBeInTheDocument(); // Should still have arrow icon
  });
});
