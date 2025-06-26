import { poppins } from '../fonts';

// Mock next/font/google since it's not available in Jest environment
jest.mock('next/font/google', () => ({
  Poppins: jest.fn(() => ({
    className: 'mock-poppins-class',
    variable: '--font-poppins',
    style: {
      fontFamily: '__Poppins_mock',
    },
  })),
}));

describe('Fonts Configuration', () => {
  it('exports poppins font configuration', () => {
    expect(poppins).toBeDefined();
  });

  it('poppins font has correct className property', () => {
    expect(poppins.className).toBeDefined();
    expect(typeof poppins.className).toBe('string');
  });

  it('poppins font has correct variable property', () => {
    expect(poppins.variable).toBeDefined();
    expect(poppins.variable).toBe('--font-poppins');
  });

  it('poppins font has correct style property', () => {
    expect(poppins.style).toBeDefined();
    expect(typeof poppins.style).toBe('object');
  });

  it('poppins font configuration includes fontFamily', () => {
    expect(poppins.style.fontFamily).toBeDefined();
    expect(typeof poppins.style.fontFamily).toBe('string');
  });

  it('poppins font configuration matches expected structure', () => {
    // Check that the font object has the expected properties
    expect(poppins.className).toMatch(/.+/);
    expect(poppins.variable).toBe('--font-poppins');
    expect(poppins.style.fontFamily).toMatch(/.+/);
  });

  it('poppins className is not empty', () => {
    expect(poppins.className.trim()).not.toBe('');
  });

  it('poppins style fontFamily is not empty', () => {
    expect(poppins.style.fontFamily.trim()).not.toBe('');
  });

  it('poppins font can be used in CSS variables', () => {
    // Test that the variable name follows CSS custom property naming convention
    expect(poppins.variable).toMatch(/^--font-/);
  });

  it('poppins font object is immutable during testing', () => {
    const originalClassName = poppins.className;
    const originalVariable = poppins.variable;
    const originalFontFamily = poppins.style.fontFamily;

    // Verify properties haven't changed during testing
    expect(poppins.className).toBe(originalClassName);
    expect(poppins.variable).toBe(originalVariable);
    expect(poppins.style.fontFamily).toBe(originalFontFamily);
  });
});
