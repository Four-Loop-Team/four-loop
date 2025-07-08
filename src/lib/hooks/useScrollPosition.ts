/**
 * React hooks for tracking scroll position and direction
 * @fileoverview Custom hooks for monitoring page scroll behavior with throttling and performance optimization
 */

import { useEffect, useState } from 'react';
import { throttle } from '../utils';

/**
 * Scroll position coordinates interface
 * @interface ScrollPosition
 */
interface ScrollPosition {
  /** Horizontal scroll position in pixels */
  x: number;
  /** Vertical scroll position in pixels */
  y: number;
}

/**
 * Hook for tracking the current scroll position of the page
 * Uses throttling to improve performance during rapid scroll events
 *
 * @returns {ScrollPosition} Current scroll position with x and y coordinates
 * @example
 * ```tsx
 * function ScrollTracker() {
 *   const { x, y } = useScrollPosition();
 *
 *   return (
 *     <div>
 *       Scrolled {x}px horizontally, {y}px vertically
 *     </div>
 *   );
 * }
 * ```
 */
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
 * Hook for detecting scroll direction (up or down)
 * Useful for showing/hiding navigation bars or triggering animations
 *
 * @returns {'up' | 'down' | null} Current scroll direction or null if no scrolling detected
 * @example
 * ```tsx
 * function NavigationBar() {
 *   const scrollDirection = useScrollDirection();
 *
 *   return (
 *     <nav className={scrollDirection === 'down' ? 'hidden' : 'visible'}>
 *       Navigation content
 *     </nav>
 *   );
 * }
 * ```
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
 * Hook for detecting if user has scrolled past a specific threshold
 * Useful for triggering UI changes based on scroll depth
 *
 * @param {number} [threshold=100] - Scroll position threshold in pixels
 * @returns {boolean} True if scrolled past threshold, false otherwise
 * @example
 * ```tsx
 * function StickyHeader() {
 *   const hasScrolled = useScrollThreshold(50);
 *
 *   return (
 *     <header className={hasScrolled ? 'sticky-active' : ''}>
 *       Header content
 *     </header>
 *   );
 * }
 *
 * // Custom threshold
 * const isPastHero = useScrollThreshold(600);
 * ```
 */
export function useScrollThreshold(threshold: number = 100): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}
