import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator = this.page.getByRole('textbox', { name: 'Username' });
    readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
    readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });
    readonly errorMessage: Locator = this.page.locator('[data-test="error"]');

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginSucces(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async loginFailure(expectedMessage?: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        if (expectedMessage) {
            await expect(this.errorMessage).toContainText(expectedMessage);
        }
    }
}