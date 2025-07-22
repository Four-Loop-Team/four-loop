/**
 * @fileoverview Custom React hooks centralized export.
 * Provides a single import point for all custom hooks used throughout the application.
 */

export { useLocalStorage } from './useLocalStorage';
export {
  useBreakpoint,
  useIsDesktop,
  useIsMobile,
  useIsTablet,
  useMediaQuery,
} from './useMediaQuery';
export {
  useScrollDirection,
  useScrollPosition,
  useScrollThreshold,
} from './useScrollPosition';

// Design System hooks
export {
  useDesignSystem,
  useDesignSystemCSS,
  useDesignSystemClasses,
  useDesignSystemMUI,
} from '../../hooks/useDesignSystem';
