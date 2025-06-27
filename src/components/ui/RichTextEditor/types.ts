/**
 * RichTextEditor component types and interfaces
 */

import React from 'react';

export interface RichTextEditorProps {
  /** Editor content value */
  value?: string;
  /** Content change handler */
  onChange?: (content: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether editor is disabled */
  disabled?: boolean;
  /** Whether editor is read-only */
  readOnly?: boolean;
  /** Toolbar configuration */
  toolbar?: ToolbarConfig;
  /** Editor height */
  height?: number | string;
  /** Custom CSS classes */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** Test ID */
  'data-testid'?: string;
}

export interface ToolbarConfig {
  /** Show formatting options */
  formatting?: boolean;
  /** Show text alignment options */
  alignment?: boolean;
  /** Show list options */
  lists?: boolean;
  /** Show link options */
  links?: boolean;
  /** Show media options */
  media?: boolean;
  /** Show code options */
  code?: boolean;
  /** Custom toolbar items */
  custom?: ToolbarItem[];
}

export interface ToolbarItem {
  /** Item ID */
  id: string;
  /** Item label */
  label: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Whether item is active */
  active?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
}
