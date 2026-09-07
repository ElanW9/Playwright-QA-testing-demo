import { test, expect } from '../fixtures/fixtures';

test.describe('Cart page', () => {
    test('cart is empty by default after login', async ({ cartPage }) => {
        expect(await cartPage.getCartCount()).toBe(0);
    });

    test('added item appears in the cart with correct name', async ({ inventoryPage, cartPage }) => {
        const itemNames = await inventoryPage.getItemNames();
        await inventoryPage.addFirstItemToCart();

        await cartPage.goto();
        const cartNames = await cartPage.getItemNames();
        expect(cartNames).toContain(itemNames[0]);
    });

    test('removing an item empties the cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addFirstItemToCart();
        await cartPage.goto();

        expect(await cartPage.getCartCount()).toBe(1);
        await cartPage.removeItemFromCart(0);
        expect(await cartPage.getCartCount()).toBe(0);
    });

    test('continue shopping returns to inventory page', async ({ cartPage, page }) => {
        await cartPage.continueShopping();
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('checkout navigates to checkout step one', async ({ inventoryPage, cartPage, page }) => {
        await inventoryPage.addFirstItemToCart();
        await cartPage.goto();

        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
});