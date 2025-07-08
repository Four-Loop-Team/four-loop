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
 * import { GridContainer, GridItem, MuiThemeProvider, GridSystemDemo } from '@/components/system';
 *
 * <MuiThemeProvider>
 *   <GridContainer>
 *     <GridItem xs={12}>
 *       <GridSystemDemo />
 *     </GridItem>
 *   </GridContainer>
 * </MuiThemeProvider>
 * ```
 */

export * from './Grid';
export { default as GridSystemDemo } from './GridSystemDemo';
export { default as MuiThemeProvider } from './MuiThemeProvider';
