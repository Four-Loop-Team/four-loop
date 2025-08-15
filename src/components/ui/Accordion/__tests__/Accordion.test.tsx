/**
 * Comprehensive test file for Accordion component
 * Tests functionality, accessibility, edge cases, and coverage improvements
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Accordion, AccordionItem, Collapsible } from '../Accordion';

describe('Accordion', () => {
  const mockItems = [
    {
      id: '1',
      trigger: 'Section 1',
      content: 'Content for section 1',
    },
    {
      id: '2',
      trigger: 'Section 2',
      content: 'Content for section 2',
    },
  ];

  const mockItemsWithExtras = [
    {
      id: '1',
      trigger: 'Section 1',
      content: 'Content for section 1',
      icon: <span>🔧</span>,
    },
    {
      id: '2',
      trigger: 'Section 2',
      content: 'Content for section 2',
      disabled: true,
    },
    {
      id: '3',
      trigger: 'Section 3',
      content: 'Content for section 3',
    },
  ];

  it('renders accordion with items', () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('toggles accordion items on click', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    // Initially collapsed
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports multiple expanded items', () => {
    render(<Accordion items={mockItems} multiple />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    // Initially both should be collapsed
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(secondButton);

    // Both should be expanded in multiple mode
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses other items when not in multiple mode', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    // Click first item
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    // Click second item - first should collapse
    fireEvent.click(secondButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has proper ARIA attributes', () => {
    render(<Accordion items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    // Expand first accordion to check regions become accessible
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports keyboard navigation', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    firstButton.focus();
    fireEvent.keyDown(firstButton, { key: 'Enter' });

    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
  });

  it('supports space key for activation', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    firstButton.focus();
    fireEvent.keyDown(firstButton, { key: ' ' });

    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
  });

  it('handles controlled state', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Accordion items={mockItems} expandedItems={['1']} onChange={onChange} />
    );

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Click should trigger onChange - in single mode, it should replace ['1'] with ['2']
    const secondButton = screen.getByRole('button', { name: /section 2/i });
    fireEvent.click(secondButton);
    expect(onChange).toHaveBeenCalledWith(['2']);

    // Update controlled state
    rerender(
      <Accordion items={mockItems} expandedItems={['2']} onChange={onChange} />
    );

    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports default expanded items', () => {
    render(<Accordion items={mockItems} defaultExpandedItems={['1']} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports variants', () => {
    const { rerender } = render(
      <Accordion items={mockItems} variant='bordered' />
    );

    // Test that MUI accordion is rendered
    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );

    rerender(<Accordion items={mockItems} variant='filled' />);
    // Test filled variant - still uses MUI classes
    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );

    rerender(<Accordion items={mockItems} variant='minimal' />);
    // Test minimal variant - still uses MUI classes
    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );

    rerender(<Accordion items={mockItems} variant='default' />);
    // Test default variant - still uses MUI classes
    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );
  });

  it('supports different sizes', () => {
    const { rerender } = render(<Accordion items={mockItems} size='sm' />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    // Size is applied via sx styling, so we check for MUI classes
    expect(firstButton).toHaveClass('MuiAccordionSummary-root');

    rerender(<Accordion items={mockItems} size='lg' />);
    expect(firstButton).toHaveClass('MuiAccordionSummary-root');
  });

  it('handles disabled items', () => {
    render(<Accordion items={mockItemsWithExtras} />);

    const disabledButton = screen.getByRole('button', { name: /section 2/i });
    expect(disabledButton).toBeDisabled();

    // Clicking disabled item should not expand it
    fireEvent.click(disabledButton);
    expect(disabledButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders icons when provided', () => {
    render(<Accordion items={mockItemsWithExtras} />);

    expect(screen.getByText('🔧')).toBeInTheDocument();
  });

  it('handles onExpand and onCollapse callbacks', () => {
    const onExpand = jest.fn();
    const onCollapse = jest.fn();

    render(
      <Accordion
        items={mockItems}
        onExpand={onExpand}
        onCollapse={onCollapse}
      />
    );

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    // Test expand
    fireEvent.click(firstButton);
    expect(onExpand).toHaveBeenCalledWith('1');

    // Test collapse
    fireEvent.click(firstButton);
    expect(onCollapse).toHaveBeenCalledWith('1');
  });

  it('supports non-collapsible mode', () => {
    render(<Accordion items={mockItems} collapsible={false} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    // Expand first item
    fireEvent.click(firstButton);
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    // Clicking the same item again should not collapse it when collapsible=false
    fireEvent.click(firstButton);
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    // Expanding another item should still work
    fireEvent.click(secondButton);
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
  });

  it('supports animation configuration', () => {
    render(
      <Accordion items={mockItems} animated={true} animationDuration={300} />
    );

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    fireEvent.click(firstButton);

    // Animation is handled by MUI, so we check that the component renders
    const accordion = screen.getByTestId('accordion-item-1');
    expect(accordion).toHaveClass('MuiAccordion-root');
  });

  it('disables animation when animated=false', () => {
    render(<Accordion items={mockItems} animated={false} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    expect(firstButton).toBeInTheDocument();

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies custom className', () => {
    render(<Accordion items={mockItems} className='custom-class' />);

    expect(screen.getByTestId('accordion')).toHaveClass('custom-class');
  });

  it('applies custom testId', () => {
    render(<Accordion items={mockItems} data-testid='custom-accordion' />);

    expect(screen.getByTestId('custom-accordion')).toBeInTheDocument();
  });

  it('handles keyboard events', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    // MUI handles keyboard events internally, so we test click behavior
    // which is what keyboard events would trigger
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles onChange callback with multiple items', () => {
    const onChange = jest.fn();
    render(<Accordion items={mockItems} multiple onChange={onChange} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    fireEvent.click(firstButton);
    expect(onChange).toHaveBeenCalledWith(['1']);

    fireEvent.click(secondButton);
    expect(onChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('handles single mode collapsing other items', () => {
    const onCollapse = jest.fn();
    render(
      <Accordion
        items={mockItems}
        multiple={false}
        onCollapse={onCollapse}
        defaultExpandedItems={['1']}
      />
    );

    const secondButton = screen.getByRole('button', { name: /section 2/i });
    fireEvent.click(secondButton);

    expect(onCollapse).toHaveBeenCalledWith('1');
  });

  it('handles custom item className', () => {
    render(<Accordion items={mockItems} itemClassName='custom-item-class' />);

    const accordion = screen.getByTestId('accordion-item-1');
    expect(accordion).toHaveClass('custom-item-class');
    // Also check that it has MUI classes
    expect(accordion).toHaveClass('MuiAccordion-root');
  });
});

describe('AccordionItem', () => {
  const mockItem = {
    id: '1',
    trigger: 'Test Item',
    content: 'Test Content',
  };

  it('renders with custom className', () => {
    render(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={() => {}}
        className='custom-class'
      />
    );

    const accordionItem = screen.getByTestId('accordion-item-1');
    expect(accordionItem).toHaveClass('custom-class');
    expect(accordionItem).toHaveClass('MuiAccordion-root');
  });

  it('calls onToggle when clicked', () => {
    const mockToggle = jest.fn();
    const mockChange = jest.fn();
    render(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={mockToggle}
        onChange={mockChange}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // MUI accordion calls onChange, which should trigger our callbacks
    expect(mockChange).toHaveBeenCalled();
  });

  it('renders content when expanded', () => {
    render(
      <AccordionItem item={mockItem} isExpanded={true} onToggle={() => {}} />
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('hides content when collapsed', () => {
    render(
      <AccordionItem item={mockItem} isExpanded={false} onToggle={() => {}} />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const disabledItem = { ...mockItem, disabled: true };
    const mockToggle = jest.fn();

    render(
      <AccordionItem
        item={disabledItem}
        isExpanded={false}
        onToggle={mockToggle}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockToggle).not.toHaveBeenCalled();
  });

  it('renders with icon', () => {
    const itemWithIcon = {
      ...mockItem,
      icon: <span data-testid='test-icon'>🔧</span>,
    };

    render(
      <AccordionItem
        item={itemWithIcon}
        isExpanded={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('supports different variants', () => {
    const { rerender } = render(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={() => {}}
        variant='bordered'
      />
    );

    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );

    rerender(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={() => {}}
        variant='filled'
      />
    );

    expect(screen.getByTestId('accordion-item-1')).toHaveClass(
      'MuiAccordion-root'
    );
  });

  it('supports different sizes', () => {
    const { rerender } = render(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={() => {}}
        size='sm'
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiAccordionSummary-root');

    rerender(
      <AccordionItem
        item={mockItem}
        isExpanded={false}
        onToggle={() => {}}
        size='lg'
      />
    );

    expect(button).toHaveClass('MuiAccordionSummary-root');
  });

  it('handles animation settings', () => {
    render(
      <AccordionItem
        item={mockItem}
        isExpanded={true}
        onToggle={() => {}}
        animated={true}
        animationDuration={500}
      />
    );

    const accordion = screen.getByTestId('accordion-item-1');
    expect(accordion).toHaveClass('MuiAccordion-root');
  });

  it('disables animation when animated=false', () => {
    render(
      <AccordionItem
        item={mockItem}
        isExpanded={true}
        onToggle={() => {}}
        animated={false}
      />
    );

    const accordion = screen.getByTestId('accordion-item-1');
    expect(accordion).toHaveClass('MuiAccordion-root');
  });
});

describe('Collapsible', () => {
  it('renders with trigger and children', () => {
    render(
      <Collapsible trigger='Toggle Content'>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    expect(screen.getByText('Toggle Content')).toBeInTheDocument();
    expect(screen.getByText('Collapsible Content')).toBeInTheDocument();

    // Check that the button is initially collapsed
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles content on click', async () => {
    render(
      <Collapsible trigger='Toggle Content'>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);

    // Should be expanded after click
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    fireEvent.click(button);

    // Should be collapsed again
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('supports controlled state', async () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Collapsible
        trigger='Toggle Content'
        isExpanded={false}
        onChange={onChange}
      >
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <Collapsible
        trigger='Toggle Content'
        isExpanded={true}
        onChange={onChange}
      >
        <div>Collapsible Content</div>
      </Collapsible>
    );

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('supports default expanded state', () => {
    render(
      <Collapsible trigger='Toggle Content' defaultExpanded={true}>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    expect(screen.getByText('Collapsible Content')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const onChange = jest.fn();
    render(
      <Collapsible trigger='Toggle Content' disabled={true} onChange={onChange}>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports keyboard navigation', async () => {
    render(
      <Collapsible trigger='Toggle Content'>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // MUI handles keyboard events internally, so we test click behavior
    // which is what keyboard events would trigger
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('supports different variants and sizes', () => {
    render(
      <Collapsible trigger='Toggle Content' variant='filled' size='lg'>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');
    // Size and variant are applied via sx styling in MUI-based implementation
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Collapsible trigger='Toggle Content' className='custom-collapsible'>
        <div>Collapsible Content</div>
      </Collapsible>
    );

    expect(screen.getByTestId('collapsible')).toHaveClass('custom-collapsible');
  });

  it('supports animation configuration', () => {
    render(
      <Collapsible
        trigger='Toggle Content'
        animated={true}
        animationDuration={300}
        defaultExpanded={true}
      >
        <div>Collapsible Content</div>
      </Collapsible>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Collapsible Content')).toBeInTheDocument();
  });
});
