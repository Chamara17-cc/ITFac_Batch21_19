//UI-USER-PLANT-08 Sort plants by name (Done)

const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { PlantPageUser } = require('../../../pages/plantPageUser');

test.beforeEach(async ({ page }) => {
  // Precondition: user logged in
  await loginAsAdmin(page);
});

test('UI-USER-PLANT-08 | Sort plants by name', async ({ page }) => {
  const plantPage = new PlantPageUser(page);

  // Precondition: user is on plant list page
  await plantPage.open();

  // Step 1: Click Name column header
  await plantPage.clickNameColumn();

  // Get plant names from UI
  const actualPlantNames = await plantPage.getPlantNames();

  // Create sorted copy (A → Z)
  const sortedPlantNames = [...actualPlantNames].sort((a, b) =>
    a.localeCompare(b)
  );

  // Assertion
  expect(actualPlantNames).toEqual(sortedPlantNames);
});
