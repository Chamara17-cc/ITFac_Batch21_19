const { LoginPage } = require('../pages/LoginPage');
const { expect } = require('@playwright/test');

async function loginAsAdmin(page) {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('admin', 'admin123');
    await expect(page).toHaveURL(/\/ui\/dashboard/);

}
module.exports = { loginAsAdmin };