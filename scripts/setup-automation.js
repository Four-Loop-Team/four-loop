#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Standards and Automation Setup Script
 * Ensures all automation systems are properly configured and working
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutomationSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.checks = [];
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
  }

  logError(message) {
    this.errors.push(message);
    console.error(`❌ ERROR: ${message}`);
  }

  logWarning(message) {
    this.warnings.push(message);
    console.warn(`⚠️  WARNING: ${message}`);
  }

  logFix(message) {
    this.fixes.push(message);
    console.log(`🔧 FIXED: ${message}`);
  }

  logInfo(message) {
    console.log(`ℹ️  ${message}`);
  }

  logSuccess(message) {
    console.log(`✅ ${message}`);
    this.checks.push(message);
  }

  // Check if all required scripts exist
  checkRequiredScripts() {
    console.log('\n📝 Checking required scripts...');

    const requiredScripts = [
      'scripts/enforce-standards.js',
      'scripts/generate-docs.js',
      'scripts/validate-docs.js',
      'scripts/check-performance-budget.js',
      'scripts/measure-core-web-vitals.js',
    ];

    for (const script of requiredScripts) {
      const scriptPath = path.join(this.projectRoot, script);
      if (fs.existsSync(scriptPath)) {
        this.logSuccess(`Script exists: ${script}`);
      } else {
        this.logError(`Missing required script: ${script}`);
      }
    }
  }

  // Check if git hooks are properly configured
  checkGitHooks() {
    console.log('\n🪝 Checking git hooks...');

    const huskyDir = path.join(this.projectRoot, '.husky');
    if (!fs.existsSync(huskyDir)) {
      this.logError('Husky not configured - run npm run prepare');
      return;
    }

    const requiredHooks = ['pre-commit', 'pre-push'];
    for (const hook of requiredHooks) {
      const hookPath = path.join(huskyDir, hook);
      if (fs.existsSync(hookPath)) {
        this.logSuccess(`Git hook exists: ${hook}`);
      } else {
        this.logError(`Missing git hook: ${hook}`);
      }
    }
  }

  // Check package.json scripts
  checkPackageScripts() {
    console.log('\n📦 Checking package.json scripts...');

    const packagePath = path.join(this.projectRoot, 'package.json');
    if (!fs.existsSync(packagePath)) {
      this.logError('package.json not found');
      return;
    }

    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const scripts = packageData.scripts || {};

    const requiredScripts = [
      'standards:enforce',
      'standards:check',
      'docs:generate',
      'docs:validate',
      'test:accessibility',
      'test:e2e',
      'performance:check',
      'security:audit',
    ];

    for (const script of requiredScripts) {
      if (scripts[script]) {
        this.logSuccess(`Package script exists: ${script}`);
      } else {
        this.logWarning(`Missing package script: ${script}`);
      }
    }
  }

  // Check CI/CD configuration
  checkCIConfiguration() {
    console.log('\n🔄 Checking CI/CD configuration...');

    const ciFiles = [
      '.github/workflows/ci.yml',
      '.github/workflows/performance-visual.yml',
    ];

    for (const ciFile of ciFiles) {
      const ciPath = path.join(this.projectRoot, ciFile);
      if (fs.existsSync(ciPath)) {
        this.logSuccess(`CI configuration exists: ${ciFile}`);
      } else {
        this.logWarning(`Missing CI configuration: ${ciFile}`);
      }
    }
  }

  // Check documentation structure
  checkDocumentationStructure() {
    console.log('\n📚 Checking documentation structure...');

    const docDirs = [
      'docs',
      'docs/architecture',
      'docs/quality',
      'docs/performance',
      'docs/reports',
    ];

    for (const dir of docDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        this.logSuccess(`Documentation directory exists: ${dir}`);
      } else {
        this.logWarning(`Missing documentation directory: ${dir}`);
        // Auto-create missing directories
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          this.logFix(`Created documentation directory: ${dir}`);
        } catch (error) {
          this.logError(`Could not create directory: ${dir}`);
        }
      }
    }
  }

  // Check testing configuration
  checkTestingConfiguration() {
    console.log('\n🧪 Checking testing configuration...');

    const testConfigs = [
      'jest.config.js',
      'playwright.config.ts',
      'e2e/accessibility.spec.ts',
      'e2e/visual-regression.spec.ts',
    ];

    for (const config of testConfigs) {
      const configPath = path.join(this.projectRoot, config);
      if (fs.existsSync(configPath)) {
        this.logSuccess(`Test configuration exists: ${config}`);
      } else {
        this.logWarning(`Missing test configuration: ${config}`);
      }
    }
  }

  // Test that scripts can run
  testScriptExecution() {
    console.log('\n🚀 Testing script execution...');

    const testableScripts = [
      { script: 'npm run type-check', name: 'TypeScript compilation' },
      { script: 'npm run lint:check', name: 'Linting check' },
      { script: 'npm run docs:generate', name: 'Documentation generation' },
    ];

    for (const { script, name } of testableScripts) {
      try {
        execSync(script, { stdio: 'pipe', timeout: 30000 });
        this.logSuccess(`${name} works correctly`);
      } catch (error) {
        this.logWarning(`${name} failed - may need attention`);
      }
    }
  }

  // Run initial standards check
  runInitialStandardsCheck() {
    console.log('\n🔍 Running initial standards check...');

    try {
      execSync('node scripts/enforce-standards.js --check-only', {
        stdio: 'pipe',
      });
      this.logSuccess('Standards enforcement system is working');
    } catch (error) {
      this.logWarning('Standards enforcement found issues - review output');
      this.logInfo('Run "npm run standards:enforce" for detailed report');
    }
  }

  // Generate summary report
  generateSummaryReport() {
    console.log('\n📊 Setup Summary');
    console.log('==================');
    console.log(`✅ Successful checks: ${this.checks.length}`);
    console.log(`🔧 Auto-fixes applied: ${this.fixes.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ CRITICAL ISSUES:');
      this.errors.forEach((error) => console.log(`  • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  RECOMMENDATIONS:');
      this.warnings.forEach((warning) => console.log(`  • ${warning}`));
    }

    if (this.fixes.length > 0) {
      console.log('\n🔧 AUTO-FIXES APPLIED:');
      this.fixes.forEach((fix) => console.log(`  • ${fix}`));
    }

    // Provide next steps
    console.log('\n🚀 NEXT STEPS:');
    if (this.errors.length > 0) {
      console.log('  1. Address critical issues listed above');
      console.log('  2. Re-run setup: npm run setup:automation');
    } else {
      console.log('  1. Run full standards check: npm run standards:enforce');
      console.log('  2. Review quality reports in quality-reports/');
      console.log('  3. Set up your development workflow');
    }

    console.log('\n📖 DOCUMENTATION:');
    console.log(
      '  • Setup guide: docs/quality/STANDARDS_ENFORCEMENT_SYSTEM.md'
    );
    console.log('  • API docs: docs/API_DOCUMENTATION.md');
    console.log('  • Project overview: docs/README.md');
  }

  async run() {
    console.log('🚀 Setting up automation and standards enforcement...\n');

    this.checkRequiredScripts();
    this.checkGitHooks();
    this.checkPackageScripts();
    this.checkCIConfiguration();
    this.checkDocumentationStructure();
    this.checkTestingConfiguration();
    this.testScriptExecution();
    this.runInitialStandardsCheck();

    this.generateSummaryReport();

    const success = this.errors.length === 0;
    if (success) {
      console.log('\n✅ Automation setup completed successfully!');
      console.log(
        '🎉 Your project is ready for automated quality enforcement.'
      );
      return true;
    } else {
      console.log('\n⚠️  Setup completed with issues that need attention.');
      return false;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const setup = new AutomationSetup();
  setup
    .run()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    });
}

module.exports = AutomationSetup;
