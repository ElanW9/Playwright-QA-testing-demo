import { test, expect } from '../fixtures/fixtures';

test.describe('Inventory (products) page', () => {
    test('Displays all inventory items after login', async ({ inventoryPage }) => {
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('Can add an item to the cart', async ({ inventoryPage }) => {
        await inventoryPage.addFirstItemToCart();
        expect(await inventoryPage.getCartCount()).toBe(1);
    });

    test('Can add multiple items to the cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        expect(await inventoryPage.getCartCount()).toBe(2);
    });

    test('Sorting A to Z orders items alphabetically', async ({ inventoryPage }) => {
        await inventoryPage.filterItems('az');
        const names = await inventoryPage.getItemNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    });

    test('Sorting price low to high orders items ascending', async ({ inventoryPage }) => {
        await inventoryPage.filterItems('lohi');
        const prices = await inventoryPage.inventoryItemPrice.allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sorted = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices).toEqual(sorted);
    });

    test('Clicking an item navigates to its detail page', async ({ inventoryPage, page }) => {
        await inventoryPage.goToDetailPageByIndex(0);
        await expect(page).toHaveURL(/inventory-item\.html/);
    });
});