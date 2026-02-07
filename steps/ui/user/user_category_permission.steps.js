const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Then('Add Category option should not be visible for user', async function () {
  const addCategoryButton = this.page.locator('a[href="/ui/categories/add"]');
  await expect(addCategoryButton).toHaveCount(0);
});
