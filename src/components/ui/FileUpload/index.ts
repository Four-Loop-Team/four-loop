/**
 * @fileoverview FileUpload component exports
 * @component FileUpload
 *
 * @description
 * Export module for FileUpload component and related types.
 * Provides drag-and-drop file upload functionality with progress tracking, validation, and preview support.
 *
 * @example
 * ```tsx
 * import { FileUpload } from '@/components/ui/FileUpload';
 * import type { UploadedFile } from '@/components/ui/FileUpload';
 *
 * <FileUpload
 *   accept="image/*"
 *   maxFiles={3}
 *   onFilesSelected={handleFiles}
 *   onUploadProgress={handleProgress}
 * />
 * ```
 */

export { FileUpload, FileUpload as default } from './FileUpload';
export type { FileUploadProps, UploadedFile } from './types';
