const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the admin dashboard URL should be displayed', async function () {
  await expect(this.page).toHaveURL(/\/ui\/dashboard/);
});

Then('all dashboard cards should be visible', async function () {
  const dashboard = this.adminDashboard;
  await expect(dashboard.categoriesCard).toBeVisible();
  await expect(dashboard.plantsCard).toBeVisible();
  await expect(dashboard.salesCard).toBeVisible();
  await expect(dashboard.inventoryCard).toBeVisible();
});
