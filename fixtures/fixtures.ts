// fixtures/fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users} from '../data/users';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    loggedInInventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    loggedInInventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await use(new InventoryPage(page));
    },
});

export { expect } from '@playwright/test';