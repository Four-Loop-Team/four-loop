import { NextRequest } from 'next/server';

interface RateLimitOptions {
  id: string;
  limit: number;
  window: number; // milliseconds
}

interface RateLimitResult {
  success: boolean;
  retryAfter?: number;
}

// In-memory storage for rate limiting (in production, use Redis or similar)
const storage = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit({
  id,
  limit,
  window,
}: RateLimitOptions): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `rateLimit:${id}`;

  // Clean up expired entries
  cleanupExpired(now);

  const current = storage.get(key);

  if (!current) {
    // First request
    storage.set(key, { count: 1, resetTime: now + window });
    return { success: true };
  }

  if (now > current.resetTime) {
    // Window has expired, reset
    storage.set(key, { count: 1, resetTime: now + window });
    return { success: true };
  }

  if (current.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      retryAfter: Math.ceil((current.resetTime - now) / 1000),
    };
  }

  // Increment counter
  current.count++;
  return { success: true };
}

function cleanupExpired(now: number) {
  for (const [key, value] of storage.entries()) {
    if (now > value.resetTime) {
      storage.delete(key);
    }
  }
}

// Helper to get client IP from NextRequest
export function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback
  return 'unknown';
}

// Test helper to clear rate limit storage
export function clearRateLimitStorage(): void {
  storage.clear();
}
