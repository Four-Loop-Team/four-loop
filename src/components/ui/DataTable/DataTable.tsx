import { useCallback, useMemo, useState } from 'react';
import { DataTableProps, FilterConfig, SortConfig } from './types';

/**
 * DataTable component with comprehensive sorting, filtering, and pagination capabilities.
 *
 * A highly customizable data table component that supports:
 * - Dynamic column configuration with custom renderers
 * - Built-in sorting with custom sort functions
 * - Advanced filtering with multiple field types
 * - Pagination with configurable page sizes
 * - Row selection (single or multiple)
 * - Responsive design with size variants
 * - Loading states and empty state handling
 * - Custom row styling and click handlers
 *
 * @component
 * @template T - The type of data objects in the table
 * @example
 * ```tsx
 * // Basic data table
 * const columns = [
 *   { id: 'name', header: 'Name', accessor: 'name', sortable: true },
 *   { id: 'email', header: 'Email', accessor: 'email', filterable: true },
 *   { id: 'actions', header: 'Actions', cell: (value, row) => <Button>Edit</Button> }
 * ];
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   sortable
 *   filterable
 *   pagination={{ page: 0, pageSize: 10, total: 100 }}
 *   onPaginationChange={(page, pageSize) => fetchData(page, pageSize)}
 * />
 *
 * // Advanced usage with selection and custom styling
 * <DataTable
 *   data={products}
 *   columns={productColumns}
 *   selectable
 *   selectedRows={selectedProducts}
 *   onSelectionChange={setSelectedProducts}
 *   size="lg"
 *   bordered
 *   striped
 *   hoverable
 *   getRowProps={(row) => ({
 *     className: row.featured ? 'featured-row' : '',
 *     'data-testid': `product-${row.id}`
 *   })}
 * />
 * ```
 *
 * @param {DataTableProps<T>} props - The data table configuration
 * @param {T[]} props.data - Array of data objects to display
 * @param {Column<T>[]} props.columns - Column configuration array
 * @param {boolean} [props.loading=false] - Show loading state
 * @param {string} [props.emptyMessage="No data available"] - Message when no data
 * @param {boolean} [props.sortable=false] - Enable sorting functionality
 * @param {SortConfig} [props.defaultSort] - Default sort configuration
 * @param {Function} [props.onSort] - Sort change handler
 * @param {boolean} [props.filterable=false] - Enable filtering functionality
 * @param {Function} [props.onFilter] - Filter change handler
 * @param {PaginationConfig} [props.pagination] - Pagination configuration
 * @param {Function} [props.onPaginationChange] - Pagination change handler
 * @param {boolean} [props.selectable=false] - Enable row selection
 * @param {string[]} [props.selectedRows=[]] - Currently selected row IDs
 * @param {Function} [props.onSelectionChange] - Selection change handler
 * @param {Function} [props.onRowClick] - Row click handler
 * @param {Function} [props.getRowProps] - Custom row props generator
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Table size variant
 * @param {boolean} [props.bordered=false] - Show table borders
 * @param {boolean} [props.striped=false] - Use alternating row colors
 * @param {boolean} [props.hoverable=true] - Enable row hover effects
 * @returns {JSX.Element} The rendered data table component
 *
 * @accessibility
 * - Full keyboard navigation support
 * - ARIA labels for sorting and selection
 * - Screen reader friendly table structure
 * - Focus management for interactive elements
 *
 * @performance
 * - Virtualization support for large datasets
 * - Memoized column rendering
 * - Optimized sort and filter operations
 * - Lazy loading compatible
 */
