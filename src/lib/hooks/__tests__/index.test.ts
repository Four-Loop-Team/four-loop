/**
 * @fileoverview Tests for hooks index exports.
 * Ensures all hooks are properly exported from the index file.
 */

describe('Hooks Index', () => {
  it('should export all hook modules', async () => {
    const hooksIndex = await import('../index');

    // Test that all expected exports are available
    expect(hooksIndex.useLocalStorage).toBeDefined();
    expect(hooksIndex.useMediaQuery).toBeDefined();
    expect(hooksIndex.useBreakpoint).toBeDefined();
    expect(hooksIndex.useIsDesktop).toBeDefined();
    expect(hooksIndex.useIsMobile).toBeDefined();
    expect(hooksIndex.useIsTablet).toBeDefined();
    expect(hooksIndex.useScrollPosition).toBeDefined();
    expect(hooksIndex.useScrollDirection).toBeDefined();
    expect(hooksIndex.useScrollThreshold).toBeDefined();
  });

  it('should export functions for all hook modules', async () => {
    const hooksIndex = await import('../index');

    // Test that exports are functions
    expect(typeof hooksIndex.useLocalStorage).toBe('function');
    expect(typeof hooksIndex.useMediaQuery).toBe('function');
    expect(typeof hooksIndex.useBreakpoint).toBe('function');
    expect(typeof hooksIndex.useIsDesktop).toBe('function');
    expect(typeof hooksIndex.useIsMobile).toBe('function');
    expect(typeof hooksIndex.useIsTablet).toBe('function');
    expect(typeof hooksIndex.useScrollPosition).toBe('function');
    expect(typeof hooksIndex.useScrollDirection).toBe('function');
    expect(typeof hooksIndex.useScrollThreshold).toBe('function');
  });
});
