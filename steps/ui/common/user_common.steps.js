const { When } = require('@cucumber/cucumber');

When(
  'user navigates to Categories management',
  { timeout: 20000 },
  async function () {
    // Click the Manage Categories link and wait for navigation
    await this.page.getByRole('link', { name: /Manage Categories/i }).click();
    await this.page.waitForURL('**/ui/categories');
  }
);