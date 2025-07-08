/**
 * @fileoverview Core Web Vitals optimization utilities and performance enhancement tools.
 * Provides comprehensive performance optimization features including CSS optimization,
 * font loading strategies, image optimization, lazy loading, and resource preloading.
 */

import { NextFont } from 'next/dist/compiled/@next/font';

/**
 * Critical CSS styles for above-the-fold rendering optimization.
 * Contains essential styles that should be inlined to prevent render-blocking.
 */
export const criticalStyles = {
  // Above-the-fold styles for immediate rendering
  layout: `
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #ffffff;
    }

    .loading-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `,
};

/**
 * Optimizes Next.js font loading with performance best practices.
 * Applies font-display: swap to improve Cumulative Layout Shift (CLS).
 *
 * @param font - Next.js font object
 * @returns Optimized font configuration with performance settings
 *
 * @example
 * ```typescript
 * import { Inter } from 'next/font/google';
 * const inter = Inter({ subsets: ['latin'] });
 * const optimizedFont = optimizeFont(inter);
 * ```
 */
export const optimizeFont = (font: NextFont) => ({
  className: font.className,
  style: {
    fontDisplay: 'swap' as const, // Improve CLS by using font-display: swap
  },
});

/**
 * Image optimization configuration for different loading strategies.
 * Provides presets for critical above-the-fold images and lazy-loaded content.
 */
export const imageOptimization = {
  // Critical above-the-fold images
  critical: {
    priority: true,
    loading: 'eager' as const,
    fetchPriority: 'high' as const,
  },

  // Below-the-fold images
  lazy: {
    priority: false,
    loading: 'lazy' as const,
    fetchPriority: 'low' as const,
  },

  // Responsive image sizes
  sizes: {
    mobile: '100vw',
    tablet: '(max-width: 768px) 100vw, 50vw',
    desktop: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
};

/**
 * Resource preloading configuration for critical assets.
 * Defines fonts, images, and other resources that should be preloaded for better performance.
 */
export const preloadResources = [
  // Critical fonts
  {
    href: '/fonts/Inter-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    href: '/fonts/Inter-Medium.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },

  // Critical images
  {
    href: '/logo.png',
    as: 'image',
    type: 'image/png',
  },
];

/**
 * Creates an Intersection Observer for lazy loading content.
 * Automatically loads images and components when they enter the viewport.
 *
 * @returns IntersectionObserver instance or null if not in browser environment
 *
 * @example
 * ```typescript
 * const lazyLoader = createLazyLoader();
 * if (lazyLoader) {
 *   lazyLoader.observe(imageElement);
 * }
 * ```
 */
export const createLazyLoader = () => {
  if (typeof window === 'undefined') return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          // Load lazy images
          if (target.dataset.src) {
            (target as HTMLImageElement).src = target.dataset.src;
            target.removeAttribute('data-src');
          }

          // Load lazy components
          if (target.dataset.component) {
            target.setAttribute('data-loaded', 'true');
          }

          observer.unobserve(target);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
    }
  );

  return observer;
};

// Performance monitoring utilities
export const vitals = {
  // Track Core Web Vitals (simplified for type safety)
  trackCLS: () => {
    if (typeof window === 'undefined') return;

    let clsValue = 0;
    const clsEntries: PerformanceEntry[] = [];

    // Note: Full implementation would require proper Performance API types
    // This is a simplified version for demonstration
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Type assertion for performance API - would need proper types in production
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsValue += layoutShiftEntry.value;
          clsEntries.push(entry);
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    return () => {
      observer.disconnect();
      return { value: clsValue, entries: clsEntries };
    };
  },

  trackLCP: () => {
    if (typeof window === 'undefined') return;

    let lcpValue = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        lcpValue = lastEntry.startTime;
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    return () => {
      observer.disconnect();
      return lcpValue;
    };
  },

  trackFID: () => {
    if (typeof window === 'undefined') return;

    let fidValue = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Type assertion for performance API - would need proper types in production
        const firstInputEntry = entry as PerformanceEntry & {
          processingStart?: number;
        };
        if (firstInputEntry.processingStart) {
          fidValue = firstInputEntry.processingStart - entry.startTime;
        }
      }
    });

    observer.observe({ type: 'first-input', buffered: true });

    return () => {
      observer.disconnect();
      return fidValue;
    };
  },
};

// SEO performance optimizations
export const seoOptimizations = {
  // Reduce JavaScript bundle size impact
  splitCode: {
    // Critical: Load immediately
    critical: ['navigation', 'hero', 'contact-form'],

    // Important: Load after critical
    important: ['footer', 'services', 'about'],

    // Deferred: Load on interaction
    deferred: ['animations', 'analytics', 'chat'],
  },

  // Resource hints for better loading
  resourceHints: [
    // DNS prefetch for external resources
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },

    // Preconnect for critical third-parties
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],

  // Service Worker for SEO benefits
  serviceWorkerConfig: {
    // Cache strategy for better performance
    strategies: {
      pages: 'networkFirst', // Always fresh content
      images: 'cacheFirst', // Fast image loading
      fonts: 'cacheFirst', // Consistent typography
      api: 'networkFirst', // Fresh data
    },

    // Offline fallbacks
    offlineFallbacks: {
      document: '/offline',
      image: '/fallback-image.jpg',
    },
  },
};

const performanceOptimizations = {
  criticalStyles,
  optimizeFont,
  imageOptimization,
  preloadResources,
  createLazyLoader,
  vitals,
  seoOptimizations,
};

export default performanceOptimizations;
