const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-USER-PLANT-08 | Filter plants by category', async ({ page }) => {
  await loginAsUser(page);

  const userPage = new PlantPage(page);
  await userPage.open();

  await userPage.filterByCategory('Flowers');

  await expect(page.locator('tbody tr').first()).toBeVisible();
});
