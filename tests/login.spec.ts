import { test } from '../fixtures/fixtures';
import { users } from '../data/users';


test.describe('Login', () => {
    test('user can log in with valid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await loginPage.loginSuccess();
    });

    test('Wrong username and password shows specific error', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong_password');
        await loginPage.loginFailure('Epic sadface: Username and password do not match any user in this service');
    });

    test('Empty credentials shows an error', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('', '');
        await loginPage.loginFailure('Epic sadface: Username is required');
     });

    test('Locked out user gets an error message', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);
        await loginPage.loginFailure('Epic sadface: Sorry, this user has been locked out.');
     })
});