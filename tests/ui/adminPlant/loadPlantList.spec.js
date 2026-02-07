const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-ADM-PLANT-01 | Load plant list', async ({ page }) => {
  await loginAsAdmin(page);

  const plantPage = new PlantPage(page);
  await plantPage.open();

  expect(await plantPage.getPlantCount()).toBeGreaterThan(0);
});
