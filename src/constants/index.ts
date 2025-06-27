/**
 * Centralized constants export
 * Re-exports all constants for easy importing throughout the application
 */

// Routes and navigation
export {
  EXTERNAL_LINKS,
  NAVIGATION_ITEMS,
  ROUTES,
  type Route,
  type RouteKey,
} from './routes';

// Responsive breakpoints
export {
  BREAKPOINTS,
  GRID_COLUMNS,
  GRID_SPACING,
  MEDIA_QUERIES,
  type BreakpointKey,
  type MediaQueryKey,
} from './breakpoints';

// Colors and theme
export { COLORS, THEME_MODES, Z_INDEX, type ThemeMode } from './colors';
