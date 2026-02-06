// UI-USER-PLANT-09 | View plant list (Done)
const { test, expect } = require('@playwright/test');
const { PlantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

test('UI-USER-PLANT-09 | View plant list', async ({ page }) => {
  // Precondition: user logged in
  await loginAsUser(page);

  const plantPage = new PlantPageUser(page);

  // Step 1: Navigate to Plants page
  await plantPage.open();

  // Step 2: Verify the plant table is displayed
  const plantNames = await plantPage.getPlantNames();
  expect(plantNames.length).toBeGreaterThan(0); // at least one plant exists

  // Step 3: Verify columns are visible
  const nameColumn = page.getByRole('columnheader', { name: 'Name' });
  const categoryColumn = page.getByRole('columnheader', { name: 'Category' });
  const priceColumn = page.getByRole('columnheader', { name: 'Price' });
  const stockColumn = page.getByRole('columnheader', { name: 'Stock' });

  await expect(nameColumn).toBeVisible();
  await expect(categoryColumn).toBeVisible();
  await expect(priceColumn).toBeVisible();
  await expect(stockColumn).toBeVisible();

  // Optional: Log the first 5 plant names for debug
  console.log('First 5 plants:', plantNames.slice(0, 5));
});
