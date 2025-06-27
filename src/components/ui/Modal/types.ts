/**
 * Modal component types and interfaces
 */

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Modal position */
  position?: 'center' | 'top' | 'bottom';
  /** Backdrop style */
  backdrop?: 'default' | 'light' | 'dark' | 'blur';
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Additional class names */
  className?: string;
  /** Custom overlay class names */
  overlayClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
  /** ARIA label */
  'aria-label'?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  'data-testid'?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger' | 'warning';
  loading?: boolean;
  className?: string;
  'data-testid'?: string;
}
