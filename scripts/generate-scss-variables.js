#!/usr/bin/env node

/**
 * Generate SCSS Variables from TypeScript Design Tokens
 *
 * This script reads our unified design tokens and generates:
 * 1. _generated-variables.scss - SCSS variables for build-time styling
 * 2. generated-design-system.css - CSS custom properties for runtime theming
 *
 * Usage: node scripts/generate-scss-variables.js
 */

const fs = require('fs');
const path = require('path');

// Import our design tokens (using require for Node.js compatibility)
const {
  generateSCSSVariables,
  generateCSSCustomProperties,
} = require('../src/constants/unified-design-tokens.ts');

const SCSS_OUTPUT_PATH = path.join(
  __dirname,
  '../src/styles/_generated-variables.scss'
);
const CSS_OUTPUT_PATH = path.join(
  __dirname,
  '../src/styles/generated-design-system.css'
);

function main() {
  try {
    console.log('🎨 Generating design tokens...');

    // Generate SCSS variables
    const scssContent = generateSCSSVariables();
    fs.writeFileSync(SCSS_OUTPUT_PATH, scssContent, 'utf8');
    console.log(`✅ Generated SCSS variables: ${SCSS_OUTPUT_PATH}`);

    // Generate CSS custom properties
    const cssContent = generateCSSCustomProperties();
    fs.writeFileSync(CSS_OUTPUT_PATH, cssContent, 'utf8');
    console.log(`✅ Generated CSS custom properties: ${CSS_OUTPUT_PATH}`);

    console.log('🎉 Design token generation complete!');
  } catch (error) {
    console.error('❌ Error generating design tokens:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
