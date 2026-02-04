const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { CategoryPage } = require('../../../pages/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
});

test('Verify category page loads successfully', async ({ page }) => {
    const categotyPage = new CategoryPage(page);
    await categotyPage.open();
    //load the page
    await expect(page).toHaveURL('/ui/categories');
    //is header visible
    await expect(categotyPage.pageHeader()).toBeVisible();

    expect(await categotyPage.fetCategoryCount()).toBeGreaterThan(0);
})
