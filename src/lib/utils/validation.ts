/**
 * Validation utility functions
 */

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') return false;

  // Basic but comprehensive email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Additional checks for common invalid patterns
  if (
    email.includes('..') ||
    email.startsWith('.') ||
    email.endsWith('.') ||
    email.includes('@.') ||
    email.endsWith('@') ||
    email.split('@').length !== 2
  ) {
    return false;
  }

  const [localPart, domainPart] = email.split('@');

  // Local part checks
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  // Domain part checks
  if (
    domainPart.startsWith('.') ||
    domainPart.endsWith('.') ||
    !domainPart.includes('.')
  ) {
    return false;
  }

  return emailRegex.test(email);
}

/**
 * Validates a phone number (flexible format)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return false;

  const cleanPhone = phone.replace(/[\s\-().]/g, '');

  // Check for invalid patterns
  if (cleanPhone.length < 4 || cleanPhone.length > 16) return false;
  if (cleanPhone.includes('++')) return false;
  if (cleanPhone.startsWith('+0')) return false;
  if (!/^[+]?[1-9][\d]*$/.test(cleanPhone)) return false;

  return true;
}

/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false;

  try {
    const parsed = new URL(url);

    // Check for valid protocol
    if (!['http:', 'https:', 'ftp:', 'ftps:'].includes(parsed.protocol)) {
      return false;
    }

    // Check for valid hostname
    if (
      !parsed.hostname ||
      parsed.hostname === '.' ||
      parsed.hostname === '..' ||
      parsed.hostname.includes(' ')
    ) {
      return false;
    }

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

  // Length validation - check both even if one fails
  if (rules.minLength !== undefined && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters`);
  }

  if (rules.maxLength !== undefined && value.length > rules.maxLength) {
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
