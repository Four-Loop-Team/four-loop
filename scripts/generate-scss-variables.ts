#!/usr/bin/env tsx

/**
 * Generate SCSS Variables from TypeScript Design Tokens
 *
 * This script reads our design tokens and generates:
 * 1. _generated-variables.scss - SCSS variables for build-time styling
 * 2. generated-design-system.css - CSS custom properties for runtime theming
 *
 * Usage: tsx scripts/generate-scss-variables.ts
 */

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  generateDesignTokenCSS,
  generateSCSSVariables,
} from '../src/constants/design-tokens-consolidated';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCSS_OUTPUT_PATH = join(
  __dirname,
  '../src/app/ui/styles/_generated-variables.scss'
);
const CSS_OUTPUT_PATH = join(
  __dirname,
  '../src/styles/generated-design-system.css'
);

async function main(): Promise<void> {
  try {
    console.log('🎨 Generating design tokens...');

    // Generate SCSS variables
    const scssContent = generateSCSSVariables();
    await fs.writeFile(SCSS_OUTPUT_PATH, scssContent, 'utf8');
    console.log(`✅ Generated SCSS variables: ${SCSS_OUTPUT_PATH}`);

    // Generate CSS custom properties
    const cssContent = generateDesignTokenCSS();
    await fs.writeFile(CSS_OUTPUT_PATH, cssContent, 'utf8');
    console.log(`✅ Generated CSS custom properties: ${CSS_OUTPUT_PATH}`);

    console.log('🎉 Design token generation complete!');
  } catch (error) {
    console.error(
      '❌ Error generating design tokens:',
      (error as Error).message
    );
    console.error('Stack:', (error as Error).stack);
    process.exit(1);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { main };
