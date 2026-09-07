import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly inventoryItems: Locator = this.page.locator('.inventory_item');
    readonly inventoryItemName: Locator = this.page.locator('.inventory_item_name');
    readonly inventoryItemImage: Locator = this.page.locator('.inventory_item_img');
    readonly inventoryItemPrice: Locator = this.page.locator('.inventory_item_price');
    readonly inventoryFilter: Locator = this.page.locator('.product_sort_container');
    readonly addToCartButtons: Locator = this.page.locator('[data-test^="add-to-cart-"]');
    readonly cartBadge: Locator = this.page.locator('.shopping_cart_badge');
    
    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    async filterItems(selectedFilter: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.inventoryFilter.selectOption(selectedFilter);
    }

    async getItemNames(): Promise<string[]> {
        const itemNames = await this.inventoryItemName.allTextContents();
        return itemNames;
    }

    async addFirstItemToCart(): Promise<void> {
        await this.addToCartButtons.first().click();
    }

    async addItemToCartByIndex(index: number): Promise<void> {
        await this.addToCartButtons.nth(index).click();
   }

   async goToDetailPageByIndex(index: number): Promise<void> {
        await this.inventoryItemName.nth(index).click();
    }

   async getCartCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) return 0;

        const text = await this.cartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
    }
}
