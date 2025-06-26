import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateServiceSchema,
  renderStructuredData,
  webDevelopmentServiceSchema,
  mobileAppServiceSchema,
  digitalConsultingServiceSchema,
} from '../structured-data';
import { siteConfig } from '../metadata';

describe('Structured Data', () => {
  describe('generateOrganizationSchema', () => {
    it('generates valid organization schema', () => {
      const schema = generateOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe(siteConfig.name);
      expect(schema.description).toBe(siteConfig.description);
      expect(schema.url).toBe(siteConfig.url);
      expect(schema.logo).toBe(`${siteConfig.url}/logo.png`);
    });

    it('includes correct social media links', () => {
      const schema = generateOrganizationSchema();

      expect(schema.sameAs).toContain(
        `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`
      );
      expect(schema.sameAs).toContain(
        `https://linkedin.com/${siteConfig.social.linkedin}`
      );
    });

    it('includes contact point', () => {
      const schema = generateOrganizationSchema();

      expect(schema.contactPoint).toEqual({
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
      });
    });
  });

  describe('generateWebSiteSchema', () => {
    it('generates valid website schema', () => {
      const schema = generateWebSiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe(siteConfig.name);
      expect(schema.description).toBe(siteConfig.description);
      expect(schema.url).toBe(siteConfig.url);
    });

    it('includes search action', () => {
      const schema = generateWebSiteSchema();

      expect(schema.potentialAction).toEqual({
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      });
    });
  });

  describe('generateWebPageSchema', () => {
    const mockPageData = {
      name: 'Test Page',
      description: 'Test page description',
      url: 'https://example.com/test',
    };

    it('generates valid webpage schema without image', () => {
      const schema = generateWebPageSchema(mockPageData);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebPage');
      expect(schema.name).toBe(mockPageData.name);
      expect(schema.description).toBe(mockPageData.description);
      expect(schema.url).toBe(mockPageData.url);
    });

    it('includes isPartOf reference to website', () => {
      const schema = generateWebPageSchema(mockPageData);

      expect(schema.isPartOf).toEqual({
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      });
    });

    it('includes primary image when provided', () => {
      const pageDataWithImage = {
        ...mockPageData,
        imageUrl: 'https://example.com/image.jpg',
      };

      const schema = generateWebPageSchema(pageDataWithImage);

      expect(schema.primaryImageOfPage).toEqual({
        '@type': 'ImageObject',
        url: pageDataWithImage.imageUrl,
      });
    });

    it('does not include primary image when not provided', () => {
      const schema = generateWebPageSchema(mockPageData);

      expect(schema.primaryImageOfPage).toBeUndefined();
    });
  });

  describe('generateServiceSchema', () => {
    const mockServiceData = {
      name: 'Web Development',
      description: 'Custom web development services',
      serviceType: 'Web Development',
      areaServed: 'Worldwide',
    };

    it('generates valid service schema', () => {
      const schema = generateServiceSchema(mockServiceData);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
      expect(schema.name).toBe(mockServiceData.name);
      expect(schema.description).toBe(mockServiceData.description);
      expect(schema.serviceType).toBe(mockServiceData.serviceType);
      expect(schema.areaServed).toBe(mockServiceData.areaServed);
    });

    it('includes provider information', () => {
      const schema = generateServiceSchema(mockServiceData);

      expect(schema.provider).toEqual({
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      });
    });
  });

  describe('renderStructuredData', () => {
    it('converts schema object to JSON string', () => {
      const mockSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Org',
      };

      const result = renderStructuredData(mockSchema);

      expect(typeof result).toBe('string');
      expect(result).toContain('@context');
      expect(result).toContain('Test Org');
    });

    it('produces valid JSON', () => {
      const schema = generateOrganizationSchema();
      const jsonString = renderStructuredData(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsed = JSON.parse(jsonString);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(parsed['@context']).toBe('https://schema.org');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(parsed['@type']).toBe('Organization');
    });
  });

  describe('Schema structure validation', () => {
    it('all schemas include required @context and @type', () => {
      const orgSchema = generateOrganizationSchema();
      const webSchema = generateWebSiteSchema();
      const pageSchema = generateWebPageSchema({
        name: 'Test',
        description: 'Test',
        url: 'https://test.com',
      });

      [orgSchema, webSchema, pageSchema].forEach((schema) => {
        expect(schema['@context']).toBeDefined();
        expect(schema['@type']).toBeDefined();
      });
    });

    it('schemas can be serialized to JSON', () => {
      const orgSchema = generateOrganizationSchema();

      expect(() => JSON.stringify(orgSchema)).not.toThrow();

      const jsonString = JSON.stringify(orgSchema);
      expect(jsonString).toContain('@context');
      expect(jsonString).toContain('@type');
    });
  });

  // Additional tests for 100% coverage
  describe('Edge cases and complete coverage', () => {
    it('generates organization schema with all optional fields', () => {
      const schema = generateOrganizationSchema();

      // Test all required fields exist
      expect(schema.name).toBeDefined();
      expect(schema.description).toBeDefined();
      expect(schema.url).toBeDefined();
      expect(schema.logo).toBeDefined();
      expect(schema.sameAs).toBeDefined();
      expect(schema.contactPoint).toBeDefined();
    });

    it('handles renderStructuredData with complex nested objects', () => {
      const complexObject = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        nested: {
          deep: {
            value: 'test',
          },
        },
        array: [1, 2, 3],
      };

      const result = renderStructuredData(complexObject);
      expect(result).toContain('"@context":"https://schema.org"');
      expect(result).toContain('"nested":{"deep":{"value":"test"}}');
      expect(result).toContain('"array":[1,2,3]');
    });

    it('generates service schema with all properties', () => {
      const serviceData = {
        name: 'Test Service',
        description: 'Test service description',
        serviceType: 'Technology',
      };

      const schema = generateServiceSchema(serviceData);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
      expect(schema.name).toBe(serviceData.name);
      expect(schema.description).toBe(serviceData.description);
      expect(schema.serviceType).toBe(serviceData.serviceType);
    });

    it('handles empty or minimal inputs', () => {
      const minimalPageData = {
        name: 'Minimal',
        description: 'Minimal description',
        url: 'https://example.com',
      };

      const schema = generateWebPageSchema(minimalPageData);
      expect(schema.name).toBe('Minimal');
      expect(schema.description).toBe('Minimal description');
      expect(schema.url).toBe('https://example.com');
    });
  });
  describe('Pre-defined Service Schemas', () => {
    it('tests webDevelopmentServiceSchema', () => {
      expect(webDevelopmentServiceSchema['@type']).toBe('Service');
      expect(webDevelopmentServiceSchema.name).toBe('Web Development Services');
      expect(webDevelopmentServiceSchema.serviceType).toBe('Web Development');
      expect(webDevelopmentServiceSchema.provider.name).toBe(siteConfig.name);
    });

    it('tests mobileAppServiceSchema', () => {
      expect(mobileAppServiceSchema['@type']).toBe('Service');
      expect(mobileAppServiceSchema.name).toBe(
        'Mobile Application Development'
      );
      expect(mobileAppServiceSchema.serviceType).toBe('Mobile App Development');
      expect(mobileAppServiceSchema.provider.name).toBe(siteConfig.name);
    });

    it('tests digitalConsultingServiceSchema', () => {
      expect(digitalConsultingServiceSchema['@type']).toBe('Service');
      expect(digitalConsultingServiceSchema.name).toBe(
        'Digital Consulting Services'
      );
      expect(digitalConsultingServiceSchema.serviceType).toBe(
        'Digital Consulting'
      );
      expect(digitalConsultingServiceSchema.provider.name).toBe(
        siteConfig.name
      );
    });
  });

  describe('Full module coverage', () => {
    it('imports and tests all exported functions', () => {
      // Test that all functions are properly exported and callable
      expect(typeof generateOrganizationSchema).toBe('function');
      expect(typeof generateWebSiteSchema).toBe('function');
      expect(typeof generateWebPageSchema).toBe('function');
      expect(typeof generateServiceSchema).toBe('function');
      expect(typeof renderStructuredData).toBe('function');
    });

    it('covers all service schema generations', () => {
      const webDevSchema = generateServiceSchema({
        name: 'Web Development Services',
        description:
          'Custom web application development using modern technologies and best practices.',
        serviceType: 'Web Development',
      });

      const mobileSchema = generateServiceSchema({
        name: 'Mobile Application Development',
        description:
          'Native and cross-platform mobile application development for iOS and Android.',
        serviceType: 'Mobile App Development',
      });

      const consultingSchema = generateServiceSchema({
        name: 'Digital Consulting Services',
        description:
          'Strategic digital transformation consulting to help businesses modernize and grow.',
        serviceType: 'Digital Consulting',
      });

      expect(webDevSchema.name).toBe('Web Development Services');
      expect(mobileSchema.name).toBe('Mobile Application Development');
      expect(consultingSchema.name).toBe('Digital Consulting Services');

      expect(webDevSchema.areaServed).toBe('Worldwide');
      expect(mobileSchema.areaServed).toBe('Worldwide');
      expect(consultingSchema.areaServed).toBe('Worldwide');
    });
    it('ensures all generateServiceSchema parameters are covered', () => {
      const customServiceData = {
        name: 'Custom Service',
        description: 'Custom service description',
        serviceType: 'Custom Type',
      };

      const schema = generateServiceSchema(customServiceData);

      expect(schema.name).toBe(customServiceData.name);
      expect(schema.description).toBe(customServiceData.description);
      expect(schema.serviceType).toBe(customServiceData.serviceType);
      expect(schema.areaServed).toBe('Worldwide'); // This is the default value
    });
  });
});
