/**
 * Hook for localStorage operations with SSR safety
 */

import { useEffect, useRef, useState } from 'react';

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
