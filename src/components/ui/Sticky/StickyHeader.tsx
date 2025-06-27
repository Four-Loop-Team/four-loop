/**
 * StickyHeader Component
 * A sticky header component with shadow and background options
 */

import React from 'react';
import { Sticky } from './Sticky';
import { StickyHeaderProps } from './types';

const StickyHeader: React.FC<StickyHeaderProps> = ({
  height = 'auto',
  background = 'white',
  showShadow = true,
  offset = 0,
  zIndex = 1000,
  fixed = false,
  breakpoint,
  className = '',
  children,
  'data-testid': testId = 'sticky-header',
}) => {
  const headerStyles: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundColor: background,
  };

  const shadowClass = showShadow ? 'shadow-md' : '';
  const headerClasses = `w-full transition-shadow duration-200 ${shadowClass} ${className}`;

  return (
    <Sticky
      position='top'
      offset={offset}
      zIndex={zIndex}
      fixed={fixed}
      {...(breakpoint && { breakpoint })}
      className={headerClasses}
      data-testid={testId}
    >
      <div style={headerStyles} className='flex items-center'>
        {children}
      </div>
    </Sticky>
  );
};

export { StickyHeader };
export default StickyHeader;
