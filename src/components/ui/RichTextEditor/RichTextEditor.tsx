/**
 * RichTextEditor Component
 * A WYSIWYG rich text editor with formatting tools
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RichTextEditorProps } from './types';

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  readOnly = false,
  toolbar = { formatting: true, alignment: true, lists: true },
  height = 300,
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId = 'rich-text-editor',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(value);
  const [isFormatting, setIsFormatting] = useState(false);

  useEffect(() => {
    setContent(value);
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (!editorRef.current || readOnly || disabled) return;

    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  }, [onChange, readOnly, disabled]);

  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (disabled || readOnly) return;

      setIsFormatting(true);
      document.execCommand(command, false, value);
      setIsFormatting(false);

      // Focus back to editor and trigger change
      editorRef.current?.focus();
      handleInput();
    },
    [disabled, readOnly, handleInput]
  );

  const isCommandActive = (command: string): boolean => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  const ToolbarButton: React.FC<{
    command: string;
    value?: string;
    icon: string;
    title: string;
    active?: boolean;
  }> = ({ command, value, icon, title, active }) => (
    <button
      type='button'
      onClick={() => executeCommand(command, value)}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active || isCommandActive(command)
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={title}
      disabled={disabled}
      tabIndex={-1} // Prevent toolbar buttons from taking focus from editor
    >
      <span className='text-sm font-semibold'>{icon}</span>
    </button>
  );

  const renderToolbar = () => {
    if (!toolbar.formatting && !toolbar.alignment && !toolbar.lists) {
      return null;
    }

    return (
      <div className='border-b border-gray-200 p-2 flex gap-1 flex-wrap bg-gray-50 rounded-t-md'>
        {toolbar.formatting && (
          <>
            <ToolbarButton command='bold' icon='B' title='Bold' />
            <ToolbarButton command='italic' icon='I' title='Italic' />
            <ToolbarButton command='underline' icon='U' title='Underline' />
            <div className='w-px h-6 bg-gray-300 mx-1' />
          </>
        )}

        {toolbar.alignment && (
          <>
            <ToolbarButton command='justifyLeft' icon='⬅' title='Align Left' />
            <ToolbarButton
              command='justifyCenter'
              icon='⬌'
              title='Align Center'
            />
            <ToolbarButton
              command='justifyRight'
              icon='➡'
              title='Align Right'
            />
            <div className='w-px h-6 bg-gray-300 mx-1' />
          </>
        )}

        {toolbar.lists && (
          <>
            <ToolbarButton
              command='insertUnorderedList'
              icon='•'
              title='Bullet List'
            />
            <ToolbarButton
              command='insertOrderedList'
              icon='1.'
              title='Numbered List'
            />
            <div className='w-px h-6 bg-gray-300 mx-1' />
          </>
        )}

        <ToolbarButton command='undo' icon='↶' title='Undo' />
        <ToolbarButton command='redo' icon='↷' title='Redo' />
      </div>
    );
  };

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden ${className}`}
      data-testid={testId}
    >
      {renderToolbar()}

      <div
        ref={editorRef}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onBlur={handleInput}
        className={`p-3 outline-none overflow-auto ${
          disabled
            ? 'bg-gray-100 cursor-not-allowed'
            : readOnly
              ? 'bg-gray-50'
              : 'bg-white'
        }`}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          minHeight: '150px',
        }}
        role='textbox'
        aria-multiline='true'
        aria-label={ariaLabel ?? 'Rich text editor'}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Placeholder when empty */}
      {!content && !isFormatting && (
        <div
          className='absolute inset-3 pointer-events-none text-gray-400 select-none'
          style={{ top: toolbar ? '54px' : '12px' }}
        >
          {placeholder}
        </div>
      )}

      <style jsx>{`
        [contenteditable='true']:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable='true']:focus:before {
          content: '';
        }
      `}</style>
    </div>
  );
};

export { RichTextEditor };
export default RichTextEditor;
