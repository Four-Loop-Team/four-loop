/**
 * Timeline component types and interfaces
 */

export interface TimelineItem {
  /** Unique identifier for the timeline item */
  id: string;
  /** Title of the timeline item */
  title: string;
  /** Description/content of the timeline item */
  description?: string;
  /** Content to render (takes precedence over description) */
  content?: React.ReactNode;
  /** Timestamp for the item */
  timestamp: Date | string;
  /** Timeline item type/category */
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Custom icon for the item */
  icon?: React.ReactNode;
  /** Whether the item is highlighted/active */
  highlighted?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Custom action buttons */
  actions?: TimelineAction[];
}

export interface TimelineAction {
  /** Action label */
  label: string;
  /** Action handler */
  onClick: () => void;
  /** Action variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Action icon */
  icon?: React.ReactNode;
}

export interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Timeline orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Timeline variant */
  variant?: 'default' | 'minimal' | 'detailed';
  /** Timeline size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show timestamps */
  showTimestamps?: boolean;
  /** Timestamp format function */
  formatTimestamp?: (timestamp: Date | string) => string;
  /** Whether to show connecting lines */
  showConnectors?: boolean;
  /** Whether to reverse the order of items */
  reverse?: boolean;
  /** Whether timeline is loading */
  loading?: boolean;
  /** Loading message */
  loadingMessage?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Function called when an item is clicked */
  onItemClick?: (item: TimelineItem) => void;
  /** Custom item renderer */
  itemRenderer?: (item: TimelineItem, index: number) => React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional class names for items */
  itemClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface TimelineItemProps {
  /** Timeline item data */
  item: TimelineItem;
  /** Item index in the timeline */
  index: number;
  /** Whether this is the last item */
  isLast: boolean;
  /** Timeline orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Timeline variant */
  variant?: 'default' | 'minimal' | 'detailed';
  /** Timeline size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show timestamp */
  showTimestamp?: boolean;
  /** Timestamp format function */
  formatTimestamp?: (timestamp: Date | string) => string;
  /** Whether to show connector line */
  showConnector?: boolean;
  /** Function called when item is clicked */
  onClick?: (item: TimelineItem) => void;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}
