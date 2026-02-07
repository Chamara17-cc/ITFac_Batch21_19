const { LoginPage } = require('../pages/loginPage');
const { expect } = require('@playwright/test');

async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // Admin must not stay on login page
  await expect(page).not.toHaveURL(/login\?error/);
}

async function loginAsUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  // ✅ Correct user credentials
  await loginPage.login('testuser', 'test123');

  // Verify login did NOT fail
  await expect(page).not.toHaveURL(/login\?error/);
}

module.exports = {
  loginAsAdmin,
  loginAsUser
};
