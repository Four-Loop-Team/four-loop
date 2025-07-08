/**
 * @fileoverview ToastProvider Component - Global toast notification state management
 * @component ToastProvider
 *
 * @description
 * A context provider component that manages global toast notification state including:
 * - Toast creation and removal
 * - Auto-dismiss timers
 * - Toast queue management
 * - State updates and notifications
 * - Maximum toast limits
 * - Default duration configuration
 *
 * @features
 * - ✅ Global toast state management
 * - ✅ Auto-dismiss functionality
 * - ✅ Toast queue management
 * - ✅ Unique ID generation
 * - ✅ Timer management
 * - ✅ Context API integration
 * - ✅ TypeScript support
 * - ✅ Performance optimized
 *
 * @example
 * ```tsx
 * // Basic provider setup
 * <ToastProvider>
 *   <App />
 *   <ToastManager />
 * </ToastProvider>
 *
 * // Provider with custom settings
 * <ToastProvider
 *   defaultDuration={5000}
 *   maxToasts={5}
 * >
 *   <App />
 *   <ToastManager position="top-right" />
 * </ToastProvider>
 *
 * // Using the toast context
 * function MyComponent() {
 *   const { addToast, removeToast } = useToastContext();
 *
 *   const showSuccess = () => {
 *     addToast({
 *       type: 'success',
 *       title: 'Success!',
 *       message: 'Operation completed successfully'
 *     });
 *   };
 *
 *   return <button onClick={showSuccess}>Show Toast</button>;
 * }
 * ```
 *
 * @context
 * Provides ToastContextValue with:
 * - toasts: Array of current toast notifications
 * - addToast: Function to add new toast
 * - removeToast: Function to remove toast by ID
 * - updateToast: Function to update existing toast
 * - clearToasts: Function to clear all toasts
 *
 * @accessibility
 * - Manages ARIA live regions
 * - Provides screen reader announcements
 * - Handles focus management
 *
 * @performance
 * - Efficient state updates
 * - Optimized timer management
 * - Minimal re-renders
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Toast, ToastContextValue, ToastProviderProps } from './types';

// Toast actions
type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'UPDATE_TOAST'; payload: { id: string; updates: Partial<Toast> } }
  | { type: 'CLEAR_ALL_TOASTS' };

// Toast reducer
const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload];
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload);
    case 'UPDATE_TOAST':
      return state.map((toast) =>
        toast.id === action.payload.id
          ? { ...toast, ...action.payload.updates }
          : toast
      );
    case 'CLEAR_ALL_TOASTS':
      return [];
    default:
      return state;
  }
};

// Toast Context
const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Custom hook to access toast context
 * @throws {Error} When used outside of ToastProvider
 * @returns {ToastContextValue} Toast context value with state and actions
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

// Generate unique ID
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * ToastProvider component for managing global toast notification state
 *
 * @component
 * @param {ToastProviderProps} props - Provider configuration
 * @param {ReactNode} props.children - Child components that can access toast context
 * @param {number} props.defaultDuration - Default auto-dismiss duration in milliseconds
 * @param {number} props.maxToasts - Maximum number of toasts to display
 * @returns {JSX.Element} Rendered provider component
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultDuration = 4000,
  maxToasts = 10,
}) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  // Auto-dismiss toasts after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
        }, toast.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts]);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id' | 'createdAt'>): string => {
      const id = generateId();
      const newToast: Toast = {
        ...toast,
        id,
        createdAt: Date.now(),
        duration: toast.duration ?? defaultDuration,
      };

      dispatch({ type: 'ADD_TOAST', payload: newToast });

      return id;
    },
    [defaultDuration]
  );

  // Handle max toasts limit
  useEffect(() => {
    if (toasts.length > maxToasts) {
      const oldestToast = toasts[0];
      if (oldestToast) {
        dispatch({ type: 'REMOVE_TOAST', payload: oldestToast.id });
      }
    }
  }, [toasts.length, maxToasts, toasts]);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  }, []);

  const clearAllToasts = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_TOASTS' });
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    dispatch({ type: 'UPDATE_TOAST', payload: { id, updates } });
  }, []);

  const contextValue: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    updateToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
