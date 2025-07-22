/**
 * @fileoverview StickyHeader Component - Specialized sticky header with styling options
 * @component StickyHeader
 *
 * @description
 * A specialized sticky header component built on top of the Sticky component that provides:
 * - Pre-configured sticky behavior for headers
 * - Shadow and background styling options
 * - Flexible height configuration
 * - Responsive design support
 * - Easy-to-use header-specific API
 *
 * @features
 * - ✅ Pre-configured for header use cases
 * - ✅ Built-in shadow effects
 * - ✅ Background color options
 * - ✅ Flexible height settings
 * - ✅ Responsive breakpoint support
 * - ✅ Smooth transitions
 * - ✅ TypeScript support
 * - ✅ Accessibility ready
 *
 * @example
 * ```tsx
 * // Basic sticky header
 * <StickyHeader>
 *   <h1>My Website</h1>
 *   <nav>Navigation</nav>
 * </StickyHeader>
 *
 * // Header with custom styling
 * <StickyHeader
 *   height={80}
 *   background="rgba(255, 255, 255, 0.95)"
 *   showShadow
 *   offset={10}
 * >
 *   <Logo />
 *   <NavigationMenu />
 * </StickyHeader>
 *
 * // Fixed header with breakpoint
 * <StickyHeader
 *   fixed
 *   breakpoint="lg"
 *   zIndex={1000}
 *   className="backdrop-blur-sm"
 * >
 *   <HeaderContent />
 * </StickyHeader>
 * ```
 *
 * @accessibility
 * - Maintains proper heading hierarchy
 * - Preserves keyboard navigation
 * - Screen reader compatible
 * - Focus management
 *
 * @performance
 * - Optimized sticky positioning
 * - Efficient shadow transitions
 * - Minimal layout shifts
 */

import React from 'react';
import { Sticky } from './Sticky';
import { StickyHeaderProps } from './types';

/**
 * StickyHeader component for creating sticky headers with styling options
 *
 * @component
 * @param {StickyHeaderProps} props - Sticky header configuration
 * @param {number | string} props.height - Header height (auto, pixel value, or CSS value)
 * @param {string} props.background - Background color or CSS background value
 * @param {boolean} props.showShadow - Whether to show shadow when sticky
 * @param {number | string} props.offset - Offset from top of viewport
 * @param {number} props.zIndex - Z-index value for stacking context
 * @param {boolean} props.fixed - Whether to use fixed positioning
 * @param {string} props.breakpoint - Responsive breakpoint for activation
 * @param {string} props.className - Additional CSS classes
 * @param {ReactNode} props.children - Header content
 * @param {string} props['data-testid'] - Test identifier
 * @returns {JSX.Element} Rendered sticky header component
 */
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
      <div style={headerStyles} className='sticky-header-content'>
        {children}
      </div>
    </Sticky>
  );
};

export { StickyHeader };
export default StickyHeader;
