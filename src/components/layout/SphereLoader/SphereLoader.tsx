'use client';

import { initializeSphereLoader } from '@/lib/sphere-loader';
import { useEffect } from 'react';

/**
 * Client-side component to initialize sphere loading.
 * Prevents flash by loading sphere images before displaying them.
 */
export const SphereLoader = () => {
  useEffect(() => {
    initializeSphereLoader();
  }, []);

  return null; // This component doesn't render anything
};
