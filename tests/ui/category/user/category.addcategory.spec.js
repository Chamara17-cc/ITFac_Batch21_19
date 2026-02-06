const { test, expect } = require('@playwright/test');
const { loginAsAdmin, loginAsUser } = require('../../../../utils/authHelper');
const { CategoryPage } = require('../../../../pages/user/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
});
test('User should NOT see Add Category button', async ({ page }) => {
    const addButton = page.locator('a:has-text("Add A Category")');

    await expect(addButton).toHaveCount(0);
});
