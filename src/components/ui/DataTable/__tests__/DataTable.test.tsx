import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from '../DataTable';
import { Column, PaginationConfig } from '../types';

interface TestUser extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age?: number;
  createdAt?: string;
}

const mockData: TestUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    age: 30,
    createdAt: '2023-01-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
    age: 25,
    createdAt: '2023-02-01',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Active',
    age: 35,
    createdAt: '2023-03-01',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Manager',
    status: 'Active',
    age: 28,
    createdAt: '2023-04-01',
  },
];

const mockColumns: Column<TestUser>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: 'email',
    sortable: true,
    filterable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessor: 'role',
    sortable: false,
    filterable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    filterable: false,
  },
  {
    id: 'age',
    header: 'Age',
    accessor: 'age',
    sortable: true,
    align: 'right' as const,
  },
];

describe('DataTable', () => {
  const defaultProps = {
    data: mockData,
    columns: mockColumns,
  };

  it('renders table with headers and data', () => {
    render(<DataTable<TestUser> {...defaultProps} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(3);
  });

  it('displays loading state', () => {
    render(<DataTable<TestUser> {...defaultProps} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<DataTable<TestUser> {...defaultProps} data={[]} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('displays custom empty message', () => {
    const customMessage = 'No users found in the system';
    render(
      <DataTable<TestUser>
        {...defaultProps}
        data={[]}
        emptyMessage={customMessage}
      />
    );
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  // Row Selection Tests
  describe('Row Selection', () => {
    it('renders selection checkboxes when selectable', () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(5); // 1 select all + 4 row checkboxes
    });

    it('handles individual row selection', async () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[1]); // First row checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['0']);
    });

    it('handles select all functionality', async () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      await userEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(['0', '1', '2', '3']);
    });

    it('shows correct select all state when all rows selected', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          selectedRows={['0', '1', '2', '3']}
          onSelectionChange={jest.fn()}
        />
      );

      const selectAllCheckbox = screen.getAllByRole(
        'checkbox'
      )[0] as HTMLInputElement;
      expect(selectAllCheckbox.checked).toBe(true);
    });

    it('deselects all when select all is unchecked', async () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          selectedRows={['0', '1', '2', '3']}
          onSelectionChange={onSelectionChange}
        />
      );

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      await userEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith([]);
    });

    it('handles deselecting individual rows', async () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          selectedRows={['0', '1']}
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[1]); // First row checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['1']);
    });

    it('ignores selection when not selectable', () => {
      const onSelectionChange = jest.fn();
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable={false}
          onSelectionChange={onSelectionChange}
        />
      );

      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
  });

  // Sorting Tests
  describe('Sorting', () => {
    it('handles sorting when enabled', async () => {
      const onSort = jest.fn();
      render(
        <DataTable<TestUser> {...defaultProps} sortable onSort={onSort} />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      const sortButton = nameHeader?.querySelector('button');
      expect(sortButton).toBeInTheDocument();

      if (sortButton) {
        await userEvent.click(sortButton);
        expect(onSort).toHaveBeenCalledWith({
          key: 'name',
          direction: 'asc',
        });
      }
    });

    it('toggles sort direction on repeated clicks', async () => {
      const onSort = jest.fn();
      render(
        <DataTable<TestUser> {...defaultProps} sortable onSort={onSort} />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      const sortButton = nameHeader?.querySelector('button');

      if (sortButton) {
        // First click - ascending
        await userEvent.click(sortButton);
        expect(onSort).toHaveBeenCalledWith({
          key: 'name',
          direction: 'asc',
        });

        // Second click - descending
        await userEvent.click(sortButton);
        expect(onSort).toHaveBeenCalledWith({
          key: 'name',
          direction: 'desc',
        });
      }
    });

    it('shows correct sort indicators', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          sortable
          defaultSort={{ key: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      const sortButton = nameHeader?.querySelector('button');
      expect(sortButton).toHaveTextContent('↑');
    });

    it('performs client-side sorting when no onSort handler', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          sortable
          defaultSort={{ key: 'name', direction: 'asc' }}
        />
      );

      const rows = screen.getAllByRole('row');
      // Skip header row, check data rows are sorted
      expect(rows[1]).toHaveTextContent('Alice Brown');
      expect(rows[2]).toHaveTextContent('Bob Johnson');
    });

    it('ignores sorting when not enabled', () => {
      render(<DataTable<TestUser> {...defaultProps} sortable={false} />);

      const nameHeader = screen.getByText('Name').closest('th');
      const sortButton = nameHeader?.querySelector('button');
      expect(sortButton).not.toBeInTheDocument();
    });

    it('only shows sort button for sortable columns', () => {
      render(<DataTable<TestUser> {...defaultProps} sortable />);

      const nameHeader = screen.getByText('Name').closest('th');
      const roleHeader = screen.getByText('Role').closest('th');

      expect(nameHeader?.querySelector('button')).toBeInTheDocument();
      expect(roleHeader?.querySelector('button')).not.toBeInTheDocument();
    });
  });

  // Filtering Tests
  describe('Filtering', () => {
    it('renders filter inputs for filterable columns', () => {
      render(<DataTable<TestUser> {...defaultProps} filterable />);

      const filterInputs = screen.getAllByPlaceholderText('Filter...');
      expect(filterInputs).toHaveLength(3); // name, email, role have filterable: true
    });

    it('calls onFilter when filter value changes', async () => {
      const onFilter = jest.fn();
      render(
        <DataTable<TestUser> {...defaultProps} filterable onFilter={onFilter} />
      );

      const nameFilterInput = screen.getAllByPlaceholderText('Filter...')[0];
      await userEvent.type(nameFilterInput, 'John');

      await waitFor(() => {
        expect(onFilter).toHaveBeenCalledWith([
          { key: 'name', value: 'John', type: 'text' },
        ]);
      });
    });

    it('performs client-side filtering when no onFilter handler', async () => {
      render(<DataTable<TestUser> {...defaultProps} filterable />);

      const nameFilterInput = screen.getAllByPlaceholderText('Filter...')[0];
      await userEvent.type(nameFilterInput, 'John');

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      });
    });

    it('clears filter when input is empty', async () => {
      const onFilter = jest.fn();
      render(
        <DataTable<TestUser> {...defaultProps} filterable onFilter={onFilter} />
      );

      const nameFilterInput = screen.getAllByPlaceholderText('Filter...')[0];
      await userEvent.type(nameFilterInput, 'John');
      await userEvent.clear(nameFilterInput);

      await waitFor(() => {
        expect(onFilter).toHaveBeenCalledWith([]);
      });
    });

    it('ignores filtering when not enabled', () => {
      render(<DataTable<TestUser> {...defaultProps} filterable={false} />);

      expect(
        screen.queryByPlaceholderText('Filter...')
      ).not.toBeInTheDocument();
    });
  });

  // Pagination Tests
  describe('Pagination', () => {
    const paginationConfig: PaginationConfig = {
      page: 0,
      pageSize: 2,
      total: 4,
    };

    it('renders pagination controls', () => {
      render(
        <DataTable<TestUser> {...defaultProps} pagination={paginationConfig} />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(
        screen.getByText('Showing 1 to 2 of 4 results')
      ).toBeInTheDocument();
    });

    it('disables Previous button on first page', () => {
      render(
        <DataTable<TestUser> {...defaultProps} pagination={paginationConfig} />
      );

      const prevButton = screen.getByText('Previous');
      expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      const lastPageConfig = { ...paginationConfig, page: 1 };
      render(
        <DataTable<TestUser> {...defaultProps} pagination={lastPageConfig} />
      );

      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('calls onPaginationChange when Previous clicked', async () => {
      const onPaginationChange = jest.fn();
      const secondPageConfig = { ...paginationConfig, page: 1 };

      render(
        <DataTable<TestUser>
          {...defaultProps}
          pagination={secondPageConfig}
          onPaginationChange={onPaginationChange}
        />
      );

      await userEvent.click(screen.getByText('Previous'));
      expect(onPaginationChange).toHaveBeenCalledWith({
        ...secondPageConfig,
        page: 0,
      });
    });

    it('calls onPaginationChange when Next clicked', async () => {
      const onPaginationChange = jest.fn();

      render(
        <DataTable<TestUser>
          {...defaultProps}
          pagination={paginationConfig}
          onPaginationChange={onPaginationChange}
        />
      );

      await userEvent.click(screen.getByText('Next'));
      expect(onPaginationChange).toHaveBeenCalledWith({
        ...paginationConfig,
        page: 1,
      });
    });

    it('calculates pagination text correctly', () => {
      const midPageConfig = { page: 1, pageSize: 2, total: 10 };
      render(
        <DataTable<TestUser> {...defaultProps} pagination={midPageConfig} />
      );

      expect(
        screen.getByText('Showing 3 to 4 of 10 results')
      ).toBeInTheDocument();
    });
  });

  // Custom Renderers and Props Tests
  describe('Custom Renderers and Props', () => {
    it('applies custom cell renderers', () => {
      const customColumns: Column<TestUser>[] = [
        {
          id: 'name',
          header: 'Name',
          accessor: 'name',
          cell: (value: unknown) => (
            <strong data-testid='custom-cell'>{String(value)}</strong>
          ),
        },
        ...mockColumns.slice(1),
      ];

      render(<DataTable<TestUser> data={mockData} columns={customColumns} />);

      const customCells = screen.getAllByTestId('custom-cell');
      expect(customCells[0].tagName).toBe('STRONG');
      expect(customCells[0]).toHaveTextContent('John Doe');
      expect(customCells).toHaveLength(4); // Should have one for each row
    });

    it('handles row click events', async () => {
      const onRowClick = jest.fn();
      render(<DataTable<TestUser> {...defaultProps} onRowClick={onRowClick} />);

      const firstRow = screen.getAllByRole('row')[1]; // Skip header row
      await userEvent.click(firstRow);

      expect(onRowClick).toHaveBeenCalledWith(mockData[0], 0);
    });

    it('applies custom row props', () => {
      const getRowProps = jest.fn((row: TestUser) => ({
        'data-testid': `row-${row.id}`,
        className: row.status === 'Active' ? 'active-row' : 'inactive-row',
      }));

      render(
        <DataTable<TestUser> {...defaultProps} getRowProps={getRowProps} />
      );

      expect(screen.getByTestId('row-1')).toHaveClass('active-row');
      expect(screen.getByTestId('row-2')).toHaveClass('inactive-row');
      expect(getRowProps).toHaveBeenCalledTimes(4);
    });

    it('renders columns without accessor using cell renderer', () => {
      const actionColumn: Column<TestUser> = {
        id: 'actions',
        header: 'Actions',
        cell: (_, row) => (
          <button data-testid={`action-${row.id}`}>Edit</button>
        ),
      };

      render(
        <DataTable<TestUser>
          data={mockData}
          columns={[...mockColumns, actionColumn]}
        />
      );

      expect(screen.getByTestId('action-1')).toBeInTheDocument();
      expect(screen.getAllByText('Edit')).toHaveLength(4); // One for each row
    });
  });

  // Styling and Layout Tests
  describe('Styling and Layout', () => {
    it('applies column alignment', () => {
      const alignedColumns: Column<TestUser>[] = [
        { id: 'name', header: 'Name', accessor: 'name', align: 'left' },
        { id: 'email', header: 'Email', accessor: 'email', align: 'center' },
        { id: 'age', header: 'Age', accessor: 'age', align: 'right' },
      ];

      render(<DataTable<TestUser> data={mockData} columns={alignedColumns} />);

      const centerHeader = screen.getByText('Email').closest('th');
      const rightHeader = screen.getByText('Age').closest('th');

      expect(centerHeader).toHaveClass('text-center');
      expect(rightHeader).toHaveClass('text-right');
    });

    it('applies column width specifications', () => {
      const columnsWithWidth: Column<TestUser>[] = [
        { id: 'name', header: 'Name', accessor: 'name', width: '200px' },
        { id: 'email', header: 'Email', accessor: 'email', minWidth: '150px' },
      ];

      render(
        <DataTable<TestUser> data={mockData} columns={columnsWithWidth} />
      );

      const nameColumn = screen.getByText('Name').closest('th');
      expect(nameColumn).toHaveStyle({ width: '200px' });
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <DataTable<TestUser> {...defaultProps} size='sm' />
      );

      let table = screen.getByRole('table');
      expect(table).toHaveClass('text-sm');

      rerender(<DataTable<TestUser> {...defaultProps} size='lg' />);
      table = screen.getByRole('table');
      expect(table).toHaveClass('text-lg');
    });

    it('applies styling props', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          bordered
          striped
          hoverable={false}
          className='custom-table'
        />
      );

      const table = screen.getByRole('table');
      expect(table).toHaveClass('custom-table');
      expect(table).toHaveClass('border');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper table structure', () => {
      render(<DataTable<TestUser> {...defaultProps} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders).toHaveLength(5); // 5 columns

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1); // Header + data rows
    });

    it('provides accessible sorting controls', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          sortable
          defaultSort={{ key: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      const sortButton = nameHeader?.querySelector('button');

      expect(sortButton).toBeInTheDocument();
      expect(sortButton).toHaveTextContent('↑'); // Should show ascending indicator
    });

    it('provides accessible checkbox controls', () => {
      render(
        <DataTable<TestUser>
          {...defaultProps}
          selectable
          onSelectionChange={jest.fn()}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('type', 'checkbox');
      });
    });
  });

  // Edge Cases and Error Handling
  describe('Edge Cases', () => {
    it('handles undefined/null cell values gracefully', () => {
      const dataWithNulls: TestUser[] = [
        {
          id: 1,
          name: 'Test',
          email: 'test@example.com',
          role: 'Admin',
          status: 'Active',
          // Test with undefined/null-like values in display
        } as TestUser,
      ];

      const columnsWithNulls: Column<TestUser>[] = [
        {
          id: 'name',
          header: 'Name',
          cell: () => null, // Cell returns null
        },
        {
          id: 'email',
          header: 'Email',
          cell: () => undefined, // Cell returns undefined
        },
      ];

      render(
        <DataTable<TestUser> data={dataWithNulls} columns={columnsWithNulls} />
      );

      // Should render empty strings for null/undefined values
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toBeInTheDocument(); // Row should still render
    });

    it('handles empty columns array', () => {
      render(<DataTable<TestUser> data={mockData} columns={[]} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      // Should only have header row with no columns
      const columnHeaders = screen.queryAllByRole('columnheader');
      expect(columnHeaders).toHaveLength(0);
    });

    it('handles missing accessor in column config', () => {
      const columnWithoutAccessor: Column<TestUser> = {
        id: 'custom',
        header: 'Custom',
        cell: () => 'Custom Value',
      };

      render(
        <DataTable<TestUser>
          data={mockData}
          columns={[columnWithoutAccessor]}
        />
      );

      expect(screen.getAllByText('Custom Value')).toHaveLength(4); // One for each row
    });

    it('handles complex sorting scenarios', () => {
      const mixedData: TestUser[] = [
        {
          id: 1,
          name: 'Alice',
          email: 'alice1@example.com',
          role: 'User',
          status: 'Active',
          age: 30,
        },
        {
          id: 2,
          name: 'Bob',
          email: 'bob@example.com',
          role: 'User',
          status: 'Active',
          age: 25,
        },
        {
          id: 3,
          name: 'Alice',
          email: 'alice2@example.com',
          role: 'Admin',
          status: 'Active',
          age: 35,
        }, // Same name, different age
      ];

      render(
        <DataTable<TestUser>
          data={mixedData}
          columns={[
            { id: 'name', header: 'Name', accessor: 'name', sortable: true },
            { id: 'age', header: 'Age', accessor: 'age', sortable: true },
          ]}
          sortable
          defaultSort={{ key: 'name', direction: 'asc' }}
        />
      );

      // Should handle sorting with duplicate values
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(4); // Header + 3 data rows
    });
  });
});
