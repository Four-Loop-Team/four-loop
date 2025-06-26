// Unit tests for metadata utilities
import {
  generateMetadata,
  siteConfig,
  homeMetadata,
  aboutMetadata,
  workMetadata,
  contactMetadata,
} from '../metadata';

describe('Metadata Utilities', () => {
  describe('siteConfig', () => {
    it('contains all required configuration fields', () => {
      expect(siteConfig.name).toBe('Four Loop Digital');
      expect(siteConfig.description).toBeTruthy();
      expect(siteConfig.url).toBeTruthy();
      expect(Array.isArray(siteConfig.keywords)).toBe(true);
      expect(siteConfig.keywords.length).toBeGreaterThan(0);
    });

    it('has valid social media configuration', () => {
      expect(siteConfig.social.twitter).toBeTruthy();
      expect(siteConfig.social.linkedin).toBeTruthy();
    });
  });

  describe('generateMetadata', () => {
    it('creates basic metadata with required fields', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.title).toBe('Test Page | Four Loop Digital');
      expect(metadata.description).toBe('Test description');
      expect(metadata.metadataBase).toEqual(new URL(siteConfig.url));
    });

    it('handles site name as title without duplication', () => {
      const metadata = generateMetadata({
        title: 'Four Loop Digital',
        description: 'Test description',
      });

      expect(metadata.title).toBe('Four Loop Digital');
    });

    it('includes Open Graph metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.openGraph).toEqual(
        expect.objectContaining({
          title: 'Test Page | Four Loop Digital',
          description: 'Test description',
          url: siteConfig.url,
          siteName: siteConfig.name,
          type: 'website',
        })
      );
    });

    it('includes Twitter metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.twitter).toEqual(
        expect.objectContaining({
          card: 'summary_large_image',
          title: 'Test Page | Four Loop Digital',
          description: 'Test description',
        })
      );
    });

    it('handles custom keywords', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
        keywords: ['custom', 'test'],
      });

      expect(metadata.keywords).toContain('custom');
      expect(metadata.keywords).toContain('test');
      expect(metadata.keywords).toContain('digital consulting'); // from siteConfig
    });

    it('sets noIndex robots when specified', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
        noIndex: true,
      });

      expect(metadata.robots).toEqual(
        expect.objectContaining({
          index: false,
          follow: false,
        })
      );
    });

    it('includes canonical URL when provided', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
        canonical: 'https://example.com/test',
      });

      expect(metadata.alternates).toEqual(
        expect.objectContaining({
          canonical: 'https://example.com/test',
        })
      );
    });
  });

  describe('Pre-configured metadata', () => {
    it('has valid home metadata', () => {
      expect(homeMetadata.title).toBe('Four Loop Digital');
      expect(homeMetadata.description).toBe(siteConfig.description);
      expect(homeMetadata.keywords).toContain('homepage');
    });

    it('has valid about metadata', () => {
      expect(aboutMetadata.title).toBe('About Us | Four Loop Digital');
      expect(aboutMetadata.description).toBeTruthy();
      expect(aboutMetadata.keywords).toContain('about');
    });

    it('has valid work metadata', () => {
      expect(workMetadata.title).toBe('Our Work | Four Loop Digital');
      expect(workMetadata.description).toBeTruthy();
      expect(workMetadata.keywords).toContain('portfolio');
    });

    it('has valid contact metadata', () => {
      expect(contactMetadata.title).toBe('Contact Us | Four Loop Digital');
      expect(contactMetadata.description).toBeTruthy();
      expect(contactMetadata.keywords).toContain('contact');
    });

    it('all pre-configured metadata have required SEO fields', () => {
      const metadataObjects = [
        homeMetadata,
        aboutMetadata,
        workMetadata,
        contactMetadata,
      ];

      metadataObjects.forEach((metadata) => {
        expect(metadata.title).toBeTruthy();
        expect(metadata.description).toBeTruthy();
        expect(metadata.openGraph).toBeTruthy();
        expect(metadata.twitter).toBeTruthy();
        expect(metadata.robots).toBeTruthy();
      });
    });
  });
});
