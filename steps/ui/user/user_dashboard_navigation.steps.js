const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When(
  'user clicks on Manage Categories button',
  { timeout: 20000 },
  async function () {
    await this.page.getByRole('link', { name: /Manage Categories/i }).click();
  }
);

Then('user should be navigated to Categories page', async function () {
  await expect(this.page).toHaveURL(/\/ui\/categories/, { timeout: 20000 });
});