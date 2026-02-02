const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');

test('Verify "No sales found" message when sales list is empty', async ({ page }) => {

  // ---- LOGIN ----
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // ---- GO TO SALES ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  // Verify URL
  await expect(page).toHaveURL(/ui\/sales/);

  // ---- VERIFY EMPTY STATE ----
  await salesPage.verifyNoSalesMessage();

  await expect(salesPage.noSalesMessage).toHaveText('No sales found');
  await expect(salesPage.noSalesMessage).toBeVisible();

  // Optional: verify only one row exists
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);
});
//run: npx playwright test tests/ui/sales/sales-empty.spec.js