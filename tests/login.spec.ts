import { test, expect } from '../helpers/fixtures/fixtures';
import { LoginPage } from '../helpers/pages/LoginPage';

test.describe('Login', () => {
    test('user can log in with valid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });
});