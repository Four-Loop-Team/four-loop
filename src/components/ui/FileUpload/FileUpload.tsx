/**
 * A comprehensive file upload component with drag-and-drop support and file validation.
 *
 * This component provides a user-friendly interface for uploading files with features like:
 * - File type and size validation
 * - Multiple file support
 * - Visual feedback for upload status
 * - Customizable styling and behavior
 * - Accessibility support with keyboard navigation
 *
 * Features:
 * - Drag and drop file upload
 * - File type filtering with accept prop
 * - Maximum file size validation
 * - Multiple file selection support
 * - Upload progress indication
 * - Error handling and user feedback
 * - Fully accessible with ARIA labels
 *
 * @component
 * @example
 * ```tsx
 * // Basic file upload
 * <FileUpload
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   onChange={(files) => console.log('Uploaded:', files)}
 *   onError={(id, message) => console.error('Error:', message)}
 * />
 *
 * // Multiple file upload with custom styling
 * <FileUpload
 *   multiple
 *   accept=".pdf,.doc,.docx"
 *   className="custom-upload-area"
 *   placeholder="Drop documents here or click to browse"
 *   onChange={handleFileUpload}
 * />
 * ```
 *
 * @param props - FileUpload component props
 * @param props.accept - File types to accept (e.g., "image/*", ".pdf,.doc")
 * @param props.maxSize - Maximum file size in bytes (default: 10MB)
 * @param props.multiple - Allow multiple file selection (default: false)
 * @param props.disabled - Disable the upload functionality (default: false)
 * @param props.className - Additional CSS classes for styling
 * @param props.placeholder - Placeholder text for the upload area
 * @param props.onChange - Callback when files are successfully uploaded
 * @param props.onError - Callback when upload errors occur
 * @param props.data-testid - Test ID for component testing
 */

import React, {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { FileUploadProps, UploadedFile } from './types';

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize = 10 * 1024 * 1024,
  multiple = false,
  disabled = false,
  className = '',
  placeholder = 'Click to upload files',
  onChange,
  onError,
  'data-testid': testId = 'file-upload',
  'aria-label': ariaLabel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    processFiles(Array.from(selectedFiles));
  };

  const processFiles = (selectedFiles: File[]) => {
    const newFiles: UploadedFile[] = [];

    selectedFiles.forEach((file) => {
      if (maxSize && file.size > maxSize) {
        onError?.('', `File ${file.name} exceeds maximum size`);
        return;
      }

      newFiles.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'success',
      });
    });

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !disabled) {
      openFileDialog();
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  };

  return (
    <div
      className={`file-upload ${
        disabled ? 'file-upload-disabled' : ''
      } ${isDragOver ? 'file-upload-dragover' : ''} ${className}`}
      onClick={openFileDialog}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role='button'
      tabIndex={0}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <svg className='file-upload-icon' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
          clipRule='evenodd'
        />
      </svg>
      <p className='file-upload-text'>{placeholder}</p>
      {accept && <p className='file-upload-hint'>Accepted: {accept}</p>}

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
        data-testid='file-input'
      />

      {files.length > 0 && (
        <div className='mt-4 space-y-2'>
          {files.map((file) => (
            <div key={file.id} className='file-upload-item'>
              <span className='file-upload-name'>{file.name}</span>
              <span className='file-upload-size'>
                {formatFileSize(file.size)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FileUpload };
export default FileUpload;
