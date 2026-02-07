const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('category deletion should not be allowed for user', async function () {
  const deleteIcon = this.page.locator('.bi-trash').first();

  await expect(deleteIcon).toBeVisible();
  await expect(deleteIcon).toBeDisabled();
});
