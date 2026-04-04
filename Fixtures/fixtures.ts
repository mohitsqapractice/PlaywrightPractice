import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PimPage } from '../pages/pimPage';


type Pages = {
    loginPage: LoginPage;
    pimPage: PimPage
};

export const myTest = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page)
        await use(login)
    },
    pimPage: async ({ page }, use) => { await use(new PimPage(page)) }
}
)

export { expect };

