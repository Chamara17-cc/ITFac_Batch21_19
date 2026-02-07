const { test, expect } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-USER-PLANT-06 | Add Plant button hidden for user', async ({ page }) => {
  await loginAsUser(page);

  const userPage = new PlantPage(page);
  await userPage.open();

  const addPlantBtn = page.getByRole('link', { name: /add\s*a\s*plant/i });
  await expect(addPlantBtn).toBeHidden();
});
