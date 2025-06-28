// Visual regression tests
import { expect, test } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage visual comparison', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Hide dynamic content that might cause flakiness
    await page.addStyleTag({
      content: `
        .animate-spin,
        .animate-pulse,
        [data-testid*="loading"],
        [data-nextjs-dev-tools-button] {
          animation: none !important;
          display: none !important;
        }
      `,
    });

    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);
    await page.waitForTimeout(500);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.3,
      animations: 'disabled',
    });
  });

  test('components demo visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Wait for layout to stabilize
    await page.waitForTimeout(1000);

    // Hide animations and stabilize dynamic content
    await page.addStyleTag({
      content: `
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        [data-nextjs-dev-tools-button] {
          display: none !important;
        }
        .animate-spin,
        .animate-pulse {
          animation: none !important;
        }
      `,
    });

    // Wait for fonts and styles to fully load
    await page.waitForFunction(() => document.fonts.ready);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('components-demo-full.png', {
      fullPage: true,
      threshold: 0.8, // High threshold for cross-browser compatibility (minor pixel diffs expected)
      animations: 'disabled',
      maxDiffPixels: 5000, // Allow up to 5000 different pixels
    });
  });

  test('modal visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Open modal - use force click for mobile compatibility
    const openModalButton = page.locator('button:has-text("Open Modal")');
    await openModalButton.scrollIntoViewIfNeeded();
    await openModalButton.click({ force: true });

    await page.waitForSelector('[data-testid="modal"]');
    await page.waitForTimeout(500);

    // Disable animations
    await page.addStyleTag({
      content: `
        .modal-backdrop,
        .modal-content,
        * {
          animation: none !important;
          transition: none !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot('modal-open.png', {
      threshold: 0.3,
      animations: 'disabled',
    });
  });

  test('responsive design visual comparison', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      threshold: 0.6, // More lenient for mobile rendering differences
      maxDiffPixels: 1000,
    });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      threshold: 0.6,
      maxDiffPixels: 1000,
    });

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      threshold: 0.6,
      maxDiffPixels: 1000,
    });
  });

  test('button interactions visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Scroll to buttons section
    await page.locator('text=Buttons').scrollIntoViewIfNeeded();

    // Take screenshot of the buttons section
    const buttonsSection = page
      .locator('h2:has-text("Basic Components")')
      .locator('..')
      .locator('div.grid')
      .first();
    await expect(buttonsSection).toHaveScreenshot('buttons-section.png', {
      threshold: 0.7, // High threshold for cross-browser button rendering
      maxDiffPixels: 2000,
    });
  });

  test('data table visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Scroll to data table section
    await page.locator('text=Data Table').scrollIntoViewIfNeeded();

    // Take screenshot of just the data table card
    const dataTableCard = page
      .locator('h2:has-text("Data Display")')
      .locator('..')
      .locator('.grid')
      .first();
    await expect(dataTableCard).toHaveScreenshot('datatable-component.png', {
      threshold: 0.7, // High threshold for cross-browser table rendering
      maxDiffPixels: 2000,
    });
  });

  test('dark mode visual comparison', async ({ page }) => {
    // Enable dark mode (if implemented)
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      fullPage: true,
      threshold: 0.8, // High threshold for dark mode cross-browser differences
      maxDiffPixels: 3000,
    });
  });
});
