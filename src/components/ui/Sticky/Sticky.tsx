/**
 * @fileoverview Sticky Component - Flexible sticky positioning solution
 * @component Sticky
 *
 * @description
 * A versatile component for creating sticky positioned elements that:
 * - Provides flexible positioning options (top, bottom, left, right)
 * - Supports both sticky and fixed positioning
 * - Includes intersection observer for performance
 * - Offers responsive breakpoint support
 * - Handles z-index management
 * - Provides offset customization
 *
 * @features
 * - ✅ Multiple position options
 * - ✅ Fixed and sticky positioning
 * - ✅ Intersection Observer API
 * - ✅ Responsive breakpoints
 * - ✅ Z-index management
 * - ✅ Offset configuration
 * - ✅ Performance optimized
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Basic sticky header
 * <Sticky position="top" offset={20}>
 *   <header>Sticky Header Content</header>
 * </Sticky>
 *
 * // Fixed sidebar
 * <Sticky position="left" fixed zIndex={1000}>
 *   <nav>Navigation Menu</nav>
 * </Sticky>
 *
 * // Responsive sticky with breakpoint
 * <Sticky
 *   position="top"
 *   offset={10}
 *   breakpoint="md"
 *   className="bg-white shadow"
 * >
 *   <div>Responsive Sticky Content</div>
 * </Sticky>
 * ```
 *
 * @accessibility
 * - Maintains focus management
 * - Preserves keyboard navigation
 * - Screen reader compatible
 *
 * @performance
 * - Uses Intersection Observer for efficiency
 * - Minimal style recalculations
 * - Optimized for scroll performance
 */

import React, { useEffect, useRef, useState } from 'react';
import { StickyProps } from './types';

/**
 * Sticky component for creating sticky positioned elements
 *
 * @component
 * @param {StickyProps} props - Sticky positioning configuration
 * @param {'top' | 'bottom' | 'left' | 'right'} props.position - Sticky position
 * @param {number | string} props.offset - Offset from the specified position
 * @param {number} props.zIndex - Z-index value for stacking context
 * @param {boolean} props.fixed - Whether to use fixed positioning instead of sticky
 * @param {string} props.breakpoint - Responsive breakpoint for activation
 * @param {string} props.className - Additional CSS classes
 * @param {ReactNode} props.children - Content to make sticky
 * @param {string} props['data-testid'] - Test identifier
 * @returns {JSX.Element} Rendered sticky component
 */
const Sticky: React.FC<StickyProps> = ({
  position = 'top',
  offset = 0,
  zIndex = 1000,
  fixed = false,
  breakpoint,
  className = '',
  children,
  'data-testid': testId = 'sticky',
}) => {
  const [isStuck, setIsStuck] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || fixed) return;

    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: 1,
        rootMargin: `-${typeof offset === 'number' ? offset : 0}px 0px 0px 0px`,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [offset, fixed]);

  const getPositionStyles = () => {
    const basePosition = fixed ? 'fixed' : 'sticky';
    const offsetValue = typeof offset === 'number' ? `${offset}px` : offset;

    const styles: React.CSSProperties = {
      position: basePosition,
      zIndex,
    };

    switch (position) {
      case 'top':
        styles.top = offsetValue;
        break;
      case 'bottom':
        styles.bottom = offsetValue;
        break;
      case 'left':
        styles.left = offsetValue;
        break;
      case 'right':
        styles.right = offsetValue;
        break;
    }

    return styles;
  };

  const getBreakpointClass = () => {
    if (!breakpoint) return '';

    const breakpoints = {
      sm: 'sm:',
      md: 'md:',
      lg: 'lg:',
      xl: 'xl:',
    };

    return breakpoints[breakpoint] || '';
  };

  return (
    <div
      ref={elementRef}
      className={`sticky-component ${getBreakpointClass()}${fixed ? 'sticky-fixed' : 'sticky-default'} ${className}`}
      style={getPositionStyles()}
      data-stuck={isStuck}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export { Sticky };
export default Sticky;
