const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../../utils/authHelper');
const { CategoryPage } = require('../../../../pages/user/CategoryPage');

test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
});

test('User cannot open Edit page by clicking Edit', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.open();

    const firstEdit = categoryPage.editButtons.first();

    // Check if button is visible first
    const isVisible = await firstEdit.isVisible();

    if (isVisible) {
        // Try clicking
        const urlBefore = page.url();
        await firstEdit.click({ force: true });
        const urlAfter = page.url();

        // The URL should NOT change to Edit page
        expect(urlAfter).toBe(urlBefore);
    } else {
        console.log('Edit button is not visible for this user.');
    }
});

//Bug




