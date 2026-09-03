import { test, expect } from '../fixtures/fixtures';

test.describe('Login', () => {
    test('user can log in with valid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.loginSucces();
    });

    test('wrong username and password shows specific error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');
    await loginPage.loginFailure('Epic sadface: Username and password do not match any user in this service');
    });

    test('empty credentials shows an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.loginFailure('Epic sadface: Username is required');
});
});