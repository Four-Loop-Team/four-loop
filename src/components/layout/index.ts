/**
 * @fileoverview Layout components export
 * @component Layout
 *
 * @description
 * Contains navigation, breadcrumbs, and other structural layout components.
 * Provides essential layout and navigation components for site structure and user navigation.
 *
 * @example
 * ```tsx
 * import { BreadcrumbNav, Navigation, SkipNavigationLink } from '@/components/layout';
 *
 * <div>
 *   <SkipNavigationLink />
 *   <Navigation />
 *   <BreadcrumbNav />
 *   <main>Content here</main>
 * </div>
 * ```
 */

export { default as BreadcrumbNav } from './BreadcrumbNav';
export { default as Navigation } from './Navigation';
export { default as SkipNavigationLink } from './SkipNavigationLink';
