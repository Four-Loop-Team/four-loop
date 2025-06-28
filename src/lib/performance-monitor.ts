import budgetConfig from '../../performance-budget.json';

// Performance monitoring helper
export function performanceMonitor() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Web Vitals monitoring
    const vitalsData: Record<string, number> = {};

    // First Contentful Paint
    const fcpEntries = performance.getEntriesByName('first-contentful-paint');
    if (fcpEntries.length > 0) {
      vitalsData.fcp = fcpEntries[0].startTime;
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitalsData.lcp = lastEntry.startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch {
        // LCP monitoring not supported in this browser
      }
    }

    return vitalsData;
  }
  return {};
}

// Bundle analyzer configuration
export const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'server',
      analyzerPort: 8888,
    },
    client: {
      analyzerMode: 'static',
      reportFilename: '../bundle-analysis/client.html',
    },
  },
};

interface BundleAsset {
  name: string;
  size: number;
}

interface WebpackStats {
  assetsByChunkName?: Record<string, string | string[]>;
  assets?: BundleAsset[];
}

// Performance budget enforcement
export function checkPerformanceBudget(stats: WebpackStats) {
  const budget = budgetConfig;
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check bundle sizes
  if (stats.assetsByChunkName) {
    const mainBundle = stats.assetsByChunkName.main;
    if (mainBundle) {
      const mainSize = Array.isArray(mainBundle)
        ? mainBundle.reduce((total, file) => {
            const asset = stats.assets?.find((a) => a.name === file);
            return total + (asset?.size ?? 0);
          }, 0)
        : (stats.assets?.find((a) => a.name === mainBundle)?.size ?? 0);

      const mainBudget = budget.budget.find((b) => b.name === 'main');
      if (mainBudget) {
        const sizeKb = mainSize / 1024;
        const errorThreshold = parseInt(mainBudget.error.replace('kb', ''), 10);
        const warningThreshold = parseInt(
          mainBudget.warning.replace('kb', ''),
          10
        );

        if (sizeKb > errorThreshold) {
          errors.push(
            `Main bundle size ${sizeKb.toFixed(1)}kb exceeds error threshold ${mainBudget.error}`
          );
        } else if (sizeKb > warningThreshold) {
          warnings.push(
            `Main bundle size ${sizeKb.toFixed(1)}kb exceeds warning threshold ${mainBudget.warning}`
          );
        }
      }
    }
  }

  return { warnings, errors };
}

export default performanceMonitor;
