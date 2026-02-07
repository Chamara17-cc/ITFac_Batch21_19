const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('admin navigates to Categories management', async function () {
  await this.adminDashboard.manageCategoriesButton.click();
});

Then('Add Category option should be visible', async function () {
  this.addCategoryButton = this.page.locator('a[href="/ui/categories/add"]');
  await expect(this.addCategoryButton).toBeVisible();
});

Then('Add Category option should be enabled', async function () {
  await expect(this.addCategoryButton).toBeEnabled();
});

Then('Categories page should be loaded', async function () {
  await expect(this.page).toHaveURL(/\/ui\/categories/);
});
