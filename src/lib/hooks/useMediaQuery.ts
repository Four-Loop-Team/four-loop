/**
 * Hook for responsive media queries
 */

import { useEffect, useState } from 'react';
import { MEDIA_QUERIES } from '../../constants';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
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
