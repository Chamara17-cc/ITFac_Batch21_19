const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Delete confirmation popup appears on delete', async ({ page }) => {
  // ---- LOGIN AS ADMIN ----
  await loginAsAdmin(page);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();
  await salesPage.verifyPageLoaded();
  await salesPage.verifyDeleteButtonVisible();

  // ---- HANDLE CONFIRM DIALOG ----
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Are you sure you want to delete this sale?');
    await dialog.dismiss(); // Cancel delete
  });

  // ---- CLICK DELETE ----
  await salesPage.deleteButtons.first().click();

  // ---- VERIFY STILL EXISTS ----
  await expect(salesPage.deleteButtons.first()).toBeVisible();
});

//run: npx playwright test tests/ui/sales/delete-confirmation-popup.spec.js