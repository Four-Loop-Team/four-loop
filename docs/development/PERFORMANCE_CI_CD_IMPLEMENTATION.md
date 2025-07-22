# Performance Monitoring & CI/CD Integration Guide

## Overview

This guide covers the implementation of performance monitoring infrastructure, CI/CD workflows, and
automated testing systems for the Four Loop Digital project.

## 🔧 Performance Infrastructure

### Performance Budget Configuration

**File**: `performance-budget.json`

The project includes comprehensive performance budgets to maintain optimal loading times:

```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 2000,
          "tolerance": 500
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500,
          "tolerance": 500
        },
        {
          "metric": "cumulative-layout-shift",
          "budget": 0.1,
          "tolerance": 0.05
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 250000
        },
        {
          "resourceType": "total",
          "budget": 500000
        }
      ]
    }
  ]
}
```

### Performance Monitoring Utility

**Location**: `src/lib/performance-monitor.ts`

Provides runtime performance tracking:

```typescript
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
}

export class PerformanceMonitor {
  static collectMetrics(): Promise<PerformanceMetrics>;
  static trackPageLoad(pageName: string): void;
  static reportToAnalytics(metrics: PerformanceMetrics): void;
}
```

### Performance Budget Validation Script

**Location**: `scripts/check-performance-budget.js`

Automated validation script for CI/CD:

```javascript
const { performanceBudgetCheck } = require('./performance-budget-validator');

async function validatePerformanceBudget() {
  const results = await performanceBudgetCheck({
    url: 'http://localhost:3000',
    budgetPath: './performance-budget.json',
    outputFormat: 'json',
  });

  if (results.failed) {
    console.error('Performance budget exceeded!');
    process.exit(1);
  }

  console.log('✅ Performance budget check passed');
}
```

### Core Web Vitals Measurement

**Location**: `scripts/measure-core-web-vitals.js`

Real-time Core Web Vitals measurement:

```javascript
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function measureCoreWebVitals(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  return {
    fcp: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
    lcp: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
    cls: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
    fid: runnerResult.lhr.audits['max-potential-fid'].numericValue,
    performanceScore: runnerResult.lhr.categories.performance.score * 100,
  };
}
```

## 🚀 CI/CD Pipeline Configuration

### GitHub Actions Workflow

**Location**: `.github/workflows/performance-visual.yml`

