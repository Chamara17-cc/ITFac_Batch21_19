const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { CategoryPage } = require('../../../pages/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
});

test('Verify pagination works correctly', async ({ page }) => {
    const categotyPage = new CategoryPage(page);
    await categotyPage.open();
    //load the page
    await expect(page).toHaveURL('/ui/categories');
    const initialPageNumber = categotyPage.getCurrentPageNumber();
    await categotyPage.clickNext();
    const secondPage = categotyPage.getCurrentPageNumber();
    expect(secondPage).not.toBe(initialPageNumber);



}
)