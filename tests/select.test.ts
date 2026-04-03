import { test, expect,Browser,Page ,Locator} from '@playwright/test';
import {webkit,firefox,chromium} from '@playwright/test';

test('Select Locator demo', async () => {
   const browser:Browser = await chromium.launch({headless:false});
   const page:Page = await browser.newPage();
   await page.goto('https://www.magupdate.co.uk/magazine-subscription/PEUK');
   await expect(page).toHaveTitle('Magazine Subscription');

   const select = await page.locator('select#Contact_CountryCode');
   await select.selectOption({label:'Anguilla'});
   const options = await select.locator('option').evaluateAll(opts=>opts.map(o=>o.textContent))
   console.log(options);
   await page.waitForTimeout(10000);
});