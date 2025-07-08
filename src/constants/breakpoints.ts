/**
 * Responsive breakpoints and grid system constants
 * Defines the design system's responsive behavior and layout grid
 * @fileoverview Breakpoint definitions, media queries, and grid configuration
 */

/**
 * Responsive breakpoint pixel values
 * Based on common device sizes and design best practices
 * @constant
 */
export const BREAKPOINTS = {
  /** Extra small devices (phones) */
  xs: 0,
  /** Small devices (tablets) */
  sm: 600,
  /** Medium devices (small laptops) */
  md: 960,
  /** Large devices (desktops) */
  lg: 1280,
  /** Extra large devices (large desktops) */
  xl: 1920,
} as const;

/**
 * Pre-configured media query strings for responsive design
 * @constant
 */
export const MEDIA_QUERIES = {
  /** Min-width queries for mobile-first design */
  xs: `(min-width: ${BREAKPOINTS.xs}px)`,
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,

  /** Max-width queries for desktop-first design */
  maxXs: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  maxSm: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  maxMd: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  maxLg: `(max-width: ${BREAKPOINTS.xl - 1}px)`,
} as const;

/**
 * Standard 12-column grid system
 * @constant
 */
export const GRID_COLUMNS = 12;

/**
 * Grid spacing scale in pixels
 * @constant
 */
export const GRID_SPACING = {
  /** No spacing */
  none: 0,
  /** Extra small spacing (8px) */
  xs: 8,
  /** Small spacing (16px) */
  sm: 16,
  /** Medium spacing (24px) */
  md: 24,
  /** Large spacing (32px) */
  lg: 32,
  /** Extra large spacing (40px) */
  xl: 40,
} as const;

/**
 * Type for breakpoint keys
 */
export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Type for media query keys
 */
export type MediaQueryKey = keyof typeof MEDIA_QUERIES;
