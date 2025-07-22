/**
 * @fileoverview Application routes and navigation constants.
 * Centralized route definitions, external links, and navigation configuration
 * for consistent URL management across the application.
 */

/**
 * Internal application routes.
 * All route paths used throughout the application for type-safe navigation.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  CONTACT: '/contact',
  FAQ: '/faq',
  // Modern demo structure
  DEMO_COMPONENTS: '/demo/components',
  DEMO_STYLE_GUIDE: '/demo/style-guide',
} as const;

/**
 * External links and social media URLs.
 * Centralized location for all external link references.
 */
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com',
  TWITTER: 'https://twitter.com',
} as const;

/**
 * Main navigation items configuration.
 * Defines the primary navigation structure with labels, routes, and descriptions.
 */
export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    description: 'Return to homepage',
  },
  {
    label: 'About',
    href: ROUTES.ABOUT,
    description: 'Learn about Four Loop Digital',
  },
  {
    label: 'Work',
    href: ROUTES.WORK,
    description: 'View our portfolio and case studies',
  },
  {
    label: 'Contact',
    href: ROUTES.CONTACT,
    description: 'Get in touch with our team',
  },
  {
    label: 'FAQ',
    href: ROUTES.FAQ,
    description: 'Frequently asked questions',
  },
  {
    label: 'Components',
    href: ROUTES.DEMO_COMPONENTS,
    description: 'Interactive component showcase',
  },
  {
    label: 'Style Guide',
    href: ROUTES.DEMO_STYLE_GUIDE,
    description: 'Design system and style guide',
  },
] as const;

export type RouteKey = keyof typeof ROUTES;
export type Route = (typeof ROUTES)[RouteKey];
