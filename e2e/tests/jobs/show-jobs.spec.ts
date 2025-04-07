import { test, expect } from '@playwright/test';

test('新着求人一覧が表示されること', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('link', { name: '【北野異人館徒歩5' }).first()).toBeVisible();
});
