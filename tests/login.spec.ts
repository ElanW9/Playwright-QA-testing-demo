import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
    test('user can log in with valid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });
});