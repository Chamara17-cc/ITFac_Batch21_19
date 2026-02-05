const { LoginPage } = require('../pages/LoginPage');

async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');
  await page.waitForLoadState('networkidle');
}

async function loginAsUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('testuser', 'test123');
  await page.waitForLoadState('networkidle');
}

module.exports = {
  loginAsAdmin,
  loginAsUser,
};
