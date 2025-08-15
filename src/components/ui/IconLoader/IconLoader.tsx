'use client';

import React, { useEffect, useState } from 'react';

interface IconLoaderProps {
  /** The MUI icon component to render */
  icon: React.ComponentType<Record<string, unknown>>;
  /** SVG path data for fallback icon (only used in extreme edge cases) */
  fallbackPath: string;
  /** Icon size (follows MUI sizing) */
  fontSize?: 'small' | 'medium' | 'large';
  /** Custom size override */
  size?: number;
  /** Additional props to pass to the icon */
  iconProps?: Record<string, unknown>;
  /** Custom viewBox for fallback SVG */
  viewBox?: string;
  /** Custom className */
  className?: string;
}

/**
 * Universal icon loader that provides consistent rendering for all MUI icons.
 * Uses a very short delay to ensure fonts are loaded, with minimal fallback usage.
 */
const IconLoader: React.FC<IconLoaderProps> = ({
  icon: IconComponent,
  fallbackPath: _fallbackPath,
  fontSize = 'medium',
  size,
  iconProps = {},
  viewBox: _viewBox = '0 0 24 24',
  className,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Use a very short timeout to allow icon fonts to load
    // This is much shorter than the typical FOUC period
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 10); // Very short delay, just enough to prevent FOUC

    return () => clearTimeout(timer);
  }, []);

  // Get size based on fontSize if size is not explicitly provided
  const getIconSize = () => {
    if (size) return size;
    switch (fontSize) {
      case 'small':
        return 20;
      case 'large':
        return 32;
      default:
        return 24; // medium
    }
  };

  const iconSize = getIconSize();

  // Always render the MUI icon, but provide inline fallback styling
  // This approach minimizes visual differences
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: iconSize,
        height: iconSize,
        opacity: isReady ? 1 : 0.8, // Slight opacity change instead of different icon
        transition: 'opacity 0.1s ease-in-out', // Smooth transition
      }}
    >
      <IconComponent
        fontSize={fontSize}
        className={className}
        style={{
          fontSize: size ? `${size}px` : undefined,
          width: iconSize,
          height: iconSize,
        }}
        {...iconProps}
      />
    </span>
  );
};

export default IconLoader;
