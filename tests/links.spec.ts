import { expect, test } from '@playwright/test';

test('critical external links are present and safe', async ({ page }) => {
  await page.goto('/');

  const resumeLink = page.getByRole('link', { name: /View resume/i });
  await expect(resumeLink).toHaveAttribute('href', '/narainkarthik-cv.pdf');
  await expect(resumeLink).toHaveAttribute('target', '_blank');

  const socialLinks = [
    /LinkedIn \(opens in a new tab\)/i,
    /GitHub \(opens in a new tab\)/i,
    /Medium \(opens in a new tab\)/i,
  ];

  for (const label of socialLinks) {
    const link = page.getByRole('link', { name: label });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }

  await expect(
    page.getByRole('link', { name: /View all articles/i })
  ).toHaveAttribute('href', '/blog');
});
