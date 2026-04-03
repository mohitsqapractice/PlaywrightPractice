import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PimPage } from '../pages/pimPage';
import { generateUsername, generateEmail, generatePassword } from '../utils/dataGenerator';
import employeeData from '../Test-Data/employee.json';
import { config } from '../utils/configHelper';

test('go to add the users', async ({ page }) => {
    const userName = generateUsername();
    const passWord = generatePassword();
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    await loginPage.goto();
    await loginPage.login(config.APPusername, config.APPpassword);
    await pimPage.navigateToPIM();
    await pimPage.clickAddEmployee();
    await pimPage.fillEmployeeDetails(employeeData.firstName, employeeData.lastName);
    const id = await pimPage.gettingEmployeeDetail()
    await pimPage.enableLoginDetails();
     await page.pause();
    await pimPage.fillLoginDetails(userName, passWord);
    await pimPage.uploadProfileImage('image1.png');
    await pimPage.clickOnSaveButton();
    await pimPage.searchingTheEmployee(id);
    await pimPage.verifyEmployeeDetails(employeeData.firstName, employeeData.lastName);
});