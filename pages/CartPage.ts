import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItems: Locator = this.page.locator('.cart_item');
    readonly cartItemName: Locator = this.page.locator('.cart_item_name');
    readonly cartItemImage: Locator = this.page.locator('.cart_item_img');
    readonly cartItemPrice: Locator = this.page.locator('.cart_item_price');
    readonly cartCheckoutButton: Locator = this.page.locator('[data-test="checkout"]');
    readonly cartRemoveButtons: Locator = this.page.locator('[data-test^="remove-"]');
    readonly cartContinueShoppingButton: Locator = this.page.locator('[data-test="continue-shopping"]');

    async goto(): Promise<void> {
        await this.page.goto('/cart.html');
    }

    async checkout(): Promise<void> {
        await this.cartCheckoutButton.click();
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    }

    async getCartCount(): Promise<number> {
        return this.cartItems.count();
    }

    async getItemNames(): Promise<string[]> {
        return this.cartItemName.allTextContents();
    }

    async getItemPrices(): Promise<string[]> {
        return this.cartItemPrice.allTextContents();
    }

    async removeItemFromCart(index: number): Promise<void> {
        await this.cartRemoveButtons.nth(index).click();
    }

    async continueShopping(): Promise<void> {
        await this.cartContinueShoppingButton.click();
        await expect(this.page).toHaveURL('/inventory.html');
    }
}