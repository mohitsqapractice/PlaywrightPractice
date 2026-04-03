import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByRole('textbox', { name: 'password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com');
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveTitle('OrangeHRM');
  }

  async login(user: string, pass: string) {
    await expect(this.username).toBeVisible();
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async verifyLogin() {
    await expect(
      this.page.locator('.oxd-topbar-header-userarea img')
    ).toBeVisible();
  }
}