// E2E tests for homepage functionality
import { expect, test } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title and meta description', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Four Loop Digital/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      expect.stringContaining('digital consulting')
    );
  });

  test('navigation works correctly', async ({ page }) => {
    // Test navigation routing functionality
    await page.click('button:has-text("Work")');
    await expect(page).toHaveURL('/work');

    await page.click('button:has-text("About Us")');
    await expect(page).toHaveURL('/about');

    await page.click('button:has-text("Contact")');
    await expect(page).toHaveURL('/contact');

    // Navigate back to home using the logo or direct navigation
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('logo is visible and accessible', async ({ page }) => {
    const logo = page.locator('img[alt*="Four Loop Digital"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute(
      'alt',
      expect.stringContaining('Four Loop Digital')
    );
  });

  test('home section is present', async ({ page }) => {
    // Check main home section exists
    await expect(page.locator('#home')).toBeVisible();
  });

  test('headings hierarchy is correct', async ({ page }) => {
    // Check H1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements.first()).toHaveText('Welcome to Four Loop Digital');

    // Check H2 elements exist (only one on homepage now since sections are separate pages)
    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThanOrEqual(1); // At least the subtitle
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that content is still visible and accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();

    // Test navigation on mobile - need to open mobile menu first
    const menuButton = page.locator('[aria-label="Open navigation menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Wait for drawer to open and then click Work
      await page.waitForSelector(
        '[role="navigation"][aria-label="Mobile navigation menu"]'
      );
      await page.click(
        '[role="navigation"][aria-label="Mobile navigation menu"] >> text=Work'
      );
      await expect(page).toHaveURL('/work');
    } else {
      // Fallback for desktop-style navigation on mobile
      await page.click('button:has-text("Work")');
      await expect(page).toHaveURL('/work');
    }
  });

  test('performance metrics are acceptable', async ({ page }) => {
    // Navigate to page and wait for load
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    // Check that page loads in reasonable time (< 3 seconds)
    expect(loadTime).toBeLessThan(3000);

    // Check that images are loaded
    const logo = page.locator('img[alt*="Four Loop Digital"]');
    await expect(logo).toBeVisible();
  });

  test('SEO metadata is complete', async ({ page }) => {
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      expect.stringContaining('Four Loop Digital')
    );
    await expect(
      page.locator('meta[property="og:description"]')
    ).toHaveAttribute('content', expect.stringContaining('digital consulting'));
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website'
    );

    // Check Twitter tags
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      expect.stringContaining('Four Loop Digital')
    );
  });
});
