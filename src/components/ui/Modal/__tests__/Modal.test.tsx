import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Modal {...defaultProps} data-testid='test-modal' />);
    const backdrop = screen.getByTestId('test-modal');
    fireEvent.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('applies custom size classes', () => {
    render(<Modal {...defaultProps} size='lg' data-testid='test-modal' />);
    const modal = screen.getByTestId('test-modal');
    const modalDialog = modal.querySelector('[role="dialog"]');
    expect(modalDialog).toHaveClass('max-w-2xl');
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', () => {
    render(
      <Modal
        {...defaultProps}
        closeOnBackdropClick={false}
        data-testid='test-modal'
      />
    );
    const backdrop = screen.getByTestId('test-modal');
    fireEvent.click(backdrop);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('does not close on escape when closeOnEscape is false', () => {
    render(<Modal {...defaultProps} closeOnEscape={false} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('renders with custom aria-label', () => {
    render(
      <Modal
        {...defaultProps}
        aria-label='Custom Modal'
        data-testid='test-modal'
      />
    );
    const modal = screen.getByTestId('test-modal');
    const modalDialog = modal.querySelector('[role="dialog"]');
    expect(modalDialog).toHaveAttribute('aria-label', 'Custom Modal');
  });

  it('applies custom position classes', () => {
    render(<Modal {...defaultProps} position='top' data-testid='test-modal' />);
    const modal = screen.getByTestId('test-modal');
    expect(modal).toHaveClass('items-start');
  });

  it('applies different backdrop styles', () => {
    render(
      <Modal {...defaultProps} backdrop='blur' data-testid='test-modal' />
    );
    const backdrop = screen.getByTestId('test-modal');
    expect(backdrop).toHaveClass('backdrop-blur-sm');
  });
});
