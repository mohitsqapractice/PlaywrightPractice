import { test, expect,Browser,Page ,Locator} from '@playwright/test';
import path from 'path';
import {webkit,firefox,chromium} from '@playwright/test';

test('Login to Orange HR', async () => {
       const browser:Browser = await chromium.launch({headless:false});
   const page:Page = await browser.newPage();
     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle('OrangeHRM')
  const email:Locator = await page.getByPlaceholder('Username');
  const password:Locator =  await page.getByRole('textbox',{name:'password'});
   await expect(email).toBeVisible();
 await email.fill('Admin')
  await password.fill('admin123');
  await page.getByRole('button',{name:'Login'}).click();
   await expect( page.locator('.oxd-topbar-header-userarea img[alt="profile picture"]')).toBeVisible();
   const pimLink = await page.getByRole('link' ,{name:'PIM'});
   await pimLink.click();
   await expect(page.getByRole('heading', {name:'PIM'})).toBeVisible();
    await page.getByRole('button',{name:/add/i}).click();
    const firstName:Locator = await page.getByPlaceholder('First Name');
    await expect(firstName).toBeEditable();
      const lastName:Locator = await page.getByPlaceholder('Last Name');
        firstName.fill('Mohit');
    lastName.fill('Mishra');
   const toggle:Locator = page.locator('.oxd-switch-input');
    await toggle.click();
    const username = await page.locator('.oxd-input-group')
  .filter({ hasText: 'Username' })
  .locator('input');
  await expect(username).toBeVisible();
  await username.fill('testuser123');

    const Password = await page.locator('.oxd-input-group')
  .filter({ hasText: 'Password' })
  .locator('input').first();
  await Password.fill('Test@123.');

      const ConPassword = await page.locator('.oxd-input-group')
  .filter({ hasText: 'Confirm Password' })
  .locator('input');
  await ConPassword.fill('Test@123.');
const fileChooserPromise = page.waitForEvent('filechooser');

await page.locator('.oxd-icon-button.oxd-icon-button--solid-main.employee-image-action').click();

const fileChooser = await fileChooserPromise;
const filePath = path.join(process.cwd(), 'Test-Data', 'image1.png');
await fileChooser.setFiles(path.join(filePath));
console.log(filePath)
await page.waitForTimeout(8000);

});