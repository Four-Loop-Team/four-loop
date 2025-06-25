import React from 'react';
import { Box, BoxProps } from '@mui/material';

// Grid Container Props
interface GridContainerProps extends BoxProps {
  children: React.ReactNode;
  /**
   * Container type
   * - 'default': Standard max-width container
   * - 'lg': Large max-width container
   * - 'xl': Extra large max-width container
   * - 'fluid': Full width container
   */
  size?: 'default' | 'lg' | 'xl' | 'fluid';
  /**
   * Gap size between grid items
   */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Grid implementation
   * - 'css': CSS Grid (recommended)
   * - 'flex': Flexbox Grid
   */
  type?: 'css' | 'flex';
}

// Grid Item Props
interface GridItemProps extends BoxProps {
  children: React.ReactNode;
  /**
   * Column span for different breakpoints
   */
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  /**
   * Column start position (CSS Grid only)
   */
  start?: number;
  /**
   * Column end position (CSS Grid only)
   */
  end?: number;
  /**
   * Auto-sizing column
   */
  auto?: boolean;
}

/**
 * Grid Container Component
 *
 * Provides a responsive 12-column grid system using CSS Grid or Flexbox.
 * Integrates with the application's design system variables.
 *
 * @example
 * // CSS Grid Layout
 * <GridContainer>
 *   <GridItem xs={12} md={6}>Content</GridItem>
 *   <GridItem xs={12} md={6}>Content</GridItem>
 * </GridContainer>
 *
 * @example
 * // Flexbox Grid Layout
 * <GridContainer type="flex" gap="md">
 *   <GridItem xs={6} md={4}>Content</GridItem>
 *   <GridItem xs={6} md={8}>Content</GridItem>
 * </GridContainer>
 */
export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  size = 'default',
  gap = 'xs',
  type = 'css',
  className = '',
  sx = {},
  ...props
}) => {
  const getContainerClass = () => {
    const classes = ['container'];

    if (size === 'lg') classes.push('container-lg');
    else if (size === 'xl') classes.push('container-xl');
    else if (size === 'fluid') classes.push('container-fluid');

    if (type === 'css') {
      classes.push('grid');
      classes.push(`gap-${gap}`);
    } else {
      classes.push('flex-grid');
    }

    return classes.join(' ');
  };

  return (
    <Box
      className={`${getContainerClass()} ${className}`.trim()}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
};

/**
 * Grid Item Component
 *
 * Defines column spans and positioning for grid items.
 * Supports responsive breakpoints and both CSS Grid and Flexbox.
 *
 * @example
 * // Responsive column spans
 * <GridItem xs={12} sm={6} md={4} lg={3}>
 *   Responsive content
 * </GridItem>
 *
 * @example
 * // CSS Grid positioning
 * <GridItem xs={6} start={4} end={10}>
 *   Positioned content
 * </GridItem>
 */
export const GridItem: React.FC<GridItemProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  start,
  end,
  auto = false,
  className = '',
  sx = {},
  ...props
}) => {
  const getItemClasses = () => {
    const classes: string[] = [];

    // Auto-sizing
    if (auto) {
      classes.push('col-auto');
      classes.push('flex-col-auto');
      return classes.join(' ');
    }

    // Column spans for different breakpoints
    if (xs !== undefined) {
      classes.push(`col-${xs}`);
      classes.push(`flex-col-${xs}`);
    }
    if (sm !== undefined) {
      classes.push(`sm-col-${sm}`);
      classes.push(`sm-flex-col-${sm}`);
    }
    if (md !== undefined) {
      classes.push(`md-col-${md}`);
      classes.push(`md-flex-col-${md}`);
    }
    if (lg !== undefined) {
      classes.push(`lg-col-${lg}`);
      classes.push(`lg-flex-col-${lg}`);
    }
    if (xl !== undefined) {
      classes.push(`xl-col-${xl}`);
      classes.push(`xl-flex-col-${xl}`);
    }

    // CSS Grid positioning
    if (start !== undefined) {
      classes.push(`col-start-${start}`);
    }
    if (end !== undefined) {
      classes.push(`col-end-${end}`);
    }

    return classes.join(' ');
  };

  return (
    <Box
      className={`${getItemClasses()} ${className}`.trim()}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
};

// Pre-built Layout Components

/**
 * Two Column Layout
 *
 * @example
 * <TwoColumnLayout
 *   left={<div>Sidebar</div>}
 *   right={<div>Main Content</div>}
 *   leftWidth={{ xs: 12, md: 4 }}
 *   rightWidth={{ xs: 12, md: 8 }}
 * />
 */
interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  rightWidth?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'default' | 'lg' | 'xl' | 'fluid';
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  leftWidth = { xs: 12, md: 4 },
  rightWidth = { xs: 12, md: 8 },
  gap = 'md',
  containerSize = 'default',
}) => (
  <GridContainer size={containerSize} gap={gap}>
    <GridItem {...leftWidth}>{left}</GridItem>
    <GridItem {...rightWidth}>{right}</GridItem>
  </GridContainer>
);

/**
 * Three Column Layout
 *
 * @example
 * <ThreeColumnLayout
 *   left={<div>Left Sidebar</div>}
 *   center={<div>Main Content</div>}
 *   right={<div>Right Sidebar</div>}
 * />
 */
interface ThreeColumnLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  centerWidth?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  rightWidth?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'default' | 'lg' | 'xl' | 'fluid';
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  left,
  center,
  right,
  leftWidth = { xs: 12, lg: 3 },
  centerWidth = { xs: 12, lg: 6 },
  rightWidth = { xs: 12, lg: 3 },
  gap = 'md',
  containerSize = 'default',
}) => (
  <GridContainer size={containerSize} gap={gap}>
    <GridItem {...leftWidth}>{left}</GridItem>
    <GridItem {...centerWidth}>{center}</GridItem>
    <GridItem {...rightWidth}>{right}</GridItem>
  </GridContainer>
);

/**
 * Card Grid Layout
 *
 * @example
 * <CardGrid items={items} xs={1} sm={2} md={3} lg={4} />
 */
interface CardGridProps {
  items: React.ReactNode[];
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'default' | 'lg' | 'xl' | 'fluid';
}

export const CardGrid: React.FC<CardGridProps> = ({
  items,
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl = 4,
  gap = 'md',
  containerSize = 'default',
}) => {
  const getColumnsPerRow = (cols: number) => Math.floor(12 / cols);

  return (
    <GridContainer size={containerSize} gap={gap}>
      {items.map((item, index) => (
        <GridItem
          key={index}
          xs={getColumnsPerRow(xs)}
          sm={getColumnsPerRow(sm)}
          md={getColumnsPerRow(md)}
          lg={getColumnsPerRow(lg)}
          xl={getColumnsPerRow(xl)}
        >
          {item}
        </GridItem>
      ))}
    </GridContainer>
  );
};

// Grid System Hook for programmatic access
export const useGridSystem = () => {
  const getColumnWidth = (columns: number): string => {
    return `calc(100% / 12 * ${columns})`;
  };

  const getResponsiveColumns = (
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    columns: number
  ): string => {
    return `${breakpoint}-col-${columns}`;
  };

  const getFlexColumns = (columns: number): React.CSSProperties => ({
    flex: `0 0 ${getColumnWidth(columns)}`,
    maxWidth: getColumnWidth(columns),
  });

  return {
    getColumnWidth,
    getResponsiveColumns,
    getFlexColumns,
  };
};

const GridComponents = {
  GridContainer,
  GridItem,
  TwoColumnLayout,
  ThreeColumnLayout,
  CardGrid,
  useGridSystem,
};

export default GridComponents;
