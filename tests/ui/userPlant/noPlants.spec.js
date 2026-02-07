const { test } = require('@playwright/test');
const { loginAsUser } = require('../../../utils/authHelper');
const { PlantPage } = require('../../../pages/PlantPage');

test('UI-USER-PLANT-10 | No plants found message', async ({ page }) => {
  await loginAsUser(page);

  const userPage = new PlantPage(page);
  await userPage.open();
  
  const count = await userPage.getPlantCount();

  if (count === 0) {
    await userPage.expectNoPlantsMessage();
  } else {
    console.log('Plants exist, empty state message not displayed.');
  }
});
