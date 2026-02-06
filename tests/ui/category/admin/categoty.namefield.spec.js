const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../../utils/authHelper');
const { CategoryAddPage } = require('../../../../pages/admin/CategoryAddPage');

test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
});

test('Category name is required', async ({ page }) => {
    const categoryPage = new CategoryAddPage(page);
    await categoryPage.open();
    await expect(page).toHaveURL('/ui/categories/add');
    await categoryPage.clickSave();
    await expect(categoryPage.validationError)
        .toContainText('Category name is required');
})