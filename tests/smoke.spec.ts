import { expect, test } from '@playwright/test';

test('homepage renders the core portfolio surface', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/AI Augmented Software Engineer/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Narain Karthik'
  );
  const contextCursor = page.locator('.c-cursor');
  await expect(contextCursor).toBeAttached();
  await page.getByRole('button', { name: 'Toggle dark mode' }).hover();
  await expect(contextCursor).toHaveClass(/c-cursor-lift_active/);
  await expect(
    page.getByRole('img', { name: /Profile of Narain Karthik/i })
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Certifications' })
  ).toBeVisible();
});
