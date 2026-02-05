const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');
const { SellPlantPage } = require('../../../pages/SellPlantPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Successful sale redirects to Sales list', async ({ page }) => {
  // ---- LOGIN ----
  await loginAsAdmin(page);

  // ---- GO TO SELL PLANT PAGE ----
  const sellPage = new SellPlantPage(page);
  await sellPage.goto();
  await sellPage.verifyPageLoaded();

  // ---- SELL A PLANT ----
  const sellPlantPage = new SellPlantPage(page);
  await sellPlantPage.goto();
  await sellPlantPage.sellPlant("2", 5);

  // ---- VERIFY REDIRECT TO SALES LIST ----
  const salesPage = new SalesPage(page);
  await expect(page).toHaveURL(/\/ui\/sales/);

  // Optionally verify new sale exists in table
  await salesPage.verifyPageLoaded();
  await expect(salesPage.deleteButtons.first()).toBeVisible();
});

//run: npx playwright test tests/ui/sales/redirect-sale-list.spec.js