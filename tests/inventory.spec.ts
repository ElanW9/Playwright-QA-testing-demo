import { test, expect } from '../fixtures/fixtures';

test.describe('Inventory (products) page', () => {
    test('displays all inventory items after login', async ({ loggedInInventoryPage }) => {
        await expect(loggedInInventoryPage.inventoryItems).toHaveCount(6);
    });

    test('Can add an item to the cart', async ({ loggedInInventoryPage }) => {
        await loggedInInventoryPage.addFirstItemToCart();
        await expect(loggedInInventoryPage.cartBadge).toHaveText('1');
    });

    test('Can add multiple items to the cart', async ({ loggedInInventoryPage }) => {
        await loggedInInventoryPage.addItemToCartByIndex(0);
        await loggedInInventoryPage.addItemToCartByIndex(1);
        await expect(loggedInInventoryPage.cartBadge).toHaveText('2');
    });

    test('Cart count equals number of items added', async ({ loggedInInventoryPage }) => {
        expect(await loggedInInventoryPage.getCartCount()).toBe(0);
        await loggedInInventoryPage.addFirstItemToCart();
        expect(await loggedInInventoryPage.getCartCount()).toBe(1);
        await loggedInInventoryPage.addItemToCartByIndex(1);
        expect(await loggedInInventoryPage.getCartCount()).toBe(2);
    });

    test('Sorting A to Z orders items alphabetically', async ({ loggedInInventoryPage }) => {
        await loggedInInventoryPage.filterItems('az');
        const names = await loggedInInventoryPage.getItemNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    });

    test('Sorting price low to high orders items ascending', async ({ loggedInInventoryPage }) => {
        await loggedInInventoryPage.filterItems('lohi');
        const prices = await loggedInInventoryPage.inventoryItemPrice.allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sorted = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices).toEqual(sorted);
    });

    test('Clicking an item navigates to its detail page', async ({ loggedInInventoryPage, page }) => {
        await loggedInInventoryPage.goToDetailPageByIndex(0);
        await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
    });

});