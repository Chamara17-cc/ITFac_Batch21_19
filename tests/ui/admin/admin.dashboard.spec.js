// tests/ui/admin/admin.dashboard.spec.js
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { AdminDashboardPage } = require('../../../pages/AdminDashboardPage');

test.describe('Admin Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('UI-ADM-DASH-01: Verify Admin Dashboard loads successfully', async ({ page }) => {
    const adminDashboard = new AdminDashboardPage(page);

    await adminDashboard.open();

    await expect(page).toHaveURL(/\/ui\/dashboard/);

    await expect(adminDashboard.categoriesCard).toBeVisible();
    await expect(adminDashboard.plantsCard).toBeVisible();
    await expect(adminDashboard.salesCard).toBeVisible();
    await expect(adminDashboard.inventoryCard).toBeVisible();
  });

  test.describe('Admin Dashboard Hover Effects', () => {
    test('UI-ADM-DASH-02: Verify Categories card and Manage Categories button are hoverable', async ({ page }) => {
      const adminDashboard = new AdminDashboardPage(page);

      await adminDashboard.open();

      // Hover on Categories card and ensure it is still visible
      await adminDashboard.categoriesCard.hover();
      await expect(adminDashboard.categoriesCard).toBeVisible();

      // Hover on Manage Categories button and ensure it is still visible
      await adminDashboard.manageCategoriesButton.hover();
      await expect(adminDashboard.manageCategoriesButton).toBeVisible();
    });

  });

  
test.describe('Admin Dashboard Navigation Tests', () => {
  test('UI-ADM-DASH-03: Verify Admin can access category management from dashboard', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    // Admin is already logged in
    await dashboard.open();

    // Click Manage Categories button
    await dashboard.manageCategoriesButton.click();

    // Verify navigation to Categories page
    await expect(page).toHaveURL(/\/ui\/categories/);

    // Optional strong check Ensures correct page loaded
    await expect(
      page.getByRole('heading', { name: 'Categories' })
    ).toBeVisible();
  });
});

test.describe('Admin Category Permission Tests', () => {
    test('UI-ADM-CAT-01: Verify Add Category option is visible for Admin', async ({ page }) => {
      const dashboard = new AdminDashboardPage(page);
  
      // Admin already logged in
      await dashboard.open();
  
      // Step 1: Click Manage Categories from Dashboard
      await dashboard.manageCategoriesButton.click();
  
      // Step 2: Verify Add Category button is visible and enabled
      const addCategoryButton = page.locator('a[href="/ui/categories/add"]');

      await expect(addCategoryButton).toBeVisible();
      await expect(addCategoryButton).toBeEnabled();
      

        //Confirms permission access
      await expect(addCategoryButton).toBeVisible();
      await expect(addCategoryButton).toBeEnabled();
  
      // final url cheak
      await expect(page).toHaveURL(/\/ui\/categories/);
    });
  });
});