#!/usr/bin/env tsx

/**
 * Comprehensive Build Script
 *
 * This script handles the complete build process including:
 * 1. Pre-build setup (SCSS variables generation, linting, type checking)
 * 2. Main build process (Next.js build)
 * 3. Post-build validation and optimization
 *
 * Usage: tsx scripts/build.ts [--dev|--prod|--ci]
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface BuildOptions {
  mode: 'dev' | 'prod' | 'ci';
  skipTests: boolean;
  skipLinting: boolean;
  verbose: boolean;
}

// ANSI color codes for console output
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
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step: string): void {
  log(`\n🚀 ${step}`, colors.bright + colors.blue);
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

/**
 * Execute a command and return a promise
 */
function execCommand(
  command: string,
  args: string[] = [],
  cwd = process.cwd()
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Command failed with exit code ${code}: ${command} ${args.join(' ')}`
          )
        );
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Generate SCSS variables and CSS custom properties
 */
async function generateScssVariables(): Promise<void> {
  logStep('Generating SCSS Variables and CSS Custom Properties');

  try {
    // Import and run the generation function directly
    const { main: generateTokens } = await import(
      './generate-scss-variables.js'
    );
    await generateTokens();
    logSuccess('SCSS variables and CSS custom properties generated');
  } catch (error) {
    // Fallback to running the script as a separate process
    try {
      await execCommand('tsx', ['scripts/generate-scss-variables.ts']);
      logSuccess('SCSS variables and CSS custom properties generated');
    } catch (fallbackError) {
      logError(
        `Failed to generate SCSS variables: ${(error as Error).message}`
      );
      throw error;
    }
  }
}

/**
 * Run linting checks
 */
async function runLinting(options: BuildOptions): Promise<void> {
  if (options.skipLinting) {
    logWarning('Skipping linting checks');
    return;
  }

  logStep('Running Linting Checks');

  try {
    // JavaScript/TypeScript linting
    log('📋 Running ESLint...');
    await execCommand('npm', ['run', 'lint:js']);

    // CSS/SCSS linting
    log('🎨 Running Stylelint...');
    await execCommand('npm', ['run', 'lint:styles']);

    logSuccess('All linting checks passed');
  } catch (error) {
    if (options.mode === 'prod' || options.mode === 'ci') {
      logError('Linting failed in production/CI mode');
      throw error;
    } else {
      logWarning('Linting failed but continuing in development mode');
    }
  }
}

/**
 * Run TypeScript type checking
 */
async function runTypeChecking(): Promise<void> {
  logStep('Running TypeScript Type Checking');

  try {
    await execCommand('npm', ['run', 'type-check']);
    logSuccess('TypeScript type checking passed');
  } catch (error) {
    logError('TypeScript type checking failed');
    throw error;
  }
}

/**
 * Run tests
 */
async function runTests(options: BuildOptions): Promise<void> {
  if (options.skipTests) {
    logWarning('Skipping tests');
    return;
  }

  logStep('Running Tests');

  try {
    if (options.mode === 'ci') {
      // In CI mode, run tests with coverage
      await execCommand('npm', ['run', 'test:coverage']);
    } else {
      // In other modes, run standard tests
      await execCommand('npm', ['test']);
    }
    logSuccess('All tests passed');
  } catch (error) {
    logError('Tests failed');
    if (options.mode === 'prod' || options.mode === 'ci') {
      throw error;
    } else {
      logWarning('Tests failed but continuing in development mode');
    }
  }
}

/**
 * Run the Next.js build
 */
async function runNextBuild(options: BuildOptions): Promise<void> {
  logStep('Running Next.js Build');

  try {
    if (options.mode === 'dev') {
      log('🔧 Running development build...');
      await execCommand('next', ['build']);
    } else {
      log('🏗️  Running production build...');
      await execCommand('next', ['build']);
    }
    logSuccess('Next.js build completed');
  } catch (error) {
    logError('Next.js build failed');
    throw error;
  }
}

/**
 * Run post-build validation
 */
async function runPostBuildValidation(options: BuildOptions): Promise<void> {
  if (options.mode === 'dev') {
    logWarning('Skipping post-build validation in development mode');
    return;
  }

  logStep('Running Post-Build Validation');

  try {
    // Check that build files exist
    const buildDir = join(__dirname, '../.next');
    const buildStat = await fs.stat(buildDir);

    if (!buildStat.isDirectory()) {
      throw new Error('Build directory not found');
    }

    logSuccess('Build validation completed');
  } catch (error) {
    logError(`Build validation failed: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): BuildOptions {
  const args = process.argv.slice(2);

  let mode: 'dev' | 'prod' | 'ci' = 'prod';
  let skipTests = false;
  let skipLinting = false;
  let verbose = false;

  for (const arg of args) {
    switch (arg) {
      case '--dev':
        mode = 'dev';
        break;
      case '--prod':
        mode = 'prod';
        break;
      case '--ci':
        mode = 'ci';
        break;
      case '--skip-tests':
        skipTests = true;
        break;
      case '--skip-linting':
        skipLinting = true;
        break;
      case '--verbose':
        verbose = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Usage: tsx scripts/build.ts [options]

Options:
  --dev            Run development build (less strict)
  --prod           Run production build (default)
  --ci             Run CI build (most strict)
  --skip-tests     Skip running tests
  --skip-linting   Skip linting checks
  --verbose        Enable verbose output
  --help, -h       Show this help message
        `);
        process.exit(0);
        break;
      default:
        logWarning(`Unknown argument: ${arg}`);
        break;
    }
  }

  return { mode, skipTests, skipLinting, verbose };
}

/**
 * Main build function
 */
async function main(): Promise<void> {
  const startTime = Date.now();
  const options = parseArgs();

  try {
    log(
      `\n🎯 Starting ${options.mode.toUpperCase()} build process...`,
      colors.bright + colors.magenta
    );

    // Pre-build steps
    await generateScssVariables();
    await runLinting(options);
    await runTypeChecking();

    // Optional: Run tests before build
    if (options.mode === 'ci' || options.mode === 'prod') {
      await runTests(options);
    }

    // Main build
    await runNextBuild(options);

    // Post-build validation
    await runPostBuildValidation(options);

    const duration = Math.round((Date.now() - startTime) / 1000);
    log(
      `\n🎉 Build completed successfully in ${duration}s!`,
      colors.bright + colors.green
    );
  } catch (error) {
    const duration = Math.round((Date.now() - startTime) / 1000);
    logError(`Build failed after ${duration}s: ${(error as Error).message}`);

    if (options.verbose) {
      console.error('Full error:', error);
    }

    process.exit(1);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { main };
