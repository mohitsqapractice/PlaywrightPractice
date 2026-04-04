import { test, expect, Browser, Page, Locator } from '@playwright/test';
import { webkit, firefox, chromium } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PimPage } from '../pages/pimPage';
import { generateUsername, generateEmail, generatePassword } from '../utils/dataGenerator';
import employeeData from '../Test-Data/employee.json';
import { config } from '../utils/configHelper';
test('Add the employee', async ({ page }) => {
    await page.goto(config.baseURL);
  // ✅ confirm login worked
  await page.getByRole('heading', { name: 'Dashboard' }).waitFor();
     console.log('Cookies:', await page.context().cookies());
    const userName = generateUsername();
    const passWord = generatePassword();
    const pimPage = new PimPage(page)
    await pimPage.navigateToPIM();
    await pimPage.clickAddEmployee();
    await pimPage.fillEmployeeDetails(employeeData.firstName, employeeData.lastName);
    const id = await pimPage.gettingEmployeeDetail()
    await pimPage.enableLoginDetails();
    await pimPage.fillLoginDetails(userName, passWord);
    await pimPage.uploadProfileImage('image1.png');
    await pimPage.clickOnSaveButton();
    await pimPage.searchingTheEmployee(id);
    await pimPage.verifyEmployeeDetails(employeeData.firstName, employeeData.lastName);

})