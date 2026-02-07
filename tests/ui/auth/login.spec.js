const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

test('Valid user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('admin', 'admin123');

    await expect(page).toHaveURL('/ui/dashboard');
});