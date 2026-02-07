const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Verify Sell Plant button visibility for Admin', async ({ page, baseURL }) => {

  // ---- LOGIN AS ADMIN ----
  await loginAsAdmin(page, baseURL); 

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);

  // ---- VERIFY SALES PAGE URL ----
  await expect(page).toHaveURL(`${baseURL}/ui/sales`);

  // ---- VERIFY SELL PLANT BUTTON ----
  await salesPage.verifySellPlantButtonVisible();
  await expect(salesPage.sellPlantButton).toBeVisible();
  await expect(salesPage.sellPlantButton).toHaveText('Sell Plant');
});
