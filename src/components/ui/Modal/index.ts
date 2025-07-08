/**
 * @fileoverview Modal component exports
 * @component Modal
 *
 * @description
 * Export module for Modal components and dialogs including Modal, ModalHeader, ModalBody, ModalFooter, and ConfirmDialog.
 * Provides a comprehensive modal dialog system with confirmation dialogs and flexible content sections.
 *
 * @example
 * ```tsx
 * import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmDialog } from '@/components/ui/Modal';
 *
 * <Modal isOpen={isOpen} onClose={handleClose}>
 *   <ModalHeader>Dialog Title</ModalHeader>
 *   <ModalBody>
 *     <p>Modal content goes here...</p>
 *   </ModalBody>
 *   <ModalFooter>
 *     <button onClick={handleClose}>Close</button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */

export {
  ConfirmDialog,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from './Modal';
export type {
  ConfirmDialogProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './types';
