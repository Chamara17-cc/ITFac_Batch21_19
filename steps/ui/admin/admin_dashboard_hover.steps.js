const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('admin hovers over the Categories card', async function () {
  await this.adminDashboard.categoriesCard.hover();
});

When('admin hovers over the Manage Categories button', async function () {
  await this.adminDashboard.manageCategoriesButton.hover();
});

Then('the Categories card should remain visible', async function () {
  await expect(this.adminDashboard.categoriesCard).toBeVisible();
});

Then('the Manage Categories button should remain visible', async function () {
  await expect(this.adminDashboard.manageCategoriesButton).toBeVisible();
});
