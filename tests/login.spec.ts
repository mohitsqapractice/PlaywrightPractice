import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/OrangeHRM/);

await page.getByPlaceholder('username').fill('Admin');
await page.getByRole('textbox', { name: 'password' }).fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});