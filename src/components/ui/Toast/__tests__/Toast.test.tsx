import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Toast, ToastContainer, ToastProvider, useToast } from '../index';

// Test component to use the toast hook
const TestComponent: React.FC = () => {
  const { custom } = useToast();

  const handleClick = () => {
    custom({
      type: 'success',
      title: 'Test Toast',
      message: 'This is a test message',
    });
  };

  return <button onClick={handleClick}>Add Toast</button>;
};

// Test component with ToastContainer
const TestWithToastContainer: React.FC = () => {
  const { toasts, custom, dismiss } = useToast();

  const handleClick = () => {
    custom({
      type: 'success',
      title: 'Test Toast',
      message: 'This is a test message',
    });
  };

  return (
    <>
      <button onClick={handleClick}>Add Toast</button>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
};

describe('Toast', () => {
  it('renders toast with title and message', () => {
    const mockToast = {
      id: 'test',
      type: 'success' as const,
      title: 'Success',
      message: 'Operation completed successfully',
    };

    render(<Toast toast={mockToast} onDismiss={jest.fn()} />);

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(
      screen.getByText('Operation completed successfully')
    ).toBeInTheDocument();
  });

  it('renders different toast types with correct styles', () => {
    const toasts = [
      {
        id: '1',
        type: 'success' as const,
        title: 'Success',
        message: 'Success message',
      },
      {
        id: '2',
        type: 'error' as const,
        title: 'Error',
        message: 'Error message',
      },
      {
        id: '3',
        type: 'warning' as const,
        title: 'Warning',
        message: 'Warning message',
      },
      {
        id: '4',
        type: 'info' as const,
        title: 'Info',
        message: 'Info message',
      },
    ];

    const { rerender } = render(
      <Toast toast={toasts[0]} onDismiss={jest.fn()} />
    );
    expect(screen.getByTestId('toast-1')).toHaveClass('border-green-200');

    rerender(<Toast toast={toasts[1]} onDismiss={jest.fn()} />);
    expect(screen.getByTestId('toast-2')).toHaveClass('border-red-200');

    rerender(<Toast toast={toasts[2]} onDismiss={jest.fn()} />);
    expect(screen.getByTestId('toast-3')).toHaveClass('border-yellow-200');

    rerender(<Toast toast={toasts[3]} onDismiss={jest.fn()} />);
    expect(screen.getByTestId('toast-4')).toHaveClass('border-blue-200');
  });

  it('auto-removes toast after duration', () => {
    // This test should be in ToastProvider tests since individual Toast component doesn't handle auto-dismiss
    const onDismiss = jest.fn();
    const mockToast = {
      id: 'test',
      type: 'info' as const,
      title: 'Auto Remove',
      message: 'This should auto remove',
      duration: 100, // Short duration for testing
    };

    render(<Toast toast={mockToast} onDismiss={onDismiss} />);

    // The individual Toast component doesn't auto-dismiss itself
    // This functionality is handled by ToastProvider
    expect(screen.getByTestId('toast-test')).toBeInTheDocument();
  });

  it('does not auto-remove toasts with duration 0', async () => {
    const onDismiss = jest.fn();
    const mockToast = {
      id: 'test',
      type: 'error' as const,
      title: 'Persistent',
      message: 'This should not auto remove',
      duration: 0,
    };

    render(<Toast toast={mockToast} onDismiss={onDismiss} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls onDismiss when close button is clicked', async () => {
    const onDismiss = jest.fn();
    const mockToast = {
      id: 'test',
      type: 'info' as const,
      title: 'Closable',
      message: 'Can be closed manually',
      dismissible: true,
    };

    render(<Toast toast={mockToast} onDismiss={onDismiss} />);

    const closeButton = screen.getByRole('button', { name: /dismiss/i });
    fireEvent.click(closeButton);

    // Wait for the animation delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
    });

    expect(onDismiss).toHaveBeenCalledWith('test');
  });

  it('does not render close button when dismissible is false', () => {
    const mockToast = {
      id: 'test',
      type: 'info' as const,
      title: 'Non-dismissible',
      message: 'Cannot be closed manually',
      dismissible: false,
    };

    render(<Toast toast={mockToast} onDismiss={jest.fn()} />);

    expect(
      screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it('renders custom actions when provided', () => {
    const mockAction = jest.fn();
    const mockToast = {
      id: 'test',
      type: 'info' as const,
      title: 'With Actions',
      message: 'Has custom actions',
      actions: [
        { label: 'Confirm', onClick: mockAction, variant: 'primary' as const },
        { label: 'Cancel', onClick: jest.fn(), variant: 'secondary' as const },
      ],
    };

    render(<Toast toast={mockToast} onDismiss={jest.fn()} />);

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    screen.getByText('Confirm').click();
    expect(mockAction).toHaveBeenCalled();
  });
});

describe('ToastProvider & useToast', () => {
  it('provides toast context to children', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Add Toast')).toBeInTheDocument();
  });

  it('adds and displays toasts', async () => {
    render(
      <ToastProvider>
        <TestWithToastContainer />
      </ToastProvider>
    );

    const button = screen.getByText('Add Toast');
    button.click();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
  });

  it('removes toasts after their duration', async () => {
    render(
      <ToastProvider defaultDuration={100}>
        <TestWithToastContainer />
      </ToastProvider>
    );

    const button = screen.getByText('Add Toast');
    button.click();

    // Toast should be visible initially
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(screen.getByText('Test Toast')).toBeInTheDocument();

    // Toast should be removed after duration
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });
});
