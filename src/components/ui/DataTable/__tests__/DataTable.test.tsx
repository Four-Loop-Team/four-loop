import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { DataTable } from '../DataTable';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Active',
  },
];

const mockColumns = [
  { id: 'name', header: 'Name', accessor: 'name' as const, sortable: true },
  { id: 'email', header: 'Email', accessor: 'email' as const, sortable: true },
  { id: 'role', header: 'Role', accessor: 'role' as const, sortable: false },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status' as const,
    sortable: true,
  },
];

describe('DataTable', () => {
  const defaultProps = {
    data: mockData,
    columns: mockColumns,
  };

  it('renders table with headers and data', () => {
    render(<DataTable {...defaultProps} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(2);
  });

  it('displays loading state', () => {
    render(<DataTable {...defaultProps} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<DataTable {...defaultProps} data={[]} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('handles row selection', () => {
    const onSelectionChange = jest.fn();
    render(
      <DataTable
        {...defaultProps}
        selectable
        onSelectionChange={onSelectionChange}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // Click first row checkbox
    fireEvent.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('handles sorting', () => {
    const onSort = jest.fn();
    const sortableColumns = [
      { id: 'name', header: 'Name', accessor: 'name' as const, sortable: true },
      { id: 'email', header: 'Email', accessor: 'email' as const },
    ];

    render(
      <DataTable
        data={mockData}
        columns={sortableColumns}
        sortable
        onSort={onSort}
      />
    );

    const nameHeader = screen.getByText('Name').closest('th');
    const sortButton = nameHeader?.querySelector('button');
    expect(sortButton).toBeInTheDocument();

    if (sortButton) {
      fireEvent.click(sortButton);
      expect(onSort).toHaveBeenCalled();
    }
  });

  it('handles pagination', () => {
    const pagination = {
      page: 0,
      pageSize: 2,
      total: 3,
    };

    render(<DataTable {...defaultProps} pagination={pagination} />);

    // Check that pagination controls are rendered
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/Showing 1 to 2 of 3 results/)).toBeInTheDocument();
  });

  it('applies custom cell renderers', () => {
    const customColumns = [
      {
        id: 'name',
        header: 'Name',
        accessor: 'name' as const,
        cell: (value: unknown) => <strong>{String(value)}</strong>,
      },
      ...mockColumns.slice(1),
    ];

    render(<DataTable data={mockData} columns={customColumns} />);

    const strongElement = screen.getByText('John Doe');
    expect(strongElement.tagName).toBe('STRONG');
  });

  it('applies correct accessibility attributes', () => {
    render(<DataTable {...defaultProps} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(4);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0); // At least header row
  });

  it('handles empty state with custom message', () => {
    const customEmptyMessage = 'No users found';
    render(
      <DataTable
        {...defaultProps}
        data={[]}
        emptyMessage={customEmptyMessage}
      />
    );

    expect(screen.getByText(customEmptyMessage)).toBeInTheDocument();
  });

  it('applies column alignment', () => {
    const alignedColumns = [
      {
        id: 'name',
        header: 'Name',
        accessor: 'name' as const,
        align: 'left' as const,
      },
      {
        id: 'email',
        header: 'Email',
        accessor: 'email' as const,
        align: 'center' as const,
      },
      {
        id: 'role',
        header: 'Role',
        accessor: 'role' as const,
        align: 'right' as const,
      },
    ];

    render(<DataTable data={mockData} columns={alignedColumns} />);

    const centerHeader = screen.getByText('Email').closest('th');
    expect(centerHeader).toHaveClass('text-center');
  });

  it('handles column width specifications', () => {
    const columnsWithWidth = [
      { id: 'name', header: 'Name', accessor: 'name' as const, width: '200px' },
      {
        id: 'email',
        header: 'Email',
        accessor: 'email' as const,
        minWidth: '150px',
      },
    ];

    render(<DataTable data={mockData} columns={columnsWithWidth} />);

    const nameColumn = screen.getByText('Name').closest('th');
    expect(nameColumn).toHaveStyle({ width: '200px' });
  });

  it('shows sort indicators for sortable columns', () => {
    const sortableColumns = [
      { id: 'name', header: 'Name', accessor: 'name' as const, sortable: true },
      { id: 'email', header: 'Email', accessor: 'email' as const },
    ];

    render(<DataTable data={mockData} columns={sortableColumns} sortable />);

    const nameHeader = screen.getByText('Name').closest('th');
    const sortButton = nameHeader?.querySelector('button');
    expect(sortButton).toBeInTheDocument();
    expect(sortButton).toHaveTextContent('↕');
  });
});
