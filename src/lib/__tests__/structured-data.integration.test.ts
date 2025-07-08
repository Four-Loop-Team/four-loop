/**
 * Integration tests for structured data utilities
 * Tests the complete flow of structured data generation and validation
 */

import {
  digitalConsultingServiceSchema,
  generateOrganizationSchema,
  generateServiceSchema,
  generateWebPageSchema,
  generateWebSiteSchema,
  mobileAppServiceSchema,
  renderStructuredData,
  webDevelopmentServiceSchema,
} from '../structured-data';

describe('Structured Data Integration Tests', () => {
  describe('Schema Generation', () => {
    test('should generate valid organization schema with all required fields', () => {
      const schema = generateOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBeDefined();
      expect(schema.description).toBeDefined();
      expect(schema.url).toBeDefined();
      expect(schema.logo).toBeDefined();
      expect(schema.sameAs).toBeInstanceOf(Array);
      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint['@type']).toBe('ContactPoint');
    });

    test('should generate valid website schema with search functionality', () => {
      const schema = generateWebSiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction['@type']).toBe('SearchAction');
      expect(schema.potentialAction.target).toBeDefined();
      expect(schema.potentialAction['query-input']).toBeDefined();
    });

    test('should generate webpage schema with optional image', () => {
      const params = {
        name: 'Test Page',
        description: 'Test description',
        url: 'https://example.com/test',
        imageUrl: 'https://example.com/image.jpg',
      };

      const schema = generateWebPageSchema(params);

      expect(schema.name).toBe(params.name);
      expect(schema.description).toBe(params.description);
      expect(schema.url).toBe(params.url);
      expect(schema.primaryImageOfPage).toBeDefined();
      expect(schema.primaryImageOfPage?.url).toBe(params.imageUrl);
    });

    test('should generate webpage schema without optional image', () => {
      const params = {
        name: 'Test Page',
        description: 'Test description',
        url: 'https://example.com/test',
      };

      const schema = generateWebPageSchema(params);

      expect(schema.primaryImageOfPage).toBeUndefined();
    });

    test('should generate service schema with provider information', () => {
      const params = {
        name: 'Test Service',
        description: 'Test service description',
        serviceType: 'Consulting',
      };

      const schema = generateServiceSchema(params);

      expect(schema.name).toBe(params.name);
      expect(schema.description).toBe(params.description);
      expect(schema.serviceType).toBe(params.serviceType);
      expect(schema.provider).toBeDefined();
      expect(schema.provider['@type']).toBe('Organization');
      expect(schema.areaServed).toBeDefined();
    });
  });

  describe('Pre-configured Service Schemas', () => {
    test('web development service schema should be valid', () => {
      expect(webDevelopmentServiceSchema['@context']).toBe(
        'https://schema.org'
      );
      expect(webDevelopmentServiceSchema['@type']).toBe('Service');
      expect(webDevelopmentServiceSchema.name).toContain('Web Development');
      expect(webDevelopmentServiceSchema.serviceType).toBe('Web Development');
    });

    test('mobile app service schema should be valid', () => {
      expect(mobileAppServiceSchema['@context']).toBe('https://schema.org');
      expect(mobileAppServiceSchema['@type']).toBe('Service');
      expect(mobileAppServiceSchema.name).toContain('Mobile');
      expect(mobileAppServiceSchema.serviceType).toBe('Mobile App Development');
    });

    test('digital consulting service schema should be valid', () => {
      expect(digitalConsultingServiceSchema['@context']).toBe(
        'https://schema.org'
      );
      expect(digitalConsultingServiceSchema['@type']).toBe('Service');
      expect(digitalConsultingServiceSchema.name).toContain('Consulting');
      expect(digitalConsultingServiceSchema.serviceType).toBe(
        'Digital Consulting'
      );
    });
  });

  describe('JSON-LD Rendering', () => {
    test('should render schema as minified JSON string', () => {
      const schema = { test: 'value', nested: { prop: 123 } };
      const result = renderStructuredData(schema);

      expect(result).toBe('{"test":"value","nested":{"prop":123}}');
      expect(JSON.parse(result)).toEqual(schema);
    });

    test('should handle complex schema objects', () => {
      const schema = generateOrganizationSchema();
      const result = renderStructuredData(schema);

      expect(() => JSON.parse(result)).not.toThrow();
      expect(JSON.parse(result)).toEqual(schema);
    });
  });

  describe('Schema Validation', () => {
    test('all schemas should have required Schema.org properties', () => {
      const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateWebPageSchema({
          name: 'Test',
          description: 'Test',
          url: 'https://test.com',
        }),
        generateServiceSchema({
          name: 'Test',
          description: 'Test',
          serviceType: 'Test',
        }),
      ];

      schemas.forEach((schema) => {
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBeDefined();
        expect(typeof schema['@type']).toBe('string');
      });
    });

    test('schemas should be serializable to JSON-LD', () => {
      const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        webDevelopmentServiceSchema,
        mobileAppServiceSchema,
        digitalConsultingServiceSchema,
      ];

      schemas.forEach((schema) => {
        expect(() => renderStructuredData(schema)).not.toThrow();
        const jsonLD = renderStructuredData(schema);
        expect(() => JSON.parse(jsonLD)).not.toThrow();
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty service parameters gracefully', () => {
      const schema = generateServiceSchema({
        name: '',
        description: '',
        serviceType: '',
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
      expect(schema.provider).toBeDefined();
    });

    test('should handle special characters in webpage data', () => {
      const params = {
        name: 'Test & "Quotes" <HTML>',
        description: 'Description with émojis 🚀 and spëcial chars',
        url: 'https://example.com/test?param=value&other=test',
      };

      const schema = generateWebPageSchema(params);
      const jsonLD = renderStructuredData(schema);

      expect(() => JSON.parse(jsonLD)).not.toThrow();
      expect(JSON.parse(jsonLD).name).toBe(params.name);
      expect(JSON.parse(jsonLD).description).toBe(params.description);
    });
  });
});
