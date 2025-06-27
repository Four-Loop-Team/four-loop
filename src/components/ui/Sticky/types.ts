/**
 * Sticky component types and interfaces
 */

export interface StickyProps {
  /** Sticky positioning */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Offset from edge */
  offset?: number | string;
  /** Z-index for layering */
  zIndex?: number;
  /** Whether to use fixed positioning instead of sticky */
  fixed?: boolean;
  /** Breakpoint for responsive behavior */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom CSS classes */
  className?: string;
  /** Children to render */
  children: React.ReactNode;
  /** Test ID */
  'data-testid'?: string;
}

export interface StickyHeaderProps extends Omit<StickyProps, 'position'> {
  /** Header height */
  height?: number | string;
  /** Background color */
  background?: string;
  /** Whether to show shadow when stuck */
  showShadow?: boolean;
}

export interface StickySidebarProps extends Omit<StickyProps, 'position'> {
  /** Sidebar width */
  width?: number | string;
  /** Which side to stick to */
  side?: 'left' | 'right';
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Whether sidebar is initially collapsed */
  defaultCollapsed?: boolean;
  /** Collapse state change handler */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface StickyFloatingProps extends Omit<StickyProps, 'position'> {
  /** Float position */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Whether element is draggable */
  draggable?: boolean;
  /** Drag position change handler */
  onPositionChange?: (x: number, y: number) => void;
}
