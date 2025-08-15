/**
 * Accordion component types and interfaces
 */

export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string;
  /** Trigger content (header) */
  trigger: React.ReactNode;
  /** Content to show when expanded */
  content: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is initially expanded */
  defaultExpanded?: boolean;
  /** Icon for the trigger */
  icon?: React.ReactNode;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Currently expanded item IDs (controlled) */
  expandedItems?: string[];
  /** Default expanded item IDs */
  defaultExpandedItems?: string[];
  /** Whether multiple items can be expanded at once */
  multiple?: boolean;
  /** Whether all items can be collapsed */
  collapsible?: boolean;
  /** Accordion variant */
  variant?: 'default' | 'bordered' | 'filled' | 'minimal';
  /** Accordion size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate transitions */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Function called when item expansion changes */
  onChange?: (expandedItems: string[]) => void;
  /** Function called when an item is expanded */
  onExpand?: (itemId: string) => void;
  /** Function called when an item is collapsed */
  onCollapse?: (itemId: string) => void;
  /** Additional class names */
  className?: string;
  /** Additional class names for items */
  itemClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface AccordionItemProps {
  /** Accordion item data */
  item: AccordionItem;
  /** Whether this item is expanded */
  isExpanded: boolean;
  /** Function to toggle item expansion */
  onToggle: () => void;
  /** MUI Accordion onChange handler */
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  /** Accordion variant */
  variant?: 'default' | 'bordered' | 'filled' | 'minimal';
  /** Accordion size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate transitions */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface CollapsibleProps {
  /** Content to show in the trigger */
  trigger: React.ReactNode;
  /** Content to show when expanded */
  children: React.ReactNode;
  /** Whether the collapsible is expanded (controlled) */
  isExpanded?: boolean;
  /** Whether the collapsible is initially expanded */
  defaultExpanded?: boolean;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
  /** Collapsible variant */
  variant?: 'default' | 'bordered' | 'filled' | 'minimal';
  /** Collapsible size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate transitions */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Function called when expansion changes */
  onChange?: (isExpanded: boolean) => void;
  /** Additional class names */
  className?: string;
  /** Additional class names for trigger */
  triggerClassName?: string;
  /** Additional class names for content */
  contentClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (itemId: string) => void;
  multiple: boolean;
  variant: 'default' | 'bordered' | 'filled' | 'minimal';
  size: 'sm' | 'md' | 'lg';
  animated: boolean;
  animationDuration: number;
}
