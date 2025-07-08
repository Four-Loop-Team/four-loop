/**
 * @fileoverview DataTable component exports
 * @component DataTable
 *
 * @description
 * Export module for DataTable component with sorting, filtering, and pagination functionality.
 * Provides comprehensive data table components with advanced features for data display and interaction.
 *
 * @example
 * ```tsx
 * import { DataTable } from '@/components/ui/DataTable';
 * import type { Column } from '@/components/ui/DataTable';
 *
 * const columns: Column[] = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'email', header: 'Email', filterable: true }
 * ];
 *
 * <DataTable
 *   data={tableData}
 *   columns={columns}
 *   pagination={{ pageSize: 10 }}
 *   onSort={handleSort}
 * />
 * ```
 */

export { DataTable } from './DataTable';
export type {
  Column,
  DataTableProps,
  FilterConfig,
  PaginationConfig,
  SortConfig,
} from './types';
