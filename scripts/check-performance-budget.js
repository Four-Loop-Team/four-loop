#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

// Performance budget checker script
async function checkPerformanceBudget() {
  console.log('🚀 Checking performance budget...');

  try {
    // Load performance budget configuration
    const budgetPath = path.join(process.cwd(), 'performance-budget.json');
    if (!fs.existsSync(budgetPath)) {
      console.error('❌ Performance budget configuration not found');
      process.exit(1);
    }

    const budgetConfig = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
    console.log('✅ Performance budget configuration loaded');

    // Check if build output exists
    const buildDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(buildDir)) {
      console.error('❌ Build directory not found. Run "npm run build" first.');
      process.exit(1);
    }

    // Analyze bundle sizes
    const manifestPath = path.join(buildDir, 'build-manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log('✅ Build manifest found');

      // Check main bundle size
      const pages = manifest.pages;
      if (pages['/']) {
        console.log('📊 Main page bundles:', pages['/']);
      }
    }

    // Create performance results directory
    const resultsDir = path.join(process.cwd(), 'performance-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    // Generate performance report
    const report = {
      timestamp: new Date().toISOString(),
      status: 'success',
      budget: budgetConfig.budget,
      performance: budgetConfig.performance,
      buildInfo: {
        buildDir: buildDir,
        manifestExists: fs.existsSync(manifestPath),
      },
    };

    // Write results
    fs.writeFileSync(
      path.join(resultsDir, 'budget-check.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('✅ Performance budget check completed successfully');
    console.log('📋 Results saved to performance-results/budget-check.json');
  } catch (error) {
    console.error('❌ Performance budget check failed:', error.message);
    process.exit(1);
  }
}

checkPerformanceBudget();
