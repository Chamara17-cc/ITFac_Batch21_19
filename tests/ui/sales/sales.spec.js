const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

// Playwright passes test info, including baseURL from config
test('Sales page loads successfully (after login)', async ({ page, baseURL }) => {

  // --- Login as Admin ---
  await loginAsAdmin(page, baseURL);

  // --- Verify login success ---
  await expect(page).toHaveURL(`${baseURL}/ui/dashboard`);

  // --- Navigate to Sales page ---
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);  
  await salesPage.verifyPageLoaded();

  // --- Verify Sales page URL ---
  await expect(page).toHaveURL(`${baseURL}/ui/sales`);

  // --- Verify page body is visible ---
  await expect(page.locator('body')).toBeVisible();
});
