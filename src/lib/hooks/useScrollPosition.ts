/**
 * Hook for tracking scroll position
 */

import { useEffect, useState } from 'react';
import { throttle } from '../utils';

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updatePosition = throttle(() => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }, 100);

    window.addEventListener('scroll', updatePosition);

    // Set initial position
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

/**
 * Hook for detecting scroll direction
 */
export function useScrollDirection(): 'up' | 'down' | null {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateScrollDirection = throttle(() => {
      const scrollY = window.pageYOffset;

      if (scrollY === lastScrollY) {
        return;
      }

      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      setLastScrollY(scrollY);
    }, 100);

    window.addEventListener('scroll', updateScrollDirection);

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}

/**
 * Hook for detecting if user has scrolled past a threshold
 */
export function useScrollThreshold(threshold: number = 100): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}
