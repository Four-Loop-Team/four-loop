/**
 * API-related type definitions
 * Contains types for API requests, responses, and data structures
 * @fileoverview Type definitions for external API interactions and form data
 */

/**
 * Contact form submission data structure
 * @interface ContactFormData
 */
export interface ContactFormData {
  /** Full name of the contact */
  name: string;
  /** Email address for response */
  email: string;
  /** Subject line for the inquiry */
  subject: string;
  /** Message content */
  message: string;
  /** Optional company name */
  company?: string;
  /** Optional phone number */
  phone?: string;
}

/**
 * Newsletter subscription preferences and data
 * @interface NewsletterSubscription
 */
export interface NewsletterSubscription {
  /** Subscriber email address */
  email: string;
  /** Email preference settings */
  preferences?: {
    /** Receive product updates */
    updates: boolean;
    /** Receive marketing emails */
    marketing: boolean;
    /** Receive newsletter */
    newsletter: boolean;
  };
}

/**
 * Sitemap entry for SEO and crawling
 * @interface SitemapEntry
 */
export interface SitemapEntry {
  /** Full URL of the page */
  url: string;
  /** When the page was last modified */
  lastModified?: Date;
  /** How frequently the page changes */
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Priority relative to other pages (0.0-1.0) */
  priority?: number;
}

/**
 * Analytics event tracking data
 * @interface AnalyticsEvent
 */
export interface AnalyticsEvent {
  /** The action being tracked */
  action: string;
  /** Category of the event */
  category: string;
  /** Optional event label */
  label?: string;
  /** Numeric value associated with event */
  value?: number;
  /** Additional custom tracking dimensions */
  customDimensions?: Record<string, string | number>;
}

/**
 * Standardized error response format
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /** Error message */
  error: string;
  /** HTTP status code or error code */
  code: number;
  /** Additional error details */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  /** When the error occurred */
  timestamp: string;
}
