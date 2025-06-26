/**
 * API-related type definitions
 */

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

// Newsletter subscription
export interface NewsletterSubscription {
  email: string;
  preferences?: {
    updates: boolean;
    marketing: boolean;
    newsletter: boolean;
  };
}

// Sitemap entry
export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}

// Analytics event
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string | number>;
}

// Error response
export interface ErrorResponse {
  error: string;
  code: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  timestamp: string;
}
