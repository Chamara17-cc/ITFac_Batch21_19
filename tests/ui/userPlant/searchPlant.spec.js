const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-USER-PLANT-07 | Search plant by name', async ({ page }) => {
  await loginAsUser(page);

  const userPage = new PlantPage(page);
  await userPage.open();

  await userPage.searchPlant('Rose Plant');

  const count = await userPage.getPlantCount();
  expect(count).toBeGreaterThan(0);  
});
