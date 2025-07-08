/**
 * Structured data utilities for SEO and rich snippets.
 *
 * This module provides functions to generate JSON-LD structured data
 * following Schema.org standards for improved search engine visibility
 * and rich snippet support.
 *
 * @module structured-data
 * @see {@link https://schema.org/ Schema.org}
 * @see {@link https://developers.google.com/search/docs/guides/intro-structured-data Google Structured Data Guide}
 */

// Structured data utilities for SEO
import { siteConfig } from './metadata';

/**
 * Schema.org Organization interface for business information.
 * Used to represent company/organization structured data.
 */
interface Organization {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    contactType: string;
    email?: string;
    telephone?: string;
  };
  address?: {
    '@type': string;
    addressCountry: string;
    addressRegion?: string;
    addressLocality?: string;
    streetAddress?: string;
    postalCode?: string;
  };
}

/**
 * Schema.org WebSite interface for website information.
 * Used to represent the main website structured data.
 */
interface WebSite {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

/**
 * Schema.org WebPage interface for individual page information.
 * Used to represent specific page structured data.
 */
interface WebPage {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  isPartOf: {
    '@type': string;
    name: string;
    url: string;
  };
  primaryImageOfPage?: {
    '@type': string;
    url: string;
  };
}

/**
 * Schema.org Service interface for service offerings.
 * Used to represent business services structured data.
 */
interface Service {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
}

/**
 * Generates Schema.org Organization structured data for the business.
 *
 * Creates JSON-LD markup for company information including contact details,
 * social media links, and business location.
 *
 * @returns {Organization} Complete organization structured data object
 * @example
 * ```typescript
 * const orgSchema = generateOrganizationSchema();
 * // Use in Next.js page
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
 * />
 * ```
 */
export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://linkedin.com/${siteConfig.social.linkedin}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      // email: 'contact@fourloop.digital', // Add when available
      // telephone: '+1-XXX-XXX-XXXX', // Add when available
    },
    // Add address when available
    // address: {
    //   '@type': 'PostalAddress',
    //   addressCountry: 'US',
    //   addressRegion: 'State',
    //   addressLocality: 'City',
    //   streetAddress: 'Street Address',
    //   postalCode: 'ZIP'
    // }
  };
}

/**
 * Generates Schema.org WebSite structured data for the website.
 *
 * Creates JSON-LD markup for the main website including search functionality
 * and site navigation information.
 *
 * @returns {WebSite} Complete website structured data object
 * @example
 * ```typescript
 * const siteSchema = generateWebSiteSchema();
 * // Add to site layout for global website information
 * ```
 */
export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generates Schema.org WebPage structured data for individual pages.
 *
 * Creates JSON-LD markup for specific pages including metadata,
 * page hierarchy, and optional featured images.
 *
 * @param params - Page information parameters
 * @param params.name - The page title/name
 * @param params.description - The page description
 * @param params.url - The complete URL of the page
 * @param params.imageUrl - Optional featured image URL
 * @returns {WebPage} Complete webpage structured data object
 * @example
 * ```typescript
 * const pageSchema = generateWebPageSchema({
 *   name: "About Us - Four Loop Digital",
 *   description: "Learn about our team and mission",
 *   url: "https://fourloop.digital/about",
 *   imageUrl: "https://fourloop.digital/images/about-hero.jpg"
 * });
 * ```
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  imageUrl,
}: {
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
}): WebPage {
  const schema: WebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (imageUrl) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: imageUrl,
    };
  }

  return schema;
}

/**
 * Generates Schema.org Service structured data for business services.
 *
 * Creates JSON-LD markup for specific services offered by the business,
 * including service details and provider information.
 *
 * @param params - Service information parameters
 * @param params.name - The service name
 * @param params.description - The service description
 * @param params.serviceType - The type/category of service
 * @returns {Service} Complete service structured data object
 * @example
 * ```typescript
 * const webDevService = generateServiceSchema({
 *   name: "Web Development",
 *   description: "Custom website development services",
 *   serviceType: "Web Development"
 * });
 * ```
 */
export function generateServiceSchema({
  name,
  description,
  serviceType,
}: {
  name: string;
  description: string;
  serviceType: string;
}): Service {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType,
    areaServed: 'Worldwide', // Update as needed
  };
}

/**
 * Pre-configured service schema for web development services.
 * Ready-to-use structured data for web development offerings.
 */
export const webDevelopmentServiceSchema = generateServiceSchema({
  name: 'Web Development Services',
  description:
    'Custom web application development using modern technologies and best practices.',
  serviceType: 'Web Development',
});

/**
 * Pre-configured service schema for mobile app development services.
 * Ready-to-use structured data for mobile app development offerings.
 */
export const mobileAppServiceSchema = generateServiceSchema({
  name: 'Mobile Application Development',
  description:
    'Native and cross-platform mobile application development for iOS and Android.',
  serviceType: 'Mobile App Development',
});

/**
 * Pre-configured service schema for digital consulting services.
 * Ready-to-use structured data for consulting service offerings.
 */
export const digitalConsultingServiceSchema = generateServiceSchema({
  name: 'Digital Consulting Services',
  description:
    'Strategic digital transformation consulting to help businesses modernize and grow.',
  serviceType: 'Digital Consulting',
});

/**
 * Utility function to render structured data as JSON-LD string.
 *
 * Converts structured data objects to minified JSON string suitable
 * for embedding in HTML script tags.
 *
 * @param schema - The structured data object to render
 * @returns {string} Minified JSON-LD string
 * @example
 * ```typescript
 * const orgSchema = generateOrganizationSchema();
 * const jsonLD = renderStructuredData(orgSchema);
 *
 * // Use in React component
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: jsonLD }}
 * />
 * ```
 */
export function renderStructuredData(schema: object): string {
  return JSON.stringify(schema, null, 0);
}
