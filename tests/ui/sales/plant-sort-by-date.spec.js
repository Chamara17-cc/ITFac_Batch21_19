const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Plants sorted by Sold At date and time descending', async ({ page, baseURL }) => {

  // ---- LOGIN ----
  await loginAsAdmin(page, baseURL);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);
  await salesPage.verifyPageLoaded();

  // ---- GET SOLD AT DATES ----
  const soldDates = await salesPage.getSoldAtDates();

  // ---- VERIFY DESCENDING ORDER ----
  for (let i = 1; i < soldDates.length; i++) {
    expect(soldDates[i].getTime()).toBeLessThanOrEqual(soldDates[i - 1].getTime());
  }
});
//run: npx playwright test tests/ui/sales/plant-sort-by-date.spec.js