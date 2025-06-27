/**
 * Toast Manager Component
 * Handles rendering of toast notifications
 */

import React from 'react';
import { ToastContainer } from './Toast';
import { useToastContext } from './ToastProvider';
import { ToastContainerProps } from './types';

interface ToastManagerProps
  extends Omit<ToastContainerProps, 'toasts' | 'onDismiss'> {
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
  /** Whether to animate toasts */
  animated?: boolean;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export const ToastManager: React.FC<ToastManagerProps> = (props) => {
  const { toasts, removeToast } = useToastContext();

  return <ToastContainer {...props} toasts={toasts} onDismiss={removeToast} />;
};
