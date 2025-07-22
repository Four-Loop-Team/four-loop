#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * JSDoc Enhancement Script
 * Helps improve JSDoc documentation quality for React components
 */

import { promises as fs } from 'fs';
import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Enhanced JSDoc template for React components
 */
function generateJSDocTemplate(
  componentName: string,
  propsInterface: string
): string {
  return `/**
 * ${componentName} component provides [brief description of functionality].
 *
 * This component is designed to [main purpose and use case].
 *
 * @component
 * @example
 * \`\`\`tsx
 * // Basic usage
 * <${componentName}>
 *   Content here
 * </${componentName}>
 *
 * // With props
 * <${componentName}
 *   variant="primary"
 *   size="medium"
 * >
 *   Enhanced content
 * </${componentName}>
 * \`\`\`
 *
 * @param {${propsInterface}} props - The component props
 * @returns {JSX.Element} The rendered ${componentName} component
 */`;
}

/**
 * Add JSDoc to a component file
 */
async function enhanceComponentJSDoc(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const componentName = basename(filePath, '.tsx');

    // Check if component already has JSDoc
    if (content.includes('/**') && content.includes('@component')) {
      console.log(`✅ ${componentName}: Already has good JSDoc`);
      return false;
    }

    // Find component export
    const exportMatch =
      content.match(/export\s+(const|function|default\s+function)\s+(\w+)/) ||
      content.match(/export\s+default\s+function\s+(\w+)/);
    if (!exportMatch) {
      console.log(`⚠️  ${componentName}: No component export found`);
      return false;
    }

    const actualComponentName = exportMatch[2] || exportMatch[1];

    // Find props interface
    const propsMatch = content.match(/interface\s+(\w*Props)/);
    const propsInterface = propsMatch ? propsMatch[1] : 'ComponentProps';

    // Generate JSDoc
    const jsdocTemplate = generateJSDocTemplate(
      actualComponentName,
      propsInterface
    );

    // Insert JSDoc before component export
    const exportLine = content.indexOf(exportMatch[0]);
    const lineStart = content.lastIndexOf('\n', exportLine - 1) + 1;

    const newContent =
      content.slice(0, lineStart) +
      jsdocTemplate +
      '\n' +
      content.slice(lineStart);

    // Write enhanced file
    const backupPath = filePath + '.backup';
    await fs.writeFile(backupPath, content); // Backup original
    await fs.writeFile(filePath, newContent);

    console.log(`🔧 ${componentName}: Enhanced with JSDoc template`);
    console.log(`   Backup saved: ${backupPath}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Error enhancing ${filePath}: ${(error as Error).message}`
    );
    return false;
  }
}

/**
 * Show JSDoc best practices guide
 */
function showJSDocGuide(): void {
  console.log(`
📖 JSDoc Best Practices for React Components
===========================================

✅ **Good JSDoc Example:**

/**
 * Button component provides interactive elements for user actions.
 *
 * Supports multiple variants, sizes, and states with consistent styling
 * and accessibility features built-in.
 *
 * @component
 * @example
 * \`\`\`tsx
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 *
 * // Loading state
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * \`\`\`
 *
 * @param {ButtonProps} props - The button configuration
 * @param {string} [props.variant="primary"] - Button style variant
 * @param {string} [props.size="medium"] - Button size
 * @param {boolean} [props.loading=false] - Show loading spinner
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} The rendered button component
 */

🔍 **Key Elements:**
1. **Clear description** - What the component does
2. **@component tag** - Marks it as a React component
3. **@example with code** - Real usage examples
4. **@param documentation** - Each prop with type and description
5. **@returns** - What the component returns

📝 **Quick Commands:**
- npm run jsdoc:enhance [file] - Add JSDoc template to component
- npm run jsdoc:validate     - Check JSDoc quality
- npm run docs:generate      - Update API documentation

`);
}

// CLI handling
const args = process.argv.slice(2);
const command = args[0];

async function main(): Promise<void> {
  if (command === 'help' || !command) {
    showJSDocGuide();
  } else if (command === 'enhance') {
    const targetFile = args[1];
    if (targetFile) {
      await enhanceComponentJSDoc(targetFile);
    } else {
      console.log('Usage: tsx enhance-jsdoc.ts enhance <file-path>');
    }
  } else {
    console.log('Unknown command. Use "help" for guidance.');
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { enhanceComponentJSDoc, showJSDocGuide };
