const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');

test('Delete confirmation popup appears on delete', async ({ page }) => {
  // ---- LOGIN ----
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();
  await salesPage.verifyPageLoaded();
  await salesPage.verifyDeleteButtonVisible();

  // ---- HANDLE CONFIRM DIALOG ----
  page.once('dialog', async (dialog) => {
    // Verify the dialog message
    expect(dialog.message()).toBe('Are you sure you want to delete this sale?');
    // Dismiss it (like clicking "Cancel")
    await dialog.dismiss();
  });

  // Click the first delete button
  await salesPage.deleteButtons.first().click();

  // Optional: verify that sale still exists because we dismissed the dialog
  await expect(salesPage.deleteButtons.first()).toBeVisible();
});

//run: npx playwright test tests/ui/sales/delete-confirmation-popup.spec.js