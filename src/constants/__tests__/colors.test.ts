/**
 * Test suite for color constants and theme utilities
 * Tests color definitions, theme functions, and color utilities
 */

import {
  BRAND_COLORS,
  COLOR_CONTRAST_RATIOS,
  CONTEXTUAL_COLORS,
  createColorScale,
  DARK_THEME,
  ELEVATION,
  EXTENDED_SEMANTIC_COLORS,
  getTheme,
  LIGHT_THEME,
  SEMANTIC_COLORS,
  THEME_MODES,
  Z_INDEX,
  type BrandColor,
  type ElevationLevel,
  type SemanticColor,
  type ThemeMode,
} from '../colors';

describe('Color Constants', () => {
  describe('Brand Colors', () => {
    test('BRAND_COLORS should contain complete color scales', () => {
      expect(BRAND_COLORS).toBeDefined();
      expect(typeof BRAND_COLORS).toBe('object');

      // Should have primary brand colors
      expect(BRAND_COLORS).toHaveProperty('primary');
      expect(BRAND_COLORS).toHaveProperty('neutral');
      expect(BRAND_COLORS).toHaveProperty('accent');

      // Each color should have a complete scale
      const colorKeys = Object.keys(BRAND_COLORS) as BrandColor[];
      colorKeys.forEach((colorKey) => {
        const colorScale = BRAND_COLORS[colorKey];
        expect(typeof colorScale).toBe('object');

        // Should have standard scale values
        const expectedScales = [
          '50',
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
          '950',
        ];
        expectedScales.forEach((scale) => {
          expect(colorScale).toHaveProperty(scale);
          expect(typeof (colorScale as any)[scale]).toBe('string');
          expect((colorScale as any)[scale]).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
        });
      });
    });

    test('Primary colors should have the correct brand values', () => {
      expect(BRAND_COLORS.primary[300]).toBe('#e2e891'); // Brand primary
      expect(BRAND_COLORS.neutral[950]).toBe('#353535'); // Brand secondary
    });
  });

  describe('Semantic Colors', () => {
    test('SEMANTIC_COLORS should contain state colors', () => {
      expect(SEMANTIC_COLORS).toBeDefined();
      expect(typeof SEMANTIC_COLORS).toBe('object');

      // Should have semantic state colors
      expect(SEMANTIC_COLORS).toHaveProperty('success');
      expect(SEMANTIC_COLORS).toHaveProperty('warning');
      expect(SEMANTIC_COLORS).toHaveProperty('error');
      expect(SEMANTIC_COLORS).toHaveProperty('info');

      // Each semantic color should have a complete scale
      const semanticKeys = Object.keys(SEMANTIC_COLORS) as SemanticColor[];
      semanticKeys.forEach((colorKey) => {
        const colorScale = SEMANTIC_COLORS[colorKey];
        expect(typeof colorScale).toBe('object');

        // Should have key semantic scale values
        const expectedScales = ['50', '100', '500', '900', '950'];
        expectedScales.forEach((scale) => {
          expect(colorScale).toHaveProperty(scale);
          expect(typeof (colorScale as any)[scale]).toBe('string');
          expect((colorScale as any)[scale]).toMatch(/^#[0-9a-fA-F]{6}$/);
        });
      });
    });
  });

  describe('Extended Semantic Colors', () => {
    test('EXTENDED_SEMANTIC_COLORS should contain extended states', () => {
      expect(EXTENDED_SEMANTIC_COLORS).toBeDefined();
      expect(typeof EXTENDED_SEMANTIC_COLORS).toBe('object');

      expect(EXTENDED_SEMANTIC_COLORS).toHaveProperty('disabled');
      expect(EXTENDED_SEMANTIC_COLORS).toHaveProperty('skeleton');
      expect(EXTENDED_SEMANTIC_COLORS).toHaveProperty('interactive');

      // Disabled state should have necessary properties
      expect(EXTENDED_SEMANTIC_COLORS.disabled).toHaveProperty('background');
      expect(EXTENDED_SEMANTIC_COLORS.disabled).toHaveProperty('text');
      expect(EXTENDED_SEMANTIC_COLORS.disabled).toHaveProperty('border');

      // Interactive states should have hover and active
      expect(EXTENDED_SEMANTIC_COLORS.interactive).toHaveProperty('hover');
      expect(EXTENDED_SEMANTIC_COLORS.interactive).toHaveProperty('active');
    });
  });

  describe('Contextual Colors', () => {
    test('CONTEXTUAL_COLORS should contain CSS custom properties', () => {
      expect(CONTEXTUAL_COLORS).toBeDefined();
      expect(typeof CONTEXTUAL_COLORS).toBe('object');

      expect(CONTEXTUAL_COLORS).toHaveProperty('surface');
      expect(CONTEXTUAL_COLORS).toHaveProperty('border');
      expect(CONTEXTUAL_COLORS).toHaveProperty('text');

      // Each contextual color should use CSS custom properties
      Object.values(CONTEXTUAL_COLORS).forEach((category) => {
        Object.values(category).forEach((value) => {
          expect(typeof value).toBe('string');
          expect(value).toMatch(/^var\(--/); // Should be CSS custom property
        });
      });
    });
  });

  describe('Theme Definitions', () => {
    test('LIGHT_THEME should contain complete theme definition', () => {
      expect(LIGHT_THEME).toBeDefined();
      expect(typeof LIGHT_THEME).toBe('object');

      // Should have all theme categories
      expect(LIGHT_THEME).toHaveProperty('background');
      expect(LIGHT_THEME).toHaveProperty('surface');
      expect(LIGHT_THEME).toHaveProperty('text');
      expect(LIGHT_THEME).toHaveProperty('border');
      expect(LIGHT_THEME).toHaveProperty('brand');
      expect(LIGHT_THEME).toHaveProperty('semantic');

      // Background should have primary and secondary
      expect(LIGHT_THEME.background).toHaveProperty('primary');
      expect(LIGHT_THEME.background).toHaveProperty('secondary');
    });

    test('DARK_THEME should contain complete theme definition', () => {
      expect(DARK_THEME).toBeDefined();
      expect(typeof DARK_THEME).toBe('object');

      // Should have same structure as light theme
      expect(DARK_THEME).toHaveProperty('background');
      expect(DARK_THEME).toHaveProperty('surface');
      expect(DARK_THEME).toHaveProperty('text');
      expect(DARK_THEME).toHaveProperty('border');
      expect(DARK_THEME).toHaveProperty('brand');
      expect(DARK_THEME).toHaveProperty('semantic');
    });

    test('THEME_MODES should contain valid mode constants', () => {
      expect(THEME_MODES).toBeDefined();
      expect(THEME_MODES.LIGHT).toBe('light');
      expect(THEME_MODES.DARK).toBe('dark');
    });
  });

  describe('Elevation and Z-Index', () => {
    test('ELEVATION should contain shadow definitions', () => {
      expect(ELEVATION).toBeDefined();
      expect(typeof ELEVATION).toBe('object');

      // Should have elevation levels
      const elevationKeys = Object.keys(ELEVATION) as ElevationLevel[];
      expect(elevationKeys.length).toBeGreaterThan(0);

      elevationKeys.forEach((level) => {
        const elevation = ELEVATION[level];
        expect(typeof elevation).toBe('string');
        // Should be CSS box-shadow value or "none" - includes inset and standard shadow formats
        expect(elevation).toMatch(/^(none|inset\s+|[\d\s-]+)/);
      });
    });

    test('Z_INDEX should contain layered values', () => {
      expect(Z_INDEX).toBeDefined();
      expect(typeof Z_INDEX).toBe('object');

      // Should have essential layers
      expect(Z_INDEX).toHaveProperty('base');
      expect(Z_INDEX).toHaveProperty('dropdown');
      expect(Z_INDEX).toHaveProperty('modal');
      expect(Z_INDEX).toHaveProperty('toast');
      expect(Z_INDEX).toHaveProperty('tooltip');

      // Z-index values should be in logical order
      expect(Z_INDEX.base).toBe(0);
      expect(Z_INDEX.dropdown).toBeGreaterThan(Z_INDEX.base);
      expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.dropdown);
      expect(Z_INDEX.toast).toBeGreaterThan(Z_INDEX.modal);
      expect(Z_INDEX.tooltip).toBeGreaterThan(Z_INDEX.toast);
    });
  });

  describe('Color Contrast and Accessibility', () => {
    test('COLOR_CONTRAST_RATIOS should contain WCAG standards', () => {
      expect(COLOR_CONTRAST_RATIOS).toBeDefined();
      expect(typeof COLOR_CONTRAST_RATIOS).toBe('object');

      expect(COLOR_CONTRAST_RATIOS).toHaveProperty('AA_NORMAL');
      expect(COLOR_CONTRAST_RATIOS).toHaveProperty('AA_LARGE');
      expect(COLOR_CONTRAST_RATIOS).toHaveProperty('AAA_NORMAL');
      expect(COLOR_CONTRAST_RATIOS).toHaveProperty('AAA_LARGE');

      // Should match WCAG standards
      expect(COLOR_CONTRAST_RATIOS.AA_NORMAL).toBe(4.5);
      expect(COLOR_CONTRAST_RATIOS.AA_LARGE).toBe(3);
      expect(COLOR_CONTRAST_RATIOS.AAA_NORMAL).toBe(7);
      expect(COLOR_CONTRAST_RATIOS.AAA_LARGE).toBe(4.5);
    });
  });

  describe('Theme Utility Functions', () => {
    test('getTheme should return correct theme for mode', () => {
      const lightTheme = getTheme('light');
      const darkTheme = getTheme('dark');

      expect(lightTheme).toEqual(LIGHT_THEME);
      expect(darkTheme).toEqual(DARK_THEME);

      // Themes should be different
      expect(lightTheme.background.primary).not.toBe(
        darkTheme.background.primary
      );
    });

    test('getTheme should handle invalid input gracefully', () => {
      const invalidTheme = getTheme('invalid' as ThemeMode);
      expect(invalidTheme).toEqual(LIGHT_THEME); // Should default to light
    });

    test('createColorScale should generate color variations', () => {
      const baseColor = '#e2e891';
      const scale = createColorScale(baseColor);

      expect(Array.isArray(scale)).toBe(true);
      expect(scale).toHaveLength(11); // Default steps

      scale.forEach((step, index) => {
        expect(step).toHaveProperty('step');
        expect(step).toHaveProperty('color');
        expect(step.step).toBe(index * 100);
        expect(typeof step.color).toBe('string');
      });
    });

    test('createColorScale should accept custom step count', () => {
      const baseColor = '#ff0000';
      const customSteps = 5;
      const scale = createColorScale(baseColor, customSteps);

      expect(scale).toHaveLength(customSteps);
    });
  });

  describe('Type Safety', () => {
    test('BrandColor type should match BRAND_COLORS keys', () => {
      const brandColorKeys = Object.keys(BRAND_COLORS);
      brandColorKeys.forEach((key) => {
        expect(BRAND_COLORS[key as BrandColor]).toBeDefined();
      });
    });

    test('SemanticColor type should match SEMANTIC_COLORS keys', () => {
      const semanticColorKeys = Object.keys(SEMANTIC_COLORS);
      semanticColorKeys.forEach((key) => {
        expect(SEMANTIC_COLORS[key as SemanticColor]).toBeDefined();
      });
    });

    test('ThemeMode type should accept valid values', () => {
      const lightMode: ThemeMode = 'light';
      const darkMode: ThemeMode = 'dark';

      expect(lightMode).toBe('light');
      expect(darkMode).toBe('dark');
    });

    test('ElevationLevel type should match ELEVATION keys', () => {
      const elevationKeys = Object.keys(ELEVATION);
      elevationKeys.forEach((key) => {
        expect(ELEVATION[key as ElevationLevel]).toBeDefined();
      });
    });
  });

  describe('Color Value Validation', () => {
    test('All color values should be valid hex codes', () => {
      const validateHexColor = (color: string) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      };

      // Validate brand colors
      Object.values(BRAND_COLORS).forEach((colorScale) => {
        Object.values(colorScale).forEach(validateHexColor);
      });

      // Validate semantic colors
      Object.values(SEMANTIC_COLORS).forEach((colorScale) => {
        Object.values(colorScale).forEach(validateHexColor);
      });
    });

    test('Theme colors should be consistent across modes', () => {
      // Both themes should have the same structure
      expect(Object.keys(LIGHT_THEME)).toEqual(Object.keys(DARK_THEME));
      expect(Object.keys(LIGHT_THEME.background)).toEqual(
        Object.keys(DARK_THEME.background)
      );
      expect(Object.keys(LIGHT_THEME.text)).toEqual(
        Object.keys(DARK_THEME.text)
      );
    });
  });

  describe('Constants Accessibility', () => {
    test('Color constants should be properly defined', () => {
      // Test that constants are accessible and properly structured
      expect(BRAND_COLORS).toBeDefined();
      expect(THEME_MODES).toBeDefined();
      expect(typeof BRAND_COLORS).toBe('object');
      expect(typeof THEME_MODES).toBe('object');
    });
  });
});
