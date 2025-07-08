describe('performance-monitor', () => {
  let originalWindow: Window | undefined;
  let originalPerformance: Performance | undefined;

  beforeEach(() => {
    // Store original values
    originalWindow = globalThis.window;
    originalPerformance = globalThis.performance;

    // Remove from global scope
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).performance;

    jest.resetModules();
  });

  afterEach(() => {
    // Restore original values
    if (originalWindow !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).window = originalWindow;
    }
    if (originalPerformance !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).performance = originalPerformance;
    }
  });

  describe('performanceMonitor function', () => {
    it('should return empty object in server environment', async () => {
      const { performanceMonitor } = await import('../performance-monitor');

      const result = performanceMonitor();
      expect(result).toEqual({});
    });

    it('should return empty object when performance API is not available', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).window = {};

      const { performanceMonitor } = await import('../performance-monitor');

      const result = performanceMonitor();
      expect(result).toEqual({});
    });

    it('should handle missing PerformanceObserver gracefully', async () => {
      const mockPerformance = {
        getEntriesByName: () => [],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).window = {
        performance: mockPerformance,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).performance = mockPerformance;

      const { performanceMonitor } = await import('../performance-monitor');

      expect(() => performanceMonitor()).not.toThrow();
    });

    it('should collect FCP metric when available', async () => {
      const mockPerformance = {
        getEntriesByName: (name: string) =>
          name === 'first-contentful-paint' ? [{ startTime: 1500 }] : [],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).window = {
        performance: mockPerformance,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).performance = mockPerformance;

      const { performanceMonitor } = await import('../performance-monitor');

      const result = performanceMonitor();
      expect(result).toEqual({ fcp: 1500 });
    });
  });

  describe('checkPerformanceBudget function', () => {
    it('should return empty warnings and errors for empty stats', async () => {
      const { checkPerformanceBudget } = await import('../performance-monitor');

      const result = checkPerformanceBudget({});
      expect(result).toEqual({ warnings: [], errors: [] });
    });

    it('should return empty warnings and errors when no main bundle found', async () => {
      const { checkPerformanceBudget } = await import('../performance-monitor');

      const stats = {
        assetsByChunkName: {},
        assets: [],
      };

      const result = checkPerformanceBudget(stats);
      expect(result).toEqual({ warnings: [], errors: [] });
    });
  });

  describe('bundleAnalyzerConfig', () => {
    it('should export bundle analyzer configuration', async () => {
      const { bundleAnalyzerConfig } = await import('../performance-monitor');

      expect(bundleAnalyzerConfig).toBeDefined();
      expect(bundleAnalyzerConfig).toHaveProperty('enabled');
      expect(bundleAnalyzerConfig).toHaveProperty('bundleAnalyzerConfig');
    });
  });

  describe('default export', () => {
    it('should export performanceMonitor as default', async () => {
      const performanceModule = await import('../performance-monitor');
      const { performanceMonitor } = performanceModule;

      expect(performanceModule.default).toBe(performanceMonitor);
    });
  });
});
