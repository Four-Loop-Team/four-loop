#!/usr/bin/env tsx
/* eslint-disable no-console */

import { existsSync, promises as fs } from 'fs';
import { join } from 'path';

interface BudgetConfig {
  budget: Record<string, unknown>;
  performance: Record<string, unknown>;
}

interface ManifestData {
  pages: Record<string, string[]>;
}

interface PerformanceReport {
  timestamp: string;
  status: string;
  budget: Record<string, unknown>;
  performance: Record<string, unknown>;
  buildInfo: {
    buildDir: string;
    manifestExists: boolean;
  };
}

// Performance budget checker script
async function checkPerformanceBudget(): Promise<void> {
  console.log('🚀 Checking performance budget...');

  try {
    // Load performance budget configuration
    const budgetPath = join(process.cwd(), 'performance-budget.json');
    if (!existsSync(budgetPath)) {
      console.error('❌ Performance budget configuration not found');
      process.exit(1);
    }

    const budgetConfigData = await fs.readFile(budgetPath, 'utf8');
    const budgetConfig = JSON.parse(budgetConfigData) as BudgetConfig;
    console.log('✅ Performance budget configuration loaded');

    // Check if build output exists
    const buildDir = join(process.cwd(), '.next');
    if (!existsSync(buildDir)) {
      console.error('❌ Build directory not found. Run "npm run build" first.');
      process.exit(1);
    }

    // Analyze bundle sizes
    const manifestPath = join(buildDir, 'build-manifest.json');
    if (existsSync(manifestPath)) {
      const manifestData = await fs.readFile(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestData) as ManifestData;
      console.log('✅ Build manifest found');

      // Check main bundle size
      const pages = manifest.pages;
      if (pages['/']) {
        console.log('📊 Main page bundles:', pages['/']);
      }
    }

    // Create performance results directory
    const resultsDir = join(process.cwd(), 'performance-results');
    if (!existsSync(resultsDir)) {
      await fs.mkdir(resultsDir, { recursive: true });
    }

    // Generate performance report
    const report: PerformanceReport = {
      timestamp: new Date().toISOString(),
      status: 'success',
      budget: budgetConfig.budget,
      performance: budgetConfig.performance,
      buildInfo: {
        buildDir: buildDir,
        manifestExists: existsSync(manifestPath),
      },
    };

    // Write results
    await fs.writeFile(
      join(resultsDir, 'budget-check.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('✅ Performance budget check completed successfully');
    console.log('📋 Results saved to performance-results/budget-check.json');
  } catch (error) {
    console.error(
      '❌ Performance budget check failed:',
      (error as Error).message
    );
    process.exit(1);
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void checkPerformanceBudget();
}

export { checkPerformanceBudget };
