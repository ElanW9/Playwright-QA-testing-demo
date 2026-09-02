import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Objects = {
    loginPage: LoginPage;
};

export const test = base.extend<Objects>({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },  
});

export const expect = test.expect;