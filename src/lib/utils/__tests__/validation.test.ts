import {
  isNotEmpty,
  isValidEmail,
  isValidLength,
  isValidPhone,
  isValidUrl,
  matchesPattern,
  validateField,
  ValidationRule,
} from '../validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@example.org',
        'email@123.123.123.123', // IP address
        '1234567890@example.com',
        'email@example-one.com',
        '_______@example.com',
        'email@example.name',
      ];

      validEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingdomain.com',
        'missing@.com',
        'missing@domain',
        'spaces @domain.com',
        'domain@.com',
        '',
        'test..test@domain.com',
        'test@',
        'test@domain',
        '.test@domain.com',
        'test.@domain.com',
      ];

      invalidEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '+1234567890',
        '1234567890',
        '+44 20 7946 0958',
        '(555) 123-4567',
        '555-123-4567',
        '555.123.4567',
        '+1 (555) 123-4567',
        '5551234567',
        '+123456789012345', // Max 15 digits
      ];

      validPhones.forEach((phone) => {
        expect(isValidPhone(phone)).toBe(true);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '',
        'abc',
        '123',
        '+0123456789', // Can't start with 0 after +
        '++1234567890',
        '12345678901234567', // Too long
        'phone number',
        '---',
        '()',
        '+',
      ];

      invalidPhones.forEach((phone) => {
        expect(isValidPhone(phone)).toBe(false);
      });
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://example.com',
        'https://www.example.com/path',
        'https://example.com/path?query=value',
        'https://example.com:8080',
        'https://subdomain.example.com',
        'ftp://files.example.com',
        'https://example.com/path#hash',
        'https://example.com/path?q=1&b=2',
      ];

      validUrls.forEach((url) => {
        expect(isValidUrl(url)).toBe(true);
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        '',
        'not-a-url',
        'example.com', // Missing protocol
        'https://',
        'https://.',
        'https://..',
        'https://../',
        'https://?',
        'https://#',
        'https:// example.com', // Space
      ];

      invalidUrls.forEach((url) => {
        expect(isValidUrl(url)).toBe(false);
      });
    });
  });

  describe('isNotEmpty', () => {
    it('should return true for non-empty strings', () => {
      const nonEmptyStrings = [
        'hello',
        'a',
        '123',
        'hello world',
        '   text   ', // Trimmed to 'text'
      ];

      nonEmptyStrings.forEach((str) => {
        expect(isNotEmpty(str)).toBe(true);
      });
    });

    it('should return false for empty or whitespace-only strings', () => {
      const emptyStrings = ['', ' ', '   ', '\t', '\n', '\r\n', '  \t  \n  '];

      emptyStrings.forEach((str) => {
        expect(isNotEmpty(str)).toBe(false);
      });
    });
  });

  describe('isValidLength', () => {
    it('should validate strings within length bounds', () => {
      expect(isValidLength('hello', 3, 10)).toBe(true);
      expect(isValidLength('abc', 3, 3)).toBe(true);
      expect(isValidLength('', 0, 5)).toBe(true);
      expect(isValidLength('test string', 0, 20)).toBe(true);
    });

    it('should reject strings outside length bounds', () => {
      expect(isValidLength('hi', 3, 10)).toBe(false); // Too short
      expect(isValidLength('this is too long', 3, 10)).toBe(false); // Too long
      expect(isValidLength('a', 2, 5)).toBe(false); // Too short
    });

    it('should use default values correctly', () => {
      expect(isValidLength('any string')).toBe(true); // No limits
      expect(isValidLength('test', 2)).toBe(true); // Only min limit
      expect(isValidLength('a', 2)).toBe(false); // Below min
    });

    it('should trim whitespace before checking length', () => {
      expect(isValidLength('  hello  ', 3, 10)).toBe(true); // Trimmed to 'hello'
      expect(isValidLength('   ', 1, 5)).toBe(false); // Trimmed to ''
    });
  });

  describe('matchesPattern', () => {
    it('should match valid patterns', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

      expect(matchesPattern('test@example.com', emailPattern)).toBe(true);
      expect(matchesPattern('123-456-7890', phonePattern)).toBe(true);
    });

    it('should reject invalid patterns', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

      expect(matchesPattern('invalid-email', emailPattern)).toBe(false);
      expect(matchesPattern('1234567890', phonePattern)).toBe(false);
    });

    it('should handle empty strings', () => {
      const pattern = /\w+/;
      expect(matchesPattern('', pattern)).toBe(false);
    });
  });

  describe('validateField', () => {
    it('should validate required fields', () => {
      const requiredRule: ValidationRule = { required: true };

      expect(validateField('hello', requiredRule).isValid).toBe(true);
      expect(validateField('', requiredRule).isValid).toBe(false);
      expect(validateField('   ', requiredRule).isValid).toBe(false);

      const result = validateField('', requiredRule);
      expect(result.errors).toContain('This field is required');
    });

    it('should validate minimum length', () => {
      const minLengthRule: ValidationRule = { minLength: 3 };

      expect(validateField('hello', minLengthRule).isValid).toBe(true);
      expect(validateField('abc', minLengthRule).isValid).toBe(true);
      expect(validateField('ab', minLengthRule).isValid).toBe(false);

      const result = validateField('ab', minLengthRule);
      expect(result.errors).toContain('Must be at least 3 characters');
    });

    it('should validate maximum length', () => {
      const maxLengthRule: ValidationRule = { maxLength: 5 };

      expect(validateField('hello', maxLengthRule).isValid).toBe(true);
      expect(validateField('hi', maxLengthRule).isValid).toBe(true);
      expect(validateField('toolong', maxLengthRule).isValid).toBe(false);

      const result = validateField('toolong', maxLengthRule);
      expect(result.errors).toContain('Must be no more than 5 characters');
    });

    it('should validate with custom patterns', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const patternRule: ValidationRule = { pattern: emailPattern };

      expect(validateField('test@example.com', patternRule).isValid).toBe(true);
      expect(validateField('invalid-email', patternRule).isValid).toBe(false);

      const result = validateField('invalid-email', patternRule);
      expect(result.errors).toContain('Invalid format');
    });

    it('should validate with custom validation function', () => {
      const customRule: ValidationRule = {
        custom: (value: string) => value.includes('test'),
      };

      expect(validateField('test123', customRule).isValid).toBe(true);
      expect(validateField('hello', customRule).isValid).toBe(false);

      const result = validateField('hello', customRule);
      expect(result.errors).toContain('Invalid value');
    });

    it('should return custom error message from validation function', () => {
      const customRule: ValidationRule = {
        custom: (value: string) =>
          value.includes('test') ? true : 'Must contain the word "test"',
      };

      const result = validateField('hello', customRule);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must contain the word "test"');
    });

    it('should skip validation for optional empty fields', () => {
      const optionalRule: ValidationRule = { minLength: 3, maxLength: 10 };

      const result = validateField('', optionalRule);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should combine multiple validation errors', () => {
      // Test with multiple failing validations
      const complexRule: ValidationRule = {
        required: true,
        minLength: 5,
        pattern: /^\d+$/, // Only digits allowed
      };

      const result = validateField('abc', complexRule); // fails minLength AND pattern
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
