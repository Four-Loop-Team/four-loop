#!/usr/bin/env tsx
/* eslint-disable no-console */

import { existsSync, promises as fs, mkdirSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';

interface VitalsData {
  fcp?: number;
  lcp?: number;
  cls?: number;
}

interface PerformanceThreshold {
  warning: number;
  error: number;
}

interface PerformanceThresholds {
  [key: string]: PerformanceThreshold;
}

interface BudgetConfig {
  performance?: PerformanceThresholds;
}

interface VitalsResults {
  timestamp: string;
  url: string;
  vitals: VitalsData;
  thresholds: PerformanceThresholds;
  analysis: Record<string, string>;
}

// Core Web Vitals measurement script
async function measureCoreWebVitals(): Promise<void> {
  console.log('🌐 Measuring Core Web Vitals...');

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch();
    const page = await browser.newPage();

    // Inject Web Vitals script
    await page.addInitScript(() => {
      // Simple Web Vitals measurement
      (window as any).vitalsData = {};

      // Listen for paint events
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              (window as any).vitalsData.fcp = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          (window as any).vitalsData.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += entry.value;
            }
          }
          (window as any).vitalsData.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    });

    // Navigate to the application
    const url = process.env.TEST_URL ?? 'http://localhost:3000';
    console.log(`📍 Navigating to: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for vitals to be collected
    await page.waitForTimeout(3000);

    // Get the vitals data
    const vitals = (await page.evaluate(
      () => (window as any).vitalsData || {}
    )) as VitalsData;

    // Load performance budget for thresholds
    const budgetPath = join(process.cwd(), 'performance-budget.json');
    let thresholds: PerformanceThresholds = {};
    if (existsSync(budgetPath)) {
      const budgetData = await fs.readFile(budgetPath, 'utf8');
      const budgetConfig = JSON.parse(budgetData) as BudgetConfig;
      thresholds = budgetConfig.performance ?? {};
    }

    // Analyze results
    const results: VitalsResults = {
      timestamp: new Date().toISOString(),
      url,
      vitals,
      thresholds,
      analysis: {},
    };

    // Check against thresholds
    Object.keys(vitals).forEach((metric) => {
      const value = vitals[metric as keyof VitalsData];
      const threshold = thresholds[metric];

      if (threshold && typeof value === 'number') {
        if (value <= threshold.warning) {
          results.analysis[metric] = 'good';
        } else if (value <= threshold.error) {
          results.analysis[metric] = 'needs-improvement';
        } else {
          results.analysis[metric] = 'poor';
        }
      }
    });

    // Create results directory
    const resultsDir = join(process.cwd(), 'vitals-results');
    if (!existsSync(resultsDir)) {
      mkdirSync(resultsDir, { recursive: true });
    }

    // Write results
    await fs.writeFile(
      join(resultsDir, 'core-web-vitals.json'),
      JSON.stringify(results, null, 2)
    );

    // Log results
    console.log('📊 Core Web Vitals Results:');
    Object.keys(vitals).forEach((metric) => {
      const value = vitals[metric as keyof VitalsData];
      const status = results.analysis[metric] ?? 'unknown';
      const unit = metric === 'cls' ? '' : 'ms';
      console.log(`  ${metric.toUpperCase()}: ${value}${unit} (${status})`);
    });

    console.log('✅ Core Web Vitals measurement completed');
    console.log('📋 Results saved to vitals-results/core-web-vitals.json');
  } catch (error) {
    console.error(
      '❌ Core Web Vitals measurement failed:',
      (error as Error).message
    );
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  void measureCoreWebVitals();
}

export { measureCoreWebVitals };
