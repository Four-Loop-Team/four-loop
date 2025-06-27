import {
  capitalize,
  debounce,
  formatDate,
  generateId,
  throttle,
  toKebabCase,
  truncateText,
} from '../format';

describe('Format Utils', () => {
  describe('formatDate', () => {
    it('should format a Date object with default options', () => {
      const date = new Date('2024-06-15T10:30:00Z');
      const result = formatDate(date);

      expect(result).toMatch(/June 15, 2024/);
    });

    it('should format a date string with default options', () => {
      const dateString = '2024-06-15T10:30:00Z';
      const result = formatDate(dateString);

      expect(result).toMatch(/June 15, 2024/);
    });

    it('should format date with custom options', () => {
      const date = new Date('2024-06-15T10:30:00Z');
      const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      };
      const result = formatDate(date, options);

      expect(result).toMatch(/Jun 15, 24/);
    });

    it('should override default options with custom ones', () => {
      const date = new Date('2024-06-15T10:30:00Z');
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
      };
      const result = formatDate(date, options);

      expect(result).toContain('Jun');
      expect(result).toMatch(
        /Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday/
      );
    });

    it('should handle invalid date strings', () => {
      const invalidDate = 'invalid-date';
      const result = formatDate(invalidDate);

      expect(result).toBe('Invalid Date');
    });
  });

  describe('truncateText', () => {
    it('should return original text if shorter than max length', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);

      expect(result).toBe('Short text');
    });

    it('should truncate text longer than max length', () => {
      const text = 'This is a very long text that should be truncated';
      const result = truncateText(text, 20);

      expect(result).toBe('This is a very lo...');
      expect(result.length).toBe(20);
    });

    it('should handle edge case where text length equals max length', () => {
      const text = 'Exactly twenty chars';
      const result = truncateText(text, 20);

      expect(result).toBe('Exactly twenty chars');
    });

    it('should handle very short max length', () => {
      const text = 'Hello world';
      const result = truncateText(text, 5);

      expect(result).toBe('He...');
    });

    it('should handle empty string', () => {
      const text = '';
      const result = truncateText(text, 10);

      expect(result).toBe('');
    });

    it('should handle max length smaller than ellipsis', () => {
      const text = 'Hello';
      const result = truncateText(text, 2);

      expect(result).toBe('Hell...');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter of lowercase string', () => {
      const text = 'hello world';
      const result = capitalize(text);

      expect(result).toBe('Hello world');
    });

    it('should capitalize first letter of uppercase string', () => {
      const text = 'HELLO WORLD';
      const result = capitalize(text);

      expect(result).toBe('Hello world');
    });

    it('should handle mixed case string', () => {
      const text = 'hELLo WoRLd';
      const result = capitalize(text);

      expect(result).toBe('Hello world');
    });

    it('should handle single character', () => {
      const text = 'a';
      const result = capitalize(text);

      expect(result).toBe('A');
    });

    it('should handle empty string', () => {
      const text = '';
      const result = capitalize(text);

      expect(result).toBe('');
    });

    it('should handle string starting with number', () => {
      const text = '123abc';
      const result = capitalize(text);

      expect(result).toBe('123abc');
    });

    it('should handle string with special characters', () => {
      const text = '!hello world';
      const result = capitalize(text);

      expect(result).toBe('!hello world');
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      const text = 'camelCaseString';
      const result = toKebabCase(text);

      expect(result).toBe('camel-case-string');
    });

    it('should convert PascalCase to kebab-case', () => {
      const text = 'PascalCaseString';
      const result = toKebabCase(text);

      expect(result).toBe('pascal-case-string');
    });

    it('should convert spaces to hyphens', () => {
      const text = 'hello world test';
      const result = toKebabCase(text);

      expect(result).toBe('hello-world-test');
    });

    it('should handle mixed case with spaces', () => {
      const text = 'Hello World Test';
      const result = toKebabCase(text);

      expect(result).toBe('hello-world-test');
    });

    it('should handle multiple consecutive spaces', () => {
      const text = 'hello    world';
      const result = toKebabCase(text);

      expect(result).toBe('hello-world');
    });

    it('should handle already kebab-case string', () => {
      const text = 'already-kebab-case';
      const result = toKebabCase(text);

      expect(result).toBe('already-kebab-case');
    });

    it('should handle empty string', () => {
      const text = '';
      const result = toKebabCase(text);

      expect(result).toBe('');
    });

    it('should handle numbers in string', () => {
      const text = 'version2Release';
      const result = toKebabCase(text);

      expect(result).toBe('version2release');
    });
  });

  describe('generateId', () => {
    it('should generate id with default prefix', () => {
      const id = generateId();

      expect(id).toMatch(/^id-[a-z0-9]{9}$/);
    });

    it('should generate id with custom prefix', () => {
      const id = generateId('custom');

      expect(id).toMatch(/^custom-[a-z0-9]{9}$/);
    });

    it('should generate unique ids', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
    });

    it('should handle empty prefix', () => {
      const id = generateId('');

      expect(id).toMatch(/^-[a-z0-9]{9}$/);
    });

    it('should handle special characters in prefix', () => {
      const id = generateId('test-prefix');

      expect(id).toMatch(/^test-prefix-[a-z0-9]{9}$/);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous call when called again', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to debounced function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should use latest arguments when called multiple times', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      debouncedFn('second');
      debouncedFn('third');

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('third');
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should execute function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should ignore subsequent calls within time limit', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should allow execution after time limit', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments to throttled function', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('arg1', 'arg2');

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should use arguments from first call when throttled', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      throttledFn('second'); // This should be ignored

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');
    });
  });
});
