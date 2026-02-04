const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('admin clicks on Manage Categories button', async function () {
  await this.adminDashboard.manageCategoriesButton.click();
});

Then('admin should be navigated to Categories page', async function () {
  await expect(this.page).toHaveURL(/\/ui\/categories/);
});

Then('Categories page heading should be visible', async function () {
  await expect(
    this.page.getByRole('heading', { name: 'Categories' })
  ).toBeVisible();
});
