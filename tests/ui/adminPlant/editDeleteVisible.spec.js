const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');
const { PlantPageAdmin } = require('../../../pages/PlantPageAdmin');

test('UI-ADM-PLANT-03 | Edit and Delete buttons visible', async ({ page }) => {
  await loginAsAdmin(page);

  const plantPage = new PlantPage(page);
  await plantPage.open();

  const adminPage = new PlantPageAdmin(page);

  await expect(adminPage.editBtn).toBeVisible();
  await expect(adminPage.deleteBtn).toBeVisible();
});
