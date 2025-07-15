/**
 * Centralized type definitions export
 * Re-exports all types for easy importing throughout the application
 */

// Global types
export type {
  A11yProps,
  ApiResponse,
  GridProps,
  MetaData,
  NavigationItem,
  PageProps,
  PerformanceMetrics,
  ThemeColors,
} from './global';

// Component types
export type {
  BrandThemeProviderProps,
  BreadcrumbProps,
  GridComponentProps,
  GridSystemDemoProps,
  LogoProps,
  NavigationProps,
  SkipNavigationLinkProps,
} from './components';

// API types
export type {
  AnalyticsEvent,
  ContactFormData,
  ErrorResponse,
  NewsletterSubscription,
  SitemapEntry,
} from './api';
