const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../../utils/authHelper');
const { CategoryPage } = require('../../../../pages/admin/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
});

test('Category Search By Name', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.open();
    await expect(page).toHaveURL('/ui/categories');
    await categoryPage.searchByName('Test01Cat');
    expect(await categoryPage.getFirstRowName()).toBe('Test01Cat');
}
)