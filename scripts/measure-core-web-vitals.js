#!/usr/bin/env node
/* eslint-disable no-console */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Core Web Vitals measurement script
async function measureCoreWebVitals() {
  console.log('🌐 Measuring Core Web Vitals...');

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch();
    const page = await browser.newPage();

    // Inject Web Vitals script
    await page.addInitScript(() => {
      // Simple Web Vitals measurement
      window.vitalsData = {};

      // Listen for paint events
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              window.vitalsData.fcp = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.vitalsData.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          window.vitalsData.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    });

    // Navigate to the application
    const url = process.env.TEST_URL || 'http://localhost:3000';
    console.log(`📍 Navigating to: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for vitals to be collected
    await page.waitForTimeout(3000);

    // Get the vitals data
    const vitals = await page.evaluate(() => window.vitalsData || {});

    // Load performance budget for thresholds
    const budgetPath = path.join(process.cwd(), 'performance-budget.json');
    let thresholds = {};
    if (fs.existsSync(budgetPath)) {
      const budgetConfig = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
      thresholds = budgetConfig.performance || {};
    }

    // Analyze results
    const results = {
      timestamp: new Date().toISOString(),
      url,
      vitals,
      thresholds,
      analysis: {},
    };

    // Check against thresholds
    Object.keys(vitals).forEach((metric) => {
      const value = vitals[metric];
      const threshold = thresholds[metric];

      if (threshold) {
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
    const resultsDir = path.join(process.cwd(), 'vitals-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    // Write results
    fs.writeFileSync(
      path.join(resultsDir, 'core-web-vitals.json'),
      JSON.stringify(results, null, 2)
    );

    // Log results
    console.log('📊 Core Web Vitals Results:');
    Object.keys(vitals).forEach((metric) => {
      const value = vitals[metric];
      const status = results.analysis[metric] || 'unknown';
      const unit = metric === 'cls' ? '' : 'ms';
      console.log(`  ${metric.toUpperCase()}: ${value}${unit} (${status})`);
    });

    console.log('✅ Core Web Vitals measurement completed');
    console.log('📋 Results saved to vitals-results/core-web-vitals.json');
  } catch (error) {
    console.error('❌ Core Web Vitals measurement failed:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

measureCoreWebVitals();
