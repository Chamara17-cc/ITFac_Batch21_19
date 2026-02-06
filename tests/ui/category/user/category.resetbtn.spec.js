const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../../utils/authHelper');
const { CategoryPage } = require('../../../../pages/user/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
});
test('Reset button should clear search input for User', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.open();
    await categoryPage.searchByName('Test01Cat');
    const resetButton = categoryPage.resetButton;
    await resetButton.click();
    await expect(categoryPage.searchInput).toHaveValue('');
});