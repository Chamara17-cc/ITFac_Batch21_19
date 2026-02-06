//UI-ADMIN-AP-03 - Verify plant name length validation (Done)

import { test } from '@playwright/test';
import { AddPlantPageAdmin } from '../../../pages/addPlantPageAdmin';
import { loginAsAdmin } from '../../../utils/authHelper';

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test('UI-ADMIN-AP-03 | Plant name length validation', async ({ page }) => {
  const addPlantPage = new AddPlantPageAdmin(page);
  await addPlantPage.open();

  // CASE 1: Plant name < 3 characters
  await addPlantPage.fillBasicDetails({
    name: 'AB',
    categoryIndex: 1,
    price: '100',
    quantity: '10'
  });
  await addPlantPage.clickSave();
  await addPlantPage.expectPlantNameLengthError();

  // Reload form
  await page.reload();
  await addPlantPage.open();

  // CASE 2: Plant name > 25 characters
  await addPlantPage.fillBasicDetails({
    name: 'ThisPlantNameIsWayTooLongToBeValid',
    categoryIndex: 1,
    price: '100',
    quantity: '10'
  });
  await addPlantPage.clickSave();
  await addPlantPage.expectPlantNameLengthError();

  // Reload form
  await page.reload();
  await addPlantPage.open();

  // CASE 3: Plant name valid (3–25 characters)
  await addPlantPage.fillBasicDetails({
    name: 'Valid Plant Name',
    categoryIndex: 1,
    price: '100',
    quantity: '10'
  });
  await addPlantPage.clickSave();

  // ✅ No error should appear
  await addPlantPage.expectNoErrors();
});
