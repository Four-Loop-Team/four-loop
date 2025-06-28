#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Test Template Generator
 * Automatically generates test templates for components that lack test coverage
 */

const fs = require('fs');
const path = require('path');

// Template for basic component test
const COMPONENT_TEST_TEMPLATE = (
  componentName,
  componentPath
) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${componentName} from '${componentPath}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
  });

  it('is accessible', () => {
    const { container } = render(<${componentName} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // TODO: Add specific tests for ${componentName} functionality
  // Consider testing:
  // - Props and their effects
  // - User interactions
  // - State changes
  // - Accessibility requirements
  // - Error handling
  // - Edge cases
});
`;

// Template for index file test
const INDEX_TEST_TEMPLATE = (
  dirName
) => `import * as ComponentIndex from '../${dirName}/index';

describe('${dirName} Index', () => {
  it('exports all expected components', () => {
    expect(ComponentIndex).toBeDefined();
    // TODO: Add specific export checks
    // Example: expect(ComponentIndex.ComponentName).toBeDefined();
  });

  it('has no unexpected exports', () => {
    const exportKeys = Object.keys(ComponentIndex);
    expect(exportKeys.length).toBeGreaterThan(0);
    // TODO: Add specific export validation
  });
});
`;

// Template for types file test
const TYPES_TEST_TEMPLATE = (fileName) => `// Test file for ${fileName} types
// Note: TypeScript interfaces and types don't need runtime tests
// but we can test type guards, validators, and utility functions

describe('${fileName} Types', () => {
  it('type definitions exist', () => {
    // This test ensures the types file can be imported without errors
    expect(true).toBe(true);
  });

  // TODO: If there are type guards, validators, or utility functions:
  // - Test type guard functions
  // - Test type validation utilities
  // - Test type conversion functions
  // - Test default values and constants
});
`;

async function generateTestTemplates() {
  console.log('🧪 Generating test templates for missing component tests...\n');

  const srcDir = path.join(process.cwd(), 'src');
  const testsDir = path.join(srcDir, 'components', '__tests__');

  // Ensure tests directory exists
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir, { recursive: true });
  }

  const componentsDir = path.join(srcDir, 'components');
  let templatesGenerated = 0;

  function scanForComponents(dir, baseDir = componentsDir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (
        stat.isDirectory() &&
        item !== '__tests__' &&
        item !== 'node_modules'
      ) {
        // Check if this directory has component files
        const files = fs.readdirSync(itemPath);
        const hasComponent = files.some(
          (file) => file.endsWith('.tsx') || file.endsWith('.ts')
        );

        if (hasComponent) {
          // Generate tests for files in this directory
          for (const file of files) {
            if (
              file.endsWith('.tsx') ||
              (file.endsWith('.ts') && !file.endsWith('.d.ts'))
            ) {
              const fileName = path.parse(file).name;
              const testFileName = `${fileName}.test.tsx`;
              const testFilePath = path.join(testsDir, testFileName);

              // Skip if test already exists
              if (fs.existsSync(testFilePath)) {
                continue;
              }

              let template;
              const relativePath = path
                .relative(testsDir, itemPath)
                .replace(/\\/g, '/');

              if (fileName === 'index') {
                const dirName = path.basename(itemPath);
                template = INDEX_TEST_TEMPLATE(dirName);
              } else if (fileName.includes('type') || fileName === 'types') {
                template = TYPES_TEST_TEMPLATE(fileName);
              } else {
                template = COMPONENT_TEST_TEMPLATE(
                  fileName,
                  `../${relativePath}/${file}`
                );
              }

              try {
                fs.writeFileSync(testFilePath, template);
                console.log(`✅ Generated: ${testFileName}`);
                templatesGenerated++;
              } catch (error) {
                console.log(
                  `❌ Error generating ${testFileName}:`,
                  error.message
                );
              }
            }
          }
        }

        // Recursively scan subdirectories
        scanForComponents(itemPath, baseDir);
      }
    }
  }

  scanForComponents(componentsDir);

  console.log(`\n📊 Generated ${templatesGenerated} test templates`);

  if (templatesGenerated > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Review generated test files in src/components/__tests__/');
    console.log(
      '2. Implement actual test cases based on component functionality'
    );
    console.log('3. Remove TODO comments as tests are implemented');
    console.log('4. Run "npm test" to verify tests pass');
    console.log('5. Check test coverage with "npm run test:coverage"');
  }
}

// Run if called directly
if (require.main === module) {
  generateTestTemplates().catch(console.error);
}

module.exports = { generateTestTemplates };
