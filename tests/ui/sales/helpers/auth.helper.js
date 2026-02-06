const { LoginPage } = require('../../../../pages/LoginPage');

/**
 * Login as Admin
 */
async function loginAsAdmin(page, baseUrl) {
  const loginPage = new LoginPage(page);
  await loginPage.open(baseUrl); // must pass baseUrl
  await loginPage.login('admin', 'admin123');
}

/**
 * Login as Normal User
 */
async function loginAsUser(page, baseUrl) {
  const loginPage = new LoginPage(page);
  await loginPage.open(baseUrl);
  await loginPage.login('testuser', 'test123');
}

module.exports = {
  loginAsAdmin,
  loginAsUser,
};
