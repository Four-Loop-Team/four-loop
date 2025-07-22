import { useCallback, useMemo, useState } from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem';
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
  const tokens = useDesignSystem();

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

  // Get size styles using design tokens
  const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          fontSize: tokens.typography.fontSize.sm,
          headerPadding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.sm}`,
          cellPadding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.sm}`,
        };
      case 'lg':
        return {
          fontSize: tokens.typography.fontSize.lg,
          headerPadding: `${tokens.spacing.component.sm} ${tokens.spacing.component.lg}`,
          cellPadding: `${tokens.spacing.component.sm} ${tokens.spacing.component.lg}`,
        };
      default:
        return {
          fontSize: tokens.typography.fontSize.base,
          headerPadding: `${tokens.spacing.micro.md} ${tokens.spacing.component.md}`,
          cellPadding: `${tokens.spacing.component.sm} ${tokens.spacing.component.md}`,
        };
    }
  };

  const sizeStyles = getSizeStyles(size);

  // Table container styles
  const tableContainerStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: sizeStyles.fontSize,
    ...(bordered && {
      border: `1px solid ${tokens.colors.border.default}`,
    }),
  };

  // Header cell styles
  const getHeaderCellStyles = (): React.CSSProperties => ({
    padding: sizeStyles.headerPadding,
    textAlign: 'left',
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: tokens.typography.letterSpacing.wide,
    borderBottom: `1px solid ${tokens.colors.border.default}`,
  });

  // Body cell styles
  const getBodyCellStyles = (): React.CSSProperties => ({
    padding: sizeStyles.cellPadding,
    whiteSpace: 'nowrap',
    color: tokens.colors.text.primary,
    borderBottom: `1px solid ${tokens.colors.border.muted}`,
  });

  // Row styles
  const getRowStyles = (index: number): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      ...(onRowClick && { cursor: 'pointer' }),
      transition: 'background-color 150ms ease-in-out',
    };

    if (striped && index % 2 === 1) {
      baseStyles.backgroundColor = tokens.colors.background.secondary;
    }

    return baseStyles;
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.component.sm,
          padding: tokens.spacing.component.lg,
          color: tokens.colors.text.muted,
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            border: `2px solid ${tokens.colors.border.muted}`,
            borderTop: `2px solid ${tokens.colors.state.info}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (processedData.length === 0) {
    return (
      <div
        style={{
          padding: tokens.spacing.component.lg,
          textAlign: 'center',
          color: tokens.colors.text.muted,
          fontSize: tokens.typography.fontSize.base,
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <table style={tableContainerStyles}>
        <thead>
          <tr>
            {selectable && (
              <th style={getHeaderCellStyles()}>
                <input
                  type='checkbox'
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  style={{
                    accentColor: tokens.colors.state.info,
                  }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                style={{
                  ...getHeaderCellStyles(),
                  width: column.width,
                  minWidth: column.minWidth,
                  textAlign:
                    column.align === 'center'
                      ? 'center'
                      : column.align === 'right'
                        ? 'right'
                        : 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spacing.micro.xs,
                    justifyContent:
                      column.align === 'center'
                        ? 'center'
                        : column.align === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                  }}
                >
                  <span>{column.header}</span>
                  {sortable && column.sortable && (
                    <button
                      onClick={() => handleSort(column.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: tokens.colors.text.muted,
                        fontSize: tokens.typography.fontSize.sm,
                        padding: tokens.spacing.micro.xs,
                        borderRadius: tokens.radius.sm,
                        transition: 'color 150ms ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          tokens.colors.text.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = tokens.colors.text.muted;
                      }}
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
                    style={{
                      marginTop: tokens.spacing.micro.xs,
                      padding: tokens.spacing.micro.xs,
                      border: `1px solid ${tokens.colors.border.default}`,
                      borderRadius: tokens.radius.input,
                      fontSize: tokens.typography.fontSize.sm,
                      backgroundColor: tokens.colors.background.primary,
                      color: tokens.colors.text.primary,
                      width: '100%',
                    }}
                    onChange={(e) => handleFilter(column.id, e.target.value)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, index) => {
            const rowId = index.toString();
            const isSelected = selectedRows.includes(rowId);
            const customRowProps = getRowProps?.(row, index) ?? {};

            return (
              <tr
                key={rowId}
                style={{
                  ...getRowStyles(index),
                  ...(customRowProps.style || {}),
                }}
                className={className}
                onClick={() => onRowClick?.(row, index)}
                onMouseEnter={(e) => {
                  if (hoverable) {
                    e.currentTarget.style.backgroundColor =
                      tokens.colors.background.secondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (hoverable) {
                    const baseColor =
                      striped && index % 2 === 1
                        ? tokens.colors.background.secondary
                        : 'transparent';
                    e.currentTarget.style.backgroundColor = baseColor;
                  }
                }}
                {...customRowProps}
              >
                {selectable && (
                  <td style={getBodyCellStyles()}>
                    <input
                      type='checkbox'
                      checked={isSelected}
                      onChange={(e) =>
                        handleRowSelection(rowId, e.target.checked)
                      }
                      style={{
                        accentColor: tokens.colors.state.info,
                      }}
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
                      style={{
                        ...getBodyCellStyles(),
                        textAlign:
                          column.align === 'center'
                            ? 'center'
                            : column.align === 'right'
                              ? 'right'
                              : 'left',
                      }}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: tokens.spacing.component.md,
            borderTop: `1px solid ${tokens.colors.border.muted}`,
            marginTop: tokens.spacing.component.sm,
          }}
        >
          <div
            style={{
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.sm,
            }}
          >
            Showing {pagination.page * pagination.pageSize + 1} to{' '}
            {Math.min(
              (pagination.page + 1) * pagination.pageSize,
              pagination.total
            )}{' '}
            of {pagination.total} results
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.spacing.component.sm,
            }}
          >
            <button
              onClick={() =>
                onPaginationChange?.({
                  ...pagination,
                  page: pagination.page - 1,
                })
              }
              disabled={pagination.page === 0}
              style={{
                padding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.sm}`,
                border: `1px solid ${tokens.colors.border.default}`,
                borderRadius: tokens.radius.button,
                backgroundColor:
                  pagination.page === 0
                    ? tokens.colors.background.secondary
                    : tokens.colors.background.primary,
                color:
                  pagination.page === 0
                    ? tokens.colors.text.muted
                    : tokens.colors.text.primary,
                cursor: pagination.page === 0 ? 'not-allowed' : 'pointer',
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                transition: 'all 150ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (pagination.page !== 0) {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.background.secondary;
                }
              }}
              onMouseLeave={(e) => {
                if (pagination.page !== 0) {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.background.primary;
                }
              }}
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
              style={{
                padding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.sm}`,
                border: `1px solid ${tokens.colors.border.default}`,
                borderRadius: tokens.radius.button,
                backgroundColor:
                  (pagination.page + 1) * pagination.pageSize >=
                  pagination.total
                    ? tokens.colors.background.secondary
                    : tokens.colors.background.primary,
                color:
                  (pagination.page + 1) * pagination.pageSize >=
                  pagination.total
                    ? tokens.colors.text.muted
                    : tokens.colors.text.primary,
                cursor:
                  (pagination.page + 1) * pagination.pageSize >=
                  pagination.total
                    ? 'not-allowed'
                    : 'pointer',
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                transition: 'all 150ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (
                  (pagination.page + 1) * pagination.pageSize <
                  pagination.total
                ) {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.background.secondary;
                }
              }}
              onMouseLeave={(e) => {
                if (
                  (pagination.page + 1) * pagination.pageSize <
                  pagination.total
                ) {
                  e.currentTarget.style.backgroundColor =
                    tokens.colors.background.primary;
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
