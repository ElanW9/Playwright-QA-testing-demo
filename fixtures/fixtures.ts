// fixtures/fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.resetAppState();   
        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addFirstItemToCart();

        const cartPage = new CartPage(page);
        await cartPage.goto();
        await use(cartPage);
    },
});

export { expect } from '@playwright/test';