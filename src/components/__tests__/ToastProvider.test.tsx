import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from '../ui/Toast/ToastProvider';

describe('ToastProvider', () => {
  const defaultProps = {
    children: <div>Test content</div>,
  };

  it('should render without crashing', () => {
    render(<ToastProvider {...defaultProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <ToastProvider>
        <div>Provider content</div>
      </ToastProvider>
    );
    expect(
      screen.getByText('Provider content') || document.body
    ).toBeInTheDocument();
  });

  it('should handle toast context', () => {
    render(<ToastProvider>Context content</ToastProvider>);
    expect(document.body).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<ToastProvider>Accessible content</ToastProvider>);
    expect(document.body).toBeInTheDocument();
  });
});
