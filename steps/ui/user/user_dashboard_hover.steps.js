const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When(
  'user hovers over the Categories card',
  { timeout: 20000 },
  async function () {
    const categoriesCard = this.page.locator('.dashboard-card', {
      hasText: 'Categories',
    });
    await categoriesCard.waitFor({ state: 'visible', timeout: 20000 });
    await categoriesCard.hover();
  }
);

When(
  'user hovers over the Manage Categories button',
  { timeout: 20000 },
  async function () {
    const manageLink = this.page.getByRole('link', { name: /Manage Categories/i });
    await manageLink.waitFor({ state: 'visible', timeout: 20000 });
    await manageLink.hover();
  }
);

Then('Categories card should remain visible for user', async function () {
  const categoriesCard = this.page.locator('.dashboard-card', {
    hasText: 'Categories',
  });
  await expect(categoriesCard).toBeVisible({ timeout: 20000 });
});

Then('Manage Categories button should remain visible for user', async function () {
  await expect(
    this.page.getByRole('link', { name: /Manage Categories/i })
  ).toBeVisible({ timeout: 20000 });
});