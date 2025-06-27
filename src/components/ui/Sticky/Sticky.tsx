/**
 * Sticky Component
 * A flexible component for creating sticky positioned elements
 */

import React, { useEffect, useRef, useState } from 'react';
import { StickyProps } from './types';

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
      className={`${getBreakpointClass()}${fixed ? 'fixed' : 'sticky'} ${className}`}
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
