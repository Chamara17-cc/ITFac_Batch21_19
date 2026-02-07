const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { plantPageUser } = require('../../../pages/plantPageUser');

// This hook runs BEFORE EACH test in this file
test.beforeEach(async ({ page }) => {

  await loginAsAdmin(page);
});

test('UI-USER-PLANT-08 | Sort plants by name', async ({ page }) => {

  // This allows access to plant page methods and locators
  const plantPage = new plantPageUser(page);
  await plantPage.open();

  // Click the "Name" column header to trigger sorting (A → Z)
  await plantPage.clickNameColumn();

  // Fetch all plant names currently displayed in the UI
  const actualPlantNames = await plantPage.getPlantNames();

  // Sort it alphabetically (A → Z) using localeCompare
  const sortedPlantNames = [...actualPlantNames].sort((a, b) =>
    a.localeCompare(b)
  );

  // Compare the UI-sorted list with the expected sorted list
  // If both match, sorting functionality works correctly
  expect(actualPlantNames).toEqual(sortedPlantNames);
});