```yaml
name: Performance & Visual Testing

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Start server
        run: npm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run performance budget check
        run: npm run performance:check

      - name: Measure Core Web Vitals
        run: npm run performance:vitals

      - name: Upload performance results
        uses: actions/upload-artifact@v4
        with:
          name: performance-results
          path: vitals-results/

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Start server
        run: npm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run visual regression tests
        run: npx playwright test --config=playwright.visual.config.ts

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Performance Scripts in package.json

```json
{
  "scripts": {
    "performance:check": "node scripts/check-performance-budget.js",
    "performance:vitals": "node scripts/measure-core-web-vitals.js",
    "performance:monitor": "node scripts/performance-monitor.js",
    "ci:performance": "npm run performance:check && npm run performance:vitals"
  }
}
```

## 🧪 Visual Regression Testing

### Cross-Browser Testing Setup

**Enhanced Configuration**: Updated thresholds for cross-browser compatibility:

```typescript
// playwright.visual.config.ts
export default defineConfig({
  testDir: './e2e/visual',
  expect: {
    // Enhanced thresholds for cross-browser compatibility
    toHaveScreenshot: {
      threshold: 0.4, // Increased for Firefox rendering differences
      maxDiffPixels: 1000,
    },
    toMatchScreenshot: {
      threshold: 0.5, // Accommodates minor browser differences
      maxDiffPixels: 1500,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
```

### Visual Test Implementation

**Baseline Management**: Automated baseline image generation and management:

```typescript
// e2e/visual/component-visual.spec.ts
test.describe('Component Visual Regression', () => {
  test('captures component gallery', async ({ page }) => {
    await page.goto('/demo/components');

    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot('components-gallery.png');
  });

  test('captures modal interactions', async ({ page }) => {
    await page.goto('/demo/components');

    // Open modal with improved click handling
    await page.locator('[data-testid="modal-trigger"]').click({ force: true });
    await page.waitForSelector('[data-testid="modal"]', { state: 'visible' });

    await expect(page).toHaveScreenshot('modal-open.png');
  });
});
```

### Accessibility Integration

**Automated Accessibility Testing**:

```typescript
// e2e/accessibility.spec.ts
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('homepage accessibility', async ({ page }) => {
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('navigation accessibility', async ({ page }) => {
    // Test touch targets meet WCAG 2.1 AA standards (44x44px minimum)
    const touchTargets = await page.locator('button, a, input').all();

    for (const target of touchTargets) {
      const box = await target.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
```

## 📊 Monitoring & Alerting

### Performance Tracking Dashboard

**Integration Points**:

- Google Analytics 4 for Core Web Vitals
- Lighthouse CI for automated audits
- Custom performance monitoring dashboard

### Alert Configuration

**Performance Regression Alerts**:

```javascript
// scripts/performance-alerts.js
const thresholds = {
  fcp: 2000, // First Contentful Paint
  lcp: 2500, // Largest Contentful Paint
  cls: 0.1, // Cumulative Layout Shift
  fid: 100, // First Input Delay
  performanceScore: 90,
};

function checkPerformanceRegression(currentMetrics, baselineMetrics) {
  const alerts = [];

  Object.keys(thresholds).forEach((metric) => {
    const regression =
      ((currentMetrics[metric] - baselineMetrics[metric]) / baselineMetrics[metric]) * 100;

    if (regression > 10) {
      // 10% regression threshold
      alerts.push({
        metric,
        regression: `${regression.toFixed(2)}%`,
        current: currentMetrics[metric],
        baseline: baselineMetrics[metric],
      });
    }
  });

  return alerts;
}
```

## 🎯 Implementation Status

### ✅ Completed Features

- **Performance budget configuration** with comprehensive metrics
- **Performance monitoring utility** for runtime tracking
- **Performance budget validation script** for CI/CD integration
- **Core Web Vitals measurement script** with Lighthouse integration
- **CI/CD performance workflow** ready for GitHub Actions
- **Cross-browser visual regression tests** with enhanced stability
- **Accessibility compliance testing** with WCAG 2.1 AA standards

### 🔄 Pending Tasks

#### CI/CD Integration Validation

- [ ] Test performance workflow in GitHub Actions environment
- [ ] Verify artifact storage and reporting functionality
- [ ] Set up performance regression alert system
- [ ] Configure automated baseline image management

#### Performance Monitoring Automation

- [ ] Integrate Lighthouse CI for continuous performance testing
- [ ] Set up performance tracking dashboard
- [ ] Configure automated performance alerts
- [ ] Implement performance budget enforcement in PR reviews

#### Visual Testing Enhancement

- [ ] Validate cross-browser tests in CI environment
- [ ] Set up automated baseline image updates
- [ ] Configure visual change approval workflow
- [ ] Implement parallel visual test execution

## 🛠️ Usage Examples

### Running Performance Checks

```bash
# Check performance budget compliance
npm run performance:check

# Measure Core Web Vitals
npm run performance:vitals

# Run complete performance audit
npm run ci:performance
```

### Visual Regression Testing

```bash
# Run visual tests for all browsers
npx playwright test --config=playwright.visual.config.ts

# Update visual baselines
npx playwright test --update-snapshots

# Run tests for specific browser
npx playwright test --project=firefox
```

### Accessibility Testing

```bash
# Run accessibility audit
npx playwright test e2e/accessibility.spec.ts

# Generate accessibility report
npx playwright test e2e/accessibility.spec.ts --reporter=html
```

## 📚 Best Practices

### Performance Budget Management

1. **Set realistic budgets** based on user experience goals
2. **Monitor trends** rather than absolute values
3. **Use CI/CD gates** to prevent performance regressions
4. **Regular budget reviews** to adjust for feature changes

### Visual Testing Strategy

1. **Disable animations** for consistent screenshots
2. **Use appropriate thresholds** for cross-browser differences
3. **Organize tests by component** for easier maintenance
4. **Regular baseline updates** when design changes are intentional

### Accessibility Compliance

1. **Automated testing integration** in CI/CD pipeline
2. **Manual testing complement** for comprehensive coverage
3. **Regular audits** of new features and components
4. **Team training** on accessibility best practices

This implementation provides a robust foundation for maintaining high performance standards and
visual consistency while ensuring accessibility compliance across the Four Loop Digital application.
