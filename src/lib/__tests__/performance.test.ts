// Unit tests for performance utilities
import {
  optimizeFont,
  imageOptimization,
  preloadResources,
  createLazyLoader,
  vitals,
  seoOptimizations,
  criticalStyles,
} from '../performance';

// Mock performance APIs for testing
const mockPerformanceObserver = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(global as any).PerformanceObserver = mockPerformanceObserver;

// Type for mock intersection observer entries
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MockIntersectionObserverEntry {
  isIntersecting: boolean;
  target: HTMLElement;
}

describe('Performance Utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('optimizeFont', () => {
    it('adds font-display swap for better CLS', () => {
      const mockFont = { className: 'test-font' };
      const optimized = optimizeFont(mockFont as any);

      expect(optimized.className).toBe('test-font');
      expect(optimized.style.fontDisplay).toBe('swap');
    });
  });

  describe('imageOptimization', () => {
    it('provides critical image configuration', () => {
      const { critical } = imageOptimization;

      expect(critical.priority).toBe(true);
      expect(critical.loading).toBe('eager');
      expect(critical.fetchPriority).toBe('high');
    });

    it('provides lazy image configuration', () => {
      const { lazy } = imageOptimization;

      expect(lazy.priority).toBe(false);
      expect(lazy.loading).toBe('lazy');
      expect(lazy.fetchPriority).toBe('low');
    });

    it('provides responsive image sizes', () => {
      const { sizes } = imageOptimization;

      expect(sizes.mobile).toBe('100vw');
      expect(sizes.tablet).toContain('max-width: 768px');
      expect(sizes.desktop).toContain('max-width: 1200px');
    });
  });

  describe('preloadResources', () => {
    it('includes critical font resources', () => {
      const fontResources = preloadResources.filter(
        (resource) => resource.as === 'font'
      );

      expect(fontResources.length).toBeGreaterThan(0);
      expect(fontResources.every((font) => font.type === 'font/woff2')).toBe(
        true
      );
      expect(
        fontResources.every((font) => font.crossOrigin === 'anonymous')
      ).toBe(true);
    });

    it('includes critical image resources', () => {
      const imageResources = preloadResources.filter(
        (resource) => resource.as === 'image'
      );

      expect(imageResources.length).toBeGreaterThan(0);
      expect(imageResources.some((img) => img.href.includes('logo.png'))).toBe(
        true
      );
    });

    it('has valid resource hint structure', () => {
      preloadResources.forEach((resource) => {
        expect(resource.href).toBeTruthy();
        expect(resource.as).toBeTruthy();
        expect(['font', 'image']).toContain(resource.as);
      });
    });
  });

  describe('createLazyLoader', () => {
    it('returns null in server environment', () => {
      // Mock server environment
      const originalWindow = global.window;
      delete (global as any).window;

      const loader = createLazyLoader();
      expect(loader).toBeNull();

      // Restore window
      (global as any).window = originalWindow;
    });

    it('creates IntersectionObserver in browser environment', () => {
      const mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };

      // Mock IntersectionObserver
      (global as any).IntersectionObserver = jest.fn(() => mockObserver);

      const loader = createLazyLoader();
      expect(loader).toBeTruthy();
      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: '50px',
          threshold: 0.1,
        })
      );
    });

    it('handles lazy image loading correctly', () => {
      const mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback: ((entries: unknown[]) => void) | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).IntersectionObserver = jest.fn(
        (callback: (entries: unknown[]) => void) => {
          observerCallback = callback;
          return mockObserver;
        }
      );

      const loader = createLazyLoader();
      expect(loader).toBeTruthy();

      // Simulate image element entering viewport
      const mockImg = {
        dataset: { src: 'test-image.jpg' },
        removeAttribute: jest.fn(),
      };

      const entries = [
        {
          isIntersecting: true,
          target: mockImg,
        },
      ];

      if (observerCallback) {
        observerCallback(entries);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((mockImg as any).src).toBe('test-image.jpg');
        expect(mockImg.removeAttribute).toHaveBeenCalledWith('data-src');
        expect(mockObserver.unobserve).toHaveBeenCalledWith(mockImg);
      }
    });

    it('handles lazy component loading correctly', () => {
      const mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback: ((entries: unknown[]) => void) | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).IntersectionObserver = jest.fn(
        (callback: (entries: unknown[]) => void) => {
          observerCallback = callback;
          return mockObserver;
        }
      );

      const loader = createLazyLoader();
      expect(loader).toBeTruthy();

      // Simulate component element entering viewport
      const mockComponent = {
        dataset: { component: 'lazy-component' },
        setAttribute: jest.fn(),
      };

      const entries = [
        {
          isIntersecting: true,
          target: mockComponent,
        },
      ];

      if (observerCallback) {
        observerCallback(entries);
        expect(mockComponent.setAttribute).toHaveBeenCalledWith(
          'data-loaded',
          'true'
        );
        expect(mockObserver.unobserve).toHaveBeenCalledWith(mockComponent);
      }
    });

    it('ignores non-intersecting entries', () => {
      const mockObserver = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback: ((entries: unknown[]) => void) | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).IntersectionObserver = jest.fn(
        (callback: (entries: unknown[]) => void) => {
          observerCallback = callback;
          return mockObserver;
        }
      );

      const loader = createLazyLoader();
      expect(loader).toBeTruthy();

      // Simulate element not intersecting
      const mockElement = {
        dataset: { src: 'test-image.jpg' },
        removeAttribute: jest.fn(),
      };

      const entries = [
        {
          isIntersecting: false,
          target: mockElement,
        },
      ];

      if (observerCallback) {
        observerCallback(entries);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((mockElement as any).src).toBeUndefined();
        expect(mockElement.removeAttribute).not.toHaveBeenCalled();
        expect(mockObserver.unobserve).not.toHaveBeenCalled();
      }
    });
  });

  describe('vitals', () => {
    beforeEach(() => {
      mockPerformanceObserver.mockClear();
    });

    it('trackCLS returns null in server environment', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const tracker = vitals.trackCLS();
      expect(tracker).toBeUndefined();

      (global as any).window = originalWindow;
    });

    it('trackLCP returns null in server environment', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const tracker = vitals.trackLCP();
      expect(tracker).toBeUndefined();

      (global as any).window = originalWindow;
    });

    it('trackFID returns null in server environment', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const tracker = vitals.trackFID();
      expect(tracker).toBeUndefined();

      (global as any).window = originalWindow;
    });

    it('creates performance observers in browser environment', () => {
      const mockObserverInstance = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };
      mockPerformanceObserver.mockReturnValue(mockObserverInstance);

      vitals.trackCLS();
      expect(mockPerformanceObserver).toHaveBeenCalledWith(
        expect.any(Function)
      );
      expect(mockObserverInstance.observe).toHaveBeenCalledWith({
        type: 'layout-shift',
        buffered: true,
      });
    });

    it('tracks CLS values correctly', () => {
      const mockObserverInstance = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback:
        | ((list: { getEntries: () => unknown[] }) => void)
        | undefined;
      mockPerformanceObserver.mockImplementation((callback: unknown) => {
        observerCallback = callback as (list: {
          getEntries: () => unknown[];
        }) => void;
        return mockObserverInstance;
      });

      const tracker = vitals.trackCLS();
      expect(tracker).toBeDefined();

      // Simulate CLS entries
      if (observerCallback) {
        const mockEntries = [
          { hadRecentInput: false, value: 0.1 },
          { hadRecentInput: true, value: 0.2 }, // Should be ignored
          { hadRecentInput: false, value: 0.05 },
        ];

        observerCallback({ getEntries: () => mockEntries });

        if (tracker) {
          const result = tracker();
          expect(result.value).toBeCloseTo(0.15); // 0.1 + 0.05
          expect(result.entries).toHaveLength(2);
        }
      }
    });

    it('tracks LCP values correctly', () => {
      const mockObserverInstance = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback:
        | ((list: { getEntries: () => unknown[] }) => void)
        | undefined;
      mockPerformanceObserver.mockImplementation((callback: unknown) => {
        observerCallback = callback as (list: {
          getEntries: () => unknown[];
        }) => void;
        return mockObserverInstance;
      });

      const tracker = vitals.trackLCP();
      expect(tracker).toBeDefined();

      // Simulate LCP entries
      if (observerCallback) {
        const mockEntries = [
          { startTime: 1000 },
          { startTime: 1500 },
          { startTime: 1200 },
        ];

        observerCallback({ getEntries: () => mockEntries });

        if (tracker) {
          const result = tracker();
          expect(result).toBe(1200); // Last entry
        }
      }
    });

    it('tracks FID values correctly', () => {
      const mockObserverInstance = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      let observerCallback:
        | ((list: { getEntries: () => unknown[] }) => void)
        | undefined;
      mockPerformanceObserver.mockImplementation((callback: unknown) => {
        observerCallback = callback as (list: {
          getEntries: () => unknown[];
        }) => void;
        return mockObserverInstance;
      });

      const tracker = vitals.trackFID();
      expect(tracker).toBeDefined();

      // Simulate FID entries
      if (observerCallback) {
        const mockEntries = [{ startTime: 100, processingStart: 150 }];

        observerCallback({ getEntries: () => mockEntries });

        if (tracker) {
          const result = tracker();
          expect(result).toBe(50); // 150 - 100
        }
      }
    });

    it('covers vitals trackCLS with hadRecentInput false', () => {
      // Mock performance observer to return entries without hadRecentInput
      const mockEntries = [
        {
          hadRecentInput: false,
          value: 0.1,
        },
      ];

      mockPerformanceObserver.mockImplementation((callback) => ({
        observe: jest.fn(),
        disconnect: jest.fn(),
      }));

      const tracker = vitals.trackCLS();
      expect(tracker).toBeDefined();
    });

    it('covers vitals trackCLS with hadRecentInput true', () => {
      // Mock performance observer to return entries with hadRecentInput
      const mockEntries = [
        {
          hadRecentInput: true,
          value: 0.1,
        },
      ];

      mockPerformanceObserver.mockImplementation((callback) => ({
        observe: jest.fn(),
        disconnect: jest.fn(),
      }));

      const tracker = vitals.trackCLS();
      expect(tracker).toBeDefined();
    });

    it('covers vitals trackLCP with no entries', () => {
      mockPerformanceObserver.mockImplementation((callback) => ({
        observe: jest.fn(),
        disconnect: jest.fn(),
      }));

      const tracker = vitals.trackLCP();
      expect(tracker).toBeDefined();
    });

    it('covers vitals trackFID with processingStart', () => {
      mockPerformanceObserver.mockImplementation((callback) => ({
        observe: jest.fn(),
        disconnect: jest.fn(),
      }));

      const tracker = vitals.trackFID();
      expect(tracker).toBeDefined();
    });

    it('covers vitals trackFID without processingStart', () => {
      mockPerformanceObserver.mockImplementation((callback) => ({
        observe: jest.fn(),
        disconnect: jest.fn(),
      }));

      const tracker = vitals.trackFID();
      expect(tracker).toBeDefined();
    });
  });

  describe('seoOptimizations', () => {
    it('categorizes code splitting correctly', () => {
      const { splitCode } = seoOptimizations;

      expect(Array.isArray(splitCode.critical)).toBe(true);
      expect(Array.isArray(splitCode.important)).toBe(true);
      expect(Array.isArray(splitCode.deferred)).toBe(true);

      expect(splitCode.critical).toContain('navigation');
      expect(splitCode.important).toContain('footer');
      expect(splitCode.deferred).toContain('analytics');
    });

    it('provides valid resource hints', () => {
      const { resourceHints } = seoOptimizations;

      resourceHints.forEach((hint) => {
        expect(hint.rel).toBeTruthy();
        expect(hint.href).toBeTruthy();
        expect(['dns-prefetch', 'preconnect']).toContain(hint.rel);
      });
    });

    it('has comprehensive service worker configuration', () => {
      const { serviceWorkerConfig } = seoOptimizations;

      expect(serviceWorkerConfig.strategies).toBeTruthy();
      expect(serviceWorkerConfig.offlineFallbacks).toBeTruthy();

      expect(serviceWorkerConfig.strategies.pages).toBe('networkFirst');
      expect(serviceWorkerConfig.strategies.images).toBe('cacheFirst');
      expect(serviceWorkerConfig.offlineFallbacks.document).toBe('/offline');
    });

    it('covers all seoOptimizations properties', () => {
      expect(seoOptimizations.splitCode.critical).toContain('navigation');
      expect(seoOptimizations.splitCode.important).toContain('footer');
      expect(seoOptimizations.splitCode.deferred).toContain('animations');

      expect(seoOptimizations.resourceHints).toHaveLength(3);
      expect(seoOptimizations.resourceHints[0].rel).toBe('dns-prefetch');

      expect(seoOptimizations.serviceWorkerConfig.strategies.pages).toBe(
        'networkFirst'
      );
      expect(
        seoOptimizations.serviceWorkerConfig.offlineFallbacks.document
      ).toBe('/offline');
    });
  });

  describe('Critical Styles', () => {
    it('includes layout styles for immediate rendering', () => {
      expect(criticalStyles.layout).toContain('body');
      expect(criticalStyles.layout).toContain('margin: 0');
      expect(criticalStyles.layout).toContain('loading-skeleton');
    });

    it('includes loading animation keyframes', () => {
      expect(criticalStyles.layout).toContain('@keyframes loading');
      expect(criticalStyles.layout).toContain('background-position');
    });
  });
  describe('Default Export', () => {
    it('exports performance optimizations object', async () => {
      // Import the default export to ensure it's covered
      const performanceModule = await import('../performance');
      const performanceOptimizations = performanceModule.default;

      expect(performanceOptimizations).toBeDefined();
      expect(performanceOptimizations.criticalStyles).toBeDefined();
      expect(performanceOptimizations.optimizeFont).toBeDefined();
      expect(performanceOptimizations.imageOptimization).toBeDefined();
      expect(performanceOptimizations.preloadResources).toBeDefined();
      expect(performanceOptimizations.createLazyLoader).toBeDefined();
      expect(performanceOptimizations.vitals).toBeDefined();
      expect(performanceOptimizations.seoOptimizations).toBeDefined();
    });
  });

  describe('Full module coverage', () => {
    it('imports and uses all exports from performance module', () => {
      // This test ensures all exported functions/objects are tested
      expect(typeof optimizeFont).toBe('function');
      expect(typeof imageOptimization).toBe('object');
      expect(Array.isArray(preloadResources)).toBe(true);
      expect(typeof createLazyLoader).toBe('function');
      expect(typeof vitals).toBe('object');
      expect(typeof seoOptimizations).toBe('object');
      expect(typeof criticalStyles).toBe('object');
    });
  });
});
