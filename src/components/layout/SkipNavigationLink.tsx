'use client';

import React from 'react';

/**
 * A skip navigation link component that provides keyboard accessibility
 * by allowing users to skip directly to the main content. The link is
 * visually hidden until focused, following WCAG accessibility guidelines.
 *
 * @component
 * @example
 * ```tsx
 * <SkipNavigationLink />
 * ```
 *
 * @accessibility
 * - Provides keyboard navigation skip functionality
 * - Follows WCAG 2.1 AA guidelines for skip links
 * - Becomes visible when focused via keyboard navigation
 * - Uses high contrast colors for visibility
 */
const SkipNavigationLink: React.FC = () => {
  return (
    <a
      href='#main-content'
      className='skip-link'
      onFocus={(e) => {
        e.currentTarget.classList.add('skip-link-focused');
      }}
      onBlur={(e) => {
        e.currentTarget.classList.remove('skip-link-focused');
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigationLink;
