/**
 * FileUpload Component
 * A simple file upload component with basic functionality
 */

import React, { ChangeEvent, useRef, useState } from 'react';
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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
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

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div onClick={openFileDialog}>
        <svg
          className='mx-auto h-12 w-12 text-gray-400 mb-4'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
        <p className='text-gray-600'>{placeholder}</p>
        {accept && (
          <p className='text-xs text-gray-500 mt-1'>Accepted: {accept}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
        data-testid={testId}
      />

      {files.length > 0 && (
        <div className='mt-4 space-y-2'>
          {files.map((file) => (
            <div
              key={file.id}
              className='flex items-center justify-between p-2 bg-gray-50 rounded'
            >
              <span className='text-sm text-gray-700'>{file.name}</span>
              <span className='text-xs text-green-600'>{file.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FileUpload };
export default FileUpload;
