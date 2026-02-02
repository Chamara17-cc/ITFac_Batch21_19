const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');

test('Verify Sell Plant button visibility for Admin', async ({ page }) => {

  // ---- LOGIN AS ADMIN ----
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  // Verify URL
  await expect(page).toHaveURL(/ui\/sales/);

  // ---- VERIFY SELL PLANT BUTTON ----
  await salesPage.verifySellPlantButtonVisible();
  await expect(salesPage.sellPlantButton).toBeVisible();
  await expect(salesPage.sellPlantButton).toHaveText('Sell Plant');
});
//run: npx playwright test tests/ui/sales/sales-sell-plant-button.spec.js