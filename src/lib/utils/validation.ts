/**
 * Validation utility functions
 */

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number (flexible format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-().]/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is not empty or just whitespace
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validates a string length
 */
export function isValidLength(
  value: string,
  min: number = 0,
  max: number = Infinity
): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}

/**
 * Validates that a value matches a regex pattern
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

/**
 * Comprehensive form validation
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateField(
  value: string,
  rules: ValidationRule
): ValidationResult {
  const errors: string[] = [];

  // Required check
  if (rules.required && !isNotEmpty(value)) {
    errors.push('This field is required');
  }

  // Skip other validations if empty and not required
  if (!isNotEmpty(value) && !rules.required) {
    return { isValid: true, errors: [] };
  }

  // Length validation
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters`);
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Must be no more than ${rules.maxLength} characters`);
  }

  // Pattern validation
  if (rules.pattern && !matchesPattern(value, rules.pattern)) {
    errors.push('Invalid format');
  }

  // Custom validation
  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === 'string') {
      errors.push(result);
    } else if (!result) {
      errors.push('Invalid value');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
