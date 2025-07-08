/**
 * Miscellaneous helper functions for common operations
 * @fileoverview Utility functions for class names, object manipulation, browser detection, and async operations
 */

/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class names, which can include strings, undefined, null, or boolean values
 * @returns A string of space-separated class names
 * @example
 * ```typescript
 * classNames('btn', 'primary', isActive && 'active', null); // 'btn primary active'
 * ```
 */
export function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Deep clones an object with circular reference protection
 * @param obj - The object to clone
 * @param visited - WeakMap to track visited objects (internal use)
 * @returns A deep clone of the object
 * @throws {Error} When circular references are detected
 */
export function deepClone<T>(obj: T, visited = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Check for circular references
  if (visited.has(obj as object)) {
    throw new Error('Circular reference detected');
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    visited.set(obj as object, true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const result = obj.map((item) => deepClone(item, visited)) as unknown as T;
    visited.delete(obj as object);
    return result;
  }

  if (typeof obj === 'object') {
    visited.set(obj as object, true);
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key], visited);
      }
    }
    visited.delete(obj as object);
    return clonedObj;
  }

  return obj;
}

/**
 * Safely gets a nested property from an object using dot notation
 * @param obj - The object to get the property from
 * @param path - The path to the property (e.g., 'user.profile.name')
 * @param defaultValue - Default value to return if property doesn't exist
 * @returns The value at the specified path or the default value
 * @example
 * ```typescript
 * const user = { profile: { name: 'John' } };
 * getNestedProperty(user, 'profile.name'); // 'John'
 * getNestedProperty(user, 'profile.age', 25); // 25
 * getNestedProperty(user, '', user); // user (empty path returns the object itself)
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedProperty<T = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T {
  // Handle empty path - return the object itself
  if (!path || path === '') {
    return obj as T;
  }

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result?.[key] === undefined) {
      return defaultValue as T;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = result[key];
  }

  return result as T;
}

/**
 * Checks if code is running in browser environment
 * @returns True if running in browser, false if server-side
 * @example
 * ```typescript
 * if (isBrowser()) {
 *   // Safe to use window, document, etc.
 * }
 * ```
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safely executes code only in browser environment
 * @param callback - Function to execute in browser
 * @param fallback - Optional fallback value for server-side
 * @returns Result of callback or fallback value
 * @example
 * ```typescript
 * const width = onBrowser(() => window.innerWidth, 1200);
 * ```
 */
export function onBrowser<T>(callback: () => T, fallback?: T): T | undefined {
  if (isBrowser()) {
    return callback();
  }
  return fallback;
}

/**
 * Scrolls to an element smoothly with customizable options
 * @param element - DOM element or CSS selector to scroll to
 * @param options - ScrollIntoView options for customizing behavior
 * @example
 * ```typescript
 * scrollToElement('#section', { behavior: 'smooth', block: 'center' });
 * scrollToElement(document.getElementById('top'));
 * ```
 */
export function scrollToElement(
  element: Element | string,
  options?: ScrollIntoViewOptions
): void {
  const target =
    typeof element === 'string' ? document.querySelector(element) : element;

  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  }
}

/**
 * Gets the current scroll position of the page
 * @returns Object with x and y scroll coordinates
 * @example
 * ```typescript
 * const { x, y } = getScrollPosition();
 * console.log(`Scrolled ${y}px from top`);
 * ```
 */
export function getScrollPosition(): { x: number; y: number } {
  if (!isBrowser()) {
    return { x: 0, y: 0 };
  }

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

/**
 * Waits for a specified amount of time (promisified setTimeout)
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the specified time
 * @example
 * ```typescript
 * await wait(1000); // Wait 1 second
 * ```
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a promise that rejects after a timeout
 * @param promise - The promise to add timeout to
 * @param timeoutMs - Timeout in milliseconds
 * @param timeoutMessage - Custom error message for timeout
 * @returns Promise that resolves with original result or rejects on timeout
 * @example
 * ```typescript
 * const result = await withTimeout(fetchData(), 5000, 'API call timeout');
 * ```
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}