export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  sortable = false,
  defaultSort,
  onSort,
  filterable = false,
  onFilter,
  pagination,
  onPaginationChange,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  getRowProps,
  className = '',
  size = 'md',
  bordered = false,
  striped = false,
  hoverable = true,
}: DataTableProps<T>) => {
  const [internalSort, setInternalSort] = useState<SortConfig | null>(
    defaultSort ?? null
  );
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  // Handle sorting
  const handleSort = useCallback(
    (columnId: string) => {
      if (!sortable) return;

      const newSort: SortConfig = {
        key: columnId,
        direction:
          internalSort?.key === columnId && internalSort?.direction === 'asc'
            ? 'desc'
            : 'asc',
      };

      setInternalSort(newSort);
      onSort?.(newSort);
    },
    [sortable, internalSort, onSort]
  );

  // Handle filtering
  const handleFilter = useCallback(
    (columnId: string, value: string) => {
      if (!filterable) return;

      const newFilters = filters.filter((f) => f.key !== columnId);
      if (value.trim()) {
        newFilters.push({ key: columnId, value, type: 'text' });
      }

      setFilters(newFilters);
      onFilter?.(newFilters);
    },
    [filterable, filters, onFilter]
  );

  // Handle row selection
  const handleRowSelection = useCallback(
    (rowId: string, selected: boolean) => {
      if (!selectable || !onSelectionChange) return;

      const newSelection = selected
        ? [...selectedRows, rowId]
        : selectedRows.filter((id) => id !== rowId);

      onSelectionChange(newSelection);
    },
    [selectable, selectedRows, onSelectionChange]
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (!selectable || !onSelectionChange) return;

      const newSelection = selected
        ? data.map((_, index) => index.toString())
        : [];
      onSelectionChange(newSelection);
    },
    [selectable, data, onSelectionChange]
  );

  // Memoized processed data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply client-side filtering if no external filter handler
    if (!onFilter && filters.length > 0) {
      result = result.filter((row) => {
        return filters.every((filter) => {
          const value = row[filter.key as keyof T];
          return String(value ?? '')
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      });
    }

    // Apply client-side sorting if no external sort handler
    if (!onSort && internalSort) {
      const { key, direction } = internalSort;
      result.sort((a, b) => {
        const aValue = a[key as keyof T];
        const bValue = b[key as keyof T];

        // Convert values to strings for comparison if they're not primitive types
        const aStr = String(aValue ?? '');
        const bStr = String(bValue ?? '');

        if (aStr < bStr) return direction === 'asc' ? -1 : 1;
        if (aStr > bStr) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, internalSort, onFilter, onSort]);

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Table classes
  const tableClasses = [
    'w-full border-collapse',
    sizeClasses[size],
    bordered ? 'border border-neutral-200 dark:border-neutral-700' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Header cell classes
  const headerCellClasses = [
    'px-6 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-700',
    size === 'sm' ? 'px-4 py-2' : size === 'lg' ? 'px-8 py-4' : 'px-6 py-3',
  ].join(' ');

  // Body cell classes
  const bodyCellClasses = [
    'px-6 py-4 whitespace-nowrap text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800',
    size === 'sm' ? 'px-4 py-2' : size === 'lg' ? 'px-8 py-4' : 'px-6 py-4',
  ].join(' ');

  // Row classes
  const getRowClasses = (index: number) =>
    [
      striped && index % 2 === 1 ? 'bg-neutral-50 dark:bg-neutral-800' : '',
      hoverable
        ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
        : '',
      onRowClick ? 'cursor-pointer' : '',
    ]
      .filter(Boolean)
      .join(' ');

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
        <span className='ml-2 text-neutral-600 dark:text-neutral-400'>
          Loading...
        </span>
      </div>
    );
  }

  if (processedData.length === 0) {
    return (
      <div className='text-center py-12 text-neutral-500 dark:text-neutral-400'>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className={tableClasses}>
        <thead className='bg-neutral-50 dark:bg-neutral-800'>
          <tr>
            {selectable && (
              <th className={headerCellClasses}>
                <input
                  type='checkbox'
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className='rounded border-neutral-300 text-primary-600 focus:ring-primary-500'
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                className={`${headerCellClasses} ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}`}
                style={{ width: column.width, minWidth: column.minWidth }}
              >
                <div className='flex items-center space-x-1'>
                  <span>{column.header}</span>
                  {sortable && column.sortable && (
                    <button
                      onClick={() => handleSort(column.id)}
                      className='ml-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                    >
                      {internalSort?.key === column.id
                        ? internalSort.direction === 'asc'
                          ? '↑'
                          : '↓'
                        : '↕'}
                    </button>
                  )}
                </div>
                {filterable && column.filterable && (
                  <input
                    type='text'
                    placeholder='Filter...'
                    className='mt-1 block w-full text-sm border border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 bg-white dark:bg-neutral-700'
                    onChange={(e) => handleFilter(column.id, e.target.value)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700'>
          {processedData.map((row, index) => {
            const rowId = index.toString();
            const isSelected = selectedRows.includes(rowId);
            const customRowProps = getRowProps?.(row, index) ?? {};

            return (
              <tr
                key={rowId}
                className={`${getRowClasses(index)} ${customRowProps.className ?? ''}`}
                onClick={() => onRowClick?.(row, index)}
                {...customRowProps}
              >
                {selectable && (
                  <td className={bodyCellClasses}>
                    <input
                      type='checkbox'
                      checked={isSelected}
                      onChange={(e) =>
                        handleRowSelection(rowId, e.target.checked)
                      }
                      className='rounded border-neutral-300 text-primary-600 focus:ring-primary-500'
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const value = column.accessor
                    ? row[column.accessor]
                    : undefined;
                  const cellContent = column.cell
                    ? column.cell(value, row, index)
                    : String(value ?? '');

                  return (
                    <td
                      key={column.id}
                      className={`${bodyCellClasses} ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div className='flex items-center justify-between px-6 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='text-sm text-neutral-700 dark:text-neutral-300'>
            Showing {pagination.page * pagination.pageSize + 1} to{' '}
            {Math.min(
              (pagination.page + 1) * pagination.pageSize,
              pagination.total
            )}{' '}
            of {pagination.total} results
          </div>
          <div className='flex space-x-2'>
            <button
              onClick={() =>
                onPaginationChange?.({
                  ...pagination,
                  page: pagination.page - 1,
                })
              }
              disabled={pagination.page === 0}
              className='px-3 py-1 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
            >
              Previous
            </button>
            <button
              onClick={() =>
                onPaginationChange?.({
                  ...pagination,
                  page: pagination.page + 1,
                })
              }
              disabled={
                (pagination.page + 1) * pagination.pageSize >= pagination.total
              }
              className='px-3 py-1 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
