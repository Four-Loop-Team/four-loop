/**
 * Hook for responsive media queries
 */

import { useEffect, useState } from 'react';
import { MEDIA_QUERIES } from '../../constants';

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

// Convenience hooks for common breakpoints
export function useIsMobile(): boolean {
  return useMediaQuery(MEDIA_QUERIES.maxSm);
}

export function useIsTablet(): boolean {
  return useMediaQuery(`${MEDIA_QUERIES.sm} and ${MEDIA_QUERIES.maxMd}`);
}

export function useIsDesktop(): boolean {
  return useMediaQuery(MEDIA_QUERIES.lg);
}

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
