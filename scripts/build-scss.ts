#!/usr/bin/env tsx

/**
 * SCSS Variables Build Script
 *
 * Specialized script for generating SCSS variables with additional features:
 * - Watch mode for development
 * - Validation of generated files
 * - Integration with build pipeline
 * - Custom output paths
 *
 * Usage: tsx scripts/build-scss.ts [--watch|--validate|--output-dir <path>]
 */

import { promises as fs, watch } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ScssBuilderOptions {
  watch: boolean;
  validate: boolean;
  outputDir?: string | undefined;
  verbose: boolean;
}

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color = colors.cyan): void {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

function logSuccess(message: string): void {
  log(`✅ ${message}`, colors.green);
}

function logError(message: string): void {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message: string): void {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message: string): void {
  log(`ℹ️  ${message}`, colors.blue);
}

/**
 * Generate SCSS variables and CSS custom properties
 */
async function generateScssVariables(
  options: ScssBuilderOptions
): Promise<void> {
  try {
    log('🎨 Generating SCSS variables and CSS custom properties...');

    // Import the generation functions
    const { generateDesignTokenCSS, generateSCSSVariables } = await import(
      '../src/constants/design-tokens-consolidated.js'
    );

    // Determine output paths
    const scssOutputPath = options.outputDir
      ? join(options.outputDir, '_generated-variables.scss')
      : join(__dirname, '../src/app/ui/styles/_generated-variables.scss');

    const cssOutputPath = options.outputDir
      ? join(options.outputDir, 'generated-design-system.css')
      : join(__dirname, '../src/styles/generated-design-system.css');

    // Ensure output directories exist
    await fs.mkdir(dirname(scssOutputPath), { recursive: true });
    await fs.mkdir(dirname(cssOutputPath), { recursive: true });

    // Generate SCSS variables
    const scssContent = generateSCSSVariables();
    await fs.writeFile(scssOutputPath, scssContent, 'utf8');

    // Generate CSS custom properties
    const cssContent = generateDesignTokenCSS();
    await fs.writeFile(cssOutputPath, cssContent, 'utf8');

    if (options.verbose) {
      logInfo(`SCSS variables written to: ${scssOutputPath}`);
      logInfo(`CSS custom properties written to: ${cssOutputPath}`);
    }

    logSuccess('SCSS variables and CSS custom properties generated');

    // Validate if requested
    if (options.validate) {
      await validateGeneratedFiles(scssOutputPath, cssOutputPath, options);
    }
  } catch (error) {
    logError(`Failed to generate SCSS variables: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Validate generated SCSS and CSS files
 */
async function validateGeneratedFiles(
  scssPath: string,
  cssPath: string,
  options: ScssBuilderOptions
): Promise<void> {
  try {
    log('🔍 Validating generated files...');

    // Check if files exist
    const scssExists = await fs
      .access(scssPath)
      .then(() => true)
      .catch(() => false);
    const cssExists = await fs
      .access(cssPath)
      .then(() => true)
      .catch(() => false);

    if (!scssExists) {
      throw new Error(`SCSS file not found: ${scssPath}`);
    }
    if (!cssExists) {
      throw new Error(`CSS file not found: ${cssPath}`);
    }

    // Check file sizes (they should not be empty)
    const scssStats = await fs.stat(scssPath);
    const cssStats = await fs.stat(cssPath);

    if (scssStats.size === 0) {
      throw new Error('Generated SCSS file is empty');
    }
    if (cssStats.size === 0) {
      throw new Error('Generated CSS file is empty');
    }

    // Read and validate content structure
    const scssContent = await fs.readFile(scssPath, 'utf8');
    const cssContent = await fs.readFile(cssPath, 'utf8');

    // Basic validation checks
    if (!scssContent.includes('$')) {
      logWarning('SCSS file may not contain valid SCSS variables');
    }
    if (!cssContent.includes('--')) {
      logWarning('CSS file may not contain valid CSS custom properties');
    }
    if (!cssContent.includes(':root')) {
      logWarning('CSS file may not contain :root selector');
    }

    if (options.verbose) {
      logInfo(`SCSS file size: ${(scssStats.size / 1024).toFixed(2)}KB`);
      logInfo(`CSS file size: ${(cssStats.size / 1024).toFixed(2)}KB`);
    }

    // Try to lint the CSS file if stylelint is available
    try {
      const { spawn } = await import('child_process');
      const lintProcess = spawn(
        'npx',
        ['stylelint', cssPath, '--formatter', 'compact'],
        {
          stdio: 'pipe',
        }
      );

      let lintOutput = '';
      lintProcess.stdout?.on('data', (data) => {
        lintOutput += data.toString();
      });

      await new Promise<void>((resolve) => {
        lintProcess.on('close', (code) => {
          if (code === 0) {
            logSuccess('CSS file passes linting');
          } else if (lintOutput.includes('ignored')) {
            logInfo(
              'CSS file is ignored by stylelint (expected for generated files)'
            );
          } else {
            logWarning('CSS file has linting issues');
            if (options.verbose) {
              console.log(lintOutput);
            }
          }
          resolve();
        });
      });
    } catch (lintError) {
      // Stylelint not available or failed, but that's okay
      if (options.verbose) {
        logInfo('Stylelint validation skipped');
      }
    }

    logSuccess('File validation completed');
  } catch (error) {
    logError(`Validation failed: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Watch for changes and regenerate
 */
async function watchForChanges(options: ScssBuilderOptions): Promise<void> {
  logInfo('👀 Watching for changes to design tokens...');

  const watchPath = join(
    __dirname,
    '../src/constants/design-tokens-consolidated.ts'
  );

  let regenerating = false;

  const watcher = watch(
    watchPath,
    { persistent: true },
    async (eventType, filename) => {
      if (regenerating) return;

      logInfo(`📝 Detected ${eventType} in ${filename || 'design tokens'}`);

      try {
        regenerating = true;
        await generateScssVariables(options);
      } catch (error) {
        logError(`Watch regeneration failed: ${(error as Error).message}`);
      } finally {
        regenerating = false;
      }
    }
  );

  // Initial generation
  await generateScssVariables(options);

  logInfo('Press Ctrl+C to stop watching');

  // Keep the process alive
  process.on('SIGINT', () => {
    logInfo('👋 Stopping file watcher...');
    watcher.close();
    process.exit(0);
  });
}

/**
 * Parse command line arguments
 */
function parseArgs(): ScssBuilderOptions {
  const args = process.argv.slice(2);

  let watch = false;
  let validate = false;
  let outputDir: string | undefined;
  let verbose = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--watch':
      case '-w':
        watch = true;
        break;
      case '--validate':
      case '-v':
        validate = true;
        break;
      case '--output-dir':
      case '-o':
        if (i + 1 < args.length) {
          outputDir = resolve(args[i + 1]);
          i++; // Skip next argument as it's the output directory
        } else {
          logError('--output-dir requires a directory path');
          process.exit(1);
        }
        break;
      case '--verbose':
        verbose = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Usage: tsx scripts/build-scss.ts [options]

Options:
  --watch, -w              Watch for changes and regenerate automatically
  --validate, -v           Validate generated files after creation
  --output-dir, -o <path>  Custom output directory (default: project standard paths)
  --verbose                Enable verbose output
  --help, -h               Show this help message

Examples:
  tsx scripts/build-scss.ts                    # Generate once
  tsx scripts/build-scss.ts --watch            # Watch mode
  tsx scripts/build-scss.ts --validate         # Generate and validate
  tsx scripts/build-scss.ts -o ./dist/styles   # Custom output directory
        `);
        process.exit(0);
        break;
      default:
        if (!arg.startsWith('-')) {
          // Assume it's an output directory if no flag specified
          outputDir = resolve(arg);
        } else {
          logWarning(`Unknown argument: ${arg}`);
        }
        break;
    }
  }

  return { watch, validate, outputDir, verbose };
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const options = parseArgs();

  try {
    if (options.watch) {
      await watchForChanges(options);
    } else {
      await generateScssVariables(options);
    }
  } catch (error) {
    logError(`Build failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { generateScssVariables, main };
