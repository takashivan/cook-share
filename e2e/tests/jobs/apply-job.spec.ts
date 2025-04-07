import { loginUser } from '@/e2e/helpers/page-objects/login/login-user';
import { test, expect } from '@playwright/test';

test('求人に応募できること', async ({ page }) => {
  const loginUserOnj = new loginUser(page);
  await loginUserOnj.login();

  await page.getByRole('link', { name: '【北野異人館徒歩5' }).first().click();
  await page.getByRole('button', { name: '応募する' }).nth(1).click();
  // アサーションを記載
});
