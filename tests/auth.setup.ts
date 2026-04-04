import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { generateUsername, generateEmail, generatePassword } from '../utils/dataGenerator';
import employeeData from '../Test-Data/employee.json';
import { LoginPage } from '../pages/loginPage';
import { config } from '../utils/configHelper';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
   const loginPage = new LoginPage(page)
    await loginPage.goto();
    await loginPage.login(config.APPusername, config.APPpassword);
    await page.waitForURL('**/dashboard/index'); 
      await page.context().storageState({ path: authFile });
})