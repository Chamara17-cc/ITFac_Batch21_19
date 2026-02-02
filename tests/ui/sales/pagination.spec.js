const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { SalesPage } = require('../../../pages/SalesPage');

test('Sales pagination works when records exceed one page', async ({ page }) => {
  // ---- LOGIN ----
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('admin', 'admin123');

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto();
  await salesPage.verifyPageLoaded();

  // ---- VERIFY MULTIPLE PAGES EXIST ----
  const pageCount = await salesPage.paginationItems.count();
  expect(pageCount).toBeGreaterThan(2); // at least Prev + 2 pages + Next

  // ---- VERIFY ROWS ON FIRST PAGE ----
  const firstPageRows = await salesPage.getRowCount();
  expect(firstPageRows).toBeGreaterThan(0);

  // ---- CLICK NEXT PAGE ----
  await salesPage.goToNextPage();

  // Wait for table to load new page
  await page.waitForTimeout(500); // small wait; optionally use network idle

  // ---- VERIFY ROWS ON SECOND PAGE ----
  const secondPageRows = await salesPage.getRowCount();
  expect(secondPageRows).toBeGreaterThan(0);

  // ---- VERIFY URL UPDATED ----
  await expect(page).toHaveURL(/page=1/);
});

//run: npx playwright test tests/ui/sales/pagination.spec.js