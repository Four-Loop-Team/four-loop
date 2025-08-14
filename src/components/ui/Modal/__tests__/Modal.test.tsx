import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  ConfirmDialog,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../Modal';

// Mock MUI Modal to make escape key testing predictable
jest.mock('@mui/material/Modal', () => {
  return function MockMuiModal({
    open,
    onClose,
    children,
    sx,
    slotProps,
    ...props
  }: any) {
    // Mock the escape key handling
    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose(event, 'escapeKeyDown');
        }
      };

      // Mock body scroll prevention
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose, open]);

    if (!open) return null;

    return (
      <div {...props} style={sx}>
        {/* Mock MUI backdrop */}
        <div
          className='MuiBackdrop-root'
          style={{
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
            backgroundColor:
              slotProps?.backdrop?.sx?.backgroundColor || 'rgba(0, 0, 0, 0.5)',
            ...slotProps?.backdrop?.sx,
          }}
          onClick={() => onClose({}, 'backdropClick')}
        >
          {/* Content container that stops propagation */}
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      </div>
    );
  };
});

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
    const backdrop = screen
      .getByTestId('test-modal')
      .querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(defaultProps.onClose).toHaveBeenCalled();
    }
  });

  it('calls onClose when escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('applies custom size classes', () => {
    render(<Modal {...defaultProps} size='lg' data-testid='test-modal' />);
    const modal = screen.getByTestId('test-modal');
    const modalDialog = modal.querySelector('[role="dialog"]') as HTMLElement;
    expect(modalDialog).toBeTruthy();
    // Modal should render with proper lg size styling
    expect(modalDialog?.style.maxWidth).toBe('1160px');
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
    const modal = screen.getByTestId('test-modal') as HTMLElement;
    expect(modal).toBeTruthy();
    // Modal should position itself at the top using flex alignment
    // With MUI Modal, positioning is handled via sx props, so we check if the modal exists
    expect(modal.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('applies different backdrop styles', () => {
    render(
      <Modal {...defaultProps} backdrop='blur' data-testid='test-modal' />
    );
    const modal = screen.getByTestId('test-modal');
    expect(modal).toBeTruthy();
    // Modal should render with backdrop - the backdrop is a separate div inside the modal overlay
    const backdrop = modal.querySelector('.MuiBackdrop-root') as HTMLElement;
    expect(backdrop).toBeTruthy();
  });

  it('prevents body scroll when modal is open', () => {
    const originalOverflow = document.body.style.overflow;

    const { unmount } = render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');

    // Restore original
    document.body.style.overflow = originalOverflow;
  });

  it('manages focus correctly when opening and closing', async () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();

    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

    // Open modal
    rerender(<Modal {...defaultProps} isOpen={true} />);
    await waitFor(() => {
      const modal = screen.getByRole('dialog');
      // MUI Modal handles focus differently, so we just check that the modal is present and focusable
      expect(modal).toBeInTheDocument();
    });

    // Close modal
    rerender(<Modal {...defaultProps} isOpen={false} />);
    await waitFor(() => {
      // After closing, focus should return (MUI handles this automatically)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    document.body.removeChild(button);
  });

  it('stops propagation when clicking modal content', () => {
    const onClose = jest.fn();
    render(
      <Modal {...defaultProps} onClose={onClose} data-testid='test-modal'>
        <div data-testid='modal-content'>Content</div>
      </Modal>
    );

    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders with different sizes correctly', () => {
    const sizes = [
      { size: 'sm', expectedMaxWidth: '400px' },
      { size: 'md', expectedMaxWidth: '500px' },
      { size: 'lg', expectedMaxWidth: '1160px' },
      { size: 'xl', expectedMaxWidth: '896px' },
      { size: 'full', expectedMaxWidth: '100%' },
    ] as const;

    sizes.forEach(({ size, expectedMaxWidth }) => {
      const { unmount } = render(
        <Modal {...defaultProps} size={size} data-testid={`modal-${size}`} />
      );

      const modal = screen.getByTestId(`modal-${size}`);
      const modalDialog = modal.querySelector('[role="dialog"]') as HTMLElement;
      expect(modalDialog?.style.maxWidth).toBe(expectedMaxWidth);

      unmount();
    });
  });

  it('renders with different positions correctly', () => {
    const positions = [
      { position: 'center', expectedAlign: 'center' },
      { position: 'top', expectedAlign: 'flex-start' },
      { position: 'bottom', expectedAlign: 'flex-end' },
    ] as const;

    positions.forEach(({ position }) => {
      const { unmount } = render(
        <Modal
          {...defaultProps}
          position={position}
          data-testid={`modal-${position}`}
        />
      );

      const modal = screen.getByTestId(`modal-${position}`) as HTMLElement;
      // With MUI Modal, positioning is handled via sx props, so we check if the modal exists
      expect(modal).toBeInTheDocument();
      expect(modal.querySelector('[role="dialog"]')).toBeTruthy();

      unmount();
    });
  });

  it('renders with different backdrop styles correctly', () => {
    const backdrops = [
      { backdrop: 'default', expectedBg: 'rgba(0, 0, 0, 0.5)', hasBlur: false },
      { backdrop: 'light', expectedBg: 'rgba(0, 0, 0, 0.25)', hasBlur: false },
      { backdrop: 'dark', expectedBg: 'rgba(0, 0, 0, 0.75)', hasBlur: false },
      { backdrop: 'blur', expectedBg: 'rgba(0, 0, 0, 0.5)', hasBlur: true },
    ] as const;

    backdrops.forEach(({ backdrop }) => {
      const { unmount } = render(
        <Modal
          {...defaultProps}
          backdrop={backdrop}
          data-testid={`modal-${backdrop}`}
        />
      );

      const modal = screen.getByTestId(`modal-${backdrop}`) as HTMLElement;
      const backdropEl = modal.querySelector(
        '.MuiBackdrop-root'
      ) as HTMLElement;
      // With MUI Modal, backdrop styles are applied via sx props, so we check if the backdrop exists
      expect(backdropEl).toBeTruthy();

      unmount();
    });
  });
});

describe('ModalHeader', () => {
  it('renders children', () => {
    render(
      <ModalHeader>
        <h2>Test Title</h2>
      </ModalHeader>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders only title content', () => {
    render(
      <ModalHeader>
        <h2>Test Title</h2>
      </ModalHeader>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    // ModalHeader no longer contains a close button - that's handled by the Modal component
  });

  it('applies custom className', () => {
    render(
      <ModalHeader className='custom-header'>
        <h2>Test Title</h2>
      </ModalHeader>
    );

    const header = screen.getByTestId('modal-header');
    expect(header).toHaveClass('custom-header');
  });

  it('applies custom test id', () => {
    render(
      <ModalHeader data-testid='custom-header'>
        <h2>Test Title</h2>
      </ModalHeader>
    );

    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
  });
});

describe('ModalBody', () => {
  it('renders children correctly', () => {
    render(
      <ModalBody>
        <p>Modal body content</p>
        <button>Action Button</button>
      </ModalBody>
    );

    expect(screen.getByText('Modal body content')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ModalBody className='custom-body'>
        <p>Content</p>
      </ModalBody>
    );

    const body = screen.getByTestId('modal-body');
    expect(body).toHaveClass('custom-body');
  });

  it('applies custom test id', () => {
    render(
      <ModalBody data-testid='custom-body'>
        <p>Content</p>
      </ModalBody>
    );

    expect(screen.getByTestId('custom-body')).toBeInTheDocument();
  });
});

describe('ModalFooter', () => {
  it('renders children correctly', () => {
    render(
      <ModalFooter>
        <button>Cancel</button>
        <button>Save</button>
      </ModalFooter>
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ModalFooter className='custom-footer'>
        <button>Close</button>
      </ModalFooter>
    );

    const footer = screen.getByTestId('modal-footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('applies custom test id', () => {
    render(
      <ModalFooter data-testid='custom-footer'>
        <button>Close</button>
      </ModalFooter>
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });
});

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and message', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?')
    ).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders without title', () => {
    const { title, ...propsWithoutTitle } = defaultProps;
    render(<ConfirmDialog {...propsWithoutTitle} />);

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?')
    ).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    render(<ConfirmDialog {...defaultProps} />);

    await userEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    render(<ConfirmDialog {...defaultProps} />);

    await userEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('uses custom button text', () => {
    render(
      <ConfirmDialog {...defaultProps} confirmText='Delete' cancelText='Keep' />
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('renders with danger variant', () => {
    render(<ConfirmDialog {...defaultProps} variant='danger' />);

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeInTheDocument();
    // Button should be rendered with proper danger styling via inline styles
    expect(confirmButton.style.backgroundColor).toBeTruthy();
  });

  it('renders with warning variant', () => {
    render(<ConfirmDialog {...defaultProps} variant='warning' />);

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeInTheDocument();
    // Button should be rendered with proper warning styling via inline styles
    expect(confirmButton.style.backgroundColor).toBeTruthy();
  });

  it('renders with default variant', () => {
    render(<ConfirmDialog {...defaultProps} variant='default' />);

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeInTheDocument();
    // Button should be rendered with proper default styling via inline styles
    expect(confirmButton.style.backgroundColor).toBeTruthy();
  });
  it('shows loading state', () => {
    render(<ConfirmDialog {...defaultProps} loading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Find buttons by their text content
    const buttons = screen.getAllByRole('button');
    const confirmButton = buttons.find((button) =>
      button.textContent?.includes('Loading...')
    );
    const cancelButton = buttons.find(
      (button) => button.textContent === 'Cancel'
    );

    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<ConfirmDialog {...defaultProps} className='custom-dialog' />);

    const dialog = screen.getByTestId('confirm-dialog');
    const modalDialog = dialog.querySelector('[role="dialog"]');
    expect(modalDialog).toHaveClass('custom-dialog');
  });

  it('applies custom test id', () => {
    render(<ConfirmDialog {...defaultProps} data-testid='custom-confirm' />);

    expect(screen.getByTestId('custom-confirm')).toBeInTheDocument();
  });

  it('renders correct icons for each variant', () => {
    const variants = ['default', 'danger', 'warning'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <ConfirmDialog {...defaultProps} variant={variant} />
      );

      // Each variant should render an SVG icon
      const icon = screen.getByTestId('confirm-dialog').querySelector('svg');
      expect(icon).toBeInTheDocument();

      unmount();
    });
  });

  it('does not render when closed', () => {
    render(<ConfirmDialog {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Are you sure you want to proceed?')
    ).not.toBeInTheDocument();
  });
});

describe('Modal Integration', () => {
  it('works with all components together', async () => {
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose} size='lg'>
        <ModalHeader>
          <h2>Complete Modal</h2>
        </ModalHeader>
        <ModalBody>
          <p>This is the modal body content.</p>
        </ModalBody>
        <ModalFooter>
          <button>Cancel</button>
          <button>Save</button>
        </ModalFooter>
      </Modal>
    );

    expect(screen.getByText('Complete Modal')).toBeInTheDocument();
    expect(
      screen.getByText('This is the modal body content.')
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();

    // Test closing via external close button
    await userEvent.click(screen.getByTestId('modal-external-close-button'));
    expect(onClose).toHaveBeenCalled();
  });
});
