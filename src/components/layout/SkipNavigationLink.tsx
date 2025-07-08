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
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 9999,
        padding: '8px 16px',
        backgroundColor: '#e2e891',
        color: '#232323',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '600',
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '8px';
        e.currentTarget.style.top = '8px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
        e.currentTarget.style.top = 'auto';
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigationLink;
