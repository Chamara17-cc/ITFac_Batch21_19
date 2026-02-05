const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('Categories page heading should be visible', async function () {
  await expect(this.page.getByRole('heading', { name: 'Categories' })).toBeVisible({
    timeout: 20000,
  });
});