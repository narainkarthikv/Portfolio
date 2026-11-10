import { expect, test } from '@playwright/test';

test('project cards expose their interactions and case studies', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto('/');

  const projects = page.locator('.project-card');
  await expect(projects.first()).toBeVisible();
  await expect(projects).toHaveCount(5);

  const initialLayout = await projects.evaluateAll((cards) => {
    const widths = cards.map((card) => card.offsetWidth);
    return {
      sameWidth: widths.every((width) => width === widths[0]),
      cardsFitContent: cards.every((card) => card.scrollHeight <= card.clientHeight + 1),
    };
  });
  expect(initialLayout.sameWidth).toBe(true);
  expect(initialLayout.cardsFitContent).toBe(true);

  const activeBeforeMove = await page.locator('.project-card.is-active').getAttribute('style');
  const cardTransition = page.evaluate(() => new Promise<boolean>((resolve) => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
    if (cards.length === 0) return resolve(false);
    const timeout = window.setTimeout(() => resolve(false), 1500);
    const handleTransition = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return;
      window.clearTimeout(timeout);
      cards.forEach((card) => card.removeEventListener('transitionrun', handleTransition));
      resolve(true);
    };
    cards.forEach((card) => card.addEventListener('transitionrun', handleTransition));
  }));

  await page.getByRole('button', { name: 'View next project' }).click();
  await expect(page.locator('.project-card.is-active')).not.toHaveAttribute('style', activeBeforeMove ?? '');
  await expect.poll(() => cardTransition).toBe(true);

  const activeCard = page.locator('.project-card.is-active').first();
  await expect(activeCard).toBeVisible();
  const stackToggle = activeCard.locator('[data-stack-toggle-button]');
  await expect(stackToggle).toBeVisible();
  await stackToggle.click();
  await expect(stackToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(activeCard.locator('[data-stack-toggle-label]')).toHaveText(
    'Show less'
  );

  const caseStudyButton = activeCard.getByRole('button', {
    name: /Spin .* case study/i,
  });
  await expect(caseStudyButton).toBeVisible();
  await caseStudyButton.click();

  await expect(activeCard).toHaveClass(/is-flipped/);
  const flipShell = activeCard.locator('.project-card-shell');
  await expect.poll(() => flipShell.evaluate((shell) => getComputedStyle(shell).transform)).not.toBe('none');
  await expect.poll(() => flipShell.evaluate((shell) => getComputedStyle(shell).transitionDuration)).toContain('1.2s');
  await expect(
    activeCard.getByRole('tablist', { name: /Desktop case study tabs/i })
  ).toBeVisible();

  const caseStudyTab = activeCard.getByRole('tab', { name: /UX and DX/i });
  await caseStudyTab.click();
  await expect(caseStudyTab).toHaveAttribute('aria-selected', 'true');
  await expect(activeCard.getByRole('heading', { name: 'UX' })).toBeVisible();
});

test('mobile projects support coverflow navigation by buttons and swipe', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const previous = page.getByRole('button', { name: 'View previous project' });
  const next = page.getByRole('button', { name: 'View next project' });
  await expect(previous).toBeVisible();
  await expect(next).toBeVisible();

  const activeCard = page.locator('.project-card.is-active');
  const initialCard = await activeCard.locator('.project-card-front .project-card-title').innerText();
  const track = page.locator('.projects-track');
  const mobileLayout = await track.evaluate((element) => {
    const active = element.querySelector<HTMLElement>('.project-card.is-active');
    return {
      activePosition: active ? getComputedStyle(active).position : '',
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      trackFitsActive: Boolean(active && element.clientHeight >= active.offsetHeight),
    };
  });
  expect(mobileLayout.activePosition).toBe('absolute');
  expect(mobileLayout.hasHorizontalOverflow).toBe(false);
  expect(mobileLayout.trackFitsActive).toBe(true);

  await next.click();
  await expect.poll(() => activeCard.locator('.project-card-front .project-card-title').innerText()).not.toBe(initialCard);
  const beforeSwipe = await activeCard.locator('.project-card-front .project-card-title').innerText();

  await track.evaluate((element) => {
    const start = new PointerEvent('pointerdown', {
      bubbles: true, pointerId: 17, pointerType: 'touch', clientX: 300, clientY: 400,
    });
    const end = new PointerEvent('pointerup', {
      bubbles: true, pointerId: 17, pointerType: 'touch', clientX: 100, clientY: 405,
    });
    element.dispatchEvent(start);
    element.dispatchEvent(end);
  });
  await expect.poll(() => activeCard.locator('.project-card-front .project-card-title').innerText()).not.toBe(beforeSwipe);
});
