/**
 * @fileoverview ToastManager Component - Toast notification display manager
 * @component ToastManager
 *
 * @description
 * A manager component that handles the rendering and positioning of toast notifications.
 * It connects to the ToastProvider context to display toasts with:
 * - Flexible positioning options
 * - Maximum toast limits
 * - Animation support
 * - Order control (normal/reverse)
 * - Gap and offset configuration
 *
 * @features
 * - ✅ Multiple position options
 * - ✅ Maximum toast limits
 * - ✅ Animation support
 * - ✅ Order control
 * - ✅ Gap and offset customization
 * - ✅ Context integration
 * - ✅ TypeScript support
 * - ✅ Accessibility ready
 *
 * @example
 * ```tsx
 * // Basic toast manager
 * <ToastManager position="top-right" />
 *
 * // Manager with custom settings
 * <ToastManager
 *   position="bottom"
 *   maxToasts={5}
 *   reverseOrder
 *   gap={12}
 *   offset={20}
 *   animated
 * />
 *
 * // Multiple managers for different positions
 * <ToastManager position="top-left" maxToasts={3} />
 * <ToastManager position="bottom-right" maxToasts={2} />
 * ```
 *
 * @requires ToastProvider - Must be wrapped in ToastProvider
 *
 * @accessibility
 * - ARIA live regions for announcements
 * - Screen reader compatible
 * - Keyboard dismissible
 * - Focus management
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

/**
 * ToastManager component for rendering and managing toast notifications
 *
 * @component
 * @param {ToastManagerProps} props - Toast manager configuration
 * @param {'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} props.position - Toast container position
 * @param {number} props.maxToasts - Maximum number of toasts to display
 * @param {boolean} props.reverseOrder - Whether to reverse toast display order
 * @param {number} props.gap - Gap between toast notifications
 * @param {number} props.offset - Offset from screen edges
 * @param {boolean} props.animated - Whether to animate toast transitions
 * @param {string} props.className - Additional CSS classes
 * @param {string} props['data-testid'] - Test identifier
 * @returns {JSX.Element} Rendered toast manager component
 */
export const ToastManager: React.FC<ToastManagerProps> = (props) => {
  const { toasts, removeToast } = useToastContext();

  return <ToastContainer {...props} toasts={toasts} onDismiss={removeToast} />;
};
