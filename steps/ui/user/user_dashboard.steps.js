const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');

Given(
  'user is logged into the application',
  { timeout: 20000 },
  async function () {
    await loginAsUser(this.page);
  }
);

When('user opens the dashboard page', async function () {
  // Your HTML shows routes like /ui/categories, so dashboard should be /ui/dashboard
  await this.page.goto('/ui/dashboard');
  await this.page.waitForLoadState('networkidle');
});

Then(
  'all dashboard cards should be visible for user',
  { timeout: 20000 },
  async function () {
    // Your DOM shows class="... dashboard-card"
    const cards = this.page.locator('.dashboard-card');
    await expect(cards.first()).toBeVisible({ timeout: 20000 });
  }
);