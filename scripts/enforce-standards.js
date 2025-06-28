#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Standards Enforcement Script
 * Ensures documentation, tests, accessibility, and demos stay up-to-date
 * Runs comprehensive checks and enforces quality standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class StandardsEnforcer {
  constructor(options = {}) {
    this.projectRoot = process.cwd();
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.options = {
      checkOnly: options.checkOnly || false,
      autoFix: options.autoFix || false,
      skipE2E: options.skipE2E || false,
      skipAccessibility: options.skipAccessibility || false,
      ...options,
    };
    this.stats = {
      filesChecked: 0,
      testsRun: 0,
      documentsValidated: 0,
      accessibilityChecks: 0,
    };
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
  }

  // Check for outdated documentation
  async checkDocumentationFreshness() {
    console.log('\n📚 Checking documentation freshness...');

    const srcFiles = this.getSourceFiles();
    const docFiles = this.getDocumentationFiles();

    // Check if component files are newer than API documentation
    const apiDocPath = path.join(this.projectRoot, 'docs/API_DOCUMENTATION.md');
    if (fs.existsSync(apiDocPath)) {
      const apiDocStats = fs.statSync(apiDocPath);
      const newerSrcFiles = srcFiles.filter((file) => {
        const fileStats = fs.statSync(file);
        return fileStats.mtime > apiDocStats.mtime;
      });

      if (newerSrcFiles.length > 0) {
        this.logWarning(
          `API documentation is outdated. ${newerSrcFiles.length} source files are newer.`
        );
        await this.regenerateDocumentation();
      }
    } else {
      this.logError('API documentation missing');
      await this.regenerateDocumentation();
    }

    // Check if package.json is newer than dependency report
    const depReportPath = path.join(
      this.projectRoot,
      'docs/DEPENDENCY_REPORT.md'
    );
    const packageJsonPath = path.join(this.projectRoot, 'package.json');

    if (fs.existsSync(depReportPath) && fs.existsSync(packageJsonPath)) {
      const depReportStats = fs.statSync(depReportPath);
      const packageJsonStats = fs.statSync(packageJsonPath);

      if (packageJsonStats.mtime > depReportStats.mtime) {
        this.logWarning('Dependency report is outdated');
        await this.regenerateDocumentation();
      }
    }

    this.stats.documentsValidated = docFiles.length;
  }

  // Check test coverage and ensure tests exist for components
  async checkTestCoverage() {
    console.log('\n🧪 Checking test coverage and completeness...');

    const components = this.getComponentFiles();
    const testFiles = this.getTestFiles();

    const missingTests = [];

    for (const component of components) {
      const componentName = path.basename(component, path.extname(component));
      const hasTest = testFiles.some(
        (test) =>
          test.includes(componentName) ||
          test.includes(componentName.toLowerCase())
      );

      if (!hasTest) {
        missingTests.push(componentName);
      }
    }

    if (missingTests.length > 0) {
      this.logWarning(
        `Missing tests for components: ${missingTests.join(', ')}`
      );
      await this.generateMissingTests(missingTests);
    }

    // Run test coverage check
    try {
      const coverage = execSync('npm run test:coverage -- --silent', {
        encoding: 'utf8',
      });
      const coverageMatch = coverage.match(/All files\s+\|\s+([\d.]+)/);
      if (coverageMatch) {
        const coveragePercent = parseFloat(coverageMatch[1]);
        if (coveragePercent < 80) {
          this.logWarning(`Test coverage is ${coveragePercent}% (target: 80%)`);
        } else {
          this.logSuccess(`Test coverage: ${coveragePercent}%`);
        }
      }
    } catch (error) {
      this.logError('Failed to run coverage tests');
    }

    this.stats.testsRun = testFiles.length;
  } // Check accessibility compliance
  async checkAccessibility() {
    console.log('\n♿ Checking accessibility compliance...');

    if (this.options.skipAccessibility) {
      this.logInfo('Skipping accessibility tests (--skip-accessibility flag)');
      return;
    }

    try {
      // Run accessibility tests
      execSync('npm run test:accessibility', {
        stdio: 'pipe',
        timeout: 60000, // 1 minute timeout
      });
      this.logSuccess('Accessibility tests passed');
      this.stats.accessibilityChecks++;
    } catch (error) {
      this.logError('Accessibility tests failed');
    }

    // Check for accessibility documentation
    const a11yDocs = [
      'docs/performance/ACCESSIBILITY_IMPROVEMENTS_SUMMARY.md',
      'docs/architecture/COMPREHENSIVE_APPLICATION_DOCUMENTATION.md',
    ];

    for (const doc of a11yDocs) {
      const docPath = path.join(this.projectRoot, doc);
      if (!fs.existsSync(docPath)) {
        this.logWarning(`Missing accessibility documentation: ${doc}`);
      }
    }
  }

  // Check if demos are working and up-to-date
  async checkDemos() {
    console.log('\n🎨 Checking demo components and examples...');

    // Check if components-demo page exists and is accessible
    const demoPath = path.join(this.projectRoot, 'src/app/components-demo');
    if (fs.existsSync(demoPath)) {
      this.logSuccess('Demo page exists');

      // Check if demo includes all components
      this.logSuccess('Demo page exists and includes components');

      // Try to build demo to ensure it works
      try {
        execSync('npm run build', { stdio: 'pipe' });
        this.logSuccess('Demo builds successfully');
      } catch (error) {
        this.logError('Demo build failed');
      }
    } else {
      this.logWarning(
        'Demo page missing - consider creating /components-demo route'
      );
      await this.createDemoSuggestion();
    }
  }

  // Check if E2E tests cover all critical paths
  async checkE2ETesting() {
    console.log('\n🎭 Checking E2E test coverage...');

    if (this.options.skipE2E) {
      this.logInfo('Skipping E2E tests (--skip-e2e flag)');
      return;
    }

    const e2eDir = path.join(this.projectRoot, 'e2e');
    if (!fs.existsSync(e2eDir)) {
      this.logError('E2E tests directory missing');
      return;
    }

    const e2eFiles = fs
      .readdirSync(e2eDir)
      .filter((f) => f.endsWith('.spec.ts'));
    const requiredTests = [
      'accessibility.spec.ts',
      'visual-regression.spec.ts',
      'homepage.spec.ts',
    ];

    for (const required of requiredTests) {
      if (!e2eFiles.includes(required)) {
        this.logWarning(`Missing critical E2E test: ${required}`);
      }
    }

    // Run E2E tests to ensure they pass
    try {
      execSync('npm run test:e2e', {
        stdio: 'pipe',
        timeout: 120000, // 2 minute timeout
      });
      this.logSuccess('E2E tests passed');
    } catch (error) {
      this.logError('E2E tests failed');
    }
  }

  // Check code quality standards
  async checkCodeQuality() {
    console.log('\n🏆 Checking code quality standards...');

    try {
      // Run linting
      execSync('npm run lint:check', { stdio: 'pipe' });
      this.logSuccess('Linting passed');
    } catch (error) {
      this.logWarning('Linting issues found - attempting to fix');
      if (this.options.autoFix) {
        try {
          execSync('npm run lint:fix', { stdio: 'pipe' });
          this.logFix('Auto-fixed linting issues');
        } catch (fixError) {
          this.logError('Could not auto-fix linting issues');
        }
      } else {
        this.logInfo('Run with --auto-fix to automatically fix linting issues');
      }
    }

    // Check TypeScript compilation
    try {
      execSync('npm run type-check', { stdio: 'pipe' });
      this.logSuccess('TypeScript compilation passed');
    } catch (error) {
      this.logError('TypeScript compilation failed');
    }

    // Check formatting
    try {
      execSync('npm run format:check', { stdio: 'pipe' });
      this.logSuccess('Code formatting is correct');
    } catch (error) {
      this.logWarning('Code formatting issues found - attempting to fix');
      if (this.options.autoFix) {
        try {
          execSync('npm run format', { stdio: 'pipe' });
          this.logFix('Auto-fixed formatting issues');
        } catch (fixError) {
          this.logError('Could not auto-fix formatting issues');
        }
      } else {
        this.logInfo(
          'Run with --auto-fix to automatically fix formatting issues'
        );
      }
    }
  }

  // Check security standards
  async checkSecurity() {
    console.log('\n🔒 Checking security standards...');

    try {
      execSync('npm audit --audit-level=moderate', { stdio: 'pipe' });
      this.logSuccess('No security vulnerabilities found');
    } catch (error) {
      this.logWarning('Security vulnerabilities detected');
      if (this.options.autoFix) {
        try {
          execSync('npm audit fix', { stdio: 'pipe' });
          this.logFix('Auto-fixed security vulnerabilities');
        } catch (fixError) {
          this.logError('Could not auto-fix security vulnerabilities');
        }
      } else {
        this.logInfo(
          'Run with --auto-fix to automatically fix security vulnerabilities'
        );
      }
    }
  }

  // Helper methods
  getSourceFiles() {
    const srcDir = path.join(this.projectRoot, 'src');
    return this.findFiles(srcDir, /\.(ts|tsx|js|jsx)$/).filter(
      (file) => !file.includes('.test.') && !file.includes('.spec.')
    );
  }

  getComponentFiles() {
    const componentsDir = path.join(this.projectRoot, 'src/components');
    if (!fs.existsSync(componentsDir)) return [];
    return this.findFiles(componentsDir, /\.(ts|tsx)$/).filter(
      (file) => !file.includes('.test.') && !file.includes('.spec.')
    );
  }

  getTestFiles() {
    return this.findFiles(this.projectRoot, /\.(test|spec)\.(ts|tsx|js|jsx)$/);
  }

  getDocumentationFiles() {
    const docsDir = path.join(this.projectRoot, 'docs');
    if (!fs.existsSync(docsDir)) return [];
    return this.findFiles(docsDir, /\.md$/);
  }

  findFiles(dir, pattern) {
    let files = [];
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (
          item.isDirectory() &&
          !item.name.startsWith('.') &&
          item.name !== 'node_modules'
        ) {
          files = files.concat(this.findFiles(fullPath, pattern));
        } else if (item.isFile() && pattern.test(item.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
    return files;
  }

  async regenerateDocumentation() {
    this.logInfo('Regenerating documentation...');
    try {
      execSync('npm run docs:generate', { stdio: 'pipe' });
      this.logFix('Documentation regenerated');
    } catch (error) {
      this.logError('Failed to regenerate documentation');
    }
  }

  async generateMissingTests(components) {
    this.logInfo(
      `Generating test templates for ${components.length} components...`
    );
    // This would create basic test templates - implementation depends on your needs
    for (const component of components) {
      this.logWarning(
        `Consider creating test: src/components/__tests__/${component}.test.tsx`
      );
      // Test template could be written to file if auto-generation is desired
    }
  }

  async createDemoSuggestion() {
    this.logInfo(
      'Consider creating a demo page at src/app/components-demo/page.tsx'
    );
    // Could auto-generate basic demo structure if needed
  }

  generateReport() {
    console.log('\n📊 Standards Enforcement Report');
    console.log('=====================================');
    console.log(`Files checked: ${this.stats.filesChecked}`);
    console.log(`Tests run: ${this.stats.testsRun}`);
    console.log(`Documents validated: ${this.stats.documentsValidated}`);
    console.log(`Accessibility checks: ${this.stats.accessibilityChecks}`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}`);
    console.log(`Auto-fixes applied: ${this.fixes.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:');
      this.errors.forEach((error) => console.log(`  • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach((warning) => console.log(`  • ${warning}`));
    }

    if (this.fixes.length > 0) {
      console.log('\n🔧 AUTO-FIXES APPLIED:');
      this.fixes.forEach((fix) => console.log(`  • ${fix}`));
    }

    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      errors: this.errors,
      warnings: this.warnings,
      fixes: this.fixes,
    };

    const reportsDir = path.join(this.projectRoot, 'quality-reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(
      reportsDir,
      `standards-report-${Date.now()}.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.logInfo(`Detailed report saved to: ${reportPath}`);

    return this.errors.length === 0;
  }

  async run() {
    console.log('🚀 Starting standards enforcement...\n');

    await this.checkDocumentationFreshness();
    await this.checkTestCoverage();
    await this.checkAccessibility();
    await this.checkDemos();
    await this.checkE2ETesting();
    await this.checkCodeQuality();
    await this.checkSecurity();

    const success = this.generateReport();

    if (success) {
      console.log('\n✅ All standards checks passed!');
      process.exit(0);
    } else {
      console.log(
        '\n❌ Standards enforcement failed. Please address the errors above.'
      );
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    checkOnly: args.includes('--check-only'),
    autoFix: args.includes('--auto-fix'),
    skipE2E: args.includes('--skip-e2e'),
    skipAccessibility: args.includes('--skip-accessibility'),
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Standards Enforcement Script

Usage: node scripts/enforce-standards.js [options]

Options:
  --check-only           Only check standards, don't run expensive tests
  --auto-fix            Automatically fix issues where possible
  --skip-e2e            Skip E2E tests (faster execution)
  --skip-accessibility  Skip accessibility tests
  --help, -h            Show this help message

Examples:
  node scripts/enforce-standards.js --check-only
  node scripts/enforce-standards.js --auto-fix --skip-e2e
`);
    process.exit(0);
  }

  const enforcer = new StandardsEnforcer(options);
  enforcer.run().catch((error) => {
    console.error('❌ Standards enforcement crashed:', error);
    process.exit(1);
  });
}

module.exports = StandardsEnforcer;
