/**
 * @fileoverview RichTextEditor component exports
 * @component RichTextEditor
 *
 * @description
 * Export module for WYSIWYG rich text editor with toolbar configuration.
 * Provides comprehensive rich text editing capabilities with customizable toolbars and formatting options.
 *
 * @example
 * ```tsx
 * import { RichTextEditor } from '@/components/ui/RichTextEditor';
 * import type { ToolbarConfig } from '@/components/ui/RichTextEditor';
 *
 * <RichTextEditor
 *   value={content}
 *   onChange={setContent}
 *   placeholder="Start typing..."
 *   toolbar={['bold', 'italic', 'link']}
 * />
 * ```
 */

export { RichTextEditor, RichTextEditor as default } from './RichTextEditor';
export type { RichTextEditorProps, ToolbarConfig, ToolbarItem } from './types';
