import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ContactModal from '../ContactModal';

// Mock the Modal components using the correct path
jest.mock('@/components/ui/Modal/Modal', () => ({
  __esModule: true,
  Modal: ({ children, isOpen, onClose, ...props }: any) =>
    isOpen ? (
      <div data-testid='modal' role='dialog' aria-label={props['aria-label']}>
        <button onClick={onClose} data-testid='modal-close-external'>
          ×
        </button>
        {children}
      </div>
    ) : null,
  ModalHeader: ({ children }: any) => (
    <div data-testid='modal-header'>{children}</div>
  ),
  ModalBody: ({ children }: any) => (
    <div data-testid='modal-body'>{children}</div>
  ),
}));

// Mock the Form and Input components
jest.mock('@/components/ui/Form/Form', () => {
  return function MockForm({ children, onSubmit, submitText }: any) {
    return (
      <form onSubmit={onSubmit} data-testid='contact-form'>
        {children}
        <button type='submit'>{submitText}</button>
      </form>
    );
  };
});

// Mock the Input component to return a simple input with proper label association
jest.mock('@/components/ui/Input/Input', () => ({
  __esModule: true,
  default: ({ label, multiline, ...props }: any) => {
    const id = `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const Component = multiline ? 'textarea' : 'input';
    return (
      <div data-testid={id}>
        <label htmlFor={id}>{label}</label>
        <Component id={id} {...props} />
      </div>
    );
  },
}));
describe('ContactModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open', () => {
    render(<ContactModal {...defaultProps} />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ContactModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<ContactModal {...defaultProps} />);

    expect(
      screen.getByTestId('input-where-can-we-reach-you?')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('input-what-can-we-help-you-build?')
    ).toBeInTheDocument();
  });

  it('renders form with submit button', () => {
    render(<ContactModal {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /let's talk/i })
    ).toBeInTheDocument();
  });

  it('calls onClose when external close button is clicked', async () => {
    const onClose = jest.fn();
    render(<ContactModal {...defaultProps} onClose={onClose} />);

    await userEvent.click(screen.getByTestId('modal-close-external'));
    expect(onClose).toHaveBeenCalled();
  });

  it('handles form input changes', async () => {
    render(<ContactModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Where can we reach you?');
    const projectInput = screen.getByLabelText('What can we help you build?');

    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(projectInput, 'Test project');

    expect(emailInput).toHaveValue('john@example.com');
    expect(projectInput).toHaveValue('Test project');
  });

  it('handles form submission', async () => {
    const onClose = jest.fn();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<ContactModal {...defaultProps} onClose={onClose} />);

    // Fill out form
    await userEvent.type(
      screen.getByLabelText('Where can we reach you?'),
      'john@example.com'
    );
    await userEvent.type(
      screen.getByLabelText('What can we help you build?'),
      'Test project'
    );

    // Submit form
    const submitButton = screen.getByRole('button', { name: /let's talk/i });
    await userEvent.click(submitButton);

    // Should log form data and close modal
    expect(consoleSpy).toHaveBeenCalledWith('Contact form submitted:', {
      email: 'john@example.com',
      project: 'Test project',
    });
    expect(onClose).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('renders with correct accessibility attributes', () => {
    render(<ContactModal {...defaultProps} />);

    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-label', 'Contact Form Modal');
  });

  it('renders form fields with correct types and attributes', () => {
    render(<ContactModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Where can we reach you?');
    const projectTextarea = screen.getByLabelText(
      'What can we help you build?'
    );

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(projectTextarea.tagName).toBe('TEXTAREA');
  });
});
