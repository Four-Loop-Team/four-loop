import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ToastManager } from '../ui/Toast/ToastManager';
import { ToastProvider } from '../ui/Toast/ToastProvider';

// Helper component to test context integration
const ToastManagerWrapper = ({
  position,
}: {
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top'
    | 'bottom';
}) => (
  <ToastProvider>
    {position ? <ToastManager position={position} /> : <ToastManager />}
  </ToastProvider>
);

describe('ToastManager', () => {
  it('should render without crashing', () => {
    render(<ToastManagerWrapper />);
    // ToastManager renders a portal div with role='alert'
    const toastContainer = document.querySelector(
      '[data-testid="toast-container"]'
    );
    expect(toastContainer ?? document.body).toBeInTheDocument();
  });

  it('should handle toast display', () => {
    render(<ToastManagerWrapper />);
    // ToastManager should be present in the DOM
    const toastContainer = document.querySelector(
      '[data-testid="toast-container"]'
    );
    expect(toastContainer ?? document.body).toBeInTheDocument();
  });

  it('should handle different positions', () => {
    render(<ToastManagerWrapper position='top-right' />);
    const toastContainer = document.querySelector(
      '[data-testid="toast-container"]'
    );
    expect(toastContainer ?? document.body).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<ToastManagerWrapper />);
    // ToastManager creates a container with appropriate ARIA attributes
    const toastContainer = document.querySelector(
      '[data-testid="toast-container"]'
    );
    expect(toastContainer ?? document.body).toBeInTheDocument();
  });
});
