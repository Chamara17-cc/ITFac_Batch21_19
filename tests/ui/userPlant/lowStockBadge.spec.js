const { test } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-USER-PLANT-09 | Low stock badge display', async ({ page }) => {
  await loginAsUser(page);

  const userPage = new PlantPage(page); 
  await userPage.open();

  await userPage.expectLowStockVisible();
});
