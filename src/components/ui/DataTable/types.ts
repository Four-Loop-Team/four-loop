/**
 * DataTable component types and interfaces
 */

export interface Column<T = Record<string, unknown>> {
  /** Unique identifier for the column */
  id: string;
  /** Display header text */
  header: string;
  /** Key to access data from row object */
  accessor?: keyof T;
  /** Custom cell renderer function */
  cell?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Column width (CSS value) */
  width?: string;
  /** Column minimum width */
  minWidth?: string;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sticky */
  sticky?: 'left' | 'right';
}

export interface SortConfig {
  /** Column ID to sort by */
  key: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  /** Column ID to filter */
  key: string;
  /** Filter value */
  value: string;
  /** Filter type */
  type: 'text' | 'select' | 'date' | 'number';
}

export interface PaginationConfig {
  /** Current page (0-indexed) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
}

export interface DataTableProps<T = Record<string, unknown>> {
  /** Table data */
  data: T[];
  /** Column configuration */
  columns: Column<T>[];
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether table is sortable */
  sortable?: boolean;
  /** Initial sort configuration */
  defaultSort?: SortConfig;
  /** Sort change handler */
  onSort?: (sort: SortConfig) => void;
  /** Whether table is filterable */
  filterable?: boolean;
  /** Filter change handler */
  onFilter?: (filters: FilterConfig[]) => void;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Pagination change handler */
  onPaginationChange?: (pagination: PaginationConfig) => void;
  /** Row selection */
  selectable?: boolean;
  /** Selected row IDs */
  selectedRows?: string[];
  /** Row selection change handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Custom row props */
  getRowProps?: (
    row: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  /** Table container class */
  className?: string;
  /** Table size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether table has borders */
  bordered?: boolean;
  /** Whether table has striped rows */
  striped?: boolean;
  /** Whether table is hoverable */
  hoverable?: boolean;
}
