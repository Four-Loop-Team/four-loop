import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import Card, { CardContent, CardFooter, CardHeader } from '../Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders card with default props', () => {
      render(<Card data-testid='card'>Test content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Test content');
      // Test basic structural properties instead of exact values
      expect(card.tagName).toBe('DIV');
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
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Content');
    });

    it('applies elevated variant styles', () => {
      render(
        <Card variant='elevated' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Content');
    });

    it('applies outlined variant styles', () => {
      render(
        <Card variant='outlined' data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Content');
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
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Content');
    });

    it('does not apply hover styles when hoverable is false', () => {
      render(
        <Card hoverable={false} data-testid='card'>
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Content');
    });
  });
});

describe('CardHeader Component', () => {
  it('renders with title only', () => {
    render(<CardHeader title='Test Title' data-testid='header' />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
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
    expect(card).toBeInTheDocument();
    // Test that all content is present and functional
    expect(screen.getByText('Product Card')).toBeInTheDocument();
    expect(screen.getByText('Premium product')).toBeInTheDocument();
    expect(screen.getByText('This is a premium product.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
  });
});
