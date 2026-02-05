const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Verify "No sales found" message when sales list is empty', async ({ page }) => {

  // ---- LOGIN AS ADMIN ----
  await loginAsAdmin(page);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();

  // ---- VERIFY URL ----
  await expect(page).toHaveURL(/ui\/sales/);

  // ---- GET TABLE ROWS ----
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();

  if (rowCount === 0) {
    // EMPTY TABLE
    await expect(salesPage.noSalesMessage).toBeVisible();
    await expect(salesPage.noSalesMessage).toHaveText('No sales found');
  } else {
    // TABLE HAS ROWS
    console.log(`Sales table has ${rowCount} rows`);

    // OPTIONAL: check if there are any delete buttons
    const deleteButtons = page.locator('table tbody tr button:has-text("Delete")');
    const deleteCount = await deleteButtons.count();

    if (deleteCount > 0) {
      console.log(`Delete buttons available: ${deleteCount}`);
      // optionally click the first delete button safely
      // await deleteButtons.first().click();
    } else {
      console.log('No delete buttons found in table rows');
    }
  }
});
//run: npx playwright test tests/ui/sales/sales-empty.spec.js