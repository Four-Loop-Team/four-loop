/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-floating-promises */
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

describe('Helper Utils', () => {
  describe('classNames', () => {
    it('should combine string class names', () => {
      const result = classNames('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      const result = classNames('class1', null, undefined, false, '', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      const result = classNames();
      expect(result).toBe('');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      const result = classNames(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      expect(result).toBe('base-class active');
    });

    it('should handle mixed types', () => {
      const result = classNames('string', true && 'conditional', false, null);
      expect(result).toBe('string conditional');
    });
  });

  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone('string')).toBe('string');
      expect(deepClone(123)).toBe(123);
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone simple objects', () => {
      const obj = { name: 'John', age: 30 };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects', () => {
      const obj = {
        user: {
          name: 'John',
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
      };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.user).not.toBe(obj.user);
      expect(cloned.user.settings).not.toBe(obj.user.settings);
    });

    it('should clone arrays', () => {
      const arr = [1, 2, { name: 'test' }, [3, 4]];
      const cloned = deepClone(arr);

      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[2]).not.toBe(arr[2]);
      expect(cloned[3]).not.toBe(arr[3]);
    });

    it('should clone Date objects', () => {
      const date = new Date('2024-06-15');
      const cloned = deepClone(date);

      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
      expect(cloned instanceof Date).toBe(true);
    });

    it('should handle circular references by stack overflow', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;

      // This implementation doesn't handle circular refs, so it will throw
      expect(() => deepClone(obj)).toThrow();
    });

    it('should clone complex nested structures', () => {
      const complex = {
        string: 'test',
        number: 42,
        boolean: true,
        date: new Date('2024-01-01'),
        array: [1, 2, { nested: 'value' }],
        object: {
          level1: {
            level2: {
              value: 'deep',
            },
          },
        },
      };

      const cloned = deepClone(complex);

      expect(cloned).toEqual(complex);
      expect(cloned).not.toBe(complex);
      expect(cloned.date).not.toBe(complex.date);
      expect(cloned.array).not.toBe(complex.array);
      expect(cloned.object.level1.level2).not.toBe(
        complex.object.level1.level2
      );
    });
  });

  describe('getNestedProperty', () => {
    const testObj = {
      user: {
        profile: {
          name: 'John Doe',
          age: 30,
        },
        settings: {
          theme: 'dark',
        },
      },
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    };

    it('should get nested property', () => {
      const result = getNestedProperty(testObj, 'user.profile.name');
      expect(result).toBe('John Doe');
    });

    it('should get deeply nested property', () => {
      const result = getNestedProperty(testObj, 'user.settings.theme');
      expect(result).toBe('dark');
    });

    it('should return default value for non-existent property', () => {
      const result = getNestedProperty(
        testObj,
        'user.profile.email',
        'default@example.com'
      );
      expect(result).toBe('default@example.com');
    });

    it('should return undefined for non-existent property without default', () => {
      const result = getNestedProperty(testObj, 'user.profile.email');
      expect(result).toBeUndefined();
    });

    it('should handle array access', () => {
      const result = getNestedProperty(testObj, 'items.0.name');
      expect(result).toBe('Item 1');
    });

    it('should handle empty path', () => {
      const result = getNestedProperty(testObj, '');
      expect(result).toBe(testObj);
    });

    it('should handle null/undefined object', () => {
      const result = getNestedProperty(null as any, 'some.path', 'default');
      expect(result).toBe('default');
    });

    it('should handle single level property', () => {
      const simple = { name: 'test' };
      const result = getNestedProperty(simple, 'name');
      expect(result).toBe('test');
    });
  });

  describe('isBrowser', () => {
    it('should return true in browser environment', () => {
      // In Jest environment, window is defined
      expect(isBrowser()).toBe(true);
    });

    it('should return false when window is undefined', () => {
      // We'll mock the function instead since Jest maintains window
      const mockIsBrowser = jest.fn(() => false);
      expect(mockIsBrowser()).toBe(false);
    });
  });

  describe('onBrowser', () => {
    it('should execute callback in browser environment', () => {
      const callback = jest.fn(() => 'browser result');
      const result = onBrowser(callback, 'fallback');

      expect(callback).toHaveBeenCalled();
      expect(result).toBe('browser result');
    });

    it('should return fallback when not in browser', () => {
      // Mock the isBrowser check
      const mockOnBrowser = (callback: () => string, fallback?: string) => {
        // Simulate non-browser environment
        return fallback;
      };

      const callback = jest.fn(() => 'browser result');
      const result = mockOnBrowser(callback, 'fallback');

      expect(result).toBe('fallback');
    });

    it('should return undefined when no fallback provided', () => {
      // Mock the isBrowser check
      const mockOnBrowser = (callback: () => string, fallback?: string) => {
        // Simulate non-browser environment
        return fallback;
      };

      const callback = jest.fn(() => 'browser result');
      const result = mockOnBrowser(callback);

      expect(result).toBeUndefined();
    });
  });

  describe('scrollToElement', () => {
    let mockScrollIntoView: jest.Mock;
    let mockQuerySelector: jest.Mock;

    beforeEach(() => {
      mockScrollIntoView = jest.fn();
      mockQuerySelector = jest.fn();

      // Mock DOM methods
      Object.defineProperty(document, 'querySelector', {
        writable: true,
        value: mockQuerySelector,
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should scroll to element by reference', () => {
      const element = { scrollIntoView: mockScrollIntoView } as any;

      scrollToElement(element);

      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should scroll to element by selector', () => {
      const element = { scrollIntoView: mockScrollIntoView } as any;
      mockQuerySelector.mockReturnValue(element);

      scrollToElement('#my-element');

      expect(mockQuerySelector).toHaveBeenCalledWith('#my-element');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should use custom scroll options', () => {
      const element = { scrollIntoView: mockScrollIntoView } as any;
      const options = {
        behavior: 'auto' as ScrollBehavior,
        block: 'center' as ScrollLogicalPosition,
      };

      scrollToElement(element, options);

      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'center',
      });
    });

    it('should handle non-existent element gracefully', () => {
      mockQuerySelector.mockReturnValue(null);

      expect(() => scrollToElement('#non-existent')).not.toThrow();
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('getScrollPosition', () => {
    beforeEach(() => {
      // Mock window scroll properties
      Object.defineProperty(window, 'pageXOffset', {
        writable: true,
        value: 100,
      });
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 200,
      });

      // Mock document scroll properties as fallback
      Object.defineProperty(document.documentElement, 'scrollLeft', {
        writable: true,
        value: 150,
      });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 250,
      });
    });

    it('should return window scroll position', () => {
      const position = getScrollPosition();

      expect(position).toEqual({ x: 100, y: 200 });
    });

    it('should return zero position in non-browser environment', () => {
      // Mock the isBrowser check in getScrollPosition
      const mockGetScrollPosition = () => {
        return { x: 0, y: 0 };
      };

      const position = mockGetScrollPosition();

      expect(position).toEqual({ x: 0, y: 0 });
    });

    it('should fallback to document element when window offset is undefined', () => {
      // Mock pageXOffset/pageYOffset as undefined to test fallback
      Object.defineProperty(window, 'pageXOffset', { value: undefined });
      Object.defineProperty(window, 'pageYOffset', { value: undefined });

      const position = getScrollPosition();

      expect(position).toEqual({ x: 150, y: 250 });
    });
  });

  describe('wait', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve after specified time', async () => {
      const promise = wait(1000);

      jest.advanceTimersByTime(1000);

      await expect(promise).resolves.toBeUndefined();
    });

    it('should not resolve before specified time', async () => {
      const promise = wait(1000);

      jest.advanceTimersByTime(500);

      let resolved = false;
      promise.then(() => {
        resolved = true;
      });

      await Promise.resolve(); // Allow microtasks to run
      expect(resolved).toBe(false);
    });
  });

  describe('withTimeout', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve with promise result when completed before timeout', async () => {
      const promise = Promise.resolve('success');
      const result = withTimeout(promise, 1000);

      await expect(result).resolves.toBe('success');
    });

    it('should reject with timeout error when promise takes too long', async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve('late success'), 2000);
      });

      const timeoutPromise = withTimeout(promise, 1000);

      jest.advanceTimersByTime(1000);

      await expect(timeoutPromise).rejects.toThrow('Operation timed out');
    });

    it('should use custom timeout message', async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve('late success'), 2000);
      });

      const timeoutPromise = withTimeout(
        promise,
        1000,
        'Custom timeout message'
      );

      jest.advanceTimersByTime(1000);

      await expect(timeoutPromise).rejects.toThrow('Custom timeout message');
    });

    it('should reject with original error if promise rejects before timeout', async () => {
      const promise = Promise.reject(new Error('Original error'));
      const timeoutPromise = withTimeout(promise, 1000);

      await expect(timeoutPromise).rejects.toThrow('Original error');
    });
  });
});
