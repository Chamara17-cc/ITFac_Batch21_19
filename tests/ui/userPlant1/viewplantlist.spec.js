const { test, expect } = require('@playwright/test');
const { PlantPageUser } = require('../../../pages/plantPageUser');
const { loginAsUser } = require('../../../utils/authHelper');

test('UI-USER-PLANT-09 | View plant list', async ({ page }) => {

  await loginAsUser(page);

  // This gives access to plant page methods and locators
  const plantPage = new PlantPageUser(page);

  await plantPage.open();

  // Fetch all plant names displayed in the table
  const plantNames = await plantPage.getPlantNames();

  // Assertion: ensure at least one plant exists in the list
  expect(plantNames.length).toBeGreaterThan(0);

  // ---------------- STEP 3: VERIFY COLUMN HEADERS ----------------
  const nameColumn = page.getByRole('columnheader', { name: 'Name' });
  const categoryColumn = page.getByRole('columnheader', { name: 'Category' });
  const priceColumn = page.getByRole('columnheader', { name: 'Price' });
  const stockColumn = page.getByRole('columnheader', { name: 'Stock' });

  // Assertion: ensure all important columns are visible to the user
  await expect(nameColumn).toBeVisible();
  await expect(categoryColumn).toBeVisible();
  await expect(priceColumn).toBeVisible();
  await expect(stockColumn).toBeVisible();

  // ---------------- OPTIONAL DEBUG LOG ----------------
  // Log first 5 plant names to the console for debugging or demo purposes
  console.log('First 5 plants:', plantNames.slice(0, 5));
});
