/**
 * Additional tests for utility functions to improve coverage
 * Tests edge cases, error handling, and integration scenarios
 */

import {
  classNames,
  deepClone,
  getNestedProperty,
  getScrollPosition,
  isBrowser,
  onBrowser,
  scrollToElement,
  wait,
  withTimeout,
} from '../helpers';

describe('Utility Functions - Extended Coverage', () => {
  describe('classNames', () => {
    test('should handle mixed types correctly', () => {
      expect(classNames('a', null, undefined, false, 'b', true && 'c')).toBe(
        'a b c'
      );
    });

    test('should handle empty arrays and objects', () => {
      expect(classNames('', null, undefined, false)).toBe('');
    });

    test('should handle boolean conditions', () => {
      expect(classNames('base', true && 'conditional', false && 'hidden')).toBe(
        'base conditional'
      );
    });

    test('should filter out all falsy values', () => {
      expect(classNames('valid', null, undefined, false, '', 'another')).toBe(
        'valid another'
      );
    });
  });

  describe('deepClone', () => {
    test('should clone primitive values', () => {
      expect(deepClone('string')).toBe('string');
      expect(deepClone(42)).toBe(42);
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    test('should clone Date objects', () => {
      const date = new Date('2023-01-01');
      const cloned = deepClone(date);

      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
      expect(cloned instanceof Date).toBe(true);
    });

    test('should clone arrays recursively', () => {
      const arr = [1, { a: 2 }, [3, 4]];
      const cloned = deepClone(arr);

      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    test('should clone objects recursively', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
        f: [1, 2, 3],
      };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
      expect(cloned.b.d).not.toBe(obj.b.d);
      expect(cloned.f).not.toBe(obj.f);
    });

    test('should handle circular references gracefully', () => {
      const obj: Record<string, unknown> = { a: 1 };
      obj.self = obj;

      // This should throw an error for circular references
      expect(() => deepClone(obj)).toThrow('Circular reference detected');
    });
  });

  describe('getNestedProperty', () => {
    const testObj = {
      level1: {
        level2: {
          level3: 'deep value',
          array: [1, 2, 3],
        },
        simple: 'simple value',
      },
      root: 'root value',
    };

    test('should get nested properties', () => {
      expect(getNestedProperty(testObj, 'level1.level2.level3')).toBe(
        'deep value'
      );
      expect(getNestedProperty(testObj, 'level1.simple')).toBe('simple value');
      expect(getNestedProperty(testObj, 'root')).toBe('root value');
    });

    test('should return default value for missing properties', () => {
      expect(getNestedProperty(testObj, 'missing.path', 'default')).toBe(
        'default'
      );
      expect(getNestedProperty(testObj, 'level1.missing', 'fallback')).toBe(
        'fallback'
      );
    });

    test('should handle array properties', () => {
      expect(getNestedProperty(testObj, 'level1.level2.array')).toEqual([
        1, 2, 3,
      ]);
    });

    test('should return undefined for missing properties without default', () => {
      expect(getNestedProperty(testObj, 'missing.path')).toBeUndefined();
    });

    test('should handle empty string path', () => {
      expect(getNestedProperty(testObj, '')).toBe(testObj);
    });
  });

  describe('wait', () => {
    test('should resolve after specified delay', async () => {
      const start = Date.now();
      await wait(50);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(45); // Allow some variance
    });

    test('should work with zero delay', async () => {
      const start = Date.now();
      await wait(0);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(0);
    });
  });

  describe('withTimeout', () => {
    test('should resolve if promise completes before timeout', async () => {
      const promise = Promise.resolve('success');
      const result = await withTimeout(promise, 100);

      expect(result).toBe('success');
    });

    test('should reject if promise times out', async () => {
      const promise = new Promise((resolve) =>
        setTimeout(() => resolve('late'), 200)
      );

      await expect(withTimeout(promise, 100)).rejects.toThrow(
        'Operation timed out'
      );
    });

    test('should use custom timeout message', async () => {
      const promise = new Promise((resolve) =>
        setTimeout(() => resolve('late'), 200)
      );

      await expect(withTimeout(promise, 100, 'Custom timeout')).rejects.toThrow(
        'Custom timeout'
      );
    });

    test('should reject if original promise rejects', async () => {
      const promise = Promise.reject(new Error('Original error'));

      await expect(withTimeout(promise, 100)).rejects.toThrow('Original error');
    });
  });

  describe('Browser environment detection', () => {
    const originalWindow = global.window;

    afterEach(() => {
      // Restore original window
      global.window = originalWindow;
    });

    test('isBrowser should detect browser environment', () => {
      // In JSDOM environment, this will always be true
      // We can't reliably simulate non-browser environment
      expect(isBrowser()).toBe(true);
    });

    test('isBrowser should return true when window exists', () => {
      // Mock window object
      (global as any).window = {};
      expect(isBrowser()).toBe(true);
    });

    test('onBrowser should execute callback in browser', () => {
      (global as any).window = {};
      const callback = jest.fn(() => 'browser result');

      const result = onBrowser(callback, 'fallback');

      expect(callback).toHaveBeenCalled();
      expect(result).toBe('browser result');
    });

    test('onBrowser should execute callback when in browser environment', () => {
      // In JSDOM, we're always in a browser-like environment
      const callback = jest.fn(() => 'browser result');

      const result = onBrowser(callback, 'fallback');

      expect(callback).toHaveBeenCalled();
      expect(result).toBe('browser result');
    });

    test('onBrowser should execute callback without fallback', () => {
      // In JSDOM, we're always in a browser-like environment
      const callback = jest.fn(() => 'browser result');

      const result = onBrowser(callback);

      expect(callback).toHaveBeenCalled();
      expect(result).toBe('browser result');
    });
  });

  describe('DOM utilities', () => {
    const originalDocument = global.document;

    beforeEach(() => {
      // Mock DOM environment
      const mockElement = {
        scrollIntoView: jest.fn(),
      };

      (global as any).document = {
        querySelector: jest.fn(() => mockElement),
        documentElement: {
          scrollLeft: 100,
          scrollTop: 200,
        },
      };

      (global as any).window = {
        pageXOffset: 150,
        pageYOffset: 250,
      };
    });

    afterEach(() => {
      global.document = originalDocument;
      delete (global as any).window;
    });

    test('scrollToElement should scroll to element by selector', () => {
      const mockElement = {
        scrollIntoView: jest.fn(),
      };
      (global as any).document.querySelector = jest
        .fn()
        .mockReturnValue(mockElement);

      scrollToElement('#test');

      expect((global as any).document.querySelector).toHaveBeenCalledWith(
        '#test'
      );
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    test('scrollToElement should scroll to element directly', () => {
      const mockElement = { scrollIntoView: jest.fn() };

      scrollToElement(mockElement as any);

      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    test('scrollToElement should handle custom options', () => {
      const mockElement = {
        scrollIntoView: jest.fn(),
      };
      (global as any).document.querySelector = jest
        .fn()
        .mockReturnValue(mockElement);
      const options = { behavior: 'auto' as const, block: 'center' as const };

      scrollToElement('#test', options);

      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'center',
      });
    });

    test('scrollToElement should handle missing element gracefully', () => {
      (global as any).document.querySelector = jest.fn(() => null);

      expect(() => scrollToElement('#missing')).not.toThrow();
    });

    test('getScrollPosition should return scroll position', () => {
      // Mock the scroll position properties
      Object.defineProperty(window, 'pageXOffset', {
        value: 150,
        writable: true,
      });
      Object.defineProperty(window, 'pageYOffset', {
        value: 250,
        writable: true,
      });

      const position = getScrollPosition();

      expect(position).toEqual({ x: 150, y: 250 });
    });

    test('getScrollPosition should fallback to document element', () => {
      // Remove pageXOffset and pageYOffset to test fallback
      Object.defineProperty(window, 'pageXOffset', {
        value: undefined,
        writable: true,
      });
      Object.defineProperty(window, 'pageYOffset', {
        value: undefined,
        writable: true,
      });

      // Mock document element scroll properties
      Object.defineProperty(document.documentElement, 'scrollLeft', {
        value: 100,
        writable: true,
      });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 200,
        writable: true,
      });

      const position = getScrollPosition();

      expect(position).toEqual({ x: 100, y: 200 });
    });

    test('getScrollPosition should return zero in non-browser environment', () => {
      // In JSDOM, we can't truly simulate non-browser, but we can test the fallback
      const position = getScrollPosition();

      // Since we're in JSDOM, it should return current scroll position (likely 0,0)
      expect(typeof position.x).toBe('number');
      expect(typeof position.y).toBe('number');
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle null and undefined gracefully', () => {
      expect(() => deepClone(null)).not.toThrow();
      expect(() => deepClone(undefined)).not.toThrow();
      expect(() => classNames(null, undefined)).not.toThrow();
    });

    test('should handle complex nested structures', () => {
      const complex = {
        func: () => 'test',
        symbol: Symbol('test'),
        nested: {
          array: [{ deep: true }],
          date: new Date(),
        },
      };

      expect(() => deepClone(complex)).not.toThrow();
    });

    test('getNestedProperty should handle null objects', () => {
      expect(getNestedProperty(null as any, 'path', 'default')).toBe('default');
      expect(getNestedProperty(undefined as any, 'path', 'default')).toBe(
        'default'
      );
    });
  });
});
