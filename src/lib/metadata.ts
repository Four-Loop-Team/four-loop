/**
 * @fileoverview Metadata utilities for Next.js pages and SEO optimization.
 * Provides configuration and helper functions for generating consistent metadata
 * across the application with proper Open Graph and social media support.
 */

import type { Metadata } from 'next';

/**
 * Base site configuration containing default metadata values.
 * Used as the foundation for all page-specific metadata generation.
 */
export const siteConfig = {
  name: 'Four Loop Digital',
  description:
    'Professional digital consulting services specializing in web development, mobile applications, and digital transformation solutions.',
  url: 'https://fourloop.digital', // Update with actual domain
  ogImage: '/og-image.jpg', // We'll need to create this
  author: 'Four Loop Digital Team',
  keywords: [
    'digital consulting',
    'web development',
    'mobile applications',
    'digital transformation',
    'software consulting',
    'tech solutions',
    'digital strategy',
    'user experience',
    'web design',
    'app development',
  ],
  social: {
    twitter: '@fourloopdigital', // Update with actual handle
    linkedin: 'company/four-loop-digital', // Update with actual profile
  },
};

/**
 * Generates standardized metadata for Next.js pages with SEO optimization.
 *
 * @param options - Metadata configuration options
 * @param options.title - Page title (will be combined with site name)
 * @param options.description - Page description for meta tags and Open Graph
 * @param options.keywords - Additional keywords to append to default site keywords
 * @param options.ogImage - Custom Open Graph image URL (defaults to site OG image)
 * @param options.noIndex - Whether to prevent search engine indexing
 * @param options.canonical - Canonical URL for the page
 * @returns Complete Next.js metadata object with all SEO tags
 *
 * @example
 * ```typescript
 * const metadata = generateMetadata({
 *   title: 'About Us',
 *   description: 'Learn about our company and mission',
 *   keywords: ['company', 'about', 'mission']
 * });
 * ```
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
}): Metadata {
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = [...siteConfig.keywords, ...keywords].join(', ');
  const imageUrl = ogImage ?? siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,

    // Open Graph
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
      locale: 'en_US',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
    },

    // Additional SEO tags
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    ...(canonical && { alternates: { canonical } }),

    // Verification tags (add when available)
    verification: {
      // google: 'your-google-verification-code',
      // bing: 'your-bing-verification-code',
    },

    // Additional meta tags
    other: {
      'theme-color': '#ffffff',
      'msapplication-TileColor': '#da532c',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  };
}

// Pre-configured metadata for common pages
export const homeMetadata = generateMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['homepage', 'digital agency', 'consulting services'],
});

export const aboutMetadata = generateMetadata({
  title: 'About Us',
  description:
    "Learn about Four Loop Digital's mission, team, and commitment to delivering exceptional digital experiences and innovative technology solutions.",
  keywords: ['about', 'team', 'company', 'mission', 'digital experts'],
});

export const workMetadata = generateMetadata({
  title: 'Our Work',
  description:
    "Explore Four Loop Digital's portfolio of successful projects, case studies, and client success stories in web development and digital transformation.",
  keywords: ['portfolio', 'projects', 'case studies', 'work', 'examples'],
});

export const contactMetadata = generateMetadata({
  title: 'Contact Us',
  description:
    "Get in touch with Four Loop Digital to discuss your next digital project. We're here to help transform your business through innovative technology.",
  keywords: ['contact', 'get in touch', 'consultation', 'project inquiry'],
});
