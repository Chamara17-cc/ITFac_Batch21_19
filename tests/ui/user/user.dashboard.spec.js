const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../../../pages/AdminDashboardPage');
const { loginAsUser } = require('../../../utils/authHelper');

test.describe('User Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
  });

  test('UI-USER-DASH-01: Verify User Dashboard loads successfully', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    await dashboard.open();

    await expect(dashboard.categoriesCard).toBeVisible();
    await expect(dashboard.plantsCard).toBeVisible();
    await expect(dashboard.salesCard).toBeVisible();
    await expect(dashboard.inventoryCard).toBeVisible();
  });

  test('UI-USER-DASH-02: Verify Categories card and Manage Categories button hover effects', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    await dashboard.open();

    await dashboard.categoriesCardContainer.hover();
    await expect(dashboard.categoriesCardContainer).toBeVisible();

    await dashboard.manageCategoriesButton.hover();
    await expect(dashboard.manageCategoriesButton).toBeVisible();
  });

  test('UI-USER-DASH-03: Verify User can access category management from dashboard', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    await dashboard.open();

    // ✅ FIX: wait for navigation + click together
    await Promise.all([
      page.waitForURL(/\/ui\/categories/, { timeout: 15000 }),
      dashboard.manageCategoriesButton.click(),
    ]);

    // ✅ Extra stability
    await page.waitForLoadState('domcontentloaded');

    await expect(
      page.getByRole('heading', { name: 'Categories' })
    ).toBeVisible();
  });

  test('UI-USER-CAT-01: Verify Add Category option is not visible for User', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    await dashboard.open();

    await Promise.all([
      page.waitForURL(/\/ui\/categories/),
      dashboard.manageCategoriesButton.click(),
    ]);

    const addCategoryButton = page.locator('a[href="/ui/categories/add"]');
    await expect(addCategoryButton).toHaveCount(0);
  });

  test('UI-USER-CAT-02: Verify User cannot delete category', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    await dashboard.open();

    await Promise.all([
      page.waitForURL(/\/ui\/categories/),
      dashboard.manageCategoriesButton.click(),
    ]);

    const deleteIcon = page.locator('.bi-trash').first();

    // User should not be allowed to delete
    await expect(deleteIcon).toBeDisabled();
  });
});