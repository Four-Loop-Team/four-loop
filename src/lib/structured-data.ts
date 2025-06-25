// Structured data utilities for SEO
import { siteConfig } from './metadata';

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

// Common service schemas
export const webDevelopmentServiceSchema = generateServiceSchema({
  name: 'Web Development Services',
  description:
    'Custom web application development using modern technologies and best practices.',
  serviceType: 'Web Development',
});

export const mobileAppServiceSchema = generateServiceSchema({
  name: 'Mobile Application Development',
  description:
    'Native and cross-platform mobile application development for iOS and Android.',
  serviceType: 'Mobile App Development',
});

export const digitalConsultingServiceSchema = generateServiceSchema({
  name: 'Digital Consulting Services',
  description:
    'Strategic digital transformation consulting to help businesses modernize and grow.',
  serviceType: 'Digital Consulting',
});

// Utility function to render JSON-LD script
export function renderStructuredData(schema: object): string {
  return JSON.stringify(schema, null, 0);
}
