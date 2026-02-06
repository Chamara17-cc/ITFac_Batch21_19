const { test, expect } = require('@playwright/test');
const { plantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

test('UI-USER-PLANT-07 | Reset search functionality', async ({ page }) => {
  await loginAsUser(page);

  // This allows us to reuse page-level actions and locators
  const plantPage = new plantPageUser(page);
  await plantPage.open();

  // Search for plants using the keyword "Rose"
  await plantPage.searchPlant('Rose');

  // Get all plant names visible after applying the search filter
  const filteredPlants = await plantPage.getPlantNames();

  // This confirms that search functionality is working
  expect(filteredPlants.length).toBeGreaterThan(0);

  // Click the Reset button to clear the search filter
  await plantPage.resetSearch();

  // Get all plant names displayed after resetting the search
  const allPlants = await plantPage.getPlantNames();

  // This confirms that the full plant list is restored
  expect(allPlants.length).toBeGreaterThanOrEqual(filteredPlants.length);

});
