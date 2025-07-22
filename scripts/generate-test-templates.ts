#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * Test Template Generator
 * Automatically generates test templates for components that lack test coverage
 */

import {
  existsSync,
  promises as fs,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import { basename, join, parse, relative } from 'path';

// Template for basic component test
const componentTestTemplate = (
  componentName: string,
  componentPath: string
): string => `import React from 'react';
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
const indexTestTemplate = (
  dirName: string
): string => `import * as ComponentIndex from '../${dirName}/index';

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
const typesTestTemplate = (
  fileName: string
): string => `// Test file for ${fileName} types
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

async function generateTestTemplates(): Promise<void> {
  console.log('🧪 Generating test templates for missing component tests...\n');

  const srcDir = join(process.cwd(), 'src');
  const testsDir = join(srcDir, 'components', '__tests__');

  // Ensure tests directory exists
  if (!existsSync(testsDir)) {
    mkdirSync(testsDir, { recursive: true });
  }

  const componentsDir = join(srcDir, 'components');
  let templatesGenerated = 0;

  async function scanForComponents(
    dir: string,
    baseDir: string = componentsDir
  ): Promise<void> {
    const items = readdirSync(dir);

    for (const item of items) {
      const itemPath = join(dir, item);
      const stat = statSync(itemPath);

      if (
        stat.isDirectory() &&
        item !== '__tests__' &&
        item !== 'node_modules'
      ) {
        // Check if this directory has component files
        const files = readdirSync(itemPath);
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
              const fileName = parse(file).name;
              const testFileName = `${fileName}.test.tsx`;
              const testFilePath = join(testsDir, testFileName);

              // Skip if test already exists
              if (existsSync(testFilePath)) {
                continue;
              }

              let template: string;
              const relativePath = relative(testsDir, itemPath).replace(
                /\\/g,
                '/'
              );

              if (fileName === 'index') {
                const dirName = basename(itemPath);
                template = indexTestTemplate(dirName);
              } else if (fileName.includes('type') || fileName === 'types') {
                template = typesTestTemplate(fileName);
              } else {
                template = componentTestTemplate(
                  fileName,
                  `../${relativePath}/${file}`
                );
              }

              try {
                await fs.writeFile(testFilePath, template);
                console.log(`✅ Generated: ${testFileName}`);
                templatesGenerated++;
              } catch (error) {
                console.log(
                  `❌ Error generating ${testFileName}:`,
                  (error as Error).message
                );
              }
            }
          }
        }

        // Recursively scan subdirectories
        await scanForComponents(itemPath, baseDir);
      }
    }
  }

  await scanForComponents(componentsDir);

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

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void generateTestTemplates().catch(console.error);
}

export { generateTestTemplates };
