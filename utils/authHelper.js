const { LoginPage } = require('../pages/LoginPage');

async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // wait until navigation finishes
  await page.waitForLoadState('networkidle');
}

async function loginAsUser(page) {
    const loginPage = new LoginPage(page);
  
    await loginPage.open();
    await loginPage.login('testuser', 'test123');
  
    // wait until navigation finishes
    await page.waitForLoadState('networkidle');
  }
  
  module.exports = { loginAsAdmin, loginAsUser };

