/**
 * @fileoverview Hook for responsive media queries with cross-browser compatibility.
 * Provides React hooks for detecting media query matches with proper cleanup and SSR support.
 */

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { MEDIA_QUERIES } from '../../constants';

/**
 * React hook for detecting media query matches with automatic updates.
 * Safely handles SSR by returning false during server-side rendering.
 *
 * @param query - CSS media query string to match against
 * @returns Boolean indicating whether the media query currently matches
 *
 * @example
 * ```typescript
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *   const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 *
 *   return (
 *     <div>
 *       {isMobile ? 'Mobile View' : 'Desktop View'}
 *       {isDarkMode && <span>Dark mode detected</span>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let mediaQuery: MediaQueryList | undefined;

    try {
      mediaQuery = window.matchMedia(query);

      // Check if mediaQuery is valid and has required properties
      if (!mediaQuery || typeof mediaQuery.matches !== 'boolean') {
        return undefined;
      }

      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Check if addEventListener is available (some browsers might not support it)
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handler);
        return () => {
          if (
            mediaQuery &&
            typeof mediaQuery.removeEventListener === 'function'
          ) {
            mediaQuery.removeEventListener('change', handler);
          }
        };
      } else if (typeof (mediaQuery as any).addListener === 'function') {
        // Fallback for older browsers
        (mediaQuery as any).addListener(handler);
        return () => {
          if (
            mediaQuery &&
            typeof (mediaQuery as any).removeListener === 'function'
          ) {
            (mediaQuery as any).removeListener(handler);
          }
        };
      }

      return undefined;
    } catch (error) {
      // Invalid media query, return default value
      return undefined;
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook to detect mobile screen sizes (up to small breakpoint).
 *
 * @returns Boolean indicating if current screen is mobile-sized
 *
 * @example
 * ```typescript
 * function Navigation() {
 *   const isMobile = useIsMobile();
 *   return (
 *     <nav>
 *       {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *     </nav>
 *   );
 * }
 * ```
 */
export function useIsMobile(): boolean {
  return useMediaQuery(MEDIA_QUERIES.maxSm);
}

/**
 * Convenience hook to detect tablet screen sizes (between small and medium breakpoints).
 *
 * @returns Boolean indicating if current screen is tablet-sized
 */
export function useIsTablet(): boolean {
  return useMediaQuery(`${MEDIA_QUERIES.sm} and ${MEDIA_QUERIES.maxMd}`);
}

/**
 * Convenience hook to detect desktop screen sizes (large breakpoint and above).
 *
 * @returns Boolean indicating if current screen is desktop-sized
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(MEDIA_QUERIES.lg);
}

/**
 * Comprehensive breakpoint detection hook providing all screen size information.
 *
 * @returns Object containing breakpoint detection results and current breakpoint name
 *
 * @example
 * ```typescript
 * function ResponsiveLayout() {
 *   const { isMobile, isTablet, isDesktop, current } = useBreakpoint();
 *
 *   return (
 *     <div className={`layout-${current}`}>
 *       Content optimized for {current} screens
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpoint() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  return {
    isMobile,
    isTablet,
    isDesktop,
    current: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
  };
}
