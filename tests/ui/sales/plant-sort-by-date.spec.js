const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper'); 

test('Plants sorted by Sold At date and time descending', async ({ page }) => {
  await loginAsAdmin(page);

  const salesPage = new SalesPage(page);
  await salesPage.goto();
  await salesPage.verifyPageLoaded();

  const soldDates = await salesPage.getSoldAtDates();

  // Verify descending order (latest first)
  for (let i = 1; i < soldDates.length; i++) {
    expect(soldDates[i].getTime()).toBeLessThanOrEqual(soldDates[i - 1].getTime());
  }
});


//run: npx playwright test tests/ui/sales/plant-sort-by-date.spec.js