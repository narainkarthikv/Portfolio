import { expect, test } from '@playwright/test';

test('homepage renders the core portfolio surface', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Portfolio/i);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Narain Karthik'
  );
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
