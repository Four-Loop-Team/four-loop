/**
 * @fileoverview Toast Component and useToast Hook - Individual toast notifications
 * @component Toast
 *
 * @description
 * Individual toast component and utility hook for displaying toast notifications with:
 * - Multiple toast types (success, error, warning, info, loading)
 * - Auto-dismiss functionality with customizable duration
 * - Manual dismiss with action buttons
 * - Smooth enter/exit animations
 * - Portal rendering for proper layering
 * - Accessibility features and announcements
 * - Customizable styling and positioning
 *
 * @features
 * - ✅ Multiple toast types and variants
 * - ✅ Auto-dismiss with custom durations
 * - ✅ Manual dismiss controls
 * - ✅ Smooth animations
 * - ✅ Action button support
 * - ✅ Portal rendering
 * - ✅ ARIA live announcements
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Individual toast component
 * <Toast
 *   toast={{
 *     id: '1',
 *     type: 'success',
 *     title: 'Success!',
 *     message: 'Operation completed successfully',
 *     duration: 5000
 *   }}
 *   onDismiss={handleDismiss}
 * />
 *
 * // Using the useToast hook
 * function MyComponent() {
 *   const { addToast, removeToast } = useToast();
 *
 *   const showSuccess = () => {
 *     addToast({
 *       type: 'success',
 *       title: 'Success!',
 *       message: 'Your action was completed'
 *     });
 *   };
 *
 *   const showWithActions = () => {
 *     addToast({
 *       type: 'info',
 *       message: 'New update available',
 *       actions: [
 *         { label: 'Update', onClick: handleUpdate },
 *         { label: 'Later', onClick: () => {} }
 *       ]
 *     });
 *   };
 * }
 *
 * // Toast container for positioning
 * <ToastContainer
 *   toasts={toasts}
 *   position="top-right"
 *   onDismiss={handleDismiss}
 * />
 * ```
 *
 * @accessibility
 * - ARIA live regions for announcements
 * - Screen reader compatible messages
 * - Keyboard dismissible
 * - High contrast support
 * - Focus management for actions
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToastContext } from './ToastProvider';
import {
  ToastContainerProps,
  ToastOptions,
  ToastProps,
  UseToastReturn,
} from './types';

// Individual Toast component
const Toast: React.FC<ToastProps> = ({
  toast,
  onDismiss,
  animated = true,
  className = '',
  'data-testid': testId = 'toast',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    if (animated) {
      setIsLeaving(true);
      setTimeout(() => onDismiss(toast.id), 200);
    } else {
      onDismiss(toast.id);
    }
  };

  const getIcon = () => {
    if (toast.icon) return toast.icon;

    switch (toast.type) {
      case 'success':
        return (
          <svg
            className='w-5 h-5 text-green-600'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className='w-5 h-5 text-red-600'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className='w-5 h-5 text-yellow-600'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'loading':
        return (
          <svg
            className='animate-spin w-5 h-5 text-blue-600'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        );
      default:
        return (
          <svg
            className='w-5 h-5 text-blue-600'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
        );
    }
  };

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'loading':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={`
        relative max-w-sm w-full bg-white border rounded-lg shadow-lg pointer-events-auto
        transition-all duration-200 ease-in-out transform
        ${animated ? (isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0') : ''}
        ${getTypeStyles()} ${className}
      `}
      data-testid={`${testId}-${toast.id}`}
    >
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>{getIcon()}</div>
          <div className='ml-3 flex-1'>
            {toast.title && (
              <p className='text-sm font-medium text-gray-900 mb-1'>
                {toast.title}
              </p>
            )}
            <p className='text-sm text-gray-700'>{toast.message}</p>
            {toast.actions && toast.actions.length > 0 && (
              <div className='mt-3 flex gap-2'>
                {toast.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      text-xs font-medium px-4 py-3 rounded transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center
                      ${
                        action.variant === 'primary'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : action.variant === 'secondary'
                            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {toast.dismissible !== false && (
            <div className='ml-4 flex-shrink-0'>
              <button
                onClick={handleDismiss}
                className='text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center'
                aria-label='Dismiss notification'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast Container component
const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
  maxToasts = 10,
  reverseOrder = false,
  gap = 8,
  offset = 16,
  onDismiss,
  animated = true,
  className = '',
  'data-testid': testId = 'toast-container',
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return `top-${offset} left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        return `bottom-${offset} left-1/2 transform -translate-x-1/2`;
      case 'top-left':
        return `top-${offset} left-${offset}`;
      case 'top-right':
        return `top-${offset} right-${offset}`;
      case 'bottom-left':
        return `bottom-${offset} left-${offset}`;
      case 'bottom-right':
        return `bottom-${offset} right-${offset}`;
      default:
        return `top-${offset} right-${offset}`;
    }
  };

  const displayedToasts = toasts.slice(0, maxToasts);
  const orderedToasts = reverseOrder
    ? [...displayedToasts].reverse()
    : displayedToasts;

  if (orderedToasts.length === 0) return null;

  const containerContent = (
    <div
      className={`fixed z-50 pointer-events-none ${getPositionClasses()} ${className}`}
      style={{ gap: `${gap}px` }}
      data-testid={testId}
    >
      <div className='flex flex-col gap-2'>
        {orderedToasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );

  return createPortal(containerContent, document.body);
};

// useToast hook
const useToast = (): UseToastReturn => {
  const { toasts, addToast, removeToast, clearAllToasts, updateToast } =
    useToastContext();

  const success = (message: string, options: ToastOptions = {}) => {
    return addToast({
      message,
      type: 'success',
      ...options,
    });
  };

  const error = (message: string, options: ToastOptions = {}) => {
    return addToast({
      message,
      type: 'error',
      duration: options.duration ?? 6000, // Error toasts last longer by default
      ...options,
    });
  };

  const warning = (message: string, options: ToastOptions = {}) => {
    return addToast({
      message,
      type: 'warning',
      ...options,
    });
  };

  const info = (message: string, options: ToastOptions = {}) => {
    return addToast({
      message,
      type: 'info',
      ...options,
    });
  };

  const loading = (
    message: string,
    options: Omit<ToastOptions, 'duration'> = {}
  ) => {
    return addToast({
      message,
      type: 'loading',
      duration: 0, // Loading toasts don't auto-dismiss
      dismissible: false,
      ...options,
    });
  };

  const custom = (toast: Parameters<typeof addToast>[0]) => {
    return addToast(toast);
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    custom,
    dismiss: removeToast,
    clear: clearAllToasts,
    update: updateToast,
    toasts,
  };
};

export { Toast, ToastContainer, useToast };
