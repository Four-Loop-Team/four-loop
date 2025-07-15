/**
 * @fileoverview System components export
 * @component System
 *
 * @description
 * Export module for system-level components including grid system, theme providers, and demo components.
 * Provides foundational components for layout, theming, and system demonstration.
 *
 * @example
 * ```tsx
 * import { GridContainer, GridItem, BrandThemeProvider, GridSystemDemo } from '@/components/system';
 *
 * <BrandThemeProvider>
 *   <GridContainer>
 *     <GridItem xs={12}>
 *       <GridSystemDemo />
 *     </GridItem>
 *   </GridContainer>
 * </BrandThemeProvider>
 * ```
 */

export { default as BrandThemeProvider } from './BrandThemeProvider';
export * from './Grid';
export { default as GridSystemDemo } from './GridSystemDemo';
