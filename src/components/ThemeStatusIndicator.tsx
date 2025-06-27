/**
 * Theme Status Indicator Component
 * Shows current theme state - client-side only
 */

'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
