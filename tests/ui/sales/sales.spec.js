const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { LoginPage } = require('../../../pages/LoginPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Sales page loads successfully (after login)', async ({ page }) => {

  // Login step
  await loginAsAdmin(page);

  // Verify login success
  await expect(page).toHaveURL(/ui\/dashboard/);

  // Navigate to Sales page
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  // Verify Sales page URL
  await expect(page).toHaveURL(/ui\/sales/);

  // Verify Sales page UI loaded
  await salesPage.verifyPageLoaded();

  // Verify page visible
  await expect(page.locator('body')).toBeVisible();
});


//run: npx playwright test tests/ui/sales/sales.spec.js