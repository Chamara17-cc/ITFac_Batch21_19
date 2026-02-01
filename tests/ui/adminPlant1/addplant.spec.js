//UI-ADMIN-AP-01 (Not Done)

const { test, expect } = require('@playwright/test');
const { AddPlantPage } = require('../../../pages/AddPlantPageAdmin');
const { loginAsAdmin } = require('../../../utils/authHelper');
const { ensureCategoryExists } = require('../../../utils/categoryHelper');


test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
  await ensureCategoryExists(page, 'Flowers');
});

test('Add plant with valid details', async ({ page }) => {

  const addPlant = new AddPlantPage(page);
  await addPlant.open();

  await addPlant.addPlant(
    'Rose Plant',
    'Flowers',
    250,
    10
  );

  await expect(page).toHaveURL(/plants/);
})