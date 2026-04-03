import { test, expect,Browser,Page ,Locator} from '@playwright/test';
import {webkit,firefox,chromium} from '@playwright/test';

test('Login to Orange HR', async () => {
   const browser:Browser = await chromium.launch({headless:false});
   const page:Page = await browser.newPage();
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveTitle('OrangeHRM')
  const email:Locator = await page.getByRole('textbox',{name:'username'})
  const password:Locator =  await page.getByRole('textbox',{name:'password'});
  email.fill('Admin')
  password.fill('admin123');
   await page.getByRole('button',{name:'Login'}).click();
   await expect(page.getByAltText('profile picture')).toBeVisible();
   const admin:Locator = await page.locator("//span[text()='Admin']");
   admin.click();
   await page.pause();
   await page.locator("(//div[@class='oxd-select-text-input'])[1]").click();
   await page.getByRole('option', { name: 'Admin' }).click();
   await page.locator("(//div[@class='oxd-select-text-input'])[2]").click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    const userName =  await page.locator('.oxd-input-group').filter({hasText:'UserName'}).locator('input').first();
    await userName.fill('mohitit09');

});