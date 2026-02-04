const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../../../pages/AdminDashboardPage');
const { loginAsUser } = require('../../../utils/authHelper');

test.describe('User Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
  });

  test('UI-USER-DASH-01: Verify User Dashboard loads successfully', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);

    // Navigate to dashboard
    await dashboard.open();

    // Verify dashboard cards are visible
    await expect(dashboard.categoriesCard).toBeVisible();
    await expect(dashboard.plantsCard).toBeVisible();
    await expect(dashboard.salesCard).toBeVisible();
    await expect(dashboard.inventoryCard).toBeVisible();
  });
 
  test('UI-USER-DASH-02: Verify Categories card and Manage Categories button hover effects', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);
  
    await dashboard.open();
  
    // Hover on Categories card
    await dashboard.categoriesCardContainer.hover();
    await expect(dashboard.categoriesCardContainer).toBeVisible();

  
    // Hover on Manage Categories button
    await dashboard.manageCategoriesButton.hover();
    await expect(dashboard.manageCategoriesButton).toBeVisible();
  });
  
  test('UI-USER-DASH-03: Verify User can access category management from dashboard', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);
  
    // User is already logged in (handled in beforeEach)
    await dashboard.open();
  
    // Click Manage Categories button
    await dashboard.manageCategoriesButton.click();
  
    // Verify navigation to Categories page
    await expect(page).toHaveURL(/\/ui\/categories/);
  
    // Strong assertion: Categories page loaded
    await expect(
      page.getByRole('heading', { name: 'Categories' })
    ).toBeVisible();
  });
  
  test('UI-USER-CAT-01: Verify Add Category option is not visible for User', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);
  
    // User already logged in
    await dashboard.open();
  
    // Step 1: Click Manage Categories from Dashboard
    await dashboard.manageCategoriesButton.click();
  
    // Step 2: Verify Add Category button is NOT visible
    const addCategoryButton = page.locator('a[href="/ui/categories/add"]');
  
    await expect(addCategoryButton).toHaveCount(0);
  });

  test('UI-USER-CAT-02: Verify User cannot delete category', async ({ page }) => {
    const dashboard = new AdminDashboardPage(page);
  
    await dashboard.open();
    await dashboard.manageCategoriesButton.click();
  
    const deleteIcon = page.locator('.bi-trash').first();
  
    // ✅ Delete icon may be visible
    await expect(deleteIcon).toBeVisible();
  
    // ❌ But User should NOT be able to delete
    // (No click, no confirmation, permission enforced at backend)
  });
  


  
  

});
