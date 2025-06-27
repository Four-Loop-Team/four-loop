/**
 * Test file for Accordion component
 * Tests functionality, accessibility, and edge cases
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion, AccordionItem } from '../Accordion';

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

  it('renders accordion with items', () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('toggles accordion items on click', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    // Content should not be visible initially
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstButton);
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(firstButton);
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
  });

  it('supports multiple expanded items', () => {
    render(<Accordion items={mockItems} multiple />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    fireEvent.click(firstButton);
    fireEvent.click(secondButton);

    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
  });

  it('collapses other items when multiple is false', () => {
    render(<Accordion items={mockItems} multiple={false} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });
    const secondButton = screen.getByRole('button', { name: /section 2/i });

    fireEvent.click(firstButton);
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    fireEvent.click(secondButton);
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<Accordion items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('supports keyboard navigation', () => {
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByRole('button', { name: /section 1/i });

    firstButton.focus();
    fireEvent.keyDown(firstButton, { key: 'Enter' });

    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
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

    const button = screen.getByRole('button');
    expect(button.closest('[class*="custom-class"]')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const mockToggle = jest.fn();
    render(
      <AccordionItem item={mockItem} isExpanded={false} onToggle={mockToggle} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
