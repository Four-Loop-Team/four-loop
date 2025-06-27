/**
 * FileUpload component types and interfaces
 */

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  url?: string;
  error?: string;
  preview?: string; // For image files
}

export interface FileUploadProps {
  /** Accepted file types */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Whether to allow multiple file selection */
  multiple?: boolean;
  /** Whether drag and drop is enabled */
  dragAndDrop?: boolean;
  /** Upload handler function */
  onUpload?: (files: File[]) => Promise<UploadedFile[]> | void;
  /** File change handler */
  onChange?: (files: UploadedFile[]) => void;
  /** File remove handler */
  onRemove?: (fileId: string) => void;
  /** File preview click handler */
  onPreview?: (file: UploadedFile) => void;
  /** Upload progress handler */
  onProgress?: (fileId: string, progress: number) => void;
  /** Upload error handler */
  onError?: (fileId: string, error: string) => void;
  /** Upload success handler */
  onSuccess?: (fileId: string, response?: unknown) => void;
  /** Initial files */
  defaultFiles?: UploadedFile[];
  /** Component variant */
  variant?: 'default' | 'button' | 'avatar' | 'gallery';
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether component is disabled */
  disabled?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show upload progress */
  showProgress?: boolean;
  /** Whether to show file previews */
  showPreview?: boolean;
  /** Whether to allow file removal */
  allowRemove?: boolean;
  /** Custom file validation function */
  validateFile?: (file: File) => string | null;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}
