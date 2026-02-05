const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsUser } = require('../sales/helpers/auth.helper');

test('Delete option is hidden for User', async ({ page }) => {
  // ---- LOGIN AS USER ----
  await loginAsUser(page);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();
  await salesPage.verifyPageLoaded();

  // ---- VERIFY DELETE BUTTONS HIDDEN ----
  // 1️⃣ Option: count should be 0
  await expect(salesPage.deleteButtons).toHaveCount(0);

  // 2️⃣ Option: first button should not be visible (if any exist)
  if (await salesPage.deleteButtons.count() > 0) {
    await expect(salesPage.deleteButtons.first()).not.toBeVisible();
  }

  // Optional: verify page still loaded
  await expect(salesPage.pageTitle).toBeVisible();
});

//run: npx playwright test tests/ui/sales/delete-hidden-for-user.spec.js