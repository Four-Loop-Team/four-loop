/**
 * Toast/Notification component types and interfaces
 */

export interface Toast {
  /** Unique identifier for the toast */
  id: string;
  /** Toast title */
  title?: string;
  /** Toast message */
  message: string;
  /** Toast type/variant */
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  /** Toast duration in milliseconds (0 = never auto-dismiss) */
  duration?: number;
  /** Whether the toast can be dismissed */
  dismissible?: boolean;
  /** Custom action buttons */
  actions?: ToastAction[];
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional data */
  data?: Record<string, unknown>;
  /** Timestamp when toast was created */
  createdAt?: number;
}

export interface ToastAction {
  /** Action label */
  label: string;
  /** Action handler */
  onClick: () => void;
  /** Action variant */
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface ToastProps {
  /** Toast data */
  toast: Toast;
  /** Function to dismiss the toast */
  onDismiss: (id: string) => void;
  /** Toast position (for animations) */
  position?:
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  /** Whether to animate the toast */
  animated?: boolean;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface ToastContainerProps {
  /** Array of toasts to display */
  toasts: Toast[];
  /** Container position */
  position?:
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  /** Maximum number of toasts to show */
  maxToasts?: number;
  /** Whether to reverse the order of toasts */
  reverseOrder?: boolean;
  /** Gap between toasts */
  gap?: number;
  /** Offset from edge of screen */
  offset?: number;
  /** Function to dismiss a toast */
  onDismiss: (id: string) => void;
  /** Whether to animate toasts */
  animated?: boolean;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default toast duration */
  defaultDuration?: number;
  /** Maximum number of toasts */
  maxToasts?: number;
  /** Container position */
  position?:
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  /** Whether to animate toasts */
  animated?: boolean;
  /** Gap between toasts */
  gap?: number;
  /** Offset from edge of screen */
  offset?: number;
}

// Helper types for the toast hook
export interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
  actions?: ToastAction[];
  icon?: React.ReactNode;
  data?: Record<string, unknown>;
}

export interface UseToastReturn {
  /** Show a success toast */
  success: (message: string, options?: ToastOptions) => string;
  /** Show an error toast */
  error: (message: string, options?: ToastOptions) => string;
  /** Show a warning toast */
  warning: (message: string, options?: ToastOptions) => string;
  /** Show an info toast */
  info: (message: string, options?: ToastOptions) => string;
  /** Show a loading toast */
  loading: (
    message: string,
    options?: Omit<ToastOptions, 'duration'>
  ) => string;
  /** Show a custom toast */
  custom: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  /** Dismiss a toast */
  dismiss: (id: string) => void;
  /** Clear all toasts */
  clear: () => void;
  /** Update a toast */
  update: (id: string, updates: Partial<Toast>) => void;
  /** Current toasts */
  toasts: Toast[];
}
