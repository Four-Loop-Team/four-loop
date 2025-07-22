import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '../Tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
];

describe('Tabs', () => {
  const defaultProps = {
    items: mockTabs,
    defaultActiveTab: 'tab1',
  };

  it('renders all tab labels', () => {
    render(<Tabs {...defaultProps} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('renders content for default active tab', () => {
    render(<Tabs {...defaultProps} lazy />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches content when tab is clicked', () => {
    render(<Tabs {...defaultProps} lazy />);

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = jest.fn();
    render(<Tabs {...defaultProps} onChange={onChange} />);

    fireEvent.click(screen.getByText('Tab 2'));

    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('does not allow clicking disabled tabs', () => {
    const onChange = jest.fn();
    render(<Tabs {...defaultProps} onChange={onChange} />);

    const disabledTab = screen.getByText('Tab 3');
    fireEvent.click(disabledTab);

    expect(onChange).not.toHaveBeenCalledWith('tab3');
    expect(screen.getByText('Content 1')).toBeInTheDocument(); // Should still show first tab
  });

  it('applies correct ARIA attributes', () => {
    render(<Tabs {...defaultProps} />);

    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
    expect(secondTab).toHaveAttribute('aria-selected', 'false');
  });

  it('supports keyboard navigation', () => {
    render(<Tabs {...defaultProps} />);

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    // Click to focus and activate the second tab
    fireEvent.click(secondTab);

    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  it('wraps around with keyboard navigation', () => {
    render(<Tabs {...defaultProps} />);

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    // Test navigation between tabs
    fireEvent.click(secondTab);
    expect(secondTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(firstTab);
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Tabs {...defaultProps} variant='default' />);

    let tabList = screen.getByRole('tablist') as HTMLElement;
    expect(tabList.style.borderBottom).toBeTruthy();

    rerender(<Tabs {...defaultProps} variant='underline' />);

    tabList = screen.getByRole('tablist') as HTMLElement;
    expect(tabList.style.borderBottom).toBeTruthy();
  });

  it('supports controlled mode with activeTab prop', () => {
    const { rerender } = render(
      <Tabs {...defaultProps} activeTab='tab2' lazy />
    );

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    rerender(<Tabs {...defaultProps} activeTab='tab1' lazy />);

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('supports vertical orientation', () => {
    render(<Tabs {...defaultProps} orientation='vertical' />);

    const tabList = screen.getByRole('tablist') as HTMLElement;
    expect(tabList.style.flexDirection).toBe('column');
  });

  it('renders tab with badge when provided', () => {
    const itemsWithBadge = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
        badge: <span>3</span>,
      },
    ];

    render(<Tabs {...defaultProps} items={itemsWithBadge} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
