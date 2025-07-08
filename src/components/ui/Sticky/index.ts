/**
 * @fileoverview Sticky component exports
 * @component Sticky
 *
 * @description
 * Export module for Sticky positioning components including Sticky and StickyHeader.
 * Provides components for creating sticky/fixed positioning behavior with scroll detection and responsive features.
 *
 * @example
 * ```tsx
 * import { Sticky, StickyHeader } from '@/components/ui/Sticky';
 *
 * <Sticky top={20}>
 *   <div>This content sticks to the top</div>
 * </Sticky>
 *
 * <StickyHeader>
 *   <nav>Navigation that sticks on scroll</nav>
 * </StickyHeader>
 * ```
 */

export { Sticky, Sticky as default } from './Sticky';
export { StickyHeader } from './StickyHeader';
export type {
  StickyFloatingProps,
  StickyHeaderProps,
  StickyProps,
  StickySidebarProps,
} from './types';
