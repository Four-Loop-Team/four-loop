import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import Card, { CardContent, CardFooter, CardHeader } from '../Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders card with default props', () => {
      render(<Card data-testid='card'>Test content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(
        'bg-white',
        'rounded-lg',
        'border',
        'border-gray-200',
        'p-6'
      );
    });

    it('renders children correctly', () => {
      render(
        <Card data-testid='card'>
          <div>Child content</div>
        </Card>
      );

      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Card ref={ref} data-testid='card'>
          Content
        </Card>
      );

      expect(ref.current).toBe(screen.getByTestId('card'));
    });
  });

  describe('Variant Styles', () => {
    it('applies default variant styles', () => {
      render(
        <Card variant='default' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border', 'border-gray-200');
      expect(card).not.toHaveClass('shadow-md');
    });

    it('applies elevated variant styles', () => {
      render(
        <Card variant='elevated' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-md');
      expect(card).not.toHaveClass('border');
    });

    it('applies outlined variant styles', () => {
      render(
        <Card variant='outlined' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-2', 'border-gray-300');
    });
  });

  describe('Hover Effects', () => {
    it('applies hover styles when hoverable is true', () => {
      render(
        <Card hoverable data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('transition-shadow', 'hover:shadow-lg');
    });

    it('does not apply hover styles when hoverable is false', () => {
      render(
        <Card hoverable={false} data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('transition-shadow', 'hover:shadow-lg');
    });
  });
});

describe('CardHeader Component', () => {
  it('renders with title only', () => {
    render(<CardHeader title='Test Title' data-testid='header' />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toHaveClass('card-title');
  });

  it('renders with title and subtitle', () => {
    render(
      <CardHeader
        title='Test Title'
        subtitle='Test Subtitle'
        data-testid='header'
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });
});

describe('Card Integration', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card variant='elevated' hoverable data-testid='card'>
        <CardHeader title='Product Card' subtitle='Premium product' />
        <CardContent>
          <p>This is a premium product.</p>
        </CardContent>
        <CardFooter>
          <button>Buy Now</button>
        </CardFooter>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
    expect(screen.getByText('Product Card')).toBeInTheDocument();
    expect(screen.getByText('This is a premium product.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
  });
});
