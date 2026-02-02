const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');

test('Verify Delete option is visible for Admin', async ({ page }) => {

  // ---- LOGIN ----
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // ---- GO TO SALES ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  await expect(page).toHaveURL(/ui\/sales/);

  // ---- VERIFY DELETE BUTTON ----
  await salesPage.verifyDeleteButtonVisible();

  // Visible
  await expect(salesPage.deleteButtons.first()).toBeVisible();

  // Exists (count >= 1)
  await expect(salesPage.deleteButtons).toHaveCount(1);
});



//run: npx playwright test tests/ui/sales/sales-delete-button.spec.js