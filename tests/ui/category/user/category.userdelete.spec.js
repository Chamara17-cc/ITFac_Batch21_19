const { test, expect } = require('@playwright/test');
const { loginAsAdmin, loginAsUser } = require('../../../../utils/authHelper');
const { CategoryPage } = require('../../../../pages/user/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
});

test('Delete button should be disabled for User', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.open();

    const deleteButton = categoryPage.deleteButton.first(); // assuming locator for Delete button

    // Check if the button is disabled
    await expect(deleteButton).toBeDisabled();
});
