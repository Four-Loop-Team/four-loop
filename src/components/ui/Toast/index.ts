/**
 * @fileoverview Toast component exports
 * @component Toast
 *
 * @description
 * Export module for Toast notification system including Toast, ToastManager, ToastProvider and related types.
 * Provides a complete toast notification system with context management and customizable toasts.
 *
 * @example
 * ```tsx
 * import { Toast, ToastProvider, useToast } from '@/components/ui/Toast';
 *
 * // Wrap your app with ToastProvider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use toasts in components
 * const { showToast } = useToast();
 * showToast({ type: 'success', message: 'Success!' });
 * ```
 */

export { Toast, ToastContainer, useToast } from './Toast';
export { ToastManager } from './ToastManager';
export { ToastProvider, useToastContext } from './ToastProvider';
export type {
  ToastAction,
  ToastContainerProps,
  ToastContextValue,
  ToastOptions,
  ToastProps,
  ToastProviderProps,
  Toast as ToastType,
  UseToastReturn,
} from './types';
