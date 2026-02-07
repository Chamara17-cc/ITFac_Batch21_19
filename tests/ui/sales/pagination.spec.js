const { test, expect } = require('@playwright/test');
const { SalesPage } = require('../../../pages/SalesPage');
const { loginAsAdmin } = require('../sales/helpers/auth.helper');

test('Sales pagination works when records exceed one page', async ({ page, baseURL }) => {

  // ---- LOGIN ----
  await loginAsAdmin(page, baseURL);

  // ---- GO TO SALES PAGE ----
  const salesPage = new SalesPage(page);
  await salesPage.goto(baseURL);
  await salesPage.verifyPageLoaded();

  // ---- VERIFY MULTIPLE PAGES EXIST ----
  const pageCount = await salesPage.paginationItems.count();
  expect(pageCount).toBeGreaterThan(2);

  // ---- VERIFY ROWS ON FIRST PAGE ----
  const firstPageRows = await salesPage.getRowCount();
  expect(firstPageRows).toBeGreaterThan(0);

  // ---- CLICK NEXT PAGE ----
  await salesPage.goToNextPage();
  await page.waitForLoadState('networkidle');

  // ---- VERIFY ROWS ON SECOND PAGE ----
  const secondPageRows = await salesPage.getRowCount();
  expect(secondPageRows).toBeGreaterThan(0);

  // ---- OPTIONAL: VERIFY URL HAS PAGE PARAM ----
  await expect(page).toHaveURL(new RegExp('page=1'));
});
//run: npx playwright test tests/ui/sales/pagination.spec.js