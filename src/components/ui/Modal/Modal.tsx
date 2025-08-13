/**
 * @fileoverview Modal Component Suite - Flexible modal dialog system
 * @component Modal
 *
 * @description
 * A comprehensive modal component suite providing overlay dialogs with:
 * - Multiple sizes and positioning options
 * - Backdrop interaction control
 * - Keyboard navigation and focus management
 * - Portal rendering for proper layering
 * - Confirmation dialog variants
 * - Customizable styling and animations
 * - Full accessibility support
 *
 * @features
 * - ✅ Multiple size variants (sm, md, lg, xl, full)
 * - ✅ Flexible positioning options
 * - ✅ Backdrop click handling
 * - ✅ Keyboard navigation (Escape to close)
 * - ✅ Focus management and restoration
 * - ✅ Portal rendering
 * - ✅ Confirmation dialog patterns
 * - ✅ ARIA compliance
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Basic modal usage
 * <Modal isOpen={isOpen} onClose={handleClose}>
 *   <ModalHeader>
 *     <h2>Modal Title</h2>
 *   </ModalHeader>
 *   <ModalBody>
 *     Modal content goes here
 *   </ModalBody>
 *   <ModalFooter>
 *     <button onClick={handleClose}>Close</button>
 *   </ModalFooter>
 * </Modal>
 *
 * // Confirmation dialog
 * <ConfirmDialog
 *   isOpen={showConfirm}
 *   title="Confirm Action"
 *   message="Are you sure you want to proceed?"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 *   variant="danger"
 * />
 *
 * // Custom positioned modal
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   size="lg"
 *   position="top"
 *   backdrop="blur"
 * >
 *   <div>Custom modal content</div>
 * </Modal>
 * ```
 *
 * @accessibility
 * - ARIA dialog pattern implementation
 * - Focus trap and restoration
 * - Keyboard navigation (Escape, Tab)
 * - Screen reader announcements
 * - High contrast support
 */

import { Modal as MuiModal } from '@mui/material';
import React, { useRef } from 'react';
import {
  DESIGN_TOKENS,
  SEMANTIC_SPACING,
} from '../../../constants/design-tokens-consolidated';
import {
  ConfirmDialogProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './types';

// Base Modal component
const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  size = 'md',
  position = 'center',
  backdrop = 'default',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName: _overlayClassName = '',
  'aria-label': ariaLabel = 'Modal',
  'data-testid': testId = 'modal',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Use direct design tokens
  const colors = DESIGN_TOKENS.colors;
  const spacing = {
    component: SEMANTIC_SPACING.component,
    layout: SEMANTIC_SPACING.layout,
    micro: SEMANTIC_SPACING.micro,
  };
  const shadows = DESIGN_TOKENS.shadows;
  const zIndex = DESIGN_TOKENS.zIndex;

  const getSizeStyles = (size: NonNullable<ModalProps['size']>) => {
    switch (size) {
      case 'sm':
        return { maxWidth: '400px' };
      case 'md':
        return { maxWidth: '500px' };
      case 'lg':
        return { maxWidth: '1160px' }; // Match Form container maxWidth
      case 'xl':
        return { maxWidth: '896px' };
      case 'full':
        return { maxWidth: '100%', margin: `0 ${spacing.layout.md}` };
      default:
        return { maxWidth: '500px' };
    }
  };

  const getPositionStyles = (position: NonNullable<ModalProps['position']>) => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (position) {
      case 'center':
        return {
          ...baseStyles,
          alignItems: 'center',
          justifyContent: 'center',
        };
      case 'top':
        return {
          ...baseStyles,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: spacing.layout.xl,
        };
      case 'bottom':
        return {
          ...baseStyles,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: spacing.layout.xl,
        };
      default:
        return {
          ...baseStyles,
          alignItems: 'center',
          justifyContent: 'center',
        };
    }
  };

  const getBackdropStyles = (backdrop: NonNullable<ModalProps['backdrop']>) => {
    const baseColor = 'rgba(0, 0, 0, 0.5)';
    switch (backdrop) {
      case 'default':
        return { backgroundColor: baseColor };
      case 'light':
        return { backgroundColor: 'rgba(0, 0, 0, 0.25)' };
      case 'dark':
        return { backgroundColor: 'rgba(0, 0, 0, 0.75)' };
      case 'blur':
        return { backgroundColor: baseColor, backdropFilter: 'blur(4px)' };
      default:
        return { backgroundColor: baseColor };
    }
  };

  const handleClose = (
    _event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick' && !closeOnBackdropClick) return;
    if (reason === 'escapeKeyDown' && !closeOnEscape) return;
    onClose();
  };

  return (
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        ...getPositionStyles(position),
        zIndex: zIndex.modal,
      }}
      slotProps={{
        backdrop: {
          sx: getBackdropStyles(backdrop),
        },
      }}
      data-testid={testId}
    >
      <div style={{ position: 'relative', outline: 'none' }}>
        {/* Close button positioned outside modal */}
        <button
          onClick={onClose}
          className='modal-external-close-button'
          aria-label='Close modal'
          data-testid='modal-external-close-button'
          style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            width: '40px',
            height: '40px',
            backgroundColor: colors.text.primary,
            border: `1px solid ${colors.background.accent}`,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: shadows.lg,
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.background.secondary;
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.text.primary;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg
            style={{
              width: '16px',
              height: '16px',
              color: colors.background.accent,
            }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 12h14'
            />
          </svg>
        </button>

        {/* Modal content with Four Loop branding */}
        <div
          ref={modalRef}
          className={`modal-content ${className}`}
          style={{
            ...getSizeStyles(size),
            backgroundColor: colors.background.accent, // Four Loop yellow
            borderRadius: '86px', // Four Loop signature radius
            boxShadow: shadows.modal,
            position: 'relative',
            padding: spacing.component.xl,
            // Glass-morphism effect like contact cards
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            outline: 'none',
          }}
          role='dialog'
          aria-modal='true'
          aria-label={ariaLabel}
          tabIndex={-1}
        >
          {children}
        </div>
      </div>
    </MuiModal>
  );
};

