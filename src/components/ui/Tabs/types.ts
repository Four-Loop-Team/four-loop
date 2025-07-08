/**
 * Tabs component types and interfaces
 * @fileoverview Type definitions for the Tabs component system including tab items, props, and context types
 */

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Content of the tab */
  content: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon for the tab */
  icon?: React.ReactNode;
  /** Badge content to show in the tab */
  badge?: React.ReactNode;
  /** Whether the tab can be closed */
  closable?: boolean;
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Default active tab ID */
  defaultActiveTab?: string;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab variant */
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  /** Tab size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether tabs are centered */
  centered?: boolean;
  /** Whether tabs can be scrolled */
  scrollable?: boolean;
  /** Whether to lazy load tab content */
  lazy?: boolean;
  /** Whether to persist tab content when switching */
  keepAlive?: boolean;
  /** Function called when active tab changes */
  onChange?: (activeTab: string) => void;
  /** Function called when a tab is closed */
  onTabClose?: (tabId: string) => void;
  /** Function called when a new tab is added */
  onTabAdd?: () => void;
  /** Whether to show add tab button */
  showAddButton?: boolean;
  /** Add button content */
  addButtonContent?: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional class names for tab list */
  tabListClassName?: string;
  /** Additional class names for tab content */
  tabContentClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  scrollable?: boolean;
  'data-testid'?: string;
}

export interface TabProps {
  /** Tab item data */
  item: TabItem;
  /** Whether this tab is active */
  isActive: boolean;
  /** Function to call when tab is clicked */
  onClick: () => void;
  /** Function to call when tab is closed */
  onClose?: () => void;
  /** Tab variant */
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  /** Tab size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface TabPanelProps {
  /** Tab item data */
  item: TabItem;
  /** Whether this panel is active */
  isActive: boolean;
  /** Whether to lazy load content */
  lazy?: boolean;
  /** Whether to keep content alive when switching tabs */
  keepAlive?: boolean;
  /** Additional class names */
  className?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'pills' | 'underline' | 'cards';
  size: 'sm' | 'md' | 'lg';
}
