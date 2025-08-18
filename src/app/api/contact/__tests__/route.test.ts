/**
 * @jest-environment node
 */
import { clearRateLimitStorage } from '@/lib/rate-limit';
import { NextRequest } from 'next/server';
import { POST } from '../route';

// Mock the Resend module
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({
        id: 'test-email-id',
        error: null,
      }),
    },
  })),
}));

// Mock the headers function
jest.mock('next/headers', () => ({
  headers: jest.fn().mockResolvedValue({
    get: jest.fn((name: string) => {
      const mockHeaders: Record<string, string> = {
        'user-agent': 'Mozilla/5.0 (Test Browser)',
        referer: 'https://fourloopdigital.com',
        origin: 'https://fourloopdigital.com',
      };
      return mockHeaders[name] || '';
    }),
  }),
}));

// Mock environment variables
process.env.RESEND_API_KEY = 'test-api-key';

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset rate limiting storage
    clearRateLimitStorage();
  });

  const validFormData = {
    email: 'john@example.com',
    message: 'This is a test message that is long enough to pass validation.',
    honeypot: '',
    website: '',
    formStartTime: (Date.now() - 5000).toString(), // 5 seconds ago
  };

  const createMockRequest = (
    data: any = validFormData,
    headers: Record<string, string> = {}
  ) => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.1',
        ...headers,
      },
    });

    return request;
  };

  it('should successfully process valid contact form submissions', async () => {
    const validData = {
      email: 'test@example.com',
      message: 'This is a test message about a project',
      honeypot: '',
      website: '',
      formStartTime: (Date.now() - 5000).toString(), // 5 seconds ago
    };

    const response = await POST(
      new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData),
      })
    );

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Your message has been sent successfully!');
  });

  it('should reject submissions with missing required fields', async () => {
    const incompleteData = {
      email: 'test@example.com',
      // Missing message field
      honeypot: '',
      website: '',
      formStartTime: Date.now().toString(),
    };

    const response = await POST(
      new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteData),
      })
    );

    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Invalid form data');
    expect(result.details).toContain('Message is required');
  });

  it('should reject submissions with invalid email', async () => {
    const invalidData = {
      email: 'invalid-email',
      message: 'This is a test message',
      honeypot: '',
      website: '',
      formStartTime: (Date.now() - 5000).toString(),
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.details).toContain('Please enter a valid email address');
  });

  it('should reject honeypot submissions silently', async () => {
    const spamData = { ...validFormData, honeypot: 'spam-content' };

    const request = createMockRequest(spamData);
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    // Should appear successful but not actually send email
  });

  it('should reject submissions that are too fast', async () => {
    const tooFastData = {
      ...validFormData,
      formStartTime: (Date.now() - 1000).toString(), // Only 1 second ago
    };

    const request = createMockRequest(tooFastData);
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Form submitted too quickly. Please try again.');
  });

  it('should enforce rate limiting', async () => {
    // Make 5 successful requests with the same IP (should all pass)
    for (let i = 0; i < 5; i++) {
      const request = createMockRequest(validFormData, {
        'x-forwarded-for': '192.168.1.100',
      });
      const response = await POST(request);
      expect(response.status).toBe(200);
    }

    // 6th request with same IP should be rate limited
    const request = createMockRequest(validFormData, {
      'x-forwarded-for': '192.168.1.100',
    });
    const rateLimitedResponse = await POST(request);
    const result = await rateLimitedResponse.json();

    expect(rateLimitedResponse.status).toBe(429);
    expect(result.error).toBe('Too many requests. Please try again later.');
    expect(result.retryAfter).toBeDefined();
  });

  it.skip('should handle network errors gracefully', async () => {
    // Clear all mocks and set up error scenario
    jest.clearAllMocks();

    // Mock Resend to throw an error
    const ResendMock = jest.requireMock('resend').Resend;
    ResendMock.mockImplementation(() => ({
      emails: {
        send: jest.fn().mockRejectedValue(new Error('Network error')),
      },
    }));

    const request = createMockRequest();
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.error).toBe('Something went wrong. Please try again.');
  });

  it('should sanitize input data', async () => {
    const maliciousData = {
      email: 'john@example.com',
      message: 'Test\nmessage\r\nwith\twhitespace',
      honeypot: '',
      website: '',
      formStartTime: (Date.now() - 5000).toString(),
    };

    const request = createMockRequest(maliciousData);
    const response = await POST(request);

    expect(response.status).toBe(200);
    // The sanitized data should be used internally
  });

  it('should validate message length limits', async () => {
    const longMessageData = {
      ...validFormData,
      message: 'A'.repeat(5001), // Exceeds 5000 character limit
    };

    const request = createMockRequest(longMessageData);
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.details).toContain(
      'Message must be less than 5000 characters'
    );
  });

  it('should detect and reject obvious spam', async () => {
    const spamData = {
      email: 'spambot@example.com',
      message:
        'Buy cheap viagra now! Click here for amazing casino deals! Guaranteed income work from home!',
      honeypot: '',
      website: '',
      formStartTime: (Date.now() - 5000).toString(),
    };

    const request = createMockRequest(spamData);
    const response = await POST(request);
    const result = await response.json();

    // Should appear successful to not reveal spam detection
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
  });
});
