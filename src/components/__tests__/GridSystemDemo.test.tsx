import { render, screen } from '@testing-library/react';
import React from 'react';
import GridSystemDemo from '../system/GridSystemDemo';

// Mock MUI components to avoid theme provider requirements
jest.mock('@mui/material', () => ({
  Box: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='box' {...props}>
      {children}
    </div>
  ),
  Card: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='card' {...props}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='card-content' {...props}>
      {children}
    </div>
  ),
  Typography: ({
    children,
    variant,
    component,
    ...props
  }: {
    children: React.ReactNode;
    variant?: string;
    component?: string;
    [key: string]: unknown;
  }) => {
    const Component = component ?? variant ?? 'div';
    return React.createElement(
      Component,
      { 'data-testid': `typography-${variant}`, ...props },
      children
    );
  },
  Paper: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid='paper' {...props}>
      {children}
    </div>
  ),
}));

// Mock the Grid components
jest.mock('../system/Grid', () => ({
  GridContainer: ({
    children,
    size,
    gap,
    ...props
  }: {
    children: React.ReactNode;
    size?: string;
    gap?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid='grid-container'
      data-size={size}
      data-gap={gap}
      {...props}
    >
      {children}
    </div>
  ),
  GridItem: ({
    children,
    xs,
    sm,
    md,
    lg,
    start,
    end,
    auto,
    ...props
  }: {
    children: React.ReactNode;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    start?: number;
    end?: number;
    auto?: boolean;
    [key: string]: unknown;
  }) => (
    <div
      data-testid='grid-item'
      data-xs={xs}
      data-sm={sm}
      data-md={md}
      data-lg={lg}
      data-start={start}
      data-end={end}
      data-auto={auto}
      {...props}
    >
      {children}
    </div>
  ),
  TwoColumnLayout: ({
    left,
    right,
    gap,
    ...props
  }: {
    left: React.ReactNode;
    right: React.ReactNode;
    leftWidth?: unknown;
    rightWidth?: unknown;
    gap?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid='two-column-layout' data-gap={gap} {...props}>
      <div data-testid='two-column-left'>{left}</div>
      <div data-testid='two-column-right'>{right}</div>
    </div>
  ),
  ThreeColumnLayout: ({
    left,
    center,
    right,
    gap,
    ...props
  }: {
    left: React.ReactNode;
    center: React.ReactNode;
    right: React.ReactNode;
    leftWidth?: unknown;
    centerWidth?: unknown;
    rightWidth?: unknown;
    gap?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid='three-column-layout' data-gap={gap} {...props}>
      <div data-testid='three-column-left'>{left}</div>
      <div data-testid='three-column-center'>{center}</div>
      <div data-testid='three-column-right'>{right}</div>
    </div>
  ),
  CardGrid: ({
    items,
    xs,
    sm,
    md,
    lg,
    gap,
    ...props
  }: {
    items: React.ReactNode[];
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    gap?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid='card-grid'
      data-xs={xs}
      data-sm={sm}
      data-md={md}
      data-lg={lg}
      data-gap={gap}
      {...props}
    >
      {items}
    </div>
  ),
}));

describe('GridSystemDemo', () => {
  it('renders the main heading correctly', () => {
    render(<GridSystemDemo />);

    const heading = screen.getByTestId('typography-h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Dual Grid System Demo');
  });

  it('renders the subtitle correctly', () => {
    render(<GridSystemDemo />);

    const subtitle = screen.getByTestId('typography-h5');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      'Comprehensive examples of our 12-column layout grid combined with 8px spacing system.'
    );
  });

  it('renders all section headings', () => {
    render(<GridSystemDemo />);

    const sectionHeadings = screen.getAllByTestId('typography-h4');

    expect(sectionHeadings).toHaveLength(7);
    expect(sectionHeadings[0]).toHaveTextContent('Basic Grid Examples');
    expect(sectionHeadings[1]).toHaveTextContent(
      '8px Spacing System Integration'
    );
    expect(sectionHeadings[2]).toHaveTextContent('Pre-built Layout Components');
    expect(sectionHeadings[3]).toHaveTextContent('Card Grid Layout');
    expect(sectionHeadings[4]).toHaveTextContent('Advanced Grid Features');
    expect(sectionHeadings[5]).toHaveTextContent('Gap Size Examples');
    expect(sectionHeadings[6]).toHaveTextContent('Container Size Examples');
  });

  it('renders equal columns example', () => {
    render(<GridSystemDemo />);

    // Check for the 4 equal columns
    const gridItems = screen.getAllByTestId('grid-item');
    const equalColumnItems = gridItems.filter(
      (item) =>
        item.getAttribute('data-xs') === '12' &&
        item.getAttribute('data-sm') === '6' &&
        item.getAttribute('data-md') === '3'
    );

    expect(equalColumnItems.length).toBeGreaterThanOrEqual(4);
  });

  it('renders responsive layout example', () => {
    render(<GridSystemDemo />);

    // Check for main content area (xs=12, sm=8, md=9)
    const gridItems = screen.getAllByTestId('grid-item');
    const mainContentItem = gridItems.find(
      (item) =>
        item.getAttribute('data-xs') === '12' &&
        item.getAttribute('data-sm') === '8' &&
        item.getAttribute('data-md') === '9'
    );

    expect(mainContentItem).toBeInTheDocument();

    // Check for sidebar (xs=12, sm=4, md=3)
    const sidebarItem = gridItems.find(
      (item) =>
        item.getAttribute('data-xs') === '12' &&
        item.getAttribute('data-sm') === '4' &&
        item.getAttribute('data-md') === '3'
    );

    expect(sidebarItem).toBeInTheDocument();
  });

  it('renders two column layout component', () => {
    render(<GridSystemDemo />);

    const twoColumnLayout = screen.getByTestId('two-column-layout');
    expect(twoColumnLayout).toBeInTheDocument();
    expect(twoColumnLayout).toHaveAttribute('data-gap', 'lg');

    expect(screen.getByTestId('two-column-left')).toBeInTheDocument();
    expect(screen.getByTestId('two-column-right')).toBeInTheDocument();
  });

  it('renders three column layout component', () => {
    render(<GridSystemDemo />);

    const threeColumnLayout = screen.getByTestId('three-column-layout');
    expect(threeColumnLayout).toBeInTheDocument();
    expect(threeColumnLayout).toHaveAttribute('data-gap', 'md');

    expect(screen.getByTestId('three-column-left')).toBeInTheDocument();
    expect(screen.getByTestId('three-column-center')).toBeInTheDocument();
    expect(screen.getByTestId('three-column-right')).toBeInTheDocument();
  });

  it('renders card grid with sample cards', () => {
    render(<GridSystemDemo />);

    const cardGrid = screen.getByTestId('card-grid');
    expect(cardGrid).toBeInTheDocument();
    expect(cardGrid).toHaveAttribute('data-xs', '1');
    expect(cardGrid).toHaveAttribute('data-sm', '2');
    expect(cardGrid).toHaveAttribute('data-md', '3');
    expect(cardGrid).toHaveAttribute('data-lg', '4');
    expect(cardGrid).toHaveAttribute('data-gap', 'md');

    // Check that sample cards are rendered
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThanOrEqual(8);
  });

  it('renders grid positioning examples', () => {
    render(<GridSystemDemo />);

    const gridItems = screen.getAllByTestId('grid-item');

    // Check for positioned item (start=2, end=8)
    const positionedItem = gridItems.find(
      (item) =>
        item.getAttribute('data-start') === '2' &&
        item.getAttribute('data-end') === '8'
    );
    expect(positionedItem).toBeInTheDocument();

    // Check for offset item (start=5)
    const offsetItem = gridItems.find(
      (item) =>
        item.getAttribute('data-start') === '5' &&
        item.getAttribute('data-xs') === '4'
    );
    expect(offsetItem).toBeInTheDocument();
  });

  it('renders auto-sizing column example', () => {
    render(<GridSystemDemo />);

    const gridItems = screen.getAllByTestId('grid-item');

    // Check for auto-sizing item
    const autoItem = gridItems.find(
      (item) => item.getAttribute('data-auto') === 'true'
    );
    expect(autoItem).toBeInTheDocument();
  });

  it('renders gap size examples', () => {
    render(<GridSystemDemo />);

    const gridContainers = screen.getAllByTestId('grid-container');

    // Check for containers with different gap sizes
    const gapSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    gapSizes.forEach((gapSize) => {
      const containerWithGap = gridContainers.find(
        (container) => container.getAttribute('data-gap') === gapSize
      );
      expect(containerWithGap).toBeInTheDocument();
    });
  });

  it('renders container size examples', () => {
    render(<GridSystemDemo />);

    const gridContainers = screen.getAllByTestId('grid-container');

    // Check for different container sizes
    const containerSizes = ['default', 'lg', 'xl', 'fluid'];
    containerSizes.forEach((size) => {
      const containerWithSize = gridContainers.find(
        (container) => container.getAttribute('data-size') === size
      );
      expect(containerWithSize).toBeInTheDocument();
    });
  });

  it('renders all sample card content', () => {
    render(<GridSystemDemo />);

    // Check for card titles
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(`Card ${i}`)).toBeInTheDocument();
    }

    // Check for card descriptions
    const cardDescriptions = screen.getAllByText(
      'This is a sample card to demonstrate the grid system layout.'
    );
    expect(cardDescriptions.length).toBeGreaterThanOrEqual(8);
  });

  it('renders column labels in examples', () => {
    render(<GridSystemDemo />);

    // Check for basic column labels
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();
    expect(screen.getByText('Column 3')).toBeInTheDocument();
    expect(screen.getByText('Column 4')).toBeInTheDocument();

    // Check for layout area labels
    expect(screen.getByText('Main Content Area')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Left Column')).toBeInTheDocument();
    expect(screen.getByText('Right Column')).toBeInTheDocument();
  });

  it('renders three column layout labels', () => {
    render(<GridSystemDemo />);

    const subtitleElements = screen.getAllByTestId('typography-subtitle1');
    const leftSubtitle = subtitleElements.find(
      (el) => el.textContent === 'Left'
    );
    const centerSubtitle = subtitleElements.find(
      (el) => el.textContent === 'Center'
    );
    const rightSubtitle = subtitleElements.find(
      (el) => el.textContent === 'Right'
    );

    expect(leftSubtitle).toBeInTheDocument();
    expect(centerSubtitle).toBeInTheDocument();
    expect(rightSubtitle).toBeInTheDocument();
  });

  it('renders positioning and offset examples with correct labels', () => {
    render(<GridSystemDemo />);

    expect(
      screen.getByText('Positioned from column 2 to column 8 (6 columns wide)')
    ).toBeInTheDocument();
    expect(screen.getByText('Offset by 4 columns')).toBeInTheDocument();
    expect(screen.getByText('Fixed 3 cols')).toBeInTheDocument();
    expect(
      screen.getByText('Auto-sizing (fills remaining space)')
    ).toBeInTheDocument();
    expect(screen.getByText('Fixed 2 cols')).toBeInTheDocument();
  });

  it('renders container size descriptions', () => {
    render(<GridSystemDemo />);

    expect(
      screen.getByText('Default Container (max-width: 1200px)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Large Container (max-width: 1400px)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Extra Large Container (max-width: 1600px)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Fluid Container (no max-width, full width)')
    ).toBeInTheDocument();
  });

  it('provides comprehensive grid system documentation', () => {
    render(<GridSystemDemo />);

    // Check for descriptive text about responsive behavior
    expect(
      screen.getByText(/Responsive card grid that adapts to screen size/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This content area adapts to different screen sizes/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Responsive sidebar that stacks on mobile/)
    ).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<GridSystemDemo />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<GridSystemDemo />);

    // Check that the main heading is h2 but used as h1
    const mainHeading = screen.getByTestId('typography-h2');
    expect(mainHeading.tagName.toLowerCase()).toBe('h1');

    // Check that section headings are h4
    const sectionHeadings = screen.getAllByTestId('typography-h4');
    sectionHeadings.forEach((heading) => {
      expect(heading.tagName.toLowerCase()).toBe('h4');
    });
  });
});
