interface ContactFormData {
  email: string;
  message: string;
  // Security fields
  honeypot: string;
  formStartTime: string;
  website: string; // honeypot field
}

interface ValidationResult {
  valid: boolean;
  errors?: string[];
  data?: ContactFormData;
}

export function validateContactForm(data: unknown): ValidationResult {
  const errors: string[] = [];

  // Type guard to ensure data is an object
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid form data'] };
  }

  const formData = data as Record<string, unknown>;

  // Required fields validation
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  if (
    !formData.message ||
    typeof formData.message !== 'string' ||
    formData.message.trim().length === 0
  ) {
    errors.push('Message is required');
  } else if (formData.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  // Security fields validation
  if (!formData.formStartTime) {
    errors.push('Security validation failed');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize and return clean data
  const cleanData: ContactFormData = {
    email: sanitizeEmail(formData.email as string),
    message: sanitizeString(formData.message as string),
    honeypot: (formData.honeypot as string) || '',
    formStartTime: formData.formStartTime as string,
    website: (formData.website as string) || '',
  };

  return {
    valid: true,
    data: cleanData,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[\x00-\x1f\x7f-\x9f]/g, '') // Remove control characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
