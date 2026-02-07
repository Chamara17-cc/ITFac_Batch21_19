const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Verify Delete option is visible for Admin', async ({ page, baseURL }) => {

  // ---- LOGIN ----
  await loginAsAdmin(page, baseURL);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);

  // ---- VERIFY URL ----
  await expect(page).toHaveURL(`${baseURL}/ui/sales`);

  // ---- VERIFY DELETE BUTTON ----
  await salesPage.verifyDeleteButtonVisible();

  // Visible
  await expect(salesPage.deleteButtons.first()).toBeVisible();

  // Exists (count >= 1)
  const deleteButtonCount = await salesPage.deleteButtons.count();
  expect(deleteButtonCount).toBeGreaterThan(1);
});
