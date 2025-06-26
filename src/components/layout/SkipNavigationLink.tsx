'use client';

import React from 'react';

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
