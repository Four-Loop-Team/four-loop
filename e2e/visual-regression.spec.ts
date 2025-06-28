// Visual regression tests
import { expect, test } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage visual comparison', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Hide dynamic content that might cause flakiness
    await page.addStyleTag({
      content: `
        .animate-spin,
        .animate-pulse,
        [data-testid*="loading"] {
          animation: none !important;
        }
      `,
    });

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.2, // Allow small differences
    });
  });

  test('components demo visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Hide animations
    await page.addStyleTag({
      content: `
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot('components-demo-full.png', {
      fullPage: true,
      threshold: 0.3,
    });
  });

  test('modal visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Open modal
    await page.click('text=Open Modal', { force: true });
    await page.waitForSelector('[data-testid="modal"]');

    // Disable animations
    await page.addStyleTag({
      content: `
        .modal-backdrop,
        .modal-content {
          animation: none !important;
          transition: none !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot('modal-open.png', {
      threshold: 0.2,
    });
  });

  test('responsive design visual comparison', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      threshold: 0.2,
    });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      threshold: 0.2,
    });

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      threshold: 0.2,
    });
  });

  test.skip('toast notifications visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Trigger toast
    await page.click('text=Show Success Toast');
    await page.waitForSelector('[data-testid*="toast"]');

    // Disable toast animations
    await page.addStyleTag({
      content: `
        [data-testid*="toast"] {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot('toast-notification.png', {
      threshold: 0.2,
    });
  });

  test.skip('data table visual comparison', async ({ page }) => {
    await page.goto('/components-demo');
    await page.waitForLoadState('networkidle');

    // Scroll to data table section
    await page.locator('text=DataTable Demo').scrollIntoViewIfNeeded();

    // Take screenshot of just the data table section
    await expect(
      page.locator('[data-testid="datatable-demo"]')
    ).toHaveScreenshot('datatable-component.png', {
      threshold: 0.2,
    });
  });

  test('dark mode visual comparison', async ({ page }) => {
    // Enable dark mode (if implemented)
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      fullPage: true,
      threshold: 0.3,
    });
  });
});
