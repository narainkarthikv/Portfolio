import { expect, test } from '@playwright/test';

test('theme controls update the document theme and hero content', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('body')).toHaveAttribute('data-theme', 'blue');
  await expect(page.locator('html')).not.toHaveClass(/dark/);

  await page.locator('#themeSelect').selectOption('luffy');

  await expect(page.locator('body')).toHaveAttribute('data-theme', 'luffy');
  await expect(page.locator('#heroName')).toHaveText('ナラインカルティク');
  await expect(page.locator('#profileImage')).toHaveAttribute('src', /luffy-pfp\.webp/);

  await page.locator('#themeSwitch').click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
