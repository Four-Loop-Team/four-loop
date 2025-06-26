import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  GridContainer,
  GridItem,
  ThreeColumnLayout,
  CardGrid,
  useGridSystem,
  TwoColumnLayout,
} from '../Grid';
import { renderWithTheme } from '@/test/utils';
import { renderHook } from '@testing-library/react';

describe('Grid System', () => {
  describe('GridContainer', () => {
    it('renders with default props', () => {
      render(
        <GridContainer data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );

      const container = screen.getByTestId('grid-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container', 'grid', 'gap-xs');
    });

    it('applies correct size classes', () => {
      const { rerender } = render(
        <GridContainer size='lg' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );

      let container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('container-lg');

      rerender(
        <GridContainer size='xl' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );
      container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('container-xl');

      rerender(
        <GridContainer size='fluid' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );
      container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('container-fluid');
    });

    it('applies correct gap classes', () => {
      const { rerender } = render(
        <GridContainer gap='md' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );

      let container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('gap-md');

      rerender(
        <GridContainer gap='xl' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );
      container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('gap-xl');
    });

    it('applies flexbox classes when type is flex', () => {
      render(
        <GridContainer type='flex' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );

      const container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('flex-grid');
      expect(container).not.toHaveClass('grid');
    });

    it('combines custom className with grid classes', () => {
      render(
        <GridContainer className='custom-class' data-testid='grid-container'>
          <div>Test content</div>
        </GridContainer>
      );

      const container = screen.getByTestId('grid-container');
      expect(container).toHaveClass('custom-class', 'container', 'grid');
    });

    it('passes through additional props', () => {
      render(
        <GridContainer
          data-testid='grid-container'
          role='region'
          aria-label='Grid layout'
        >
          <div>Test content</div>
        </GridContainer>
      );

      const container = screen.getByTestId('grid-container');
      expect(container).toHaveAttribute('role', 'region');
      expect(container).toHaveAttribute('aria-label', 'Grid layout');
    });
  });

  describe('GridItem', () => {
    it('renders with default props', () => {
      render(
        <GridItem data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toBeInTheDocument();
      expect(item.textContent).toBe('Test content');
    });

    it('applies responsive column classes', () => {
      render(
        <GridItem xs={12} sm={6} md={4} lg={3} data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveClass('col-12', 'sm-col-6', 'md-col-4', 'lg-col-3');
      expect(item).toHaveClass(
        'flex-col-12',
        'sm-flex-col-6',
        'md-flex-col-4',
        'lg-flex-col-3'
      );
    });

    it('applies xl breakpoint classes', () => {
      render(
        <GridItem xl={2} data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveClass('xl-col-2', 'xl-flex-col-2');
    });

    it('applies auto sizing classes', () => {
      render(
        <GridItem auto data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveClass('col-auto', 'flex-col-auto');
    });

    it('applies start and end positioning classes for CSS Grid', () => {
      render(
        <GridItem xs={6} start={3} end={9} data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveClass('col-start-3', 'col-end-9');
    });

    it('combines custom className with grid item classes', () => {
      render(
        <GridItem xs={6} className='custom-item-class' data-testid='grid-item'>
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveClass('custom-item-class', 'col-6');
    });

    it('passes through additional props', () => {
      render(
        <GridItem
          xs={6}
          data-testid='grid-item'
          role='gridcell'
          aria-label='Grid item'
        >
          <div>Test content</div>
        </GridItem>
      );

      const item = screen.getByTestId('grid-item');
      expect(item).toHaveAttribute('role', 'gridcell');
      expect(item).toHaveAttribute('aria-label', 'Grid item');
    });
  });

  describe('ThreeColumnLayout', () => {
    it('renders with default props', () => {
      render(
        <ThreeColumnLayout
          left={<div data-testid='left-content'>Left</div>}
          center={<div data-testid='center-content'>Center</div>}
          right={<div data-testid='right-content'>Right</div>}
        />
      );

      expect(screen.getByTestId('left-content')).toBeInTheDocument();
      expect(screen.getByTestId('center-content')).toBeInTheDocument();
      expect(screen.getByTestId('right-content')).toBeInTheDocument();
    });

    it('applies custom column widths', () => {
      render(
        <ThreeColumnLayout
          left={<div data-testid='left-content'>Left</div>}
          center={<div data-testid='center-content'>Center</div>}
          right={<div data-testid='right-content'>Right</div>}
          leftWidth={{ xs: 12, lg: 4 }}
          centerWidth={{ xs: 12, lg: 4 }}
          rightWidth={{ xs: 12, lg: 4 }}
        />
      );

      const leftItem = screen
        .getByTestId('left-content')
        .closest('[class*="col-12"][class*="lg-col-4"]');
      const centerItem = screen
        .getByTestId('center-content')
        .closest('[class*="col-12"][class*="lg-col-4"]');
      const rightItem = screen
        .getByTestId('right-content')
        .closest('[class*="col-12"][class*="lg-col-4"]');

      expect(leftItem).toBeInTheDocument();
      expect(centerItem).toBeInTheDocument();
      expect(rightItem).toBeInTheDocument();
    });

    it('applies custom gap and container size', () => {
      const { container } = render(
        <ThreeColumnLayout
          left={<div>Left</div>}
          center={<div>Center</div>}
          right={<div>Right</div>}
          gap='lg'
          containerSize='xl'
        />
      );

      const gridContainer = container.querySelector('.container-xl.gap-lg');
      expect(gridContainer).toBeInTheDocument();
    });

    it('handles all responsive breakpoints', () => {
      render(
        <ThreeColumnLayout
          left={<div data-testid='left-content'>Left</div>}
          center={<div data-testid='center-content'>Center</div>}
          right={<div data-testid='right-content'>Right</div>}
          leftWidth={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          centerWidth={{ xs: 12, sm: 6, md: 4, lg: 6, xl: 8 }}
          rightWidth={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 2 }}
        />
      );

      const leftItem = screen
        .getByTestId('left-content')
        .closest(
          '[class*="col-12"][class*="sm-col-6"][class*="md-col-4"][class*="lg-col-3"][class*="xl-col-2"]'
        );
      const centerItem = screen
        .getByTestId('center-content')
        .closest(
          '[class*="col-12"][class*="sm-col-6"][class*="md-col-4"][class*="lg-col-6"][class*="xl-col-8"]'
        );
      const rightItem = screen
        .getByTestId('right-content')
        .closest(
          '[class*="col-12"][class*="sm-col-12"][class*="md-col-4"][class*="lg-col-3"][class*="xl-col-2"]'
        );

      expect(leftItem).toBeInTheDocument();
      expect(centerItem).toBeInTheDocument();
      expect(rightItem).toBeInTheDocument();
    });
  });

  describe('CardGrid', () => {
    const mockItems = [
      <div key='1' data-testid='card-1'>
        Card 1
      </div>,
      <div key='2' data-testid='card-2'>
        Card 2
      </div>,
      <div key='3' data-testid='card-3'>
        Card 3
      </div>,
      <div key='4' data-testid='card-4'>
        Card 4
      </div>,
    ];

    it('renders with default props', () => {
      render(<CardGrid items={mockItems} />);

      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
      expect(screen.getByTestId('card-3')).toBeInTheDocument();
      expect(screen.getByTestId('card-4')).toBeInTheDocument();
    });

    it('applies correct column calculations for different breakpoints', () => {
      render(<CardGrid items={mockItems} xs={1} sm={2} md={3} lg={4} xl={6} />);

      // With xs=1, each item should be col-12 (12/1=12)
      // With sm=2, each item should be sm-col-6 (12/2=6)
      // With md=3, each item should be md-col-4 (12/3=4)
      // With lg=4, each item should be lg-col-3 (12/4=3)
      // With xl=6, each item should be xl-col-2 (12/6=2)
      const firstCard = screen
        .getByTestId('card-1')
        .closest(
          '[class*="col-12"][class*="sm-col-6"][class*="md-col-4"][class*="lg-col-3"][class*="xl-col-2"]'
        );
      expect(firstCard).toBeInTheDocument();
    });

    it('handles single column layout', () => {
      render(<CardGrid items={mockItems} xs={1} sm={1} md={1} lg={1} xl={1} />);

      const firstCard = screen
        .getByTestId('card-1')
        .closest(
          '[class*="col-12"][class*="sm-col-12"][class*="md-col-12"][class*="lg-col-12"][class*="xl-col-12"]'
        );
      expect(firstCard).toBeInTheDocument();
    });

    it('handles max columns layout', () => {
      render(
        <CardGrid items={mockItems} xs={12} sm={12} md={12} lg={12} xl={12} />
      );

      // With 12 columns, each item should be col-1 (12/12=1)
      const firstCard = screen
        .getByTestId('card-1')
        .closest(
          '[class*="col-1"][class*="sm-col-1"][class*="md-col-1"][class*="lg-col-1"][class*="xl-col-1"]'
        );
      expect(firstCard).toBeInTheDocument();
    });

    it('applies custom gap and container size', () => {
      const { container } = render(
        <CardGrid items={mockItems} gap='xl' containerSize='fluid' />
      );

      const gridContainer = container.querySelector('.container-fluid.gap-xl');
      expect(gridContainer).toBeInTheDocument();
    });

    it('handles empty items array', () => {
      const { container } = render(<CardGrid items={[]} />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer?.children).toHaveLength(0);
    });

    it('handles items with complex content', () => {
      const complexItems = [
        <div key='complex-1' data-testid='complex-card'>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </div>,
      ];

      render(<CardGrid items={complexItems} />);

      expect(screen.getByTestId('complex-card')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('useGridSystem', () => {
    it('calculates column width correctly', () => {
      const { result } = renderHook(() => useGridSystem());

      expect(result.current.getColumnWidth(1)).toBe('calc(100% / 12 * 1)');
      expect(result.current.getColumnWidth(6)).toBe('calc(100% / 12 * 6)');
      expect(result.current.getColumnWidth(12)).toBe('calc(100% / 12 * 12)');
    });

    it('generates responsive column classes correctly', () => {
      const { result } = renderHook(() => useGridSystem());

      expect(result.current.getResponsiveColumns('xs', 12)).toBe('xs-col-12');
      expect(result.current.getResponsiveColumns('sm', 6)).toBe('sm-col-6');
      expect(result.current.getResponsiveColumns('md', 4)).toBe('md-col-4');
      expect(result.current.getResponsiveColumns('lg', 3)).toBe('lg-col-3');
      expect(result.current.getResponsiveColumns('xl', 2)).toBe('xl-col-2');
    });

    it('generates flex column styles correctly', () => {
      const { result } = renderHook(() => useGridSystem());

      const styles1 = result.current.getFlexColumns(1);
      expect(styles1).toEqual({
        flex: '0 0 calc(100% / 12 * 1)',
        maxWidth: 'calc(100% / 12 * 1)',
      });

      const styles6 = result.current.getFlexColumns(6);
      expect(styles6).toEqual({
        flex: '0 0 calc(100% / 12 * 6)',
        maxWidth: 'calc(100% / 12 * 6)',
      });

      const styles12 = result.current.getFlexColumns(12);
      expect(styles12).toEqual({
        flex: '0 0 calc(100% / 12 * 12)',
        maxWidth: 'calc(100% / 12 * 12)',
      });
    });

    it('handles edge cases for column calculations', () => {
      const { result } = renderHook(() => useGridSystem());

      // Test with minimum column
      expect(result.current.getColumnWidth(0)).toBe('calc(100% / 12 * 0)');

      // Test with maximum column
      expect(result.current.getColumnWidth(24)).toBe('calc(100% / 12 * 24)');
    });

    it('returns consistent values across multiple calls', () => {
      const { result } = renderHook(() => useGridSystem());

      const width1a = result.current.getColumnWidth(6);
      const width1b = result.current.getColumnWidth(6);
      expect(width1a).toBe(width1b);

      const class1a = result.current.getResponsiveColumns('md', 4);
      const class1b = result.current.getResponsiveColumns('md', 4);
      expect(class1a).toBe(class1b);

      const styles1a = result.current.getFlexColumns(3);
      const styles1b = result.current.getFlexColumns(3);
      expect(styles1a).toEqual(styles1b);
    });
  });

  describe('Grid System Integration', () => {
    it('renders complete grid layout correctly', () => {
      render(
        <GridContainer gap='md' data-testid='grid-container'>
          <GridItem xs={12} md={6} data-testid='grid-item-1'>
            <div>First column</div>
          </GridItem>
          <GridItem xs={12} md={6} data-testid='grid-item-2'>
            <div>Second column</div>
          </GridItem>
        </GridContainer>
      );

      const container = screen.getByTestId('grid-container');
      const item1 = screen.getByTestId('grid-item-1');
      const item2 = screen.getByTestId('grid-item-2');

      expect(container).toHaveClass('gap-md');
      expect(item1).toHaveClass('col-12', 'md-col-6');
      expect(item2).toHaveClass('col-12', 'md-col-6');
      expect(screen.getByText('First column')).toBeInTheDocument();
      expect(screen.getByText('Second column')).toBeInTheDocument();
    });

    it('works with Material-UI theme provider', () => {
      renderWithTheme(
        <GridContainer>
          <GridItem xs={12}>
            <div>Themed grid content</div>
          </GridItem>
        </GridContainer>
      );

      expect(screen.getByText('Themed grid content')).toBeInTheDocument();
    });
  });

  describe('TwoColumnLayout', () => {
    it('renders TwoColumnLayout with all default props', () => {
      render(
        <TwoColumnLayout
          left={<div>Left content</div>}
          right={<div>Right content</div>}
        />
      );

      expect(screen.getByText('Left content')).toBeInTheDocument();
      expect(screen.getByText('Right content')).toBeInTheDocument();
    });

    it('renders TwoColumnLayout with custom containerSize', () => {
      render(
        <TwoColumnLayout
          left={<div>Left content</div>}
          right={<div>Right content</div>}
          containerSize='fluid'
        />
      );

      expect(screen.getByText('Left content')).toBeInTheDocument();
      expect(screen.getByText('Right content')).toBeInTheDocument();
    });
  });
});
