/**
 * Responsive breakpoints for the design system
 */

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

export const MEDIA_QUERIES = {
  xs: `(min-width: ${BREAKPOINTS.xs}px)`,
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,

  // Max-width queries
  maxXs: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  maxSm: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  maxMd: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  maxLg: `(max-width: ${BREAKPOINTS.xl - 1}px)`,
} as const;

export const GRID_COLUMNS = 12;
export const GRID_SPACING = {
  none: 0,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
export type MediaQueryKey = keyof typeof MEDIA_QUERIES;
