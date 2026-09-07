import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {}

    async resetAppState(): Promise<void> {
        await this.page.click('#react-burger-menu-btn');
        await this.page.click('#reset_sidebar_link');
        await this.page.click('#react-burger-cross-btn');
    }
}