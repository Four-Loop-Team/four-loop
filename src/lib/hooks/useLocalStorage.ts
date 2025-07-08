/**
 * React hook for localStorage operations with SSR safety and error handling
 * @fileoverview Custom hook that provides a useState-like interface for localStorage with SSR compatibility
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Hook for localStorage operations with SSR safety
 * Provides a useState-like interface for persisting data to localStorage
 *
 * @template T - The type of data to store
 * @param {string} key - The localStorage key to use
 * @param {T} initialValue - The initial value to use if no stored value exists
 * @returns {[T, (value: T | ((val: T) => T)) => void]} Tuple containing the current value and setter function
 *
 * @example
 * ```tsx
 * function UserPreferences() {
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 *   const [settings, setSettings] = useLocalStorage('userSettings', {
 *     notifications: true,
 *     autoSave: false
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *         Current theme: {theme}
 *       </button>
 *       <button onClick={() => setSettings(prev => ({ ...prev, notifications: !prev.notifications }))}>
 *         Notifications: {settings.notifications ? 'On' : 'Off'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @features
 * - ✅ SSR-safe (doesn't break during server-side rendering)
 * - ✅ Error handling for localStorage access and JSON parsing
 * - ✅ Supports functional updates like useState
 * - ✅ TypeScript generic support for type safety
 * - ✅ Automatic serialization/deserialization
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Store initial value in ref to avoid effect dependencies
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  // Initialize state with initialValue (for SSR)
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Get from localStorage on mount (browser only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      } else {
        // No item exists for this key, reset to initial value
        setStoredValue(initialValueRef.current);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValueRef.current);
    }
  }, [key]); // Only depend on key to avoid infinite loops with object/array initialValue

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
