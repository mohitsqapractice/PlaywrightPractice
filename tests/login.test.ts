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
});

test('Negative scenarioLogin to Orange HR', async () => {
    const browser:Browser = await firefox.launch();
  const page:Page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle('OrangeHRM')
  await page.getByRole('textbox',{name:'username'}).fill('Admin');
   await page.getByRole('textbox',{name:'password'}).fill('admin1234');
   await page.getByRole('button',{name:'Login'}).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();

});