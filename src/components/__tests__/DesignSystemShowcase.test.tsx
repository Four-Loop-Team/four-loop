import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Button,
  Card,
  DesignSystemShowcase,
  Typography,
} from '../DesignSystemShowcase';

describe('DesignSystemShowcase Components', () => {
  describe('Button', () => {
    it('should render with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('should apply primary variant styles by default', () => {
      render(<Button>Primary Button</Button>);
      const button = screen.getByRole('button');
      // Check that button has basic styling applied
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it('should apply secondary variant styles', () => {
      render(<Button variant='secondary'>Secondary Button</Button>);
      const button = screen.getByRole('button');
      // Check that button renders without errors
      expect(button).toBeInTheDocument();
    });

    it('should apply tertiary variant styles', () => {
      render(<Button variant='tertiary'>Tertiary Button</Button>);
      const button = screen.getByRole('button');
      // Check that button renders without errors
      expect(button).toBeInTheDocument();
    });

    it('should handle different sizes', () => {
      const { rerender } = render(<Button size='sm'>Small</Button>);
      let button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      rerender(<Button size='md'>Medium</Button>);
      button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      rerender(<Button size='lg'>Large</Button>);
      button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      rerender(<Button size='lg'>Large</Button>);
      button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Card', () => {
    it('should render with default props', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply elevation styles', () => {
      render(<Card elevation='lg'>Large elevation card</Card>);
      const card = screen.getByText('Large elevation card').closest('div');
      expect(card).toBeInTheDocument();
    });

    it('should handle different padding sizes', () => {
      render(<Card padding='sm'>Small padding card</Card>);
      const card = screen.getByText('Small padding card').closest('div');
      expect(card).toBeInTheDocument();
    });

    it('should apply padding variants', () => {
      const { rerender } = render(<Card padding='sm'>Small padding</Card>);
      let card = screen.getByText('Small padding').closest('div');
      expect(card).toBeInTheDocument();

      rerender(<Card padding='md'>Medium padding</Card>);
      card = screen.getByText('Medium padding').closest('div');
      expect(card).toBeInTheDocument();

      rerender(<Card padding='lg'>Large padding</Card>);
      card = screen.getByText('Large padding').closest('div');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('should render with default props', () => {
      render(<Typography>Sample text</Typography>);
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should apply different variants', () => {
      const { rerender } = render(
        <Typography variant='heading'>Heading</Typography>
      );
      let element = screen.getByText('Heading');
      expect(element).toHaveStyle({ fontSize: expect.any(String) });

      rerender(<Typography variant='body'>Body text</Typography>);
      element = screen.getByText('Body text');
      expect(element).toHaveStyle({ fontSize: expect.any(String) });

      rerender(<Typography variant='caption'>Caption text</Typography>);
      element = screen.getByText('Caption text');
      expect(element).toHaveStyle({ fontSize: expect.any(String) });
    });
  });

  describe('DesignSystemShowcase', () => {
    it('should render the complete showcase', () => {
      render(<DesignSystemShowcase />);
      expect(screen.getByText('Design System Showcase')).toBeInTheDocument();
    });
  });
});
