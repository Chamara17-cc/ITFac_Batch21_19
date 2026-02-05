const { LoginPage } = require('../../../../pages/LoginPage');

/**
 * Login as Admin
 */
async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');
}

/**
 * Login as Normal User
 */
async function loginAsUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('testuser', 'test123');
}

module.exports = {
  loginAsAdmin,
  loginAsUser,
};
