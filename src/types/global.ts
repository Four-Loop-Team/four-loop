/**
 * Global type definitions for Four Loop Digital
 * Contains shared types used across the application
 * @fileoverview Core type definitions for navigation, metadata, theming, and accessibility
 */

/**
 * Navigation item configuration for menus and links
 * @interface NavigationItem
 */
export interface NavigationItem {
  /** Display text for the navigation item */
  label: string;
  /** URL or path for the navigation target */
  href: string;
  /** Whether the link opens in a new tab/window */
  external?: boolean;
  /** Optional description for accessibility or tooltips */
  description?: string;
}

/**
 * SEO metadata configuration for pages
 * @interface MetaData
 */
export interface MetaData {
  /** Page title for browser tab and SEO */
  title: string;
  /** Page description for SEO meta tags */
  description: string;
  /** SEO keywords array */
  keywords?: string[];
  /** Open Graph image URL for social sharing */
  ogImage?: string;
  /** Canonical URL for SEO */
  canonical?: string;
}

/**
 * Responsive grid system properties
 * @interface GridProps
 */
export interface GridProps {
  /** Extra small breakpoint (0px+) column count */
  xs?: number;
  /** Small breakpoint (600px+) column count */
  sm?: number;
  /** Medium breakpoint (960px+) column count */
  md?: number;
  /** Large breakpoint (1280px+) column count */
  lg?: number;
  /** Extra large breakpoint (1920px+) column count */
  xl?: number;
  /** Grid spacing in pixels */
  spacing?: number;
}

/**
 * Performance monitoring metrics
 * @interface PerformanceMetrics
 */
export interface PerformanceMetrics {
  /** Page load time in milliseconds */
  loadTime: number;
  /** Initial render time in milliseconds */
  renderTime: number;
  /** Time to first interaction in milliseconds */
  interactionTime: number;
  /** Layout shift score for stability */
  cumulativeLayoutShift: number;
}

/**
 * Theme color configuration
 * @interface ThemeColors
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  /** Secondary accent color */
  secondary: string;
  /** Accent/highlight color */
  accent: string;
  /** Background color */
  background: string;
  /** Surface/card background color */
  surface: string;
  /** Text color */
  text: string;
}

/**
 * Accessibility attributes for components
 * @interface A11yProps
 */
export interface A11yProps {
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** ID of element that describes this element */
  'aria-describedby'?: string;
  /** Whether an expandable element is expanded */
  'aria-expanded'?: boolean;
  /** Whether element should be hidden from screen readers */
  'aria-hidden'?: boolean;
  /** ARIA role for semantic meaning */
  role?: string;
}

/**
 * Generic API response wrapper
 * @interface ApiResponse
 * @template T - The type of the response data
 */
export interface ApiResponse<T> {
  /** Response payload data */
  data: T;
  /** Whether the request was successful */
  success: boolean;
  /** Optional success/info message */
  message?: string;
  /** Array of error messages if any */
  errors?: string[];
}

/**
 * Next.js page component props
 * @interface PageProps
 */
export interface PageProps {
  /** Dynamic route parameters */
  params?: Record<string, string>;
  /** URL search parameters */
  searchParams?: Record<string, string | string[]>;
}
