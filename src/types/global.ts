/**
 * Global type definitions for Four Loop Digital
 */

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}

// SEO and metadata types
export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Grid system types
export interface GridProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  spacing?: number;
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  cumulativeLayoutShift: number;
}

// Theme and styling types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Page props for Next.js pages
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}
