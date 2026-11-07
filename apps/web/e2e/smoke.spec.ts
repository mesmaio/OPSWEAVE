import { test, expect } from '@playwright/test';

test.describe('OpsWeave Smoke Test', () => {
  test('loads initial application page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OpsWeave/);
    const heading = page.locator('h1');
    await expect(heading).toHaveText('OpsWeave');
  });
});

