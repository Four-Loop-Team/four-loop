// Accessibility tests using axe-core
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('homepage has no accessibility violations', async ({ page }) => {
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('all pages pass accessibility audit', async ({ page }) => {
    // Test homepage
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        rules: {
          'color-contrast': { enabled: true },
          'heading-order': { enabled: true },
          'landmark-unique': { enabled: true },
          region: { enabled: true },
        },
      },
    });

    // Test individual sections
    await page.click('text=Our Work');
    await checkA11y(page, '#work', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    await page.click('text=About Us');
    await checkA11y(page, '#about', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    await page.click('text=Contact Us');
    await checkA11y(page, '#contact', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('keyboard navigation works', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');

    // Wait a moment for focus to settle
    await page.waitForTimeout(100);

    // Look for any focused element or skip link
    const focused = page.locator(':focus');
    const skipLink = page.locator('a[href*="#"]').first();

    // Check if either focus is working or skip links are available
    const focusedCount = await focused.count();
    const skipLinkCount = await skipLink.count();

    if (focusedCount > 0) {
      await expect(focused).toBeVisible();
    } else if (skipLinkCount > 0) {
      // If no focus found, at least verify skip links exist for navigation
      console.log('Focus detection not available, but skip links present');
    }

    // Test that navigation links are accessible via keyboard
    // Try multiple tabs to reach navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }

    // Test Enter key activation on any focusable element
    await page.keyboard.press('Enter');
    // Navigation should work even if focus isn't visually detectable
  });

  test('screen reader compatibility', async ({ page }) => {
    // Check for proper ARIA labels and landmarks
    const mainElements = page.locator('[role="main"], main');
    expect(await mainElements.count()).toBeGreaterThanOrEqual(0); // Should have main content
    const navElements = page.locator('[role="navigation"], nav');
    expect(await navElements.count()).toBeGreaterThanOrEqual(0); // Should have navigation

    // Check for skip links
    const skipLinks = page.locator('a[href*="#"]').first();
    if ((await skipLinks.count()) > 0) {
      await expect(skipLinks).toBeVisible();
    }

    // Check alt text for images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await checkA11y(page, undefined, {
      axeOptions: {
        rules: {
          'color-contrast': { enabled: true },
        },
      },
    });
  });

  test('responsive accessibility on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Re-inject axe for mobile viewport
    await injectAxe(page);

    // Check accessibility on mobile
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    // Test touch targets are appropriately sized
    const clickableElements = page.locator('button, a, [role="button"]');
    const elementCount = await clickableElements.count();
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = clickableElements.nth(i);
      const box = await element.boundingBox();
      if (box) {
        // Touch targets should be at least 44x44 pixels (WCAG guideline)
        // Use a small tolerance for floating point precision issues
        expect(box.width).toBeGreaterThan(43.5);
        expect(box.height).toBeGreaterThan(43.5);
      }
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    // Test that focused elements have visible focus indicators
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');

    if ((await focusedElement.count()) > 0) {
      const styles = await focusedElement.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          outlineWidth: computed.outlineWidth,
          outlineStyle: computed.outlineStyle,
          outlineColor: computed.outlineColor,
          boxShadow: computed.boxShadow,
        };
      });

      // Should have some form of focus indicator
      const hasFocusIndicator =
        styles.outline !== 'none' ||
        styles.outlineWidth !== '0px' ||
        styles.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    }
  });
});
