import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timeline } from '../ui/Timeline/Timeline';
import { TimelineItem } from '../ui/Timeline/types';

describe('Timeline', () => {
  const mockItems: TimelineItem[] = [
    {
      id: '1',
      title: 'Event 1',
      timestamp: new Date('2024-01-01T10:00:00'),
      description: 'First event description',
      type: 'success',
    },
    {
      id: '2',
      title: 'Event 2',
      timestamp: new Date('2024-01-02T14:30:00'),
      description: 'Second event description',
      type: 'warning',
    },
    {
      id: '3',
      title: 'Event 3',
      timestamp: new Date('2024-01-03T09:15:00'),
      content: <span>Custom content element</span>,
      type: 'error',
      highlighted: true,
    },
  ];

  const defaultProps = {
    items: mockItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(<Timeline {...defaultProps} />);
      expect(screen.getByTestId('timeline')).toBeInTheDocument();
    });

    it('should render timeline items with correct titles', () => {
      render(<Timeline {...defaultProps} />);
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
      expect(screen.getByText('Event 3')).toBeInTheDocument();
    });

    it('should render descriptions when provided', () => {
      render(<Timeline {...defaultProps} />);
      expect(screen.getByText('First event description')).toBeInTheDocument();
      expect(screen.getByText('Second event description')).toBeInTheDocument();
    });

    it('should render custom content over description', () => {
      render(<Timeline {...defaultProps} />);
      expect(screen.getByText('Custom content element')).toBeInTheDocument();
      expect(screen.queryByText('Event 3 description')).not.toBeInTheDocument();
    });

    it('should display timestamps by default', () => {
      render(<Timeline {...defaultProps} />);
      expect(screen.getByText(/Jan 1, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/Jan 2, 2024/)).toBeInTheDocument();
    });
  });

  describe('Empty and Loading States', () => {
    it('should handle empty items array', () => {
      render(<Timeline items={[]} />);
      expect(screen.getByTestId('timeline-empty')).toBeInTheDocument();
      expect(
        screen.getByText('No timeline items to display')
      ).toBeInTheDocument();
    });

    it('should display custom empty message', () => {
      const customMessage = 'No events found';
      render(<Timeline items={[]} emptyMessage={customMessage} />);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('should display loading state', () => {
      render(<Timeline items={[]} loading={true} />);
      expect(screen.getByTestId('timeline-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading timeline...')).toBeInTheDocument();
    });

    it('should display custom loading message', () => {
      const customMessage = 'Fetching events...';
      render(
        <Timeline items={[]} loading={true} loadingMessage={customMessage} />
      );
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Orientations', () => {
    it('should render in vertical orientation by default', () => {
      const { container } = render(<Timeline {...defaultProps} />);
      const timeline = container.querySelector(
        '[data-testid="timeline"]'
      ) as HTMLElement;
      expect(timeline.style.display).toBe('flex');
      expect(timeline.style.flexDirection).toBe('column');
    });

    it('should render in horizontal orientation when specified', () => {
      const { container } = render(
        <Timeline {...defaultProps} orientation='horizontal' />
      );
      const timeline = container.querySelector(
        '[data-testid="timeline"]'
      ) as HTMLElement;
      expect(timeline.style.display).toBe('flex');
      expect(timeline.style.flexDirection).toBe('row');
      expect(timeline.style.overflowX).toBe('auto');
    });
  });

  describe('Variants and Sizes', () => {
    it('should apply minimal variant classes', () => {
      const { container } = render(
        <Timeline {...defaultProps} variant='minimal' />
      );
      const timeline = container.querySelector(
        '[data-testid="timeline"]'
      ) as HTMLElement;
      expect(timeline).toBeTruthy();
      // Minimal variant should have smaller gap spacing
      expect(timeline.style.gap).toBeTruthy();
    });

    it('should apply detailed variant classes', () => {
      const { container } = render(
        <Timeline {...defaultProps} variant='detailed' />
      );
      const timeline = container.querySelector(
        '[data-testid="timeline"]'
      ) as HTMLElement;
      expect(timeline).toBeTruthy();
      // Detailed variant should have larger gap spacing
      expect(timeline.style.gap).toBeTruthy();
    });

    it('should render with different sizes', () => {
      const { rerender } = render(<Timeline {...defaultProps} size='sm' />);
      expect(screen.getByTestId('timeline')).toBeInTheDocument();

      rerender(<Timeline {...defaultProps} size='lg' />);
      expect(screen.getByTestId('timeline')).toBeInTheDocument();
    });
  });

  describe('Timestamps', () => {
    it('should hide timestamps when showTimestamps is false', () => {
      render(<Timeline {...defaultProps} showTimestamps={false} />);
      expect(screen.queryByText(/Jan 1, 2024/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Jan 2, 2024/)).not.toBeInTheDocument();
    });

    it('should use custom timestamp formatter', () => {
      const customFormatter = (timestamp: Date | string) => {
        const date =
          typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      };

      render(<Timeline {...defaultProps} formatTimestamp={customFormatter} />);
      expect(screen.getByText('2024-01-01')).toBeInTheDocument();
      expect(screen.getByText('2024-01-02')).toBeInTheDocument();
    });

    it('should handle string timestamps', () => {
      const itemsWithStringTimestamps = [
        {
          id: '1',
          title: 'String Event',
          timestamp: '2024-01-01T10:00:00Z',
          description: 'Event with string timestamp',
        },
      ];

      render(<Timeline items={itemsWithStringTimestamps} />);
      expect(screen.getByText('String Event')).toBeInTheDocument();
    });
  });

  describe('Item Types and Icons', () => {
    it('should render different item types with appropriate icons', () => {
      const itemsWithTypes = [
        { ...mockItems[0], type: 'success' as const },
        { ...mockItems[1], type: 'error' as const },
        {
          id: '4',
          title: 'Info',
          timestamp: new Date(),
          type: 'info' as const,
        },
        {
          id: '5',
          title: 'Warning',
          timestamp: new Date(),
          type: 'warning' as const,
        },
      ];

      render(<Timeline items={itemsWithTypes} />);
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('should render custom icons when provided', () => {
      const itemsWithCustomIcon = [
        {
          id: '1',
          title: 'Custom Icon Event',
          timestamp: new Date(),
          icon: <span data-testid='custom-icon'>🎉</span>,
        },
      ];

      render(<Timeline items={itemsWithCustomIcon} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should handle highlighted items', () => {
      const highlightedItem = [
        {
          id: '1',
          title: 'Highlighted Event',
          timestamp: new Date(),
          highlighted: true,
        },
      ];

      render(<Timeline items={highlightedItem} />);
      expect(screen.getByText('Highlighted Event')).toBeInTheDocument();
    });
  });

  describe('Sorting and Reverse', () => {
    it('should sort items by timestamp (latest first by default)', () => {
      const unsortedItems = [
        { id: '1', title: 'Middle', timestamp: new Date('2024-01-02') },
        { id: '2', title: 'Latest', timestamp: new Date('2024-01-03') },
        { id: '3', title: 'Earliest', timestamp: new Date('2024-01-01') },
      ];

      const { container } = render(<Timeline items={unsortedItems} />);
      const titles = container.querySelectorAll('h3');
      expect(titles[0]).toHaveTextContent('Latest');
      expect(titles[1]).toHaveTextContent('Middle');
      expect(titles[2]).toHaveTextContent('Earliest');
    });

    it('should reverse order when reverse prop is true', () => {
      const items = [
        { id: '1', title: 'First', timestamp: new Date('2024-01-01') },
        { id: '2', title: 'Second', timestamp: new Date('2024-01-02') },
      ];

      const { container } = render(<Timeline items={items} reverse={true} />);
      const titles = container.querySelectorAll('h3');
      expect(titles[0]).toHaveTextContent('First');
      expect(titles[1]).toHaveTextContent('Second');
    });
  });

  describe('Connectors', () => {
    it('should show connectors by default', () => {
      const { container } = render(<Timeline {...defaultProps} />);
      // Connectors should be present (lines connecting timeline items)
      expect(
        container.querySelector('.timeline-connector') ??
          container.querySelector('.timeline-connector-compact')
      ).toBeInTheDocument();
    });

    it('should hide connectors when showConnectors is false', () => {
      const { container } = render(
        <Timeline {...defaultProps} showConnectors={false} />
      );
      // Should not find connector lines
      expect(
        container.querySelector('.timeline-connector')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.timeline-connector-compact')
      ).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onItemClick when item is clicked', async () => {
      const onItemClick = jest.fn();
      const user = userEvent.setup();

      render(<Timeline {...defaultProps} onItemClick={onItemClick} />);

      const firstItem = screen.getByTestId('timeline-item-1');
      await user.click(firstItem);

      expect(onItemClick).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should make items visually clickable when onItemClick is provided', () => {
      render(<Timeline {...defaultProps} onItemClick={() => {}} />);
      const firstItem = screen.getByTestId('timeline-item-1') as HTMLElement;
      expect(firstItem.style.cursor).toBe('pointer');
    });

    it('should not make items clickable when onItemClick is not provided', () => {
      render(<Timeline {...defaultProps} />);
      const firstItem = screen.getByTestId('timeline-item-1');
      expect(firstItem).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Actions', () => {
    it('should render and handle action buttons', async () => {
      const primaryAction = jest.fn();
      const secondaryAction = jest.fn();
      const user = userEvent.setup();

      const itemsWithActions = [
        {
          id: '1',
          title: 'Event with Actions',
          timestamp: new Date(),
          actions: [
            {
              label: 'Primary',
              onClick: primaryAction,
              variant: 'primary' as const,
            },
            {
              label: 'Secondary',
              onClick: secondaryAction,
              variant: 'secondary' as const,
            },
          ],
        },
      ];

      render(<Timeline items={itemsWithActions} />);

      const primaryButton = screen.getByText('Primary');
      const secondaryButton = screen.getByText('Secondary');

      expect(primaryButton).toBeInTheDocument();
      expect(secondaryButton).toBeInTheDocument();

      await user.click(primaryButton);
      await user.click(secondaryButton);

      expect(primaryAction).toHaveBeenCalled();
      expect(secondaryAction).toHaveBeenCalled();
    });

    it('should prevent action click from bubbling to item click', async () => {
      const itemClick = jest.fn();
      const actionClick = jest.fn();
      const user = userEvent.setup();

      const itemsWithActions = [
        {
          id: '1',
          title: 'Event',
          timestamp: new Date(),
          actions: [
            {
              label: 'Action',
              onClick: actionClick,
            },
          ],
        },
      ];

      render(<Timeline items={itemsWithActions} onItemClick={itemClick} />);

      const actionButton = screen.getByText('Action');
      await user.click(actionButton);

      expect(actionClick).toHaveBeenCalled();
      expect(itemClick).not.toHaveBeenCalled();
    });

    it('should render action icons when provided', () => {
      const itemsWithActionIcons = [
        {
          id: '1',
          title: 'Event',
          timestamp: new Date(),
          actions: [
            {
              label: 'Edit',
              onClick: () => {},
              icon: <span data-testid='edit-icon'>✏️</span>,
            },
          ],
        },
      ];

      render(<Timeline items={itemsWithActionIcons} />);
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });
  });

  describe('Custom Rendering', () => {
    it('should use custom item renderer when provided', () => {
      const customRenderer = (item: TimelineItem, index: number) => (
        <div data-testid={`custom-item-${index}`}>Custom: {item.title}</div>
      );

      render(<Timeline {...defaultProps} itemRenderer={customRenderer} />);

      expect(screen.getByTestId('custom-item-0')).toBeInTheDocument();
      expect(screen.getByText('Custom: Event 3')).toBeInTheDocument(); // Latest first
    });

    it('should apply custom className to timeline container', () => {
      const customClass = 'custom-timeline-class';
      const { container } = render(
        <Timeline {...defaultProps} className={customClass} />
      );
      const timeline = container.querySelector('[data-testid="timeline"]');
      expect(timeline).toHaveClass(customClass);
    });

    it('should apply custom itemClassName to timeline items', () => {
      const customClass = 'custom-item-class';
      render(<Timeline {...defaultProps} itemClassName={customClass} />);
      const firstItem = screen.getByTestId('timeline-item-3'); // Latest first
      expect(firstItem).toHaveClass(customClass);
    });

    it('should use custom data-testid', () => {
      render(<Timeline {...defaultProps} data-testid='custom-timeline' />);
      expect(screen.getByTestId('custom-timeline')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic time elements for timestamps', () => {
      render(<Timeline {...defaultProps} />);
      const timeElements = screen.getAllByText(/Jan \d, 2024/);
      timeElements.forEach((element) => {
        expect(element.tagName).toBe('TIME');
      });
    });

    it('should have proper styling when clickable', async () => {
      const onItemClick = jest.fn();
      const user = userEvent.setup();

      render(<Timeline {...defaultProps} onItemClick={onItemClick} />);

      const firstItem = screen.getByTestId('timeline-item-3') as HTMLElement; // Latest first
      expect(firstItem.style.cursor).toBe('pointer');

      // Test actual click functionality
      await user.click(firstItem);
      expect(onItemClick).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with no description or content', () => {
      const minimalItems = [
        {
          id: '1',
          title: 'Title Only',
          timestamp: new Date(),
        },
      ];

      render(<Timeline items={minimalItems} />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
    });

    it('should handle malformed timestamps gracefully', () => {
      // Test with a problematic timestamp that might cause issues
      const itemsWithBadTimestamp = [
        {
          id: '1',
          title: 'Event',
          timestamp: new Date('invalid-date'),
        },
      ];

      expect(() => {
        render(<Timeline items={itemsWithBadTimestamp} />);
      }).not.toThrow();

      // Should render the component and show "Invalid date"
      expect(screen.getByText('Event')).toBeInTheDocument();
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
    });

    it('should handle very long titles and descriptions', () => {
      const longContentItems = [
        {
          id: '1',
          title:
            'A very long title that might overflow the container and cause layout issues',
          timestamp: new Date(),
          description:
            'A very long description that spans multiple lines and contains a lot of detailed information about the event that occurred at this specific point in time',
        },
      ];

      render(<Timeline items={longContentItems} />);
      expect(screen.getByText(/A very long title/)).toBeInTheDocument();
      expect(screen.getByText(/A very long description/)).toBeInTheDocument();
    });
  });
});
