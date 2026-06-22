import { expect, test } from '@playwright/test';

test('project cards expose their interactions and case studies', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto('/');

  const projects = page.locator('.project-card');
  await expect(projects.first()).toBeVisible();
  await expect(projects).toHaveCount(5);

  const activeCard = page.locator('.project-card.is-active').first();
  await expect(activeCard).toBeVisible();
  const stackToggle = activeCard.locator('[data-stack-toggle-button]');
  await expect(stackToggle).toBeVisible();
  await stackToggle.click();
  await expect(stackToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(activeCard.locator('[data-stack-toggle-label]')).toHaveText('Show less');

  const caseStudyButton = activeCard.getByRole('button', {
    name: /Spin .* case study/i,
  });
  await expect(caseStudyButton).toBeVisible();
  await caseStudyButton.click();

  await expect(activeCard).toHaveClass(/is-flipped/);
  await expect(activeCard.getByRole('tablist', { name: /Desktop case study tabs/i })).toBeVisible();

  const caseStudyTab = activeCard.getByRole('tab', { name: /UX and DX/i });
  await caseStudyTab.click();
  await expect(caseStudyTab).toHaveAttribute('aria-selected', 'true');
  await expect(activeCard.getByRole('heading', { name: 'UX' })).toBeVisible();
});
