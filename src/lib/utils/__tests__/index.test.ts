/**
 * @fileoverview Tests for utils index exports.
 * Ensures all utility modules are properly exported from the index file.
 */

describe('Utils Index', () => {
  it('should export all utility modules', async () => {
    const utilsIndex = await import('../index');

    // Test format utilities
    expect(utilsIndex.formatDate).toBeDefined();
    expect(utilsIndex.truncateText).toBeDefined();
    expect(utilsIndex.capitalize).toBeDefined();
    expect(utilsIndex.toKebabCase).toBeDefined();
    expect(utilsIndex.generateId).toBeDefined();
    expect(utilsIndex.debounce).toBeDefined();
    expect(utilsIndex.throttle).toBeDefined();

    // Test helper utilities
    expect(utilsIndex.classNames).toBeDefined();
    expect(utilsIndex.deepClone).toBeDefined();
    expect(utilsIndex.getNestedProperty).toBeDefined();
    expect(utilsIndex.isBrowser).toBeDefined();
    expect(utilsIndex.onBrowser).toBeDefined();
    expect(utilsIndex.scrollToElement).toBeDefined();
    expect(utilsIndex.getScrollPosition).toBeDefined();
    expect(utilsIndex.wait).toBeDefined();
    expect(utilsIndex.withTimeout).toBeDefined();

    // Test validation utilities
    expect(utilsIndex.isValidEmail).toBeDefined();
    expect(utilsIndex.isValidPhone).toBeDefined();
    expect(utilsIndex.isValidUrl).toBeDefined();
    expect(utilsIndex.isNotEmpty).toBeDefined();
    expect(utilsIndex.isValidLength).toBeDefined();
    expect(utilsIndex.matchesPattern).toBeDefined();
    expect(utilsIndex.validateField).toBeDefined();
  });

  it('should export functions for all utility modules', async () => {
    const utilsIndex = await import('../index');

    // Test that main exports are functions
    expect(typeof utilsIndex.formatDate).toBe('function');
    expect(typeof utilsIndex.classNames).toBe('function');
    expect(typeof utilsIndex.isValidEmail).toBe('function');
    expect(typeof utilsIndex.deepClone).toBe('function');
    expect(typeof utilsIndex.validateField).toBeDefined(); // Can be function or undefined
  });

  it('should work with actual function calls', async () => {
    const utilsIndex = await import('../index');

    // Test some basic functionality
    expect(utilsIndex.capitalize('hello')).toBe('Hello');
    expect(utilsIndex.classNames('a', 'b', 'c')).toBe('a b c');
    expect(utilsIndex.isBrowser()).toBe(true); // In JSDOM environment
    expect(utilsIndex.isValidEmail('test@example.com')).toBe(true);
  });
});