// Modal Header component
const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
  className = '',
  'data-testid': testId = 'modal-header',
}) => {
  // Use direct design tokens
  const colors = DESIGN_TOKENS.colors;
  const spacing = {
    component: SEMANTIC_SPACING.component,
    micro: SEMANTIC_SPACING.micro,
  };

  return (
    <div
      className={`modal-header ${className}`}
      data-testid={testId}
      style={{
        padding: `${spacing.component.md} ${spacing.component.md} 0`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        className='modal-header-title'
        style={{
          fontSize: '1.25rem', // xl size
          fontWeight: 600, // semibold
          color: colors.text.primary,
          flex: 1,
        }}
      >
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className='modal-close-button'
          aria-label='Close modal'
          data-testid='modal-close-button'
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: spacing.micro.xs,
            borderRadius: '0.375rem', // sm radius
            color: colors.text.muted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition:
              'color 150ms ease-in-out, background-color 150ms ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.background.secondary;
            e.currentTarget.style.color = colors.text.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text.muted;
          }}
        >
          <svg
            className='modal-close-icon'
            style={{
              width: '20px',
              height: '20px',
            }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 12h14'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

// Modal Body component
const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
  'data-testid': testId = 'modal-body',
}) => {
  // Use direct design tokens
  const colors = DESIGN_TOKENS.colors;
  const spacing = {
    component: SEMANTIC_SPACING.component,
  };

  return (
    <div
      className={`modal-body ${className}`}
      data-testid={testId}
      style={{
        padding: spacing.component.md,
        color: colors.text.primary,
        lineHeight: 1.6, // relaxed line height
      }}
    >
      {children}
    </div>
  );
};

// Modal Footer component
const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
  'data-testid': testId = 'modal-footer',
}) => {
  // Use direct design tokens
  const spacing = {
    component: SEMANTIC_SPACING.component,
  };

  return (
    <div
      className={`modal-footer ${className}`}
      data-testid={testId}
      style={{
        padding: `0 ${spacing.component.md} ${spacing.component.md}`,
        display: 'flex',
        gap: spacing.component.sm,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

// Confirm Dialog component
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
  className = '',
  'data-testid': testId = 'confirm-dialog',
}) => {
  // Use direct design tokens
  const colors = DESIGN_TOKENS.colors;
  const spacing = {
    component: SEMANTIC_SPACING.component,
    micro: SEMANTIC_SPACING.micro,
  };

  const getVariantStyles = (
    variant: NonNullable<ConfirmDialogProps['variant']>
  ) => {
    switch (variant) {
      case 'danger':
        return {
          button: {
            backgroundColor: colors.state.error,
            color: colors.text.inverse,
          },
          hoverButton: {
            backgroundColor: '#dc2626', // Darker red on hover
          },
          icon: { color: colors.state.error },
        };
      case 'warning':
        return {
          button: {
            backgroundColor: colors.state.warning,
            color: colors.text.inverse,
          },
          hoverButton: {
            backgroundColor: '#d97706', // Darker yellow on hover
          },
          icon: { color: colors.state.warning },
        };
      default:
        return {
          button: {
            backgroundColor: colors.state.info,
            color: colors.text.inverse,
          },
          hoverButton: {
            backgroundColor: '#2563eb', // Darker blue on hover
          },
          icon: { color: colors.state.info },
        };
    }
  };

  const variantStyles = getVariantStyles(variant);

  const getIcon = () => {
    const iconStyle = {
      width: '100%',
      height: '100%',
    };

    switch (variant) {
      case 'danger':
        return (
          <svg
            className='modal-icon'
            style={iconStyle}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className='modal-icon'
            style={iconStyle}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        );
      default:
        return (
          <svg
            className='modal-icon'
            style={iconStyle}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      size='sm'
      className={className}
      data-testid={testId}
    >
      <div
        className='modal-dialog-content'
        style={{
          padding: spacing.component.lg,
        }}
      >
        <div
          className='modal-dialog-layout'
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: spacing.component.sm,
          }}
        >
          <div
            className='modal-dialog-icon'
            style={{
              ...variantStyles.icon,
              flexShrink: 0,
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getIcon()}
          </div>
          <div
            className='modal-dialog-text'
            style={{
              flex: 1,
            }}
          >
            {title && (
              <h3
                className='modal-dialog-title'
                style={{
                  margin: 0,
                  marginBottom: spacing.micro.sm,
                  fontSize: '1.125rem', // lg size
                  fontWeight: 600, // semibold
                  color: colors.text.primary,
                }}
              >
                {title}
              </h3>
            )}
            <p
              className='modal-dialog-message'
              style={{
                margin: 0,
                fontSize: '1rem', // base size
                lineHeight: 1.6, // relaxed
                color: colors.text.primary,
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={onCancel}
          disabled={loading}
          className='modal-button-cancel'
          style={{
            padding: `${spacing.micro.sm} ${spacing.component.sm}`,
            border: `1px solid ${colors.border.default}`,
            borderRadius: '0.375rem', // button radius
            backgroundColor: colors.background.primary,
            color: colors.text.primary,
            fontSize: '1rem', // base size
            fontWeight: 500, // medium
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 150ms ease-in-out',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor =
                colors.background.secondary;
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = colors.background.primary;
            }
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className='modal-button-confirm'
          style={{
            ...variantStyles.button,
            padding: `${spacing.micro.sm} ${spacing.component.sm}`,
            border: 'none',
            borderRadius: '0.375rem', // button radius
            fontSize: '1rem', // base size
            fontWeight: 500, // medium
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 150ms ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.micro.xs,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              Object.assign(e.currentTarget.style, variantStyles.hoverButton);
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              Object.assign(e.currentTarget.style, variantStyles.button);
            }
          }}
        >
          {loading ? (
            <div
              className='modal-button-loading'
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.micro.xs,
              }}
            >
              <svg
                className='modal-button-spinner'
                style={{
                  width: '16px',
                  height: '16px',
                  animation: 'spin 1s linear infinite',
                }}
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
              Loading...
            </div>
          ) : (
            confirmText
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export { ConfirmDialog, Modal, ModalBody, ModalFooter, ModalHeader };
