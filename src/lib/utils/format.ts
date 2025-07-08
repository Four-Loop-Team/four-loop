/**
 * @fileoverview Text and data formatting utility functions.
 *
 * This module provides comprehensive formatting functions for dates, strings,
 * text manipulation, and common display transformations. All functions are
 * internationalization-aware and handle edge cases gracefully.
 *
 * @module format
 * @version 1.0.0
 * @author Four Loop Digital
 * @since 2024
 */

/**
 * Formats a date for localized display with customizable options.
 *
 * Supports both Date objects and ISO date strings, with intelligent defaults
 * for common display scenarios. Uses Intl.DateTimeFormat for proper localization.
 *
 * @param {Date | string} date - The date to format (Date object or ISO string)
 * @param {Intl.DateTimeFormatOptions} [options] - Custom formatting options
 * @returns {string} Formatted date string in the specified locale
 *
 * @example
 * ```typescript
 * formatDate(new Date('2024-01-15'));
 * // "January 15, 2024"
 *
 * formatDate('2024-01-15', {
 *   month: 'short',
 *   day: 'numeric'
 * });
 * // "Jan 15"
 *
 * formatDate(new Date(), {
 *   weekday: 'long',
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric'
 * });
 * // "Monday, January 15, 2024"
 * ```
 *
 * @internationalization Uses Intl.DateTimeFormat with 'en-US' locale
 * @performance O(1) - Native browser date formatting
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Truncates text to a specified length and adds ellipsis if needed.
 *
 * Intelligently truncates text while preserving readability. Accounts for
 * ellipsis length to ensure the final string doesn't exceed maxLength.
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length including ellipsis
 * @returns {string} Truncated text with ellipsis if needed
 *
 * @example
 * ```typescript
 * truncateText('This is a long sentence', 10);
 * // "This is..."
 *
 * truncateText('Short', 10);
 * // "Short"
 *
 * truncateText('Exactly ten chars', 17);
 * // "Exactly ten chars"
 * ```
 *
 * @performance O(1) - String slice operation
 * @ui Commonly used for card titles, descriptions, and list items
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * Transforms text to sentence case, handling empty strings gracefully.
 * Useful for formatting user input and display text.
 *
 * @param {string} str - The string to capitalize
 * @returns {string} String with first letter capitalized, rest lowercase
 *
 * @example
 * ```typescript
 * capitalize('hello world');     // "Hello world"
 * capitalize('HELLO WORLD');     // "Hello world"
 * capitalize('hELLO wORLD');     // "Hello world"
 * capitalize('');                // ""
 * capitalize('a');               // "A"
 * ```
 *
 * @performance O(n) - Processes entire string
 * @formatting Ideal for names, titles, and user-generated content
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to kebab-case (dash-separated lowercase).
 *
 * Transforms camelCase, PascalCase, and space-separated strings into
 * URL-friendly kebab-case format. Useful for creating slugs and CSS classes.
 *
 * @param {string} str - The string to convert
 * @returns {string} String in kebab-case format
 *
 * @example
 * ```typescript
 * toKebabCase('HelloWorld');        // "hello-world"
 * toKebabCase('camelCaseString');   // "camel-case-string"
 * toKebabCase('Some Title Text');   // "some-title-text"
 * toKebabCase('already-kebab');     // "already-kebab"
 * toKebabCase('MixedCase String');  // "mixed-case-string"
 * ```
 *
 * @performance O(n) - Single pass with regex replacements
 * @url Ideal for creating URL slugs and CSS class names
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Generates a random ID string
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounces a function call
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function call
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
