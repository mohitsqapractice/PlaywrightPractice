import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class PimPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await expect(
      this.page.getByRole('heading', { name: 'PIM' })
    ).toBeVisible();
  }

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: /add/i }).click();
    await expect(this.page.locator('.oxd-loading-spinner')).toBeHidden();
  }


  async fillEmployeeDetails(first: string, last: string) {
    await this.page.waitForSelector
    await expect(this.page.getByPlaceholder('First Name')).toBeVisible(({ timeout: 10000 }));
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);
  }

  async enableLoginDetails() {
    await this.page.locator('.oxd-switch-input').click();
  }

  async fillLoginDetails(username: string, password: string) {
    const user = this.page.locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('input');

    const pass = this.page.locator('.oxd-input-group')
      .filter({ hasText: 'Password' })
      .locator('input')
      .first();

    const confirm = this.page.locator('.oxd-input-group')
      .filter({ hasText: 'Confirm Password' })
      .locator('input');

    await user.fill(username);
    await pass.fill(password);
    await confirm.fill(password);
  }

  async uploadProfileImage(fileName: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');

    await this.page.locator(
      '.oxd-icon-button.oxd-icon-button--solid-main.employee-image-action'
    ).click();

    const fileChooser = await fileChooserPromise;

    const filePath = path.join(process.cwd(), 'Test-Data', fileName);

    await fileChooser.setFiles(filePath);
  }

  async clickOnSaveButton() {
    await this.page.getByRole('button', { name: /Save/i }).click()
       await this.page.getByRole('link', { name: 'Employee List' }).click();
    await expect(
      this.page.getByRole('link', { name: 'Employee List' })
    ).toBeVisible();

  }

  async gettingEmployeeDetail() {
const empIdInput = this.page.locator('//label[text()="Employee Id"]/following::input[1]');   // select the input inside
const empId = await empIdInput.inputValue();
    console.log(empId);
    return empId;
  }

  async searchingTheEmployee(empID: string) {
    await this.page.locator('//label[text()="Employee Id"]/following::input[1]').fill(empID);
    await this.page.getByRole('button', { name: /Search/i }).click()

  }

  async verifyEmployeeDetails(firstName:string,lastName:string)
  {
    await expect(this.page.locator("//div[@role='row']").filter({hasText: firstName})).toBeVisible();
     await expect(this.page.locator("//div[@role='row']").filter({hasText: lastName})).toBeVisible();
  }
}