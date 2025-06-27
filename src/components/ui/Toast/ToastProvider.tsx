/**
 * Toast Context and Provider
 * Global state management for toast notifications
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

// Custom hook to use toast context
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

// Toast Provider component
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
