import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

test('portfolio stays within the viewport across key breakpoints', async ({ page }) => {
  for (const viewport of viewports) {
    await test.step(viewport.name, async () => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));

      expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewportWidth);
      await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
    });
  }
});
