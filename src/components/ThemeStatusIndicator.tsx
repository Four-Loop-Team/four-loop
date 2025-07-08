/**
 * @fileoverview Theme Status Indicator Component for displaying current theme state.
 * Client-side only component that shows the active theme with proper hydration handling.
 */

'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

/**
 * Component that displays the current theme status with SSR-safe rendering.
 * Shows both the user-selected theme preference and the resolved theme.
 *
 * @component
 * @returns JSX element displaying theme status information
 *
 * @example
 * ```tsx
 * // Basic usage in development or debug views
 * <ThemeStatusIndicator />
 *
 * // In a settings panel or debug panel
 * function DebugPanel() {
 *   return (
 *     <div>
 *       <h3>Debug Information</h3>
 *       <ThemeStatusIndicator />
 *     </div>
 *   );
 * }
 * ```
 *
 * @note This component is client-side only and handles hydration carefully
 * to prevent SSR mismatches. It displays a loading state until mounted.
 */
export function ThemeStatusIndicator() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Typography
        variant='caption'
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backgroundColor: 'action.hover',
          fontFamily: 'monospace',
        }}
      >
        loading...
      </Typography>
    );
  }

  return (
    <Typography
      variant='caption'
      sx={{
        px: 1,
        py: 0.5,
        borderRadius: 1,
        backgroundColor: 'action.hover',
        fontFamily: 'monospace',
      }}
    >
      {theme} → {resolvedTheme}
    </Typography>
  );
}
