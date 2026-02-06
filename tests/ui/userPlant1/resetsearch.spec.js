//UI-USER-PLANT-07- Verify reset functionality for search  (Done)

const { test, expect } = require('@playwright/test');
const { PlantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

test('UI-USER-PLANT-07 | Reset search functionality', async ({ page }) => {
  // Precondition: user logged in
  await loginAsUser(page);

  const plantPage = new PlantPageUser(page);
  await plantPage.open();

  // 1️⃣ Apply search
  await plantPage.searchPlant('Rose');
  const filteredPlants = await plantPage.getPlantNames();
  expect(filteredPlants.length).toBeGreaterThan(0); // search returned results

  // 2️⃣ Click Reset
  await plantPage.resetSearch();
  const allPlants = await plantPage.getPlantNames();
  expect(allPlants.length).toBeGreaterThanOrEqual(filteredPlants.length); // all plants shown after reset
});
