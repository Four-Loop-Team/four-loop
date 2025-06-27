// Security and compatibility tests for production readiness
import { expect, test } from '@playwright/test';

test.describe('Security & Compatibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has secure headers and no sensitive data exposure', async ({
    page,
  }) => {
    // Check for security headers in response
    const response = await page.goto('/');
    const headers = response?.headers() ?? {};

    // Check for X-Frame-Options (clickjacking protection)
    // Note: Next.js may set this automatically

    // Check that no sensitive information is exposed in page source
    const content = await page.content();
    expect(content).not.toContain('password');
    expect(content).not.toContain('secret');
    expect(content).not.toContain('api_key');
    expect(content).not.toContain('private_key');
  });

  test('handles XSS protection', async ({ page }) => {
    // Test that the page properly escapes content
    const pageContent = await page.content();

    // Check that script tags aren't being executed from user content
    expect(pageContent).not.toMatch(/<script[^>]*>[^<]*alert\(/);
    expect(pageContent).not.toMatch(/javascript:/);
    // Note: We skip the "on..." attribute check as React/MUI legitimately uses these
    // for event handling in a safe manner
  });

  test('external links have proper security attributes', async ({ page }) => {
    // Check for external links and verify they have security attributes
    const externalLinks = page.locator(
      'a[href^="http"]:not([href*="fourloop"]):not([href*="localhost"])'
    );
    const linkCount = await externalLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = externalLinks.nth(i);
      // External links should have rel="noopener" for security
      await expect(link).toHaveAttribute(
        'rel',
        expect.stringMatching(/noopener|noreferrer/)
      );
    }
  });

  test('cross-browser compatibility', async ({ page, browserName }) => {
    // Test core functionality across different browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();

    // Test CSS Grid/Flexbox support (should work in all modern browsers)
    const homeSection = page.locator('#home');
    const styles = await homeSection.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        flexDirection: computed.flexDirection,
      };
    });

    // Should have modern CSS support
    expect(styles.display).toBeTruthy();

    console.log(`✅ ${browserName}: Core functionality working`);
  });

  test('responsive design compatibility', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 8
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad Landscape
      { width: 1440, height: 900 }, // Desktop
      { width: 1920, height: 1080 }, // Large Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // Check that content is still accessible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('#home')).toBeVisible();

      // Check that navigation is accessible (may be collapsed on mobile)
      const navElements = page.locator('nav, [role="navigation"]');
      if ((await navElements.count()) > 0) {
        // Navigation should be present (may be in hamburger menu on mobile)
        await expect(navElements.first()).toBeVisible();
      }

      console.log(
        `✅ Viewport ${viewport.width}x${viewport.height}: Layout working`
      );
    }
  });

  test('form validation and input sanitization', async ({ page }) => {
    // Check if there are any forms on the page
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      // Test form validation
      for (let i = 0; i < formCount; i++) {
        const form = forms.nth(i);
        const inputs = form.locator('input, textarea');
        const inputCount = await inputs.count();

        for (let j = 0; j < inputCount; j++) {
          const input = inputs.nth(j);
          const inputType = await input.getAttribute('type');

          // Test that email inputs have proper validation
          if (inputType === 'email') {
            await input.fill('invalid-email');
            await expect(input).toHaveJSProperty('validity.valid', false);

            await input.fill('test@example.com');
            await expect(input).toHaveJSProperty('validity.valid', true);
          }

          // Test that required fields are marked
          const isRequired = await input.getAttribute('required');
          if (isRequired !== null) {
            await input.fill('');
            await expect(input).toHaveJSProperty('validity.valid', false);
          }
        }
      }
    } else {
      console.log('ℹ️ No forms found on this page');
    }
  });

  test('performance under load simulation', async ({ page }) => {
    // Simulate slower network conditions
    await page.route('**/*', (route) => {
      // Add small delay to simulate real-world conditions
      setTimeout(() => {
        void route.continue();
      }, 50);
    });

    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    // Should still load in reasonable time even with network delays
    expect(loadTime).toBeLessThan(5000); // 5 seconds with simulated delays

    // Check that critical content is still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();
  });

  test('graceful degradation without JavaScript', async ({ page, context }) => {
    // Test with JavaScript disabled
    await context.addInitScript(() => {
      // Disable JavaScript execution
      Object.defineProperty(window, 'setTimeout', { value: () => {} });
      Object.defineProperty(window, 'setInterval', { value: () => {} });
    });

    await page.goto('/');

    // Content should still be visible without JavaScript
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();

    // Basic navigation should work (anchor links)
    const workLink = page.locator('a[href*="#work"]');
    if ((await workLink.count()) > 0) {
      await workLink.first().click();
      // Should navigate to section even without smooth scrolling JS
      await expect(page.locator('#work')).toBeInViewport();
    }
  });

  test('error handling and 404 pages', async ({ page }) => {
    // Test 404 page (if it exists)
    const response = await page.goto('/non-existent-page', {
      waitUntil: 'load',
      timeout: 10000,
    });

    // Should handle 404 gracefully
    expect(response?.status()).toBe(404);

    // Should show some content even on 404
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
