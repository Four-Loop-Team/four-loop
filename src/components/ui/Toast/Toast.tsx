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

import { useDesignSystem } from '@/lib/hooks';
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
  const { colors, spacing, radius, shadows } = useDesignSystem();
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
            className='toast-icon toast-icon-success'
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
            className='toast-icon toast-icon-error'
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
            className='toast-icon toast-icon-warning'
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
          <svg className='toast-spinner' fill='none' viewBox='0 0 24 24'>
            <circle
              className='toast-spinner-circle'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='toast-spinner-path'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        );
      default:
        return (
          <svg
            className='toast-icon toast-icon-info'
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
        return {
          backgroundColor: colors.state.success + '20', // 20% opacity
          borderColor: colors.state.success + '40', // 40% opacity
          color: colors.state.success,
        };
      case 'error':
        return {
          backgroundColor: colors.state.error + '20',
          borderColor: colors.state.error + '40',
          color: colors.state.error,
        };
      case 'warning':
        return {
          backgroundColor: colors.state.warning + '20',
          borderColor: colors.state.warning + '40',
          color: colors.state.warning,
        };
      case 'loading':
        return {
          backgroundColor: colors.state.info + '20',
          borderColor: colors.state.info + '40',
          color: colors.state.info,
        };
      default:
        return {
          backgroundColor: colors.state.info + '20',
          borderColor: colors.state.info + '40',
          color: colors.state.info,
        };
    }
  };

  const toastStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '384px', // max-w-sm
    width: '100%',
    border: `1px solid ${getTypeStyles().borderColor}`,
    borderRadius: radius.lg,
    boxShadow: shadows.lg,
    pointerEvents: 'auto',
    transition: 'all 200ms ease-in-out',
    transform: animated
      ? isVisible && !isLeaving
        ? 'translateX(0)'
        : 'translateX(100%)'
      : 'none',
    opacity: animated ? (isVisible && !isLeaving ? 1 : 0) : 1,
    ...getTypeStyles(),
  };

  return (
    <div
      style={toastStyle}
      className={className}
      data-testid={`${testId}-${toast.id}`}
    >
      <div style={{ padding: spacing.component.sm }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.micro.md,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: '1.25rem',
              height: '1.25rem',
              color: 'currentColor',
            }}
          >
            {getIcon()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {toast.title && (
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: colors.text.primary,
                  margin: 0,
                  marginBottom: spacing.micro.xs,
                }}
              >
                {toast.title}
              </p>
            )}
            <p
              style={{
                fontSize: '0.875rem',
                color: colors.text.primary,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {toast.message}
            </p>
            {toast.actions && toast.actions.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: spacing.micro.sm,
                  marginTop: spacing.micro.md,
                }}
              >
                {toast.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      padding: `${spacing.micro.sm} ${spacing.component.xs}`,
                      borderRadius: radius.sm,
                      transition: 'colors 200ms ease',
                      minWidth: '44px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      ...(action.variant === 'primary'
                        ? {
                            backgroundColor: colors.state.info,
                            color: colors.text.inverse,
                          }
                        : action.variant === 'secondary'
                          ? {
                              backgroundColor: colors.background.secondary,
                              color: colors.text.primary,
                            }
                          : {
                              backgroundColor: 'transparent',
                              color: colors.state.info,
                            }),
                    }}
                    onMouseEnter={(e) => {
                      if (action.variant === 'primary') {
                        e.currentTarget.style.backgroundColor =
                          colors.state.info + 'DD';
                      } else if (action.variant === 'secondary') {
                        e.currentTarget.style.backgroundColor =
                          colors.border.muted;
                      } else {
                        e.currentTarget.style.backgroundColor =
                          colors.state.info + '20';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (action.variant === 'primary') {
                        e.currentTarget.style.backgroundColor =
                          colors.state.info;
                      } else if (action.variant === 'secondary') {
                        e.currentTarget.style.backgroundColor =
                          colors.background.secondary;
                      } else {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {toast.dismissible !== false && (
            <div style={{ flexShrink: 0 }}>
              <button
                onClick={handleDismiss}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  color: colors.text.muted,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.text.primary;
                  e.currentTarget.style.backgroundColor =
                    colors.background.secondary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.text.muted;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label='Dismiss notification'
              >
                <svg
                  style={{ width: '1rem', height: '1rem' }}
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
  const { zIndex } = useDesignSystem();

  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: zIndex.toast,
      pointerEvents: 'none' as const,
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: `${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: `${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'top-left':
        return {
          ...baseStyles,
          top: `${offset}px`,
          left: `${offset}px`,
        };
      case 'top-right':
        return {
          ...baseStyles,
          top: `${offset}px`,
          right: `${offset}px`,
        };
      case 'bottom-left':
        return {
          ...baseStyles,
          bottom: `${offset}px`,
          left: `${offset}px`,
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          bottom: `${offset}px`,
          right: `${offset}px`,
        };
      default:
        return {
          ...baseStyles,
          top: `${offset}px`,
          right: `${offset}px`,
        };
    }
  };

  const displayedToasts = toasts.slice(0, maxToasts);
  const orderedToasts = reverseOrder
    ? [...displayedToasts].reverse()
    : displayedToasts;

  if (orderedToasts.length === 0) return null;

  const containerContent = (
    <div style={getPositionStyles()} className={className} data-testid={testId}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${gap}px`,
          alignItems: position.includes('left') ? 'flex-start' : 'flex-end',
        }}
      >
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
