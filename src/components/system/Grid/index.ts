/**
 * @fileoverview Grid System Components - Responsive 12-column grid system
 * @component Grid
 *
 * @description
 * A comprehensive responsive grid system providing layout components and utilities for building
 * flexible layouts. Includes container, item, and pre-built layout components with responsive
 * breakpoints and customizable spacing.
 *
 * @example
 * ```tsx
 * import { GridContainer, GridItem, TwoColumnLayout } from '@/components/system/Grid';
 *
 * // Basic grid usage
 * <GridContainer>
 *   <GridItem xs={12} md={6}>Content 1</GridItem>
 *   <GridItem xs={12} md={6}>Content 2</GridItem>
 * </GridContainer>
 *
 * // Pre-built layout
 * <TwoColumnLayout
 *   leftContent={<div>Sidebar</div>}
 *   rightContent={<div>Main content</div>}
 * />
 * ```
 */
export {
  CardGrid,
  GridContainer,
  GridItem,
  ThreeColumnLayout,
  TwoColumnLayout,
  useGridSystem,
} from './Grid';

export type {} from // Export types for better TypeScript support
'./Grid';
