const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('user filters plants by category {string}', async function (category) {
  await this.plantPage.filterByCategory(category);
});

Then('filtered plants should be displayed', async function () {
  await expect(this.page.locator('tbody tr').first()).toBeVisible();
});