const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Verify Delete option is visible for Admin', async ({ page }) => {

  // ---- LOGIN ----
  await loginAsAdmin(page);

  // ---- GO TO SALES ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  await expect(page).toHaveURL(/ui\/sales/);

  // ---- VERIFY DELETE BUTTON ----
  await salesPage.verifyDeleteButtonVisible();

  // Visible
  await expect(salesPage.deleteButtons.first()).toBeVisible();

  // Exists (count >= 1)
  const deleteButtonCount = await salesPage.deleteButtons.count();
  expect(deleteButtonCount).toBeGreaterThan(1);
});



//run: npx playwright test tests/ui/sales/sales-delete-button.spec.js