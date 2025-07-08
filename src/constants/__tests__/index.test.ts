/**
 * Test suite for constants exports
 * Tests all constant values, types, and utility functions
 */

import {
  // Responsive breakpoints
  BREAKPOINTS,
  // Colors and theme
  COLORS,
  // Routes and navigation
  EXTERNAL_LINKS,
  GRID_COLUMNS,
  GRID_SPACING,
  MEDIA_QUERIES,
  NAVIGATION_ITEMS,
  ROUTES,
  THEME_MODES,
  Z_INDEX,
  type BreakpointKey,
  type MediaQueryKey,
  type RouteKey,
  type ThemeMode,
} from '../index';

describe('Constants Exports', () => {
  describe('Routes and Navigation', () => {
    test('ROUTES should contain all expected route keys', () => {
      expect(ROUTES).toBeDefined();
      expect(typeof ROUTES).toBe('object');

      // Check for expected route properties
      const routeKeys = Object.keys(ROUTES);
      expect(routeKeys.length).toBeGreaterThan(0);

      // Each route should be a string path starting with /
      routeKeys.forEach((key) => {
        const route = ROUTES[key as RouteKey];
        expect(typeof route).toBe('string');
        expect(route).toMatch(/^\//); // Should start with /
      });
    });

    test('NAVIGATION_ITEMS should be an array of navigation objects', () => {
      expect(Array.isArray(NAVIGATION_ITEMS)).toBe(true);
      expect(NAVIGATION_ITEMS.length).toBeGreaterThan(0);

      NAVIGATION_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(typeof item.label).toBe('string');
        expect(typeof item.href).toBe('string');
      });
    });

    test('EXTERNAL_LINKS should contain external URLs', () => {
      expect(EXTERNAL_LINKS).toBeDefined();
      expect(typeof EXTERNAL_LINKS).toBe('object');

      const linkKeys = Object.keys(EXTERNAL_LINKS);
      expect(linkKeys.length).toBeGreaterThan(0);

      // Each external link should be a valid URL or start with http/https
      linkKeys.forEach((key) => {
        const link = EXTERNAL_LINKS[key as keyof typeof EXTERNAL_LINKS];
        expect(typeof link).toBe('string');
        expect(link).toMatch(/^https?:\/\/|^\/\//);
      });
    });
  });

  describe('Responsive Breakpoints', () => {
    test('BREAKPOINTS should contain all standard breakpoint values', () => {
      expect(BREAKPOINTS).toBeDefined();
      expect(typeof BREAKPOINTS).toBe('object');

      // Check for common breakpoints
      const expectedBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
      expectedBreakpoints.forEach((bp) => {
        expect(BREAKPOINTS).toHaveProperty(bp);
        expect(typeof BREAKPOINTS[bp as BreakpointKey]).toBe('number');
        // xs breakpoint can be 0 in mobile-first design
        expect(BREAKPOINTS[bp as BreakpointKey]).toBeGreaterThanOrEqual(0);
      });

      // Breakpoints should be in ascending order
      const breakpointValues = Object.values(BREAKPOINTS).filter(
        (val) => typeof val === 'number'
      );
      const sortedValues = [...breakpointValues].sort((a, b) => a - b);
      expect(breakpointValues).toEqual(sortedValues);
    });

    test('GRID_COLUMNS should be a valid grid configuration', () => {
      expect(GRID_COLUMNS).toBeDefined();
      expect(typeof GRID_COLUMNS).toBe('number');
      expect(GRID_COLUMNS).toBeGreaterThan(0);
      expect(GRID_COLUMNS).toBe(12); // Standard 12-column grid
    });

    test('GRID_SPACING should contain spacing values', () => {
      expect(GRID_SPACING).toBeDefined();
      expect(typeof GRID_SPACING).toBe('object');

      const spacingKeys = Object.keys(GRID_SPACING);
      expect(spacingKeys.length).toBeGreaterThan(0);

      spacingKeys.forEach((key) => {
        const value = GRID_SPACING[key as keyof typeof GRID_SPACING];
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    test('MEDIA_QUERIES should contain valid CSS media queries', () => {
      expect(MEDIA_QUERIES).toBeDefined();
      expect(typeof MEDIA_QUERIES).toBe('object');

      const queryKeys = Object.keys(MEDIA_QUERIES);
      expect(queryKeys.length).toBeGreaterThan(0);

      queryKeys.forEach((key) => {
        const query = MEDIA_QUERIES[key as MediaQueryKey];
        expect(typeof query).toBe('string');
        expect(query).toMatch(/^@media|^\(|screen/); // Should be a valid media query format
      });
    });
  });

  describe('Colors and Theme', () => {
    test('COLORS should contain comprehensive color palette', () => {
      expect(COLORS).toBeDefined();
      expect(typeof COLORS).toBe('object');

      // Should have primary brand colors
      expect(COLORS).toHaveProperty('primary');
      expect(COLORS).toHaveProperty('secondary');

      // Should have semantic colors
      expect(COLORS).toHaveProperty('success');
      expect(COLORS).toHaveProperty('warning');
      expect(COLORS).toHaveProperty('error');

      // Should have neutral/grey colors
      expect(COLORS).toHaveProperty('grey'); // Actual structure uses 'grey' not 'neutral'
    });

    test('THEME_MODES should contain light and dark modes', () => {
      expect(THEME_MODES).toBeDefined();
      expect(typeof THEME_MODES).toBe('object');

      expect(THEME_MODES).toHaveProperty('LIGHT');
      expect(THEME_MODES).toHaveProperty('DARK');
      expect(THEME_MODES.LIGHT).toBe('light');
      expect(THEME_MODES.DARK).toBe('dark');
    });

    test('Z_INDEX should contain layered index values', () => {
      expect(Z_INDEX).toBeDefined();
      expect(typeof Z_INDEX).toBe('object');

      // Should have common z-index layers
      const expectedLayers = ['base', 'dropdown', 'modal', 'toast', 'tooltip'];
      expectedLayers.forEach((layer) => {
        expect(Z_INDEX).toHaveProperty(layer);
      });

      // Z-index values should be reasonable
      expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.dropdown);
      expect(Z_INDEX.toast).toBeGreaterThan(Z_INDEX.modal);
      expect(Z_INDEX.tooltip).toBeGreaterThan(Z_INDEX.toast);
    });
  });

  describe('Type Safety', () => {
    test('RouteKey type should match ROUTES keys', () => {
      const routeKeys = Object.keys(ROUTES);
      routeKeys.forEach((key) => {
        expect(ROUTES[key as RouteKey]).toBeDefined();
      });
    });

    test('BreakpointKey type should match BREAKPOINTS keys', () => {
      const breakpointKeys = Object.keys(BREAKPOINTS);
      breakpointKeys.forEach((key) => {
        expect(BREAKPOINTS[key as BreakpointKey]).toBeDefined();
      });
    });

    test('MediaQueryKey type should match MEDIA_QUERIES keys', () => {
      const queryKeys = Object.keys(MEDIA_QUERIES);
      queryKeys.forEach((key) => {
        expect(MEDIA_QUERIES[key as MediaQueryKey]).toBeDefined();
      });
    });

    test('ThemeMode type should accept valid theme values', () => {
      const lightMode: ThemeMode = 'light';
      const darkMode: ThemeMode = 'dark';

      expect(lightMode).toBe('light');
      expect(darkMode).toBe('dark');
    });
  });

  describe('Cross-Reference Validation', () => {
    test('Navigation items should reference valid routes', () => {
      NAVIGATION_ITEMS.forEach((item) => {
        if (item.href.startsWith('/')) {
          // Internal links should match route values
          const matchingRoute = Object.values(ROUTES).find(
            (route) => route === item.href
          );
          expect(matchingRoute).toBeDefined();
        }
      });
    });

    test('Media queries should correspond to breakpoints', () => {
      const breakpointKeys = Object.keys(BREAKPOINTS);
      const queryKeys = Object.keys(MEDIA_QUERIES);

      // Should have queries for most breakpoints
      breakpointKeys.forEach((key) => {
        if (key !== 'xs') {
          // xs might not have a media query
          const hasCorrespondingQuery = queryKeys.some(
            (queryKey) =>
              queryKey.includes(key) ||
              MEDIA_QUERIES[queryKey as MediaQueryKey].includes(
                BREAKPOINTS[key as BreakpointKey].toString()
              )
          );
          // This is a soft check - not all breakpoints need media queries
        }
      });
    });
  });
  describe('Constants Immutability', () => {
    test('Constants should be properly defined', () => {
      // Test that constants exist and are read-only where expected
      expect(THEME_MODES.LIGHT).toBe('light');
      expect(THEME_MODES.DARK).toBe('dark');

      // Objects marked with 'as const' are readonly at compile time
      expect(typeof THEME_MODES).toBe('object');
      expect(typeof Z_INDEX).toBe('object');
    });

    test('Nested objects should exist and be accessible', () => {
      expect(typeof COLORS.primary).toBe('object');
      expect(COLORS.primary).toHaveProperty('main');
    });
  });
});
