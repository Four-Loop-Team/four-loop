/**
 * Test suite for design tokens and CSS custom properties
 * Tests CSS variable definitions and token structure
 */

import {
  COLOR_CSS_VARS,
  createCSSVariables,
  DESIGN_TOKENS_CSS_VARS,
  ELEVATION_CSS_VARS,
  generateRootCSS,
  generateThemeCSS,
  TYPOGRAPHY_CSS_VARS,
  Z_INDEX_CSS_VARS,
} from '../design-tokens';
import { SPACING_CSS_VARS } from '../spacing';

describe('Design Tokens', () => {
  describe('Color CSS Variables', () => {
    test('COLOR_CSS_VARS should contain light theme variables', () => {
      expect(COLOR_CSS_VARS).toBeDefined();
      expect(COLOR_CSS_VARS).toHaveProperty('light');
      expect(typeof COLOR_CSS_VARS.light).toBe('object');

      const lightVars = COLOR_CSS_VARS.light;

      // Should have background variables
      expect(lightVars).toHaveProperty('--color-background-primary');
      expect(lightVars).toHaveProperty('--color-background-secondary');

      // Should have surface variables
      expect(lightVars).toHaveProperty('--color-surface-primary');
      expect(lightVars).toHaveProperty('--color-surface-secondary');

      // Should have text variables
      expect(lightVars).toHaveProperty('--color-text-primary');
      expect(lightVars).toHaveProperty('--color-text-secondary');

      // Should have border variables
      expect(lightVars).toHaveProperty('--color-border-primary');
      expect(lightVars).toHaveProperty('--color-border-secondary');

      // Should have brand color variables
      expect(lightVars).toHaveProperty('--color-primary-500');
      expect(lightVars).toHaveProperty('--color-primary-600');

      // Should have semantic variables
      expect(lightVars).toHaveProperty('--color-success');
      expect(lightVars).toHaveProperty('--color-warning');
      expect(lightVars).toHaveProperty('--color-error');
      expect(lightVars).toHaveProperty('--color-info');
    });

    test('COLOR_CSS_VARS should contain dark theme variables', () => {
      expect(COLOR_CSS_VARS).toHaveProperty('dark');
      expect(typeof COLOR_CSS_VARS.dark).toBe('object');

      const darkVars = COLOR_CSS_VARS.dark;

      // Should have the same variable names as light theme
      const lightVarNames = Object.keys(COLOR_CSS_VARS.light);
      const darkVarNames = Object.keys(darkVars);

      expect(darkVarNames).toEqual(lightVarNames);
    });

    test('Color variables should have valid CSS variable names', () => {
      const allColorVars = { ...COLOR_CSS_VARS.light, ...COLOR_CSS_VARS.dark };

      Object.keys(allColorVars).forEach((varName) => {
        expect(varName).toMatch(/^--color-/); // Should start with --color-
        expect(varName).toMatch(/^--[\w-]+$/); // Should be valid CSS custom property name
      });
    });

    test('Color variable values should be valid colors', () => {
      const validateColor = (value: string) => {
        // Should be hex color, rgb/rgba, hsl/hsla, or CSS keyword
        const colorRegex =
          /^(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|\w+).*$/;
        expect(value).toMatch(colorRegex);
      };

      Object.values(COLOR_CSS_VARS.light).forEach(validateColor);
      Object.values(COLOR_CSS_VARS.dark).forEach(validateColor);
    });
  });

  describe('Typography CSS Variables', () => {
    test('TYPOGRAPHY_CSS_VARS should contain font variables', () => {
      expect(TYPOGRAPHY_CSS_VARS).toBeDefined();
      expect(typeof TYPOGRAPHY_CSS_VARS).toBe('object');

      // Should have font family variables
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--font-family-sans');
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--font-family-serif');
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--font-family-mono');

      // Should have font weight variables
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--font-weight-regular');
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--font-weight-bold');

      // Should have typography scale variables
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty(
        '--typography-heading-lg-size'
      );
      expect(TYPOGRAPHY_CSS_VARS).toHaveProperty('--typography-body-md-size');
    });

    test('Typography variables should have valid CSS variable names', () => {
      Object.keys(TYPOGRAPHY_CSS_VARS).forEach((varName) => {
        expect(varName).toMatch(/^--(font|typography)/); // Should start with --font or --typography
        expect(varName).toMatch(/^--[\w-]+$/); // Should be valid CSS custom property name
      });
    });

    test('Font family values should be valid CSS font stacks', () => {
      const fontFamilyVars = Object.entries(TYPOGRAPHY_CSS_VARS).filter(
        ([key]) => key.includes('font-family')
      );

      fontFamilyVars.forEach(([, value]) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
        // Should contain font names (may include quotes and fallbacks)
        expect(value).toMatch(/[\w\s,"'-]+/);
      });
    });

    test('Font size values should be valid CSS units', () => {
      const fontSizeVars = Object.entries(TYPOGRAPHY_CSS_VARS).filter(([key]) =>
        key.includes('font-size')
      );

      fontSizeVars.forEach(([, value]) => {
        expect(typeof value).toBe('string');
        // Should be valid CSS unit (rem, px, em, %)
        expect(value).toMatch(/^\d*\.?\d+(rem|px|em|%|vw|vh)$/);
      });
    });

    test('Font weight values should be valid', () => {
      const fontWeightVars = Object.entries(TYPOGRAPHY_CSS_VARS).filter(
        ([key]) => key.includes('font-weight')
      );

      fontWeightVars.forEach(([, value]) => {
        expect(typeof value).toBe('string');
        // Should be numeric weight or keyword
        expect(value).toMatch(/^(\d{3}|normal|bold|lighter|bolder)$/);
      });
    });
  });

  describe('Spacing CSS Variables', () => {
    test('SPACING_CSS_VARS should contain spacing scale', () => {
      expect(SPACING_CSS_VARS).toBeDefined();
      expect(typeof SPACING_CSS_VARS).toBe('object');

      // Should have semantic spacing categories
      expect(SPACING_CSS_VARS).toHaveProperty('--spacing-micro-xs');
      expect(SPACING_CSS_VARS).toHaveProperty('--spacing-component-md');
      expect(SPACING_CSS_VARS).toHaveProperty('--spacing-layout-lg');
    });

    test('Spacing variables should have valid CSS variable names', () => {
      Object.keys(SPACING_CSS_VARS).forEach((varName) => {
        expect(varName).toMatch(/^--spacing-/); // Should start with --spacing-
        expect(varName).toMatch(/^--[\w-]+$/); // Should be valid CSS custom property name
      });
    });

    test('Spacing values should be valid CSS units', () => {
      Object.values(SPACING_CSS_VARS).forEach((value) => {
        expect(typeof value).toBe('string');
        // Should be valid CSS unit (rem, px, em)
        expect(value).toMatch(/^\d*\.?\d+(rem|px|em)$/);
      });
    });
  });

  describe('Elevation CSS Variables', () => {
    test('ELEVATION_CSS_VARS should contain shadow definitions', () => {
      expect(ELEVATION_CSS_VARS).toBeDefined();
      expect(typeof ELEVATION_CSS_VARS).toBe('object');

      // Should have elevation levels
      expect(ELEVATION_CSS_VARS).toHaveProperty('--elevation-none');
      expect(ELEVATION_CSS_VARS).toHaveProperty('--elevation-sm');
      expect(ELEVATION_CSS_VARS).toHaveProperty('--elevation-md');
      expect(ELEVATION_CSS_VARS).toHaveProperty('--elevation-lg');
      expect(ELEVATION_CSS_VARS).toHaveProperty('--elevation-xl');
    });

    test('Elevation variables should have valid CSS variable names', () => {
      Object.keys(ELEVATION_CSS_VARS).forEach((varName) => {
        expect(varName).toMatch(/^--elevation-/); // Should start with --elevation-
        expect(varName).toMatch(/^--[\w-]+$/); // Should be valid CSS custom property name
      });
    });

    test('Elevation values should be valid box-shadow CSS', () => {
      Object.values(ELEVATION_CSS_VARS).forEach((value) => {
        expect(typeof value).toBe('string');
        // Should be valid box-shadow or 'none' - includes inset and standard shadow formats
        expect(value).toMatch(/^(none|inset\s+|[\d\s-]+)/);
      });
    });
  });

  describe('Z-Index CSS Variables', () => {
    test('Z_INDEX_CSS_VARS should contain z-index values', () => {
      expect(Z_INDEX_CSS_VARS).toBeDefined();
      expect(typeof Z_INDEX_CSS_VARS).toBe('object');

      // Should have z-index layers
      expect(Z_INDEX_CSS_VARS).toHaveProperty('--z-index-base');
      expect(Z_INDEX_CSS_VARS).toHaveProperty('--z-index-dropdown');
      expect(Z_INDEX_CSS_VARS).toHaveProperty('--z-index-modal');
      expect(Z_INDEX_CSS_VARS).toHaveProperty('--z-index-toast');
      expect(Z_INDEX_CSS_VARS).toHaveProperty('--z-index-tooltip');
    });

    test('Z-index variables should have valid CSS variable names', () => {
      Object.keys(Z_INDEX_CSS_VARS).forEach((varName) => {
        expect(varName).toMatch(/^--z-index-/); // Should start with --z-index-
        expect(varName).toMatch(/^--[\w-]+$/); // Should be valid CSS custom property name
      });
    });

    test('Z-index values should be valid integers or auto', () => {
      Object.values(Z_INDEX_CSS_VARS).forEach((value) => {
        expect(typeof value).toBe('string');
        // Should be integer, negative integer, or 'auto'
        expect(value).toMatch(/^(-?\d+|auto)$/);
      });
    });
  });

  describe('Design Token Utilities', () => {
    test('generateThemeCSS should generate CSS for light theme', () => {
      const css = generateThemeCSS('light');

      expect(css).toBeDefined();
      expect(typeof css).toBe('string');
      expect(css.length).toBeGreaterThan(0);

      // Should contain CSS custom properties
      expect(css).toMatch(/--[\w-]+:\s*[^;]+;/);
    });

    test('generateThemeCSS should generate CSS for dark theme', () => {
      const lightCSS = generateThemeCSS('light');
      const darkCSS = generateThemeCSS('dark');

      expect(darkCSS).toBeDefined();
      expect(typeof darkCSS).toBe('string');
      expect(darkCSS.length).toBeGreaterThan(0);

      // Light and dark CSS should be different
      expect(lightCSS).not.toBe(darkCSS);
    });

    test('generateRootCSS should create complete CSS with selectors', () => {
      const rootCSS = generateRootCSS('light');

      expect(rootCSS).toBeDefined();
      expect(typeof rootCSS).toBe('string');
      expect(rootCSS.length).toBeGreaterThan(0);

      // Should contain :root selector
      expect(rootCSS).toMatch(/:root\s*\{/);

      // Should contain theme-specific selectors
      expect(rootCSS).toMatch(/\[data-theme="light"\]/);
      expect(rootCSS).toMatch(/\[data-theme="dark"\]/);

      // Should contain media query for dark mode
      expect(rootCSS).toMatch(/@media\s*\(prefers-color-scheme:\s*dark\)/);
    });

    test('createCSSVariables should convert object to CSS properties', () => {
      const testVars = {
        '--test-color': '#ffffff',
        '--test-size': '16px',
        '--test-number': 1000,
      };

      const cssVars = createCSSVariables(testVars);

      expect(cssVars).toBeDefined();
      expect(typeof cssVars).toBe('object');

      // Should convert numbers to strings
      expect(cssVars['--test-number']).toBe('1000');
      expect(typeof cssVars['--test-number']).toBe('string');

      // Should preserve strings
      expect(cssVars['--test-color']).toBe('#ffffff');
      expect(cssVars['--test-size']).toBe('16px');
    });

    test('DESIGN_TOKENS_CSS_VARS should combine all token categories', () => {
      expect(DESIGN_TOKENS_CSS_VARS).toBeDefined();
      expect(typeof DESIGN_TOKENS_CSS_VARS).toBe('object');

      // Should combine all token types as CSS variables
      expect(Object.keys(DESIGN_TOKENS_CSS_VARS).length).toBeGreaterThan(0);

      // Should contain variables from different categories
      const keys = Object.keys(DESIGN_TOKENS_CSS_VARS);
      const hasSpacing = keys.some((key) => key.includes('spacing'));
      const hasTypography = keys.some(
        (key) => key.includes('typography') || key.includes('font')
      );
      const hasElevation = keys.some((key) => key.includes('elevation'));
      const hasZIndex = keys.some((key) => key.includes('z-index'));

      expect(hasSpacing).toBe(true);
      expect(hasTypography).toBe(true);
      expect(hasElevation).toBe(true);
      expect(hasZIndex).toBe(true);
    });
  });

  describe('Token Structure Validation', () => {
    test('All token categories should be present in individual token objects', () => {
      // Test individual token objects instead of the combined one
      expect(COLOR_CSS_VARS).toBeDefined();
      expect(TYPOGRAPHY_CSS_VARS).toBeDefined();
      expect(SPACING_CSS_VARS).toBeDefined();
      expect(ELEVATION_CSS_VARS).toBeDefined();
      expect(Z_INDEX_CSS_VARS).toBeDefined();

      expect(typeof COLOR_CSS_VARS).toBe('object');
      expect(typeof TYPOGRAPHY_CSS_VARS).toBe('object');
      expect(typeof SPACING_CSS_VARS).toBe('object');
      expect(typeof ELEVATION_CSS_VARS).toBe('object');
      expect(typeof Z_INDEX_CSS_VARS).toBe('object');
    });

    test('Token variables should have proper CSS variable names', () => {
      const validateTokenNames = (obj: any) => {
        Object.keys(obj).forEach((key) => {
          if (key.startsWith('--')) {
            // Token names should use kebab-case and start with --
            expect(key).toMatch(/^--[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
          }
        });
      };

      validateTokenNames(COLOR_CSS_VARS.light);
      validateTokenNames(TYPOGRAPHY_CSS_VARS);
      validateTokenNames(SPACING_CSS_VARS);
      validateTokenNames(ELEVATION_CSS_VARS);
      validateTokenNames(Z_INDEX_CSS_VARS);
    });
  });

  describe('CSS Output Validation', () => {
    test('Generated CSS should be valid', () => {
      const css = generateRootCSS('light');

      // Should not contain syntax errors
      expect(css).not.toMatch(/undefined|null|NaN/);

      // Should have proper CSS syntax
      expect(css).toMatch(/:root\s*\{[\s\S]*\}/);

      // Each property should be properly formatted
      const propertyMatches = css.match(/--[\w-]+:\s*[^;]+;/g);
      expect(propertyMatches).toBeTruthy();
      expect(propertyMatches!.length).toBeGreaterThan(0);
    });

    test('CSS variables should be properly formatted', () => {
      const css = generateThemeCSS('light');

      // Should not contain dangerous characters except quotes in font families
      expect(css).not.toMatch(/[<>&]/);

      // Should have proper CSS property format
      expect(css).toMatch(/--[\w-]+:\s*[^;]+;/);
    });
  });
});
