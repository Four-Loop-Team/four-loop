/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import Input from '../Input';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders input with default props', () => {
      render(<Input data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass(
        'w-full',
        'rounded-md',
        'border',
        'border-gray-300',
        'bg-white',
        'px-4',
        'py-2',
        'text-base'
      );
    });

    it('generates unique id when not provided', () => {
      render(<Input data-testid='input1' />);
      const input1 = screen.getByTestId('input1');

      render(<Input data-testid='input2' />);
      const input2 = screen.getByTestId('input2');

      expect(input1.id).toBeTruthy();
      expect(input2.id).toBeTruthy();
      expect(input1.id).not.toBe(input2.id);
    });

    it('uses provided id', () => {
      render(<Input id='custom-id' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} data-testid='input' />);

      expect(ref.current).toBe(screen.getByTestId('input'));
    });

    it('passes through custom props', () => {
      render(
        <Input
          data-testid='input'
          placeholder='Enter text'
          aria-label='Custom input'
          name='test-input'
        />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
      expect(input).toHaveAttribute('aria-label', 'Custom input');
      expect(input).toHaveAttribute('name', 'test-input');
    });
  });

  describe('Label Rendering', () => {
    it('renders label when provided', () => {
      render(<Input label='Email Address' data-testid='input' />);

      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('Email Address')).toHaveClass(
        'block',
        'text-sm',
        'font-medium',
        'text-gray-700',
        'mb-1'
      );
    });

    it('associates label with input', () => {
      render(
        <Input label='Email Address' id='email-input' data-testid='input' />
      );

      const label = screen.getByText('Email Address');
      const input = screen.getByTestId('input');

      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('associates label with generated id', () => {
      render(<Input label='Email Address' data-testid='input' />);

      const label = screen.getByText('Email Address');
      const input = screen.getByTestId('input');

      const inputId = input.getAttribute('id');
      expect(inputId).toBeTruthy();
      expect(label).toHaveAttribute('for', inputId);
    });
  });

  describe('Variant Styles', () => {
    it('applies default variant styles', () => {
      render(<Input variant='default' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border', 'border-gray-300', 'bg-white');
    });

    it('applies filled variant styles', () => {
      render(<Input variant='filled' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-0', 'bg-gray-100');
      expect(input).not.toHaveClass('border-gray-300');
    });

    it('applies outlined variant styles', () => {
      render(<Input variant='outlined' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-2', 'border-gray-300', 'bg-white');
    });
  });

  describe('Size Styles', () => {
    it('applies small size styles', () => {
      render(<Input inputSize='sm' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('px-3', 'py-2', 'text-sm');
    });

    it('applies medium size styles (default)', () => {
      render(<Input inputSize='md' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('applies large size styles', () => {
      render(<Input inputSize='lg' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('px-5', 'py-3', 'text-lg');
    });
  });

  describe('Error States', () => {
    it('displays error message', () => {
      render(<Input error='This field is required' data-testid='input' />);

      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByText('This field is required')).toHaveClass(
        'mt-1',
        'text-sm',
        'text-red-600'
      );
    });

    it('applies error styles to input', () => {
      render(<Input error='This field is required' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass(
        'border-red-300',
        'focus:border-red-500',
        'focus:ring-red-500'
      );
    });

    it('sets aria-invalid when error is present', () => {
      render(<Input error='This field is required' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input via aria-describedby', () => {
      render(
        <Input
          error='This field is required'
          id='test-input'
          data-testid='input'
        />
      );

      const input = screen.getByTestId('input');
      const errorMessage = screen.getByText('This field is required');

      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
    });

    it('does not set aria-invalid when no error', () => {
      render(<Input data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Helper Text', () => {
    it('displays helper text', () => {
      render(
        <Input helperText='Must be at least 3 characters' data-testid='input' />
      );

      expect(
        screen.getByText('Must be at least 3 characters')
      ).toBeInTheDocument();
      expect(screen.getByText('Must be at least 3 characters')).toHaveClass(
        'mt-1',
        'text-sm',
        'text-gray-500'
      );
    });

    it('associates helper text with input via aria-describedby', () => {
      render(
        <Input
          helperText='Must be at least 3 characters'
          id='test-input'
          data-testid='input'
        />
      );

      const input = screen.getByTestId('input');
      const helperText = screen.getByText('Must be at least 3 characters');

      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
      expect(helperText).toHaveAttribute('id', 'test-input-helper');
    });

    it('hides helper text when error is present', () => {
      render(
        <Input
          helperText='Must be at least 3 characters'
          error='This field is required'
          data-testid='input'
        />
      );

      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(
        screen.queryByText('Must be at least 3 characters')
      ).not.toBeInTheDocument();
    });

    it('prioritizes error message over helper text in aria-describedby', () => {
      render(
        <Input
          helperText='Must be at least 3 characters'
          error='This field is required'
          id='test-input'
          data-testid='input'
        />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });
  });

  describe('Icons', () => {
    const LeftIcon = () => <span data-testid='left-icon'>📧</span>;
    const RightIcon = () => <span data-testid='right-icon'>👁️</span>;

    it('renders left icon', () => {
      render(<Input leftIcon={<LeftIcon />} data-testid='input' />);

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Input rightIcon={<RightIcon />} data-testid='input' />);

      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both icons', () => {
      render(
        <Input
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
          data-testid='input'
        />
      );

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('applies correct padding for left icon - small size', () => {
      render(
        <Input leftIcon={<LeftIcon />} inputSize='sm' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pl-10');
    });

    it('applies correct padding for left icon - medium size', () => {
      render(
        <Input leftIcon={<LeftIcon />} inputSize='md' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pl-11');
    });

    it('applies correct padding for left icon - large size', () => {
      render(
        <Input leftIcon={<LeftIcon />} inputSize='lg' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pl-12');
    });

    it('applies correct padding for right icon - small size', () => {
      render(
        <Input rightIcon={<RightIcon />} inputSize='sm' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pr-10');
    });

    it('applies correct padding for right icon - medium size', () => {
      render(
        <Input rightIcon={<RightIcon />} inputSize='md' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pr-11');
    });

    it('applies correct padding for right icon - large size', () => {
      render(
        <Input rightIcon={<RightIcon />} inputSize='lg' data-testid='input' />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pr-12');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Input className='custom-input' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('custom-input');
    });

    it('merges custom className with default classes', () => {
      render(<Input className='custom-input' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('custom-input', 'w-full', 'rounded-md');
    });
  });

  describe('User Interactions', () => {
    it('handles focus events', () => {
      const onFocus = jest.fn();
      render(<Input onFocus={onFocus} data-testid='input' />);

      const input = screen.getByTestId('input');
      fireEvent.focus(input);

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events', () => {
      const onBlur = jest.fn();
      render(<Input onBlur={onBlur} data-testid='input' />);

      const input = screen.getByTestId('input');
      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('handles change events', () => {
      const onChange = jest.fn();
      render(<Input onChange={onChange} data-testid='input' />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'test value' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'test value' }),
        })
      );
    });

    it('handles keyboard events', () => {
      const onKeyDown = jest.fn();
      render(<Input onKeyDown={onKeyDown} data-testid='input' />);

      const input = screen.getByTestId('input');
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input Types', () => {
    it('renders password input', () => {
      render(<Input type='password' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders email input', () => {
      render(<Input type='email' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders number input', () => {
      render(<Input type='number' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Accessibility', () => {
    it('supports all ARIA attributes', () => {
      render(
        <Input
          data-testid='input'
          aria-label='Search input'
          aria-required='true'
          aria-describedby='custom-description'
        />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-label', 'Search input');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'custom-description');
    });

    it('maintains accessibility with all features combined', () => {
      render(
        <Input
          label='Email Address'
          helperText="We'll never share your email"
          error='Please enter a valid email'
          id='email-input'
          data-testid='input'
        />
      );

      const input = screen.getByTestId('input');
      const label = screen.getByText('Email Address');
      const errorMessage = screen.getByText('Please enter a valid email');

      // Label association
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');

      // Error state
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'email-input-error');
      expect(errorMessage).toHaveAttribute('id', 'email-input-error');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string error', () => {
      render(<Input error='' data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'false');

      // Check that no error paragraph is rendered
      const container = input.closest('.w-full');
      const errorParagraph = container?.querySelector('p.text-red-600');
      expect(errorParagraph).not.toBeInTheDocument();
    });

    it('handles empty string helper text', () => {
      render(<Input helperText='' data-testid='input' />);

      const input = screen.getByTestId('input');

      // Check that no helper text paragraph is rendered
      const container = input.closest('.w-full');
      const helperParagraph = container?.querySelector('p.text-gray-500');
      expect(helperParagraph).not.toBeInTheDocument();
    });

    it('handles undefined values gracefully', () => {
      render(<Input data-testid='input' />);

      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });
  });
});
