const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsUser } = require('../sales/helpers/auth.helper');

test('Delete option is hidden for User', async ({ page, baseURL }) => {

  // ---- LOGIN AS USER ----
  await loginAsUser(page, baseURL);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);
  await salesPage.verifyPageLoaded();

  // ---- VERIFY DELETE BUTTONS HIDDEN ----
  await expect(salesPage.deleteButtons).toHaveCount(0);

  // Extra check if any button exists
  if (await salesPage.deleteButtons.count() > 0) {
    await expect(salesPage.deleteButtons.first()).not.toBeVisible();
  }

  // Verify page title is visible
  await expect(salesPage.pageTitle).toBeVisible();
});
//run: npx playwright test tests/ui/sales/delete-hidden-for-user.spec.js