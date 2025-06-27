import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  const TEST_KEY = 'test-key';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear console warnings to avoid pollution
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with the provided initial value', () => {
      const initialValue = 'initial';
      const { result } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialValue)
      );

      expect(result.current[0]).toBe(initialValue);
    });

    it('should initialize with complex object initial value', () => {
      const initialValue = { name: 'John', age: 30, active: true };
      const { result } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialValue)
      );

      expect(result.current[0]).toEqual(initialValue);
    });

    it('should initialize with array initial value', () => {
      const initialValue = [1, 2, 3, 'test'];
      const { result } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialValue)
      );

      expect(result.current[0]).toEqual(initialValue);
    });
  });

  describe('Reading from localStorage', () => {
    it('should read existing value from localStorage', () => {
      const existingValue = 'existing-value';
      localStorage.setItem(TEST_KEY, JSON.stringify(existingValue));

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));

      // Use waitFor to handle the useEffect
      expect(result.current[0]).toBe(existingValue);
    });

    it('should read complex object from localStorage', () => {
      const existingValue = { user: 'jane', preferences: { theme: 'dark' } };
      localStorage.setItem(TEST_KEY, JSON.stringify(existingValue));

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));

      expect(result.current[0]).toEqual(existingValue);
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      localStorage.setItem(TEST_KEY, 'invalid-json{');

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));

      expect(result.current[0]).toBe('default');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error reading localStorage key "${TEST_KEY}"`),
        expect.any(Error)
      );
    });

    it('should handle missing localStorage gracefully', () => {
      const originalLocalStorage = window.localStorage;
      delete (window as any).localStorage;

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));

      expect(result.current[0]).toBe('default');

      // Restore localStorage
      (window as any).localStorage = originalLocalStorage;
    });
  });

  describe('Setting Values', () => {
    it('should update state and localStorage with new value', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify('updated'));
    });

    it('should update state with function updater', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 5));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(6);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(6));
    });

    it('should update complex object', () => {
      const initialUser = { name: 'John', age: 30 };
      const { result } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialUser)
      );

      const updatedUser = { name: 'Jane', age: 25 };

      act(() => {
        result.current[1](updatedUser);
      });

      expect(result.current[0]).toEqual(updatedUser);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(updatedUser));
    });

    it('should update array values', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, [1, 2, 3]));

      act(() => {
        result.current[1]((prev) => [...prev, 4]);
      });

      expect(result.current[0]).toEqual([1, 2, 3, 4]);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify([1, 2, 3, 4]));
    });

    it('should handle JSON.stringify errors gracefully', () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

      // Create a circular reference that can't be stringified
      const circularObject: any = { name: 'test' };
      circularObject.self = circularObject;

      act(() => {
        result.current[1](circularObject);
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error setting localStorage key "${TEST_KEY}"`),
        expect.any(Error)
      );
    });
  });

  describe('SSR Safety', () => {
    it('should work when window is undefined', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));

      expect(result.current[0]).toBe('default');

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');

      // Restore window
      global.window = originalWindow;
    });

    it('should initialize consistently on server and client', () => {
      const initialValue = { theme: 'light', lang: 'en' };

      // Simulate server render
      const originalWindow = global.window;
      delete (global as any).window;

      const { result: serverResult } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialValue)
      );

      expect(serverResult.current[0]).toEqual(initialValue);

      // Simulate client hydration
      global.window = originalWindow;

      const { result: clientResult } = renderHook(() =>
        useLocalStorage(TEST_KEY, initialValue)
      );

      expect(clientResult.current[0]).toEqual(initialValue);
    });
  });

  describe('Key Changes', () => {
    it('should update when key changes', () => {
      localStorage.setItem('key1', JSON.stringify('value1'));
      localStorage.setItem('key2', JSON.stringify('value2'));

      const { result, rerender } = renderHook(
        ({ key }) => useLocalStorage(key, 'default'),
        { initialProps: { key: 'key1' } }
      );

      expect(result.current[0]).toBe('value1');

      rerender({ key: 'key2' });

      expect(result.current[0]).toBe('value2');
    });

    it('should use default value for non-existent key', () => {
      // Set up localStorage with an existing value first
      localStorage.setItem('existing-key', JSON.stringify('existing-value'));

      const { result, rerender } = renderHook(
        ({ key }) => useLocalStorage(key, 'default'),
        { initialProps: { key: 'existing-key' } }
      );

      // Should read the existing value from localStorage
      expect(result.current[0]).toBe('existing-value');

      // Switch to a non-existent key, should use default value
      rerender({ key: 'non-existent-key' });
      expect(result.current[0]).toBe('default');
    });
  });

  describe('Type Safety', () => {
    it('should maintain type safety with string values', () => {
      const { result } = renderHook(() =>
        useLocalStorage('string-key', 'default')
      );

      expect(typeof result.current[0]).toBe('string');

      act(() => {
        result.current[1]('new-string');
      });

      expect(typeof result.current[0]).toBe('string');
    });

    it('should maintain type safety with number values', () => {
      const { result } = renderHook(() => useLocalStorage('number-key', 42));

      expect(typeof result.current[0]).toBe('number');

      act(() => {
        result.current[1](100);
      });

      expect(typeof result.current[0]).toBe('number');
    });

    it('should maintain type safety with boolean values', () => {
      const { result } = renderHook(() => useLocalStorage('boolean-key', true));

      expect(typeof result.current[0]).toBe('boolean');

      act(() => {
        result.current[1](false);
      });

      expect(typeof result.current[0]).toBe('boolean');
    });
  });
});
