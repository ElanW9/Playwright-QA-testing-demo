import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly inventoryItems: Locator = this.page.locator('.inventory_item');
    readonly inventoryItemName: Locator = this.page.locator('.inventory_item_name');
    readonly inventoryItemImage: Locator = this.page.locator('.inventory_item_img');
    readonly inventoryItemPrice: Locator = this.page.locator('.inventory_item_price');
    readonly inventoryFilter: Locator = this.page.locator('.product_sort_container');
    readonly addToCartButtons: Locator = this.page.locator('[data-test^="add-to-cart-"]');
    
    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }
}
