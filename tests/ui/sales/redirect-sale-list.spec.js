const { test, expect } = require('@playwright/test');
const { SellPlantPage } = require('../../../pages/SellPlantPage');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Successful sale redirects to Sales list', async ({ page, baseURL }) => {

  // ---- LOGIN ----
  await loginAsAdmin(page, baseURL);

  // ---- GO TO SELL PLANT PAGE ----
  const sellPage = new SellPlantPage(page);
  await sellPage.goto(baseURL);
  await sellPage.verifyPageLoaded();

  // ---- SELL A PLANT ----
  await sellPage.sellPlant("2", 5);

  // ---- VERIFY REDIRECT TO SALES LIST ----
  const salesPage = new SalesPage(page);
  await expect(page).toHaveURL(`${baseURL}/ui/sales`);
  await salesPage.verifyPageLoaded();
  await expect(salesPage.deleteButtons.first()).toBeVisible();
});
//run: npx playwright test tests/ui/sales/redirect-sale-list.spec.js